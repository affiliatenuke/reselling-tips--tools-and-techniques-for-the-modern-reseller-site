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
      <div className="text-center py-8">
        <div className="text-5xl mb-4">Check your inbox</div>
        <h3 className="text-2xl font-bold mb-2">You are in!</h3>
        <p className="opacity-90">
          Check your email to download your free guide.
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
          {leadMagnet.headline || leadMagnet.name}
        </h2>
        
        {leadMagnet.subheadline && (
          <p className="text-xl opacity-90 mb-6">{leadMagnet.subheadline}</p>
        )}
        
        {leadMagnet.benefits && leadMagnet.benefits.length > 0 && (
          <ul className="space-y-3">
            {leadMagnet.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-white rounded-xl p-8 text-gray-900">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition disabled:opacity-50"
          >
            {isSubmitting ? 'Sending...' : (leadMagnet.ctaText || 'Get Free Access')}
          </button>
          
          <p className="text-xs text-gray-500 text-center">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </form>
      </div>
    </div>
  );
}
