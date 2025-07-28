import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import CustomReceiptManager from '@/components/CustomReceiptManager';
import Button from '@/components/ui/Button';

interface PaymentRecord {
  id: string;
  amount: number;
  email: string;
  created: number;
  status: string;
  receipt_sent?: boolean;
}

const ReceiptsAdminPage: NextPage = () => {
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState<PaymentRecord | null>(null);
  const [showCustomReceipt, setShowCustomReceipt] = useState(false);

  useEffect(() => {
    // In a real application, you'd fetch this from your database
    // For now, we'll simulate some payment data
    const mockPayments: PaymentRecord[] = [
      {
        id: 'pi_1234567890',
        amount: 50.00,
        email: 'donor@example.com',
        created: Date.now() / 1000,
        status: 'succeeded',
        receipt_sent: false,
      },
      {
        id: 'pi_0987654321',
        amount: 100.00,
        email: 'supporter@example.com',
        created: Date.now() / 1000 - 86400, // 1 day ago
        status: 'succeeded',
        receipt_sent: true,
      },
    ];

    setPayments(mockPayments);
    setLoading(false);
  }, []);

  const handleSendCustomReceipt = (payment: PaymentRecord) => {
    setSelectedPayment(payment);
    setShowCustomReceipt(true);
  };

  const handleReceiptSent = () => {
    if (selectedPayment) {
      setPayments(prev => 
        prev.map(payment => 
          payment.id === selectedPayment.id 
            ? { ...payment, receipt_sent: true }
            : payment
        )
      );
    }
    setShowCustomReceipt(false);
    setSelectedPayment(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading payments...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Receipt Management - Together For Treaty</title>
        <meta name="description" content="Manage custom receipts and donor communications" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Receipt Management</h1>
            <p className="mt-2 text-gray-600">
              Send custom receipts with substantial content to donors
            </p>
          </div>

          {showCustomReceipt && selectedPayment ? (
            <div className="mb-8">
              <Button
                variant="outline"
                onClick={() => setShowCustomReceipt(false)}
                className="mb-4"
              >
                ← Back to Payments
              </Button>
              
              <CustomReceiptManager
                paymentIntentId={selectedPayment.id}
                customerEmail={selectedPayment.email}
                amount={selectedPayment.amount}
                onReceiptSent={handleReceiptSent}
              />
            </div>
          ) : (
            <>
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Recent Payments</h2>
                  <p className="text-sm text-gray-600">
                    Send custom receipts with substantial content to donors
                  </p>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Payment ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Receipt
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {payments.map((payment) => (
                        <tr key={payment.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {payment.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${payment.amount.toFixed(2)} AUD
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {payment.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(payment.created * 1000).toLocaleDateString('en-AU')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              payment.status === 'succeeded' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {payment.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              payment.receipt_sent 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {payment.receipt_sent ? 'Sent' : 'Pending'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleSendCustomReceipt(payment)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Send Custom Receipt
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-medium text-blue-900 mb-2">
                  Custom Receipt Features
                </h3>
                <ul className="text-blue-800 space-y-2">
                  <li>• <strong>Substantial content:</strong> Detailed information about campaign impact and next steps</li>
                  <li>• <strong>Professional branding:</strong> Branded email templates with Together For Treaty styling</li>
                  <li>• <strong>Custom messages:</strong> Add personal messages to each receipt</li>
                  <li>• <strong>Tax information:</strong> Clear tax deduction details for donors</li>
                  <li>• <strong>Campaign context:</strong> Explain how donations support the Treaty movement</li>
                  <li>• <strong>Future engagement:</strong> Information about ongoing involvement opportunities</li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ReceiptsAdminPage; 