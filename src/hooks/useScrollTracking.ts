'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Throttle utility to limit function execution rate
 * Prevents excessive scroll event handler calls for better performance
 */
function throttle<T extends (...args: unknown[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  let timeoutId: NodeJS.Timeout | null = null;

  return function throttled(...args: Parameters<T>) {
    const now = Date.now();
    const timeSinceLastCall = now - lastCall;

    if (timeSinceLastCall >= delay) {
      lastCall = now;
      func(...args);
    } else {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        lastCall = Date.now();
        func(...args);
      }, delay - timeSinceLastCall);
    }
  };
}

/**
 * Custom hook for tracking scroll position and determining active section
 * 
 * Performance optimizations:
 * - Caches DOM elements to avoid repeated querySelector calls
 * - Uses throttling (100ms) to limit scroll handler executions
 * - Implements passive event listener for better scrolling performance
 * - Cleans up cached references on unmount
 * 
 * @param sectionIds - Array of section IDs to track
 * @param isActive - Whether scroll tracking should be active
 * @returns Current active section ID
 */
export function useScrollTracking(sectionIds: string[], isActive: boolean = true): string {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || 'home');
  
  // Cache DOM elements to avoid repeated queries
  const cachedSectionsRef = useRef<Map<string, HTMLElement>>(new Map());

  // Memoize scroll handler
  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY + window.innerHeight / 3;

    // Find active section efficiently (reverse loop for bottom-up check)
    for (let i = sectionIds.length - 1; i >= 0; i--) {
      const sectionId = sectionIds[i];
      const section = cachedSectionsRef.current.get(sectionId);
      
      if (section && section.offsetTop <= scrollPosition) {
        setActiveSection(sectionId);
        break;
      }
    }
  }, [sectionIds]);

  // Create throttled version once
  const throttledHandleScroll = useRef(throttle(handleScroll, 100));

  useEffect(() => {
    if (!isActive || sectionIds.length === 0) return;

    // Cache reference for cleanup
    const cachedSections = cachedSectionsRef.current;

    // Cache DOM elements on mount/update
    cachedSections.clear();
    sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        cachedSections.set(id, element);
      }
    });

    // Initial check
    handleScroll();

    // Add scroll listener with passive flag for better performance
    const scrollHandler = throttledHandleScroll.current;
    window.addEventListener('scroll', scrollHandler, { passive: true });

    return () => {
      window.removeEventListener('scroll', scrollHandler);
      cachedSections.clear();
    };
  }, [sectionIds, isActive, handleScroll]);

  return activeSection;
}
