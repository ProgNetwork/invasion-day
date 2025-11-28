import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  image?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, children, image }) => {
  return (
    <section className="bg-white relative py-16 sm:py-24 border-b-8 border-primary-700">
      {image && (
        <div className="absolute inset-0 z-0">
          <div
            className="h-full w-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${image})`,
            }}
          />
          <div className="absolute inset-0 bg-zinc-900/90"></div>
        </div>)}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <h1 className="text-primary-700 text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
          {subtitle && (
            <p className="mt-4 text-xl leading-relaxed text-gray-50 sm:text-2xl">
              {subtitle}
            </p>
          )}
          <div className="mt-6 space-y-4 text-xl leading-relaxed text-gray-50">{children}</div>
        </div>
      </div>
    </section>
  );
};

export default PageHeader;
