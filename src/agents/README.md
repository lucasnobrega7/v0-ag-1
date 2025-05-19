# Agents Domain

This domain handles the creation, configuration, and management of AI agents.

## Key Components

- `AgentForm`: Form for creating and editing agents
- `AgentList`: List of agents with filtering and sorting
- `AgentSettings`: Configuration options for agents
- `AgentDeployment`: Deployment options for agents

## Services

- `agentService`: CRUD operations for agents
- `agentToolService`: Management of agent tools and capabilities

## API Endpoints

- `GET /api/agents`: List all agents
- `POST /api/agents`: Create a new agent
- `GET /api/agents/[id]`: Get agent details
- `PUT /api/agents/[id]`: Update agent
- `DELETE /api/agents/[id]`: Delete agent
- `POST /api/agents/[id]/query`: Query an agent

## Data Flow

1. User creates/edits an agent via the AgentForm
2. Agent configuration is stored in the database
3. Agent can be connected to datastores for knowledge
4. Agent can be deployed to various channels (web, chat, etc.)
