import Link from 'next/link';

interface QuickNavItem {
  title: string;
  href: string;
}

interface QuickNavBoxProps {
  items: QuickNavItem[];
  title?: string;
}

export default function QuickNavBox({ items, title = "In This Guide" }: QuickNavBoxProps) {
  if (items.length === 0) return null;
  
  return (
    <div className="relative bg-gradient-to-br from-neutral-50 to-white border border-neutral-200 rounded-2xl p-6 lg:p-8 mb-10 shadow-sm">
      {/* Decorative accent */}
      <div className="absolute top-0 left-6 lg:left-8 w-12 h-1 bg-gradient-to-r from-primary to-secondary rounded-full -translate-y-0.5" />
      
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
        </div>
        <h2 className="font-heading text-lg font-semibold text-neutral-900">
          {title}
        </h2>
      </div>
      
      <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
        {items.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="group flex items-center gap-3 py-2 px-3 -mx-3 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
              {index + 1}
            </span>
            <span className="text-sm text-neutral-700 group-hover:text-neutral-900 line-clamp-1 transition-colors">
              {item.title}
            </span>
            <svg className="w-4 h-4 ml-auto text-neutral-300 group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  );
}
