import Link from 'next/link';

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  featuredImage?: string;
  category?: string;
  publishDate?: string;
  isPillarPost?: boolean;
}

export default function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <article className={`h-full bg-white rounded-xl overflow-hidden border border-neutral-100 hover:border-primary/20 hover:shadow-xl transition-all duration-300 ${
        featured ? 'lg:flex' : ''
      }`}>
        {/* Image */}
        <div className={`relative overflow-hidden ${featured ? 'lg:w-2/5' : ''}`}>
          {post.featuredImage ? (
            <img
              src={post.featuredImage}
              alt={post.title}
              className={`w-full object-cover group-hover:scale-105 transition duration-500 ${
                featured ? 'h-48 lg:h-full' : 'h-48'
              }`}
            />
          ) : (
            <div className={`w-full bg-gradient-to-br from-primary/80 to-secondary ${
              featured ? 'h-48 lg:h-full lg:min-h-[200px]' : 'h-48'
            }`} />
          )}
          {post.isPillarPost && (
            <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm text-primary text-xs font-medium rounded-full">
              Complete Guide
            </span>
          )}
        </div>
        
        {/* Content */}
        <div className={`p-6 flex flex-col ${featured ? 'lg:w-3/5 lg:p-8' : ''}`}>
          {post.category && (
            <span className="text-xs font-medium text-primary uppercase tracking-wider mb-2">
              {post.category}
            </span>
          )}
          
          <h3 className={`font-heading font-semibold text-neutral-900 group-hover:text-primary transition mb-3 ${
            featured ? 'text-xl lg:text-2xl' : 'text-lg'
          }`}>
            {post.title}
          </h3>
          
          {post.excerpt && (
            <p className="text-neutral-600 text-sm line-clamp-2 mb-4 flex-grow">
              {post.excerpt}
            </p>
          )}
          
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-neutral-100">
            {post.publishDate && (
              <time className="text-xs text-neutral-400">
                {new Date(post.publishDate).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </time>
            )}
            <span className="text-primary text-sm font-medium group-hover:translate-x-1 transition inline-flex items-center">
              Read more
              <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
