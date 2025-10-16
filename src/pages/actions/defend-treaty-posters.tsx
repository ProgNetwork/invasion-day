import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import DonateForm from '@/components/form/DonateForm';
import SocialShare from '@/components/SocialShare';

export default function DefendTreatyPostersPage() {
  const [showSocialShare, setShowSocialShare] = useState(false);

  useEffect(() => {
    // Check if the hash is '#share' on component mount
    if (window.location.hash === '#share') {
      setShowSocialShare(true);
    }

    // Listen for hash changes
    const handleHashChange = () => {
      setShowSocialShare(window.location.hash === '#share');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <>
      <Head>
        <title>Defend Treaty - Donate to Support Street Posters | Together for Treaty</title>
        <meta name="description" content="Brad Battin wants to rip up Treaty — we're not letting him get away with it. Donate to help plaster his electorate with posters showing that Victorians back Treaty." />
      </Head>

      <main>
        {/* Page Header Section */}
        <section className="bg-white relative py-16 sm:py-24 border-b-8 border-primary-700">
          <div className="absolute inset-0 z-0">
            <div
              className="h-full w-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: 'url(/images/treaty-now.jpg)',
              }}
            />
            <div className="absolute inset-0 bg-zinc-900/90"></div>
          </div>
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <h1 className="text-primary-700 text-4xl font-bold tracking-tight sm:text-5xl">
                {showSocialShare ? 'Thank You!' : 'Defend Treaty'}
              </h1>
              <div className="mt-6 space-y-4 text-xl leading-relaxed text-gray-50">
                <p>
                  Opposition Leader Brad Battin has crossed a line. Promising that if elected next year, the Victorian Liberals will rip up Treaty within their first 100 days.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            {/* Mobile: Form first, then content */}
            <div className="block lg:hidden">
              {/* Donate Form or Social Share - Mobile */}
              <div id="donate-form" className="bg-gray-50 p-8 rounded-lg border border-gray-200 mb-12">
                {showSocialShare ? (
                  <SocialShare
                    customText="Brad Battin wants to rip up Treaty — we're not letting him get away with it.
I just chipped in to help plaster his electorate with posters showing that Victorians back Treaty. Can you join me?
 👉 togetherfortreaty.org.au/donate
#DefendTreaty #TreatyNow"
                    customUrl="/actions/defend-treaty-posters"
                  />
                ) : (
                  <>
                    <DonateForm
                      title="Chip in to plaster Battin's local area with giant street posters supporting Treaty!"
                      subtitle="Your donation will help plaster Berwick — Brad Battin's electorate — with bold street posters reminding him that tearing up Treaty will cost votes."
                    />
                  </>
                )}
              </div>

              {/* Content - Mobile */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-black mb-6 font-rock-salt">
                    Make your voice heard!
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    After years of consultation, truth-telling and hard work led by thousands of First Nations people, this is a disgraceful betrayal.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    Treaty should be a moment of pride, unity and hope. Instead, Battin's turning it into an opportunity for political point-scoring and division.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    Now it's up to us to remind him — and every Liberal MP watching — that Victorians won't stand by while they try to undo progress.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    Opposition Leader Brad Battin has crossed a line. Promising that if elected next year, the Victorian Liberals will rip up Treaty within their first 100 days.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    After years of consultation, truth-telling and hard work led by thousands of First Nations people, this is a disgraceful betrayal.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    Treaty should be a moment of pride, unity and hope. Instead, Battin's turning it into an opportunity for political point-scoring and division.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    Now it's up to us to remind him — and every Liberal MP watching — that Victorians won't stand by while they try to undo progress.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    Your donation will help:
                  </p>
                  <ul className="list-none space-y-2 text-lg text-gray-700 mb-6">
                    <li>✅ <strong>Plaster Berwick — Brad Battin's electorate — with bold street posters</strong> reminding him that tearing up Treaty will cost votes.</li>
                    <li>✅ <strong>Take the message statewide</strong> — if we raise enough, we'll get posters up across key Liberal seats to show this movement's strength.</li>
                    <li>✅ <strong>Back mob and allies</strong> leading the push for truth, justice and self-determination across Victoria.</li>
                  </ul>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Chip in now to defend Treaty and show that Victorians back truth, justice and unity.
                  </p>
                </div>

              </div>
            </div>

            {/* Desktop: Content left, Form right */}
            <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-start">
              {/* Left Column - Content */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-black mb-6 font-rock-salt">
                    {showSocialShare ? 'Thank You!' : 'Make your voice heard!'}
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    After years of consultation, truth-telling and hard work led by thousands of First Nations people, this is a disgraceful betrayal.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    Treaty should be a moment of pride, unity and hope. Instead, Battin's turning it into an opportunity for political point-scoring and division.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    Now it's up to us to remind him — and every Liberal MP watching — that Victorians won't stand by while they try to undo progress.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    Your donation will help:
                  </p>
                  <ul className="list-none space-y-2 text-lg text-gray-700 mb-6">
                    <li>✅ <strong>Plaster Berwick — Brad Battin's electorate — with bold street posters</strong> reminding him that tearing up Treaty will cost votes.</li>
                    <li>✅ <strong>Take the message statewide</strong> — if we raise enough, we'll get posters up across key Liberal seats to show this movement's strength.</li>
                    <li>✅ <strong>Back mob and allies</strong> leading the push for truth, justice and self-determination across Victoria.</li>
                  </ul>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Chip in now to defend Treaty and show that Victorians back truth, justice and unity.
                  </p>
                </div>
              </div>

              {/* Right Column - Donate Form or Social Share */}
              {showSocialShare ? (
                <SocialShare
                  customText="Brad Battin wants to rip up Treaty — we're not letting him get away with it.
I just chipped in to help plaster his electorate with posters showing that Victorians back Treaty. Can you join me?
 👉 togetherfortreaty.org.au/donate
#DefendTreaty #TreatyNow"
                  customUrl="/actions/defend-treaty-posters"
                />
              ) : (
                <DonateForm
                  title="Chip in to plaster Battin's local area with giant street posters supporting Treaty!"
                  subtitle="Your donation will help plaster Berwick — Brad Battin's electorate — with bold street posters reminding him that tearing up Treaty will cost votes."
                  showDonationTypes={['once']}
                />
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
