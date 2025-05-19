import { ChatInterface } from "@/domains/conversations/components/ChatInterface"
import { getCurrentUser } from "@/domains/auth/services/authService"
import { agentService } from "@/domains/agents/services/agentService"
import { redirect } from "next/navigation"

export default async function AgentChatPage({ params }: { params: { id: string } }) {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/dashboard")
  }

  const agent = await agentService.getAgentById(params.id)

  if (!agent) {
    redirect("/agents")
  }

  // Para agentes públicos, qualquer um pode acessar
  // Para agentes privados, verificar acesso da organização
  if (agent.visibility === "private" && agent.organizationId !== user.organizationId) {
    redirect("/agents")
  }

  return (
    <div className="h-[calc(100vh-8rem)]">
      <ChatInterface agentId={params.id} agentName={agent.name} />
    </div>
  )
}
