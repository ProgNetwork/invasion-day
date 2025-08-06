import type { NextApiRequest, NextApiResponse } from 'next';

const HUMANITIX_API_KEY = process.env.HUMANITIX_API_KEY || '';

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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  if (!HUMANITIX_API_KEY) {
    return res.status(500).json({ error: 'Humanitix API key missing' });
  }

  const { page = '1', type = 'all' } = req.query;
  const pageNumber = parseInt(page as string, 10);
  const pageSize = 6;

  try {
    // Fetch upcoming events
    const upcomingParams = new URLSearchParams({
      inFutureOnly: 'true',
      page: '1',
      pageSize: '50'
    });

    const upcomingResponse = await fetch(`https://api.humanitix.com/v1/events?${upcomingParams}`, {
      headers: {
        'x-api-key': HUMANITIX_API_KEY,
        'Accept': 'application/json',
      },
    });

    if (!upcomingResponse.ok) {
      console.error('Humanitix API error:', upcomingResponse.status, upcomingResponse.statusText);
      return res.status(upcomingResponse.status).json({ 
        error: 'Failed to fetch events from Humanitix',
        details: upcomingResponse.statusText 
      });
    }

    const upcomingData = await upcomingResponse.json();
    
    // Fetch past events (all events, we'll filter by date)
    const pastParams = new URLSearchParams({
      page: '1',
      pageSize: '50'
    });

    const pastResponse = await fetch(`https://api.humanitix.com/v1/events?${pastParams}`, {
      headers: {
        'x-api-key': HUMANITIX_API_KEY,
        'Accept': 'application/json',
      },
    });

    if (!pastResponse.ok) {
      console.error('Humanitix API error:', pastResponse.status, pastResponse.statusText);
      return res.status(pastResponse.status).json({ 
        error: 'Failed to fetch events from Humanitix',
        details: pastResponse.statusText 
      });
    }

    const pastData = await pastResponse.json();
    
    const now = new Date();
    
    // Filter and transform upcoming events
    const upcomingEvents: HumanitixEvent[] = upcomingData.events
      ?.filter((event: any) => {
        return event.published && event.public && !event.suspendSales;
      })
      ?.map((event: any) => ({
        _id: event._id,
        name: event.name,
        description: event.description || '',
        startDate: event.startDate,
        endDate: event.endDate,
        eventLocation: {
          venueName: event.eventLocation?.venueName || '',
          address: event.eventLocation?.address || '',
          city: event.eventLocation?.city || '',
          region: event.eventLocation?.region || '',
          country: event.eventLocation?.country || '',
          onlineUrl: event.eventLocation?.onlineUrl,
        },
        ticketTypes: event.ticketTypes?.filter((ticket: any) => !ticket.disabled && !ticket.deleted).map((ticket: any) => ({
          _id: ticket._id,
          name: ticket.name,
          price: ticket.price,
          quantity: ticket.quantity,
          description: ticket.description,
          disabled: ticket.disabled,
          deleted: ticket.deleted,
        })) || [],
        url: event.url,
        bannerImage: event.bannerImage,
        featureImage: event.featureImage,
        published: event.published,
        public: event.public,
        timezone: event.timezone,
      }))
      ?.sort((a: HumanitixEvent, b: HumanitixEvent) => 
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      ) || [];

    // Filter and transform past events
    const pastEvents: HumanitixEvent[] = pastData.events
      ?.filter((event: any) => {
        const eventDate = new Date(event.endDate);
        return event.published && event.public && !event.suspendSales && eventDate < now;
      })
      ?.map((event: any) => ({
        _id: event._id,
        name: event.name,
        description: event.description || '',
        startDate: event.startDate,
        endDate: event.endDate,
        eventLocation: {
          venueName: event.eventLocation?.venueName || '',
          address: event.eventLocation?.address || '',
          city: event.eventLocation?.city || '',
          region: event.eventLocation?.region || '',
          country: event.eventLocation?.country || '',
          onlineUrl: event.eventLocation?.onlineUrl,
        },
        ticketTypes: event.ticketTypes?.filter((ticket: any) => !ticket.disabled && !ticket.deleted).map((ticket: any) => ({
          _id: ticket._id,
          name: ticket.name,
          price: ticket.price,
          quantity: ticket.quantity,
          description: ticket.description,
          disabled: ticket.disabled,
          deleted: ticket.deleted,
        })) || [],
        url: event.url,
        bannerImage: event.bannerImage,
        featureImage: event.featureImage,
        published: event.published,
        public: event.public,
        timezone: event.timezone,
      }))
      ?.sort((a: HumanitixEvent, b: HumanitixEvent) => 
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime() // Most recent first
      ) || [];

    // Paginate the results
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    let eventsToReturn: any = { upcomingEvents: [], pastEvents: [] };
    let hasMore = false;

    if (type === 'upcoming' || type === 'all') {
      const paginatedUpcoming = upcomingEvents.slice(startIndex, endIndex);
      eventsToReturn.upcomingEvents = paginatedUpcoming;
      hasMore = hasMore || upcomingEvents.length > endIndex;
    }

    if (type === 'past' || type === 'all') {
      const paginatedPast = pastEvents.slice(startIndex, endIndex);
      eventsToReturn.pastEvents = paginatedPast;
      hasMore = hasMore || pastEvents.length > endIndex;
    }

    return res.status(200).json({ 
      ...eventsToReturn,
      hasMore,
      currentPage: pageNumber,
      totalUpcoming: upcomingEvents.length,
      totalPast: pastEvents.length
    });
  } catch (error: unknown) {
    console.error('Error fetching Humanitix events:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ error: 'Failed to fetch events', details: errorMessage });
  }
} 