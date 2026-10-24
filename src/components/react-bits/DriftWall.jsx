import React from 'react';
import { motion } from 'framer-motion';

/**
 * DriftWall Component
 * Tasteful subtle architectural grid and extremely soft vignette.
 * Zero neon glow or distracting artifacts.
 */
export const DriftWall = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Precision architectural dot grid */}
      <div 
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      {/* Very faint, elegant monochrome atmospheric lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[600px] h-[400px] bg-white/[0.015] rounded-full blur-[160px] pointer-events-none" />
    </div>
  );
};
