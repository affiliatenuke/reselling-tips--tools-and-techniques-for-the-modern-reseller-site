import Link from 'next/link';
import TypeBadge from './TypeBadge';

interface ContentCardProps {
  title: string;
  slug: string;
  description?: string;
  type: 'pillar' | 'cluster' | 'blog';
  format?: string;
  articleCount?: number;
  href: string;
  featuredImage?: string;
}

export default function ContentCard({ title, description, type, format, articleCount, href, featuredImage }: ContentCardProps) {
  return (
    <Link href={href} className="group block h-full">
      <article className="h-full bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-lg hover:border-neutral-300 transition-all duration-300 hover:-translate-y-1">
        {/* Image Section */}
        <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-50">
          {featuredImage ? (
            <img 
              src={featuredImage} 
              alt="" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-primary/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
            </div>
          )}
          
          {/* Badge overlay */}
          <div className="absolute top-3 left-3">
            <TypeBadge type={type} format={format} />
          </div>
          
          {/* Article count overlay for clusters */}
          {type === 'cluster' && typeof articleCount === 'number' && (
            <div className="absolute bottom-3 right-3">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/90 backdrop-blur-sm text-neutral-700 text-xs font-medium rounded-full shadow-sm">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {articleCount} article{articleCount !== 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>
        
        {/* Content Section */}
        <div className="p-5">
          <h3 className="font-heading text-lg font-semibold text-neutral-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          {description && (
            <p className="text-neutral-600 text-sm line-clamp-2 leading-relaxed">
              {description}
            </p>
          )}
          
          <div className="mt-4 flex items-center text-primary text-sm font-medium">
            <span>Read more</span>
            <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
}
