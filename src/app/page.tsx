import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LoginButton } from "@/domains/auth/components/LoginButton"
import { RegisterButton } from "@/domains/auth/components/RegisterButton"

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container mx-auto flex justify-between items-center py-4">
          <div className="flex items-center">
            <span className="text-xl font-bold bg-gradient-to-r from-[#46B2E0] via-[#8A53D2] to-[#E056A0] text-transparent bg-clip-text">
              AgentSaaS
            </span>
          </div>
          <nav className="flex items-center space-x-4">
            <Link href="/features" className="text-sm font-medium hover:text-primary">
              Recursos
            </Link>
            <Link href="/pricing" className="text-sm font-medium hover:text-primary">
              Preços
            </Link>
            <Link href="/docs" className="text-sm font-medium hover:text-primary">
              Documentação
            </Link>
            <LoginButton variant="ghost" />
            <RegisterButton />
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20">
          <div className="container mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Crie agentes de IA poderosos com{" "}
              <span className="bg-gradient-to-r from-[#46B2E0] via-[#8A53D2] to-[#E056A0] text-transparent bg-clip-text">
                zero código
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Plataforma completa para criar, gerenciar e implantar agentes de IA com conhecimento personalizado e
              integração com múltiplos canais.
            </p>
            <div className="flex justify-center space-x-4">
              <RegisterButton size="lg">Começar Gratuitamente</RegisterButton>
              <Button variant="outline" size="lg" asChild>
                <Link href="/demo">Ver Demo</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Recursos Principais</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Agentes Personalizados</h3>
                <p className="text-gray-600">
                  Crie agentes de IA com personalidade, conhecimento e habilidades específicas para seu negócio.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Base de Conhecimento</h3>
                <p className="text-gray-600">
                  Alimente seus agentes com documentos, FAQs e dados específicos do seu domínio.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Integrações Multicanal</h3>
                <p className="text-gray-600">
                  Conecte seus agentes ao WhatsApp, site, Slack e outras plataformas com facilidade.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">AgentSaaS</h3>
              <p className="text-gray-400">
                Plataforma de criação de agentes de IA para empresas de todos os tamanhos.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Produto</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/features" className="text-gray-400 hover:text-white">
                    Recursos
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-gray-400 hover:text-white">
                    Preços
                  </Link>
                </li>
                <li>
                  <Link href="/roadmap" className="text-gray-400 hover:text-white">
                    Roadmap
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/docs" className="text-gray-400 hover:text-white">
                    Documentação
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-gray-400 hover:text-white">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white">
                    Contato
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/terms" className="text-gray-400 hover:text-white">
                    Termos de Serviço
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-400 hover:text-white">
                    Política de Privacidade
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} AgentSaaS. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
