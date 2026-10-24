import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle2, Building2 } from 'lucide-react';
import { ScrollFloat } from './react-bits/ScrollFloat';
import { ShinyText } from './react-bits/ShinyText';
import { FluidGlass } from './react-bits/FluidGlass';
import { EXPERIENCE_DATA } from '../data/experience';

export const Experience = () => {
  return (
    <section id="experience" className="py-24 px-4 relative">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center md:text-left mb-14">
          <ScrollFloat>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-widest px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 mb-3">
              <span>03 / Experience</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Work & <ShinyText text="Roles" speed={5} />
            </h2>
          </ScrollFloat>
        </div>

        {/* Experience Cards */}
        <div className="space-y-6">
          {EXPERIENCE_DATA.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
            >
              <FluidGlass className="p-6 md:p-8">
                {/* Header row */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4 pb-4 border-b border-white/[0.06]">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-300 px-2.5 py-0.5 rounded bg-white/[0.04] border border-white/10 mr-2">
                      {exp.type}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-2 group-hover:text-neutral-200 transition-colors">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-1.5 text-sm font-medium text-neutral-400 mt-1">
                      <Building2 className="w-4 h-4 text-neutral-400" />
                      <span>{exp.company}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 self-start md:self-auto px-3 py-1 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                    <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm md:text-base text-neutral-300 leading-relaxed mb-5">
                  {exp.description}
                </p>

                {/* Highlights */}
                {exp.highlights && (
                  <div className="mb-5 space-y-2">
                    {exp.highlights.map((highlight, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2.5 text-xs md:text-sm text-neutral-400">
                        <CheckCircle2 className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Technologies used */}
                <div className="pt-4 border-t border-white/[0.06]">
                  <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-2">
                    Tech Stack:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 text-xs font-mono rounded-md bg-white/[0.03] text-neutral-300 border border-white/[0.06]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

              </FluidGlass>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
