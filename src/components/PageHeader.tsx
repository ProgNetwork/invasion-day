import React from "react";

interface PageHeaderProps {
  title: string;
  children: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, children }) => {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <h1 className="text-primary-700 text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
          <div className="mt-6 space-y-4 text-xl leading-relaxed text-gray-600">{children}</div>
        </div>
      </div>
    </section>
  );
};

export default PageHeader;
