import React from 'react';
import Image from 'next/image';
import StoryCard from './StoryCard';

const stories = [
  {
    imageSrc: '/images/aunty-jackie.png',
    name: 'Aunty Jackie',
    story:
      'The path to Treaty is about how we mend the very fabric of our society. We want everyone to walk side-by-side with us on the path to Treaty, so that we can overcome those huge injustices that still, unfortunately, persist in our society.',
  },
  {
    imageSrc: '/images/tamika.png',
    name: 'Tamika',
    story:
      "Truth-telling and Treaties are so important for justice and healing for our mob. It's what our old people have fought for and the next generation continues the movement.",
  },
  {
    imageSrc: '/images/mary-joy.png',
    name: 'Mary Joy',
    story:
      'As a non-Indigenous person, supporting Treaty is about acknowledging our shared history and working together to create a more just relationship for the future.',
  },
];

const WhyTreatyMatters: React.FC = () => {
  return (
    <section className="bg-gray-50 py-16 sm:py-24 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-10">
        <Image
          src="/images/artboard-2.png"
          alt=""
          fill
          className="object-cover"
        />
      </div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">Why Treaty Matters</h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">
            Hear from First Nations peoples and allies about why Treaty matters to them and their communities.
          </p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {stories.map((story) => (
            <StoryCard
              key={story.name}
              imageSrc={story.imageSrc}
              name={story.name}
              story={story.story}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyTreatyMatters;
