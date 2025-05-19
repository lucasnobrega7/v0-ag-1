# Componentes Compartilhados

Esta pasta contém componentes de UI reutilizáveis que são compartilhados entre diferentes domínios da aplicação.

## Estrutura

- **ui/**: Componentes básicos de interface
  - Botões, cards, inputs, modais, etc.
  - Componentes de layout e navegação
  - Componentes de feedback (toasts, alertas)

## Princípios de Design

1. **Consistência**: Todos os componentes seguem o mesmo estilo visual e comportamental
2. **Acessibilidade**: Componentes são acessíveis por padrão (ARIA, contraste, navegação por teclado)
3. **Responsividade**: Adaptação a diferentes tamanhos de tela
4. **Reutilização**: Componentes são projetados para serem reutilizáveis em diferentes contextos

## Tema Visual

- **Cores Primárias**:
  - Fundo: #0e0e10
  - Cards: #1a1a1d com borda #27272a
  - Gradiente accent: #46B2E0 → #8A53D2 → #E056A0
  - Tipografia: fonte branca 90%

## Uso de Componentes

\`\`\`tsx
// Exemplo de uso de componentes compartilhados
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

function MyComponent() {
  return (
    <Card>
      <CardHeader>Título do Card</CardHeader>
      <CardContent>
        <Input placeholder="Digite algo..." />
        <Button variant="primary">Enviar</Button>
      </CardContent>
    </Card>
  );
}
\`\`\`

## Extensão de Componentes

Para estender ou personalizar componentes para necessidades específicas de domínio, crie um novo componente no domínio que utilize os componentes base:

\`\`\`tsx
// Em domains/agents/components/AgentCard.tsx
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export function AgentCard({ agent }) {
  return (
    <Card className="agent-card">
      <CardHeader>
        {agent.name}
        <Badge variant={agent.status === 'active' ? 'success' : 'warning'}>
          {agent.status}
        </Badge>
      </CardHeader>
      <CardContent>{agent.description}</CardContent>
    </Card>
  );
}
