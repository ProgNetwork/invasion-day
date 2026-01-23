import { readFileSync } from 'fs';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { join } from 'path';
import ReactMarkdown from 'react-markdown';
import Button from '@/components/ui/Button';

interface DonationsPolicyProps {
  content: string;
}

export default function DonationsPolicy({ content }: DonationsPolicyProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Head>
        <title>Donations Policy - Invasion Day</title>
      </Head>
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Button href="/" variant="outline" size="sm">
            ← Back to Home
          </Button>
        </div>
        <article className="prose prose-lg max-w-none">
          <ReactMarkdown
            components={{
              h1: ({ children }) => <h1 className="text-primary-700 mb-6 text-3xl font-bold">{children}</h1>,
              h2: ({ children }) => <h2 className="text-primary-600 mt-8 mb-4 text-2xl font-semibold">{children}</h2>,
              h3: ({ children }) => <h3 className="mt-6 mb-3 text-xl font-semibold text-gray-500">{children}</h3>,
              p: ({ children }) => <p className="mb-4 leading-relaxed text-gray-700">{children}</p>,
              ul: ({ children }) => <ul className="mb-4 list-inside list-disc space-y-2">{children}</ul>,
              ol: ({ children }) => <ol className="mb-4 list-inside list-decimal space-y-2">{children}</ol>,
              li: ({ children }) => <li className="text-gray-700">{children}</li>,
              strong: ({ children }) => <strong className="text-primary-800 font-semibold">{children}</strong>,
              a: ({ children, href }) => (
                <a href={href} className="text-primary-600 hover:text-primary-800 underline">
                  {children}
                </a>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border border-primary-200 bg-primary-50 p-4 pb-1 md:p-8 md:pb-4 rounded-xl my-6 text-gray-700">
                  {children}
                </blockquote>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps<DonationsPolicyProps> = async () => {
  try {
    const filePath = join(process.cwd(), 'src', 'content', 'donations-policy.md');
    const content = readFileSync(filePath, 'utf8');

    return {
      props: {
        content,
      },
    };
  } catch {
    // Log error for debugging but don't expose it to the client
    return {
      props: {
        content: '# Donations Policy\n\nContent could not be loaded.',
      },
    };
  }
};
