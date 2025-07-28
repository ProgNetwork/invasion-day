import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-05-28.basil',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { paymentIntentId, customMessage } = req.body;

  if (!paymentIntentId) {
    return res.status(400).json({ error: 'Payment Intent ID is required.' });
  }

  try {
    // Retrieve the payment intent to get customer details
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (!paymentIntent.customer) {
      return res.status(400).json({ error: 'No customer associated with this payment.' });
    }

    // Get customer details
    const customer = await stripe.customers.retrieve(paymentIntent.customer as string);

    if (customer.deleted) {
      return res.status(400).json({ error: 'Customer has been deleted.' });
    }

    const customerData = customer as Stripe.Customer;

    // Prepare email content
    // In a real implementation, you would send this email using a service like SendGrid, Mailgun, etc.
    // For now, we'll just return success
    const emailData = {
      paymentIntentId,
      customerEmail: customerData.email,
      amount: paymentIntent.amount,
      customMessage,
    };

    return res.status(200).json({
      success: true,
      message: 'Custom receipt prepared',
      emailData,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ error: errorMessage });
  }
}
