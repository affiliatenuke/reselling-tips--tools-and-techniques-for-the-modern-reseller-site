import Link from 'next/link';
import posts from '@/data/posts.json';

interface Pillar {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
}

export default function PillarCard({ pillar }: { pillar: Pillar }) {
  const postCount = posts.filter((p: any) => p.pillarId === pillar.id).length;
  
  return (
    <Link 
      href={`/topics/${pillar.slug}`}
      className="group block p-6 lg:p-8 bg-white rounded-2xl border border-neutral-100 hover:border-primary/20 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <span className="text-xs font-medium text-neutral-400 bg-neutral-50 px-2 py-1 rounded-full">
          {postCount} articles
        </span>
      </div>
      
      <h3 className="font-heading text-xl font-semibold text-neutral-900 group-hover:text-primary transition mb-2">
        {pillar.name}
      </h3>
      
      {pillar.description && (
        <p className="text-neutral-600 text-sm line-clamp-2 mb-4">
          {pillar.description}
        </p>
      )}
      
      <span className="inline-flex items-center text-primary text-sm font-medium group-hover:translate-x-1 transition">
        Explore topic
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </Link>
  );
}
