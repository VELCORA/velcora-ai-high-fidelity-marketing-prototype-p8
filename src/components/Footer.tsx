import React, { useState, useEffect } from 'react';
import { Shield, Sparkles, Terminal, Activity, ArrowUp, Github, Twitter, Disc as Discord } from 'lucide-react';
import { Logo } from './Logo';
import { useToast } from './Toast';

export const Footer: React.FC<{ onOpenSection: (id: string) => void }> = ({ onOpenSection }) => {
  const { showToast } = useToast();
  const [latency, setLatency] = useState<number>(38);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Math.floor(32 + Math.random() * 15));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Returned to top', 'info');
  };

  return (
    <footer className="relative w-full py-16 px-6 sm:px-10 md:px-14 bg-black text-white z-20 font-sans-ui border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Logo & Mission */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <Logo className="w-8 h-8" />
              <span className="font-serif italic text-2xl tracking-wide text-white">Velcora AI</span>
            </div>
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
              The high-performance autonomous web scraper, data intelligence engine, and mindfulness deep work suite.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span>All Systems Operational ({latency}ms)</span>
            </div>
          </div>

          {/* Col 2: Platform Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Product & Studio</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-white/70">
              <li>
                <button onClick={() => onOpenSection('scraper-studio')} className="hover:text-white transition-colors cursor-pointer">
                  Web Scraper Studio
                </button>
              </li>
              <li>
                <button onClick={() => onOpenSection('focus-station')} className="hover:text-white transition-colors cursor-pointer">
                  Cognitive Deep Flow Timer
                </button>
              </li>
              <li>
                <button onClick={() => onOpenSection('automation-builder')} className="hover:text-white transition-colors cursor-pointer">
                  Workflow Orchestrator
                </button>
              </li>
              <li>
                <button onClick={() => onOpenSection('community')} className="hover:text-white transition-colors cursor-pointer">
                  Community Recipe Hub
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources & Docs */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Developers & API</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-white/70">
              <li>
                <button
                  onClick={() => showToast('API Documentation v2.4 initialized. View cURL samples in Studio.', 'info')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  REST & Webhook API
                </button>
              </li>
              <li>
                <button
                  onClick={() => showToast('Stealth residential proxy pool status: 100% Healthy (64k nodes)', 'info')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Stealth Proxy Network
                </button>
              </li>
              <li>
                <button
                  onClick={() => showToast('Gemini 3.7 Reasoning integration verified.', 'info')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Gemini Reasoning SDK
                </button>
              </li>
              <li>
                <button onClick={() => onOpenSection('pricing')} className="hover:text-white transition-colors cursor-pointer">
                  Pricing & Concurrency
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Community & Scroll to top */}
          <div className="space-y-4 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Stay Connected</h4>
              <p className="text-xs text-white/60 mt-2">Join 12,000+ engineers and builders scaling automated workflows.</p>
              <div className="flex items-center gap-3 mt-3">
                <button
                  onClick={() => showToast('Connecting to Discord community...', 'info')}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                >
                  <Discord className="w-4 h-4" />
                </button>
                <button
                  onClick={() => showToast('GitHub repository: velcora-ai/core', 'info')}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                >
                  <Github className="w-4 h-4" />
                </button>
                <button
                  onClick={() => showToast('Twitter/X: @VelcoraAI', 'info')}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                >
                  <Twitter className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="mt-4 space-y-1 text-xs text-white/70">
              <a href="mailto:velcora.ai@gmail.com" className="block hover:text-white transition-colors">velcora.ai@gmail.com</a>
              <a href="tel:+919138278584" className="block hover:text-white transition-colors">+919138278584</a>
            </div>

            <div>
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 text-xs text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Back to top</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex items-center justify-between flex-wrap gap-4 text-xs text-white/50">
          <span>© {new Date().getFullYear()} Velcora AI, Inc. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer" onClick={() => showToast('Privacy Policy: Zero data logging on proxy payloads.', 'info')}>
              Privacy Policy
            </span>
            <span className="hover:text-white cursor-pointer" onClick={() => showToast('Terms of Service: Standard SaaS license.', 'info')}>
              Terms of Service
            </span>
            <span className="hover:text-white cursor-pointer" onClick={() => showToast('Security: SOC2 Type II Certified.', 'info')}>
              Security
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
