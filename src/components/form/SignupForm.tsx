// File: src/components/form/SignUpForm.tsx
import Button from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/Label';
import React, { useState } from 'react';

interface Errors {
  email?: string;
  givenName?: string;
  familyName?: string;
  postcode?: string;
}

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState({
    givenName: '',
    familyName: '',
    email: '',
    postcode: '',
    volunteer: false,
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean | 'indeterminate') => {
    setFormData((prev) => ({ ...prev, volunteer: !!checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Errors = {};
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email required.';
    if (!formData.givenName.trim()) newErrors.givenName = 'First name required.';
    if (!formData.familyName.trim()) newErrors.familyName = 'Last name required.';
    if (!formData.postcode.trim()) newErrors.postcode = 'Postcode required.';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);

    await fetch('/api/actionnetwork-signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        givenName: formData.givenName,
        familyName: formData.familyName,
        email: formData.email,
        postcode: formData.postcode,
        volunteer: formData.volunteer,
      }),
    });

    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return <p className="p-4 text-green-700 bg-green-100 rounded">Thank you for contacting us!</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-50 rounded-xl border">
      <h2 className="text-2xl font-bold mb-2">Add your details to join!</h2>
      <p className="text-md text-gray-500">
        Sign up to receive updates and find out how you can be part of the movement for Treaty.
      </p>
      <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
        <div className="gap-2 flex flex-col">
          <Label htmlFor="givenName">First Name</Label>
          <Input
            type="text"
            name="givenName"
            id="givenName"
            placeholder="First Name"
            value={formData.givenName}
            onChange={handleInputChange}
            required
            className={errors.givenName ? 'border-red-500' : ''}
          />
          {errors.givenName && <p className="text-sm text-red-600">{errors.givenName}</p>}
        </div>
        <div className="gap-2 flex flex-col">
          <Label htmlFor="familyName">Last Name</Label>
          <Input
            type="text"
            name="familyName"
            id="familyName"
            placeholder="Last Name"
            value={formData.familyName}
            onChange={handleInputChange}
            required
            className={errors.familyName ? 'border-red-500' : ''}
          />
          {errors.familyName && <p className="text-sm text-red-600">{errors.familyName}</p>}
        </div>
        <div className="gap-2 flex flex-col">
          <Label htmlFor="email">Email Address</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleInputChange}
            required
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
        </div>
        <div className="gap-2 flex flex-col">
          <Label htmlFor="postcode">Postcode</Label>
          <Input
            type="text"
            name="postcode"
            id="postcode"
            placeholder="2000"
            value={formData.postcode}
            onChange={handleInputChange}
            required
            className={errors.postcode ? 'border-red-500' : ''}
          />
          {errors.postcode && <p className="text-sm text-red-600">{errors.postcode}</p>}
        </div>
        <div className="flex items-center">
          <Checkbox
            name="volunteer"
            id="volunteer"
            checked={formData.volunteer}
            onCheckedChange={handleCheckboxChange}
          />
          <Label htmlFor="volunteer" className="ml-2">
            I'm interested in volunteering with the campaign
          </Label>
        </div>
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <Button
            type="submit"
            variant="primary"
            className="w-full sm:w-auto"
            disabled={loading}
            fullWidth
          >
            {loading ? 'Submitting…' : 'Sign Up'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;