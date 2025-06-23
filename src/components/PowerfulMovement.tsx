import React from "react";

interface MovementPillarProps {
  title: string;
  description: string;
}

const MovementPillar: React.FC<MovementPillarProps> = ({ title, description }) => (
  <div className="text-center">
    <div className="bg-secondary-500 mx-auto mb-4 h-20 w-20 rounded-full"></div>
    <h3 className="mb-2 text-xl font-bold text-gray-900">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const PowerfulMovement: React.FC = () => {
  const pillars = [
    {
      title: "Spark Conversations",
      description:
        "Using the power of conversations, we can build understanding, support and momentum for Treaty in diverse communities everywhere.",
    },
    {
      title: "Share the Story",
      description: "First Nations people hold the truths, solutions and vision to shape a more just future. Everyone can help amplify our message for truth, healing and justice.",
    },
    {
      title: "Show the Momentum",
      description:
        "We heard it on the radio, and we saw it on the television ... now it's time to make the Treaty movement visible everywhere: from our front yards, to city streets, to the doorsteps of decision-makers.",
    },
    {
      title: "Shift the Politics",
      description: "By building a social movement that's impossible to ignore, we'll create the public mandate for political leaders to prioritise truth-telling and Treaty processes at a state, Territory and Federal level.",
    },
  ];

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl font-rock-salt">Let's Make It Happen</h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">
            If we build a huge movement with loud, proud support for truth and Treaties, then governments across the country will be forced to act towards transformational change.
          </p>
        </div>
        <div className="mt-16 grid gap-12 sm:grid-cols-2 md:grid-cols-4">
          {pillars.map((pillar) => (
            <MovementPillar key={pillar.title} {...pillar} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PowerfulMovement;
