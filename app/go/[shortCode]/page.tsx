import { redirect, notFound } from 'next/navigation';
import affiliateLinks from '@/data/affiliate-links.json';

interface PageProps {
  params: { shortCode: string };
}

export async function generateStaticParams() {
  return affiliateLinks.map((link: any) => ({
    shortCode: link.shortCode,
  }));
}

export default function AffiliateRedirectPage({ params }: PageProps) {
  const link = affiliateLinks.find((l: any) => l.shortCode === params.shortCode) as any;
  
  if (!link || !link.destinationUrl) {
    notFound();
  }
  
  redirect(link.destinationUrl);
}
