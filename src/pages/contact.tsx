import Button from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: '',
    firstNationsIdentifying: false,
    agreeToPolicy: false,
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckedChange = (checked: boolean | 'indeterminate', field: string) => {
    setFormData((prev) => ({ ...prev, [field]: !!checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/freshdesk-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          message: '',
          firstNationsIdentifying: false,
          agreeToPolicy: false,
        });
      } else {
        setError(data.error || 'Failed to send message. Please try again.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <>
        <Head>
          <title>Contact Us - Together for Treaty</title>
          <meta name="description" content="Get in touch with the Together for Treaty campaign" />
        </Head>
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 bg-white py-16 pb-32">
          <div className="text-center">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">Thank you!</h2>
            <p className="text-lg text-gray-600 mb-6">
              Your message has been sent successfully. We'll get back to you soon.
            </p>
            <Link href="/">
              <Button
                variant="primary"
                className="font-sans"
              >
                Go To Homepage
              </Button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Contact Us - Together for Treaty</title>
        <meta name="description" content="Get in touch with the Together for Treaty campaign" />
      </Head>

      <div className="min-h-screen py-12 relative overflow-hidden" style={{ backgroundColor: '#f27419' }}>
        {/* Background Image */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${imageLoaded ? 'opacity-70' : 'opacity-0'}`}>
          <Image
            src="/images/christopher-ragland-carving.jpg"
            alt="Christopher Ragland carving"
            fill
            className="object-cover"
            priority
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-8">
            <div className="relative overflow-hidden lg:col-span-2 mb-8">
              <div className="pointer-events-none absolute inset-0 sm:hidden" aria-hidden="true">
              </div>
              <h2 className="text-2xl font-bold mb-2">Get In Touch</h2>
              <p className="mt-6 text-base text-gray-600">
                Have a question or want to get involved? We'd love to hear from you. Fill out the form or use the contact details below.
              </p>
            </div>

            <div className="lg:col-span-4">
              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-red-800">{error}</p>
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input type="text" name="firstName" id="firstName" required value={formData.firstName} onChange={handleInputChange} placeholder="First name"/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input type="text" name="lastName" id="lastName" required value={formData.lastName} onChange={handleInputChange} placeholder="Last name"/>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input type="email" name="email" id="email" required value={formData.email} onChange={handleInputChange} placeholder="Email"/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone number</Label>
                  <Input type="tel" name="phoneNumber" id="phoneNumber" required value={formData.phoneNumber} onChange={handleInputChange} placeholder="Phone number"/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea name="message" id="message" rows={4} required value={formData.message} onChange={handleInputChange} placeholder="Message"/>
                </div>
                <div className="flex items-center">
                  <Checkbox
                    id="firstNationsIdentifying"
                    name="firstNationsIdentifying"
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    checked={formData.firstNationsIdentifying}
                    onCheckedChange={(checked) => handleCheckedChange(checked, 'firstNationsIdentifying')}
                  />

                  <div className="ml-3 text-sm">
                    <Label
                      htmlFor="firstNationsIdentifying"
                      className="font-medium text-gray-700"
                    >
                      Do you identify as Aboriginal and/or Torres Strait Islander?
                    </Label>
                  </div>
                </div>
                <div className="flex items-center">
                  <Checkbox
                    id="agreeToPolicy"
                    name="agreeToPolicy"
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    checked={formData.agreeToPolicy}
                    onCheckedChange={(checked) => handleCheckedChange(checked, 'agreeToPolicy')}
                    required
                  />

                  <div className="ml-3 text-sm">
                    <Label
                      htmlFor="agreeToPolicy"
                      className="font-medium text-gray-700"
                    >
                      I agree to the{' '}
                      <Link
                        href="/privacy-policy"
                        className="text-primary-600 hover:text-primary-700"
                      >
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                </div>
                <div className="flex mt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    fullWidth
                    className="mt-4 font-sans"
                    disabled={loading}
                  >
                    {loading ? 'Sending...' : 'Send message'}
                  </Button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
