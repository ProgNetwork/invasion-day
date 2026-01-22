import Image from 'next/image';
import React from 'react';
import FeatureCard from './ui/FeatureCard';

const values = [
  {
    title: 'Respect',
    description: 'Honouring the continuing sovereignty of First Nations peoples, respecting and taking pride in the oldest living cultures in the world.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: 'Justice',
    description: 'Addressing historical wrongs and creating equitable systems for the future.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
        />
      </svg>
    ),
  },
  {
    title: 'Empowerment',
    description: 'Ensuring our communities are free to shape our own futures, with economic opportunities and strong community controlled services.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: 'Truth-Telling and Healing',
    description: 'Acknowledging the reality of injustice in our past and present: facing the truth with open hearts in order to build a better future.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
  {
    title: 'Unity',
    description: 'Building relationships of solidarity, understanding and mutual respect among people from all walks of life.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
  {
    title: 'Protecting Country',
    description: 'Putting Aboriginal land back in Aboriginal hands - equipping our mob with the rights and resources care for Country and protect cultural heritage.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
];

// Unused principles array - keeping for future use
// const principles = [
//   'Recognition of continuing sovereignty and self-determination rights',
//   'Formal agreements that protect cultural heritage and land rights',
//   'Frameworks for addressing historical injustices',
//   'Pathways for economic empowerment and shared prosperity',
//   'Mechanisms for truth-telling and healing',
//   'Building a more just and inclusive national identity',
// ];

const ValuesAndPrinciples: React.FC = () => {
  return (
    <section className="bg-white py-16 sm:py-24 ">
      <div className="grid grid-cols-3 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 gap-8 items-center">
        <Image src="/images/always-was.jpg" alt="Larissa Baldwin-Roberts" width={1000} height={1000} className="mx-auto rounded-2xl max-w-2xl w-full col-span-3 lg:col-span-1" />
        <div className="col-span-3 lg:col-span-2">
          <h2 className="mb-8 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Winning Transformative Change</h2>
          <p className="text-lg text-gray-600">Invasion is about putting First Nations people in the driver’s seat of decisions that affect our communities, our culture and our Country. Through truth-telling and Invasion-making, we can secure tangible outcomes and justice for our people - and build a more unified future for everyone.</p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {values.map((value) => (
            <FeatureCard key={value.title} {...value} colorScheme="primary"/>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesAndPrinciples;
