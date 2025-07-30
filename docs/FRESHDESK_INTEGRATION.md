# Freshdesk Integration Guide

This guide explains how to set up and configure the Freshdesk integration for the contact form.

## Overview

The contact form now integrates with Freshdesk to create support tickets when users submit messages. This provides a professional ticketing system for handling inquiries and support requests.

## Setup Requirements

### 1. Freshdesk Account
- You need a Freshdesk account (free tier available)
- Your Freshdesk domain (e.g., `yourcompany` for `yourcompany.freshdesk.com`)
- API key from your Freshdesk account

### 2. Environment Variables
Add these to your `.env.local` file:

```env
FRESHDESK_DOMAIN=yourcompany
FRESHDESK_API_KEY=your_api_key_here
```

### 3. Getting Your Freshdesk API Key
1. Log into your Freshdesk account
2. Go to **Admin** → **Profile Settings**
3. Click on **API** in the left sidebar
4. Copy your API key

## API Endpoint

The integration creates a new API endpoint at `/api/freshdesk-contact` that:

- Validates form data
- Creates a ticket in Freshdesk
- Handles errors gracefully
- Returns appropriate responses

## Ticket Configuration

### Default Ticket Settings
- **Subject**: "Contact Form: [First Name] [Last Name]"
- **Priority**: Medium (1)
- **Status**: Open (2)
- **Type**: Question
- **Description**: Includes all form fields in a formatted message

### Custom Fields
The integration adds custom fields to track:
- `cf_source`: "Website Contact Form"
- `cf_campaign`: "together-for-treaty"

### Requester Information
- Name: Full name from form
- Email: Email from form
- Phone: Phone number from form

## Customization Options

### 1. Ticket Priority
Modify the `priority` field in `src/pages/api/freshdesk-contact.ts`:
- 1 = Low
- 2 = Medium
- 3 = High
- 4 = Urgent

### 2. Ticket Type
Change the `type` field based on your Freshdesk setup:
- "Question"
- "Bug"
- "Feature Request"
- "Complaint"

### 3. Custom Fields
Add more custom fields by modifying the `custom_fields` object:

```javascript
custom_fields: {
  cf_source: 'Website Contact Form',
  cf_campaign: 'together-for-treaty',
  cf_priority_level: 'medium',
  // Add more as needed
},
```

### 4. Ticket Assignment
To assign tickets to specific agents, add:

```javascript
assignee_id: 123, // Agent ID from Freshdesk
```

## Error Handling

The integration handles various error scenarios:

1. **Missing Environment Variables**: Returns 500 error
2. **Invalid Form Data**: Returns 400 error with validation details
3. **Freshdesk API Errors**: Returns appropriate HTTP status codes
4. **Network Errors**: Returns 500 error with details

## Testing

### 1. Local Testing
1. Set up environment variables
2. Start the development server
3. Submit the contact form
4. Check your Freshdesk dashboard for new tickets

### 2. Production Testing
1. Deploy with environment variables
2. Test form submission
3. Verify tickets appear in Freshdesk

## Troubleshooting

### Common Issues

1. **401 Unauthorized**
   - Check your API key is correct
   - Verify the domain name is correct

2. **400 Bad Request**
   - Check required fields are being sent
   - Verify custom field names match your Freshdesk setup

3. **500 Server Error**
   - Check environment variables are set
   - Review server logs for detailed error messages

### Debug Mode
Add logging to debug issues:

```javascript
console.log('Ticket data:', ticketData);
console.log('Freshdesk response:', response.status, responseData);
```

## Security Considerations

1. **API Key Security**: Never expose your API key in client-side code
2. **Rate Limiting**: Freshdesk has API rate limits
3. **Data Validation**: All form data is validated server-side
4. **HTTPS**: Always use HTTPS in production

## Alternative Integrations

If Freshdesk doesn't meet your needs, consider:

1. **Zendesk**: Similar ticketing system
2. **Intercom**: Chat-based support
3. **Help Scout**: Email-based support
4. **Custom Email**: Simple email forwarding

## Support

For issues with this integration:
1. Check the troubleshooting section above
2. Review Freshdesk API documentation
3. Check server logs for detailed error messages
4. Verify environment variables are correctly set 