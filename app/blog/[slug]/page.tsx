import { notFound } from 'next/navigation';
import Link from 'next/link';
import posts from '@/data/posts.json';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return posts.map((post: any) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const post = posts.find((p: any) => p.slug === params.slug);
  
  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: `${(post as any).title} | Reselling Tips, Tools and Techniques For The Modern Reseller`,
    description: (post as any).metaDescription || (post as any).excerpt,
  };
}

export default function BlogPost({ params }: PageProps) {
  const post = posts.find((p: any) => p.slug === params.slug) as any;

  if (!post) {
    notFound();
  }

  return (
    <article className="py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <Link 
            href="/blog" 
            className="text-primary hover:underline mb-4 inline-block"
          >
            &larr; Back to Blog
          </Link>
          
          {post.category && (
            <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4 ml-4">
              {post.category}
            </span>
          )}
          
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            {post.title}
          </h1>
          
          {post.excerpt && (
            <p className="text-xl text-gray-600 mb-4">
              {post.excerpt}
            </p>
          )}
          
          <div className="flex items-center gap-4 text-sm text-gray-500">
            {post.authorName && <span>By {post.authorName}</span>}
            {post.publishDate && (
              <span>{new Date(post.publishDate).toLocaleDateString()}</span>
            )}
          </div>
        </header>

        {/* Featured Image */}
        {post.featuredImage && (
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-xl mb-8"
          />
        )}

        {/* Content */}
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
        />

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t">
            <h3 className="font-semibold mb-4">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

function formatContent(content: string): string {
  // Simple markdown-like formatting
  return content
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(.+)$/gm, '<p>$1</p>')
    .replace(/<p><h/g, '<h')
    .replace(/<\/h([23])><\/p>/g, '</h$1>');
}
