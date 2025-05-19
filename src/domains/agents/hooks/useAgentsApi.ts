"use client"

import { useState } from "react"
import { agentApiService } from "../services/agentApiService"
import type { Agent, CreateAgentParams, AgentQuery, AgentResponse } from "../types"
import { useToast } from "@/components/ui/use-toast"

/**
 * Hook para interagir com a API de agentes
 */
export function useAgentsApi() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const { toast } = useToast()

  const createAgent = async (data: CreateAgentParams): Promise<Agent | null> => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await agentApiService.createAgent(data)
      return result
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Erro ao criar agente")
      setError(error)
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      })
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const getAgent = async (agentId: string): Promise<Agent | null> => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await agentApiService.getAgent(agentId)
      return result
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Erro ao obter agente")
      setError(error)
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      })
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const updateAgent = async (agentId: string, data: Partial<CreateAgentParams>): Promise<Agent | null> => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await agentApiService.updateAgent(agentId, data)
      return result
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Erro ao atualizar agente")
      setError(error)
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      })
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const deleteAgent = async (agentId: string): Promise<boolean> => {
    setIsLoading(true)
    setError(null)

    try {
      await agentApiService.deleteAgent(agentId)
      return true
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Erro ao excluir agente")
      setError(error)
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const queryAgent = async (agentId: string, query: AgentQuery): Promise<AgentResponse | null> => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await agentApiService.queryAgent(agentId, query)
      return result
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Erro ao consultar agente")
      setError(error)
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      })
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const listAgents = async (): Promise<Agent[]> => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await agentApiService.listAgents()
      return result
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Erro ao listar agentes")
      setError(error)
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      })
      return []
    } finally {
      setIsLoading(false)
    }
  }

  return {
    createAgent,
    getAgent,
    updateAgent,
    deleteAgent,
    queryAgent,
    listAgents,
    isLoading,
    error,
  }
}
