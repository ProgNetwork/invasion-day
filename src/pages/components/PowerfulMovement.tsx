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
      title: "Conversations",
      description:
        "A powerful grassroots network of volunteers having conversations that build support and understanding in diverse communities across the continent.",
    },
    {
      title: "Partnerships",
      description: "Mobilising civil society and community organisations to act in solidarity towards Treaty.",
    },
    {
      title: "Storytelling",
      description:
        "Amplifying the voices and visions of First Nations people and allies standing side-by-side for truth-telling, Treaties and healing.",
    },
    {
      title: "Political Pressure",
      description: "Create the public mandate needed for political leaders to prioritise Treaty negotiations.",
    },
  ];

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">Building a Powerful Movement</h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">
            Together for Treaty is a national movement of First Nations people and allies standing side-by-side for
            truth-telling, Treaties and justice. We're taking action through:
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
