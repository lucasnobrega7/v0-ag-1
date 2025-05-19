# Domínio: Datastores

Este domínio gerencia bases de conhecimento e armazenamento vetorial para os agentes.

## Responsabilidades

- Criação e gerenciamento de datastores
- Armazenamento e recuperação de embeddings
- Busca semântica e recuperação de contexto
- Integração com fontes de dados

## Estrutura

- **components/**: Componentes de UI para datastores
  - `DatastoreList.tsx`: Lista de datastores
  - `DatastoreForm.tsx`: Formulário para criação/edição
  - `VectorSearch.tsx`: Interface para busca vetorial

- **hooks/**: Hooks React para lógica de datastores
  - `useDatastore.ts`: Gerencia operações de datastores
  - `useVectorSearch.ts`: Facilita buscas vetoriais

- **services/**: Serviços para operações de datastores
  - `datastoreService.ts`: CRUD e operações principais
  - `vectorService.ts`: Operações com embeddings e busca

- **types/**: Definições de tipos
  - `datastore.types.ts`: Interfaces e tipos para datastores

## Fluxos Principais

1. **Criação de Datastore**:
   - Usuário cria datastore via formulário
   - `datastoreService.createDatastore()` processa e salva
   - Datastore fica disponível para associação com agentes

2. **Busca Vetorial**:
   - Agente envia consulta durante conversa
   - `vectorService.search()` encontra contextos relevantes
   - Contexto é incorporado na resposta do agente

## Exemplos de Uso

\`\`\`tsx
// Realizando busca vetorial
import { vectorService } from '@/domains/datastores/services/vectorService';

async function searchRelevantContext(query, datastoreIds) {
  try {
    const results = await vectorService.search({
      query,
      datastoreIds,
      limit: 5,
      threshold: 0.75
    });
    
    return results.map(r => r.content).join('\n\n');
  } catch (error) {
    console.error('Falha na busca vetorial:', error);
    return '';
  }
}
