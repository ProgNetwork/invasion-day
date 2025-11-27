import Button from '@/components/ui/Button';
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useMemo, useState } from 'react';
import { trackDonation } from '@/lib/gtm';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

const presetAmounts = [12, 30, 50];

interface DonateFormProps {
  title?: string;
  subtitle?: string;
  showDonationTypes?: ('once' | 'recurring')[];
}

const DonateFormInner: React.FC<DonateFormProps> = ({
  title = 'Support The Movement',
  subtitle = 'Your contribution helps support First Nations organisers, community events, and storytelling.',
  showDonationTypes = ['once', 'recurring'],
}) => {
  const [amount, setAmount] = useState<number | ''>(12);
  const [customAmount, setCustomAmount] = useState('');
  const [donationType, setDonationType] = useState<'once' | 'recurring'>(showDonationTypes[0] || 'once');
  const [interval, setInterval] = useState<'month' | 'week'>('month');
  const [email, setEmail] = useState('');
  const [cardName, setCardName] = useState('');
  const [coverFees, setCoverFees] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; amount?: string; cardName?: string; card?: string }>({});

  const elements = useElements();
  const stripe = useStripe();

  const baseAmount = useMemo(() => amount || Number(customAmount), [amount, customAmount]);
  const feeAmount = useMemo(() => (coverFees ? Math.round(baseAmount * 0.01 * 100) / 100 : 0), [baseAmount, coverFees]);
  const totalAmount = useMemo(() => baseAmount + feeAmount, [baseAmount, feeAmount]);

  const handleSubmit = async () => {
    const newErrors: typeof errors = {};

    if (!baseAmount || baseAmount <= 0) {
      newErrors.amount = 'Please enter a valid donation amount.';
    }
    if (!(/\S+@\S+\.\S+/).test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!cardName.trim()) {
      newErrors.cardName = 'Please enter the name on the card.';
    }

    const cardElement = elements?.getElement(CardElement);
    if (!cardElement) {
      newErrors.card = 'Card input could not be found.';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    if (!cardElement) {
      setErrors({ card: 'Card input could not be found.' });
      return;
    }

    setLoading(true);

    const paymentMethodResult = await stripe?.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name: cardName,
        email,
      },
    });

    if (paymentMethodResult?.error || !paymentMethodResult?.paymentMethod) {
      setErrors({ card: paymentMethodResult?.error?.message || 'Failed to create payment method.' });
      setLoading(false);
      return;
    }

    const paymentMethodId = paymentMethodResult.paymentMethod.id;

    const endpoint = donationType === 'recurring'
      ? '/api/create-subscription'
      : '/api/create-payment-intent';

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        donationType === 'recurring'
          ? { email, paymentMethodId, amount: totalAmount, interval }
          : { cardName, email, amount: totalAmount, donationType },
      ),
    });

    const { clientSecret, error: serverError, subscriptionId } = await res.json();

    if (serverError || (donationType === 'recurring' && !subscriptionId) || (donationType === 'once' && !clientSecret)) {
      setErrors({ card: serverError || 'Server error' });
      setLoading(false);
      return;
    }

    const confirmResult
      = donationType === 'recurring'
        ? await stripe?.confirmCardSetup(clientSecret, { payment_method: paymentMethodId })
        : await stripe?.confirmCardPayment(clientSecret, {
          payment_method: paymentMethodResult.paymentMethod.id,
        });

    if (confirmResult?.error) {
      setErrors({ card: confirmResult.error.message || 'Payment failed.' });
    } else {
      // Track successful donation
      trackDonation(totalAmount, donationType);
      window.location.href = '/?thank-you=true';
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-50 rounded-xl border">
      <h2 className="text-2xl font-bold mb-2 text-black">{title}</h2>
      <p className="text-sm mb-6 text-gray-800">
        <strong>{subtitle}</strong>
        <br/>
        This campaign is being coordinated by Common Threads, supported by the Centre for Australian Progress.
        Donations over $2 are tax deductible. Your tax receipt will be issued by the Centre for Australian Progress.
      </p>

      {showDonationTypes.length > 1 && (
        <div className="flex space-x-2 mb-4">
          {showDonationTypes.includes('once') && (
            <Button
              variant={donationType === 'once' ? 'primary' : 'outline'}
              className="font-sans"
              onClick={() => setDonationType('once')}
            >
              One-off
            </Button>
          )}
          {showDonationTypes.includes('recurring') && (
            <Button
              variant={donationType === 'recurring' ? 'primary' : 'outline'}
              className="font-sans"
              onClick={() => setDonationType('recurring')}
            >
              Recurring
            </Button>
          )}
        </div>
      )}

      {donationType === 'recurring' && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-black">Frequency</label>
          <select
            value={interval}
            onChange={(e) => setInterval(e.target.value as 'month' | 'week')}
            className="w-full p-2 border rounded"
          >
            <option value="week">Weekly</option>
            <option value="month">Monthly</option>
          </select>
        </div>
      )}

      <div className="flex gap-2 mb-2 flex-wrap">
        {presetAmounts.map((amt) => (
          <button
            key={amt}
            className={`px-4 py-2 rounded border ${amount === amt ? 'bg-black text-white' : 'bg-white text-gray-800'}`}
            onClick={() => {
              setAmount(amt);
              setCustomAmount('');
            }}
          >
            ${amt}
          </button>
        ))}
        <input
          type="number"
          min="1"
          placeholder="Other"
          value={customAmount}
          onChange={(e) => {
            setCustomAmount(e.target.value);
            setAmount('');
          }}
          className={`w-24 px-3 py-2 border rounded text-black ${errors.amount ? 'border-red-500 font-semibold' : ''}`}
        />
      </div>
      {errors.amount && <p className="text-red-600 text-sm mb-2">{errors.amount}</p>}

      <label className="flex items-center mb-4 text-sm text-black">
        <input
          type="checkbox"
          checked={coverFees}
          onChange={(e) => setCoverFees(e.target.checked)}
          className="mr-2"
        />
        {`I want every cent of my gift to go to the cause—I'll chip in ${feeAmount === 0 ? '1%' : `$${feeAmount.toFixed(2)}`} to cover fees.`}
      </label>

      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={`w-full p-2 mb-1 border rounded text-black ${errors.email ? 'border-red-500 font-semibold' : ''}`}
      />
      {errors.email && <p className="text-red-600 text-sm mb-2">{errors.email}</p>}

      <input
        type="text"
        placeholder="Name on Card"
        value={cardName}
        onChange={(e) => setCardName(e.target.value)}
        className={`w-full p-2 mb-1 border rounded text-black ${errors.cardName ? 'border-red-500 font-semibold' : ''}`}
      />
      {errors.cardName && <p className="text-red-600 text-sm mb-2">{errors.cardName}</p>}

      <div className="mb-2 p-2 border rounded bg-white">
        <CardElement
          options={{
            style: { base: { fontSize: '16px' } },
            hidePostalCode: true,
          }}
        />
      </div>
      {errors.card && <p className="text-red-600 text-sm mb-2">{errors.card}</p>}

      <Button
        variant="primary"
        className="w-full font-sans"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Processing…' : `DONATE $${totalAmount.toFixed(2)}`}
      </Button>

      <div className="text-xs text-black mt-4 space-y-2">
        <p>Together For Treaty can only accept donations from Australian citizens, residents, or entities for electoral expenditure. For more information, see our Donations Policy.</p>
        <p>By pressing Donate, I confirm I am an Australian citizen or resident and agree to Together For Treaty's Donations Policy and Privacy Policy.</p>
      </div>
    </div>
  );
};

const DonateForm: React.FC<DonateFormProps> = (props) => (
  <Elements stripe={stripePromise}>
    <DonateFormInner {...props} />
  </Elements>
);

export default DonateForm;
