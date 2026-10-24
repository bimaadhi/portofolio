import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { ScrollFloat } from './react-bits/ScrollFloat';
import { ShinyText } from './react-bits/ShinyText';
import { FluidGlass } from './react-bits/FluidGlass';
import { EDUCATION_DATA } from '../data/education';

export const Education = () => {
  return (
    <section id="education" className="py-24 px-4 relative">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center md:text-left mb-14">
          <ScrollFloat>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-widest px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 mb-3">
              <span>02 / Education</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Academic <ShinyText text="Background" speed={5} />
            </h2>
          </ScrollFloat>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 md:pl-8 border-l border-white/[0.08] space-y-10">
          {EDUCATION_DATA.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative group"
            >
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[31px] md:-left-[39px] top-6 w-3.5 h-3.5 rounded-full bg-neutral-900 border-2 border-neutral-400 group-hover:scale-125 group-hover:border-white group-hover:bg-white transition-all duration-200" />

              <FluidGlass className="p-6 md:p-7">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-neutral-300 bg-white/[0.03] border border-white/10">
                    <Calendar className="w-3 h-3 text-neutral-400" />
                    <span>{edu.period}</span>
                  </span>

                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-white/[0.02] text-neutral-400 border border-white/[0.06]">
                    {edu.degree}
                  </span>
                </div>

                <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-neutral-200 transition-colors">
                  {edu.institution}
                </h3>

                <div className="text-sm font-medium text-neutral-300 mt-1 mb-2.5">
                  {edu.major}
                </div>

                <p className="text-sm text-neutral-400 leading-relaxed">
                  {edu.description}
                </p>
              </FluidGlass>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
