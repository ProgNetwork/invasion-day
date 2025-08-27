import Button from '@/components/ui/Button';
import Image from 'next/image';
import React from 'react';

const GetInvolved: React.FC = () => {

  const actions = [
    {
      title: 'Sign the Pledge',
      description: 'Add your name to show community support for truth-telling and Treaty across the country.',
    },
    {
      title: 'Attend Local Events',
      description: 'Join community gatherings, workshops and cultural events in your area.',
    },
    {
      title: 'Spark Conversations',
      description: 'Invite friends and family to learn about Treaty together using our resources.',
    },
    {
      title: 'Share the Message',
      description: 'Help spread the word through your networks and social media.',
    },
  ];

  return (
    <section className="bg-gray-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">Taking Action Together</h2>
            <p className="mb-8 text-lg text-gray-600">
              There are many ways you can be part of the movement for Treaty. Every action makes a difference.
            </p>
            <div className="space-y-6">
              {actions.map((action) => (
                <div key={action.title}>
                  <h3 className="text-xl font-bold text-gray-900">{action.title}</h3>
                  <p className="text-gray-600">{action.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button variant="primary" size="md" href="/pledge?utm_source=homepage&utm_medium=get_involved&utm_campaign=treaty_pledge">
                Sign the Pledge
              </Button>
              <Button variant="outline" size="md" href="/get-involved">
                Join an Event
              </Button>
            </div>
          </div>
          <div className="relative h-80 overflow-hidden rounded-lg shadow-lg md:h-96">
            <Image
              src="/images/group-shot.jpg"
              alt="People gathered in a room for a community event"
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInvolved;
