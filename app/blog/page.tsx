import PostCard from '@/components/PostCard';
import Breadcrumb from '@/components/Breadcrumb';
import posts from '@/data/posts.json';
import pillars from '@/data/pillars.json';

export default function BlogPage() {
  const featuredPosts = posts.filter((p: any) => p.isFeaturedPost);
  const regularPosts = posts.filter((p: any) => !p.isFeaturedPost);
  
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <Breadcrumb items={[{ label: 'Blog' }]} />
          
          <h1 className="font-heading text-4xl lg:text-5xl font-semibold text-neutral-900 mb-4">
            All Articles
          </h1>
          <p className="text-neutral-600 text-lg max-w-2xl">
            Insights, guides, and tips for Target Audience:.
          </p>
        </div>
      </div>

      {/* Topics Filter */}
      {pillars.length > 0 && (
        <div className="bg-white border-b border-neutral-100 sticky top-16 lg:top-20 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 py-4 overflow-x-auto scrollbar-hide">
              <span className="text-sm text-neutral-500 flex-shrink-0">Topics:</span>
              {pillars.map((pillar: any) => (
                <a
                  key={pillar.id}
                  href={`/topics/${pillar.slug}`}
                  className="px-4 py-1.5 text-sm font-medium text-neutral-600 bg-neutral-50 rounded-full hover:bg-primary/10 hover:text-primary transition flex-shrink-0"
                >
                  {pillar.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Featured Guides */}
        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h2 className="font-heading text-2xl font-semibold text-neutral-900">
                Complete Guides
              </h2>
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
              {featuredPosts.map((post: any) => (
                <PostCard key={post.id} post={post} featured />
              ))}
            </div>
          </section>
        )}

        {/* All Articles */}
        <section>
          <h2 className="font-heading text-2xl font-semibold text-neutral-900 mb-8">
            {featuredPosts.length > 0 ? 'More Articles' : 'All Articles'}
          </h2>
          
          {regularPosts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post: any) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-neutral-100">
              <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <p className="text-neutral-500">
                No articles yet. Check back soon!
              </p>
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}
