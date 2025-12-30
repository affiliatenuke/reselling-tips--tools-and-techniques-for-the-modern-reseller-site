import { notFound } from 'next/navigation';
import Link from 'next/link';
import TypeBadge from '@/components/TypeBadge';
import ContentCard from '@/components/ContentCard';
import QuickNavBox from '@/components/QuickNavBox';
import pillars from '@/data/pillars.json';
import posts from '@/data/posts.json';

// Try to import clusters (categories), fallback to empty array
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
  return pillars.map((pillar: any) => ({
    slug: pillar.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const pillar = pillars.find((p: any) => p.slug === params.slug);
  
  if (!pillar) {
    return { title: 'Topic Not Found' };
  }

  return {
    title: `${(pillar as any).seoTitle || (pillar as any).name} | Resale Edge`,
    description: (pillar as any).seoDescription || (pillar as any).description,
  };
}

export default async function TopicPage({ params }: PageProps) {
  const pillar = pillars.find((p: any) => p.slug === params.slug) as any;

  if (!pillar) {
    notFound();
  }

  // Get all posts for this pillar
  const allPillarPosts = posts.filter((post: any) => post.pillarId === pillar.id) as any[];
  
  // Pillar-tier post (the main comprehensive article for this pillar)
  const pillarPost = allPillarPosts.find((post: any) => post.tierType === 'pillar') as any;
  const pillarContent = pillarPost ? await getPostContent(pillarPost.slug) : '';
  
  // Get clusters for this pillar with their article counts
  const pillarClusters = clusters.filter((c: any) => c.pillarId === pillar.id).map((cluster: any) => {
    const clusterPosts = allPillarPosts.filter((post: any) => post.clusterId === cluster.id);
    return {
      ...cluster,
      articleCount: clusterPosts.length,
    };
  });
  
  // Other pillars for "Related Guides" section
  const otherPillars = pillars.filter((p: any) => p.id !== pillar.id).slice(0, 4) as any[];

  // Quick nav items (clusters as children)
  const quickNavItems = pillarClusters.map((cluster: any) => ({
    title: cluster.name,
    href: `/category/${cluster.slug}`,
  }));

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav className="flex items-center text-sm text-neutral-500" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-primary transition">Home</Link>
        </nav>
      </div>

      {/* Header */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TypeBadge type="pillar" />
        
        <h1 className="font-heading text-4xl lg:text-5xl font-bold text-neutral-900 mt-4 mb-4">
          {pillar.name}
        </h1>
        
        {pillar.description && (
          <p className="text-lg lg:text-xl text-neutral-600 max-w-3xl">
            {pillar.description}
          </p>
        )}
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* IN THIS GUIDE - Quick Nav Box */}
        {quickNavItems.length > 0 && (
          <QuickNavBox items={quickNavItems} />
        )}

        {/* ARTICLE CONTENT - Pillar post content */}
        {pillarPost && pillarContent && (
          <article className="prose prose-lg prose-neutral max-w-none mb-16 prose-headings:font-heading prose-headings:font-semibold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:leading-relaxed prose-p:text-neutral-700 prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
            <div dangerouslySetInnerHTML={{ __html: formatContent(pillarContent) }} />
          </article>
        )}

        {/* EXPLORE THIS GUIDE - Cluster cards grid */}
        {pillarClusters.length > 0 && (
          <section className="mb-16">
            <h2 className="font-heading text-2xl font-semibold text-neutral-900 mb-8">
              Explore This Guide
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pillarClusters.map((cluster: any) => (
                <ContentCard
                  key={cluster.id}
                  title={cluster.name}
                  slug={cluster.slug}
                  description={cluster.description}
                  type="cluster"
                  articleCount={cluster.articleCount}
                  href={`/category/${cluster.slug}`}
                />
              ))}
            </div>
          </section>
        )}

        {/* RELATED GUIDES - Other pillars */}
        {otherPillars.length > 0 && (
          <section className="border-t border-neutral-200 pt-12">
            <h2 className="font-heading text-xl font-semibold text-neutral-900 mb-6">
              Related Guides
            </h2>
            <div className="flex flex-wrap gap-4">
              {otherPillars.map((otherPillar: any) => (
                <Link
                  key={otherPillar.id}
                  href={`/topics/${otherPillar.slug}`}
                  className="inline-flex items-center gap-2 text-primary hover:text-secondary transition"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  {otherPillar.name}
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
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
