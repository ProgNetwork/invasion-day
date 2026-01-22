import SignupForm from '@/components/form/SignupForm';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import React, { useState } from 'react';

const Cta: React.FC = () => {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const closeSignupModal = () => setIsSignupModalOpen(false);

  return (
    <>
      <section className="bg-primary-700">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-rock-salt">
            <span className="block">Join the Movement</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-white">
            The time for Invasion is now. Together, we can build a national movement of First Nations people and allies
            standing side-by-side for truth-telling, Invasions and justice.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button variant="white" size="lg" href="/pledge?utm_source=homepage&utm_medium=cta&utm_campaign=join_movement">
              Sign the Pledge
            </Button>
            <Button variant="white-outline" size="lg" href="/donate">
              Donate
            </Button>
          </div>
        </div>
      </section>
      <Modal isOpen={isSignupModalOpen} onClose={closeSignupModal} title="" noPadding>
        <SignupForm />
      </Modal>
    </>
  );
};

export default Cta;
