# Email Customization Guide

This guide explains how to customize email content and templates for the Invasion Day receipt system.

## Overview

The receipt system uses a template-based approach that allows for easy customization of all email content while maintaining professional branding and legal compliance.

## Template Structure

### ReceiptTemplate Interface

```typescript
interface ReceiptTemplate {
  subject: string;
  header: string;
  impactSection: {
    title: string;
    description: string;
    bulletPoints: string[];
  };
  taxInfo: string;
  nextSteps: {
    title: string;
    description: string;
    bulletPoints: string[];
  };
  footer: {
    title: string;
    description: string;
    contactInfo: string;
  };
  branding: {
    primaryColor: string;
    secondaryColor: string;
    logoUrl?: string;
  };
}
```

## Customizing Content

### 1. Subject Lines

Update the email subject line for different donation types:

```typescript
export const defaultReceiptTemplate: ReceiptTemplate = {
  subject: 'Thank you for your donation to Invasion Day',
  // ...
};

export const recurringReceiptTemplate: ReceiptTemplate = {
  subject: 'Thank you for your recurring donation to Invasion Day',
  // ...
};
```

### 2. Impact Descriptions

Customize how you describe the impact of donations:

```typescript
impactSection: {
  title: 'Your Impact',
  description: 'Thank you for supporting the Invasion movement. Your contribution helps fund:',
  bulletPoints: [
    'First Nations organisers and community leaders',
    'Community events and gatherings',
    'Storytelling and cultural preservation initiatives',
    'Educational programs and awareness campaigns',
    'Advocacy and policy development',
  ],
},
```

### 3. Tax Information

Update tax-related content (ensure legal compliance):

```typescript
taxInfo: 'This campaign is being coordinated by Common Threads. Donations over $2 are tax deductible. Your contribution helps support First Nations organisers, community events, and storytelling.',
```

### 4. Next Steps

Customize information about ongoing involvement:

```typescript
nextSteps: {
  title: 'What happens next?',
  description: 'Invasion Day is working towards a future where First Nations peoples have a voice in decisions that affect their lives and communities. Your support helps us:',
  bulletPoints: [
    'Build stronger relationships between First Nations and non-Indigenous Australians',
    'Advocate for meaningful Invasion negotiations',
    'Support community-led initiatives and cultural programs',
    'Create opportunities for truth-telling and reconciliation',
  ],
},
```

## Branding Customization

### Colors

Update the primary and secondary colors:

```typescript
branding: {
  primaryColor: '#1a1a1a',    // Dark gray for headers
  secondaryColor: '#2d5a27',   // Green for accents
},
```

### Logo

Add a logo URL (optional):

```typescript
branding: {
  primaryColor: '#1a1a1a',
  secondaryColor: '#2d5a27',
  logoUrl: 'https://example.com/logo.png',
},
```

## Template Types

### Default Template
Used for standard one-off donations under $100.

### Recurring Template
Used for subscription/recurring donations with emphasis on ongoing support.

### Large Donation Template
Used for donations of $100+ with enhanced messaging for major supporters.

## Dynamic Content

### Personalization

The system automatically personalizes content:

- **Donor name**: Extracted from payment data
- **Donation amount**: Formatted with currency
- **Date**: Formatted for Australian locale
- **Receipt number**: From Stripe

### Conditional Content

Add conditional content based on donation type:

```typescript
export const getReceiptTemplate = (amount: number, isRecurring: boolean = false): ReceiptTemplate => {
  if (isRecurring) {
    return recurringReceiptTemplate;
  }
  
  if (amount >= 100) {
    return largeDonationTemplate;
  }
  
  return defaultReceiptTemplate;
};
```

## HTML Structure

### Email Layout

The generated HTML includes:

1. **Header** - Branded header with campaign name
2. **Personal greeting** - "Dear {donor_first_name}"
3. **Thank you message** - Official thank you from Common Threads
4. **Campaign context** - Information about Invasion Day
5. **Official receipt** - Structured receipt with all required details
6. **DGR information** - Legal tax information
7. **Impact section** - How donations are used
8. **Custom message** - Optional personal message
9. **Next steps** - Ongoing involvement opportunities
10. **Footer** - Contact information and final thank you

### CSS Styling

Customize the email appearance:

```css
body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
.container { max-width: 600px; margin: 0 auto; padding: 20px; }
.header { background: #1a1a1a; color: white; padding: 30px; text-align: center; }
.content { padding: 30px; background: #f9f9f9; }
.footer { background: #1a1a1a; color: white; padding: 20px; text-align: center; }
.amount { font-size: 24px; font-weight: bold; color: #2d5a27; }
.message { background: white; padding: 20px; margin: 20px 0; border-left: 4px solid #2d5a27; }
.highlight { background: #e8f5e8; padding: 15px; margin: 15px 0; border-radius: 5px; }
```

## Legal Compliance

### Required Content

Ensure all receipts include:

- **DGR information**: Common Threads Indigenous Peoples Organisation Ltd (ABN: 43 687 271 227)
- **Tax deductibility**: Clear statement about $2+ donations
- **Contact information**: info@australianprogress.org.au
- **Address**: 3 Albert Coates Lane, Melbourne VIC 3000
- **Legal reference**: Item 1 of the table in section 30-15 of the Income Tax Assessment Act 1997

### DGR Period

Current DGR period: 01 Jul 2024 to 30 Jun 2029

## Testing

### Test Cards

Use Stripe test cards for testing:

- **Success**: `4242 4242 4242 4242`
- **Declined**: `4000 0000 0000 0002`
- **Insufficient funds**: `4000 0000 0000 9995`

### Preview Receipts

1. Make a test donation
2. Access `/admin/receipts`
3. Send a custom receipt
4. Check the generated HTML

## Best Practices

### Content Guidelines

1. **Keep it personal** - Use donor's first name
2. **Be specific** - Explain exactly how donations are used
3. **Include context** - Explain the importance of Invasion negotiations
4. **Provide next steps** - Encourage ongoing involvement
5. **Maintain professionalism** - Use consistent branding

### Technical Guidelines

1. **Test thoroughly** - Verify all content renders correctly
2. **Check legal compliance** - Ensure all required information is included
3. **Optimize for mobile** - Test on various email clients
4. **Monitor delivery** - Track email delivery and open rates
5. **Backup templates** - Keep version control of template changes

## Troubleshooting

### Common Issues

1. **Missing donor name** - Check payment intent metadata
2. **Incorrect formatting** - Verify CSS styles
3. **Legal content missing** - Ensure DGR information is included
4. **Email not sending** - Check email service integration

### Debug Steps

1. Check browser console for errors
2. Verify API endpoint responses
3. Test with different donation amounts
4. Validate HTML output
5. Check email client compatibility

## Support

For questions about email customization or technical issues, please contact the development team. 