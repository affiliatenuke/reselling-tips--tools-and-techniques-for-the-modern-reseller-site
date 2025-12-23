import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import siteConfig from '@/data/site-config.json';

const baseUrl = 'https://resaleedge.com';

export const metadata: Metadata = {
  title: {
    default: 'Resale Edge',
    template: `%s | Resale Edge`,
  },
  description: 'Build your reselling business right. Reviews of software tools, photo setups, shipping equipment, and processes and workflow for the modern reseller.',
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'Resale Edge',
    title: 'Resale Edge',
    description: 'Build your reselling business right. Reviews of software tools, photo setups, shipping equipment, and processes and workflow for the modern reseller.',
    images: [
      {
        url: siteConfig.logoUrl || `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Resale Edge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resale Edge',
    description: 'Build your reselling business right. Reviews of software tools, photo setups, shipping equipment, and processes and workflow for the modern reseller.',
    images: [siteConfig.logoUrl || `${baseUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when needed
    // google: 'your-google-verification-code',
  },
};

// Organization and Website structured data
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Resale Edge',
  url: baseUrl,
  ...(siteConfig.logoUrl && {
    logo: {
      '@type': 'ImageObject',
      url: siteConfig.logoUrl.startsWith('http') ? siteConfig.logoUrl : `${baseUrl}${siteConfig.logoUrl}`,
    },
  }),
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Resale Edge',
  url: baseUrl,
  description: 'Build your reselling business right. Reviews of software tools, photo setups, shipping equipment, and processes and workflow for the modern reseller.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${baseUrl}/blog?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
