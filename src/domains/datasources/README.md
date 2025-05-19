# Domínio: Datasources

Este domínio gerencia fontes de dados e processamento de documentos para alimentar datastores.

## Responsabilidades

- Upload e processamento de documentos
- Integração com fontes externas (web, APIs)
- Extração de texto e geração de embeddings
- Sincronização com datastores

## Estrutura

- **components/**: Componentes de UI para datasources
  - `FileUploader.tsx`: Interface para upload de arquivos
  - `WebScraper.tsx`: Interface para scraping de websites
  - `DatasourceList.tsx`: Lista de fontes de dados

- **hooks/**: Hooks React para lógica de datasources
  - `useDatasource.ts`: Gerencia operações de datasources
  - `useFileUpload.ts`: Facilita upload de arquivos

- **services/**: Serviços para operações de datasources
  - `datasourceService.ts`: CRUD e operações principais
  - `processorService.ts`: Processamento de documentos
  - `extractorService.ts`: Extração de texto de diferentes formatos

- **types/**: Definições de tipos
  - `datasource.types.ts`: Interfaces e tipos para datasources

## Fluxos Principais

1. **Upload de Documento**:
   - Usuário faz upload de arquivo (PDF, DOCX, etc.)
   - `processorService.processFile()` extrai texto e metadados
   - Texto é dividido em chunks e transformado em embeddings
   - Embeddings são armazenados no datastore associado

2. **Sincronização de Fonte Web**:
   - Usuário configura URL para scraping
   - `extractorService.extractFromWeb()` obtém conteúdo
   - Conteúdo é processado e armazenado como datasource
   - Agendamento de ressincronização periódica (opcional)

## Exemplos de Uso

\`\`\`tsx
// Processando upload de arquivo
import { processorService } from '@/domains/datasources/services/processorService';

async function handleFileUpload(file, datastoreId) {
  try {
    const uploadResult = await processorService.processFile({
      file,
      datastoreId,
      options: {
        chunkSize: 1000,
        overlap: 200
      }
    });
    
    return {
      success: true,
      documentId: uploadResult.id,
      chunks: uploadResult.chunks.length
    };
  } catch (error) {
    console.error('Falha no processamento do arquivo:', error);
    return { success: false, error: error.message };
  }
}
