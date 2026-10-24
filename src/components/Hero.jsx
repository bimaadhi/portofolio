import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Code2, Sparkles, Terminal } from 'lucide-react';
import { TechText } from './react-bits/TechText';
import { ShinyText } from './react-bits/ShinyText';
import { ScrollFloat } from './react-bits/ScrollFloat';
import { SpecularButton } from './react-bits/SpecularButton';
import { PROFILE_DATA } from '../data/profile';

export const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
        
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-neutral-300 mb-8 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <ShinyText text="AVAILABLE FOR NEW OPPORTUNITIES" speed={5} />
        </motion.div>

        {/* Subtitle / Role Tag */}
        <ScrollFloat scrollDelay={0.1}>
          <div className="flex items-center justify-center gap-2 text-xs md:text-sm font-mono uppercase tracking-widest text-neutral-400 mb-4">
            <Terminal className="w-3.5 h-3.5 text-neutral-400" />
            <span className="text-neutral-200 font-medium">{PROFILE_DATA.role}</span>
            <span className="text-neutral-400">•</span>
            <span>CREATIVE DEVELOPER</span>
          </div>
        </ScrollFloat>

        {/* Hero Main Name Display */}
        <ScrollFloat scrollDelay={0.15}>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.08] select-none">
            <span className="block text-neutral-100">
              <TechText text="Bima Adhi" speed={28} />
            </span>
            <span className="block text-neutral-300 font-light">
              <TechText text="Parawangsa" speed={32} />
            </span>
          </h1>
        </ScrollFloat>

        {/* Tagline */}
        <ScrollFloat scrollDelay={0.25}>
          <p className="max-w-xl mx-auto text-base sm:text-lg text-neutral-400 leading-relaxed font-normal mb-10">
            "{PROFILE_DATA.tagline}"
          </p>
        </ScrollFloat>

        {/* Call to Actions (Specular Buttons) */}
        <ScrollFloat scrollDelay={0.35}>
          <div className="flex flex-wrap items-center justify-center gap-3 w-full">
            <SpecularButton
              href="#projects"
              variant="primary"
              className="px-6 py-3 text-sm font-medium"
            >
              <Code2 className="w-4 h-4" />
              <span>View Selected Work</span>
            </SpecularButton>

            <SpecularButton
              href="#contact"
              variant="glass"
              className="px-6 py-3 text-sm font-medium"
            >
              <span>Get in Touch</span>
            </SpecularButton>
          </div>
        </ScrollFloat>

        {/* Floating Quick Metric Pills */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14 grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 w-full max-w-2xl"
        >
          {PROFILE_DATA.stats.map((stat, i) => (
            <div
              key={i}
              className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-col items-center justify-center text-center hover:border-white/15 transition-colors"
            >
              <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">{stat.label}</span>
              <span className="text-sm font-medium text-neutral-200 mt-1">
                {stat.value}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Scroll down indicator */}
        <a
          href="#about"
          className="mt-12 flex flex-col items-center gap-1.5 text-[11px] font-mono text-neutral-400 hover:text-neutral-200 transition-colors group"
        >
          <span>DISCOVER</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-neutral-400" />
        </a>

      </div>
    </section>
  );
};
