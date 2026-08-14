import React, { useState } from 'react';
import { Sparkles, ArrowRight, Download, Users, Star, GitFork, BookOpen } from 'lucide-react';
import { useToast } from './Toast';

interface Recipe {
  id: string;
  title: string;
  category: 'E-Commerce' | 'Intelligence' | 'Engineering' | 'Research';
  description: string;
  author: string;
  stars: number;
  runs: string;
  targetUrl: string;
}

const RECIPES: Recipe[] = [
  {
    id: 'r1',
    title: 'Shopify / Amazon Price & Stock Velocity Tracker',
    category: 'E-Commerce',
    description: 'Tracks product variant pricing, estimated stock count, and shipping timelines with structured JSON output.',
    author: 'Alex Rivera (Growth Lead)',
    stars: 482,
    runs: '18.4k runs',
    targetUrl: 'https://store.apple.com/us/shop/buy-mac/macbook-pro',
  },
  {
    id: 'r2',
    title: 'Hacker News & arXiv Daily Autonomous Digest',
    category: 'Research',
    description: 'Aggregates top ranking ML & Agentic systems research papers, summarizing abstract and code links.',
    author: 'Elena Rostova (AI Lab)',
    stars: 894,
    runs: '42.1k runs',
    targetUrl: 'https://news.ycombinator.com',
  },
  {
    id: 'r3',
    title: 'TechCrunch AI Funding & Seed Rounds Harvester',
    category: 'Intelligence',
    description: 'Monitors venture announcements, extraction of round size, lead investors, and technical thesis.',
    author: 'Marcus Chen (Ventures)',
    stars: 620,
    runs: '29.3k runs',
    targetUrl: 'https://techcrunch.com/category/artificial-intelligence',
  },
  {
    id: 'r4',
    title: 'GitHub Trending TypeScript Ecosystem Audit',
    category: 'Engineering',
    description: 'Pulls repository stars delta, open issues velocity, and core dependencies automatically.',
    author: 'Sarah Jenkins (DevRel)',
    stars: 730,
    runs: '35.0k runs',
    targetUrl: 'https://github.com/trending/typescript',
  },
];

export const CommunitySection: React.FC<{ onSelectRecipe?: (url: string) => void }> = ({ onSelectRecipe }) => {
  const { showToast } = useToast();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'E-Commerce', 'Intelligence', 'Engineering', 'Research'];

  const filtered =
    activeCategory === 'All'
      ? RECIPES
      : RECIPES.filter((r) => r.category === activeCategory);

  const handleUseRecipe = (recipe: Recipe) => {
    if (onSelectRecipe) {
      onSelectRecipe(recipe.targetUrl);
    }
    const scraperElem = document.getElementById('scraper-studio');
    if (scraperElem) {
      scraperElem.scrollIntoView({ behavior: 'smooth' });
    }
    showToast(`Loaded recipe: "${recipe.title}" into Studio!`, 'success');
  };

  return (
    <section id="community" className="relative w-full py-20 px-4 sm:px-8 md:px-14 bg-[#030609] text-white z-20 font-sans-ui border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full liquid-glass border border-white/15 text-xs text-sky-300 mb-3.5">
            <Users className="w-3.5 h-3.5" />
            <span>Community Automation Hub</span>
          </div>
          <h2 className="font-serif italic text-3xl sm:text-5xl text-white tracking-tight">
            Curated Community Recipes
          </h2>
          <p className="mt-3 text-white/70 text-sm sm:text-base leading-relaxed">
            Fork battle-tested automation templates created by top engineers, researchers, and venture intelligence teams.
          </p>

          {/* Category Filter Pills */}
          <div className="mt-6 flex items-center justify-center flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-white text-black font-semibold shadow-md'
                    : 'liquid-glass text-white/70 hover:text-white border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((recipe) => (
            <div
              key={recipe.id}
              className="liquid-glass border border-white/15 rounded-3xl p-6 flex flex-col justify-between hover:border-white/30 transition-all duration-300 shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-white/10">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/10 text-white/80 border border-white/10">
                    {recipe.category}
                  </span>
                  <div className="flex items-center gap-3 text-xs text-white/50">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                      {recipe.stars}
                    </span>
                    <span>{recipe.runs}</span>
                  </div>
                </div>

                <h3 className="font-serif italic text-xl sm:text-2xl text-white mt-4">
                  {recipe.title}
                </h3>
                <p className="text-white/70 text-xs sm:text-sm mt-2 leading-relaxed">
                  {recipe.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between flex-wrap gap-3">
                <span className="text-xs text-white/50">By {recipe.author}</span>
                <button
                  onClick={() => handleUseRecipe(recipe)}
                  className="px-4 py-2 rounded-full bg-white text-black hover:bg-white/90 text-xs font-medium flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer shadow-md"
                >
                  <GitFork className="w-3.5 h-3.5" />
                  <span>Load into Studio</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
