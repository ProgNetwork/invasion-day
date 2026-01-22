import React from 'react';
import Image from 'next/image';

const stories = [
  {
    imageSrc: '/images/spokes1.png',
    name: 'Spokes 1',
    story: '',
  },
  {
    imageSrc: '/images/spokes2.png',
    name: 'Spokes 2',
    story: '',
  },
];

const WhyInvasionMatters: React.FC = () => {
  return (
    <section className="bg-black py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-100 sm:text-4xl">First Nation Voices on Invasion Day</h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-300">
            Powerful messages from First Nations communities share their truth on Invasion Day - stories of resilience, calls for justice, and visions for a reconciled future.
          </p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {stories.map((story) => (
            <div key={story.name} className="flex justify-center">
              <Image
                src={story.imageSrc}
                alt={story.name}
                width={400}
                height={400}
                className="rounded-lg shadow-lg object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyInvasionMatters;
