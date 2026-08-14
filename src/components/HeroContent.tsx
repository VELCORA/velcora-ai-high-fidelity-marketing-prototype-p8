import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { VIDEO_DATA } from './BackgroundVideos';

interface HeroContentProps {
  activeVideoIndex: number;
  onVideoSwitch: (index: number) => void;
  isTransitioning: boolean;
  onEarlyAccessSubmitted: (email: string) => void;
}

export const HeroContent: React.FC<HeroContentProps> = ({
  activeVideoIndex,
  onVideoSwitch,
  isTransitioning,
  onEarlyAccessSubmitted,
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // 3D Parallax tilt state (smooth 60-120fps using lerp & RAF)
  const heroCardRef = useRef<HTMLDivElement | null>(null);
  const targetTilt = useRef({ x: 0, y: 0 });
  const currentTilt = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized mouse position from window center (-1 to 1)
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;

      // Soft 3D rotation angles (subtle luxury aesthetic)
      targetTilt.current = {
        x: -ny * 4.5, // rotateX in deg
        y: nx * 5.5,  // rotateY in deg
      };
    };

    const handleMouseLeave = () => {
      targetTilt.current = { x: 0, y: 0 };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    // Smooth animation loop using linear interpolation
    const updateMotion = () => {
      currentTilt.current.x += (targetTilt.current.x - currentTilt.current.x) * 0.08;
      currentTilt.current.y += (targetTilt.current.y - currentTilt.current.y) * 0.08;

      if (heroCardRef.current) {
        heroCardRef.current.style.transform = `perspective(1000px) rotateX(${currentTilt.current.x.toFixed(2)}deg) rotateY(${currentTilt.current.y.toFixed(2)}deg) translateZ(0)`;
      }

      rafId.current = requestAnimationFrame(updateMotion);
    };

    rafId.current = requestAnimationFrame(updateMotion);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  // 3rd video (index 2) triggers dark mode for hero content with 700ms duration
  const isDarkHero = activeVideoIndex === 2;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    setErrorMsg('');
    setIsSubmitted(true);
    onEarlyAccessSubmitted(email);
  };

  return (
    <div className="flex-1 flex flex-col justify-between items-center px-4 sm:px-6 md:px-10 text-center z-20 w-full max-w-6xl mx-auto">
      {/* Spacer for vertical balance */}
      <div className="h-2 sm:h-4" />

      {/* Main Hero Center Container with 3D Tilt */}
      <div
        ref={heroCardRef}
        style={{
          willChange: 'transform',
          transformStyle: 'preserve-3d',
        }}
        className="flex flex-col items-center justify-center my-auto w-full transition-[color] duration-700"
      >
        {/* Badge */}
        <div
          id="hero-badge"
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 sm:mb-6 text-xs sm:text-sm font-sans-ui tracking-wide transition-all duration-700 cursor-default shadow-sm ${
            isDarkHero
              ? 'liquid-glass-dark text-[#182C41] border-[#182C41]/20'
              : 'liquid-glass text-white/90 border-white/15'
          }`}
        >
          <Sparkles className={`w-3.5 h-3.5 ${isDarkHero ? 'text-[#182C41]' : 'text-amber-300'}`} />
          <span>Over 10,000 minds already finding their clarity</span>
        </div>

        {/* Hero Heading: Instrument Serif, line break after "Endlessly" */}
        <h1
          id="hero-heading"
          className={`font-serif text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.1] max-w-4xl tracking-tight transition-colors duration-700 drop-shadow-md select-none ${
            isDarkHero ? 'text-[#182C41]' : 'text-white'
          }`}
        >
          Clarity in an Endlessly <br className="hidden sm:inline" />
          Noisy Universe
        </h1>

        {/* Subtext: System-UI font */}
        <p
          id="hero-subtext"
          className={`mt-5 sm:mt-6 font-sans-ui text-sm sm:text-base md:text-lg max-w-xl leading-relaxed transition-colors duration-700 px-2 sm:px-0 drop-shadow-sm select-none ${
            isDarkHero ? 'text-[#182C41]/85 font-medium' : 'text-white/85'
          }`}
        >
          Rise above the chaos of pings, infinite scrolling, and relentless demands. Discover how
          to protect your presence and create with intention.
        </p>

        {/* Email Input: Liquid Glass Rounded-Full Pill */}
        <div className="mt-7 sm:mt-9 w-full flex flex-col items-center">
          {!isSubmitted ? (
            <form
              id="early-access-form"
              onSubmit={handleSubmit}
              className={`w-full max-w-[320px] sm:max-w-md p-1.5 pl-4 sm:pl-5 rounded-full flex items-center justify-between gap-2 border transition-all duration-700 shadow-2xl ${
                isDarkHero
                  ? 'liquid-glass-dark border-[#182C41]/25 text-[#182C41]'
                  : 'liquid-glass border-white/20 text-white'
              }`}
            >
              <input
                id="email-input-field"
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="Your Best Email"
                className={`bg-transparent outline-none flex-1 font-sans-ui text-sm sm:text-base transition-colors duration-700 min-w-0 ${
                  isDarkHero
                    ? 'text-[#182C41] placeholder-[#182C41]/55'
                    : 'text-white placeholder-white/50'
                }`}
              />
              <button
                id="submit-early-access-btn"
                type="submit"
                className={`flex-shrink-0 font-sans-ui font-medium text-xs sm:text-sm px-4 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all duration-300 active:scale-95 flex items-center gap-1.5 shadow-lg cursor-pointer whitespace-nowrap ${
                  isDarkHero
                    ? 'bg-[#182C41] text-white hover:bg-[#182C41]/90'
                    : 'bg-white text-black hover:bg-white/90'
                }`}
              >
                <span>Get Early Access</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          ) : (
            <div
              id="early-access-success-pill"
              className={`w-full max-w-[320px] sm:max-w-md p-3 px-6 rounded-full flex items-center justify-center gap-2 border transition-all duration-700 shadow-xl ${
                isDarkHero
                  ? 'liquid-glass-dark border-[#182C41]/30 text-[#182C41]'
                  : 'liquid-glass border-white/20 text-white'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="font-sans-ui text-xs sm:text-sm font-medium">
                You're on the priority list! Welcome aboard.
              </span>
            </div>
          )}

          {errorMsg && (
            <p className="mt-2 text-xs font-sans-ui text-rose-300 tracking-wide">{errorMsg}</p>
          )}
        </div>

        {/* Video Switcher: Row of 4 text buttons with smooth active indicator */}
        <div
          id="video-switcher-controls"
          aria-label="Ambiance Video Selector"
          className="mt-8 sm:mt-10 flex items-center justify-center flex-wrap gap-4 sm:gap-8 font-sans-ui text-xs sm:text-sm"
        >
          {VIDEO_DATA.map((video, idx) => {
            const isActive = activeVideoIndex === idx;
            return (
              <button
                key={video.id}
                id={`video-switcher-btn-${video.id}`}
                disabled={isTransitioning}
                onClick={() => onVideoSwitch(idx)}
                className={`pb-1.5 font-medium transition-all duration-700 cursor-pointer relative ${
                  isActive
                    ? isDarkHero
                      ? 'text-[#182C41] border-b-2 border-[#182C41] opacity-100 font-semibold'
                      : 'text-white border-b-2 border-white opacity-100 font-semibold'
                    : isDarkHero
                    ? 'text-[#182C41] opacity-50 border-b-2 border-transparent hover:opacity-80'
                    : 'text-white opacity-50 border-b-2 border-transparent hover:opacity-80'
                } ${isTransitioning ? 'cursor-not-allowed opacity-40' : 'active:scale-95'}`}
              >
                {video.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Stats: Pushed to bottom via flex layout */}
      {/* Note: Navbar and bottom stats remain white always as specified */}
      <footer className="w-full pb-6 pt-4 font-sans-ui z-20">
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-6 text-white/75 text-xs sm:text-sm tracking-wide text-center drop-shadow-sm select-none">
          <span className="whitespace-nowrap font-normal">60+ Deep Sessions</span>
          <span className="hidden sm:inline text-white/30">|</span>
          <span className="whitespace-nowrap font-normal">12,000+ Creators</span>
          <span className="hidden sm:inline text-white/30">|</span>
          <span className="whitespace-nowrap font-normal">4.8 User Satisfaction</span>
          <span className="hidden sm:inline text-white/30">|</span>
          <span className="whitespace-nowrap font-normal">Intentional-First Design</span>
        </div>
      </footer>
    </div>
  );
};

