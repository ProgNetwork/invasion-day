import React from 'react';
import StoryCard from './StoryCard';

const stories = [
  {
    imageSrc: '/images/person1.png',
    name: "Aunty Robyn's Story",
    story: "Treaty isn't just about the past, it's about creating a future where my grandchildren can walk with pride in both worlds, knowing their culture is respected and protected.",
    link: '/stories/aunty-robyn',
  },
  {
    imageSrc: '/images/person2.png',
    name: "Uncle David's Journey",
    story: "For 40 years I've been fighting for recognition. Treaty is about acknowledging that our sovereignty was never ceded and establishing a new relationship based on truth.",
    link: '/stories/uncle-david',
  },
  {
    imageSrc: '/images/person3.png',
    name: "Sarah's Commitment",
    story: "As a non-Indigenous Australian, supporting Treaty is about acknowledging our shared history and working together to create a more just relationship for the future.",
    link: '/stories/sarah',
  },
];

const WhyTreatyMatters: React.FC = () => {
  return (
    <section className="bg-gray-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Treaty Matters
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Hear from First Nations peoples and allies about why Treaty matters to them and their communities.
          </p>
        </div>
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {stories.map((story) => (
            <StoryCard
              key={story.name}
              imageSrc={story.imageSrc}
              name={story.name}
              story={story.story}
              link={story.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyTreatyMatters; 