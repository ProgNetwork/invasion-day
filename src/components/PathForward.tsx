import FeatureCard from "@/components/ui/FeatureCard";
import React from "react";

const PathForward: React.FC = () => {
  const paths = [
    {
      title: "Truth-Telling",
      description:
        "We must be honest about Australia's ugly history regarding Aboriginal peoples – including massacres, stolen land, stolen children and violent repression of language and culture – and how this has led to ongoing inequality today. By facing the truth with open hearts, we can set a new course forward for action, healing and justice.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v11.494m-5.45-6.94l-1.3 1.3a2 2 0 000 2.828l1.3 1.3M17.45 12.753l1.3-1.3a2 2 0 000-2.828l-1.3-1.3"
          />
        </svg>
      ),
    },
    {
      title: "Treaty-Making",
      description:
        "Treaties must be negotiated in good faith, with First Nations peoples as equal partners. They should address sovereignty, land rights, cultural heritage, political representation, and economic opportunities, while respecting the diversity of First Nations communities.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h6m-3 4h.01M9 14h.01"
          />
        </svg>
      ),
    },
    {
      title: "Accountability",
      description:
        "Treaties are not the end, but the beginning. Implementing Treaty commitments will require ongoing dialogue, accountability mechanisms, and resources. We envision Treaties as living documents that evolve to meet the needs of future generations.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="mb-16 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-rock-salt">The Path Forward</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {paths.map((path) => (
            <FeatureCard key={path.title} {...path} colorScheme="primary" align="center" size="large" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PathForward;
