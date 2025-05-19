# Domínio: Agents

Este domínio gerencia todos os aspectos relacionados aos agentes de IA na plataforma.

## Responsabilidades

- Criação, edição e exclusão de agentes
- Configuração de modelos e parâmetros
- Gerenciamento de instruções e conhecimento
- Interface de usuário para interação com agentes

## Estrutura

- **components/**: Componentes de UI específicos para agentes
  - `AgentCard.tsx`: Card para exibição resumida de um agente
  - `AgentList.tsx`: Lista de agentes com filtragem e busca
  - `AgentSettingsForm.tsx`: Formulário para configuração de agentes

- **hooks/**: Hooks React para lógica de agentes
  - `useAgentConfig.ts`: Gerencia configurações de agentes
  - `useAgentState.ts`: Gerencia estado de agentes durante interações

- **services/**: Serviços para operações de agentes
  - `agentService.ts`: CRUD e operações principais
  - `modelService.ts`: Interação com modelos de IA

- **types/**: Definições de tipos
  - `agent.types.ts`: Interfaces e tipos para agentes

- **utils/**: Funções auxiliares específicas para agentes

## Fluxos Principais

1. **Criação de Agente**:
   - Usuário preenche formulário de criação
   - `agentService.createAgent()` processa e salva no backend
   - Redirecionamento para página de configuração

2. **Consulta a Agente**:
   - Mensagem enviada via `conversationService`
   - Contexto recuperado de datastores associados
   - Resposta processada e exibida na interface

## Exemplos de Uso

\`\`\`tsx
// Criando um novo agente
import { agentService } from '@/domains/agents/services/agentService';

const createNewAgent = async (data) => {
  try {
    const agent = await agentService.createAgent({
      name: data.name,
      description: data.description,
      modelName: data.modelName,
      instructions: data.instructions
    });
    return agent;
  } catch (error) {
    console.error('Falha ao criar agente:', error);
  }
};
