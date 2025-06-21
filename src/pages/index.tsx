import GetInvolved from "./components/GetInvolved";
import Hero from "./components/Hero";
import JoinTheMovement from "./components/JoinTheMovement";
import PowerfulMovement from "./components/PowerfulMovement";
import TimeForTreaty from "./components/TimeForTreaty";
import WhyTreatyMatters from "./components/WhyTreatyMatters";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <TimeForTreaty />
      <WhyTreatyMatters />
      <PowerfulMovement />
      <GetInvolved />
      <JoinTheMovement />
    </main>
  );
}
