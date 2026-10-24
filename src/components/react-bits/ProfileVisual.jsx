import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MapPin, ShieldCheck, ArrowUpRight } from 'lucide-react';

/**
 * ProfileVisual Component
 * Displays Bima's authentic portrait photo with subtle editorial framing,
 * minimal perspective physics, and badge metadata.
 */
export const ProfileVisual = ({
  imageSrc = "/images/profile-me.jpeg",
  name = "Bima Adhi Parawangsa",
  role = "Informatics Engineering Student",
  location = "Surakarta, Indonesia",
}) => {
  // Gentle tilt physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['6deg', '-6deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-6deg', '6deg']);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-2">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        className="w-full max-w-[340px] md:max-w-[380px] rounded-2xl p-4 bg-[#141418] border border-white/[0.08] shadow-2xl relative overflow-hidden group"
      >
        {/* Subtle corner accent */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.03] rounded-full blur-xl pointer-events-none" />

        {/* Real Portrait Photo */}
        <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden border border-white/[0.08] bg-neutral-950">
          <img
            src={imageSrc}
            alt={name}
            className="w-full h-full object-cover object-center filter contrast-[1.02] brightness-95 group-hover:scale-[1.02] transition-transform duration-700 ease-out"
          />
          {/* Subtle bottom gradient vignette for text legibility */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
            <div>
              <div className="text-xs font-semibold tracking-tight">{name}</div>
              <div className="text-[11px] text-neutral-400 font-mono">{role}</div>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-neutral-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available</span>
            </div>
          </div>
        </div>

        {/* Meta Bar */}
        <div className="mt-4 px-1 flex items-center justify-between text-xs font-mono text-neutral-400">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-neutral-400" />
            <span>{location}</span>
          </span>
          <span className="text-neutral-400">Informatics Engineering</span>
        </div>
      </motion.div>
    </div>
  );
};
