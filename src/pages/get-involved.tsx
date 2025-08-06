import Head from 'next/head';
import React from 'react';
import EventList from '@/components/EventList';
import Image from 'next/image';

const GetInvolvedPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-white">
      <Head>
        <title>Get Involved - Together for Treaty</title>
        <meta name="description" content="Get involved with the Together for Treaty campaign" />
      </Head>
      
      {/* Page Header Section */}
      <section className="bg-white relative py-16 sm:py-24 border-b-8 border-primary-700">
        <div className="absolute inset-0 z-0">
          <div
            className="h-full w-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(/images/protest2.jpg)`,
            }}
          />
          <div className="absolute inset-0 bg-zinc-900/90"></div>
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-primary-700 text-4xl font-bold tracking-tight sm:text-5xl">Get Involved</h1>
            <div className="mt-6 space-y-4 text-xl leading-relaxed text-gray-50">
              <p>
                Join us at events across the country to learn, connect, and take action for Treaty. Every event is an opportunity to stand in solidarity with First Nations communities and build momentum for truth, Treaty and justice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
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
          <EventList />
        </div>
      </section>
    </main>
  );
};

export default GetInvolvedPage; 