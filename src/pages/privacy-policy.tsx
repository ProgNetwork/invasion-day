import { readFileSync } from 'fs'
import { GetStaticProps } from 'next'
import { join } from 'path'
import ReactMarkdown from 'react-markdown'

interface PrivacyPolicyProps {
  content: string
}

export default function PrivacyPolicy({ content }: PrivacyPolicyProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="prose prose-lg max-w-none">
          <ReactMarkdown 
            components={{
              h1: ({children}) => <h1 className="text-3xl font-bold text-primary-700 mb-6">{children}</h1>,
              h2: ({children}) => <h2 className="text-2xl font-semibold text-primary-600 mt-8 mb-4">{children}</h2>,
              h3: ({children}) => <h3 className="text-xl font-semibold text-gray-500 mt-6 mb-3">{children}</h3>,
              p: ({children}) => <p className="text-gray-700 mb-4 leading-relaxed">{children}</p>,
              ul: ({children}) => <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>,
              ol: ({children}) => <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>,
              li: ({children}) => <li className="text-gray-700">{children}</li>,
              strong: ({children}) => <strong className="font-semibold text-primary-800">{children}</strong>,
              a: ({children, href}) => <a href={href} className="text-primary-600 hover:text-primary-800 underline">{children}</a>,
            }}
          >
            {content}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps<PrivacyPolicyProps> = async () => {
  try {
    const filePath = join(process.cwd(), 'src', 'content', 'privacy-policy.md')
    const content = readFileSync(filePath, 'utf8')
    
    return {
      props: {
        content,
      },
    }
  } catch (error) {
    console.error('Error reading privacy policy markdown file:', error)
    return {
      props: {
        content: '# Privacy Policy\n\nContent could not be loaded.',
      },
    }
  }
}
