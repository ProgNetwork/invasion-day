import React from 'react';

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
      title: 'Call his office',
      subtitle: 'Brad Battin MP',
      details: 'Electorate: Berwick',
      contact: 'Phone: (03) 9707 2000',
      icon: '📞',
      color: 'border-blue-500 bg-blue-50',
      selectedColor: 'border-blue-600 bg-blue-100',
    },
    {
      id: 'email' as ContactMethod,
      title: 'Send him an email',
      subtitle: 'Brad Battin MP',
      details: 'Electorate: Berwick',
      contact: 'Email: berwick@parliament.vic.gov.au',
      icon: '✉️',
      color: 'border-green-500 bg-green-50',
      selectedColor: 'border-green-600 bg-green-100',
    },
    {
      id: 'facebook' as ContactMethod,
      title: 'Leave a respectful comment',
      subtitle: 'on his Facebook',
      details: 'Public engagement',
      contact: 'Facebook: @BradBattinMP',
      icon: '📱',
      color: 'border-purple-500 bg-purple-50',
      selectedColor: 'border-purple-600 bg-purple-100',
    },
  ];

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span className="mr-2">🎯</span>
            Select how you want to contact
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Choose Your Action
          </h2>
          <p className="text-gray-600">
            Pick how you'd like to reach out to Brad Battin MP about Treaty support
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {contactMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => onMethodChange(method.id)}
              className={`p-6 rounded-lg border-2 transition-all duration-200 hover:shadow-md text-left ${
                selectedMethod === method.id
                  ? method.selectedColor
                  : `${method.color} hover:shadow-sm`
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="text-3xl">{method.icon}</div>
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
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactMethodSelector;
