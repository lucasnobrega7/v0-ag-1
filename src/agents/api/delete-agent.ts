import { type NextRequest, NextResponse } from "next/server"
import { agentService } from "../services/agent-service"
import { getCurrentUser } from "@/src/lib/auth/get-current-user"

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
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

    // Check if user has access to this agent
    if (agent.organizationId !== user.organizationId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    await agentService.deleteAgent(agentId)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting agent:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete agent" },
      { status: 500 },
    )
  }
}
