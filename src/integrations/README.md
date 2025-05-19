# Integrations Domain

This domain handles connections to third-party services.

## Key Components

- `IntegrationList`: List of available integrations
- `IntegrationForm`: Form for configuring integrations
- `IntegrationSettings`: Settings for each integration type

## Services

- `integrationService`: Management of integration configurations
- `webhookService`: Processing of incoming webhooks
- `eventDispatcherService`: Dispatching events to integrations

## API Endpoints

- `GET /api/integrations`: List all integrations
- `POST /api/integrations`: Create a new integration
- `GET /api/integrations/[id]`: Get integration details
- `PUT /api/integrations/[id]`: Update integration
- `DELETE /api/integrations/[id]`: Delete integration
- `POST /api/webhooks/[type]`: Webhook endpoint for integrations

## Supported Integrations

- WhatsApp
- Telegram
- Zendesk
- Crisp
- Google Drive
- ChatGPT

## Data Flow

1. User configures an integration
2. Integration is connected to an agent
3. Messages from external services are received via webhooks
4. Agent responses are sent back to the external service
