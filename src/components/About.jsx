import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, GraduationCap, Compass, CheckCircle2 } from 'lucide-react';
import { ScrollFloat } from './react-bits/ScrollFloat';
import { ShinyText } from './react-bits/ShinyText';
import { FluidGlass } from './react-bits/FluidGlass';
import { ProfileVisual } from './react-bits/ProfileVisual';
import { PROFILE_DATA } from '../data/profile';

export const About = () => {
  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center md:text-left mb-14">
          <ScrollFloat>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-widest px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 mb-3">
              <span>01 / Background</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              About <ShinyText text="Bima Adhi Parawangsa" speed={5} />
            </h2>
          </ScrollFloat>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Profile Visual (Portrait Photo) */}
          <div className="lg:col-span-5 flex justify-center">
            <ProfileVisual
              imageSrc={PROFILE_DATA.profileImage}
              name={PROFILE_DATA.name}
              role={PROFILE_DATA.role}
              location={PROFILE_DATA.location}
            />
          </div>

          {/* Editorial Biography & Core Highlights */}
          <div className="lg:col-span-7 space-y-5">
            <FluidGlass className="p-6 md:p-8 space-y-6">
              
              <div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                  Informatics Engineering Student & Creative Developer
                </h3>
                <p className="text-neutral-400 leading-relaxed text-sm md:text-base">
                  {PROFILE_DATA.bio}
                </p>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
                    <GraduationCap className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Academic Status</span>
                  </div>
                  <div className="text-sm font-medium text-white">
                    {PROFILE_DATA.status}
                  </div>
                  <div className="text-xs text-neutral-400">
                    Duta Bangsa University
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Location</span>
                  </div>
                  <div className="text-sm font-medium text-white">
                    {PROFILE_DATA.location}
                  </div>
                  <div className="text-xs text-neutral-400">
                    Central Java, Indonesia
                  </div>
                </div>
              </div>

              {/* Core Interests */}
              <div>
                <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2.5">
                  Core Engineering Interests:
                </div>
                <div className="flex flex-wrap gap-2">
                  {PROFILE_DATA.interests.map((interest, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs font-mono text-neutral-300"
                    >
                      <CheckCircle2 className="w-3 h-3 text-neutral-400" />
                      <span>{interest}</span>
                    </span>
                  ))}
                </div>
              </div>

            </FluidGlass>
          </div>

        </div>

      </div>
    </section>
  );
};
