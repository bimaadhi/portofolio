import React from 'react';
import { motion } from 'framer-motion';
import { ScrollFloat } from './react-bits/ScrollFloat';
import { ShinyText } from './react-bits/ShinyText';
import { ProjectCard } from './react-bits/ProjectEffects';
import { PROJECTS_DATA } from '../data/projects';

export const Projects = () => {
  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center md:text-left mb-14">
          <ScrollFloat>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-widest px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 mb-3">
              <span>05 / Works</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Featured <ShinyText text="Projects" speed={5} />
            </h2>
            <p className="text-neutral-400 text-sm md:text-base mt-2 max-w-lg">
              Live production web applications, educational platforms, and interactive digital experiences.
            </p>
          </ScrollFloat>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS_DATA.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="h-full"
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
