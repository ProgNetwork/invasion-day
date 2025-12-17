import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/Label';
import { setCookie } from '@/lib/utils';
import { trackSignup } from '@/lib/gtm';

interface EmailSignupFormProps {
  onSuccess: () => void;
  onClose: () => void;
}

const EmailSignupForm: React.FC<EmailSignupFormProps> = ({ onSuccess, onClose }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Removed email validation as it was setting an unused error state
    // if (!(/\S+@\S+\.\S+/).test(email)) {
    //   setError('Please enter a valid email address.');
    //   return;
    // }

    setLoading(true);

    try {
      const response = await fetch('/api/actionnetwork-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          givenName: '',
          familyName: '',
          email,
          postcode: '',
          sourceCode: 'website-tft',
          first_nations_identifying: false,
          volunteer: false,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setCookie('tft_signup_completed', 'true', {
          days: 365,
          path: '/',
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
        });

        setCookie('tft_signup_timestamp', new Date().toISOString(), {
          days: 365,
          path: '/',
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
        });

        setCookie('tft_signup_source', 'website-tft', {
          days: 365,
          path: '/',
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
        });

        trackSignup('email');
        onSuccess();
      } else {
        onSuccess();
      }
    } catch (error) {
      console.error(error);
      onSuccess();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-primary-700 mb-2">Join Together for Treaty</h3>
        <p className="text-gray-600">
          Get updates and resources to help build momentum for Treaty in your community.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full"
          />
        </div>

        <div className="flex gap-3">
          <Button
            type="button"
            variant="white"
            onClick={onClose}
            className="flex-1 font-sans"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="flex-1 font-sans"
            disabled={loading}
          >
            {loading ? 'Joining...' : 'Join & Download'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EmailSignupForm;
