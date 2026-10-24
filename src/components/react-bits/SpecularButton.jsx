import React, { useRef, useState } from 'react';

/**
 * SpecularButton Component
 * Modern minimalist action button with subtle white light highlight.
 */
export const SpecularButton = ({
  children,
  onClick,
  href,
  variant = 'primary', // 'primary' | 'secondary' | 'glass'
  className = '',
  target,
  rel,
  ...props
}) => {
  const buttonRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const baseStyles =
    "relative inline-flex items-center justify-center font-medium rounded-xl overflow-hidden transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-white/20 select-none text-sm";

  const variants = {
    primary:
      "bg-white text-black font-semibold hover:bg-neutral-200 shadow-md",
    secondary:
      "bg-neutral-900 text-neutral-200 border border-white/10 hover:border-white/20 hover:text-white hover:bg-neutral-800",
    glass:
      "bg-white/[0.05] backdrop-blur-md text-neutral-300 border border-white/10 hover:border-white/25 hover:text-white hover:bg-white/[0.09]"
  };

  const Content = (
    <div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
      onClick={onClick}
      {...props}
    >
      {/* Dynamic Specular Light Glow */}
      {isHovered && variant !== 'primary' && (
        <span
          className="pointer-events-none absolute -inset-px transition-opacity duration-200"
          style={{
            background: `radial-gradient(100px circle at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, 0.12), transparent 80%)`,
          }}
        />
      )}

      {/* Content wrapper */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </div>
  );

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className="inline-block">
        {Content}
      </a>
    );
  }

  return Content;
};
