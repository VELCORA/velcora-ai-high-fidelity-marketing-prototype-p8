import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Sparkles, Zap, Lock } from 'lucide-react';
import { useToast } from './Toast';

interface CheckoutModalProps {
  plan: {
    name: string;
    price: number;
    billing: 'monthly' | 'annual';
  } | null;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ plan, onClose }) => {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!plan) return null;

  const discount = couponApplied ? 0.2 : 0;
  const basePrice = plan.billing === 'annual' ? plan.price * 12 * 0.8 : plan.price;
  const finalPrice = (basePrice * (1 - discount)).toFixed(2);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (coupon.trim().toUpperCase() === 'VELCORA20' || coupon.trim().toUpperCase() === 'BETA') {
      setCouponApplied(true);
      showToast('20% Pioneer Discount Applied!', 'success');
    } else {
      showToast('Invalid coupon code. Try "VELCORA20"', 'error');
    }
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      showToast(`Welcome to Velcora ${plan.name}! Account activated.`, 'success');
    }, 1200);
  };

  return (
    <div
      id="checkout-modal-backdrop"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in font-sans-ui"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg liquid-glass border border-white/20 rounded-3xl p-6 sm:p-8 text-white shadow-2xl overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {!isSuccess ? (
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-300 uppercase tracking-wider font-semibold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Instant Activation</span>
            </div>
            <h3 className="font-serif italic text-2xl sm:text-3xl text-white">
              Upgrade to {plan.name}
            </h3>
            <p className="text-white/60 text-xs sm:text-sm mt-1">
              Billed {plan.billing === 'annual' ? 'Annually (Save 20%)' : 'Monthly'}. Instant API keys & unlimited concurrency.
            </p>

            {/* Plan Summary Box */}
            <div className="mt-5 p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div>
                <span className="font-medium text-sm text-white">{plan.name} Tier</span>
                <div className="text-xs text-white/50 mt-0.5">
                  {plan.price === 0 ? 'Full Free Beta Access' : 'Dedicated High-Speed Proxies + AI API'}
                </div>
              </div>
              <div className="text-right">
                <span className="font-serif italic text-2xl text-white">
                  ${finalPrice}
                </span>
                <span className="text-xs text-white/50 block">
                  {plan.price === 0 ? '/forever' : plan.billing === 'annual' ? '/year' : '/mo'}
                </span>
              </div>
            </div>

            {/* Checkout Form */}
            <form onSubmit={handleCheckout} className="mt-5 space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-white/70 mb-1">Work Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="founder@company.com"
                  className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-white/40 outline-none focus:border-white/40"
                />
              </div>

              {plan.price > 0 && (
                <div className="rounded-xl bg-amber-500/10 border border-amber-400/20 px-3.5 py-2.5 text-[11px] text-amber-200/90">
                  Demo checkout — live payments activate when Stripe is connected. No card is charged in this preview.
                </div>
              )}

              {/* Coupon Row */}
              {plan.price > 0 && (
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Coupon (e.g. VELCORA20)"
                    className="flex-1 bg-black/40 border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white placeholder-white/40 outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="px-3 py-1.5 rounded-xl text-xs bg-white/10 hover:bg-white/20 text-white font-medium transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3 rounded-full bg-white text-black hover:bg-white/90 font-medium text-sm flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer shadow-xl"
                >
                  {isProcessing ? (
                    <span>Securing Subscription...</span>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>{plan.price === 0 ? 'Start Free Workspace' : `Complete Order — $${finalPrice}`}</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-white/50 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Demo preview • no real payment is processed</span>
              </div>
            </form>
          </div>
        ) : (
          /* Success Receipt View */
          <div className="text-center py-4 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="font-serif italic text-3xl text-white">Workspace Reserved!</h3>
            <p className="text-white/70 text-sm max-w-sm mx-auto leading-relaxed">
              Your Velcora <span className="text-white font-semibold">{plan.name}</span> workspace is now ready. API keys and soundscapes unlocked.
            </p>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 font-mono text-xs text-left text-sky-200">
              <div>Status: <span className="text-emerald-400">Workspace Reserved (Demo)</span></div>
              <div className="mt-1">Plan: <span className="text-white">{plan.name}</span></div>
              <div className="mt-1">Next: <span className="text-white">Connect Stripe to enable live billing</span></div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-full bg-white text-black hover:bg-white/90 font-medium text-sm transition-transform active:scale-95 cursor-pointer shadow-lg mt-2"
            >
              Enter Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
