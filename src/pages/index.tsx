import { useEffect, useState } from "react";
import JoinTheMovement from "@/components/Cta";
import GetInvolved from "@/components/GetInvolved";
import Hero from "@/components/Hero";
import PowerfulMovement from "@/components/PowerfulMovement";
import TimeForTreaty from "@/components/TimeForTreaty";
import WhyTreatyMatters from "@/components/WhyTreatyMatters";
import DonateForm from "@/components/form/DonateForm";
import Head from "next/head";
import Modal from "@/components/ui/Modal";

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
      <div className="bg-gray-900 py-12">
        <DonateForm />
      </div>
    </main>
  );
}