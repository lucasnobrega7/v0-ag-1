import { supabaseClient } from "@/lib/supabase"
import type { Integration, CreateIntegrationParams, UpdateIntegrationParams } from "../types/integration.types"

/**
 * Serviço para gerenciar integrações
 */
export const integrationService = {
  /**
   * Obtém todas as integrações de uma organização
   */
  async getIntegrations(organizationId: string): Promise<Integration[]> {
    const { data, error } = await supabaseClient
      .from("integrations")
      .select("*")
      .eq("organization_id", organizationId)
      .order("created_at", { ascending: false })

    if (error) {
      throw new Error(`Failed to fetch integrations: ${error.message}`)
    }

    return data.map(transformIntegrationFromDB)
  },

  /**
   * Obtém uma integração pelo ID
   */
  async getIntegrationById(id: string): Promise<Integration | null> {
    const { data, error } = await supabaseClient.from("integrations").select("*").eq("id", id).single()

    if (error) {
      if (error.code === "PGRST116") {
        return null
      }
      throw new Error(`Failed to fetch integration: ${error.message}`)
    }

    return transformIntegrationFromDB(data)
  },

  /**
   * Cria uma nova integração
   */
  async createIntegration(organizationId: string, params: CreateIntegrationParams): Promise<Integration> {
    const { data, error } = await supabaseClient
      .from("integrations")
      .insert([
        {
          organization_id: organizationId,
          name: params.name,
          type: params.type,
          status: "pending",
          config: params.config,
        },
      ])
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to create integration: ${error.message}`)
    }

    return transformIntegrationFromDB(data)
  },

  /**
   * Atualiza uma integração existente
   */
  async updateIntegration(params: UpdateIntegrationParams): Promise<Integration> {
    const updateData: Record<string, any> = {}

    if (params.name) updateData.name = params.name
    if (params.status) updateData.status = params.status
    if (params.config) updateData.config = params.config

    const { data, error } = await supabaseClient
      .from("integrations")
      .update(updateData)
      .eq("id", params.id)
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to update integration: ${error.message}`)
    }

    return transformIntegrationFromDB(data)
  },

  /**
   * Remove uma integração
   */
  async deleteIntegration(id: string): Promise<void> {
    const { error } = await supabaseClient.from("integrations").delete().eq("id", id)

    if (error) {
      throw new Error(`Failed to delete integration: ${error.message}`)
    }
  },
}

// Helper function to transform database record to Integration type
function transformIntegrationFromDB(record: any): Integration {
  return {
    id: record.id,
    organizationId: record.organization_id,
    name: record.name,
    type: record.type,
    status: record.status,
    config: record.config,
    createdAt: new Date(record.created_at),
    updatedAt: new Date(record.updated_at),
  }
}
