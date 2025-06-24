import JoinTheMovement from "@/components/Cta";
import GetInvolved from "@/components/GetInvolved";
import Hero from "@/components/Hero";
import PowerfulMovement from "@/components/PowerfulMovement";
import TimeForTreaty from "@/components/TimeForTreaty";
import WhyTreatyMatters from "@/components/WhyTreatyMatters";
import DonateForm from "@/components/form/DonateForm";
import Head from "next/head";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Head>
        <title>Together for Treaty</title>
        <meta name="description" content="Together for Treaty is a movement of First Nations people and allies standing side-by-side for truth-telling, Treaties and justice." />
      </Head>
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
