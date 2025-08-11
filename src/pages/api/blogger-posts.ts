import { NextApiRequest, NextApiResponse } from 'next';
import { extractExcerpt } from '@/lib/utils';

interface BloggerPost {
  id: string;
  title: string;
  content: string;
  published: string;
  updated: string;
  url: string;
  labels?: string[];
  author: {
    displayName: string;
  };
}

interface BloggerResponse {
  items: BloggerPost[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // You'll need to replace these with your actual Blogger API credentials
    const BLOG_ID = process.env.BLOGGER_BLOG_ID;
    const API_KEY = process.env.BLOGGER_API_KEY;

    if (!BLOG_ID || !API_KEY) {
      return res.status(500).json({
        message: 'Blogger API credentials not configured',
        error: 'Missing BLOGGER_BLOG_ID or BLOGGER_API_KEY environment variables',
      });
    }

    const url = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}&maxResults=10&orderBy=published&labels=togetherfortreaty`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Blogger API responded with status: ${response.status}`);
    }

    const data: BloggerResponse = await response.json();

    // Transform the data to a cleaner format
    const posts = data.items.map(post => ({
      id: post.id,
      title: post.title,
      content: post.content,
      published: post.published,
      updated: post.updated,
      url: post.url,
      author: post.author.displayName,
      // Extract a short excerpt from the content
      excerpt: extractExcerpt(post.content),
    }));

    res.status(200).json({ posts });
  } catch (error) {
    console.error('Error fetching Blogger posts:', error);
    res.status(500).json({
      message: 'Failed to fetch posts',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
