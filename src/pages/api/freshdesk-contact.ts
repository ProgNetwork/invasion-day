import type { NextApiRequest, NextApiResponse } from 'next';

const FRESHDESK_DOMAIN = process.env.FRESHDESK_DOMAIN || '';
const FRESHDESK_API_KEY = process.env.FRESHDESK_API_KEY || '';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // eslint-disable-next-line no-console
  console.log('Freshdesk contact API called:', {
    method: req.method,
    timestamp: new Date().toISOString(),
    userAgent: req.headers['user-agent'],
    ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
  });

  if (req.method !== 'POST') {
    // eslint-disable-next-line no-console
    console.log('Invalid method:', req.method);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    message,
    firstNationsIdentifying,
    agreeToPolicy,
  } = req.body;

  // eslint-disable-next-line no-console
  console.log('Form data received:', {
    firstName: firstName ? 'provided' : 'missing',
    lastName: lastName ? 'provided' : 'missing',
    email: email ? 'provided' : 'missing',
    phoneNumber: phoneNumber ? 'provided' : 'missing',
    message: message ? 'provided' : 'missing',
    firstNationsIdentifying,
    agreeToPolicy,
    messageLength: message?.length || 0,
  });

  // Validate required fields
  if (!firstName || !lastName || !email || !message) {
    // eslint-disable-next-line no-console
    console.log('Validation failed - missing required fields:', {
      hasFirstName: !!firstName,
      hasLastName: !!lastName,
      hasEmail: !!email,
      hasMessage: !!message,
    });
    return res.status(400).json({
      error: 'Missing required fields',
      required: ['firstName', 'lastName', 'email', 'message'],
    });
  }

  // Validate privacy policy agreement
  if (!agreeToPolicy) {
    // eslint-disable-next-line no-console
    console.log('Validation failed - privacy policy not agreed to');
    return res.status(400).json({
      error: 'You must agree to the Privacy Policy to submit this form',
    });
  }

  // eslint-disable-next-line no-console
  console.log('Form validation passed, proceeding to create ticket');

  try {
    const ticketData = {
      subject: `Contact Form: ${firstName} ${lastName}`,
      description: message,
      email,
      priority: 1, // Medium priority
      status: 2, // Open
      type: 'Question', // You can customize this based on your Freshdesk setup
      // Using individual fields instead of requester object
      name: `${firstName} ${lastName}`,
      phone: phoneNumber,
      source: 2, // 2 = Portal (website form)
      // Custom fields need to be in a custom_fields object
      custom_fields: {
        cf_campaign: 'together-for-treaty',
        cf_first_nations_identifying: firstNationsIdentifying ? 'yes' : 'no',
      },
    };

    // eslint-disable-next-line no-console
    console.log('Ticket data prepared:', {
      subject: ticketData.subject,
      email: ticketData.email,
      priority: ticketData.priority,
      status: ticketData.status,
      type: ticketData.type,
      requesterName: ticketData.name,
      customFields: ticketData.custom_fields,
      firstNationsIdentifying: firstNationsIdentifying ? 'yes' : 'no',
    });

    const requestId = Math.random().toString(36).substring(7);

    // eslint-disable-next-line no-console
    console.log('Making request to Freshdesk API:', {
      url: `https://${FRESHDESK_DOMAIN}.freshdesk.com/api/v2/tickets`,
      hasApiKey: !!FRESHDESK_API_KEY,
      hasDomain: !!FRESHDESK_DOMAIN,
      timestamp: new Date().toISOString(),
      requestId,
    });

    const response = await fetch(`https://${FRESHDESK_DOMAIN}.freshdesk.com/api/v2/tickets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(`${FRESHDESK_API_KEY}:X`).toString('base64')}`,
      },
      body: JSON.stringify(ticketData),
    });

    // eslint-disable-next-line no-console
    console.log('Freshdesk API response:', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
    });

    if (!response.ok) {
      const errorData = await response.json();
      // eslint-disable-next-line no-console
      console.error('Freshdesk API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
        errors: errorData.errors,
        description: errorData.description,
      });

      // Log to monitoring endpoint
      try {
        const baseUrl = process.env.NEXTAUTH_URL || `http://localhost:${process.env.PORT || 3000}`;
        await fetch(`${baseUrl}/api/freshdesk-monitor`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            requestId,
            status: 'error',
            error: JSON.stringify(errorData),
          }),
        });
      } catch (monitoringError) {
        // eslint-disable-next-line no-console
        console.error('Failed to log to monitoring endpoint:', monitoringError);
      }

      return res.status(response.status).json({
        error: 'Failed to create ticket',
        details: errorData,
      });
    }

    const ticket = await response.json();

    // eslint-disable-next-line no-console
    console.log('Ticket created successfully:', {
      ticketId: ticket.id,
      ticketNumber: ticket.ticket_number,
      subject: ticket.subject,
      status: ticket.status,
    });

    // Log to monitoring endpoint
    const baseUrl = process.env.NEXTAUTH_URL || `http://localhost:${process.env.PORT || 3000}`;
    try {
      await fetch(`${baseUrl}/api/freshdesk-monitor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestId,
          status: 'success',
          ticketId: ticket.id,
        }),
      });
    } catch (monitoringError) {
      // eslint-disable-next-line no-console
      console.error('Failed to log to monitoring endpoint:', monitoringError);
    }

    // Trigger automation to create person and sign up to ActionNetwork
    try {
      const automationResponse = await fetch(`${baseUrl}/api/freshdesk-automation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticket: {
            id: ticket.id,
            ticket_number: ticket.ticket_number,
            subject: ticket.subject,
            description: message,
            email,
            name: `${firstName} ${lastName}`,
            phone: phoneNumber,
            custom_fields: {
              cf_cf_campaign: 'together-for-treaty',
              cf_cf_first_nations_identifying: firstNationsIdentifying ? 'yes' : 'no',
            },
          },
          ticket_created_at: new Date().toISOString(),
        }),
      });

      if (automationResponse.ok) {
        const automationResult = await automationResponse.json();
        // eslint-disable-next-line no-console
        console.log('Automation triggered successfully:', automationResult);
      } else {
        // eslint-disable-next-line no-console
        console.error('Automation failed:', await automationResponse.text());
      }
    } catch (automationError) {
      // eslint-disable-next-line no-console
      console.error('Failed to trigger automation:', automationError);
    }

    return res.status(200).json({
      success: true,
      message: 'Ticket created successfully',
      ticketId: ticket.id,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    // eslint-disable-next-line no-console
    console.error('Freshdesk integration error:', {
      error: errorMessage,
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
    });
    return res.status(500).json({
      error: 'Server error',
      details: errorMessage,
    });
  }
}
