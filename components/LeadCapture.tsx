'use client';

import { useState } from 'react';

interface LeadMagnet {
  id: string;
  name: string;
  headline?: string;
  subheadline?: string;
  benefits?: string[];
  ctaText?: string;
}

export default function LeadCapture({ leadMagnet }: { leadMagnet: LeadMagnet }) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsSuccess(true);
    setIsSubmitting(false);
  };

  if (isSuccess) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-heading text-2xl lg:text-3xl font-semibold mb-3">You're in!</h3>
        <p className="text-white/80 text-lg">
          Check your email to download your free guide.
        </p>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      <div>
        <span className="inline-block px-4 py-1.5 bg-white/20 text-white text-sm font-medium rounded-full mb-6">
          Free Download
        </span>
        <h2 className="font-heading text-3xl lg:text-4xl font-semibold mb-4">
          {leadMagnet.headline || leadMagnet.name}
        </h2>
        
        {leadMagnet.subheadline && (
          <p className="text-lg text-white/80 mb-8">{leadMagnet.subheadline}</p>
        )}
        
        {leadMagnet.benefits && leadMagnet.benefits.length > 0 && (
          <ul className="space-y-4">
            {leadMagnet.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-white/90">{benefit}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-2xl">
        <h3 className="font-heading text-xl font-semibold text-neutral-900 mb-2">
          Get instant access
        </h3>
        <p className="text-neutral-500 text-sm mb-6">
          Enter your email and we'll send it right over.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition text-neutral-900"
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-white py-3.5 rounded-xl font-semibold hover:bg-secondary hover:shadow-lg transition-all disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="inline-flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Sending...
              </span>
            ) : (
              leadMagnet.ctaText || 'Get Free Access'
            )}
          </button>
          
          <p className="text-xs text-neutral-400 text-center">
            No spam, ever. Unsubscribe anytime.
          </p>
        </form>
      </div>
    </div>
  );
}
