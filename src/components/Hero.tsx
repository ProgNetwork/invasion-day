import Button from '@/components/ui/Button';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

interface HeroProps {}

const Hero: React.FC<HeroProps> = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const images = ['/images/rally2.jpg', '/images/rally3.jpg', '/images/rally4.jpg'];
  const transitionDuration = 2000; // 2 seconds for fade
  const displayDuration = 6000; // 6 seconds showing each image
  const blackDuration = 4000; // 4 seconds of black between images

  useEffect(() => {
    const cycleImages = () => {
      setIsTransitioning(true);

      // After fade out, change image
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
        setIsTransitioning(false);
      }, transitionDuration);
    };

    const scheduleNextCycle = () => {
      // Show black for 4 seconds, then show image for 6 seconds, then fade out over 2 seconds
      setTimeout(cycleImages, blackDuration + displayDuration);
    };

    scheduleNextCycle();

    const interval = setInterval(() => {
      cycleImages();
      setTimeout(scheduleNextCycle, transitionDuration);
    }, blackDuration + displayDuration + transitionDuration);

    return () => clearInterval(interval);
  }, []);

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
        <div
          className={`absolute inset-0 transition-all duration-2000 ease-in-out ${
            isTransitioning ? 'opacity-0 scale-100' : 'opacity-30 scale-105'
          }`}
          style={{
            backgroundImage: `url(${images[currentImageIndex]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
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
