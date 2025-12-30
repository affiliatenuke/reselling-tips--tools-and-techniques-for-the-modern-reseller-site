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
}

export default function ContentCard({ title, description, type, format, articleCount, href }: ContentCardProps) {
  return (
    <Link href={href} className="group block">
      <article className="h-full p-6 bg-slate-800/50 border border-slate-700 rounded-xl hover:bg-slate-700/50 hover:border-slate-600 transition-all">
        <TypeBadge type={type} format={format} />
        
        <h3 className="font-heading text-lg font-semibold text-white mt-4 mb-2 group-hover:text-emerald-400 transition">
          {title}
        </h3>
        
        {description && (
          <p className="text-slate-400 text-sm line-clamp-2 mb-4">
            {description}
          </p>
        )}
        
        {type === 'cluster' && typeof articleCount === 'number' && (
          <div className="flex items-center gap-1 text-sm text-emerald-400">
            <span>{articleCount} article{articleCount !== 1 ? 's' : ''}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        )}
      </article>
    </Link>
  );
}
