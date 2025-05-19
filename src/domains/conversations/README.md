# Domínio: Conversations

Este domínio gerencia todas as interações e históricos de conversas entre usuários e agentes.

## Responsabilidades

- Gerenciamento de mensagens e histórico de conversas
- Interface de chat para interação com agentes
- Processamento de contexto e recuperação de informações
- Armazenamento e recuperação de conversas

## Estrutura

- **components/**: Componentes de UI para conversas
  - `ChatInterface.tsx`: Interface principal de chat
  - `MessageBubble.tsx`: Componente para exibição de mensagens
  - `ConversationHistory.tsx`: Histórico de conversas

- **hooks/**: Hooks React para lógica de conversas
  - `useConversation.ts`: Gerencia estado e operações de uma conversa
  - `useMessages.ts`: Gerencia mensagens e streaming

- **services/**: Serviços para operações de conversas
  - `conversationService.ts`: CRUD e operações principais
  - `messageService.ts`: Processamento de mensagens

- **types/**: Definições de tipos
  - `conversation.types.ts`: Interfaces e tipos para conversas

## Fluxos Principais

1. **Iniciar Conversa**:
   - Usuário seleciona um agente
   - `conversationService.createConversation()` inicia nova conversa
   - Interface de chat é carregada com contexto vazio

2. **Enviar Mensagem**:
   - Usuário envia mensagem via ChatInterface
   - `messageService.sendMessage()` processa e envia ao backend
   - Resposta é recebida via streaming e exibida em tempo real

## Exemplos de Uso

\`\`\`tsx
// Usando o hook de conversas
import { useConversation } from '@/domains/conversations/hooks/useConversation';

function ChatPage({ agentId }) {
  const { 
    messages, 
    isLoading, 
    sendMessage, 
    resetConversation 
  } = useConversation(agentId);

  const handleSend = (content) => {
    sendMessage(content);
  };

  return (
    <ChatInterface 
      messages={messages}
      isLoading={isLoading}
      onSendMessage={handleSend}
      onReset={resetConversation}
    />
  );
}
