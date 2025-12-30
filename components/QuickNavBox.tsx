import Link from 'next/link';

interface QuickNavItem {
  title: string;
  href: string;
}

interface QuickNavBoxProps {
  items: QuickNavItem[];
}

export default function QuickNavBox({ items }: QuickNavBoxProps) {
  if (items.length === 0) return null;
  
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-8">
      <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
        In This Guide
      </h2>
      <div className="grid sm:grid-cols-2 gap-2">
        {items.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition py-1"
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-sm line-clamp-1">{item.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
