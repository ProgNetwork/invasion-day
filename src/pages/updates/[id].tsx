import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { CalendarIcon, ClockIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { calculateReadTime, extractHeroImage, cleanContent, formatDate } from '@/lib/utils';

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

export default function BlogPostDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/blogger-post?id=${id}`);

      if (!response.ok) {
        throw new Error('Failed to fetch post');
      }

      const data = await response.json();
      setPost(data.post);
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
          <title>Loading... - Together for Treaty</title>
        </Head>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading post...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Head>
          <title>Post Not Found - Together for Treaty</title>
        </Head>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Post Not Found</h1>
            <p className="text-gray-600 mb-8">The post you're looking for doesn't exist or has been removed.</p>
            <Link
              href="/updates"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-200"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Back to Updates
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const heroImage = extractHeroImage(post.content);

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{post.title} - Together for Treaty</title>
        <meta name="description" content={post.excerpt} />
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/updates"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            <ArrowLeftIcon className="h-5 w-4 mr-2" />
            Back to Updates
          </Link>
        </div>

        {/* Hero Image */}
        {heroImage && (
          <div className="mb-8">
            <img
              src={heroImage}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        )}

        {/* Post Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center">
              <CalendarIcon className="h-4 w-4 mr-1" />
              {formatDate(post.published)}
            </div>
            <div className="flex items-center">
              <ClockIcon className="h-4 w-4 mr-1" />
              {calculateReadTime(post.content)} min read
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>
        </div>

        {/* Post Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{
              __html: cleanContent(post.content),
            }}
          />
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <Link
            href="/updates"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-200"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Updates
          </Link>
        </div>
      </div>
    </div>
  );
}
