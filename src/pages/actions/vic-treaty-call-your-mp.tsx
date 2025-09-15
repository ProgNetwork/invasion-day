import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import ContactRepForm from '@/components/form/ContactRepForm';
import SwitchboardCallMp from '@/components/SwitchboardCallMp';
import SocialShare from '@/components/SocialShare';
import Accordion, { AccordionItem } from '@/components/ui/Accordion';

export default function VicTreatyCallYourMpPage() {
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
        <title>Your MP Needs to Hear From You | Treaty Action</title>
        <meta name="description" content="Treaty legislation has been introduced to Victorian Parliament. Contact your local MP and urge them to support Treaty and First Nations justice." />
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
              <h1 className="text-primary-700 text-4xl font-bold tracking-tight sm:text-5xl">Your MP needs to hear from you!</h1>
              <div className="mt-6 space-y-4 text-xl leading-relaxed text-gray-50">
                <p>
                  Treaty legislation has been introduced to Victorian Parliament. It's a historic moment and we need to show politicians just how much the community supports Treaty and First Nations justice.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call Your MP Section */}
        {!showSocialShare && (
          <SwitchboardCallMp />
        )}

        {/* Main Content Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            {/* Mobile: Form first, then content */}
            <div className="block lg:hidden">
              {/* Pledge Form or Social Share - Mobile */}
              <div id="pledge-form" className="bg-gray-50 p-8 rounded-lg border border-gray-200 mb-12">
                {showSocialShare ? (
                  <SocialShare />
                ) : (
                  <>
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-primary-700 mb-4">
                        I Called My MP
                      </h3>
                      <p className="text-lg text-gray-700">
                        I told my MP that I support Treaty.
                      </p>
                    </div>
                    <ContactRepForm contactMethod="call" />
                  </>
                )}
              </div>

              {/* Content - Mobile */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-black mb-6 font-rock-salt">
                    {showSocialShare ? 'Thank You!' : 'Treaty is in Parliament'}
                  </h2>
                  {showSocialShare ? (
                    <>
                      <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        Treaty legislation has been introduced into Victorian Parliament. It's history in the making.
                      </p>
                      <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        By contacting your MP, you're helping to ensure that our representatives hear loud and clear: Victoria backs Treaty.
                      </p>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        Thank you for taking action and standing up for Treaty!
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        Treaty legislation has been introduced into Victorian Parliament. It's history in the making.
                      </p>
                      <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        It is a moment generations of First Nation peoples have fought for — a step toward truth, justice, and a fairer future. But whether this becomes a proud moment of unity, or descends into division and culture wars, depends on what happens next.
                      </p>
                      <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        Politicians from all sides will be debating this bill in the weeks ahead. The most powerful thing you can do right now is make sure your local MP knows: their community supports Treaty.
                      </p>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        Can you call your MP today and share why you support Treaty — and urge them to loudly do the same?
                      </p>
                    </>
                  )}
                </div>

                {/* FAQ Accordion */}
                {!showSocialShare && (
                  <div className="mt-12">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Take Action</h3>
                    <Accordion>
                      <AccordionItem title="How to make your call:">
                        <p className="text-gray-700 leading-relaxed mb-4">Click on the Call Now! Button on this page. The Together for Treaty auto-dialler will ask you a few short questions and then connect you straight to your MPs office where a staffer will answer. From there:</p>
                        <ul className="list-disc pl-5 space-y-2 text-gray-700 leading-relaxed">
                          <li>Introduce yourself — tell them your name and your suburb/town.</li>
                          <li>Tell them why you're calling - Treaty legislation has just been introduced in Parliament!</li>
                          <li>Share why Treaty matters to you — in your own words.</li>
                          <li>Ask your local MP to support Treaty and to walk together with First Peoples.</li>
                          <li>Thank them for their time</li>
                        </ul>
                        <p className="text-gray-700 leading-relaxed mt-4"><span className="font-semibold">If your MPs party/stance is supportive of Treaty:</span> Thank them for being strong on Treaty and urge them to be vocal in support over the coming weeks.</p>
                        <p className="text-gray-700 leading-relaxed"><span className="font-semibold">If your MPs party/stance is not supportive of Treaty:</span> Urge them to change their position, support Treaty and be on the right side of history.</p>
                      </AccordionItem>

                      <AccordionItem title="Example script:">
                        <p className="text-gray-700 leading-relaxed">"Hi, my name is [Name] and I live in [Town/Suburb]. I'm calling after seeing the historic news that the Treaty legislation has been introduced to Parliament. Justice and equality for First Nations communities is important to me. Victoria is about to make history with the first Treaty in the country, and want to urge my MP to be vocal in their support."</p>
                      </AccordionItem>

                      <AccordionItem title="Why this matters:">
                        <ul className="list-disc pl-5 space-y-2 text-gray-700 leading-relaxed">
                          <li><span className="font-semibold">Community knows best:</span> Treaty puts First Nations people in the driver's seat to make decisions for their communities.</li>
                          <li><span className="font-semibold">Moving forward together:</span> It's about acknowledging the past and building a shared future.</li>
                          <li><span className="font-semibold">It's time to make history:</span> First Peoples have been calling for Treaty for generations. This is our chance to deliver.</li>
                        </ul>
                      </AccordionItem>

                    </Accordion>
                  </div>
                )}
              </div>
            </div>

            {/* Desktop: Content left, Form right */}
            <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-start">
              {/* Left Column - Content */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-black mb-6 font-rock-salt">
                    {showSocialShare ? 'Thank You!' : 'Treaty is in Parliament'}
                  </h2>
                  {showSocialShare ? (
                    <>
                      <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        Treaty legislation has been introduced into Victorian Parliament. It's history in the making.
                      </p>
                      <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        By contacting your MP, you're helping to ensure that our representatives hear loud and clear: Victoria backs Treaty.
                      </p>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        Thank you for taking action and standing up for Treaty!
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        Treaty legislation has been introduced into Victorian Parliament. It's history in the making.
                      </p>
                      <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        It is a moment generations of First Nation peoples have fought for — a step toward truth, justice, and a fairer future. But whether this becomes a proud moment of unity, or descends into division and culture wars, depends on what happens next.
                      </p>
                      <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        Politicians from all sides will be debating this bill in the weeks ahead. The most powerful thing you can do right now is make sure your local MP knows: their community supports Treaty.
                      </p>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        Can you call your MP today and share why you support Treaty — and urge them to loudly do the same?
                      </p>
                    </>
                  )}
                </div>

                {/* Accordion */}
                <div className="mt-12">
                  <Accordion>
                    <AccordionItem title="How to make your call:">
                      <p className="text-gray-700 leading-relaxed mb-4">Click on the Call Now! Button on this page. The Together for Treaty auto-dialler will ask you a few short questions and then connect you straight to your MPs office where a staffer will answer. From there:</p>
                      <ul className="list-disc pl-5 space-y-2 text-gray-700 leading-relaxed">
                        <li>Introduce yourself — tell them your name and your suburb/town.</li>
                        <li>Tell them why you're calling - Treaty legislation has just been introduced in Parliament!</li>
                        <li>Share why Treaty matters to you — in your own words.</li>
                        <li>Ask your local MP to support Treaty and to walk together with First Peoples.</li>
                        <li>Thank them for their time</li>
                      </ul>
                      <p className="text-gray-700 leading-relaxed mt-4"><span className="font-semibold">If your MPs party/stance is supportive of Treaty:</span> Thank them for being strong on Treaty and urge them to be vocal in support over the coming weeks.</p>
                      <p className="text-gray-700 leading-relaxed"><span className="font-semibold">If your MPs party/stance is not supportive of Treaty:</span> Urge them to change their position, support Treaty and be on the right side of history.</p>
                    </AccordionItem>

                    <AccordionItem title="Example script:">
                      <p className="text-gray-700 leading-relaxed">"Hi, my name is [Name] and I live in [Town/Suburb]. I'm calling after seeing the historic news that the Treaty legislation has been introduced to Parliament. Justice and equality for First Nations communities is important to me. Victoria is about to make history with the first Treaty in the country, and want to urge my MP to be vocal in their support."</p>
                    </AccordionItem>

                    <AccordionItem title="Why this matters:">
                      <ul className="list-disc pl-5 space-y-2 text-gray-700 leading-relaxed">
                        <li><span className="font-semibold">Community knows best:</span> Treaty puts First Nations people in the driver's seat to make decisions for their communities.</li>
                        <li><span className="font-semibold">Moving forward together:</span> It's about acknowledging the past and building a shared future.</li>
                        <li><span className="font-semibold">It's time to make history:</span> First Peoples have been calling for Treaty for generations. This is our chance to deliver.</li>
                      </ul>
                    </AccordionItem>

                  </Accordion>
                </div>
              </div>

              {/* Right Column - Pledge Form or Social Share */}
              <div id="pledge-form" className="bg-gray-50 p-8 rounded-lg border border-gray-200">
                {showSocialShare ? (
                  <SocialShare />
                ) : (
                  <>
                    <div className="text-center mb-8">
                      <h3 className="text-3xl font-bold text-primary-700 mb-4">
                        I Called My MP
                      </h3>
                      <p className="text-lg text-gray-700">
                        I told my MP that I support Treaty.
                      </p>
                    </div>
                    <ContactRepForm contactMethod="call" />
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
