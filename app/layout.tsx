import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Reselling Tips, Tools and Techniques For The Modern Reseller',
  description: 'Welcome to Reselling Tips, Tools and Techniques For The Modern Reseller - your trusted resource for People that resell items on ebay, poshmark, mecari and other on-line selling platforms. These people are looking for software tools for inventory management, Cross Posting, Listing automation amoung others.  They are also looking for tips and techniques to improve there business',
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
