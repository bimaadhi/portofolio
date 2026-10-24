import React, { useRef, useState } from 'react';

/**
 * FluidGlass Component
 * Minimal dark card with subtle white specular hover spotlight.
 */
export const FluidGlass = ({
  children,
  className = "",
  borderColor = "rgba(255, 255, 255, 0.08)",
  interactive = true
}) => {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!interactive || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative rounded-2xl overflow-hidden bg-[#121216]/80 backdrop-blur-xl border border-white/[0.08] transition-all duration-300 ${className}`}
      style={{
        borderColor: isHovered ? 'rgba(255, 255, 255, 0.2)' : borderColor,
      }}
    >
      {/* Specular Radial Glow following cursor */}
      {interactive && isHovered && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-200 z-0"
          style={{
            background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.04), transparent 70%)`,
          }}
        />
      )}

      {/* Card Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
