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

  const { email, paymentMethodId, amount, interval } = req.body;

  if (!email || !paymentMethodId || !amount || !interval) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  if (!['month', 'week'].includes(interval)) {
    return res.status(400).json({ error: 'Invalid interval. Must be month or week.' });
  }

  try {
    // 1. Create customer
    const customer = await stripe.customers.create({
      email,
      payment_method: paymentMethodId,
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    // 2. Create product for this donation
    const product = await stripe.products.create({
      name: 'Recurring Donation',
    });

    // 3. Create price
    const price = await stripe.prices.create({
      unit_amount: Math.round(amount * 100),
      currency: 'aud',
      recurring: { interval },
      product: product.id,
    });

    // 4. Create subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: price.id }],
      expand: ['latest_invoice.payment_intent'],
    });

    const invoice = subscription.latest_invoice as Stripe.Invoice & {
      payment_intent: Stripe.PaymentIntent;
    };

    return res.status(200).json({
      subscriptionId: subscription.id,
      clientSecret: invoice.payment_intent.client_secret,
    });

  } catch (error: any) {
    console.error('Subscription Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
