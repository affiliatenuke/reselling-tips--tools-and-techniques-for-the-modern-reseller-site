import Link from 'next/link';
import PostCard from '@/components/PostCard';
import PillarCard from '@/components/PillarCard';
import LeadCapture from '@/components/LeadCapture';
import posts from '@/data/posts.json';
import pillars from '@/data/pillars.json';
import leadMagnets from '@/data/lead-magnets.json';

export default function Home() {
  const pillarPosts = posts.filter((p: any) => p.isPillarPost);
  const recentPosts = posts.slice(0, 6);
  const featuredLead = leadMagnets[0];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-neutral-50 to-white pt-12 pb-20 lg:pt-20 lg:pb-32">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-6">
              Target Audience:
            </span>
            
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold text-neutral-900 mb-6 text-balance">
              Resale Edge
            </h1>
            
            <p className="text-lg lg:text-xl text-neutral-600 mb-10 max-w-2xl mx-auto text-balance">
              Build your reselling business right. Reviews of software tools, photo setups, shipping equipment, and processes and workflow for the modern reseller.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/blog"
                className="px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-secondary hover:shadow-lg transition-all"
              >
                Explore Articles
              </Link>
              {featuredLead && (
                <a
                  href="#guides"
                  className="px-8 py-4 bg-white text-neutral-900 font-semibold rounded-full border border-neutral-200 hover:border-neutral-300 hover:shadow-md transition-all"
                >
                  Get Free Guide
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Pillar Topics Section */}
      {pillars.length > 0 && (
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="font-heading text-3xl lg:text-4xl font-semibold text-neutral-900 mb-4">
                Explore Our Topics
              </h2>
              <p className="text-neutral-600 max-w-2xl mx-auto">
                Dive deep into our comprehensive guides and resources organized by topic.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pillars.map((pillar: any) => (
                <PillarCard key={pillar.id} pillar={pillar} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Authority/Trust Strip */}
      <section className="py-12 bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16 text-center">
            <div>
              <div className="text-3xl font-bold text-neutral-900">{posts.length}+</div>
              <div className="text-sm text-neutral-500">In-depth Articles</div>
            </div>
            <div className="hidden sm:block h-8 w-px bg-neutral-200" />
            <div>
              <div className="text-3xl font-bold text-neutral-900">{pillars.length}</div>
              <div className="text-sm text-neutral-500">Expert Topics</div>
            </div>
            <div className="hidden sm:block h-8 w-px bg-neutral-200" />
            <div>
              <div className="text-3xl font-bold text-neutral-900">Free</div>
              <div className="text-sm text-neutral-500">Guides & Resources</div>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Capture Section */}
      {featuredLead && (
        <section id="guides" className="py-20 lg:py-28 bg-gradient-to-br from-primary to-secondary text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <LeadCapture leadMagnet={featuredLead} />
          </div>
        </section>
      )}

      {/* Featured Pillar Posts */}
      {pillarPosts.length > 0 && (
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 lg:mb-16">
              <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent text-sm font-medium rounded-full mb-4">
                Comprehensive Guides
              </span>
              <h2 className="font-heading text-3xl lg:text-4xl font-semibold text-neutral-900 mb-4">
                Our Ultimate Guides
              </h2>
              <p className="text-neutral-600 max-w-2xl mx-auto">
                Start here with our most comprehensive resources on each topic.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {pillarPosts.slice(0, 4).map((post: any) => (
                <Link 
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group relative bg-gradient-to-br from-neutral-50 to-white rounded-2xl p-8 border border-neutral-100 hover:border-primary/20 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex flex-col h-full">
                    <span className="inline-block self-start px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-4">
                      Complete Guide
                    </span>
                    <h3 className="font-heading text-xl lg:text-2xl font-semibold text-neutral-900 group-hover:text-primary transition mb-3">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-neutral-600 mb-6 line-clamp-2 flex-grow">
                        {post.excerpt}
                      </p>
                    )}
                    <span className="inline-flex items-center text-primary font-medium">
                      Read the guide
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Articles */}
      {recentPosts.length > 0 && (
        <section className="py-20 lg:py-28 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
              <div>
                <h2 className="font-heading text-3xl lg:text-4xl font-semibold text-neutral-900 mb-2">
                  Latest Articles
                </h2>
                <p className="text-neutral-600">
                  Fresh insights and guides to help you succeed.
                </p>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center text-primary font-medium hover:text-secondary transition"
              >
                View all articles
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post: any) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
