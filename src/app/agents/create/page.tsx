import { AgentForm } from "@/domains/agents/components/AgentForm"
import { getCurrentUser } from "@/domains/auth/services/authService"
import { redirect } from "next/navigation"

export default async function CreateAgentPage() {
  const user = await getCurrentUser()

  if (!user || !user.organizationId) {
    redirect("/dashboard")
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Criar Novo Agente</h1>
      <AgentForm organizationId={user.organizationId} />
    </div>
  )
}
