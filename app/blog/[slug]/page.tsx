import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import posts from '@/data/posts.json';
import pillars from '@/data/pillars.json';
import JsonLd from '@/components/JsonLd';
import PostCard from '@/components/PostCard';

const baseUrl = 'https://resaleedge.com';
const siteName = 'Resale Edge';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return posts.map((post: any) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = posts.find((p: any) => p.slug === params.slug) as any;
  
  if (!post) {
    return { title: 'Post Not Found' };
  }

  const description = post.metaDescription || post.excerpt || post.title;
  const postUrl = `${baseUrl}/blog/${post.slug}`;

  return {
    title: post.title,
    description: description,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      type: 'article',
      title: post.title,
      description: description,
      url: postUrl,
      siteName: siteName,
      publishedTime: post.publishDate || new Date().toISOString(),
      authors: post.authorName ? [post.authorName] : [siteName],
      images: post.featuredImage ? [
        {
          url: post.featuredImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: description,
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  };
}

export default function BlogPost({ params }: PageProps) {
  const post = posts.find((p: any) => p.slug === params.slug) as any;

  if (!post) {
    notFound();
  }

  // Article structured data
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || post.title,
    author: {
      '@type': 'Person',
      name: post.authorName || siteName,
    },
    publisher: {
      '@type': 'Organization',
      name: siteName,
      url: baseUrl,
    },
    datePublished: post.publishDate || new Date().toISOString(),
    dateModified: post.publishDate || new Date().toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${post.slug}`,
    },
    ...(post.featuredImage && {
      image: {
        '@type': 'ImageObject',
        url: post.featuredImage,
      },
    }),
  };

  // Breadcrumb structured data
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${baseUrl}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${baseUrl}/blog/${post.slug}`,
      },
    ],
  };

  // Get related posts from same pillar
  const pillar = post.pillarId ? pillars.find((p: any) => p.id === post.pillarId) as any : null;
  const relatedPosts = pillar 
    ? posts.filter((p: any) => p.pillarId === post.pillarId && p.id !== post.id).slice(0, 3) as any[]
    : posts.filter((p: any) => p.id !== post.id).slice(0, 3) as any[];

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      
      <article className="min-h-screen">
        {/* Hero Header */}
        <header className="bg-gradient-to-br from-neutral-50 to-white border-b border-neutral-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            {/* Breadcrumb */}
            <nav className="flex items-center text-sm text-neutral-500 mb-8">
              <Link href="/" className="hover:text-primary transition">Home</Link>
              <svg className="w-4 h-4 mx-2 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              {pillar && (
                <>
                  <Link href={`/topics/${pillar.slug}`} className="hover:text-primary transition">
                    {pillar.name}
                  </Link>
                  <svg className="w-4 h-4 mx-2 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </>
              )}
              <span className="text-neutral-900 truncate max-w-[200px]">{post.title}</span>
            </nav>

            {/* Meta badges */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {post.isFeaturedPost && (
                <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
                  Complete Guide
                </span>
              )}
              {post.category && (
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                  {post.category}
                </span>
              )}
            </div>
            
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-neutral-900 mb-6 text-balance">
              {post.title}
            </h1>
            
            {post.excerpt && (
              <p className="text-lg lg:text-xl text-neutral-600 mb-8 max-w-3xl">
                {post.excerpt}
              </p>
            )}
            
            {/* Author & Date */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold text-lg">
                {(post.authorName || siteName).charAt(0)}
              </div>
              <div>
                <div className="font-medium text-neutral-900">
                  {post.authorName || siteName}
                </div>
                <div className="text-sm text-neutral-500 flex items-center gap-3">
                  {post.publishDate && (
                    <time dateTime={post.publishDate}>
                      {new Date(post.publishDate).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </time>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 mb-12">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-64 md:h-[400px] lg:h-[500px] object-cover rounded-2xl shadow-soft"
            />
          </div>
        )}

        {/* Content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-neutral-200">
              <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-4">Topics</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-neutral-100 text-neutral-700 rounded-full text-sm hover:bg-neutral-200 transition"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Author Box */}
          <div className="mt-12 p-6 lg:p-8 bg-neutral-50 rounded-2xl border border-neutral-100">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold text-xl flex-shrink-0">
                {(post.authorName || siteName).charAt(0)}
              </div>
              <div>
                <div className="font-heading text-lg font-semibold text-neutral-900 mb-1">
                  {post.authorName || siteName}
                </div>
                <p className="text-neutral-600 text-sm">
                  Expert contributor providing in-depth analysis and practical advice to help you make informed decisions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="bg-neutral-50 border-t border-neutral-100 py-16 lg:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-neutral-900 mb-8">
                Related Articles
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost: any) => (
                  <PostCard key={relatedPost.id} post={relatedPost} />
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </>
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
