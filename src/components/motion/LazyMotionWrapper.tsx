'use client';

import { LazyMotion, domAnimation, MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

/**
 * LazyMotion Wrapper Component
 * 
 * Performance optimizations:
 * - Reduces bundle size by ~80KB through tree-shaking unused Framer Motion features
 * - Only loads essential DOM animations (scale, opacity, x, y, rotate)
 * 
 * Accessibility:
 * - Respects prefers-reduced-motion system setting
 * - Automatically disables animations for users who prefer reduced motion
 * 
 * Benefits:
 * - Smaller initial bundle size
 * - Faster page load times
 * - Better accessibility for users with motion sensitivity
 * - Improved UX on slower networks
 * 
 * Usage: Wrap this at the root level (layout.tsx) or around sections using motion
 */

interface LazyMotionWrapperProps {
  children: ReactNode;
}

export function LazyMotionWrapper({ children }: LazyMotionWrapperProps) {
  // Initialize with 'never' to ensure consistent SSR/CSR rendering
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for user's motion preference only on client after hydration to prevent mismatch
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);

      // Listen for changes in motion preference
      const handleChange = (event: MediaQueryListEvent) => {
        setPrefersReducedMotion(event.matches);
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion={prefersReducedMotion ? 'always' : 'never'}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
