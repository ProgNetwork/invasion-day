import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatDateTime, formatLocation } from '@/lib/utils';
import eventsData from '../../data/events.json'; // Import the JSON data

interface Event {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: {
    venueName: string;
    address: string;
    city: string;
    region: string;
    country: string;
    onlineUrl?: string | null;
  };
  imageUrl?: string;
  url: string;
  timezone: string;
}

const EventList: React.FC = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const now = new Date();
      const sortedEvents = eventsData.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

      const upcoming = sortedEvents.filter(event => new Date(event.endDate) >= now);
      const past = sortedEvents.filter(event => new Date(event.endDate) < now);

      setUpcomingEvents(upcoming);
      setPastEvents(past);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load events');
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        <p className="mt-2 text-gray-600">Loading events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Unable to load events at this time.</p>
        <p className="text-sm text-gray-500 mt-2">Please check back later.</p>
      </div>
    );
  }

  if (upcomingEvents.length === 0 && pastEvents.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No events at the moment.</p>
        <p className="text-sm text-gray-500 mt-2">Check back soon for new events!</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Upcoming Events Section */}
      <div className="space-y-6">
        {upcomingEvents.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event) => {
              const imageUrl = event.imageUrl || '/images/protest2.jpg'; // Fallback image

              return (
                <Link key={event.id} href={`/events/${event.id}`} className="block">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-200 cursor-pointer">
                    {imageUrl && (
                      <div className="aspect-video bg-gray-200 relative">
                        <Image
                          src={imageUrl}
                          alt={event.name}
                          fill // Use fill prop for automatic sizing
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                        {event.name}
                      </h4>

                      <div className="text-sm text-gray-600 mb-3">
                        <div className="flex items-center mb-1">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {formatDateTime(event.startDate, event.timezone)}
                        </div>
                        {event.location.address && (
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="line-clamp-1">{formatLocation(event.location)}</span>
                          </div>
                        )}
                      </div>

                      {event.description && (
                        <div
                          className="text-gray-600 text-sm mb-4 line-clamp-3"
                          dangerouslySetInnerHTML={{ __html: event.description }}
                        />
                      )}

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          <span>Details available</span>
                        </div>
                        <span className="text-sm font-semibold text-primary-700 cursor-pointer hover:text-primary-800 transition-colors">
                          Find out more
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
            <div className="max-w-md mx-auto">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-700 mb-2">No upcoming events at the moment</h4>
              <p className="text-gray-600">Check back soon for new events and opportunities to get involved!</p>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};

export default EventList;
