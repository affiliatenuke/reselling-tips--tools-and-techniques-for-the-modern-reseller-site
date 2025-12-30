export const metadata = {
  title: 'Terms of Service - Resale Edge',
  description: 'Terms of service for Resale Edge. Please read these terms carefully before using our website.',
};

export default function TermsPage() {
  return (
    <div className="py-16 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-heading text-4xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose prose-lg">
          <p className="text-gray-600 mb-6">Last updated: December 30, 2025</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
            <p className="text-gray-700 mb-4">
              By accessing and using this website, you accept and agree to be bound by the terms and provisions of this agreement. 
              If you do not agree to these terms, please do not use this website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Use of Content</h2>
            <p className="text-gray-700 mb-4">
              All content on this website is for informational purposes only. We make no representations or warranties of any kind, 
              express or implied, about the completeness, accuracy, reliability, or availability of the information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
            <p className="text-gray-700 mb-4">
              The content, design, and layout of this website are protected by intellectual property laws. 
              You may not reproduce, distribute, or create derivative works without our prior written consent.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">External Links</h2>
            <p className="text-gray-700 mb-4">
              Our website may contain links to external sites. We are not responsible for the content or practices of these third-party sites.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
            <p className="text-gray-700 mb-4">
              In no event shall we be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of this website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
            <p className="text-gray-700">
              We reserve the right to modify these terms at any time. Your continued use of the website following any changes constitutes acceptance of those changes.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
