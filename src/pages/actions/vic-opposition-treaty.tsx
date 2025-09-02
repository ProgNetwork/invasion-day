import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import ContactRepForm from '@/components/form/ContactRepForm';
import ContactMethodSelector, { ContactMethod } from '@/components/ContactMethodSelector';
import SocialShare from '@/components/SocialShare';
import Accordion, { AccordionItem } from '@/components/ui/Accordion';

export default function VicOppositionTreatyPage() {
  const [showSocialShare, setShowSocialShare] = useState(false);
  const [selectedContactMethod, setSelectedContactMethod] = useState<ContactMethod>('call');

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
        <title>Victoria Backs Treaty | Take Action</title>
        <meta name="description" content="Contact Opposition Leader Brad Battin and urge him to support Treaty. Victoria has overwhelming support for Treaty - let's make sure he hears it loud and clear." />
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
              <h1 className="text-primary-700 text-4xl font-bold tracking-tight sm:text-5xl">Take Action</h1>
              <div className="mt-6 space-y-4 text-xl leading-relaxed text-gray-50">
                <p>
                  Victorian Opposition Leader Brad Battin MP and the Liberal Party have abandoned their support for Treaty despite decades of leadership from Elders and communities, and overwhelming support from Victorians.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Method Selector */}
        {!showSocialShare && (
          <ContactMethodSelector
            onMethodChange={setSelectedContactMethod}
            selectedMethod={selectedContactMethod}
          />
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
                        Take Action
                      </h3>
                      <p className="text-lg text-gray-700">
                        Tell Brad Battin MP and the Liberal Party that you support Treaty.
                      </p>
                    </div>
                    <ContactRepForm contactMethod={selectedContactMethod} />
                  </>
                )}
              </div>

              {/* Content - Mobile */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-black mb-6 font-rock-salt">
                    {showSocialShare ? 'Thank You!' : 'Make your voice heard!'}
                  </h2>
                  {showSocialShare ? (
                    <>
                      <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        Victorian Opposition Leader Brad Battin MP and the Liberal Party have abandoned their support for Treaty despite decades of leadership from Elders and communities, and overwhelming support from Victorians.
                      </p>
                      <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        It’s an attack on self-determination and ignores First Nations communities – and we can’t let this go unchecked.
                      </p>
                      <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        There has previously been bipartisan support for Treaty in Victoria. If thousands of us call, email and comment on his social media, we can make sure Battin hears loud and clear: Victoria backs Treaty.
                      </p>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        Can you contact Battin today and urge him to support Treaty?
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        Victorian Opposition Leader Brad Battin MP and the Liberal Party have abandoned their support for Treaty despite decades of leadership from Elders and communities, and overwhelming support from Victorians.
                      </p>
                      <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        It’s an attack on self-determination and ignores First Nations communities – and we can’t let this go unchecked.
                      </p>
                      <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        There has previously been bipartisan support for Treaty in Victoria. If thousands of us call, email and comment on his social media, we can make sure Battin hears loud and clear: Victoria backs Treaty.
                      </p>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        Can you contact Battin today and urge him to support Treaty?
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
                        <ul className="list-disc pl-5 space-y-2 text-gray-700 leading-relaxed">
                          <li>Introduce yourself — name and your electorate (especially if he is your local MP!)</li>
                          <li>Share why Treaty matters to you — in your own words.</li>
                          <li>Urge him to support Treaty — and to walk together with First Peoples.</li>
                        </ul>
                      </AccordionItem>

                      <AccordionItem title="Example script:">
                        <p className="text-gray-700 leading-relaxed">“Hi, my name is [Name] and I live in [Town/Suburb]. I’m calling because justice and equality for First Nations communities is important to me. Victoria is about to make history with the first Treaty in the country, and I’m incredibly disappointed that Brad Battin and the Liberal Party are opposing it. I urge Brad to stand on the right side of history and support Treaty so we can move forward together.”</p>
                      </AccordionItem>

                      <AccordionItem title="Why this matters:">
                        <ul className="list-disc pl-5 space-y-2 text-gray-700 leading-relaxed">
                          <li><span className="font-semibold">Community knows best:</span> Treaty puts First Nations people in the driver’s seat to make decisions for their communities.</li>
                          <li><span className="font-semibold">Moving forward together:</span> It’s about acknowledging the past and building a shared future.</li>
                          <li><span className="font-semibold">It’s time to make history:</span> First Peoples have been calling for Treaty for generations. This is our chance to deliver.</li>
                        </ul>
                      </AccordionItem>

                      <AccordionItem title="What to say in your email:">
                        <ul className="list-disc pl-5 space-y-2 text-gray-700 leading-relaxed">
                          <li>Introduce yourself — name and your electorate.</li>
                          <li>Share why Treaty matters to you — in your own words.</li>
                          <li>Urge him to support Treaty — and to walk together with First Peoples.</li>
                          <li>Let them know if you’ve called the office too!</li>
                        </ul>
                        <p className="text-gray-700 leading-relaxed mt-4">Email <a href="mailto:info@commonthreads.org.au" className="underline">info@commonthreads.org.au</a> to let us know if you get a response.</p>
                      </AccordionItem>

                      <AccordionItem title="Comment on his social media pages:">
                        <p className="text-gray-700 leading-relaxed mb-4">Leaving respectful, public comments shows that the community is watching and that there’s strong support for Treaty. Ensure it’s on a related post only (ie a media release about Treaty, or a post about First Nations issues). Be sure to tag him and the Victorian Liberals in your comment.</p>
                        <p className="text-gray-700 leading-relaxed font-semibold mb-2">Example:</p>
                        <p className="text-gray-700 leading-relaxed">“Brad, Victoria is on the cusp of making history with the first Treaty in the country with First Nations people. This is about unity, justice, and respect for First Nations leadership. Please reconsider your opposition and walk forward with us.”</p>
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
                    {showSocialShare ? 'Thank You!' : 'Make your voice heard!'}
                  </h2>
                  {showSocialShare ? (
                    <>
                      <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        Victorian Opposition Leader Brad Battin MP and the Liberal Party have abandoned their support for Treaty despite decades of leadership from Elders and communities, and overwhelming support from Victorians.
                      </p>
                      <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        It’s an attack on self-determination and ignores First Nations communities – and we can’t let this go unchecked.
                      </p>
                      <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        There has previously been bipartisan support for Treaty in Victoria. If thousands of us call, email and comment on his social media, we can make sure Battin hears loud and clear: Victoria backs Treaty.
                      </p>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        Can you contact Battin today and urge him to support Treaty?
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        Victorian Opposition Leader Brad Battin MP and the Liberal Party have abandoned their support for Treaty despite decades of leadership from Elders and communities, and overwhelming support from Victorians.
                      </p>
                      <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        It’s an attack on self-determination and ignores First Nations communities – and we can’t let this go unchecked.
                      </p>
                      <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        There has previously been bipartisan support for Treaty in Victoria. If thousands of us call, email and comment on his social media, we can make sure Battin hears loud and clear: Victoria backs Treaty.
                      </p>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        Can you contact Battin today and urge him to support Treaty?
                      </p>
                    </>
                  )}
                </div>

                {/* Accordion */}
                <div className="mt-12">
                  <Accordion>
                    <AccordionItem title="How to make your call:">
                      <ul className="list-disc pl-5 space-y-2 text-gray-700 leading-relaxed">
                        <li>Introduce yourself — name and your electorate (especially if he is your local MP!)</li>
                        <li>Share why Treaty matters to you — in your own words.</li>
                        <li>Urge him to support Treaty — and to walk together with First Peoples.</li>
                      </ul>
                    </AccordionItem>

                    <AccordionItem title="Example script:">
                      <p className="text-gray-700 leading-relaxed">“Hi, my name is [Name] and I live in [Town/Suburb]. I’m calling because justice and equality for First Nations communities is important to me. Victoria is about to make history with the first Treaty in the country, and I’m incredibly disappointed that Brad Battin and the Liberal Party are opposing it. I urge Brad to stand on the right side of history and support Treaty so we can move forward together.”</p>
                    </AccordionItem>

                    <AccordionItem title="Why this matters:">
                      <ul className="list-disc pl-5 space-y-2 text-gray-700 leading-relaxed">
                        <li><span className="font-semibold">Community knows best:</span> Treaty puts First Nations people in the driver’s seat to make decisions for their communities.</li>
                        <li><span className="font-semibold">Moving forward together:</span> It’s about acknowledging the past and building a shared future.</li>
                        <li><span className="font-semibold">It’s time to make history:</span> First Peoples have been calling for Treaty for generations. This is our chance to deliver.</li>
                      </ul>
                    </AccordionItem>

                    <AccordionItem title="What to say in your email:">
                      <ul className="list-disc pl-5 space-y-2 text-gray-700 leading-relaxed">
                        <li>Introduce yourself — name and your electorate.</li>
                        <li>Share why Treaty matters to you — in your own words.</li>
                        <li>Urge him to support Treaty — and to walk together with First Peoples.</li>
                        <li>Let them know if you’ve called the office too!</li>
                      </ul>
                      <p className="text-gray-700 leading-relaxed mt-4">Email <a href="mailto:info@commonthreads.org.au" className="underline">info@commonthreads.org.au</a> to let us know if you get a response.</p>
                    </AccordionItem>

                    <AccordionItem title="Comment on his social media pages:">
                      <p className="text-gray-700 leading-relaxed mb-4">Leaving respectful, public comments shows that the community is watching and that there’s strong support for Treaty. Ensure it’s on a related post only (ie a media release about Treaty, or a post about First Nations issues). Be sure to tag him and the Victorian Liberals in your comment.</p>
                      <p className="text-gray-700 leading-relaxed font-semibold mb-2">Example:</p>
                      <p className="text-gray-700 leading-relaxed">“Brad, Victoria is on the cusp of making history with the first Treaty in the country with First Nations people. This is about unity, justice, and respect for First Nations leadership. Please reconsider your opposition and walk forward with us.”</p>
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
                        Take Action
                      </h3>
                      <p className="text-lg text-gray-700">
                        Tell Brad Battin MP and the Liberal Party that you support Treaty.
                      </p>
                    </div>
                    <ContactRepForm contactMethod={selectedContactMethod} />
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
