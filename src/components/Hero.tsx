import Button from '@/components/ui/Button';
import Image from 'next/image';
import React from 'react';

interface HeroProps {}

const Hero: React.FC<HeroProps> = () => {
  const scrollToRallies = () => {
    const ralliesSection = document.getElementById('nation-rallies');
    if (ralliesSection) {
      ralliesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative flex h-[420px] items-center justify-center overflow-hidden md:h-[720]">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8 pt-0">
        <Image
          src="/invasion-day-hero.svg"
          alt="Invasion Day - January 26"
          className="w-full max-w-2xl mx-auto -mt-8 lg:-mt-16"
          width={800}
          height={800}
        />

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row -mt-4 lg:-mt-12">
          <Button variant="white" size="lg" className="w-full sm:w-auto lg:text-xl lg:px-8 lg:py-4" onClick={scrollToRallies}>
            Join a Rally
          </Button>
          {/* <Button
            variant="secondary"
            size="md"
            className="w-full border-white text-white hover:bg-white hover:text-gray-900 sm:w-auto"
          >
            Watch the Launch Video
          </Button> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
