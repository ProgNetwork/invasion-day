# Custom Receipt System

This system provides comprehensive custom email receipts with substantial text content for Together For Treaty donations.

## Features

### 🎯 Substantial Content
- **Detailed impact descriptions** - Explain exactly how donations support the Treaty movement
- **Campaign context** - Provide background on the importance of Treaty negotiations
- **Tax information** - Clear details about tax deductibility
- **Next steps** - Information about ongoing involvement opportunities
- **Professional branding** - Branded email templates with Together For Treaty styling

### 📧 Custom Messages
- Add personal messages to each receipt
- Pre-built message templates for quick use
- Support for different donation types (one-off, recurring, large donations)

### 🎨 Template System
- **Dynamic templates** based on donation amount and type
- **Easy customization** of all text content
- **Consistent branding** across all receipts
- **Responsive design** for mobile and desktop

## How to Use

### 1. Access the Receipt Manager
Navigate to `/admin/receipts` to access the receipt management interface.

### 2. Send Custom Receipts
1. Select a payment from the list
2. Click "Send Custom Receipt"
3. Add an optional personal message
4. Choose from pre-built message templates or write your own
5. Send the receipt

### 3. Customize Templates
Edit the receipt templates in `src/lib/receipt-templates.ts`:

```typescript
export const defaultReceiptTemplate: ReceiptTemplate = {
  subject: 'Thank you for your donation to Together For Treaty',
  header: 'Together For Treaty - Thank you for your support',
  
  impactSection: {
    title: 'Your Impact',
    description: 'Thank you for supporting the Treaty movement. Your contribution helps fund:',
    bulletPoints: [
      'First Nations organisers and community leaders',
      'Community events and gatherings',
      'Storytelling and cultural preservation initiatives',
      // Add more bullet points as needed
    ],
  },
  
  // ... customize other sections
};
```

## Template Types

### Default Template
Used for standard one-off donations under $100.

### Recurring Template
Used for subscription/recurring donations with emphasis on ongoing support.

### Large Donation Template
Used for donations of $100+ with enhanced messaging for major supporters.

## Customization Options

### 1. Text Content
- **Impact descriptions** - Explain how donations are used
- **Campaign messaging** - Context about the Treaty movement
- **Tax information** - Details about tax deductibility
- **Next steps** - Information about ongoing involvement

### 2. Branding
- **Colors** - Primary and secondary brand colors
- **Logo** - Optional logo URL
- **Styling** - CSS customization for email appearance

### 3. Message Templates
Add new message templates in `CustomReceiptManager.tsx`:

```typescript
const defaultMessages = [
  "Thank you for your generous support of the Treaty movement...",
  "Your donation makes a real difference in our campaign...",
  // Add more templates
];
```

## API Endpoints

### `/api/send-custom-receipt`
Sends custom receipts with substantial content.

**Parameters:**
- `paymentIntentId` - Stripe Payment Intent ID
- `customMessage` - Optional personal message
- `email` - Recipient email address

**Response:**
```json
{
  "success": true,
  "message": "Custom receipt prepared",
  "emailContent": {
    "to": "donor@example.com",
    "subject": "Thank you for your donation to Together For Treaty",
    "html": "<!DOCTYPE html>..."
  },
  "receiptUrl": "https://receipt.stripe.com/..."
}
```

## Email Integration

The system currently returns the email content for manual sending. To integrate with an email service:

1. **SendGrid Integration**
```typescript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
await sgMail.send(receiptEmail);
```

2. **AWS SES Integration**
```typescript
import AWS from 'aws-sdk';

const ses = new AWS.SES();
await ses.sendEmail({
  Source: 'noreply@togetherfortreaty.org',
  Destination: { ToAddresses: [receiptEmail.to] },
  Message: {
    Subject: { Data: receiptEmail.subject },
    Body: { Html: { Data: receiptEmail.html } }
  }
}).promise();
```

## Content Guidelines

### Impact Section
- Focus on specific outcomes and community benefits
- Use concrete examples of how donations are used
- Emphasize First Nations leadership and community-led initiatives

### Campaign Context
- Explain the importance of Treaty negotiations
- Highlight the role of reconciliation and truth-telling
- Connect individual donations to broader movement goals

### Tax Information
- Clearly state tax deductibility for amounts over $2
- Mention the Centre for Australian Progress as the issuing entity
- Provide contact information for tax-related questions

### Next Steps
- Outline ongoing involvement opportunities
- Explain how donors will be kept updated
- Encourage continued engagement with the movement

## File Structure

```
src/
├── components/
│   └── CustomReceiptManager.tsx    # Receipt management UI
├── lib/
│   └── receipt-templates.ts        # Template configuration
├── pages/
│   ├── admin/
│   │   └── receipts.tsx           # Admin interface
│   └── api/
│       └── send-custom-receipt.ts # Receipt sending API
```

## Security Considerations

- Validate payment intent IDs before processing
- Ensure only authorized users can access the admin interface
- Sanitize custom messages to prevent XSS attacks
- Use environment variables for sensitive configuration

## Future Enhancements

1. **Email Service Integration** - Direct integration with SendGrid/AWS SES
2. **Receipt Analytics** - Track receipt open rates and engagement
3. **A/B Testing** - Test different receipt templates and messaging
4. **Automated Receipts** - Send receipts automatically after successful payments
5. **Receipt Templates** - Visual template editor for non-technical users
6. **Multi-language Support** - Support for Indigenous languages and other languages

## Support

For questions about the receipt system or customization needs, please contact the development team. 