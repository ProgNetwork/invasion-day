import React, { ReactNode, useState } from 'react';

interface AccordionItemProps {
  title: string;
  children: ReactNode;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 py-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium text-gray-900">{title}</span>
        <svg
          className={`h-6 w-6 transform text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-screen pt-4' : 'max-h-0'}`}>
        <div className="pr-12 leading-relaxed text-gray-600">{children}</div>
      </div>
    </div>
  );
};

interface AccordionProps {
  children: ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ children }) => {
  return <div className="w-full">{children}</div>;
};

export default Accordion;
