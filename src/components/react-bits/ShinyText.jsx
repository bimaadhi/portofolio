import React from 'react';

/**
 * ShinyText Component (React Bits Pattern)
 * Creates a subtle light-sweeping shimmer across text.
 */
export const ShinyText = ({ text, disabled = false, speed = 5, className = '' }) => {
  const animationDuration = `${speed}s`;

  return (
    <span
      className={`inline-block text-[#b5b5b5a4] bg-clip-text ${
        disabled ? '' : 'animate-shine'
      } ${className}`}
      style={{
        backgroundImage:
          'linear-gradient(120deg, rgba(255, 255, 255, 0) 35%, rgba(255, 255, 255, 0.9) 50%, rgba(255, 255, 255, 0) 65%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        animationDuration: animationDuration,
      }}
    >
      {text}
    </span>
  );
};
