/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback } from 'react';
import { BackgroundVideos } from './components/BackgroundVideos';
import { Navbar } from './components/Navbar';
import { HeroContent } from './components/HeroContent';
import { ScraperStudio } from './components/ScraperStudio';
import { FocusStation } from './components/FocusStation';
import { AutomationBuilder } from './components/AutomationBuilder';
import { PricingSection } from './components/PricingSection';
import { CommunitySection } from './components/CommunitySection';
import { Footer } from './components/Footer';
import { ToastProvider, useToast } from './components/Toast';
import { InfoModal } from './components/InfoModal';

function AppContent() {
  const { showToast } = useToast();
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeModalSection, setActiveModalSection] = useState<string | null>(null);
  const [activeScraperUrl, setActiveScraperUrl] = useState<string>('https://techcrunch.com/category/artificial-intelligence');

  // Video switching logic with 1000ms cooldown
  const handleVideoSwitch = useCallback(
    (index: number) => {
      if (index === activeVideoIndex || isTransitioning) {
        return;
      }
      setIsTransitioning(true);
      setActiveVideoIndex(index);

      // 1000ms cooldown matching crossfade duration
      setTimeout(() => {
        setIsTransitioning(false);
      }, 1000);
    },
    [activeVideoIndex, isTransitioning]
  );

  const handleOpenSection = (sectionId: string) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
      showToast(`Navigated to ${sectionId.replace('-', ' ')}`, 'info');
    } else {
      setActiveModalSection(sectionId);
    }
  };

  const handleGetStarted = () => {
    const scraperElem = document.getElementById('scraper-studio');
    if (scraperElem) {
      scraperElem.scrollIntoView({ behavior: 'smooth' });
      showToast('Welcome to Velcora Studio! Enter a URL to test live extraction.', 'success');
    } else {
      setActiveModalSection('get-started');
    }
  };

  const handleRecipeLoaded = (url: string) => {
    setActiveScraperUrl(url);
    const scraperElem = document.getElementById('scraper-studio');
    if (scraperElem) {
      scraperElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-black text-white font-sans-ui selection:bg-white selection:text-black">
      {/* SECTION 1: CINEMATIC HERO & AMBIENCE (Fullscreen) */}
      <section
        id="home"
        className="relative w-full min-h-screen overflow-hidden bg-black flex flex-col justify-between select-none"
      >
        {/* Background Videos (z-0) & Animated PNG Overlay (z-10) */}
        <BackgroundVideos activeVideoIndex={activeVideoIndex} />

        {/* Content Layer (z-20) - Flex Column Full Height */}
        <div className="relative z-20 flex flex-col justify-between w-full h-full min-h-screen">
          {/* Navigation Bar */}
          <Navbar
            onOpenSection={handleOpenSection}
            onGetStarted={handleGetStarted}
          />

          {/* Hero Content (Centered with 3D Parallax & Dark Mode Transition on 3rd video index 2) */}
          <HeroContent
            activeVideoIndex={activeVideoIndex}
            onVideoSwitch={handleVideoSwitch}
            isTransitioning={isTransitioning}
            onEarlyAccessSubmitted={(email) => {
              showToast(`Early access reserved for ${email}!`, 'success');
            }}
          />
        </div>
      </section>

      {/* SECTION 2: LIVE WEB SCRAPER & INTELLIGENCE STUDIO */}
      <ScraperStudio initialUrl={activeScraperUrl} />

      {/* SECTION 3: DEEP FOCUS & COGNITIVE WORK STATION */}
      <FocusStation
        onSelectVideo={handleVideoSwitch}
        activeVideoIndex={activeVideoIndex}
      />

      {/* SECTION 4: VISUAL WORKFLOW AUTOMATION BUILDER */}
      <AutomationBuilder />

      {/* SECTION 5: INTERACTIVE PRICING & CHECKOUT */}
      <PricingSection />

      {/* SECTION 6: COMMUNITY HUB & AUTOMATION RECIPES */}
      <CommunitySection onSelectRecipe={handleRecipeLoaded} />

      {/* SECTION 7: LUXURY FOOTER & SYSTEM HEALTH TELEMETRY */}
      <Footer onOpenSection={handleOpenSection} />

      {/* Interactive Modal for Fallback Quick Dialogs */}
      <InfoModal
        activeSection={activeModalSection}
        onClose={() => setActiveModalSection(null)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}
