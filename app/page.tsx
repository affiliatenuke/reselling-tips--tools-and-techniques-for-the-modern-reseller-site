import Link from 'next/link';
import PostCard from '@/components/PostCard';
import LeadCapture from '@/components/LeadCapture';
import posts from '@/data/posts.json';
import leadMagnets from '@/data/lead-magnets.json';

export default function Home() {
  const featuredPosts = posts.slice(0, 3);
  const recentPosts = posts.slice(0, 6);
  const featuredLead = leadMagnets[0];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-secondary text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6">
            {"ResaleEdge | Reseller Hardware, Software & Systems That Scale"}
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            {"Build your reselling business right. Reviews of software tools, photo setups, shipping equipment, and processes and workflow for the modern reseller."}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/blog"
              className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition"
            >
              Explore Articles
            </Link>
            {featuredLead && (
              <a
                href="#lead-capture"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-primary transition"
              >
                Get Free Guide
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-center mb-12">
              Featured Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {featuredPosts.map((post: any) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lead Capture Section */}
      {featuredLead && (
        <section id="lead-capture" className="py-20 px-4 bg-primary text-white">
          <div className="max-w-4xl mx-auto">
            <LeadCapture leadMagnet={featuredLead} />
          </div>
        </section>
      )}

      {/* Recent Posts */}
      {recentPosts.length > 3 && (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-center mb-12">
              Latest Articles
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.slice(3).map((post: any) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                href="/blog"
                className="inline-block bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-secondary transition"
              >
                View All Articles
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
