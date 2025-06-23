import JoinTheMovement from "@/components/Cta";
import GetInvolved from "@/components/GetInvolved";
import Hero from "@/components/Hero";
import PowerfulMovement from "@/components/PowerfulMovement";
import TimeForTreaty from "@/components/TimeForTreaty";
import WhyTreatyMatters from "@/components/WhyTreatyMatters";
import DonateForm from "@/components/form/DonateForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <JoinTheMovement />
      <TimeForTreaty />
      <WhyTreatyMatters />
      <PowerfulMovement />
      <GetInvolved />
      <DonateForm />
    </main>
  );
}
