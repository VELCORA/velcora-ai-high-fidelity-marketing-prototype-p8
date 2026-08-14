import React from 'react';
import { X, Sparkles, CheckCircle2, ShieldCheck, Zap, Layers, Compass, Users } from 'lucide-react';
import { Logo } from './Logo';

interface InfoModalProps {
  activeSection: string | null;
  onClose: () => void;
  onConfirmEarlyAccess?: (email: string) => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ activeSection, onClose }) => {
  if (!activeSection || activeSection === 'home') return null;

  return (
    <div
      id="info-modal-backdrop"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in"
    >
      <div
        id="info-modal-card"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg liquid-glass border border-white/20 rounded-3xl p-6 sm:p-8 text-white shadow-2xl overflow-hidden font-sans-ui"
      >
        {/* Close Button */}
        <button
          id="close-info-modal-btn"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <Logo isDark={false} showText={false} />
          <div>
            <span className="text-xs uppercase tracking-widest text-white/50 font-medium">
              Velcora AI Suite
            </span>
            <h3 className="font-serif italic text-2xl sm:text-3xl text-white">
              {activeSection === 'how-it-works' && 'How It Works'}
              {activeSection === 'features' && 'Core Capabilities'}
              {activeSection === 'pricing' && 'Membership & Access'}
              {activeSection === 'community' && 'Creator Network'}
              {activeSection === 'early-access' && 'Early Access Status'}
              {activeSection === 'get-started' && 'Begin Your Journey'}
            </h3>
          </div>
        </div>

        {/* Dynamic Modal Content */}
        <div className="text-white/80 text-sm sm:text-base leading-relaxed space-y-4">
          {activeSection === 'how-it-works' && (
            <div className="space-y-3.5">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                <Compass className="w-5 h-5 text-amber-300 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white font-medium text-sm">1. Ambient Resonance</h4>
                  <p className="text-white/70 text-xs mt-0.5">
                    Select tailored soundscapes and live spatial backgrounds calibrated to your cognitive wavelength.
                  </p>
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                <Layers className="w-5 h-5 text-sky-300 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white font-medium text-sm">2. Frictionless State Engine</h4>
                  <p className="text-white/70 text-xs mt-0.5">
                    Filter out background chatter, notification queues, and context switching with one click.
                  </p>
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                <Zap className="w-5 h-5 text-emerald-300 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white font-medium text-sm">3. Deep Output Calibration</h4>
                  <p className="text-white/70 text-xs mt-0.5">
                    Achieve unbroken deep work blocks and recover mental stamina effortlessly.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'features' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 text-white font-medium mb-1">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Cinematic Layers</span>
                </div>
                <p className="text-white/60">Ultra high-definition atmospheric visual feeds that ground your workspace.</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 text-white font-medium mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-300" />
                  <span>Noise Dampening</span>
                </div>
                <p className="text-white/60">Dynamic shielding that prevents cognitive fatigue and task interruption.</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 text-white font-medium mb-1">
                  <Layers className="w-4 h-4 text-cyan-300" />
                  <span>Liquid Glass UI</span>
                </div>
                <p className="text-white/60">Translucent optics engineered with optimal optical contrast and depth.</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 text-white font-medium mb-1">
                  <Zap className="w-4 h-4 text-violet-300" />
                  <span>Instant Switching</span>
                </div>
                <p className="text-white/60">Seamless crossfade transitions between Golden Hour, Still Water, Deep Woods & Dawn.</p>
              </div>
            </div>
          )}

          {activeSection === 'pricing' && (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-white/10 border border-white/20">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-white font-serif italic text-xl">Pioneer Edition</span>
                  <span className="text-white text-lg font-medium">$0 <span className="text-xs text-white/60 font-sans-ui">/ early beta</span></span>
                </div>
                <p className="text-white/70 text-xs mb-3">Full access to 4 dynamic scenes, ambient engines, and early intelligence features.</p>
                <ul className="space-y-1.5 text-xs text-white/80">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Unlimited cinematic 4K video environments</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Cross-platform sync & mobile experience</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Zero distraction promise</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeSection === 'community' && (
            <div className="space-y-3">
              <p className="text-white/80 text-sm">
                Join over 12,000+ creators, developers, designers, and deep thinkers reclaiming their flow state.
              </p>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                <Users className="w-8 h-8 text-amber-300 flex-shrink-0" />
                <div>
                  <h4 className="text-white text-sm font-medium">Velcora Creators Circle</h4>
                  <p className="text-white/60 text-xs mt-0.5">
                    Weekly deep work sessions, ambient music exchanges, and productivity ritual logs.
                  </p>
                </div>
              </div>
            </div>
          )}

          {(activeSection === 'get-started' || activeSection === 'early-access') && (
            <div className="space-y-4 text-center py-2">
              <div className="w-12 h-12 rounded-full bg-white/10 mx-auto flex items-center justify-center text-white">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              </div>
              <p className="text-white/90 text-sm">
                Your spot in the Velcora AI clarity wave has been reserved. Check your inbox for private invitation links and soundscape access keys.
              </p>
            </div>
          )}
        </div>

        {/* Modal Action Footer */}
        <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
          <button
            id="modal-acknowledge-btn"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-white text-black hover:bg-white/90 font-medium text-sm rounded-full transition-all duration-200 active:scale-95 shadow-md cursor-pointer"
          >
            {activeSection === 'get-started' || activeSection === 'early-access'
              ? 'Got It'
              : 'Explore App'}
          </button>
        </div>
      </div>
    </div>
  );
};
