# Datasources Domain

This domain handles document processing and data ingestion.

## Key Components

- `DocumentUpload`: Component for uploading documents
- `DocumentList`: List of documents with filtering and sorting
- `ProcessingStatus`: Status indicator for document processing

## Services

- `documentProcessorService`: Processing and chunking of documents
- `embeddingService`: Generation of vector embeddings

## API Endpoints

- `POST /api/datasources/upload`: Upload a new document
- `GET /api/datasources`: List all datasources
- `GET /api/datasources/[id]`: Get datasource details
- `DELETE /api/datasources/[id]`: Delete datasource
- `GET /api/datasources/[id]/status`: Check processing status

## Data Flow

1. User uploads a document
2. Document is processed (text extraction, chunking)
3. Text chunks are embedded and stored in the vector database
4. Document becomes available for agent queries
