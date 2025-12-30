import Link from 'next/link';

interface BackLink {
  label: string;
  href: string;
}

interface BackToSectionProps {
  links: BackLink[];
}

export default function BackToSection({ links }: BackToSectionProps) {
  if (links.length === 0) return null;
  
  return (
    <div className="bg-slate-800/30 border-t border-slate-700 py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-sm text-slate-500">Back to:</span>
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="inline-flex items-center gap-1 text-sm text-emerald-400 hover:text-emerald-300 transition"
            >
              {link.label}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
