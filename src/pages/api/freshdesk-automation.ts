import type { NextApiRequest, NextApiResponse } from 'next';

const FRESHDESK_DOMAIN = process.env.FRESHDESK_DOMAIN || '';
const FRESHDESK_API_KEY = process.env.FRESHDESK_API_KEY || '';
const ACTION_NETWORK_API_URL = 'https://actionnetwork.org/api/v2/people';
const ACTION_NETWORK_API_KEY = process.env.ACTION_NETWORK_API_KEY || '';

interface FreshdeskWebhookPayload {
  ticket: {
    id: number;
    ticket_number: string;
    subject: string;
    description: string;
    email: string;
    name: string;
    phone?: string;
    custom_fields?: {
      cf_campaign?: string;
      cf_first_nations_identifying?: string;
    };
  };
  ticket_created_at: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // eslint-disable-next-line no-console
  console.log('Freshdesk automation webhook called:', {
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

  try {
    const webhookData: FreshdeskWebhookPayload = req.body;
    const { ticket } = webhookData;

    // eslint-disable-next-line no-console
    console.log('Webhook data received:', {
      ticketId: ticket.id,
      ticketNumber: ticket.ticket_number,
      subject: ticket.subject,
      email: ticket.email,
      name: ticket.name,
      customFields: ticket.custom_fields,
    });

    // Extract name components
    const nameParts = ticket.name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    if (!firstName || !ticket.email) {
      // eslint-disable-next-line no-console
      console.log('Missing required data for automation:', {
        hasFirstName: !!firstName,
        hasEmail: !!ticket.email,
      });
      return res.status(400).json({
        error: 'Missing required data for automation',
        required: ['firstName', 'email'],
      });
    }

    // Step 1: Create/Update person in Freshdesk
    const personData = {
      name: ticket.name,
      email: ticket.email,
      phone: ticket.phone || '',
      // Add any additional person fields you want to set
      custom_fields: {
        cf_campaign: ticket.custom_fields?.cf_campaign || 'together-for-treaty',
        cf_first_nations_identifying: ticket.custom_fields?.cf_first_nations_identifying || 'no',
      },
    };

    // eslint-disable-next-line no-console
    console.log('Creating/updating person in Freshdesk:', {
      name: personData.name,
      email: personData.email,
      customFields: personData.custom_fields,
    });

    const personResponse = await fetch(`https://${FRESHDESK_DOMAIN}.freshdesk.com/api/v2/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(`${FRESHDESK_API_KEY}:X`).toString('base64')}`,
      },
      body: JSON.stringify(personData),
    });

    let personId: number | null = null;

    if (personResponse.ok) {
      const person = await personResponse.json();
      personId = person.id;
      // eslint-disable-next-line no-console
      console.log('Person created in Freshdesk:', {
        personId: person.id,
        name: person.name,
        email: person.email,
      });
    } else if (personResponse.status === 409) {
      // Person already exists, try to find them by email
      const searchResponse = await fetch(
        `https://${FRESHDESK_DOMAIN}.freshdesk.com/api/v2/contacts?email=${encodeURIComponent(ticket.email)}`,
        {
          headers: {
            Authorization: `Basic ${Buffer.from(`${FRESHDESK_API_KEY}:X`).toString('base64')}`,
          },
        },
      );

      if (searchResponse.ok) {
        const searchResults = await searchResponse.json();
        if (searchResults.length > 0) {
          personId = searchResults[0].id;
          // eslint-disable-next-line no-console
          console.log('Found existing person in Freshdesk:', {
            personId,
            name: searchResults[0].name,
            email: searchResults[0].email,
          });
        }
      }
    }

    // Step 2: Sign up to ActionNetwork
    const actionNetworkPayload = {
      origin_system: 'together-for-treaty',
      given_name: firstName,
      family_name: lastName,
      email_addresses: [{ address: ticket.email }],
      custom_fields: {
        volunteer: 'no', // Default to no for contact form submissions
        first_nations_identifying: ticket.custom_fields?.cf_first_nations_identifying === 'yes' ? 'yes' : 'no',
        source_code: 'freshdesk-contact',
      },
    };

    // eslint-disable-next-line no-console
    console.log('Signing up to ActionNetwork:', {
      givenName: firstName,
      familyName: lastName,
      email: ticket.email,
      customFields: actionNetworkPayload.custom_fields,
    });

    const actionNetworkResponse = await fetch(ACTION_NETWORK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'OSDI-API-Token': ACTION_NETWORK_API_KEY,
      },
      body: JSON.stringify(actionNetworkPayload),
    });

    const actionNetworkData = await actionNetworkResponse.json();

    if (!actionNetworkResponse.ok) {
      // Handle partial update if activist already exists
      if (actionNetworkData && actionNetworkData.errors && actionNetworkData.errors[0]?.title?.includes('already exists')) {
        const patchResponse = await fetch(`${ACTION_NETWORK_API_URL}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'OSDI-API-Token': ACTION_NETWORK_API_KEY,
          },
          body: JSON.stringify(actionNetworkPayload),
        });

        const patchData = await patchResponse.json();

        if (patchResponse.ok) {
          // Try to tag the patched person
          const personId = patchData.identifiers?.find((id: string) => id.includes('action_network:'));
          if (personId) {
            await fetch(`https://actionnetwork.org/api/v2/people/${encodeURIComponent(personId)}/taggings`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'OSDI-API-Token': ACTION_NETWORK_API_KEY,
              },
              body: JSON.stringify({
                add_tags: ['together_for_treaty', 'freshdesk-contact'],
              }),
            });
          }

          // eslint-disable-next-line no-console
          console.log('Updated existing ActionNetwork record and tagged');
        } else {
          // eslint-disable-next-line no-console
          console.error('ActionNetwork patch failed:', patchData);
        }
      } else {
        // eslint-disable-next-line no-console
        console.error('ActionNetwork error:', actionNetworkData);
      }
    } else {
      // Try to tag the new person
      const personId = actionNetworkData.identifiers?.find((id: string) => id.includes('action_network:'));
      if (personId) {
        await fetch(`https://actionnetwork.org/api/v2/people/${encodeURIComponent(personId)}/taggings`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'OSDI-API-Token': ACTION_NETWORK_API_KEY,
          },
          body: JSON.stringify({
            add_tags: ['together_for_treaty', 'freshdesk-contact'],
          }),
        });
      }

      // eslint-disable-next-line no-console
      console.log('Created new ActionNetwork record and tagged');
    }

    // Step 3: Update the ticket with automation notes
    const ticketUpdateData = {
      note: {
        body: `Automation completed: Person ${personId ? `created/updated in Freshdesk (ID: ${personId})` : 'not created in Freshdesk'} and signed up to ActionNetwork.`,
        private: true,
      },
    };

    await fetch(`https://${FRESHDESK_DOMAIN}.freshdesk.com/api/v2/tickets/${ticket.id}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(`${FRESHDESK_API_KEY}:X`).toString('base64')}`,
      },
      body: JSON.stringify(ticketUpdateData),
    });

    // eslint-disable-next-line no-console
    console.log('Automation completed successfully for ticket:', ticket.id);

    return res.status(200).json({
      success: true,
      message: 'Automation completed successfully',
      ticketId: ticket.id,
      personId,
      actionNetworkStatus: actionNetworkResponse.ok ? 'created' : 'updated',
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    // eslint-disable-next-line no-console
    console.error('Freshdesk automation error:', {
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
