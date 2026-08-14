import React from 'react';

interface LogoProps {
  className?: string;
  isDark?: boolean;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', isDark = false, showText = true }) => {
  return (
    <div className={`flex items-center gap-2.5 cursor-pointer select-none group ${className}`}>
      {/* Velcora brand logo (black mark on a white pill for visibility on dark hero) */}
      <div className="relative w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 transition-transform duration-300 group-hover:scale-105 rounded-lg bg-white p-1">
        <img
          src="/velcora-logo.png"
          alt="Velcora AI"
          className="w-full h-full object-contain drop-shadow-sm"
        />
      </div>

      {showText && (
        <span
          className={`font-serif italic text-xl sm:text-2xl tracking-tight transition-colors duration-500 ${
            isDark ? 'text-[#182C41]' : 'text-white'
          }`}
        >
          Velcora AI
        </span>
      )}
    </div>
  );
};
