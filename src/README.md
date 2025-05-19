# SAAS Platform Architecture

This document provides an overview of the architecture and organization of our SAAS platform.

## Project Structure

The project is organized by business domains, with each domain containing its own components, services, hooks, types, and API endpoints.

Main domains:
- `agents`: AI agents configuration and management
- `datastores`: Knowledge base storage and management
- `datasources`: Document processing and data ingestion
- `conversations`: Chat interactions with agents
- `integrations`: Third-party service connections
- `analytics`: Usage statistics and reporting

## Key Flows

1. **Authentication Flow**: User authentication via Clerk, with user data synced to Supabase
2. **Agent Creation Flow**: Creating and configuring AI agents
3. **Knowledge Base Flow**: Creating datastores and uploading documents
4. **Conversation Flow**: User interactions with agents
5. **Integration Flow**: Connecting agents to external services

## Technology Stack

- **Frontend**: Next.js, React, Tailwind CSS, shadcn/ui
- **Authentication**: Clerk
- **Database**: Supabase
- **Storage**: Supabase Storage
- **Deployment**: Vercel

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see `.env.example`)
4. Run the development server: `npm run dev`
