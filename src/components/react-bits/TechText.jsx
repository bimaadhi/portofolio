import React, { useEffect, useState } from 'react';

/**
 * TechText Component (React Bits Pattern)
 * Cyberpunk/Tech decipher text reveal effect for names and monograms.
 */
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>-_\\/[]{}—=+*^?#";

export const TechText = ({
  text,
  className = "",
  speed = 40,
  hoverTrigger = true
}) => {
  const [displayText, setDisplayText] = useState(text);

  const triggerAnimation = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((letter, index) => {
            if (letter === " ") return " ";
            if (index < iteration) {
              return text[index];
            }
            return LETTERS[Math.floor(Math.random() * LETTERS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 2;
    }, speed);
  };

  useEffect(() => {
    triggerAnimation();
  }, [text]);

  return (
    <span
      onMouseEnter={hoverTrigger ? triggerAnimation : undefined}
      className={`inline-block font-mono cursor-default ${className}`}
      data-value={text}
    >
      {displayText}
    </span>
  );
};
