import Link from 'next/link';

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  featuredImage?: string;
  category?: string;
  publishDate?: string;
}

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition">
        {post.featuredImage ? (
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-primary to-secondary" />
        )}
        
        <div className="p-6">
          {post.category && (
            <span className="text-xs font-medium text-primary uppercase tracking-wide">
              {post.category}
            </span>
          )}
          
          <h3 className="font-heading text-xl font-bold mt-2 group-hover:text-primary transition">
            {post.title}
          </h3>
          
          {post.excerpt && (
            <p className="mt-3 text-gray-600 line-clamp-2">
              {post.excerpt}
            </p>
          )}
          
          {post.publishDate && (
            <p className="mt-4 text-sm text-gray-400">
              {new Date(post.publishDate).toLocaleDateString()}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
}
