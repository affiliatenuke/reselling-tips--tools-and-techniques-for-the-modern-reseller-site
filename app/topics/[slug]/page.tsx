import { notFound } from 'next/navigation';
import Link from 'next/link';
import PostCard from '@/components/PostCard';
import pillars from '@/data/pillars.json';
import posts from '@/data/posts.json';

// Try to import clusters (categories), fallback to empty array
let clusters: { id: string; name: string; slug: string; description: string; pillarId: string }[] = [];
try {
  clusters = require('@/data/categories.json');
} catch {
  clusters = [];
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

export default function TopicPage({ params }: PageProps) {
  const pillar = pillars.find((p: any) => p.slug === params.slug) as any;

  if (!pillar) {
    notFound();
  }

  // Get all posts for this pillar
  const allPillarPosts = posts.filter((post: any) => post.pillarId === pillar.id) as any[];
  
  // 3-Tier Content Structure:
  // Tier 1: Pillar-tier post (comprehensive guide for this pillar)
  const pillarPost = allPillarPosts.find((post: any) => post.tierType === 'pillar') as any;
  
  // Tier 2 & 3: Get clusters for this pillar and their posts
  const pillarClusters = clusters.filter((c: any) => c.pillarId === pillar.id);
  
  // Build cluster sections with their posts
  const clusterSections = pillarClusters.map((cluster: any) => {
    const clusterPosts = allPillarPosts.filter((post: any) => post.clusterId === cluster.id);
    // Cluster-tier post (main article for this cluster)
    const clusterPost = clusterPosts.find((post: any) => post.tierType === 'cluster') as any;
    // Blog-tier posts (supporting articles)
    const blogPosts = clusterPosts.filter((post: any) => post.tierType === 'blog' || (!post.tierType && post.tierType !== 'cluster'));
    
    return {
      cluster,
      clusterPost,
      blogPosts,
    };
  }).filter(section => section.clusterPost || section.blogPosts.length > 0);
  
  // Fallback: posts without tierType (legacy) or uncategorized
  const legacyPosts = allPillarPosts.filter((post: any) => 
    !post.tierType && !post.clusterId
  );

  const hasContent = pillarPost || clusterSections.length > 0 || legacyPosts.length > 0;

  return (
    <div className="min-h-screen">
      {/* Header with optional hero image */}
      {pillar.heroImage ? (
        <div className="relative">
          {/* Hero image background */}
          <div className="absolute inset-0">
            <img 
              src={pillar.heroImage} 
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/75 via-neutral-900/55 to-neutral-900/40" />
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
            {/* Breadcrumb - upper right */}
            <nav className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8 flex items-center text-sm text-white/70">
              <Link href="/" className="hover:text-white transition">Home</Link>
              <svg className="w-4 h-4 mx-2 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-white font-medium">{pillar.name}</span>
            </nav>
            
            <div className="max-w-3xl mx-auto text-center pt-8">
              <h1 className="font-heading text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6">
                {pillar.name}
              </h1>
              
              {pillar.description && (
                <p className="text-lg lg:text-xl text-white/90 max-w-2xl mx-auto">
                  {pillar.description}
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="relative bg-gradient-to-br from-neutral-50 to-white border-b border-neutral-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
            {/* Breadcrumb - upper right */}
            <nav className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center text-sm text-neutral-500">
              <Link href="/" className="hover:text-primary transition">Home</Link>
              <svg className="w-4 h-4 mx-2 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-neutral-900 font-medium">{pillar.name}</span>
            </nav>
            
            <div className="max-w-3xl mx-auto text-center pt-8">
              <h1 className="font-heading text-4xl lg:text-5xl font-semibold text-neutral-900 mb-4">
                {pillar.name}
              </h1>
              
              {pillar.description && (
                <p className="text-lg lg:text-xl text-neutral-600 max-w-2xl mx-auto">
                  {pillar.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* TIER 1: Pillar Post - The comprehensive guide */}
        {pillarPost && (
          <section className="mb-16">
            <Link 
              href={`/blog/${pillarPost.slug}`}
              className="group block relative overflow-hidden text-white p-8 lg:p-12 rounded-2xl hover:shadow-2xl transition-all duration-300"
            >
              {/* Background - either featured image or gradient */}
              {pillarPost.featuredImage ? (
                <>
                  <img 
                    src={pillarPost.featuredImage}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/80 via-neutral-900/60 to-neutral-900/40" />
                </>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-secondary">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                  </div>
                </div>
              )}
              
              <div className="relative">
                <span className="inline-block px-3 py-1 bg-white/20 text-white text-sm font-medium rounded-full mb-4">
                  Complete Guide
                </span>
                <h2 className="font-heading text-2xl lg:text-3xl font-semibold mb-4">
                  {pillarPost.title}
                </h2>
                {pillarPost.excerpt && (
                  <p className="text-white/80 text-lg max-w-2xl mb-6">
                    {pillarPost.excerpt}
                  </p>
                )}
                <span className="inline-flex items-center bg-white text-primary px-6 py-3 rounded-full font-semibold group-hover:shadow-lg transition">
                  Read the complete guide
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          </section>
        )}

        {/* TIER 2 & 3: Cluster Sections with their posts */}
        {clusterSections.length > 0 && (
          <div className="space-y-16">
            {clusterSections.map((section: any) => (
              <section key={section.cluster.id} className="border-t border-neutral-200 pt-12 first:border-t-0 first:pt-0">
                {/* Cluster Header */}
                <div className="mb-8">
                  <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-neutral-900 mb-2">
                    {section.cluster.name}
                  </h2>
                  {section.cluster.description && (
                    <p className="text-neutral-600 text-lg max-w-3xl">
                      {section.cluster.description}
                    </p>
                  )}
                </div>

                {/* Cluster-tier post (Tier 2) - Featured article for this cluster */}
                {section.clusterPost && (
                  <Link 
                    href={`/blog/${section.clusterPost.slug}`}
                    className="group block mb-8 p-6 bg-neutral-50 border border-neutral-200 rounded-xl hover:bg-neutral-100 hover:border-neutral-300 transition-all"
                  >
                    <div className="flex flex-col lg:flex-row gap-6">
                      {section.clusterPost.featuredImage && (
                        <div className="lg:w-1/3 flex-shrink-0">
                          <img 
                            src={section.clusterPost.featuredImage}
                            alt=""
                            className="w-full h-48 lg:h-full object-cover rounded-lg"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <span className="inline-block px-2.5 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-3">
                          In-Depth Guide
                        </span>
                        <h3 className="font-heading text-xl lg:text-2xl font-semibold text-neutral-900 mb-3 group-hover:text-primary transition">
                          {section.clusterPost.title}
                        </h3>
                        {section.clusterPost.excerpt && (
                          <p className="text-neutral-600 mb-4 line-clamp-2">
                            {section.clusterPost.excerpt}
                          </p>
                        )}
                        <span className="inline-flex items-center text-primary font-medium text-sm">
                          Read article
                          <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                )}

                {/* Blog-tier posts (Tier 3) - Supporting articles */}
                {section.blogPosts.length > 0 && (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {section.blogPosts.map((post: any) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>
        )}

        {/* Legacy posts without cluster assignment */}
        {legacyPosts.length > 0 && clusterSections.length === 0 && !pillarPost && (
          <section>
            <h2 className="font-heading text-2xl font-semibold text-neutral-900 mb-8">
              Articles
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {legacyPosts.map((post: any) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        {!hasContent && (
          <div className="text-center py-16 bg-neutral-50 rounded-2xl border border-neutral-100">
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <p className="text-neutral-500">
              No articles in this topic yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
