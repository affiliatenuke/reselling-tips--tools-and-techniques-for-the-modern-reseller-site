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
    <div className="bg-gradient-to-b from-neutral-50 to-white border-t border-neutral-200 py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-2 text-neutral-500 mr-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-sm font-medium">Continue exploring:</span>
          </div>
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-full text-sm font-medium text-neutral-700 hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all shadow-sm"
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
