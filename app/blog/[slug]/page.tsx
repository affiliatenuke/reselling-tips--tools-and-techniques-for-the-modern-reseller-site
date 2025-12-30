import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import posts from '@/data/posts.json';
import pillars from '@/data/pillars.json';
import JsonLd from '@/components/JsonLd';
import TypeBadge from '@/components/TypeBadge';
import ContentCard from '@/components/ContentCard';
import BackToSection from '@/components/BackToSection';

// Try to import clusters (categories)
let clusters: { id: string; name: string; slug: string; description: string; pillarId: string }[] = [];
try {
  clusters = require('@/data/categories.json');
} catch {
  clusters = [];
}

const baseUrl = 'https://resaleedge.com';
const siteName = 'Resale Edge';

interface PageProps {
  params: { slug: string };
}

// Helper to load post content from individual file (keeps page size small)
function getPostContent(slug: string): string {
  try {
    const contentPath = path.join(process.cwd(), 'data', 'content', `${slug}.json`);
    const contentData = JSON.parse(fs.readFileSync(contentPath, 'utf-8'));
    return contentData.content || '';
  } catch {
    return '';
  }
}

// Estimate reading time
function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
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
  
  // Load content from individual file instead of posts.json
  const content = getPostContent(params.slug);
  const readingTime = getReadingTime(content);

  // Get parent cluster and pillar
  const cluster = post.clusterId ? clusters.find((c: any) => c.id === post.clusterId) as any : null;
  const pillar = post.pillarId ? pillars.find((p: any) => p.id === post.pillarId) as any : null;

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
  const breadcrumbItems = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
  ];
  let position = 2;
  if (pillar) {
    breadcrumbItems.push({ '@type': 'ListItem', position: position++, name: pillar.name, item: `${baseUrl}/topics/${pillar.slug}` });
  }
  if (cluster) {
    breadcrumbItems.push({ '@type': 'ListItem', position: position++, name: cluster.name, item: `${baseUrl}/category/${cluster.slug}` });
  }
  breadcrumbItems.push({ '@type': 'ListItem', position: position, name: post.title, item: `${baseUrl}/blog/${post.slug}` });

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems,
  };

  // Sibling posts (same cluster)
  const siblingPosts = cluster 
    ? posts.filter((p: any) => p.clusterId === cluster.id && p.id !== post.id && p.tierType === 'blog').slice(0, 6) as any[]
    : [];

  // Back navigation links
  const backLinks = [];
  if (cluster) {
    backLinks.push({ label: cluster.name, href: `/category/${cluster.slug}` });
  }
  if (pillar) {
    backLinks.push({ label: pillar.name, href: `/topics/${pillar.slug}` });
  }

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      
      <article className="min-h-screen bg-white">
        {/* Two-column layout container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            {/* Main Content Column */}
            <div className="lg:col-span-8">
              {/* Breadcrumb */}
              <nav className="flex items-center text-sm text-neutral-500 mb-6 flex-wrap gap-1">
                <Link href="/" className="hover:text-primary transition">Home</Link>
                {pillar && (
                  <>
                    <svg className="w-4 h-4 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <Link href={`/topics/${pillar.slug}`} className="hover:text-primary transition">
                      {pillar.name}
                    </Link>
                  </>
                )}
                {cluster && (
                  <>
                    <svg className="w-4 h-4 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <Link href={`/category/${cluster.slug}`} className="hover:text-primary transition">
                      {cluster.name}
                    </Link>
                  </>
                )}
                <svg className="w-4 h-4 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-neutral-900 truncate max-w-[200px]">{post.title}</span>
              </nav>

              {/* Article format badge and reading time */}
              <div className="flex items-center gap-3 mb-4">
                <TypeBadge type="blog" format={post.articleFormat} />
                <span className="text-sm text-neutral-500">
                  {readingTime} min read
                </span>
              </div>
              
              {/* Title */}
              <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-neutral-900 mb-4 leading-tight">
                {post.title}
              </h1>
              
              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
              )}
              
              {/* Author & Date */}
              <div className="flex items-center gap-3 pb-6 mb-8 border-b border-neutral-100">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold text-sm">
                  {(post.authorName || siteName).charAt(0)}
                </div>
                <div className="text-sm">
                  <div className="font-medium text-neutral-900">
                    {post.authorName || siteName}
                  </div>
                  {post.publishDate && (
                    <time dateTime={post.publishDate} className="text-neutral-500">
                      {new Date(post.publishDate).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </time>
                  )}
                </div>
              </div>

              {/* Featured Image - inline, not hero */}
              {post.featuredImage && (
                <div className="mb-8">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-auto max-h-[400px] object-cover rounded-xl"
                  />
                </div>
              )}

              {/* Article Content */}
              <div 
                className="prose prose-lg prose-neutral max-w-none prose-headings:font-heading prose-headings:font-semibold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:leading-relaxed prose-p:text-neutral-700 prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: formatContent(content) }}
              />

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-10 pt-6 border-t border-neutral-100">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 bg-neutral-100 text-neutral-600 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Author Box */}
              <div className="mt-10 p-6 bg-neutral-50 rounded-xl border border-neutral-100">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
                    {(post.authorName || siteName).charAt(0)}
                  </div>
                  <div>
                    <div className="font-heading font-semibold text-neutral-900 mb-1">
                      {post.authorName || siteName}
                    </div>
                    <p className="text-neutral-600 text-sm leading-relaxed">
                      Expert contributor providing in-depth analysis and practical advice to help you make informed decisions.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Column */}
            <aside className="lg:col-span-4 mt-12 lg:mt-0">
              <div className="lg:sticky lg:top-24 space-y-8">
                {/* Topic/Pillar Link */}
                {pillar && (
                  <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-6 border border-primary/10">
                    <h3 className="font-heading font-semibold text-neutral-900 mb-2">
                      Explore {pillar.name}
                    </h3>
                    <p className="text-sm text-neutral-600 mb-4">
                      {pillar.description || `Discover more articles about ${pillar.name.toLowerCase()}.`}
                    </p>
                    <Link 
                      href={`/topics/${pillar.slug}`}
                      className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                    >
                      View all articles
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                )}

                {/* Cluster Link */}
                {cluster && (
                  <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-100">
                    <h3 className="font-heading font-semibold text-neutral-900 mb-2">
                      More in {cluster.name}
                    </h3>
                    <p className="text-sm text-neutral-600 mb-4">
                      {cluster.description || `See all ${cluster.name.toLowerCase()} articles.`}
                    </p>
                    <Link 
                      href={`/category/${cluster.slug}`}
                      className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                    >
                      View section
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>

        {/* Sibling Articles - Articles in the same section */}
        {siblingPosts.length > 0 && (
          <section className="bg-neutral-50 border-t border-neutral-100 py-12 lg:py-16 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-heading text-2xl font-semibold text-neutral-900 mb-8">
                More in This Section
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {siblingPosts.map((siblingPost: any) => (
                  <ContentCard
                    key={siblingPost.id}
                    title={siblingPost.title}
                    slug={siblingPost.slug}
                    description={siblingPost.excerpt || siblingPost.seoDescription}
                    type="blog"
                    format={siblingPost.articleFormat}
                    href={`/blog/${siblingPost.slug}`}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Back navigation */}
        {backLinks.length > 0 && (
          <BackToSection links={backLinks} />
        )}
      </article>
    </>
  );
}

function formatContent(content: string): string {
  return content
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:underline">$1</a>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(.+)$/gm, '<p>$1</p>')
    .replace(/<p><h/g, '<h')
    .replace(/<\/h([23])><\/p>/g, '</h$1>');
}
