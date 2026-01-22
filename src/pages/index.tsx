import { useEffect, useState } from 'react';
import DonateForm from '@/components/form/DonateForm';
import Hero from '@/components/Hero';
import TimeForInvasion from '@/components/TimeForInvasion';
import WhyInvasionMatters from '@/components/WhyInvasionMatters';
import AustraliaMap from '@/components/AustraliaMap';
import EventList from '@/components/EventList';
import Head from 'next/head';
import Modal from '@/components/ui/Modal';
import Image from 'next/image';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

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
    <main className="min-h-screen bg-black">
      <Head>
        <title>Invasion Day</title>
        <meta name="description" content="Invasion Day is a movement of First Nations people and allies standing side-by-side for truth-telling, Invasions and justice." />
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
      <TimeForInvasion />

      {/* Events Section */}
      <section id="nation-rallies" className="bg-black py-16 sm:py-24 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-100 sm:text-4xl">Nation Rallies</h2>
          </div>
        </div>

        {/* <div className="relative z-10 mx-auto">
          <AustraliaMap />
        </div> */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <EventList />
        </div>
      </section>
      <WhyInvasionMatters />

      {/* Donate Section */}
      <section id="donate" className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/rally5.jpg"
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Elements stripe={stripePromise}>
            <DonateForm />
          </Elements>
        </div>
      </section>
    </main>
  );
}
