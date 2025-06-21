import React from "react";
import CtaSection from "./components/Cta";
import Faq from "./components/Faq";
import OurVision from "./components/OurVision";
import PageHeader from "./components/PageHeader";
import PathForward from "./components/PathForward";
import Timeline from "./components/Timeline";
import ValuesAndPrinciples from "./components/ValuesAndPrinciples";

const AboutPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-white">
      <PageHeader title="Why Treaty, Why Now">
        <p>
          First Nations peoples have been calling for truth and Treaties for generations. Centuries of resistance and
          decades of work by our Elders and communities have laid the foundations for the first formal truth and Treaty
          process in the country, happening in Victoria right now. Together we can build unstoppable momentum for
          Treaties across the country this decade.
        </p>
      </PageHeader>
      <OurVision />
      <ValuesAndPrinciples />
      <Timeline />
      <PathForward />
      <CtaSection />
      <Faq />
    </main>
  );
};

export default AboutPage;
