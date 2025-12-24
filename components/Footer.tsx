import Link from 'next/link';
import pillars from '@/data/pillars.json';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-white">
      {/* Newsletter Section */}
      <div id="newsletter" className="border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-heading text-3xl lg:text-4xl font-semibold mb-4">
              Stay in the loop
            </h2>
            <p className="text-neutral-400 mb-8">
              Get the latest articles, guides, and exclusive insights delivered straight to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 bg-neutral-800 border border-neutral-700 rounded-full text-white placeholder-neutral-500 focus:outline-none focus:border-primary transition"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-white font-semibold rounded-full hover:bg-secondary transition whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-neutral-500 mt-4">
              No spam. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block font-heading text-2xl font-semibold mb-4">
              Resale Edge
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              Build your reselling business right. Reviews of software tools, photo setups, shipping equipment, and processes and workflow for the modern reseller.
            </p>
          </div>

          {/* Topics */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-4">
              Topics
            </h3>
            <ul className="space-y-3">
              {pillars.slice(0, 5).map((pillar: any) => (
                <li key={pillar.id}>
                  <Link 
                    href={`/topics/${pillar.slug}`} 
                    className="text-neutral-300 hover:text-white transition"
                  >
                    {pillar.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/blog" className="text-neutral-300 hover:text-white transition">
                  All Articles
                </Link>
              </li>
              <li>
                <Link href="/#guides" className="text-neutral-300 hover:text-white transition">
                  Free Guides
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="text-neutral-300 hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-neutral-300 hover:text-white transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/affiliate-disclosure" className="text-neutral-300 hover:text-white transition">
                  Affiliate Disclosure
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-neutral-500 text-sm">
            &copy; {currentYear} Resale Edge. All rights reserved.
          </p>
          <p className="text-neutral-500 text-xs">
            Some links may be affiliate links. See our <Link href="/affiliate-disclosure" className="underline hover:text-white">disclosure</Link>.
          </p>
        </div>
      </div>
    </footer>
  );
}
