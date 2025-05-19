import { AgentForm } from "@/domains/agents/components/AgentForm"
import { getCurrentUser } from "@/domains/auth/services/authService"
import { agentService } from "@/domains/agents/services/agentService"
import { redirect } from "next/navigation"

export default async function AgentSettingsPage({ params }: { params: { id: string } }) {
  const user = await getCurrentUser()

  if (!user || !user.organizationId) {
    redirect("/dashboard")
  }

  const agent = await agentService.getAgentById(params.id)

  if (!agent) {
    redirect("/agents")
  }

  // Verificar se o usuário tem acesso a este agente
  if (agent.organizationId !== user.organizationId) {
    redirect("/agents")
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Configurações do Agente</h1>
      <AgentForm agent={agent} organizationId={user.organizationId} />
    </div>
  )
}
