"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { agentService } from "../services/agentService"
import type { Agent, CreateAgentParams } from "../types/agent.types"

interface AgentFormProps {
  agent?: Agent
  isEdit?: boolean
}

/**
 * Formulário para criar ou editar um agente
 */
export function AgentForm({ agent, isEdit = false }: AgentFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<CreateAgentParams>({
    name: agent?.name || "",
    description: agent?.description || "",
    instructions: agent?.instructions || "",
    modelName: agent?.modelName || "gpt-4",
    temperature: agent?.temperature || 0.7,
    maxTokens: agent?.maxTokens || 2000,
    visibility: agent?.visibility || "private",
    isActive: agent?.isActive ?? true,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (isEdit && agent) {
        await agentService.updateAgent(agent.id, formData)
        toast({
          title: "Agente atualizado",
          description: "O agente foi atualizado com sucesso.",
        })
      } else {
        await agentService.createAgent("org_123", formData) // Substitua pelo ID da organização real
        toast({
          title: "Agente criado",
          description: "O agente foi criado com sucesso.",
        })
      }

      router.push("/agents")
    } catch (error) {
      console.error("Erro ao salvar agente:", error)
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar o agente. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>{isEdit ? "Editar Agente" : "Criar Novo Agente"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nome do agente"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Descreva o propósito deste agente"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="instructions">Instruções</Label>
            <Textarea
              id="instructions"
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              placeholder="Instruções detalhadas para o comportamento do agente"
              rows={5}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="modelName">Modelo</Label>
              <Select value={formData.modelName} onValueChange={(value) => handleSelectChange("modelName", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um modelo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                  <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                  <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                  <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
                  <SelectItem value="claude-3-sonnet">Claude 3 Sonnet</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="visibility">Visibilidade</Label>
              <Select
                value={formData.visibility}
                onValueChange={(value) => handleSelectChange("visibility", value as "public" | "private")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a visibilidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="private">Privado</SelectItem>
                  <SelectItem value="public">Público</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="temperature">Temperatura ({formData.temperature})</Label>
              <Input
                id="temperature"
                name="temperature"
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={formData.temperature}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxTokens">Tokens Máximos</Label>
              <Input
                id="maxTokens"
                name="maxTokens"
                type="number"
                min="100"
                max="8000"
                value={formData.maxTokens}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => handleSwitchChange("isActive", checked)}
            />
            <Label htmlFor="isActive">Ativo</Label>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button" onClick={() => router.back()}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Salvando..." : isEdit ? "Atualizar" : "Criar"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
