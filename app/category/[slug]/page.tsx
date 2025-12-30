import { notFound } from 'next/navigation';
import Link from 'next/link';
import TypeBadge from '@/components/TypeBadge';
import ContentCard from '@/components/ContentCard';
import QuickNavBox from '@/components/QuickNavBox';
import BackToSection from '@/components/BackToSection';
import posts from '@/data/posts.json';
import pillars from '@/data/pillars.json';

// Try to import categories (clusters), fallback to empty array
let clusters: { id: string; name: string; slug: string; description: string; pillarId: string }[] = [];
try {
  clusters = require('@/data/categories.json');
} catch {
  clusters = [];
}

// Try to import post content files
async function getPostContent(slug: string): Promise<string> {
  try {
    const contentData = require(`@/data/content/${slug}.json`);
    return contentData.content || '';
  } catch {
    return '';
  }
}

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return clusters.map((cluster: any) => ({
    slug: cluster.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const cluster = clusters.find((c: any) => c.slug === params.slug);
  
  if (!cluster) {
    return { title: 'Cluster Not Found' };
  }

  return {
    title: `${(cluster as any).name} | Resale Edge`,
    description: (cluster as any).description || `Explore ${(cluster as any).name} articles and guides on Resale Edge`,
  };
}

export default async function ClusterPage({ params }: PageProps) {
  const cluster = clusters.find((c: any) => c.slug === params.slug) as any;

  if (!cluster) {
    notFound();
  }

  // Get parent pillar
  const parentPillar = pillars.find((p: any) => p.id === cluster.pillarId) as any;

  // Get all posts for this cluster
  const clusterPosts = posts.filter((post: any) => post.clusterId === cluster.id) as any[];
  
  // Cluster-tier post (the main article for this cluster)
  const clusterPost = clusterPosts.find((post: any) => post.tierType === 'cluster') as any;
  const clusterContent = clusterPost ? await getPostContent(clusterPost.slug) : '';
  
  // Blog-tier posts (supporting articles)
  const blogPosts = clusterPosts.filter((post: any) => post.tierType === 'blog' || (!post.tierType && post.tierType !== 'cluster'));

  // Quick nav items (blog posts as children)
  const quickNavItems = blogPosts.map((post: any) => ({
    title: post.title,
    href: `/blog/${post.slug}`,
  }));

  // Sibling clusters (other clusters under the same pillar)
  const siblingClusters = clusters.filter((c: any) => 
    c.pillarId === cluster.pillarId && c.id !== cluster.id
  ).map((c: any) => {
    const siblingPosts = posts.filter((post: any) => post.clusterId === c.id);
    return { ...c, articleCount: siblingPosts.length };
  });

  // Back navigation links
  const backLinks = [
    ...(parentPillar ? [{ label: parentPillar.name, href: `/topics/${parentPillar.slug}` }] : []),
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav className="flex items-center text-sm text-neutral-500 flex-wrap gap-1" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-primary transition">Home</Link>
          {parentPillar && (
            <>
              <svg className="w-4 h-4 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <Link href={`/topics/${parentPillar.slug}`} className="hover:text-primary transition">
                {parentPillar.name}
              </Link>
            </>
          )}
          <svg className="w-4 h-4 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-neutral-900 font-medium">{cluster.name}</span>
        </nav>
      </div>

      {/* Header */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TypeBadge type="cluster" />
        
        <h1 className="font-heading text-4xl lg:text-5xl font-bold text-neutral-900 mt-4 mb-4">
          {cluster.name}
        </h1>
        
        {cluster.description && (
          <p className="text-lg lg:text-xl text-neutral-600 max-w-3xl">
            {cluster.description}
          </p>
        )}
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* IN THIS GUIDE - Quick Nav Box with blog posts */}
        {quickNavItems.length > 0 && (
          <QuickNavBox items={quickNavItems} />
        )}

        {/* ARTICLE CONTENT - Cluster post content */}
        {clusterPost && clusterContent && (
          <article className="prose prose-lg prose-neutral max-w-none mb-16 prose-headings:font-heading prose-headings:font-semibold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:leading-relaxed prose-p:text-neutral-700 prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
            <div dangerouslySetInnerHTML={{ __html: formatContent(clusterContent) }} />
          </article>
        )}

        {/* ARTICLES IN THIS SECTION - Blog post cards */}
        {blogPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="font-heading text-2xl font-semibold text-neutral-900 mb-8">
              Articles in This Section
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post: any) => (
                <ContentCard
                  key={post.id}
                  title={post.title}
                  slug={post.slug}
                  description={post.excerpt || post.seoDescription}
                  type="blog"
                  format={post.articleFormat}
                  href={`/blog/${post.slug}`}
                />
              ))}
            </div>
          </section>
        )}

        {/* RELATED SECTIONS - Sibling clusters */}
        {siblingClusters.length > 0 && (
          <section className="border-t border-neutral-200 pt-12 mb-8">
            <h2 className="font-heading text-xl font-semibold text-neutral-900 mb-6">
              Related Sections
            </h2>
            <div className="flex flex-wrap gap-4">
              {siblingClusters.map((sibling: any) => (
                <Link
                  key={sibling.id}
                  href={`/category/${sibling.slug}`}
                  className="inline-flex items-center gap-2 text-primary hover:text-secondary transition"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  {sibling.name}
                  {sibling.articleCount > 0 && (
                    <span className="text-neutral-400 text-sm">({sibling.articleCount})</span>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Back navigation */}
      {backLinks.length > 0 && (
        <BackToSection links={backLinks} />
      )}
    </div>
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
