import Button from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/Label';
import React, { useState } from 'react';
import { getUTMParams } from '@/lib/utils';
import { trackPledge } from '@/lib/gtm';

interface Errors {
  email?: string;
  givenName?: string;
  familyName?: string;
  postcode?: string;
  phone?: string;
}

const ContactRepForm: React.FC = () => {
  const [formData, setFormData] = useState({
    givenName: '',
    familyName: '',
    email: '',
    postcode: '',
    phone: '',
    first_nations_identifying: false,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // For phone field, only allow digits
    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '');
      setFormData((prev) => ({ ...prev, [name]: digitsOnly }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckboxChange = (checked: boolean | 'indeterminate', field: string) => {
    setFormData((prev) => ({ ...prev, [field]: !!checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Errors = {};
    if (!(/\S+@\S+\.\S+/).test(formData.email)) {
      newErrors.email = 'Valid email required.';
    }
    if (!formData.givenName.trim()) {
      newErrors.givenName = 'First name required.';
    }
    if (!formData.familyName.trim()) {
      newErrors.familyName = 'Last name required.';
    }
    if (!formData.postcode.trim()) {
      newErrors.postcode = 'Postcode required.';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number required.';
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setLoading(true);

    try {
      // Get UTM parameters from the current URL
      const utmParams = getUTMParams();

      // Prepare the data to send to Action Network
      const actionNetworkData = {
        givenName: formData.givenName,
        familyName: formData.familyName,
        email: formData.email,
        postcode: formData.postcode,
        phone: formData.phone || '',
        firstNationsIdentifying: formData.first_nations_identifying,
        sourceCode: 'contact_rep_website_batton',
        // Include UTM parameters as custom fields
        utmSource: utmParams.utm_source || '',
        utmMedium: utmParams.utm_medium || '',
        utmCampaign: utmParams.utm_campaign || '',
        utmTerm: utmParams.utm_term || '',
        utmContent: utmParams.utm_content || '',
      };

      const response = await fetch('/api/actionnetwork-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(actionNetworkData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit contact form');
      }

      // Track the successful contact form submission in GTM
      trackPledge(utmParams);

      // Change the hash to #share to show the success state
      window.location.hash = '#share';
    } catch {
      // You might want to show an error message to the user here
      alert('There was an error submitting your contact form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="givenName" className="pb-1">First Name *</Label>
          <Input
            id="givenName"
            name="givenName"
            type="text"
            value={formData.givenName}
            onChange={handleInputChange}
            className={errors.givenName ? 'border-red-500' : ''}
            placeholder="Enter your first name"
          />
          {errors.givenName && (
            <p className="text-red-500 text-sm mt-1">{errors.givenName}</p>
          )}
        </div>
        <div>
          <Label htmlFor="familyName" className="pb-1">Last Name *</Label>
          <Input
            id="familyName"
            name="familyName"
            type="text"
            value={formData.familyName}
            onChange={handleInputChange}
            className={errors.familyName ? 'border-red-500' : ''}
            placeholder="Enter your last name"
          />
          {errors.familyName && (
            <p className="text-red-500 text-sm mt-1">{errors.familyName}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="email" className="pb-1">Email Address *</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          className={errors.email ? 'border-red-500' : ''}
          placeholder="Enter your email address"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <Label htmlFor="postcode" className="pb-1">Postcode *</Label>
        <Input
          id="postcode"
          name="postcode"
          type="text"
          value={formData.postcode}
          onChange={handleInputChange}
          className={errors.postcode ? 'border-red-500' : ''}
          placeholder="Enter your postcode"
        />
        {errors.postcode && (
          <p className="text-red-500 text-sm mt-1">{errors.postcode}</p>
        )}
      </div>

      <div>
        <Label htmlFor="phone" className="pb-1">Phone Number *</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleInputChange}
          className={errors.phone ? 'border-red-500' : ''}
          placeholder="Enter your phone number"
          maxLength={15}
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
        )}
      </div>

      <div className="flex items-center">
        <Checkbox
          name="first_nations_identifying"
          id="first_nations_identifying"
          checked={formData.first_nations_identifying}
          onCheckedChange={(checked) => handleCheckboxChange(checked, 'first_nations_identifying')}
        />
        <Label
          htmlFor="first_nations_identifying"
          className="ml-2 cursor-pointer"
          onClick={() => setFormData(prev => ({ ...prev, first_nations_identifying: !prev.first_nations_identifying }))}
        >
          Are you Aboriginal and/or Torres Strait Islander?
        </Label>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        disabled={loading}
        className="mt-8"
      >
        {loading ? 'Submitting...' : 'Contact Representative'}
      </Button>
    </form>
  );
};

export default ContactRepForm;
