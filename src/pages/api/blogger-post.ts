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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'Post ID is required' });
  }

  try {
    const BLOG_ID = process.env.BLOGGER_BLOG_ID;
    const API_KEY = process.env.BLOGGER_API_KEY;

    if (!BLOG_ID || !API_KEY) {
      return res.status(500).json({
        message: 'Blogger API credentials not configured',
        error: 'Missing BLOGGER_BLOG_ID or BLOGGER_API_KEY environment variables',
      });
    }

    const url = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts/${id}?key=${API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        return res.status(404).json({ message: 'Post not found' });
      }
      throw new Error(`Blogger API responded with status: ${response.status}`);
    }

    const data: BloggerPost = await response.json();

    // Check if the post has the 'togetherfortreaty' label
    if (!data.labels || !data.labels.includes('togetherfortreaty')) {
      return res.status(404).json({ message: 'Post not found or does not have required label' });
    }

    // Transform the data to a cleaner format
    const post = {
      id: data.id,
      title: data.title,
      content: data.content,
      published: data.published,
      updated: data.updated,
      url: data.url,
      author: data.author.displayName,
      excerpt: extractExcerpt(data.content),
    };

    res.status(200).json({ post });
  } catch (error) {
    console.error('Error fetching Blogger post:', error);
    res.status(500).json({
      message: 'Failed to fetch post',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
