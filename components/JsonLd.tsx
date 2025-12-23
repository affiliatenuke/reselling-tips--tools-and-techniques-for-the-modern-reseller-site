interface JsonLdProps {
  data: Record<string, any>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Helper to generate Article schema
export function generateArticleSchema(post: {
  title: string;
  excerpt?: string;
  content: string;
  authorName?: string;
  publishDate?: string;
  featuredImage?: string;
  slug: string;
}, siteName: string, baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || post.title,
    author: {
      '@type': 'Person',
      name: post.authorName || siteName,
    },
    publisher: {
      '@type': 'Organization',
      name: siteName,
      url: baseUrl,
    },
    datePublished: post.publishDate || new Date().toISOString(),
    dateModified: post.publishDate || new Date().toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${post.slug}`,
    },
    ...(post.featuredImage && {
      image: {
        '@type': 'ImageObject',
        url: post.featuredImage,
      },
    }),
  };
}

// Helper to generate Organization schema
export function generateOrganizationSchema(siteName: string, baseUrl: string, logoUrl?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteName,
    url: baseUrl,
    ...(logoUrl && {
      logo: {
        '@type': 'ImageObject',
        url: logoUrl.startsWith('http') ? logoUrl : `${baseUrl}${logoUrl}`,
      },
    }),
  };
}

// Helper to generate BreadcrumbList schema
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// Helper to generate WebSite schema with search
export function generateWebsiteSchema(siteName: string, baseUrl: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: baseUrl,
    description: description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}
