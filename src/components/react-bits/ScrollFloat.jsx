import React from 'react';
import { motion } from 'framer-motion';

/**
 * ScrollFloat Component (React Bits Pattern)
 * Smooth floating entry effect for headings and section labels on scroll.
 */
export const ScrollFloat = ({
  children,
  animationDuration = 0.8,
  ease = [0.16, 1, 0.3, 1],
  scrollDelay = 0.1,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: animationDuration,
        delay: scrollDelay,
        ease: ease,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
