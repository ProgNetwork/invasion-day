import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import Image component
import { formatDateTime, formatLocation } from '@/lib/utils';

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

const EventList: React.FC = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<HumanitixEvent[]>([]);
  const [pastEvents, setPastEvents] = useState<HumanitixEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchEvents = async (page: number = 1, append: boolean = false) => {
    try {
      const isInitialLoad = page === 1 && !append;
      if (isInitialLoad) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const response = await fetch(`/api/humanitix-events?page=${page}&type=all`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch events');
      }

      if (append) {
        setUpcomingEvents(prev => [...prev, ...data.upcomingEvents]);
        setPastEvents(prev => [...prev, ...data.pastEvents]);
      } else {
        setUpcomingEvents(data.upcomingEvents || []);
        setPastEvents(data.pastEvents || []);
      }

      setHasMore(data.hasMore);
      setCurrentPage(data.currentPage);
    } catch (err) {
      // console.error('Error fetching events:', err);
      setError(err instanceof Error ? err.message : 'Failed to load events');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchEvents(1, false);
  }, []);

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      fetchEvents(currentPage + 1, true);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        <p className="mt-2 text-gray-600">Loading upcoming events...</p>
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
        <h3 className="text-primary-700 mb-6 text-3xl font-bold tracking-tight sm:text-4xl">Upcoming Events</h3>
        {upcomingEvents.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event) => {
              const imageUrl = event.bannerImage?.url || event.featureImage?.url;

              return (
                <Link key={event._id} href={`/events/${event._id}`} className="block">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-200 cursor-pointer">
                    {imageUrl && (
                      <div className="aspect-video bg-gray-200">
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
                          {formatDateTime(event.startDate)}
                        </div>
                        {event.eventLocation.address && (
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="line-clamp-1">{formatLocation(event.eventLocation)}</span>
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
                          <span>Price varies</span>
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

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center mt-12">
            <button
              onClick={loadMore}
              disabled={loadingMore}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-700 hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingMore ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </>
              ) : (
                'Load More Events'
              )}
            </button>
          </div>
        )}
      </div>

      {/* Past Events Section */}
      {pastEvents.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-primary-700 mb-6 text-3xl font-bold tracking-tight sm:text-4xl">Past Events</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pastEvents.map((event) => {
              const imageUrl = event.bannerImage?.url || event.featureImage?.url;

              return (
                <Link key={event._id} href={`/events/${event._id}`} className="block">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-200 opacity-75 cursor-pointer">
                    {imageUrl && (
                      <div className="aspect-video bg-gray-200">
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
                          {formatDateTime(event.startDate)}
                        </div>
                        {event.eventLocation.address && (
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="line-clamp-1">{formatLocation(event.eventLocation)}</span>
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
                          <span className="text-gray-500 italic">Event completed</span>
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
        </div>
      )}
    </div>
  );
};

export default EventList;
