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
      },
      tags: [
        {
          name: 'together_for_treaty',
        },
      ],
    };

    const response = await fetch(ACTION_NETWORK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'OSDI-API-Token': API_KEY,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();

      // a. Handle partial update if activist already exists
      if (errorData && errorData.errors && errorData.errors[0]?.title?.includes('already exists')) {
        const patchResponse = await fetch(`${ACTION_NETWORK_API_URL}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'OSDI-API-Token': API_KEY,
          },
          body: JSON.stringify(payload),
        });

        if (patchResponse.ok) {
          console.log('Patched existing record:', {
            givenName,
            familyName,
            email,
            postcode,
            volunteer,
            tags: ['together_for_treaty'],
          });
          return res.status(200).json({ success: true, message: 'Updated existing record' });
        } else {
          const patchError = await patchResponse.json();
          return res.status(400).json({ error: 'Patch failed', details: patchError });
        }
      }

      return res.status(400).json({ error: 'Action Network error', details: errorData });
    }

    // b. Log the signup locally (mock example)
    console.log('Signup stored locally:', {
      name: `${givenName} ${familyName}`,
      email,
      postcode,
      volunteer,
      tags: ['together_for_treaty'],
    });

    return res.status(200).json({ success: true, message: 'New record created' });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Server error', details: error });
  }
}
