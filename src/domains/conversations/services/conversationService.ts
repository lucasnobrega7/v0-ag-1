import { supabaseClient } from "@/lib/supabase"
import type { Conversation, Message, QueryResponse } from "../types/conversation.types"

/**
 * Serviço para gerenciar conversas e mensagens
 */
export const conversationService = {
  /**
   * Obtém todas as conversas de um usuário
   */
  async getConversations(userId: string): Promise<Conversation[]> {
    const { data, error } = await supabaseClient
      .from("conversations")
      .select("*")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false })

    if (error) {
      throw new Error(`Failed to fetch conversations: ${error.message}`)
    }

    return data.map(transformConversationFromDB)
  },

  /**
   * Obtém uma conversa pelo ID
   */
  async getConversationById(id: string): Promise<Conversation | null> {
    const { data, error } = await supabaseClient.from("conversations").select("*").eq("id", id).single()

    if (error) {
      if (error.code === "PGRST116") {
        return null
      }
      throw new Error(`Failed to fetch conversation: ${error.message}`)
    }

    return transformConversationFromDB(data)
  },

  /**
   * Cria uma nova conversa
   */
  async createConversation(userId: string, agentId: string, title?: string): Promise<Conversation> {
    const { data, error } = await supabaseClient
      .from("conversations")
      .insert([
        {
          user_id: userId,
          agent_id: agentId,
          title: title || "Nova conversa",
        },
      ])
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to create conversation: ${error.message}`)
    }

    return transformConversationFromDB(data)
  },

  /**
   * Obtém mensagens de uma conversa
   */
  async getMessages(conversationId: string): Promise<Message[]> {
    const { data, error } = await supabaseClient
      .from("messages")
      .select("*")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true })

    if (error) {
      throw new Error(`Failed to fetch messages: ${error.message}`)
    }

    return data.map(transformMessageFromDB)
  },

  /**
   * Adiciona uma mensagem a uma conversa
   */
  async addMessage(conversationId: string, content: string, role: "user" | "assistant"): Promise<Message> {
    const { data, error } = await supabaseClient
      .from("messages")
      .insert([
        {
          conversation_id: conversationId,
          content,
          role,
        },
      ])
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to add message: ${error.message}`)
    }

    // Atualizar a data de atualização da conversa
    await supabaseClient.from("conversations").update({ updated_at: new Date().toISOString() }).eq("id", conversationId)

    return transformMessageFromDB(data)
  },

  /**
   * Envia uma consulta para um agente e obtém a resposta
   */
  async queryAgent(agentId: string, query: string): Promise<QueryResponse> {
    // Em um ambiente real, isso chamaria a API do agente
    // Aqui, estamos simulando uma resposta
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      text: `Resposta simulada para: "${query}"\n\nEsta é uma resposta de exemplo do agente. Em um ambiente de produção, isso seria processado pelo modelo de linguagem configurado para o agente.`,
      sources: [],
    }
  },
}

// Helper functions to transform database records
function transformConversationFromDB(record: any): Conversation {
  return {
    id: record.id,
    userId: record.user_id,
    agentId: record.agent_id,
    title: record.title,
    createdAt: new Date(record.created_at),
    updatedAt: new Date(record.updated_at),
  }
}

function transformMessageFromDB(record: any): Message {
  return {
    id: record.id,
    conversationId: record.conversation_id,
    content: record.content,
    role: record.role,
    createdAt: new Date(record.created_at),
  }
}
