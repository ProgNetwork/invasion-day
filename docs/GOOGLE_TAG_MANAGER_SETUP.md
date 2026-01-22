# Google Tag Manager & Google Analytics Setup

This guide explains how to set up Google Tag Manager (GTM) and Google Analytics (GA4) for your Invasion Day website.

## What's Been Implemented

✅ **Google Tag Manager Integration**
- GTM script added to `_document.tsx`
- GTM noscript fallback added
- Page view tracking on route changes
- Custom event tracking functions

✅ **Custom Event Tracking**
- Donation tracking (amount, method)
- Email signup tracking
- Full signup tracking
- Document download tracking
- Contact form tracking

✅ **Analytics Functions**
- `trackDonation(amount, method)` - Track successful donations
- `trackSignup(type)` - Track email and full signups
- `trackDownload(document)` - Track document downloads
- `trackContact(method)` - Track contact form submissions

## Setup Steps

### 1. Create Google Tag Manager Account

1. Go to [Google Tag Manager](https://tagmanager.google.com/)
2. Create a new account for "Invasion Day"
3. Create a new container for your website
4. Copy your GTM Container ID (format: GTM-XXXXXXX)

### 2. Set Environment Variables

Create a `.env.local` file in your project root:

```bash
# Google Tag Manager ID
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

**Replace `GTM-XXXXXXX` with your actual GTM Container ID**

### 3. Configure GTM Tags

In your GTM container, create the following tags:

#### Page View Tracking
- **Tag Type**: Google Analytics: GA4 Configuration
- **Trigger**: All Pages
- **Measurement ID**: Your GA4 property ID (G-XXXXXXXXXX)

#### Custom Event Tracking
- **Tag Type**: Google Analytics: GA4 Event
- **Trigger**: Custom Event (donation, signup, download, contact)
- **Event Name**: Use the action parameter from your custom events

### 4. Test Implementation

1. Start your development server: `npm run dev`
2. Open browser developer tools
3. Check the Network tab for GTM requests
4. Verify dataLayer events in Console: `dataLayer`
5. Test form submissions and downloads

## Event Data Structure

### Donation Events
```javascript
{
  event: 'donation',
  event_category: 'engagement',
  event_label: 'once' | 'recurring',
  value: 50 // amount in dollars
}
```

### Signup Events
```javascript
{
  event: 'signup',
  event_category: 'engagement',
  event_label: 'email' | 'full'
}
```

### Download Events
```javascript
{
  event: 'download',
  event_category: 'engagement',
  event_label: 'document-name.pdf'
}
```

## Files Modified

- `src/lib/gtm.ts` - GTM configuration and tracking functions
- `src/types/gtag.d.ts` - TypeScript declarations
- `src/pages/_document.tsx` - GTM script injection
- `src/pages/_app.tsx` - Page view tracking
- `src/components/form/DonateForm.tsx` - Donation tracking
- `src/components/form/EmailSignupForm.tsx` - Email signup tracking
- `src/components/form/SignupForm.tsx` - Full signup tracking
- `src/pages/resources.tsx` - Download tracking

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_GTM_ID` | GTM Container ID | Yes |

## Troubleshooting

### GTM Not Loading
- Check browser console for errors
- Verify GTM ID is correct
- Ensure `.env.local` file exists
- Check if ad blockers are interfering

### Events Not Firing
- Verify GTM container is published
- Check GTM preview mode
- Ensure triggers are configured correctly
- Verify dataLayer is being populated

### TypeScript Errors
- Run `npm run build` to check for type errors
- Ensure `src/types/gtag.d.ts` is properly imported
- Check that all tracking functions are properly typed

## Next Steps

1. **Set up conversion goals** in Google Analytics
2. **Create custom audiences** based on user behavior
3. **Set up remarketing campaigns** for donors and signups
4. **Configure enhanced ecommerce** if you add more donation features
5. **Set up custom dimensions** for better segmentation

## Support

For technical issues with the implementation, check:
- [Google Tag Manager Help](https://support.google.com/tagmanager/)
- [Google Analytics Help](https://support.google.com/analytics/)
- [Next.js Documentation](https://nextjs.org/docs)
