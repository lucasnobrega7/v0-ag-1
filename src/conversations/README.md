# Conversations Domain

This domain handles chat interactions with agents.

## Key Components

- `ChatInterface`: Main chat UI component
- `MessageList`: Display of conversation messages
- `MessageInput`: Input for user messages

## Services

- `conversationService`: Management of conversation history
- `messageService`: Processing and storage of messages

## API Endpoints

- `GET /api/conversations`: List all conversations
- `GET /api/conversations/[id]`: Get conversation details
- `POST /api/conversations`: Create a new conversation
- `POST /api/conversations/[id]/messages`: Add a message to a conversation

## Data Flow

1. User sends a message to an agent
2. Message is processed and stored
3. Agent generates a response
4. Response is displayed to the user and stored
