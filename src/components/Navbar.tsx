import React, { useState } from 'react';
import { Menu, X, Volume2, VolumeX } from 'lucide-react';
import { Logo } from './Logo';
import { ambientAudio } from '../utils/audio';

interface NavbarProps {
  onOpenSection: (section: string) => void;
  onGetStarted: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSection, onGetStarted }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);

  const navLinks = [
    { name: 'Scraper Studio', id: 'scraper-studio' },
    { name: 'Deep Focus', id: 'focus-station' },
    { name: 'Workflows', id: 'automation-builder' },
    { name: 'Pricing', id: 'pricing' },
    { name: 'Community', id: 'community' },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onOpenSection(id);
  };

  const handleToggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    const playing = ambientAudio.toggle();
    setIsAudioActive(playing);
  };

  return (
    <>
      <header className="w-full flex items-center justify-between px-6 sm:px-10 md:px-14 py-6 z-20">
        {/* Left: Brand Logo & Name in italic */}
        <div onClick={() => onOpenSection('home')} id="navbar-brand">
          <Logo isDark={false} />
        </div>

        {/* Right Desktop (md+): Liquid Glass Pill */}
        <nav
          id="desktop-nav-pill"
          className="hidden md:flex items-center gap-2 p-1.5 pl-6 pr-1.5 rounded-full liquid-glass border border-white/15 shadow-xl"
        >
          <div className="flex items-center gap-6 mr-1 font-sans-ui">
            {navLinks.map((link) => (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => handleLinkClick(link.id)}
                className="text-white/90 hover:text-white text-sm font-medium tracking-normal transition-colors duration-200 cursor-pointer whitespace-nowrap"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Ambient Soundscape Toggle */}
          <button
            id="ambient-sound-toggle-btn"
            onClick={handleToggleAudio}
            title={isAudioActive ? 'Mute ambient soundscape' : 'Enable ambient soundscape'}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
              isAudioActive
                ? 'bg-white/20 text-emerald-300 ring-1 ring-emerald-400/40'
                : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            {isAudioActive ? (
              <Volume2 className="w-4 h-4 animate-pulse text-emerald-300" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          <button
            id="desktop-get-started-btn"
            onClick={onGetStarted}
            className="bg-white text-black hover:bg-white/90 text-sm font-sans-ui font-medium px-5 py-2 rounded-full transition-all duration-200 active:scale-95 shadow-sm whitespace-nowrap cursor-pointer"
          >
            Get Started
          </button>
        </nav>

        {/* Right Mobile (below md): Ambient Audio + Liquid glass hamburger button */}
        <div className="md:hidden z-50 flex items-center gap-2.5">
          <button
            id="mobile-sound-toggle-btn"
            onClick={handleToggleAudio}
            title={isAudioActive ? 'Mute ambient soundscape' : 'Enable ambient soundscape'}
            className={`w-10 h-10 rounded-full liquid-glass border border-white/15 flex items-center justify-center transition-all duration-300 cursor-pointer ${
              isAudioActive ? 'text-emerald-300 bg-white/15' : 'text-white/80'
            }`}
          >
            {isAudioActive ? (
              <Volume2 className="w-4 h-4 animate-pulse text-emerald-300" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          <button
            id="mobile-menu-toggle-btn"
            aria-label="Toggle Navigation Menu"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="relative w-11 h-11 rounded-full liquid-glass border border-white/15 flex items-center justify-center text-white cursor-pointer active:scale-95 transition-transform"
          >
            <div className="relative w-5 h-5 flex items-center justify-center">
              {/* Menu Icon */}
              <span
                className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out ${
                  mobileMenuOpen
                    ? 'opacity-0 rotate-90 scale-75 pointer-events-none'
                    : 'opacity-100 rotate-0 scale-100'
                }`}
              >
                <Menu className="w-5 h-5 text-white" />
              </span>

              {/* X Icon */}
              <span
                className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out ${
                  mobileMenuOpen
                    ? 'opacity-100 rotate-0 scale-100'
                    : 'opacity-0 -rotate-90 scale-75 pointer-events-none'
                }`}
              >
                <X className="w-5 h-5 text-white" />
              </span>
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-overlay"
          className="fixed inset-0 z-40 bg-black/75 backdrop-blur-md flex flex-col items-center justify-center p-6 md:hidden animate-fade-in"
          style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
        >
          <div className="flex flex-col items-center text-center gap-7 font-sans-ui">
            {navLinks.map((link, idx) => (
              <button
                key={link.id}
                id={`mobile-nav-link-${link.id}`}
                onClick={() => handleLinkClick(link.id)}
                style={{
                  animationDelay: `${100 + idx * 50}ms`,
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                className="text-white text-3xl font-serif italic tracking-wide hover:text-white/80 transition-all duration-500 transform translate-y-0 opacity-100 active:scale-95"
              >
                {link.name}
              </button>
            ))}

            <div
              style={{
                animationDelay: '300ms',
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              className="mt-6 pt-6 border-t border-white/10 w-48 flex justify-center"
            >
              <button
                id="mobile-get-started-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onGetStarted();
                }}
                className="w-full bg-white text-black hover:bg-white/90 text-base font-sans-ui font-medium px-6 py-3 rounded-full transition-all duration-300 transform scale-100 active:scale-95 shadow-lg"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

