import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import BlogPost from '@/components/BlogPost';
import PageHeader from '@/components/PageHeader';

interface Post {
  id: string;
  title: string;
  content: string;
  published: string;
  updated: string;
  url: string;
  author: string;
  excerpt: string;
}

export default function Updates() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/blogger-posts');

      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }

      const data = await response.json();
      setPosts(data.posts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Head>
          <title>Updates - Invasion Day</title>
          <meta name="description" content="Latest updates and news from Invasion Day" />
        </Head>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading updates...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Head>
          <title>Updates - Invasion Day</title>
          <meta name="description" content="Latest updates and news from Invasion Day" />
        </Head>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Updates</h1>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <p className="text-red-800">Error loading updates: {error}</p>
              <button
                onClick={fetchPosts}
                className="mt-4 bg-primary-600 text-white px-4 py-3 rounded hover:bg-primary-700"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Updates - Invasion Day</title>
        <meta name="description" content="Latest updates and news from Invasion Day" />
      </Head>

      <PageHeader title="Updates" image="/images/rock-texture.jpg">
        <p>
          Stay informed with the latest news, events, and updates from the Invasion Day movement.
        </p>
      </PageHeader>

      <section className="bg-gray-50 py-16 sm:py-24 relative overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/images/shapes-texture.png"
            alt=""
            fill
            className="object-cover"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No updates available</h3>
              <p className="text-gray-600">Check back soon for the latest news and updates.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogPost key={post.id} post={post} />
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-200"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
