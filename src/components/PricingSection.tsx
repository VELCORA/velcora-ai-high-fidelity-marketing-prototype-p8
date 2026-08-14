import React, { useState } from 'react';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import { CheckoutModal } from './CheckoutModal';

export const PricingSection: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    price: number;
    billing: 'monthly' | 'annual';
  } | null>(null);

  const features = [
    'Unlimited web scraping & structured extraction',
    'All 4 cinematic 4K ambient landscapes',
    'Binaural & procedural audio synthesizer',
    'JSON & CSV data export',
    'Visual workflow automation builder',
    'Community recipe library + deep focus station',
  ];

  return (
    <section id="pricing" className="relative w-full py-20 px-4 sm:px-8 md:px-14 bg-[#04070b] text-white z-20 font-sans-ui border-t border-white/10">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full liquid-glass border border-white/15 text-xs text-amber-300 mb-3.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>100% Free — No Card Required</span>
        </div>
        <h2 className="font-serif italic text-3xl sm:text-5xl text-white tracking-tight">
          Velcora AI is free to use
        </h2>
        <p className="mt-3 text-white/70 text-sm sm:text-base leading-relaxed">
          No tiers, no paywalls, no credit card. Every feature is unlocked for everyone.
        </p>

        <div className="mt-10 rounded-3xl p-6 sm:p-8 liquid-glass border border-white/15 text-left max-w-xl mx-auto">
          <h3 className="font-serif italic text-2xl sm:text-3xl text-white">Free Workspace</h3>
          <p className="text-white/60 text-xs sm:text-sm mt-2 leading-relaxed">
            Everything Velcora AI offers, available to you right now at zero cost.
          </p>

          <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
            {features.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/80">
                <div className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-emerald-400 flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <span>{feat}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => setSelectedPlan({ name: 'Free Workspace', price: 0, billing: 'monthly' })}
            className="mt-8 w-full py-3.5 rounded-full bg-white text-black hover:bg-white/90 font-semibold text-sm flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer shadow-lg"
          >
            <span>Start Free Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <CheckoutModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />
    </section>
  );
};
