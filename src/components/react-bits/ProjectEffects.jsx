import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { SpecularButton } from './SpecularButton';

/**
 * ProjectCard Component
 * Editorial, high-end developer showcase card featuring project screenshot,
 * tech stack tags, and modal detail expander.
 */
export const ProjectCard = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <div className="group rounded-2xl overflow-hidden bg-[#121216]/80 border border-white/[0.08] hover:border-white/20 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-black/60">
        <div>
          {/* Project Screenshot Container */}
          {project.image && (
            <div className="relative aspect-video w-full overflow-hidden bg-neutral-900 border-b border-white/[0.06]">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121216] via-transparent to-transparent opacity-60" />
              <div className="absolute top-3 right-3">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-mono tracking-wider font-semibold uppercase bg-neutral-900/90 text-neutral-200 border border-white/10 backdrop-blur-md">
                  {project.badge}
                </span>
              </div>
            </div>
          )}

          {/* Card Body */}
          <div className="p-6">
            <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-2">
              {project.stats.category}
            </div>

            {/* Project Title */}
            <h3 className="text-xl font-bold text-white group-hover:text-neutral-200 transition-colors mb-2.5 flex items-center justify-between">
              <span>{project.title}</span>
              <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
            </h3>

            {/* Project Description */}
            <p className="text-neutral-400 text-sm leading-relaxed mb-5">
              {project.description}
            </p>

            {/* Tech stack badges */}
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs font-mono rounded-md bg-white/[0.04] text-neutral-300 border border-white/[0.06]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button Row */}
        <div className="p-6 pt-0 border-t border-transparent flex items-center gap-3">
          {project.liveUrl && (
            <SpecularButton
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              className="px-4 py-2 text-xs font-medium"
            >
              <span>Live Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </SpecularButton>
          )}

          <SpecularButton
            onClick={() => setIsExpanded(true)}
            variant="glass"
            className="px-4 py-2 text-xs font-medium"
          >
            <span>Overview</span>
          </SpecularButton>
        </div>
      </div>

      {/* Modal Detail View */}
      <AnimatePresence>
        {isExpanded && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-2xl bg-[#141418] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Modal screenshot preview */}
              {project.image && (
                <div className="aspect-video w-full rounded-xl overflow-hidden border border-white/10 mb-6 bg-neutral-950">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              )}

              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                    {project.role}
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-1">
                    {project.title}
                  </h3>
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="py-6 space-y-4 text-neutral-300 text-sm md:text-base leading-relaxed">
                <p>{project.longDescription || project.description}</p>

                <div className="bg-neutral-900/60 rounded-xl p-4 border border-white/5 space-y-2">
                  <div className="text-xs font-mono text-neutral-400 uppercase">Architecture & Tech Stack</div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {project.technologies.map((t, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded bg-white/5 text-xs font-mono text-neutral-200">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="text-xs text-neutral-400 font-mono">Platform</div>
                    <div className="text-sm font-semibold text-white">{project.stats.platform}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="text-xs text-neutral-400 font-mono">Status</div>
                    <div className="text-sm font-semibold text-neutral-200">{project.stats.status}</div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <SpecularButton
                  onClick={() => setIsExpanded(false)}
                  variant="glass"
                  className="px-5 py-2 text-xs"
                >
                  Close
                </SpecularButton>
                {project.liveUrl && (
                  <SpecularButton
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="primary"
                    className="px-5 py-2 text-xs"
                  >
                    <span>Visit Live Site</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </SpecularButton>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
