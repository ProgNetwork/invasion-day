// File: src/pages/api/create-payment-intent.ts
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-05-28.basil',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { amount, email, cardName, donationType } = req.body;

  if (!amount || !email) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  try {
    // Create a customer for better receipt management
    const customer = await stripe.customers.create({
      email,
      name: cardName,
      metadata: {
        donation_type: donationType || 'one-off',
        campaign: 'invasion-day',
      },
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe uses cents
      currency: 'aud',
      customer: customer.id,
      receipt_email: email,
      metadata: {
        integration_check: 'donation_oneoff',
        donation_type: donationType || 'one-off',
        campaign: 'invasion-day',
        donor_name: cardName,
        receipt_message: 'Thank you for supporting the Invasion movement. Your contribution helps fund First Nations organisers, community events, and storytelling initiatives. Together, we can build a stronger future for all Australians.',
      },
      description: `Donation to Invasion Day - ${donationType || 'one-off'} contribution`,
      statement_descriptor_suffix: 'INVASION DAY',
    });

    return res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ error: errorMessage });
  }
}
