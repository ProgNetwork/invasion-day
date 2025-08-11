import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Only allow in development or with a secret key for security
  if (process.env.NODE_ENV === 'production' && req.headers.authorization !== `Bearer ${process.env.DEBUG_SECRET}`) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const envVars = {
    NODE_ENV: process.env.NODE_ENV,
    BLOGGER_BLOG_ID: process.env.BLOGGER_BLOG_ID ? 'SET' : 'NOT SET',
    BLOGGER_API_KEY: process.env.BLOGGER_API_KEY ? 'SET' : 'NOT SET',
    // Check if the values are actually there (without exposing the full API key)
    BLOGGER_BLOG_ID_VALUE: process.env.BLOGGER_BLOG_ID,
    BLOGGER_API_KEY_PREFIX: process.env.BLOGGER_API_KEY ? process.env.BLOGGER_API_KEY.substring(0, 10) + '...' : 'NOT SET',
  };

  res.status(200).json(envVars);
}
