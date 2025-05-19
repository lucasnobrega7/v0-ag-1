# Datastores Domain

This domain handles the creation and management of knowledge bases (datastores).

## Key Components

- `DatastoreForm`: Form for creating and editing datastores
- `DatastoreList`: List of datastores with filtering and sorting
- `DatastoreSettings`: Configuration options for datastores

## Services

- `datastoreService`: CRUD operations for datastores
- `vectorStoreService`: Management of vector embeddings and search

## API Endpoints

- `GET /api/datastores`: List all datastores
- `POST /api/datastores`: Create a new datastore
- `GET /api/datastores/[id]`: Get datastore details
- `PUT /api/datastores/[id]`: Update datastore
- `DELETE /api/datastores/[id]`: Delete datastore
- `POST /api/datastores/[id]/search`: Search within a datastore

## Data Flow

1. User creates a datastore
2. User uploads documents to the datastore
3. Documents are processed and indexed
4. Agents can be connected to datastores for knowledge retrieval
