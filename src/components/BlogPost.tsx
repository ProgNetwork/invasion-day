import Link from 'next/link';
import Image from 'next/image'; // Import Image component
import { CalendarIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { extractHeroImage, formatDate } from '@/lib/utils';

interface BlogPostProps {
  post: {
    id: string;
    title: string;
    content: string;
    published: string;
    updated: string;
    url: string;
    author: string;
    excerpt: string;
  };
}

export default function BlogPost({ post }: BlogPostProps) {
  const heroImage = extractHeroImage(post.content);

  return (
    <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Hero Image */}
      {heroImage && (
        <div className="aspect-video overflow-hidden">
          <Image
            src={heroImage}
            alt={post.title}
            fill // Use fill prop for automatic sizing
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <CalendarIcon className="h-4 w-4 mr-1" />
              {formatDate(post.published)}
            </div>
          </div>
          <Link
            href={`/updates/${post.id}`}
            className="flex items-center text-primary-600 hover:text-primary-700 text-sm font-medium"
          >
            Read Full Post
            <ArrowRightIcon className="h-4 w-4 ml-1" />
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-primary-600 transition-colors duration-200">
          <Link href={`/updates/${post.id}`}>
            {post.title}
          </Link>
        </h2>

        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 leading-relaxed">
            {post.excerpt}
          </p>
        </div>
      </div>
    </article>
  );
}
