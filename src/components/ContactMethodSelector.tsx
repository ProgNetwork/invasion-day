import React from 'react';
import { Phone, Mail, MessageCircle } from 'lucide-react';

export type ContactMethod = 'call' | 'email' | 'facebook';

interface ContactMethodSelectorProps {
  onMethodChange: (method: ContactMethod) => void;
  selectedMethod: ContactMethod;
}

const ContactMethodSelector: React.FC<ContactMethodSelectorProps> = ({
  onMethodChange,
  selectedMethod,
}) => {
  const contactMethods = [
    {
      id: 'call' as ContactMethod,
      title: 'Call His Office',
      subtitle: 'Brad Battin MP',
      details: 'Electorate: Berwick',
      contact: '(03) 5953 0216',
      icon: <Phone className="w-8 h-8" />,
      color: 'border-gray-300 bg-gray-50',
      selectedColor: 'border-primary-500 bg-primary-50',
    },
    {
      id: 'email' as ContactMethod,
      title: 'Send Him An Email',
      subtitle: 'Brad Battin MP',
      details: 'Electorate: Berwick',
      contact: 'brad.battin@parliament.vic.gov.au',
      icon: <Mail className="w-8 h-8" />,
      color: 'border-gray-300 bg-gray-50',
      selectedColor: 'border-primary-500 bg-primary-50',
    },
    {
      id: 'facebook' as ContactMethod,
      title: 'Leave A Respectful Comment',
      subtitle: 'on his Facebook',
      details: 'Electorate: Berwick',
      contact: '@BradBattinMP',
      icon: <MessageCircle className="w-8 h-8" />,
      color: 'border-gray-300 bg-gray-50',
      selectedColor: 'border-primary-500 bg-primary-50',
    },
  ];

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Click To Choose Your Action
          </h2>
          <p className="text-gray-600">
            Pick how you'd like to reach out to Brad Battin MP about Treaty support
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {contactMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => {
                onMethodChange(method.id);
                const hashMap = {
                  call: '#call',
                  email: '#send-email',
                  facebook: '#facebook',
                };
                window.location.hash = hashMap[method.id] || `#${method.id}`;
              }}
              className={`p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md text-left cursor-pointer ${
                selectedMethod === method.id
                  ? method.selectedColor
                  : `${method.color} hover:shadow-sm`
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="text-gray-600">{method.icon}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {method.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {method.subtitle}
                  </p>
                  <p className="text-xs text-gray-500 mb-2">
                    {method.details}
                  </p>
                  <p className="text-sm font-medium text-gray-700">
                    {method.contact}
                  </p>
                </div>
                {selectedMethod === method.id && (
                  <div className="text-primary-600">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
              {selectedMethod === method.id && method.id === 'facebook' && (
                <div className="mt-4">
                  <a
                    href="https://www.facebook.com/share/p/15BvDchjya/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 text-sm font-medium"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Comment on Facebook
                  </a>
                </div>
              )}
              {selectedMethod === method.id && method.id === 'email' && (
                <div className="mt-4">
                  <a
                    href="mailto:brad.battin@parliament.vic.gov.au"
                    className="inline-flex items-center justify-center w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 text-sm font-medium"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email Now
                  </a>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactMethodSelector;
