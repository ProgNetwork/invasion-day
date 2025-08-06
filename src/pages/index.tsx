import { useEffect, useState } from 'react';
import JoinTheMovement from '@/components/Cta';
import GetInvolved from '@/components/GetInvolved';
import Hero from '@/components/Hero';
import PowerfulMovement from '@/components/PowerfulMovement';
import TimeForTreaty from '@/components/TimeForTreaty';
import WhyTreatyMatters from '@/components/WhyTreatyMatters';
import DonateForm from '@/components/form/DonateForm';
import Head from 'next/head';
import Modal from '@/components/ui/Modal';
import Image from 'next/image';

export default function Home() {
  const [showThankYouModal, setShowThankYouModal] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('thank-you') === 'true') {
        setShowThankYouModal(true);
      }
    }
  }, []);

  const closeThankYouModal = () => setShowThankYouModal(false);

  return (
    <main className="min-h-screen bg-white">
      <Head>
        <title>Together for Treaty</title>
        <meta name="description" content="Together for Treaty is a movement of First Nations people and allies standing side-by-side for truth-telling, Treaties and justice." />
      </Head>

      <Modal isOpen={showThankYouModal} onClose={closeThankYouModal} title="">
        <div className="p-6 text-center">
          <h3 className="text-xl font-semibold mb-4">Thank You!</h3>
          <p>Your support has been received. Together, we make a difference.</p>
          <button
            onClick={closeThankYouModal}
            className="mt-6 inline-block rounded bg-primary-700 px-4 py-2 text-white hover:bg-primary-800"
          >
            Close
          </button>
        </div>
      </Modal>

      <Hero />
      <TimeForTreaty />
      <JoinTheMovement />
      <WhyTreatyMatters />
      <PowerfulMovement />
      <GetInvolved />
      <div className="min-h-screen bg-primary-600 py-12 relative overflow-hidden">
        {/* Background Image - Mobile/Tablet */}
        <div className="absolute inset-0 opacity-70 lg:hidden">
          <Image
            src="/images/artboard-2.png"
            alt="Together for Treaty campaign"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Background Image - Desktop */}
        <div className="absolute inset-0 opacity-70 hidden lg:block">
          <Image
            src="/images/girl-collage.png"
            alt="Together for Treaty campaign"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Transparent Block */}
            <div className="hidden lg:block">
              {/* This space is intentionally left transparent */}
            </div>

            {/* Donation Form */}
            <div>
              <DonateForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
