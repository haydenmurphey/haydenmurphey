'use client';

import { useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';

/**
 * Custom hook for handling navigation logic with smooth scrolling
 * Provides unified navigation for both routing and scrolling
 */
export function useNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === '/';

  /**
   * Scrolls to a section or navigates to a different page
   * @param sectionId - ID of the section to scroll to
   * @param href - Optional href for navigation
   */
  const scrollToSection = useCallback((sectionId: string, href?: string) => {
    // If we have an href and we're NOT on home, navigate to the page
    if (href && !isHome && href !== '/') {
      router.push(href);
      return;
    }
    
    // If we have an href pointing to home and we're NOT on home, navigate there
    if (href === '/' && !isHome) {
      router.push('/');
      return;
    }
    
    // If we're on home page, always scroll to the section (don't navigate)
    if (isHome) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }
    
    // Fallback: just scroll to element if it exists
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isHome, router]);

  return {
    scrollToSection,
    isHome,
    pathname,
  };
}
