import React from 'react';
import { ArrowUp } from 'lucide-react';
import { ElectricLogo } from './react-bits/ElectricLogo';
import { PROFILE_DATA } from '../data/profile';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/[0.06] bg-[#0c0c0f] py-10 px-4 z-10">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand info */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="flex items-center gap-3">
            <ElectricLogo showBadge={false} />
            <span className="text-neutral-400 font-mono text-xs">|</span>
            <span className="text-xs font-semibold text-neutral-300">{PROFILE_DATA.name}</span>
          </div>
          <p className="text-[11px] text-neutral-400 font-mono">
            {PROFILE_DATA.role} • Wonogiri, Indonesia
          </p>
        </div>

        {/* Copyright notice */}
        <div className="text-[11px] font-mono text-neutral-400 text-center flex flex-col items-center gap-0.5">
          <div>© 2026 {PROFILE_DATA.name}. All rights reserved.</div>
          <div className="text-[10px] text-neutral-400">
            Engineered with React Bits design patterns, Framer Motion & Tailwind CSS.
          </div>
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/20 text-neutral-400 hover:text-white transition-all flex items-center gap-2 text-xs font-mono group"
        >
          <span>Top</span>
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>

      </div>
    </footer>
  );
};
