import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValue, useVelocity, useAnimationFrame } from 'framer-motion';

function wrap(min, max, v) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

export const ScrollVelocity = ({
  texts = [],
  velocity = 4,
  className = '',
  numRows = 2
}) => {
  return (
    <div className={`overflow-hidden py-3 select-none relative ${className}`}>
      {/* Edge gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      {Array.from({ length: numRows }).map((_, i) => (
        <VelocityRow
          key={i}
          baseVelocity={i % 2 === 0 ? velocity : -velocity}
          items={texts}
          direction={i % 2 === 0 ? 1 : -1}
        />
      ))}
    </div>
  );
};

const VelocityRow = ({ items, baseVelocity = 4, direction = 1 }) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  useAnimationFrame((t, delta) => {
    let moveBy = direction * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) {
      direction = -1;
    } else if (velocityFactor.get() > 0) {
      direction = 1;
    }

    moveBy += direction * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="flex flex-nowrap whitespace-nowrap overflow-hidden my-1.5">
      <motion.div className="flex gap-6 items-center text-lg md:text-2xl font-mono tracking-wider font-medium text-neutral-400" style={{ x }}>
        {items.concat(items).concat(items).map((item, index) => (
          <span
            key={index}
            className="flex items-center gap-4 px-4 py-1.5 rounded-full border border-white/[0.05] bg-white/[0.02] hover:text-white hover:border-white/20 transition-colors duration-200"
          >
            <span>{item}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
          </span>
        ))}
      </motion.div>
    </div>
  );
};
