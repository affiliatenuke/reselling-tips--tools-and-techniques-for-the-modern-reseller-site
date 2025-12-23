import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'ResaleEdge | Reseller Hardware, Software & Systems That Scale',
  description: 'Welcome to ResaleEdge | Reseller Hardware, Software & Systems That Scale - your trusted resource for Target Audience:

Primary: Established resellers doing $1K-$10K+/month looking to professionalize their operations with better equipment, software, and workflows
Secondary: Ambitious beginners who want to start with the right infrastructure instead of cobbling things together
Demographics: 25-55, treat reselling as a real business (not just decluttering), willing to invest in tools that save time and increase profit margins
Pain points:

Inefficient photo setups slowing down listings
Disorganized inventory and storage systems
Decision paralysis on which software subscriptions are worth it
Shipping station chaos eating into margins
Scaling bottlenecks from manual processes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
