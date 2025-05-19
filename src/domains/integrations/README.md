# Domínio: Integrations

Este domínio gerencia integrações com serviços externos como WhatsApp, Slack, e outros.

## Responsabilidades

- Configuração e gerenciamento de integrações
- Webhooks para comunicação bidirecional
- Autenticação com serviços externos
- Roteamento de mensagens entre plataformas

## Estrutura

- **components/**: Componentes de UI para integrações
  - `IntegrationCard.tsx`: Card para exibição de integrações
  - `WhatsAppConfig.tsx`: Configuração de WhatsApp
  - `SlackConfig.tsx`: Configuração de Slack

- **hooks/**: Hooks React para lógica de integrações
  - `useIntegration.ts`: Gerencia estado de integrações
  - `useWebhook.ts`: Facilita configuração de webhooks

- **services/**: Serviços para operações de integrações
  - `integrationService.ts`: CRUD e operações principais
  - `whatsappService.ts`: Operações específicas para WhatsApp
  - `slackService.ts`: Operações específicas para Slack

- **types/**: Definições de tipos
  - `integration.types.ts`: Interfaces e tipos para integrações

## Integrações Suportadas

- **WhatsApp**: Via Z-API ou Evolution API
- **Slack**: Mensagens e notificações
- **Telegram**: Bot para interações
- **Discord**: Bot para interações
- **Email**: Notificações e respostas

## Fluxos Principais

1. **Configuração de WhatsApp**:
   - Usuário fornece credenciais da Z-API
   - `whatsappService.configure()` valida e salva configuração
   - Webhook é configurado para receber mensagens
   - QR Code é exibido para conexão (se necessário)

2. **Recebimento de Mensagem**:
   - Webhook recebe mensagem de plataforma externa
   - `integrationService.routeMessage()` identifica agente e conversa
   - Mensagem é processada e resposta é enviada de volta

## Exemplos de Uso

\`\`\`tsx
// Configurando integração com WhatsApp
import { whatsappService } from '@/domains/integrations/services/whatsappService';

async function setupWhatsAppIntegration(config) {
  try {
    const integration = await whatsappService.configure({
      apiKey: config.apiKey,
      instanceId: config.instanceId,
      phoneNumber: config.phoneNumber,
      agentId: config.defaultAgentId
    });
    
    return {
      success: true,
      integrationId: integration.id,
      webhookUrl: integration.webhookUrl
    };
  } catch (error) {
    console.error('Falha na configuração do WhatsApp:', error);
    return { success: false, error: error.message };
  }
}
