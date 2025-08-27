import React from 'react';
import Head from 'next/head';
import PledgeForm from '@/components/form/PledgeForm';
import Accordion, { AccordionItem } from '@/components/ui/Accordion';

export default function PledgePage() {
  return (
    <>
      <Head>
        <title>Sign the Pledge | Together for Treaty</title>
        <meta name="description" content="Sign the pledge to show your support for Treaties in Victoria and across Australia." />
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
              <h1 className="text-primary-700 text-4xl font-bold tracking-tight sm:text-5xl">Sign the Pledge</h1>
              <div className="mt-6 space-y-4 text-xl leading-relaxed text-gray-50">
                <p>
                  Victoria is closer to a Treaty than ever before – with legislation tabled in State Parliament.
                  It will be the first Treaty with First Nations people in this country and is a critical step
                  towards self-determination, justice and acknowledging the past.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left Column - Content */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-black mb-6 font-rock-salt">
                    It is history in the making.
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    What happens in Victoria will shape the future for Treaties across the country.
                    It's never been more important for us to show loud, visible support.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Will you sign the pledge and show that the community backs Treaties in Victoria,
                    and across the country?
                  </p>
                </div>

                {/* FAQ Accordion */}
                <div className="mt-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
                  <Accordion>
                    <AccordionItem title="What is a Treaty?">
                      <p className="text-gray-700 leading-relaxed">
                        A Treaty is a formal agreement between sovereign entities. In the context of First Nations peoples and the Australian government, Treaties would recognize the sovereignty of First Nations peoples and establish frameworks for addressing historical injustices, protecting rights, and creating pathways for self-determination. There are currently processes underway to explore Treaty negotiations at a local, state and national level.
                      </p>
                    </AccordionItem>

                    <AccordionItem title="How would Treaties benefit First Nations communities?">
                      <p className="text-gray-700 leading-relaxed">
                        We're all better off when we are free to set our own course and make decisions for ourselves, our families and our communities. But too often, successive Governments have forced their own ideas on how we, as First Nations people, should lead our own lives. Decisions about our health, our education and our homelands keep being taken away from us. Treaty is about putting First Nations people in the driver's seat so together we can make the decisions that affect us. We know our communities best - so when we have a say over policies that impact us, they work better for us.
                      </p>
                    </AccordionItem>

                    <AccordionItem title="What is the Truth-telling and Treaty process in Victoria?">
                      <p className="text-gray-700 leading-relaxed">
                        The Victorian Treaty legislation is likely to be tabled in Parliament over the coming weeks and will be voted on this year.
                      </p>
                      <p className="text-gray-700 leading-relaxed mt-4">
                        The First Peoples' Assembly - an elected body representing First Peoples across Victoria - has negotiated a statewide Treaty with the Victorian government. This Treaty can make sure Aboriginal communities have the freedom and power to set the course and design solutions that work for their mob across a range of areas - like removing unfair barriers to healthcare and housing, making sure young people can thrive, and making sure all Victorians can learn about and celebrate First Nations cultures.
                      </p>
                      <p className="text-gray-700 leading-relaxed mt-4">
                        It comes after the Yoorrook Justice Commission led a groundbreaking truth-telling process in Victoria. After more than four years and over 1,300 submissions, the final report was handed down in July 2025. It includes 100 recommendations to address ongoing and systemic injustices across areas such as health, education, land rights and representation.
                      </p>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>

              {/* Right Column - Pledge Form */}
              <div id="pledge-form" className="bg-gray-50 p-8 rounded-lg border border-gray-200">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-primary-700 mb-4">
                    Be part of this historic moment
                  </h3>
                  <p className="text-lg text-gray-700">
                    Show your support for Treaties. Sign the pledge!
                  </p>
                </div>

                <PledgeForm />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
