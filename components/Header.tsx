'use client';

import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import allPillars from '@/data/pillars.json';
import posts from '@/data/posts.json';

// Try to import categories, fallback to empty array
let categories: { id: string; name: string; slug: string; description: string; pillarId: string }[] = [];
try {
  categories = require('@/data/categories.json');
} catch {
  categories = [];
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  
  // Only show pillars that have at least one published post
  const pillars = useMemo(() => {
    return allPillars.filter((pillar: any) => 
      posts.some((post: any) => post.pillarId === pillar.id && post.status === 'published')
    );
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-soft border-b border-neutral-100' 
        : 'bg-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img src="/logo.png" alt="Resale Edge logo" className="h-10 w-10 rounded-lg object-contain transition group-hover:scale-105" />
            <span className="font-heading text-xl lg:text-2xl font-semibold text-neutral-900 hidden sm:block">
              Resale Edge
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {pillars.slice(0, 5).map((pillar: any) => (
              <Link
                key={pillar.id}
                href={`/topics/${pillar.slug}`}
                className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-primary rounded-lg hover:bg-neutral-50 transition"
              >
                {pillar.name}
              </Link>
            ))}
            
            {/* Categories Dropdown */}
            {categories.length > 0 && (
              <div className="relative">
                <button
                  className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-primary rounded-lg hover:bg-neutral-50 transition flex items-center gap-1"
                  onClick={() => setShowCategories(!showCategories)}
                  onBlur={() => setTimeout(() => setShowCategories(false), 150)}
                >
                  Categories
                  <svg className={`w-4 h-4 transition-transform ${showCategories ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {showCategories && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-neutral-100 py-1 z-50">
                    {categories.map((cat: any) => (
                      <Link
                        key={cat.slug}
                        href={`/category/${cat.slug}`}
                        className="block px-4 py-2 text-sm text-neutral-600 hover:text-primary hover:bg-neutral-50 transition"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            <Link 
              href="/blog" 
              className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-primary rounded-lg hover:bg-neutral-50 transition"
            >
              All Articles
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="#newsletter"
              className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-full hover:bg-secondary hover:shadow-lg transition-all"
            >
              Subscribe
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-[500px] pb-6' : 'max-h-0'
        }`}>
          <div className="pt-4 space-y-1 border-t border-neutral-100">
            {pillars.map((pillar: any) => (
              <Link
                key={pillar.id}
                href={`/topics/${pillar.slug}`}
                className="block px-4 py-3 text-neutral-700 hover:text-primary hover:bg-neutral-50 rounded-lg transition"
                onClick={() => setIsMenuOpen(false)}
              >
                {pillar.name}
              </Link>
            ))}
            
            {/* Mobile Categories Section */}
            {categories.length > 0 && (
              <>
                <div className="px-4 pt-4 pb-2 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  Categories
                </div>
                {categories.map((cat: any) => (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    className="block px-4 py-3 text-neutral-700 hover:text-primary hover:bg-neutral-50 rounded-lg transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {cat.name}
                  </Link>
                ))}
              </>
            )}
            
            <Link
              href="/blog"
              className="block px-4 py-3 text-neutral-700 hover:text-primary hover:bg-neutral-50 rounded-lg transition"
              onClick={() => setIsMenuOpen(false)}
            >
              All Articles
            </Link>
            <a
              href="#newsletter"
              className="block mx-4 mt-4 px-5 py-3 bg-primary text-white text-center font-semibold rounded-full hover:bg-secondary transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Subscribe
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
