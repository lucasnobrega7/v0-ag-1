import { supabaseClient } from "@/lib/supabase"
import type { Message, Conversation, SendMessageParams, MessageResponse } from "../types/conversation.types"

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
   * Obtém as mensagens de uma conversa
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
   * Envia uma mensagem para um agente
   */
  async sendMessage(params: SendMessageParams): Promise<MessageResponse> {
    let conversationId = params.conversationId

    // Se não houver ID de conversa, cria uma nova conversa
    if (!conversationId) {
      const { data: conversationData, error: conversationError } = await supabaseClient
        .from("conversations")
        .insert([
          {
            user_id: "current_user_id", // Substituir pelo ID do usuário atual
            agent_id: params.agentId,
            title: params.content.substring(0, 50) + (params.content.length > 50 ? "..." : ""),
          },
        ])
        .select()
        .single()

      if (conversationError) {
        throw new Error(`Failed to create conversation: ${conversationError.message}`)
      }

      conversationId = conversationData.id
    }

    // Insere a mensagem do usuário
    const { data: userMessageData, error: userMessageError } = await supabaseClient
      .from("messages")
      .insert([
        {
          conversation_id: conversationId,
          content: params.content,
          role: "user",
        },
      ])
      .select()
      .single()

    if (userMessageError) {
      throw new Error(`Failed to send user message: ${userMessageError.message}`)
    }

    // Simula a resposta do agente (em um ambiente real, isso chamaria uma API de IA)
    const agentResponse = await simulateAgentResponse(params.agentId, params.content)

    // Insere a resposta do agente
    const { data: agentMessageData, error: agentMessageError } = await supabaseClient
      .from("messages")
      .insert([
        {
          conversation_id: conversationId,
          content: agentResponse,
          role: "assistant",
        },
      ])
      .select()
      .single()

    if (agentMessageError) {
      throw new Error(`Failed to send agent message: ${agentMessageError.message}`)
    }

    // Atualiza o título da conversa se for uma nova conversa
    if (!params.conversationId) {
      await supabaseClient
        .from("conversations")
        .update({ title: params.content.substring(0, 50) + (params.content.length > 50 ? "..." : "") })
        .eq("id", conversationId)
    }

    return {
      id: agentMessageData.id,
      content: agentMessageData.content,
      role: agentMessageData.role,
      conversationId,
      createdAt: agentMessageData.created_at,
    }
  },

  /**
   * Exclui uma conversa
   */
  async deleteConversation(id: string): Promise<void> {
    // Primeiro exclui todas as mensagens da conversa
    const { error: messagesError } = await supabaseClient.from("messages").delete().eq("conversation_id", id)

    if (messagesError) {
      throw new Error(`Failed to delete conversation messages: ${messagesError.message}`)
    }

    // Depois exclui a conversa
    const { error: conversationError } = await supabaseClient.from("conversations").delete().eq("id", id)

    if (conversationError) {
      throw new Error(`Failed to delete conversation: ${conversationError.message}`)
    }
  },
}

// Função auxiliar para simular a resposta de um agente
async function simulateAgentResponse(agentId: string, message: string): Promise<string> {
  // Em um ambiente real, isso chamaria uma API de IA
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Esta é uma resposta simulada para: "${message}". Agente ID: ${agentId}`)
    }, 1000)
  })
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
