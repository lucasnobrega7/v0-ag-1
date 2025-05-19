"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { integrationService } from "../services/integrationService"
import type { CreateIntegrationParams } from "../types/integration.types"

interface WhatsAppConfigFormProps {
  organizationId: string
  onSuccess?: () => void
}

export function WhatsAppConfigForm({ organizationId, onSuccess }: WhatsAppConfigFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<{
    name: string
    provider: string
    apiKey: string
    phoneNumberId: string
    webhookSecret: string
    isDefault: boolean
  }>({
    name: "",
    provider: "meta",
    apiKey: "",
    phoneNumberId: "",
    webhookSecret: "",
    isDefault: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      const integrationData: CreateIntegrationParams = {
        name: formData.name,
        type: "whatsapp",
        config: {
          provider: formData.provider,
          apiKey: formData.apiKey,
          phoneNumberId: formData.phoneNumberId,
          webhookSecret: formData.webhookSecret,
          isDefault: formData.isDefault,
        },
      }

      await integrationService.createIntegration(organizationId, integrationData)

      if (onSuccess) {
        onSuccess()
      } else {
        router.push("/integrations")
      }
    } catch (error) {
      console.error("Error creating WhatsApp integration:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Configurar WhatsApp</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome da Integração</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ex: WhatsApp Principal"
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
                <SelectItem value="meta">Meta (WhatsApp Business API)</SelectItem>
                <SelectItem value="twilio">Twilio</SelectItem>
                <SelectItem value="360dialog">360dialog</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="apiKey">Chave de API</Label>
            <Input
              id="apiKey"
              name="apiKey"
              value={formData.apiKey}
              onChange={handleChange}
              placeholder="Sua chave de API do provedor"
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
              placeholder="ID do número de telefone no WhatsApp Business"
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
              placeholder="Segredo para verificação de webhooks"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isDefault"
              checked={formData.isDefault}
              onCheckedChange={(checked) => handleSwitchChange("isDefault", checked)}
            />
            <Label htmlFor="isDefault">Definir como integração padrão</Label>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Configurando..." : "Configurar WhatsApp"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
