# Humanitix Integration

This document explains how to set up the Humanitix integration to display upcoming events on the "Get Involved" page.

## Overview

The integration fetches upcoming events from your Humanitix account and displays them on the `/get-involved` page. Events are automatically filtered to show only upcoming, published events sorted by date.

## Setup

### 1. Environment Variables

Add the following environment variables to your `.env.local` file:

```env
HUMANITIX_API_KEY=your_humanitix_api_key_here
```

### 2. Getting Your API Credentials

1. **API Key**: Log into your Humanitix account and navigate to Settings > API Keys
2. **No Organization ID needed**: The API uses your account's events directly

### 3. API Endpoint

The integration uses a custom API endpoint at `/api/humanitix-events` that:
- Fetches events from the Humanitix API using the `/v1/events` endpoint
- Uses `inFutureOnly=true` to get only upcoming events
- Filters for published and public events
- Transforms the data for frontend consumption
- Handles errors gracefully

### 4. Frontend Component

The `EventList` component (`src/components/EventList.tsx`) displays:
- Event name and description
- Date and time (formatted for Australian locale)
- Location information
- Ticket pricing (lowest price or "Free tickets available")
- Registration button linking to Humanitix

## Features

- **Automatic filtering**: Only shows upcoming events
- **Responsive design**: Works on mobile, tablet, and desktop
- **Error handling**: Graceful fallbacks if API is unavailable
- **Loading states**: Shows loading spinner while fetching data
- **Empty states**: Friendly message when no events are available
- **Price display**: Shows lowest ticket price or indicates free tickets
- **Direct registration**: Links directly to Humanitix registration page

## Customization

### Styling
The component uses Tailwind CSS classes and can be customized by modifying the classes in `EventList.tsx`.

### Date Formatting
The date format is set to Australian locale (`en-AU`). To change this, modify the `formatDate` function in the component.

### Event Filtering
To modify which events are shown, edit the filtering logic in `/api/humanitix-events.ts`:

```typescript
const upcomingEvents = data.events
  ?.filter((event: any) => {
    const eventDate = new Date(event.startDate);
    return eventDate >= now && event.status === 'published';
  })
```

## Troubleshooting

### Common Issues

1. **No events showing**: Check that your API key and organization ID are correct
2. **API errors**: Verify your Humanitix account has API access enabled
3. **CORS issues**: The API endpoint runs server-side, so CORS shouldn't be an issue

### Debugging

Check the browser console and server logs for error messages. The API endpoint includes detailed error logging.

## API Response Format

The Humanitix API returns events in this format:

```typescript
interface HumanitixEvent {
  _id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  eventLocation: {
    venueName: string;
    address: string;
    city: string;
    region: string;
    country: string;
    onlineUrl?: string;
  };
  ticketTypes: Array<{
    _id: string;
    name: string;
    price: number;
    quantity: number;
    description?: string;
    disabled: boolean;
    deleted: boolean;
  }>;
  url: string;
  bannerImage?: {
    url: string;
  };
  featureImage?: {
    url: string;
  };
  published: boolean;
  public: boolean;
  timezone: string;
}
```

## Security Notes

- API keys are stored server-side only
- The frontend never sees the API key
- All API calls are made through the Next.js API route
- Error messages don't expose sensitive information 