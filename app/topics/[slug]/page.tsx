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
  const pillarPosts = posts.filter((post: any) => post.pillarId === pillar.id);
  const pillarPost = pillarPosts.find((post: any) => post.isPillarPost);
  const clusterPosts = pillarPosts.filter((post: any) => !post.isPillarPost);

  return (
    <div className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Pillar Header */}
        <header className="text-center mb-12">
          <Link 
            href="/" 
            className="text-primary hover:underline mb-4 inline-block"
          >
            &larr; Back to Home
          </Link>
          
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            {pillar.name}
          </h1>
          
          {pillar.description && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {pillar.description}
            </p>
          )}
        </header>

        {/* Featured Pillar Post */}
        {pillarPost && (
          <section className="mb-16">
            <h2 className="font-heading text-2xl font-bold mb-6">
              Complete Guide
            </h2>
            <Link 
              href={`/blog/${pillarPost.slug}`}
              className="block bg-gradient-to-br from-primary to-secondary text-white p-8 rounded-xl hover:shadow-lg transition"
            >
              <span className="text-sm uppercase tracking-wide opacity-80">
                Featured Guide
              </span>
              <h3 className="font-heading text-2xl md:text-3xl font-bold mt-2">
                {pillarPost.title}
              </h3>
              {pillarPost.excerpt && (
                <p className="mt-4 opacity-90 max-w-2xl">
                  {pillarPost.excerpt}
                </p>
              )}
              <span className="inline-block mt-6 bg-white text-primary px-6 py-2 rounded-full font-semibold">
                Read the Complete Guide &rarr;
              </span>
            </Link>
          </section>
        )}

        {/* Related Articles */}
        {clusterPosts.length > 0 && (
          <section>
            <h2 className="font-heading text-2xl font-bold mb-6">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {clusterPosts.map((post: any) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        {pillarPosts.length === 0 && (
          <p className="text-center text-gray-500 py-12">
            No articles in this topic yet. Check back soon!
          </p>
        )}
      </div>
    </div>
  );
}
