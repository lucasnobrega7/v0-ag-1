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
import { useToast } from "@/hooks/use-toast"
import { integrationService } from "../services/integrationService"
import type { Integration } from "../types/integration.types"

interface WhatsAppConfigFormProps {
  integration?: Integration
  isEdit?: boolean
}

/**
 * Formulário para configurar integração com WhatsApp
 */
export function WhatsAppConfigForm({ integration, isEdit = false }: WhatsAppConfigFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: integration?.name || "WhatsApp Integration",
    provider: (integration?.config as any)?.provider || "360dialog",
    apiKey: (integration?.config as any)?.apiKey || "",
    phoneNumberId: (integration?.config as any)?.phoneNumberId || "",
    webhookUrl: (integration?.config as any)?.webhookUrl || "",
    webhookSecret: (integration?.config as any)?.webhookSecret || "",
    welcomeMessage: (integration?.config as any)?.welcomeMessage || "Olá! Como posso ajudar?",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const config = {
        provider: formData.provider,
        apiKey: formData.apiKey,
        phoneNumberId: formData.phoneNumberId,
        webhookUrl: formData.webhookUrl,
        webhookSecret: formData.webhookSecret,
        welcomeMessage: formData.welcomeMessage,
      }

      if (isEdit && integration) {
        await integrationService.updateIntegration({
          id: integration.id,
          name: formData.name,
          config,
        })
        toast({
          title: "Integração atualizada",
          description: "A integração com WhatsApp foi atualizada com sucesso.",
        })
      } else {
        await integrationService.createIntegration("org_123", {
          name: formData.name,
          type: "whatsapp",
          config,
        })
        toast({
          title: "Integração criada",
          description: "A integração com WhatsApp foi criada com sucesso.",
        })
      }

      router.push("/integrations")
    } catch (error) {
      console.error("Erro ao salvar integração:", error)
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar a integração. Tente novamente.",
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
          <CardTitle>{isEdit ? "Editar Integração WhatsApp" : "Nova Integração WhatsApp"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome da Integração</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nome da integração"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="provider">Provedor</Label>
            <Select value={formData.provider} onValueChange={(value) => handleSelectChange("provider", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um provedor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="360dialog">360dialog</SelectItem>
                <SelectItem value="twilio">Twilio</SelectItem>
                <SelectItem value="messagebird">MessageBird</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <Input
              id="apiKey"
              name="apiKey"
              value={formData.apiKey}
              onChange={handleChange}
              placeholder="Chave de API do provedor"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumberId">ID do Número de Telefone</Label>
            <Input
              id="phoneNumberId"
              name="phoneNumberId"
              value={formData.phoneNumberId}
              onChange={handleChange}
              placeholder="ID do número de telefone no WhatsApp Business API"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="webhookUrl">URL do Webhook</Label>
            <Input
              id="webhookUrl"
              name="webhookUrl"
              value={formData.webhookUrl}
              onChange={handleChange}
              placeholder="URL para receber webhooks do WhatsApp"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="webhookSecret">Segredo do Webhook</Label>
            <Input
              id="webhookSecret"
              name="webhookSecret"
              value={formData.webhookSecret}
              onChange={handleChange}
              placeholder="Segredo para verificar webhooks"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="welcomeMessage">Mensagem de Boas-vindas</Label>
            <Textarea
              id="welcomeMessage"
              name="welcomeMessage"
              value={formData.welcomeMessage}
              onChange={handleChange}
              placeholder="Mensagem enviada quando um usuário inicia uma conversa"
              rows={3}
            />
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
