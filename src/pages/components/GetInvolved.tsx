import Image from 'next/image';
import React from 'react';
import Button from './ui/Button';

const GetInvolved: React.FC = () => {
  const actions = [
    {
      title: 'Sign the Petition',
      description: 'Add your name to show community support for truth-telling and Treaty across the country.'
    },
    {
      title: 'Attend Local Events',
      description: 'Join community gatherings, workshops and cultural events in your area.'
    },
    {
      title: 'Spark Conversations',
      description: 'Invite friends and family to learn about Treaty together using our resources.'
    },
    {
      title: 'Share the Message',
      description: 'Help spread the word through your networks and social media.'
    }
  ];

  return (
    <section className="bg-gray-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Get Involved
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              There are many ways you can be part of the movement for Treaty. Every action makes a difference.
            </p>
            <div className="space-y-6">
              {actions.map(action => (
                <div key={action.title}>
                  <h3 className="text-xl font-bold text-gray-900">{action.title}</h3>
                  <p className="text-gray-600">{action.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button variant="primary" size="md">Add Your Name</Button>
              <Button variant="outline" size="md">Download Campaign Kit</Button>
            </div>
          </div>
          <div className="relative h-80 md:h-96 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/images/get-involved.png"
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