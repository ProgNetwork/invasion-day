import React from 'react';
import Head from 'next/head';
import Button from '@/components/ui/Button';

export default function PledgeCTAPage() {
  return (
    <>
      <Head>
        <title>Make Your Pledge | Together for Treaty</title>
        <meta name="description" content="Pledge your support for a treaty and reconciliation in Australia." />
      </Head>

      <main>
        <section className="relative flex h-[420px] items-center justify-center overflow-hidden md:h-[720px] border-b-8 border-primary-700">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black" />
            <img
              src="/images/treaty-now.jpg"
              alt="Treaty now"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50"></div>
          </div>

          <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-rock-salt mb-4">
              Make Your Pledge
            </h1>
            <p className="text-xl leading-relaxed text-white sm:text-2xl">
              Join thousands of Australians supporting treaty and reconciliation
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">What You're Pledging For</h2>
            <p className="text-lg mb-8">
              By making this pledge, you're committing to support the journey towards treaty,
              truth-telling, and reconciliation. Your pledge shows that you believe in a
              future where all Australians can walk together.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Support Treaty</h3>
                <p>Stand with Indigenous peoples in their call for a treaty that recognizes their sovereignty and rights</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Commit to Learning</h3>
                <p>Pledge to educate yourself and others about Indigenous history, culture, and perspectives</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Take Action</h3>
                <p>Commit to taking concrete steps in your daily life to support reconciliation</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Amplify Voices</h3>
                <p>Pledge to listen to and amplify Indigenous voices in your community and networks</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-primary-700">
          <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-rock-salt mb-4">
              Make Your Pledge Today
            </h2>
            <p className="mt-4 text-lg leading-6 text-white mb-8">
              Join the movement for treaty, truth, and reconciliation
            </p>
            <Button variant="white" size="lg" href="#">
              I Pledge My Support
            </Button>
          </div>
        </section>
      </main>
    </>
  );
}
