import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { CalendarIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { extractAllImages, cleanContent, formatDate } from '@/lib/utils';
import ImageLightbox from '@/components/ImageLightbox';
import ClickableContent from '@/components/ClickableContent';

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
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const fetchPost = useCallback(async () => {
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
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id, fetchPost]);

  const allImages = extractAllImages(post?.content || '');

  const handleImageClick = useCallback((imageUrl: string) => {
    const imageIndex = allImages.findIndex(img => img === imageUrl);
    if (imageIndex !== -1) {
      setLightboxIndex(imageIndex);
      setLightboxOpen(true);
    }
  }, [allImages]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Head>
          <title>Loading... - Invasion Day</title>
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
          <title>Post Not Found - Invasion Day</title>
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

  // Create a mapping from thumbnail URLs to full-size URLs
  // We need to extract both to create the mapping
  const thumbnailImages = post.content.match(/<img[^>]+src="([^"]+)"/g)?.map(match => {
    const srcMatch = match.match(/src="([^"]+)"/);
    return srcMatch ? srcMatch[1] : '';
  }).filter(Boolean) || [];

  const imageUrlMap: Record<string, string> = {};
  thumbnailImages.forEach((thumbnailUrl, index) => {
    if (allImages[index]) {
      imageUrlMap[thumbnailUrl] = allImages[index];
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{post.title} - Invasion Day</title>
        <meta name="description" content={post.excerpt} />
      </Head>

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

          {/* Combined Post Header and Content */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
              <div className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-1" />
                {formatDate(post.published)}
              </div>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>

            <div className="border-t border-gray-200 pt-6">
              <ClickableContent
                content={cleanContent(post.content)}
                onImageClick={handleImageClick}
                className="prose prose-lg max-w-none"
                imageUrlMap={imageUrlMap}
              />
            </div>
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

          {/* Image Lightbox */}
          {allImages.length > 0 && (
            <ImageLightbox
              images={allImages}
              initialIndex={lightboxIndex}
              isOpen={lightboxOpen}
              onClose={() => setLightboxOpen(false)}
            />
          )}
        </div>
      </section>
    </div>
  );
}
