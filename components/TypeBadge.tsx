interface TypeBadgeProps {
  type: 'pillar' | 'cluster' | 'blog';
  format?: string;
  size?: 'sm' | 'md';
}

const formatLabels: Record<string, string> = {
  'ultimate_guide': 'Ultimate Guide',
  'buying_guide': 'Buying Guide',
  'product_review': 'Product Review',
  'comparison': 'Comparison',
  'how_to': 'How-To',
  'explainer': 'Explainer',
  'listicle': 'Listicle',
  'opinion': 'Opinion',
};

const formatIcons: Record<string, string> = {
  'ultimate_guide': 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  'buying_guide': 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
  'product_review': 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
  'comparison': 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  'how_to': 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
  'explainer': 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
  'listicle': 'M4 6h16M4 10h16M4 14h16M4 18h16',
  'opinion': 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
};

export default function TypeBadge({ type, format, size = 'md' }: TypeBadgeProps) {
  const sizeClasses = size === 'sm' 
    ? 'px-2 py-0.5 text-[10px]' 
    : 'px-3 py-1.5 text-xs';
  
  if (type === 'pillar') {
    return (
      <span className={`inline-flex items-center gap-1.5 ${sizeClasses} bg-gradient-to-r from-purple-500 to-violet-500 text-white font-semibold uppercase tracking-wider rounded-full shadow-sm`}>
        <svg className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        Pillar
      </span>
    );
  }
  
  if (type === 'cluster') {
    return (
      <span className={`inline-flex items-center gap-1.5 ${sizeClasses} bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold uppercase tracking-wider rounded-full shadow-sm`}>
        <svg className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        Cluster
      </span>
    );
  }
  
  // Blog type - show article format with icon
  const label = format ? (formatLabels[format] || format.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())) : 'Article';
  const iconPath = format ? formatIcons[format] : null;
  
  return (
    <span className={`inline-flex items-center gap-1.5 ${sizeClasses} bg-white/90 backdrop-blur-sm text-neutral-700 font-semibold uppercase tracking-wider rounded-full shadow-sm border border-neutral-200`}>
      {iconPath && (
        <svg className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
        </svg>
      )}
      {label}
    </span>
  );
}
