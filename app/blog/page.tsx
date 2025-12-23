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
          Explore our latest articles and insights for People that resell items on ebay, poshmark, mecari and other on-line selling platforms. These people are looking for software tools for inventory management, Cross Posting, Listing automation amoung others.  They are also looking for tips and techniques to improve there business
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
