import { notFound } from 'next/navigation';
import Link from 'next/link';
import PostCard from '@/components/PostCard';
import posts from '@/data/posts.json';

// Try to import categories, fallback to empty array
let categories: { id: string; name: string; slug: string; description: string; pillarId: string }[] = [];
try {
  categories = require('@/data/categories.json');
} catch {
  categories = [];
}

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return categories.map((cat: any) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const category = categories.find((c: any) => c.slug === params.slug);
  
  if (!category) {
    return { title: 'Category Not Found' };
  }

  return {
    title: `${(category as any).name} Articles | Resale Edge`,
    description: `Browse all ${(category as any).name.toLowerCase()} articles and guides on Resale Edge`,
  };
}

export default function CategoryPage({ params }: PageProps) {
  const category = categories.find((c: any) => c.slug === params.slug) as any;

  if (!category) {
    notFound();
  }

  // Filter posts by clusterId (new 3-tier system) or legacy category string
  const categoryPosts = posts.filter((post: any) => {
    // New system: match by clusterId (3-tier hierarchy)
    if (post.clusterId && category.id) {
      return post.clusterId === category.id;
    }
    // Legacy fallback: match by category string
    if (post.category) {
      return post.category.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') === params.slug;
    }
    return false;
  }) as any[];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-neutral-50 to-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          {/* Breadcrumb */}
          <nav className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center text-sm text-neutral-500">
            <Link href="/" className="hover:text-primary transition">Home</Link>
            <svg className="w-4 h-4 mx-2 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-neutral-900 font-medium">{category.name}</span>
          </nav>
          
          <div className="max-w-3xl mx-auto text-center pt-8">
            <span className="inline-block px-4 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
              Category
            </span>
            <h1 className="font-heading text-4xl lg:text-5xl font-semibold text-neutral-900 mb-4">
              {category.name}
            </h1>
            <p className="text-lg lg:text-xl text-neutral-600 max-w-2xl mx-auto">
              {categoryPosts.length} article{categoryPosts.length !== 1 ? 's' : ''} in this category
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Articles */}
        {categoryPosts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryPosts.map((post: any) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-neutral-50 rounded-2xl border border-neutral-100">
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <p className="text-neutral-500">
              No articles in this category yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
