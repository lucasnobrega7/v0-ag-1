"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { agentService } from "../services/agentService"
import type { CreateAgentParams } from "../types/agent.types"

interface AgentFormProps {
  organizationId: string
  onSuccess?: () => void
}

export function AgentForm({ organizationId, onSuccess }: AgentFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<CreateAgentParams>({
    name: "",
    description: "",
    instructions: "",
    modelName: "gpt-4",
    visibility: "private",
    iconUrl: "",
    isPublished: false,
    organizationId,
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
    setIsSubmitting(true)

    try {
      await agentService.createAgent(formData)
      if (onSuccess) {
        onSuccess()
      } else {
        router.push("/agents")
      }
    } catch (error) {
      console.error("Error creating agent:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Criar Novo Agente</CardTitle>
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
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="modelName">Modelo</Label>
            <Select value={formData.modelName} onValueChange={(value) => handleSelectChange("modelName", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um modelo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-4">GPT-4</SelectItem>
                <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                <SelectItem value="claude-2">Claude 2</SelectItem>
                <SelectItem value="llama-2">Llama 2</SelectItem>
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

          <div className="space-y-2">
            <Label htmlFor="iconUrl">URL do Ícone</Label>
            <Input
              id="iconUrl"
              name="iconUrl"
              value={formData.iconUrl}
              onChange={handleChange}
              placeholder="https://exemplo.com/icone.png"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isPublished"
              checked={formData.isPublished}
              onCheckedChange={(checked) => handleSwitchChange("isPublished", checked)}
            />
            <Label htmlFor="isPublished">Publicar agente</Label>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Criando..." : "Criar Agente"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
