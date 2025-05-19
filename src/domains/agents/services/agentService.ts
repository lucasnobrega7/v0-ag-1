import { supabaseClient } from "@/lib/supabase"
import type { Agent, CreateAgentParams, UpdateAgentParams } from "../types/agent.types"

/**
 * Serviço para gerenciar agentes
 */
export const agentService = {
  /**
   * Obtém todos os agentes de uma organização
   */
  async getAgents(organizationId: string): Promise<Agent[]> {
    const { data, error } = await supabaseClient
      .from("agents")
      .select("*")
      .eq("organization_id", organizationId)
      .order("created_at", { ascending: false })

    if (error) {
      throw new Error(`Failed to fetch agents: ${error.message}`)
    }

    return data.map(transformAgentFromDB)
  },

  /**
   * Obtém um agente pelo ID
   */
  async getAgentById(id: string): Promise<Agent | null> {
    const { data, error } = await supabaseClient.from("agents").select("*").eq("id", id).single()

    if (error) {
      if (error.code === "PGRST116") {
        return null
      }
      throw new Error(`Failed to fetch agent: ${error.message}`)
    }

    return transformAgentFromDB(data)
  },

  /**
   * Cria um novo agente
   */
  async createAgent(organizationId: string, params: CreateAgentParams): Promise<Agent> {
    const { data, error } = await supabaseClient
      .from("agents")
      .insert([
        {
          organization_id: organizationId,
          name: params.name,
          description: params.description,
          instructions: params.instructions,
          model_name: params.modelName,
          temperature: params.temperature,
          max_tokens: params.maxTokens,
          visibility: params.visibility,
          is_active: params.isActive,
        },
      ])
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to create agent: ${error.message}`)
    }

    return transformAgentFromDB(data)
  },

  /**
   * Atualiza um agente existente
   */
  async updateAgent(id: string, params: UpdateAgentParams): Promise<Agent> {
    const updateData: Record<string, any> = {}

    if (params.name !== undefined) updateData.name = params.name
    if (params.description !== undefined) updateData.description = params.description
    if (params.instructions !== undefined) updateData.instructions = params.instructions
    if (params.modelName !== undefined) updateData.model_name = params.modelName
    if (params.temperature !== undefined) updateData.temperature = params.temperature
    if (params.maxTokens !== undefined) updateData.max_tokens = params.maxTokens
    if (params.visibility !== undefined) updateData.visibility = params.visibility
    if (params.isActive !== undefined) updateData.is_active = params.isActive
    if (params.iconUrl !== undefined) updateData.icon_url = params.iconUrl

    const { data, error } = await supabaseClient.from("agents").update(updateData).eq("id", id).select().single()

    if (error) {
      throw new Error(`Failed to update agent: ${error.message}`)
    }

    return transformAgentFromDB(data)
  },

  /**
   * Remove um agente
   */
  async deleteAgent(id: string): Promise<void> {
    const { error } = await supabaseClient.from("agents").delete().eq("id", id)

    if (error) {
      throw new Error(`Failed to delete agent: ${error.message}`)
    }
  },
}

// Helper function to transform database record to Agent type
function transformAgentFromDB(record: any): Agent {
  return {
    id: record.id,
    organizationId: record.organization_id,
    name: record.name,
    description: record.description || "",
    instructions: record.instructions || "",
    modelName: record.model_name,
    temperature: record.temperature,
    maxTokens: record.max_tokens,
    visibility: record.visibility,
    isActive: record.is_active,
    iconUrl: record.icon_url || null,
    welcomeMessage: record.welcome_message || null,
    createdAt: new Date(record.created_at),
    updatedAt: new Date(record.updated_at),
  }
}
