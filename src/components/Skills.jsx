import React from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Server,
  Layers,
  Palette,
  FileCode,
  Atom,
  Globe,
  Sparkles,
  Flame,
  Network,
  Database,
  Move,
  PlayCircle,
  Smartphone,
  GitBranch,
  Terminal,
  Image as ImageIcon
} from 'lucide-react';
import { IconGithub } from './SocialIcons';
import { ScrollFloat } from './react-bits/ScrollFloat';
import { ShinyText } from './react-bits/ShinyText';
import { ScrollVelocity } from './react-bits/ScrollVelocity';
import { FluidGlass } from './react-bits/FluidGlass';
import { SKILLS_DATA, MARQUEE_SKILLS } from '../data/skills';

const ICON_MAP = {
  Code2,
  Palette,
  FileCode,
  Atom,
  Globe,
  Sparkles,
  Server,
  Flame,
  Network,
  Database,
  Layers,
  Move,
  PlayCircle,
  Smartphone,
  GitBranch,
  Github: IconGithub,
  Terminal,
  Image: ImageIcon,
  Figma: Palette
};

export const Skills = () => {
  return (
    <section id="skills" className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center md:text-left mb-12">
          <ScrollFloat>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-widest px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 mb-3">
              <span>04 / Capabilities</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Skills & <ShinyText text="Tooling" speed={5} />
            </h2>
          </ScrollFloat>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {SKILLS_DATA.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
            >
              <FluidGlass className="p-6 h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1 flex items-center justify-between">
                    <span>{cat.category}</span>
                    <span className="text-[11px] font-mono text-neutral-400 bg-white/[0.03] px-2.5 py-0.5 rounded-full border border-white/[0.06]">
                      {cat.skills.length}
                    </span>
                  </h3>
                  <p className="text-xs text-neutral-400 mb-5">
                    {cat.description}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {cat.skills.map((skill, sIdx) => {
                      const IconComponent = ICON_MAP[skill.icon] || Code2;
                      return (
                        <div
                          key={sIdx}
                          className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/20 hover:bg-white/[0.05] transition-all duration-200 flex items-center gap-2.5 group cursor-default"
                        >
                          <IconComponent className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-colors" />
                          <span className="text-xs font-medium text-neutral-300 group-hover:text-white transition-colors truncate">
                            {skill.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </FluidGlass>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Marquee Ticker */}
      <div className="mt-4 pt-8 border-t border-white/[0.06]">
        <ScrollVelocity
          texts={MARQUEE_SKILLS}
          velocity={3}
          numRows={2}
          className="opacity-75"
        />
      </div>
    </section>
  );
};
