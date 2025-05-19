# Estrutura do Projeto

Este projeto segue uma arquitetura baseada em Domain-Driven Design (DDD), com separação clara entre:

## Principais Diretórios

- **app/**: Contém todas as rotas e páginas da aplicação usando Next.js App Router
  - Grupos de rotas como `(auth)` para rotas protegidas
  - APIs em `app/api/[domínio]/[ação]/route.ts`
  - Sem lógica de negócio, apenas orquestração e UI

- **domains/**: Organiza a lógica de negócio por domínios
  - Cada domínio tem sua própria estrutura interna (components, hooks, services, types, utils)
  - Documentação específica em README.md para cada domínio

- **components/**: Componentes compartilhados entre domínios
  - Principalmente componentes de UI reutilizáveis

- **lib/**: Utilitários e funções compartilhadas
  - Funções auxiliares, constantes e configurações

- **types/**: Tipos TypeScript globais

## Environment Variables

This project requires several environment variables to function properly. Copy the `.env.example` file to `.env.local` and fill in the values:

\`\`\`bash
cp .env.example .env.local
\`\`\`

Required environment variables:

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Your Clerk publishable key
- `CLERK_SECRET_KEY`: Your Clerk secret key
- `CLERK_WEBHOOK_SECRET`: Your Clerk webhook secret

Optional environment variables:

- `SUPABASE_SERVICE_ROLE_KEY`: For admin operations (use with caution)

## Convenções de Nomenclatura

- **Componentes**: PascalCase (ex: `AgentCard.tsx`)
- **Hooks**: camelCase começando com "use" (ex: `useAgentConfig.ts`)
- **Services**: camelCase (ex: `agentService.ts`)
- **Types**: kebab-case com sufixo .types.ts (ex: `agent.types.ts`)
- **APIs**: kebab-case (ex: `create-agent.ts`)

## Regras de Importação

- Domínios **nunca** importam de app; apenas o inverso
- Evite imports circulares entre domínios
- Use aliases para imports (ex: `@/domains/agents/...`)
- Domínios podem importar de components/ui

## Extensibilidade

Para adicionar um novo domínio, siga o padrão estrutural existente e documente decisões importantes no README.md do domínio.
