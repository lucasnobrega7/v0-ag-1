import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BarChart2, MessageSquare, Database, FileText, Plug } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-[#1a1a1d] border-[#27272a]">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Agentes</CardTitle>
            <CardDescription>Total de agentes criados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0</div>
            <Button asChild variant="link" className="p-0 h-auto mt-2">
              <Link href="/agents">Ver agentes</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1a1d] border-[#27272a]">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Datastores</CardTitle>
            <CardDescription>Bases de conhecimento</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0</div>
            <Button asChild variant="link" className="p-0 h-auto mt-2">
              <Link href="/datastores">Ver datastores</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1a1d] border-[#27272a]">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Datasources</CardTitle>
            <CardDescription>Fontes de dados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0</div>
            <Button asChild variant="link" className="p-0 h-auto mt-2">
              <Link href="/datasources">Ver datasources</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1a1d] border-[#27272a]">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Integrações</CardTitle>
            <CardDescription>Conexões externas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0</div>
            <Button asChild variant="link" className="p-0 h-auto mt-2">
              <Link href="/integrations">Ver integrações</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 bg-[#1a1a1d] border-[#27272a]">
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
            <CardDescription>Últimas interações com seus agentes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              <MessageSquare className="mx-auto h-12 w-12 opacity-20" />
              <p className="mt-2">Nenhuma atividade recente</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1a1d] border-[#27272a]">
          <CardHeader>
            <CardTitle>Acesso Rápido</CardTitle>
            <CardDescription>Ações comuns</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild className="w-full justify-start" variant="outline">
              <Link href="/agents/create">
                <MessageSquare className="mr-2 h-4 w-4" />
                Criar Agente
              </Link>
            </Button>
            <Button asChild className="w-full justify-start" variant="outline">
              <Link href="/datastores/create">
                <Database className="mr-2 h-4 w-4" />
                Criar Datastore
              </Link>
            </Button>
            <Button asChild className="w-full justify-start" variant="outline">
              <Link href="/datasources/upload">
                <FileText className="mr-2 h-4 w-4" />
                Upload de Documento
              </Link>
            </Button>
            <Button asChild className="w-full justify-start" variant="outline">
              <Link href="/integrations/create">
                <Plug className="mr-2 h-4 w-4" />
                Adicionar Integração
              </Link>
            </Button>
            <Button asChild className="w-full justify-start" variant="outline">
              <Link href="/analytics">
                <BarChart2 className="mr-2 h-4 w-4" />
                Ver Analytics
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
