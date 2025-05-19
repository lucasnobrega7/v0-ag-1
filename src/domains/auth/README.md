# Domínio: Auth

Este domínio gerencia autenticação, autorização e perfis de usuário na plataforma.

## Responsabilidades

- Autenticação de usuários (login/registro)
- Gerenciamento de sessões
- Autorização e controle de acesso
- Perfis de usuário e organizações

## Estrutura

- **components/**: Componentes de UI para autenticação
  - `LoginForm.tsx`: Formulário de login
  - `RegisterForm.tsx`: Formulário de registro
  - `UserProfile.tsx`: Exibição e edição de perfil

- **hooks/**: Hooks React para lógica de autenticação
  - `useAuth.ts`: Gerencia estado de autenticação
  - `useUser.ts`: Acesso a dados do usuário atual
  - `usePermissions.ts`: Verificação de permissões

- **services/**: Serviços para operações de autenticação
  - `authService.ts`: Login, registro e gerenciamento de sessão
  - `userService.ts`: Operações relacionadas a usuários

- **types/**: Definições de tipos
  - `auth.types.ts`: Interfaces e tipos para autenticação

## Integração com Clerk

Este domínio utiliza Clerk como provedor de autenticação, com sincronização para o Supabase para persistência de dados.

## Fluxos Principais

1. **Autenticação de Usuário**:
   - Usuário preenche formulário de login/registro
   - Clerk processa autenticação
   - Webhook sincroniza dados com Supabase
   - Redirecionamento para dashboard

2. **Verificação de Permissões**:
   - Middleware verifica autenticação em rotas protegidas
   - `usePermissions` verifica permissões específicas
   - UI adapta-se com base nas permissões do usuário

## Exemplos de Uso

\`\`\`tsx
// Verificando autenticação e permissões
import { useAuth } from '@/domains/auth/hooks/useAuth';
import { usePermissions } from '@/domains/auth/hooks/usePermissions';

function ProtectedFeature() {
  const { user, isLoading } = useAuth();
  const { can } = usePermissions();

  if (isLoading) return <LoadingSpinner />;
  if (!user) return <LoginRedirect />;
  
  const canEditAgents = can('edit', 'agent');
  
  return (
    <div>
      <h1>Bem-vindo, {user.name}</h1>
      {canEditAgents && <EditButton />}
    </div>
  );
}
