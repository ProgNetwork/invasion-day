import SignupForm from '@/components/form/SignupForm';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Image from 'next/image';
import React, { useState } from 'react';

const Hero: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative flex h-[420px] items-center justify-center overflow-hidden md:h-[720] border-b-8 border-primary-700">
      <div className="absolute inset-0 z-0">
        <div
          className="h-full w-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('./images/hero.png')",
          }}
        />
        {/* <div className="absolute inset-0 bg-secondary-700/90"></div> */}
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <Image src="/images/tft-logo.png" alt="Together forTreaty Logo" className="w-2/3 mx-auto" width={1000} height={1000} />
        <div className="text-md mb-8 leading-relaxed text-white sm:text-2xl font-bold">
          <p className="mb-4">
            Join a national movement of First Nations peoples and allies building unstoppable momentum for truth, Treaty and justice.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button variant="primary" size="lg" className="w-full sm:w-auto" onClick={() => setIsModalOpen(true)}>
            Join the Movement
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
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} noPadding>
        <SignupForm/>
      </Modal>
    </section>
  );
};

export default Hero;
