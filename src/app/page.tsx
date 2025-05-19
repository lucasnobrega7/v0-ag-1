import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LoginButton } from "@/domains/auth/components/LoginButton"
import { RegisterButton } from "@/domains/auth/components/RegisterButton"

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center">
        <Link className="flex items-center justify-center" href="/">
          <span className="text-xl font-bold bg-gradient-to-r from-[#46B2E0] via-[#8A53D2] to-[#E056A0] text-transparent bg-clip-text">
            AgentSaaS
          </span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#features"
          >
            Recursos
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#pricing"
          >
            Preços
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#about"
          >
            Sobre
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/docs"
          >
            Documentação
          </Link>
        </nav>
        <div className="ml-4 flex items-center gap-2">
          <LoginButton variant="ghost" size="sm">Entrar</LoginButton>
          <RegisterButton>Criar Conta</RegisterButton>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Crie agentes de IA poderosos sem código
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Transforme seu conhecimento em agentes inteligentes que interagem com seus clientes 24/7.
                    Sem necessidade de programação.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <RegisterButton className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                    Começar Gratuitamente
                  </RegisterButton>
                  <Button variant="outline" asChild>
                    <Link href="/docs">Ver Documentação</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  alt="Hero"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                  height="310"
                  src="/futuristic-helper-robot.png"
                  width="550"
                />
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  Recursos
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Tudo que você precisa para criar agentes inteligentes</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Nossa plataforma oferece todas as ferramentas necessárias para criar, treinar e gerenciar agentes de IA
                  que se integram perfeitamente ao seu negócio.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-4">
                <div className="rounded-full bg-gray-100 p-2 dark:bg-gray-800">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 8V4H8" />
                    <rect height="16" rx="2" width="16" x="4" y="4" />
                    <path d="M16 8h.01" />
                    <path d="M16 12h.01" />
                    <path d="M12 12h.01" />
                    <path d="M12 16h.01" />
                    <path d="M16 16h.01" />
                    <path d="M8 12h.01" />
                    <path d="M8 16h.01" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Editor Visual de Fluxos</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Crie fluxos de conversação complexos com nossa interface visual intuitiva, sem precisar escrever código.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-4">
                <div className="rounded-full bg-gray-100 p-2 dark:bg-gray-800">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M21 15V6" />
                    <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                    <path d="M12 12H3" />
                    <path d="M16 6H3" />
                    <path d="M12 18H3" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Base de Conhecimento</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Alimente seus agentes com documentos, FAQs e dados personalizados para respostas precisas e contextuais.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-4">
                <div className="rounded-full bg-gray-100 p-2 dark:bg-gray-800">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m8 6 4-4 4 4" />
                    <path d="M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22" />
                    <path d="m20 22-5-5" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Integrações</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Conecte seus agentes com WhatsApp, Slack, e outras plataformas para alcançar seus clientes onde eles estão.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-4">
                <div className="rounded-full bg-gray-100 p-2 dark:bg-gray-800">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0" />
                    <path d="M12 8v4l2 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Disponibilidade 24/7</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Seus agentes estão sempre disponíveis para atender clientes, responder perguntas e resolver problemas.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-4">
                <div className="rounded-full bg-gray-100 p-2 dark:bg-gray-800">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2v8" />
                    <path d="m4.93 10.93 1.41 1.41" />
                    <path d="M2 18h2" />
                    <path d="M20 18h2" />
                    <path d="m19.07 10.93-1.41 1.41" />
                    <path d="M22 22H2" />
                    <path d="m16 6-4 4-4-4" />
                    <path d="M16 18a4 4 0 0 0-8 0" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Analytics Avançado</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Acompanhe o desempenho dos seus agentes com métricas detalhadas e insights acionáveis.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-4">
                <div className="rounded-full bg-gray-100 p-2 dark:bg-gray-800">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Personalização Total</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Adapte seus agentes à identidade da sua marca, com personalização de tom, estilo e aparência.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  Preços
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Planos para todos os tamanhos de negócio</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Escolha o plano que melhor se adapta às suas necessidades. Todos os planos incluem acesso a recursos essenciais.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 lg:grid-cols-3">
              <div className="flex flex-col rounded-lg border bg-white p-6 shadow-sm dark:bg-gray-950">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Starter</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Perfeito para pequenas empresas e startups.</p>
                </div>
                <div className="mt-4 flex items-baseline text-gray-900 dark:text-gray-50">
                  <span className="text-3xl font-bold tracking-tight">R$99</span>
                  <span className="ml-1 text-xl font-semibold">/mês</span>
                </div>
                <ul className="mt-6 space-y-4">
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-4 w-4 text-green-500 dark:text-green-400"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>2 agentes</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-4 w-4 text-green-500 dark:text-green-400"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>500 mensagens/mês</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-4 w-4 text-green-500 dark:text-green-400"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>1 integração</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-4 w-4 text-green-500 dark:text-green-400"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Analytics básico</span>
                  </li>
                </ul>
                <Button className="mt-8">Começar Agora</Button>
              </div>
              <div className="flex flex-col rounded-lg border bg-primary p-6 shadow-sm dark:bg-gray-900">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-primary-foreground">Pro</h3>
                  <p className="text-sm text-primary-foreground/80">Para empresas em crescimento com mais necessidades.</p>
                </div>
                <div className="mt-4 flex items-baseline text-primary-foreground">
                  <span className="text-3xl font-bold tracking-tight">R$299</span>
                  <span className="ml-1 text-xl font-semibold">/mês</span>
                </div>
                <ul className="mt-6 space-y-4 text-primary-foreground/80">
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-4 w-4 text-primary-foreground"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>10 agentes</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-4 w-4 text-primary-foreground"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>5.000 mensagens/mês</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-4 w-4 text-primary-foreground"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>3 integrações</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-4 w-4 text-primary-foreground"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Analytics avançado</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-4 w-4 text-primary-foreground"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Suporte prioritário</span>
                  </li>
                </ul>
                <Button className="mt-8 bg-white text-primary hover:bg-white/90">Escolher Plano</Button>
              </div>
              <div className="flex flex-col rounded-lg border bg-white p-6 shadow-sm dark:bg-gray-950">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Enterprise</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Para grandes empresas com necessidades específicas.</p>
                </div>
                <div className="mt-4 flex items-baseline text-gray-900 dark:text-gray-50">
                  <span className="text-3xl font-bold tracking-tight">Personalizado</span>
                </div>
                <ul className="mt-6 space-y-4">
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-4 w-4 text-green-500 dark:text-green-400"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Agentes ilimitados</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-4 w-4 text-green-500 dark:text-green-400"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Mensagens ilimitadas</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-4 w-4 text-green-500 dark:text-green-400"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Integrações ilimitadas</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-4 w-4 text-green-500 dark:text-green-400"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Gerente de conta dedicado</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-4 w-4 text-green-500 dark:text-green-400"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"\
