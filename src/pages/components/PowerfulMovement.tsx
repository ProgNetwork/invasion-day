import React from 'react';

interface MovementPillarProps {
  title: string;
  description: string;
}

const MovementPillar: React.FC<MovementPillarProps> = ({ title, description }) => (
  <div className="text-center">
    <div className="w-20 h-20 bg-secondary-500 rounded-full mx-auto mb-4"></div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const PowerfulMovement: React.FC = () => {
  const pillars = [
    {
      title: 'Conversations',
      description: 'A powerful grassroots network of volunteers having conversations that build support and understanding in diverse communities across the continent.'
    },
    {
      title: 'Partnerships',
      description: 'Mobilising civil society and community organisations to act in solidarity towards Treaty.'
    },
    {
      title: 'Storytelling',
      description: 'Amplifying the voices and visions of First Nations people and allies standing side-by-side for truth-telling, Treaties and healing.'
    },
    {
      title: 'Political Pressure',
      description: 'Create the public mandate needed for political leaders to prioritise Treaty negotiations.'
    }
  ];

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Building a Powerful Movement
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Together for Treaty is a national movement of First Nations people and allies standing side-by-side for truth-telling, Treaties and justice. We're taking action through:
          </p>
        </div>
        <div className="mt-16 grid sm:grid-cols-2 md:grid-cols-4 gap-12">
          {pillars.map(pillar => <MovementPillar key={pillar.title} {...pillar} />)}
        </div>
      </div>
    </section>
  );
};

export default PowerfulMovement; 