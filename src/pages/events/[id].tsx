import Head from 'next/head';
import { GetServerSideProps } from 'next';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { formatDateTime, formatLocation } from '@/lib/utils';
import eventsData from '../../../data/events.json';

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

interface EventPageProps {
  event: Event | null;
  error?: string;
}

const EventPage: React.FC<EventPageProps> = ({ event, error }) => {
  const [isPastEvent, setIsPastEvent] = useState(false);

  useEffect(() => {
    if (event) {
      const eventEndDate = new Date(event.endDate);
      const now = new Date();
      setIsPastEvent(eventEndDate < now);
    }
  }, [event]);

  if (error) {
    return (
      <main className="min-h-screen bg-black">
        <Head>
          <title>Event Not Found - Invasion Day</title>
          <meta name="description" content="The requested event could not be found" />
        </Head>

        <div className="min-h-screen flex items-center justify-center bg-black">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Event Not Found</h1>
            <p className="text-gray-300 mb-8">The event you're looking for doesn't exist or has been removed.</p>
            <Button href="/" variant="primary">
              View All Events
            </Button>
          </div>
        </div>
      </main>
    );
  }

  if (!event) {
    return (
      <main className="min-h-screen bg-black">
        <Head>
          <title>Loading Event - Invasion Day</title>
          <meta name="description" content="Loading event details..." />
        </Head>

        <div className="min-h-screen flex items-center justify-center bg-black">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mb-4"></div>
            <p className="text-gray-300">Loading event details...</p>
          </div>
        </div>
      </main>
    );
  }

  const isOnlineEvent = event.location.onlineUrl && event.location.onlineUrl !== null;

  return (
    <main className="min-h-screen bg-black">
      <Head>
        <title>{event.name} - Invasion Day</title>
        <meta name="description" content={event.description.replace(/<[^>]*>/g, '').substring(0, 160)} />
        <meta property="og:title" content={event.name} />
        <meta property="og:description" content={event.description.replace(/<[^>]*>/g, '').substring(0, 160)} />
        {event.imageUrl && <meta property="og:image" content={event.imageUrl} />}
      </Head>

      {/* Hero Section */}
      <section className="bg-black relative py-16 sm:py-24 border-b-8 border-primary-700">
        <div className="absolute inset-0 z-0">
          <div
            className="h-full w-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(/images/protest2.jpg)',
            }}
          />
          <div className="absolute inset-0 bg-black/80"></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="mb-4">
              <Button
                href="/"
                variant="outline"
                size="sm"
                className="text-white border-white hover:bg-white hover:text-gray-900"
              >
                ← Back to Home
              </Button>
            </div>

            <h1 className="text-white text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              {event.name}
            </h1>

            <div className="space-y-4 text-lg leading-relaxed text-gray-50">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="font-semibold">{formatDateTime(event.startDate)}</span>
              </div>

              {event.location.address && (
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{formatLocation(event.location)}</span>
                </div>
              )}

              {isOnlineEvent && (
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                  </svg>
                  <span>Online Event</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Event Details Section */}
      <section className="bg-gray-50 py-16 sm:py-24 relative overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/images/shapes-texture.png"
            alt=""
            fill
            className="object-cover"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Event Image */}
          {event.imageUrl && (
            <div className="mb-12">
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={event.imageUrl}
                  alt={event.name}
                  className="w-full h-full object-cover"
                  width={1280}
                  height={720}
                />
              </div>
            </div>
          )}

          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">{event.name}</h1>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">About This Event</h2>

                {event.description && (
                  <div
                    className="prose prose-lg max-w-none text-gray-700"
                    dangerouslySetInnerHTML={{ __html: event.description }}
                  />
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">

              {/* Event Details Card */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Event Details</h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Date & Time</h4>
                    <p className="text-gray-600">{formatDateTime(event.startDate)}</p>
                  </div>

                  {event.location.address && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Location</h4>
                      <p className="text-gray-600">{formatLocation(event.location)}</p>
                    </div>
                  )}

                  {isOnlineEvent && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Online Access</h4>
                      <p className="text-gray-600">This is an online event</p>
                    </div>
                  )}

                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Timezone</h4>
                    <p className="text-gray-600">{event.timezone}</p>
                  </div>
                </div>
              </div>

              {/* Share Event Card */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Share This Event</h3>

                <div className="space-y-3">
                  <button
                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 cursor-pointer"
                    onClick={() => {
                      const url = typeof window !== 'undefined' ? window.location.href : '';
                      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                      window.open(facebookUrl, '_blank');
                    }}
                  >
                    Share on Facebook
                  </button>

                  <button
                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 cursor-pointer"
                    onClick={() => {
                      const instagramUrl = 'https://www.instagram.com/';
                      // Instagram doesn't have a direct sharing API, so we'll open Instagram
                      window.open(instagramUrl, '_blank');
                    }}
                  >
                    Share on Instagram
                  </button>

                  <button
                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 cursor-pointer"
                    onClick={() => {
                      const url = typeof window !== 'undefined' ? window.location.href : '';
                      const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
                      window.open(linkedinUrl, '_blank');
                    }}
                  >
                    Share on LinkedIn
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id: eventId } = params as { id: string };

  const event = eventsData.find((e) => e.id === eventId);

  if (!event) {
    return {
      props: {
        event: null,
        error: 'Event not found',
      },
    };
  }

  return {
    props: {
      event,
    },
  };
};

export default EventPage;
