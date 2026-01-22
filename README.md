# Invasion Day

A Next.js application for the Invasion Day campaign, featuring donation functionality with Stripe integration and comprehensive custom receipt system.

## 🎯 Project Overview

Invasion Day is a campaign coordinated by Common Threads. This application provides:

- **Donation processing** with Stripe integration
- **Custom email receipts** with substantial content
- **Admin interface** for receipt management
- **Professional branding** and user experience

## 🚀 Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
```

Set up your environment variables:

```bash
cp .env.example .env.local
```

Add your Stripe keys and other configuration:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📧 Custom Receipt System

The application includes a comprehensive custom receipt system with:

- **Substantial text content** explaining campaign impact
- **Personal greeting** with donor's first name
- **Professional formatting** and branding
- **Custom message functionality** for personal touches
- **Dynamic templates** based on donation type and amount

### Receipt Features

- ✅ **Complete DGR information** with ABN: 76 158 172 484
- ✅ **Tax deductibility** details for donations over $2
- ✅ **Campaign context** about Invasion negotiations
- ✅ **Impact descriptions** of how donations are used
- ✅ **Contact information** for questions and support

## 📚 Documentation

- **[Receipt System Guide](docs/RECEIPT_SYSTEM.md)** - Complete documentation for the custom receipt system
- **[Email Customization](docs/EMAIL_CUSTOMIZATION.md)** - Guide for customizing email content and templates

## 🛠️ API Routes

- `pages/api/create-payment-intent.ts` - Create one-off donations
- `pages/api/create-subscription.ts` - Create recurring donations
- `pages/api/send-custom-receipt.ts` - Send custom receipts with substantial content

## 🎨 Admin Interface

Access the receipt management interface at `/admin/receipts` to:

- View recent payments
- Send custom receipts
- Add personal messages
- Manage receipt templates

## 🧪 Testing

Use Stripe's sandbox test cards for testing:

- **Success:** `4242 4242 4242 4242`
- **Declined:** `4000 0000 0000 0002`
- **Insufficient funds:** `4000 0000 0000 9995`

### Preview Receipts

1. Make a test donation
2. Access `/admin/receipts`
3. Send a custom receipt
4. Check the generated HTML

## 📁 Project Structure

```
src/
├── components/
│   ├── CustomReceiptManager.tsx    # Receipt management UI
│   ├── form/
│   │   └── DonateForm.tsx         # Donation form
│   └── ui/                        # UI components
├── lib/
│   └── receipt-templates.ts       # Receipt template configuration
├── pages/
│   ├── admin/
│   │   └── receipts.tsx           # Admin interface
│   ├── api/                       # API routes
│   └── donate.tsx                 # Donation page
└── styles/
    └── globals.css                # Global styles
```

## 🔧 Customization

### Receipt Templates

Edit receipt content in `src/lib/receipt-templates.ts`:

```typescript
export const defaultReceiptTemplate: ReceiptTemplate = {
  subject: 'Thank you for your donation to Invasion Day',
  // Customize impact descriptions, tax info, and more
};
```

### Branding

Update colors and styling in the template configuration:

```typescript
branding: {
  primaryColor: '#1a1a1a',
  secondaryColor: '#2d5a27',
}
```

## 🚀 Deployment

The easiest way to deploy is using [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.

## 📞 Support

For questions about the receipt system or customization needs, please contact the development team.

---

Built with [Next.js](https://nextjs.org/) and [Stripe](https://stripe.com/).
