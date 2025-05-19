import { type NextRequest, NextResponse } from "next/server"
import { agentService } from "../services/agentService"
import { getCurrentUser } from "@/domains/auth/services/authService"
import { z } from "zod"

const updateAgentSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").optional(),
  description: z.string().min(1, "Descrição é obrigatória").optional(),
  instructions: z.string().min(1, "Instruções são obrigatórias").optional(),
  modelName: z
    .enum(["gpt-3.5-turbo", "gpt-4", "gpt-4o", "claude-3-opus", "claude-3-sonnet", "claude-3-haiku"])
    .optional(),
  temperature: z.number().min(0).max(1).optional(),
  visibility: z.enum(["public", "private", "organization"]).optional(),
  handle: z.string().optional(),
  includeSources: z.boolean().optional(),
  iconUrl: z.string().optional(),
  interfaceConfig: z.record(z.any()).optional(),
})

/**
 * Endpoint para atualizar um agente existente
 */
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const agentId = params.id
    const agent = await agentService.getAgentById(agentId)

    if (!agent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 })
    }

    // Verificar se o usuário tem acesso a este agente
    if (agent.organizationId !== user.organizationId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const body = await req.json()

    const validationResult = updateAgentSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json({ error: "Validation error", details: validationResult.error.format() }, { status: 400 })
    }

    const updatedAgent = await agentService.updateAgent({
      id: agentId,
      ...validationResult.data,
    })

    return NextResponse.json(updatedAgent)
  } catch (error) {
    console.error("Error updating agent:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update agent" },
      { status: 500 },
    )
  }
}
