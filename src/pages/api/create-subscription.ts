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

  const { email, paymentMethodId, amount, interval, cardName } = req.body;

  if (!email || !paymentMethodId || !amount || !interval) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  if (!['month', 'week'].includes(interval)) {
    return res.status(400).json({ error: 'Invalid interval. Must be month or week.' });
  }

  try {
    const customer = await stripe.customers.create({
      email,
      name: cardName,
      payment_method: paymentMethodId,
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
      metadata: {
        donation_type: 'recurring',
        campaign: 'together-for-treaty',
        interval,
      },
    });

    const product = await stripe.products.create({
      name: 'Recurring Donation - Together For Treaty',
      description: `Recurring ${interval}ly donation to support the Treaty movement`,
      metadata: {
        campaign: 'together-for-treaty',
        receipt_message: `Thank you for your ongoing support of the Treaty movement. Your ${interval}ly contribution of $${amount} helps fund First Nations organisers, community events, and storytelling initiatives. Your commitment to justice and reconciliation makes a real difference.`,
      },
    });

    const price = await stripe.prices.create({
      unit_amount: Math.round(amount * 100),
      currency: 'aud',
      recurring: { interval },
      product: product.id,
      metadata: {
        campaign: 'together-for-treaty',
        interval,
      },
    });

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: price.id }],
      expand: ['latest_invoice.payment_intent'],
      payment_behavior: 'default_incomplete',
      payment_settings: {
        payment_method_types: ['card'],
        save_default_payment_method: 'on_subscription',
      },
      metadata: {
        campaign: 'together-for-treaty',
        donor_name: cardName,
        receipt_message: `Thank you for your ongoing support of the Treaty movement. Your ${interval}ly contribution of $${amount} helps fund First Nations organisers, community events, and storytelling initiatives. Your commitment to justice and reconciliation makes a real difference.`,
      },
    });

    const invoice = subscription.latest_invoice as Stripe.Invoice & {
      payment_intent: Stripe.PaymentIntent;
    };

    if (!invoice.payment_intent?.client_secret) {
      return res.status(500).json({ error: 'No payment_intent returned from Stripe.' });
    }

    return res.status(200).json({
      subscriptionId: subscription.id,
      clientSecret: invoice.payment_intent.client_secret,
    });
  } catch (error: any) {
    console.error('Subscription Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
