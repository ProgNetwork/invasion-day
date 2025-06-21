import React from 'react';

interface PageHeaderProps {
  title: string;
  children: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, children }) => {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-primary-700">{title}</h1>
          <div className="mt-6 text-xl text-gray-600 space-y-4 leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageHeader; 