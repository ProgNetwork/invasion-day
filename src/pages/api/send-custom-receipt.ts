import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { getReceiptTemplate, generateReceiptHtml } from '@/lib/receipt-templates';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { paymentIntentId, customMessage, email } = req.body;

  if (!paymentIntentId) {
    return res.status(400).json({ error: 'Payment Intent ID is required.' });
  }

  try {
    // Retrieve the payment intent
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId, {
      expand: ['customer'],
    });

    if (!paymentIntent.customer || typeof paymentIntent.customer === 'string') {
      return res.status(400).json({ error: 'Customer not found.' });
    }

    const customer = paymentIntent.customer as Stripe.Customer;

    // Get the charge associated with this payment intent
    const charges = await stripe.charges.list({
      payment_intent: paymentIntentId,
      limit: 1,
    });

    const charge = charges.data[0];

    if (!charge) {
      return res.status(400).json({ error: 'Charge not found.' });
    }

    // Determine if this is a recurring payment
    const isRecurring = paymentIntent.metadata?.donation_type === 'recurring';
    const amount = paymentIntent.amount / 100;

    // Get the appropriate receipt template
    const template = getReceiptTemplate(amount, isRecurring);

    // Get donor name from payment intent metadata or customer
    const donorName = paymentIntent.metadata?.donor_name || customer.name || '';

    // Generate the receipt HTML using the template system
    const receiptHtml = generateReceiptHtml(
      template,
      amount,
      new Date(paymentIntent.created * 1000).toLocaleDateString('en-AU'),
      charge.receipt_number || 'N/A',
      customMessage,
      donorName,
    );

    // Create a custom receipt email
    const receiptEmail = {
      to: email || customer.email,
      subject: template.subject,
      html: receiptHtml,
    };

    // Send the custom receipt email
    // Note: This would typically be done through your own email service
    // For now, we'll return the email content for manual sending
    // In production, you'd integrate with SendGrid, AWS SES, or similar

    return res.status(200).json({
      success: true,
      message: 'Custom receipt prepared',
      emailContent: receiptEmail,
      receiptUrl: charge.receipt_url,
    });
  } catch (error: any) {
    console.error('Custom Receipt Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
