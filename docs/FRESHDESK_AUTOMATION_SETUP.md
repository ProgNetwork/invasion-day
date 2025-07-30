# Freshdesk Automation Setup

This document explains how to set up automation in Freshdesk that creates a new person record and signs them up to ActionNetwork when a ticket is created.

## Overview

The automation system consists of two main components:

1. **Ticket Creation** (`/api/freshdesk-contact.ts`) - Creates tickets from the contact form
2. **Automation Handler** (`/api/freshdesk-automation.ts`) - Processes webhooks and creates people in Freshdesk + ActionNetwork

## How It Works

### 1. Contact Form Submission
When someone submits the contact form:
- A ticket is created in Freshdesk with the form data
- The ticket creation triggers an internal call to the automation endpoint
- The automation creates/updates a person record in Freshdesk
- The person is signed up to ActionNetwork with appropriate tags

### 2. Webhook Setup (Optional)
For additional automation, you can set up a Freshdesk webhook that calls the automation endpoint when tickets are created.

## Setup Instructions

### Environment Variables Required

Make sure these environment variables are set:

```bash
FRESHDESK_DOMAIN=your-freshdesk-domain
FRESHDESK_API_KEY=your-freshdesk-api-key
ACTION_NETWORK_API_KEY=your-actionnetwork-api-key
NEXTAUTH_URL=https://your-domain.com
```

### Freshdesk Webhook Configuration (Optional)

If you want to use Freshdesk webhooks for additional automation:

1. **Go to Freshdesk Admin Panel**
   - Navigate to Admin → Workflows → Webhooks

2. **Create New Webhook**
   - Name: "Ticket Creation Automation"
   - URL: `https://your-domain.com/api/freshdesk-automation`
   - Method: POST
   - Content Type: application/json

3. **Configure Trigger**
   - Event: Ticket Created
   - Conditions: 
     - Ticket Type = Question
     - Source = Portal
     - Custom Field cf_campaign = together-for-treaty

4. **Payload Configuration**
   The webhook will send ticket data in this format:
   ```json
   {
     "ticket": {
       "id": 123,
       "ticket_number": "TKT-123",
       "subject": "Contact Form: John Doe",
       "description": "Message content",
       "email": "john@example.com",
       "name": "John Doe",
       "phone": "+1234567890",
       "custom_fields": {
         "cf_campaign": "together-for-treaty",
         "cf_first_nations_identifying": "yes"
       }
     },
     "ticket_created_at": "2024-01-01T12:00:00Z"
   }
   ```

## Automation Process

### Step 1: Create/Update Person in Freshdesk
- Extracts name and contact information from the ticket
- Creates a new person record or updates existing one
- Sets custom fields for campaign and First Nations identification

### Step 2: Sign Up to ActionNetwork
- Uses the existing ActionNetwork signup logic
- Creates or updates the person record
- Adds appropriate tags: `together_for_treaty` and `freshdesk-contact`
- Handles existing records gracefully

### Step 3: Update Ticket
- Adds a private note to the ticket indicating automation completion
- Logs the results for monitoring

## Custom Fields

### Freshdesk Custom Fields
- `cf_campaign`: Set to "together-for-treaty"
- `cf_first_nations_identifying`: "yes" or "no"

### ActionNetwork Custom Fields
- `volunteer`: Set to "no" for contact form submissions
- `first_nations_identifying`: "yes" or "no"
- `source_code`: Set to "freshdesk-contact"

## Error Handling

The automation includes comprehensive error handling:

- **Missing Data**: Validates required fields before processing
- **Duplicate Records**: Handles existing people in both Freshdesk and ActionNetwork
- **API Failures**: Logs errors and continues processing where possible
- **Monitoring**: All actions are logged for debugging

## Testing

### Test the Automation
1. Submit a contact form on your website
2. Check the Freshdesk ticket was created
3. Verify a person record was created/updated in Freshdesk
4. Confirm the person was signed up to ActionNetwork
5. Check the ticket has an automation note

### Monitor Logs
Check your application logs for automation messages:
- "Automation triggered successfully"
- "Person created in Freshdesk"
- "Created new ActionNetwork record and tagged"

## Troubleshooting

### Common Issues

1. **Person not created in Freshdesk**
   - Check FRESHDESK_API_KEY is correct
   - Verify FRESHDESK_DOMAIN is set correctly

2. **ActionNetwork signup fails**
   - Verify ACTION_NETWORK_API_KEY is correct
   - Check the person doesn't already exist with different data

3. **Webhook not triggering**
   - Ensure the webhook URL is accessible
   - Check webhook conditions match your ticket criteria

### Debug Steps
1. Check application logs for error messages
2. Verify all environment variables are set
3. Test API endpoints individually
4. Check Freshdesk webhook delivery logs

## Security Considerations

- All API keys are stored as environment variables
- Webhook endpoints validate request methods
- Sensitive data is logged minimally
- Error messages don't expose internal details

## Future Enhancements

Potential improvements to consider:
- Add more sophisticated duplicate detection
- Implement retry logic for failed operations
- Add more detailed monitoring and alerting
- Support for additional custom fields
- Integration with other CRM systems 