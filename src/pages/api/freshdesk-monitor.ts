import type { NextApiRequest, NextApiResponse } from 'next';

// In-memory storage for demo purposes
// In production, use a database or external service
let requestLogs: Array<{
  timestamp: string;
  requestId: string;
  status: string;
  error?: string;
  ticketId?: string;
}> = [];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Return recent logs
    return res.status(200).json({
      logs: requestLogs.slice(-50), // Last 50 requests
      total: requestLogs.length,
    });
  }

  if (req.method === 'POST') {
    // Add a log entry (called from freshdesk-contact.ts)
    const { requestId, status, error, ticketId } = req.body;

    requestLogs.push({
      timestamp: new Date().toISOString(),
      requestId,
      status,
      error,
      ticketId,
    });

    // Keep only last 1000 entries
    if (requestLogs.length > 1000) {
      requestLogs = requestLogs.slice(-1000);
    }

    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
