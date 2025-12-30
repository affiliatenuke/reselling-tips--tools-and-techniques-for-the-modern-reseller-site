interface TypeBadgeProps {
  type: 'pillar' | 'cluster' | 'blog';
  format?: string;
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

export default function TypeBadge({ type, format }: TypeBadgeProps) {
  if (type === 'pillar') {
    return (
      <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold uppercase tracking-wider rounded-full">
        Pillar
      </span>
    );
  }
  
  if (type === 'cluster') {
    return (
      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wider rounded-full">
        Cluster
      </span>
    );
  }
  
  // Blog type - show article format
  const label = format ? (formatLabels[format] || format.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())) : 'Article';
  
  return (
    <span className="inline-block px-3 py-1 bg-neutral-100 text-neutral-600 text-xs font-semibold uppercase tracking-wider rounded-full">
      {label}
    </span>
  );
}
