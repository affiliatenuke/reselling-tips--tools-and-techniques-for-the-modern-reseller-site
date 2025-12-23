import PostCard from '@/components/PostCard';
import posts from '@/data/posts.json';

export default function BlogPage() {
  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-heading text-4xl font-bold text-center mb-4">
          Blog
        </h1>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Explore our latest articles and insights for {"Target Audience:\n\nPrimary: Established resellers doing $1K-$10K+/month looking to professionalize their operations with better equipment, software, and workflows\nSecondary: Ambitious beginners who want to start with the right infrastructure instead of cobbling things together\nDemographics: 25-55, treat reselling as a real business (not just decluttering), willing to invest in tools that save time and increase profit margins\nPain points:\n\nInefficient photo setups slowing down listings\nDisorganized inventory and storage systems\nDecision paralysis on which software subscriptions are worth it\nShipping station chaos eating into margins\nScaling bottlenecks from manual processes"}
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: any) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {posts.length === 0 && (
          <p className="text-center text-gray-500 py-12">
            No posts yet. Check back soon!
          </p>
        )}
      </div>
    </div>
  );
}
