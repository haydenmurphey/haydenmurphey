'use client';

import { useState, useEffect } from 'react';
import { m } from 'framer-motion';

interface TypewriterAnimationProps {
  text: string;
  speed?: number;
  className?: string;
  showCursor?: boolean;
  loop?: boolean;
  delay?: number;
}

export default function TypewriterAnimation({
  text,
  speed = 100,
  className = '',
  showCursor = true,
  loop = true,
  delay = 0
}: TypewriterAnimationProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasStarted, setHasStarted] = useState(delay === 0);

  useEffect(() => {
    if (hasStarted) {
      return;
    }

    const delayTimeout = setTimeout(() => {
      setHasStarted(true);
    }, delay);

    return () => clearTimeout(delayTimeout);
  }, [delay, hasStarted]);

  useEffect(() => {
    if (!hasStarted) {
      return;
    }

    if (!loop && !isDeleting && currentIndex === text.length) {
      return;
    }

    if (!isDeleting && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        const nextIndex = currentIndex + 1;
        setDisplayText(text.slice(0, nextIndex));
        setCurrentIndex(nextIndex);
      }, speed);

      return () => clearTimeout(timeout);
    }

    if (!isDeleting && currentIndex === text.length) {
      if (!loop) {
        return;
      }

      const waitTimeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);

      return () => clearTimeout(waitTimeout);
    }

    if (isDeleting && currentIndex > 0) {
      const timeout = setTimeout(() => {
        const nextIndex = currentIndex - 1;
        setDisplayText(text.slice(0, nextIndex));
        setCurrentIndex(nextIndex);
      }, speed / 2);

      return () => clearTimeout(timeout);
    }

    if (isDeleting && currentIndex === 0) {
      if (!loop) {
        return;
      }

      const waitTimeout = setTimeout(() => {
        setIsDeleting(false);
        setCurrentIndex(0);
      }, 500);

      return () => clearTimeout(waitTimeout);
    }
  }, [currentIndex, hasStarted, isDeleting, loop, speed, text]);

  return (
    <div className={`inline-flex items-center ${className}`}>
      <m.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-mono text-cyber-cyan"
      >
        {displayText}
      </m.span>
      {showCursor && (
        <m.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
          className="ml-1 text-cyber-cyan font-mono"
        >
          |
        </m.span>
      )}
    </div>
  );
}
