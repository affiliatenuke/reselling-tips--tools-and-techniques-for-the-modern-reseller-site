import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Affiliate Disclosure - Reselling Tips, Tools and Techniques For The Modern Reseller',
  description: 'Affiliate disclosure for Reselling Tips, Tools and Techniques For The Modern Reseller. Learn about our affiliate relationships and how we earn commissions.',
};

export default function AffiliateDisclosurePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading text-4xl font-bold mb-8">Affiliate Disclosure</h1>
          
          <div className="prose prose-lg">
            <p className="text-gray-600 mb-6">Last updated: December 23, 2025</p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Our Commitment to Transparency</h2>
              <p className="text-gray-700 mb-4">
                We believe in being transparent with our readers. This page discloses our affiliate relationships 
                and explains how we may earn commissions from the products and services we recommend.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">What Are Affiliate Links?</h2>
              <p className="text-gray-700 mb-4">
                Some of the links on our website are affiliate links. This means that if you click on the link and make a purchase, 
                we may receive a small commission at no extra cost to you. These commissions help us maintain and improve our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Our Promise to You</h2>
              <p className="text-gray-700 mb-4">
                We only recommend products and services that we genuinely believe will provide value to our readers. 
                Our opinions and reviews are our own and are not influenced by any affiliate partnerships.
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>We personally research and evaluate products before recommending them</li>
                <li>Affiliate relationships do not affect our editorial integrity</li>
                <li>We clearly disclose when content contains affiliate links</li>
                <li>Your trust is more important to us than any commission</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">FTC Compliance</h2>
              <p className="text-gray-700 mb-4">
                In accordance with the Federal Trade Commission (FTC) guidelines, we disclose our affiliate relationships. 
                We are committed to providing honest and unbiased information to help you make informed decisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Questions?</h2>
              <p className="text-gray-700">
                If you have any questions about our affiliate relationships or this disclosure, please feel free to contact us.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
