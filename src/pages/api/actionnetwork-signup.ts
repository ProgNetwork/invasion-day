// File: src/pages/api/actionnetwork-signup.ts
import type { NextApiRequest, NextApiResponse } from 'next';

const ACTION_NETWORK_API_URL = 'https://actionnetwork.org/api/v2/people';
const API_KEY = process.env.ACTION_NETWORK_API_KEY!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const {
    givenName,
    familyName,
    email,
    postcode,
    atsi,
    volunteer,
  } = req.body;

  try {
    const payload = {
      origin_system: 'together-for-treaty',
      given_name: givenName,
      family_name: familyName,
      email_addresses: [{ address: email }],
      postal_addresses: [{ postal_code: postcode }],
      custom_fields: {
        volunteer: volunteer ? 'yes' : 'no',
        atsi: atsi ? 'yes' : 'no',
      },
    };

    const response = await fetch(ACTION_NETWORK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'OSDI-API-Token': API_KEY,
      },
      body: JSON.stringify(payload),
    });

    const responseData = await response.json();

    if (!response.ok) {
      // a. Handle partial update if activist already exists
      if (responseData && responseData.errors && responseData.errors[0]?.title?.includes('already exists')) {
        const patchResponse = await fetch(`${ACTION_NETWORK_API_URL}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'OSDI-API-Token': API_KEY,
          },
          body: JSON.stringify(payload),
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
                'OSDI-API-Token': API_KEY,
              },
              body: JSON.stringify({ add_tags: ['together_for_treaty'] }),
            });
          }

          console.log('Patched existing record and applied tag:', {
            givenName,
            familyName,
            email,
            postcode,
            volunteer,
            tag: 'together_for_treaty',
          });
          return res.status(200).json({ success: true, message: 'Updated existing record and tagged' });
        } else {
          return res.status(400).json({ error: 'Patch failed', details: patchData });
        }
      }

      return res.status(400).json({ error: 'Action Network error', details: responseData });
    }

    // Try to tag the new person
    const personId = responseData.identifiers?.find((id: string) => id.includes('action_network:'));
    if (personId) {
      await fetch(`https://actionnetwork.org/api/v2/people/${encodeURIComponent(personId)}/taggings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'OSDI-API-Token': API_KEY,
        },
        body: JSON.stringify({ add_tags: ['together_for_treaty'] }),
      });
    }

    // b. Log the signup locally (mock example)
    console.log('Signup stored locally:', {
      name: `${givenName} ${familyName}`,
      email,
      postcode,
      volunteer,
      tag: 'together_for_treaty',
    });

    return res.status(200).json({ success: true, message: 'New record created and tagged' });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Server error', details: error });
  }
}
