'use client';

import Link from 'next/link';
import { useState } from 'react';
import pillars from '@/data/pillars.json';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="ResaleEdge | Reseller Hardware, Software & Systems That Scale logo" className="h-10 w-10 rounded-md object-contain" />
              <span className="font-heading text-2xl font-bold text-primary">ResaleEdge | Reseller Hardware, Software & Systems That Scale</span>
            </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="hover:text-primary transition">
              Home
            </Link>
            {pillars.map((pillar: any) => (
              <Link
                key={pillar.id}
                href={`/topics/${pillar.slug}`}
                className="hover:text-primary transition"
              >
                {pillar.name}
              </Link>
            ))}
            <Link href="/blog" className="hover:text-primary transition">
              Blog
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="hover:text-primary transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              {pillars.map((pillar: any) => (
                <Link
                  key={pillar.id}
                  href={`/topics/${pillar.slug}`}
                  className="hover:text-primary transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {pillar.name}
                </Link>
              ))}
              <Link
                href="/blog"
                className="hover:text-primary transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
