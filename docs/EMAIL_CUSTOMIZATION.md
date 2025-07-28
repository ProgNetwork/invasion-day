# Email Template Customization

This document explains how to customize the email templates for donation receipts sent by Stripe.

## Overview

The donation system now includes configurable email templates that are sent to donors via Stripe's receipt system. The templates are defined in `src/lib/email-config.ts` and used in the payment processing APIs.

## Configuration Files

### `src/lib/email-config.ts`
Contains all configurable email template parts and organization details.

### `src/lib/utils.ts`
Contains the `generateDonationEmailDescription()` function that assembles the email template.

## Customizing Email Templates

### 1. Organization Details
Update the `EMAIL_CONFIG` object in `src/lib/email-config.ts`:

```typescript
export const EMAIL_CONFIG = {
  organization: {
    name: 'Your Organization Name',
    address: 'Your Address',
    email: 'your-email@domain.com',
    abn: 'Your ABN',
    dgrPeriod: 'Your DGR Period'
  },
  // ... other config
}
```

### 2. Email Template Parts
Modify individual template parts in the `EMAIL_TEMPLATES` object:

```typescript
export const EMAIL_TEMPLATES = {
  greeting: (firstName: string) => `Dear ${firstName},`,
  thankYou: `Your custom thank you message...`,
  campaignInfo: `Your campaign information...`,
  // ... other template parts
}
```

### 3. Template Structure
The email template is structured as follows:

1. **Greeting** - Personalized greeting with donor's first name
2. **Thank You** - Thank you message
3. **Campaign Info** - Information about the campaign and tax deductibility
4. **Recurring Info** - Additional text for recurring donations (if applicable)
5. **Contact Info** - Instructions for questions
6. **Receipt Details** - Receipt number, date, donor name, and amount
7. **Organization Details** - Organization contact information
8. **Tax Info** - Tax deductibility information
9. **Closing** - Final thank you and contact information

## API Integration

The email templates are automatically used in:

- **One-time donations**: `src/pages/api/create-payment-intent.ts`
- **Recurring donations**: `src/pages/api/create-subscription.ts`

Both APIs use the `generateDonationEmailDescription()` function to create the email description that Stripe includes in receipts.

## Stripe Configuration

To enable email receipts in Stripe:

1. Go to your Stripe Dashboard
2. Navigate to Settings > Customer emails
3. Enable "Email customers for successful payments"
4. Customize branding (logo, colors) in Branding settings

## Template Variables

The email template supports the following dynamic variables:

- `donorFirstName` - Donor's first name
- `donorFullName` - Donor's full name
- `donationAmount` - Donation amount
- `receiptNumber` - Receipt number (currently set to 'XXX')
- `donationDate` - Date of donation
- `isRecurring` - Whether it's a recurring donation
- `interval` - Recurring interval ('month' or 'week')

## Example Customization

To change the thank you message:

```typescript
// In src/lib/email-config.ts
export const EMAIL_TEMPLATES = {
  // ... other templates
  thankYou: `Thank you for your generous contribution to our cause. Your support makes a real difference in our community.`,
  // ... other templates
}
```

## Testing

To test email templates:

1. Make a test donation through the form
2. Check the Stripe Dashboard for the payment
3. Verify the email description in the payment details
4. Check that the receipt email was sent with the correct content

## Notes

- The email description is set on the PaymentIntent/Product description field
- Stripe will include this description in the receipt emails
- For recurring donations, the description is also set on the Product
- All organization details are centralized in the config file for easy updates 