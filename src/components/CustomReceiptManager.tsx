import React, { useState } from 'react';
import Button from '@/components/ui/Button';

interface CustomReceiptManagerProps {
  paymentIntentId?: string;
  customerEmail?: string;
  amount?: number;
  onReceiptSent?: () => void;
}

const CustomReceiptManager: React.FC<CustomReceiptManagerProps> = ({
  paymentIntentId,
  customerEmail,
  amount,
  onReceiptSent,
}) => {
  const [customMessage, setCustomMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const defaultMessages = [
    "Thank you for your generous support of the Treaty movement. Your contribution will help fund vital community initiatives and support First Nations organisers in their important work.",
    "Your donation makes a real difference in our campaign for justice and reconciliation. Together, we can build a stronger future for all Australians.",
    "We're grateful for your commitment to the Treaty movement. Your support helps us amplify First Nations voices and create meaningful change.",
    "Thank you for standing with us in the fight for justice and recognition. Your contribution supports community-led initiatives and cultural preservation.",
  ];

  const handleSendCustomReceipt = async () => {
    if (!paymentIntentId) {
      setError('Payment Intent ID is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/send-custom-receipt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentIntentId,
          customMessage,
          email: customerEmail,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        onReceiptSent?.();
      } else {
        setError(data.error || 'Failed to send custom receipt');
      }
    } catch (err) {
      setError('Failed to send custom receipt');
    } finally {
      setLoading(false);
    }
  };

  const handleUseDefaultMessage = (message: string) => {
    setCustomMessage(message);
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-green-50 border border-green-200 rounded-lg">
        <h3 className="text-lg font-semibold text-green-800 mb-2">
          Custom Receipt Sent Successfully
        </h3>
        <p className="text-green-700 mb-4">
          A custom receipt with your message has been prepared and sent to the donor.
        </p>
        <Button
          variant="outline"
          onClick={() => setSuccess(false)}
          className="text-green-700 border-green-300 hover:bg-green-100"
        >
          Send Another Receipt
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-50 border rounded-lg">
      <h3 className="text-xl font-semibold mb-4">Custom Receipt Manager</h3>
      
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Custom Message (Optional)
        </label>
        <textarea
          value={customMessage}
          onChange={(e) => setCustomMessage(e.target.value)}
          placeholder="Add a personal message to include in the receipt..."
          className="w-full p-3 border rounded-lg resize-none"
          rows={6}
        />
        <p className="text-sm text-gray-600 mt-1">
          This message will be included in the custom receipt email sent to the donor.
        </p>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3">Quick Message Templates</h4>
        <div className="grid grid-cols-1 gap-2">
          {defaultMessages.map((message, index) => (
            <button
              key={index}
              onClick={() => handleUseDefaultMessage(message)}
              className="text-left p-3 bg-white border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <p className="text-sm text-gray-700">{message}</p>
            </button>
          ))}
        </div>
      </div>

      {paymentIntentId && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="text-sm font-medium text-blue-800 mb-2">Receipt Details</h4>
          <div className="text-sm text-blue-700 space-y-1">
            <p><strong>Payment ID:</strong> {paymentIntentId}</p>
            {customerEmail && <p><strong>Email:</strong> {customerEmail}</p>}
            {amount && <p><strong>Amount:</strong> ${amount.toFixed(2)} AUD</p>}
          </div>
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <div className="flex gap-3">
        <Button
          variant="primary"
          onClick={handleSendCustomReceipt}
          disabled={loading || !paymentIntentId}
          className="flex-1"
        >
          {loading ? 'Sending...' : 'Send Custom Receipt'}
        </Button>
        
        <Button
          variant="outline"
          onClick={() => setCustomMessage('')}
          disabled={loading}
        >
          Clear Message
        </Button>
      </div>

      <div className="mt-4 text-xs text-gray-600">
        <p><strong>Note:</strong> Custom receipts include substantial content about the campaign impact, 
        tax deduction information, and next steps. The receipt is professionally formatted and branded.</p>
      </div>
    </div>
  );
};

export default CustomReceiptManager; 