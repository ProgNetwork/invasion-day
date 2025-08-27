import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/Label';
import React, { useState } from 'react';

interface Errors {
  email?: string;
  givenName?: string;
  familyName?: string;
  postcode?: string;
  phone?: string;
}

const PledgeForm: React.FC = () => {
  const [formData, setFormData] = useState({
    givenName: '',
    familyName: '',
    email: '',
    postcode: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
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
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setLoading(true);

    try {
      // For now, just simulate a successful submission
      // You can integrate with your actual API endpoint later
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting pledge:', error);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold text-primary-700 mb-2">Thank you for your pledge!</h3>
        <p className="text-gray-600 mb-6">
          You've joined thousands of Australians supporting Treaties in Victoria and across the country.
        </p>
        <Button 
          variant="primary" 
          onClick={() => setSubmitted(false)}
        >
          Sign another pledge
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="givenName">First Name *</Label>
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
          <Label htmlFor="familyName">Last Name *</Label>
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
        <Label htmlFor="email">Email Address *</Label>
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
        <Label htmlFor="postcode">Postcode *</Label>
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
        <Label htmlFor="phone">Phone Number (Optional)</Label>
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

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        disabled={loading}
        className="mt-8"
      >
        {loading ? 'Signing Pledge...' : 'Treaty Now!'}
      </Button>
    </form>
  );
};

export default PledgeForm;
