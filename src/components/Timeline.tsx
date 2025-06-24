import React from "react";

interface TimelineEvent {
  year: string;
  title: string;
  description: string | React.ReactNode;
  side: "left" | "right";
}

const events: TimelineEvent[] = [
  {
    year: "1",
    title: "Early Resistance",
    description:
        <>
          <p>
            From the moment of colonization, First Nations peoples have resisted dispossession and fought for their sovereignty. Leaders like Pemulwuy, Windradyne, and Jandamarra led armed resistance against colonial forces.
          </p>
          <p>
            Despite overwhelming odds, First Nations peoples never ceded sovereignty and maintained their connection to Country. Treaty agreements, land rights, justice and accountability have been core demands of our Elders and activists across generations.
          </p>
        </>,
    side: "left",
  },
  {
    year: "2",
    title: "Bark Petitions (1963)",
    description:
        <>
          <p>
            The Yolngu people of Yirrkala in the Northern Territory sent bark petitions to the Australian Parliament, protesting the taking of their land for bauxite mining without consultation.
          </p>
          <p>
            These historic documents combined traditional bark painting with typed text, symbolizing the meeting of two legal systems.
          </p>
        </>,
    side: "right",
  },
  {
    year: "3",
    title: "Barunga Statement (1988)",
    description:
    <>
    <p>
    The Barunga Statement called for Aboriginal self-management, a national system of land rights, compensation for loss of lands, respect for Aboriginal identity, and an end to discrimination.
    </p>
    <p>
    Prime Minister Bob Hawke promised a treaty by 1990, but this promise was not fulfilled.
    </p>
  </>,
    side: "left",
  },
  {
    year: "4",
    title: "Treaty Consultations in Victoria (2016)",
    description:
      "Formal community consultation towards Treaty in Victoria began with the Treaty Working Group in 2016. In 2018, the First Peoples' Assembly was established as an elected representative body to work toward Treaty. Now, in 2025, the Assembly is on the cusp of signing the first statewide Treaty in the country. This also follows a landmark truth-telling process through the Yoorrook Justice Commission.",
    side: "right",
  },
  {
    year: "5",
    title: "Uluru Statement from the Heart (2017)",
    description:
      <>
        <p>After extensive consultations with First Nations communities across Australia, the Uluru Statement called for Voice, Treaty, and Truth.</p>
        <p>This landmark document led to the 2023 referendum on a First Nations Voice to Parliament. In the absence of bipartisan support, we saw a No campaign based in racism, fear and misinformation take hold. However, we also saw millions of Australians educate themselves and take action in support of First Nations communities - many for the first time.</p>
      </>,
    side: "left",
  },
  {
    year: "6",
    title: "State and Territory Level Treaty Processes (Present)",
    description:
      <>
        <p>
          Along with Victoria, Queensland, South Australia, Northern Territory and Tasmania have taken steps toward Treaty processes in the past decade.
        </p>
        <p>
          However, in the wake of the Voice referendum defeat, we are witnessing many governments across the country stall or abandon their commitments to truth and Treaty - including in Queensland, where in 2024 the Crisafulli government axed the Truth Telling & Healing Inquiry and Path to Treaty Act.
        </p>
      </>,
    side: "right",
  },
  {
    year: "7",
    title: "Together for Treaty Campaign (Present)",
    description:
      <>
        <p>
        Building on decades of advocacy, by our communities, Common Threads is growing a community campaign, bringing together diverse voices to strengthen public support for Treaties with First Nations peoples.
        </p>
        <p>
        Through education, community organizing, and political advocacy, we're building unstoppable momentum for Treaties across the continent.
        </p>
      </>,
    side: "left",
  },
];

const EventCard = ({ title, description }: { title: string, description: string | React.ReactNode }) => (
  <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
    <h3 className="mb-2 text-xl font-bold">{title}</h3>
    <p className="text-gray-600 gap-2 flex flex-col">{description}</p>
  </div>
);

const Timeline: React.FC = () => {
  return (
    <section className="bg-gray-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-20 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">The Journey to Treaty</h2>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden md:relative md:block">
          <div className="absolute top-0 left-1/2 h-full w-0.5 -translate-x-1/2 transform bg-primary-200"></div>
          <div className="space-y-12">
            {events.map((event, index) => (
              <div key={index} className="flex w-full items-start justify-between">
                <div className="w-5/12">
                  {event.side === "left" && <EventCard title={event.title} description={event.description} />}
                </div>
                <div className="z-10 flex h-10 w-10 items-center justify-center rounded-full bg-primary-700 font-bold text-white shadow-md">
                  {event.year}
                </div>
                <div className="w-5/12">
                  {event.side === "right" && <EventCard title={event.title} description={event.description} />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="relative md:hidden">
          <div className="absolute top-0 left-4 h-full w-0.5 -translate-x-1/2 transform bg-primary-200"></div>
          <div className="space-y-8">
            {events.map((event, index) => (
              <div key={index} className="relative pl-12">
                <div className="absolute top-0 left-4 z-10 flex h-10 w-10 -translate-x-1/2 transform items-center justify-center rounded-full bg-primary-700 font-bold text-white shadow-md">
                  {event.year}
                </div>
                <div className="pt-1">
                  <EventCard title={event.title} description={event.description} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
