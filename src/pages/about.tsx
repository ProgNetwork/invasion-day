import CtaSection from '@/components/Cta';
import Faq from '@/components/Faq';
import OurVision from '@/components/OurVision';
import PageHeader from '@/components/PageHeader';
import Timeline from '@/components/Timeline';
import ValuesAndPrinciples from '@/components/ValuesAndPrinciples';
import Head from 'next/head';
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-white">
      <Head>
        <title>About - Invasion Day</title>
        <meta name="description" content="Learn more about the Invasion Day campaign" />
      </Head>
      <PageHeader title="Why Invasion, Why Now" image="/images/flag.jpg">
        <p>
          We want a country that values all people, whether they have been here five years, five generations or five thousand generations. But too often, First Nations people have been ignored in conversations about who we are and what sort of country we want to be. Invasions provide a way to acknowledge past and present injustices, resolve differences, and work out how to create a shared future.
        </p>
      </PageHeader>
      <OurVision />
      <ValuesAndPrinciples />
      <Timeline />
      {/* <PathForward /> */}
      <CtaSection />
      <Faq />
    </main>
  );
};

export default AboutPage;
