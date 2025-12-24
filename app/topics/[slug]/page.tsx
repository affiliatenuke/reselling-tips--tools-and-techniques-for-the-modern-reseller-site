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
  const pillarPosts = posts.filter((post: any) => post.pillarId === pillar.id) as any[];
  const pillarPost = pillarPosts.find((post: any) => post.isPillarPost) as any;
  const clusterPosts = pillarPosts.filter((post: any) => !post.isPillarPost) as any[];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-neutral-50 to-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          {/* Breadcrumb */}
          <nav className="flex items-center text-sm text-neutral-500 mb-8">
            <Link href="/" className="hover:text-primary transition">Home</Link>
            <svg className="w-4 h-4 mx-2 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-neutral-900 font-medium">{pillar.name}</span>
          </nav>
          
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span className="px-3 py-1 bg-neutral-100 text-neutral-600 text-sm font-medium rounded-full">
                {pillarPosts.length} article{pillarPosts.length !== 1 ? 's' : ''}
              </span>
            </div>
            
            <h1 className="font-heading text-4xl lg:text-5xl font-semibold text-neutral-900 mb-4">
              {pillar.name}
            </h1>
            
            {pillar.description && (
              <p className="text-lg lg:text-xl text-neutral-600">
                {pillar.description}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Featured Pillar Post */}
        {pillarPost && (
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
              href={`/blog/${pillarPost.slug}`}
              className="group block relative overflow-hidden bg-gradient-to-br from-primary via-primary to-secondary text-white p-8 lg:p-12 rounded-2xl hover:shadow-2xl transition-all duration-300"
            >
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              </div>
              
              <div className="relative">
                <span className="inline-block px-3 py-1 bg-white/20 text-white text-sm font-medium rounded-full mb-4">
                  Complete Guide
                </span>
                <h3 className="font-heading text-2xl lg:text-3xl font-semibold mb-4">
                  {pillarPost.title}
                </h3>
                {pillarPost.excerpt && (
                  <p className="text-white/80 text-lg max-w-2xl mb-6">
                    {pillarPost.excerpt}
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

        {pillarPosts.length === 0 && (
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
