import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface TimelineEvent {
  year: string;
  title: string;
  description: string | React.ReactNode;
  side: 'left' | 'right';
  image: string;
}

const events: TimelineEvent[] = [
  {
    year: '1',
    title: 'Early Resistance',
    description:
        <>
          <p>
            From the moment of colonization, First Nations peoples have resisted dispossession and fought for their sovereignty. Leaders like Pemulwuy, Windradyne, and Jandamarra led armed resistance against colonial forces.
          </p>
          <p>
            Despite overwhelming odds, First Nations peoples never ceded sovereignty and maintained their connection to Country. Treaty agreements, land rights, justice and accountability have been core demands of our Elders and activists across generations.
          </p>
        </>,
    side: 'left',
    image: '/images/timeline/timeline1.jpg',
  },
  {
    year: '2',
    title: 'Bark Petitions (1963)',
    description:
        <>
          <p>
            The Yolngu people of Yirrkala in the Northern Territory sent bark petitions to the Australian Parliament, protesting the taking of their land for bauxite mining without consultation.
          </p>
          <p>
            These historic documents combined traditional bark painting with typed text, symbolizing the meeting of two legal systems.
          </p>
        </>,
    side: 'right',
    image: '/images/timeline/timeline2.jpg',
  },
  {
    year: '3',
    title: 'Barunga Statement (1988)',
    description:
    <>
      <p>
    The Barunga Statement called for Aboriginal self-management, a national system of land rights, compensation for loss of lands, respect for Aboriginal identity, and an end to discrimination.
      </p>
      <p>
    Prime Minister Bob Hawke promised a treaty by 1990, but this promise was not fulfilled.
      </p>
    </>,
    side: 'left',
    image: '/images/timeline/timeline3.jpg',
  },
  {
    year: '4',
    title: 'Treaty Consultations in Victoria (2016)',
    description:
      "Formal community consultation towards Treaty in Victoria began with the Treaty Working Group in 2016. In 2018, the First Peoples' Assembly was established as an elected representative body to work toward Treaty. Now, in 2025, the Assembly is on the cusp of signing the first statewide Treaty in the country. This also follows a landmark truth-telling process through the Yoorrook Justice Commission.",
    side: 'right',
    image: '/images/timeline/timeline4.jpg',
  },
  {
    year: '5',
    title: 'Uluru Statement from the Heart (2017)',
    description:
      <>
        <p>After extensive consultations with First Nations communities across Australia, the Uluru Statement called for Voice, Treaty, and Truth.</p>
        <p>This landmark document led to the 2023 referendum on a First Nations Voice to Parliament. In the absence of bipartisan support, we saw a No campaign based in racism, fear and misinformation take hold. However, we also saw millions of Australians educate themselves and take action in support of First Nations communities - many for the first time.</p>
      </>,
    side: 'left',
    image: '/images/timeline/timeline5.jpeg',
  },
  {
    year: '6',
    title: 'State and Territory Level Treaty Processes (Present)',
    description:
      <>
        <p>
          Along with Victoria, Queensland, South Australia, Northern Territory and Tasmania have taken steps toward Treaty processes in the past decade.
        </p>
        <p>
          However, in the wake of the Voice referendum defeat, we are witnessing many governments across the country stall or abandon their commitments to truth and Treaty - including in Queensland, where in 2024 the Crisafulli government axed the Truth Telling & Healing Inquiry and Path to Treaty Act.
        </p>
      </>,
    side: 'right',
    image: '/images/timeline/timeline6.png',
  },
  {
    year: '7',
    title: 'Together for Treaty Campaign (Present)',
    description:
      <>
        <p>
        Building on decades of advocacy, by our communities, Common Threads is growing a community campaign, bringing together diverse voices to strengthen public support for Treaties with First Nations peoples.
        </p>
        <p>
        Through education, community organizing, and political advocacy, we're building unstoppable momentum for Treaties across the continent.
        </p>
      </>,
    side: 'left',
    image: '/images/timeline/timeline7.jpg',
  },
];

// Custom hook for fade-in on scroll
function useFadeInOnScroll(): [React.RefObject<HTMLDivElement | null>, boolean] {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      // Only set visible if the element is intersecting (in view)
      if (entries[0].isIntersecting) {
        setVisible(true);
        // Optionally, disconnect the observer after the first fade-in
        // observer.disconnect();
      }
    });

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    // Cleanup function to unobserve when the component unmounts
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []); // Empty dependency array ensures this runs once on mount

  return [domRef, isVisible];
}

const TimelineImage = ({ src, height }: { src: string, height?: number }) => {
  const [domRef, isVisible] = useFadeInOnScroll();
  const imageHeight = height && height > 0 ? height : 200; // Fallback height of 200px

  return (
    <div
      ref={domRef}
      style={{ height: `${imageHeight}px` }}
      className={`relative w-full rounded-lg shadow-md transition-all duration-4800 ease-out overflow-hidden ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
    >
      <Image
        src={src}
        alt="Timeline image"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{ objectFit: 'cover' }}
      />
    </div>
  );
};

const EventCard = ({ title, description, setHeight }: { title: string, description: string | React.ReactNode, setHeight?: (height: number) => void }) => {
  const [domRef, isVisible] = useFadeInOnScroll();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current && setHeight) {
      setHeight(contentRef.current.offsetHeight);
    }
  }, [description, setHeight]);

  return (
    <div
      ref={domRef}
      className={`rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-all duration-4800 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
    >
      <h3 className="mb-2 text-xl font-bold text-black">{title}</h3>
      <div ref={contentRef} className="text-gray-600 gap-2 flex flex-col">{description}</div>
    </div>
  );
};

const Timeline: React.FC = () => {
  const [cardHeights, setCardHeights] = useState<{[key: number]: number}>({});
  return (
    <section className="bg-gray-50 py-16 sm:py-24 relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-10">
        <Image
          src="/images/shapes-texture.png"
          alt=""
          fill
          className="object-cover"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-20 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">The Journey to Treaty</h2>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden md:relative md:block">
          <div className="absolute top-0 left-1/2 h-full w-0.5 -translate-x-1/2 transform bg-primary-200"></div>
          <div className="space-y-12">
            {events.map((event, index) => (
              <div key={index} className="flex w-full items-center justify-between">
                <div className="w-5/12">
                  {event.side === 'left' && (
                    <EventCard
                      title={event.title}
                      description={event.description}
                      setHeight={(height) => setCardHeights(prev => ({ ...prev, [index]: height }))}
                    />
                  )}
                  {event.side === 'right' && (
                    <TimelineImage src={event.image} height={cardHeights[index]} />
                  )}
                </div>
                <div className="z-10 flex h-10 w-10 items-center justify-center rounded-full bg-primary-700 font-bold text-white shadow-md">
                  {event.year}
                </div>
                <div className="w-5/12">
                  {event.side === 'right' && (
                    <EventCard
                      title={event.title}
                      description={event.description}
                      setHeight={(height) => setCardHeights(prev => ({ ...prev, [index]: height }))}
                    />
                  )}
                  {event.side === 'left' && (
                    <TimelineImage src={event.image} height={cardHeights[index]} />
                  )}
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
                  <TimelineImage src={event.image} height={cardHeights[index]} />
                  <EventCard
                    title={event.title}
                    description={event.description}
                    setHeight={(height) => setCardHeights(prev => ({ ...prev, [index]: height }))}
                  />
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
