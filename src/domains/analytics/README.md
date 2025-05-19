# Analytics Domain

This domain handles all analytics-related functionality for the SaaS platform, including event tracking, data visualization, and reporting.

## Architecture

The analytics domain is structured as follows:

- **components/**: UI components for displaying analytics data
- **hooks/**: React hooks for fetching and processing analytics data
- **services/**: Services for interacting with the analytics provider (PostHog)
- **types/**: TypeScript types and interfaces
- **utils/**: Utility functions for event tracking and data processing

## Event Tracking

We use PostHog for event tracking. The main tracking functions are:

- `trackEvent(eventName, properties)`: Track a custom event
- `trackPageView(url, properties)`: Track a page view
- `identifyUser(userId, properties)`: Identify a user for segmentation
- `resetUser()`: Reset the current user (on logout)

For convenience, common events are pre-defined in `utils/event-tracking.ts`.

## Usage Examples

### Tracking a Custom Event

\`\`\`typescript
import { trackEvent } from '@/lib/analytics';

// Track a button click
trackEvent('button_clicked', { buttonName: 'create_agent' });
\`\`\`

### Using the EventTracker Component

\`\`\`tsx
import { EventTracker } from '@/components/analytics/event-tracker';
import { Button } from '@/components/ui/button';

// Track when a button is clicked
<EventTracker eventName="create_button_clicked" properties={{ location: 'dashboard' }}>
  <Button>Create New Agent</Button>
</EventTracker>
\`\`\`

### Tracking Page Views

\`\`\`typescript
import { usePageView } from '@/hooks/use-page-view';

// In a layout or page component
function MyPage() {
  usePageView(); // Automatically tracks page views
  
  return <div>Page content</div>;
}
\`\`\`

### Identifying Users

\`\`\`typescript
import { identifyUser } from '@/lib/analytics';

// After user login or profile update
identifyUser(user.id, {
  name: user.name,
  email: user.email,
  plan: user.subscription.plan
});
\`\`\`

## Dashboard

The analytics dashboard (`/analytics`) provides visualizations of key metrics:

- Active users
- Event counts and trends
- User segments
- Conversion funnels

## Best Practices

1. **Be consistent with event naming**: Use snake_case for event names (e.g., `button_clicked`, `page_viewed`)
2. **Include relevant properties**: Add context to events with properties
3. **Don't track PII**: Avoid tracking personally identifiable information
4. **Track important user actions**: Focus on actions that provide business insights
5. **Use the pre-defined events**: Use the events in `utils/event-tracking.ts` when possible
\`\`\`

Let's create a component to track user actions in the agent domain:
