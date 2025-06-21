import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface StoryCardProps {
  imageSrc: string;
  name: string;
  story: string;
  link: string;
}

const StoryCard: React.FC<StoryCardProps> = ({ imageSrc, name, story, link }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-8 flex flex-col items-center text-center">
      <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4">
        <Image
          src={imageSrc}
          alt={`A portrait of ${name}`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
      <p className="text-gray-600 mb-4 flex-grow">"{story}"</p>
      <Link href={link} className="text-primary-600 hover:text-primary-700 font-semibold transition-colors duration-200">
          Read more
      </Link>
    </div>
  );
};

export default StoryCard; 