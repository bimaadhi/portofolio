import React, { useState } from 'react';

/**
 * ElectricLogo Component
 * Features the custom geometric star/rhombus brand logo uploaded by Bima.
 */
export const ElectricLogo = ({
  className = "",
  showBadge = true
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`inline-flex items-center gap-3 cursor-pointer select-none group ${className}`}
    >
      {/* Logo container */}
      <div className="relative w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 group-hover:border-white/30 flex items-center justify-center p-1.5 transition-all duration-300 group-hover:bg-white/[0.08]">
        <img
          src="/images/logo.png"
          alt="Bima Adhi Parawangsa Logo"
          className="w-full h-full object-contain filter invert contrast-200 transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col">
        <span className="font-semibold text-sm tracking-tight text-neutral-100 group-hover:text-white transition-colors">
          Bima Adhi Parawangsa
        </span>
        {showBadge && (
          <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
            Portfolio
          </span>
        )}
      </div>
    </div>
  );
};
