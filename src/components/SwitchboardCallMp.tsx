import React from 'react';
import { Phone } from 'lucide-react';

const SwitchboardCallMp: React.FC = () => {
  const callMethod = {
    id: 'call' as const,
    title: 'Call Your MP',
    subtitle: 'Use our calling tool',
    details: 'We\'ll connect you directly to your MP\'s office. <strong>All you need is your postcode.</strong>',
    contact: '0408 000 000',
    icon: <Phone className="w-8 h-8" />,
    color: 'border-gray-300 bg-gray-50',
    selectedColor: 'border-primary-500 bg-primary-50',
  };

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Call Your Member of Parliament About Treaty
          </h2>
          <p className="text-gray-600">
            Use our calling tool to connect directly to your MP's office. All you need is your postcode.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div
            className="w-full p-8 rounded-lg border-2 transition-all duration-200 hover:shadow-md text-left cursor-pointer border-primary-500 bg-primary-50 hover:shadow-sm"
          >
            <div className="flex items-center space-x-6">
              <div className="text-gray-600 flex-shrink-0">
                <Phone className="w-12 h-12" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {callMethod.title}
                </h3>
                <p className="text-lg text-gray-600 mb-3">
                  {callMethod.subtitle}
                </p>
                <p className="text-base text-gray-500 mb-3" dangerouslySetInnerHTML={{ __html: callMethod.details }}>
                </p>
                <p className="text-2xl font-bold text-gray-700">
                  {callMethod.contact}
                </p>
              </div>
              <div className="text-primary-600 flex-shrink-0">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwitchboardCallMp;
