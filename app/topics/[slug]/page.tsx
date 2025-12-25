import { notFound } from 'next/navigation';
import Link from 'next/link';
import PostCard from '@/components/PostCard';
import pillars from '@/data/pillars.json';
import posts from '@/data/posts.json';

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

  // Filter posts that belong to this pillar
  const topicPosts = posts.filter((post: any) => post.pillarId === pillar.id) as any[];
  const featuredPost = topicPosts.find((post: any) => post.isFeaturedPost) as any;
  const clusterPosts = topicPosts.filter((post: any) => !post.isFeaturedPost) as any[];

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
        {/* Featured Post */}
        {featuredPost && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h2 className="font-heading text-xl font-semibold text-neutral-900">
                Start Here
              </h2>
            </div>
            
            <Link 
              href={`/blog/${featuredPost.slug}`}
              className="group block relative overflow-hidden text-white p-8 lg:p-12 rounded-2xl hover:shadow-2xl transition-all duration-300"
            >
              {/* Background - either featured image or gradient */}
              {featuredPost.featuredImage ? (
                <>
                  <img 
                    src={featuredPost.featuredImage}
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
                <h3 className="font-heading text-2xl lg:text-3xl font-semibold mb-4">
                  {featuredPost.title}
                </h3>
                {featuredPost.excerpt && (
                  <p className="text-white/80 text-lg max-w-2xl mb-6">
                    {featuredPost.excerpt}
                  </p>
                )}
                <span className="inline-flex items-center bg-white text-primary px-6 py-3 rounded-full font-semibold group-hover:shadow-lg transition">
                  Read the guide
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          </section>
        )}

        {/* Related Articles */}
        {clusterPosts.length > 0 && (
          <section>
            <h2 className="font-heading text-2xl font-semibold text-neutral-900 mb-8">
              More in {pillar.name}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {clusterPosts.map((post: any) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        {topicPosts.length === 0 && (
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
