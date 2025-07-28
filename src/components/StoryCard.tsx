import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface StoryCardProps {
  imageSrc: string;
  name: string;
  story: string;
  link?: string;
}

const StoryCard: React.FC<StoryCardProps> = ({ imageSrc, name, story, link }) => {
  return (
    <div className="flex flex-col items-center rounded-2xl bg-white p-8 text-center shadow-md transition-shadow duration-300 hover:shadow-xl">
      <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full">
        <Image src={imageSrc} alt={`A portrait of ${name}`} layout="fill"  />
      </div>
      <h3 className="mb-2 text-xl font-bold text-gray-900">{name}</h3>
      <p className="mb-4 flex-grow text-gray-600">&ldquo;{story}&rdquo;</p>
      {link
        && <Link
          href={link}
          className="text-primary-600 hover:text-primary-700 font-semibold transition-colors duration-200"
        >
          Read more
        </Link>
      }
    </div>
  );
};

export default StoryCard;
