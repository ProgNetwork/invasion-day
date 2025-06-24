// File: src/pages/api/create-subscription.ts
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email, amount, interval } = req.body;

  if (!email || !amount || !interval) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  try {
    // 1. Create a customer
    const customer = await stripe.customers.create({ email });

    // 2. Create a product (optional: reuse an existing one if preferred)
    const product = await stripe.products.create({ name: 'Recurring Donation' });

    // 3. Create a price with recurring settings
    const price = await stripe.prices.create({
      unit_amount: Math.round(amount * 100), // Stripe expects amount in cents
      currency: 'aud',
      recurring: { interval }, // 'month' or 'week'
      product: product.id,
    });

    // 4. Create a SetupIntent to collect payment method off-session
    const setupIntent = await stripe.setupIntents.create({
      customer: customer.id,
      usage: 'off_session',
    });

    return res.status(200).json({
      clientSecret: setupIntent.client_secret,
      customerId: customer.id,
      priceId: price.id,
    });
  } catch (error: any) {
    console.error('Subscription Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
