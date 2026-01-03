/**
 * useHeaderNavigation Hook
 * Manages navigation links based on current page
 */

'use client';

import { usePathname } from 'next/navigation';

export interface NavLink {
  href: string;
  label: string;
  isAnchor: boolean;
}

/**
 * Returns navigation links appropriate for current page
 * Home page uses anchor links, other pages use absolute paths
 */
export function useHeaderNavigation() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  const getNavLinks = (): NavLink[] => {
    if (isHome) {
      return [
        { href: '#home', label: 'Home', isAnchor: true },
        { href: '/about', label: 'About', isAnchor: false },
        { href: '#projects-preview', label: 'Projects', isAnchor: true },
        { href: '#homelabs-preview', label: 'Home Labs', isAnchor: true },
        { href: '#formation', label: 'Formation', isAnchor: true },
        { href: '#experience', label: 'Experience', isAnchor: true },
        { href: '/blog', label: 'Blog', isAnchor: false },
        { href: '#contact', label: 'Contact', isAnchor: true },
      ];
    }

    return [
      { href: '/', label: 'Home', isAnchor: false },
      { href: '/about', label: 'About', isAnchor: false },
      { href: '/projects', label: 'Projects', isAnchor: false },
  { href: '/homelabs', label: 'Home Labs', isAnchor: false },
      { href: '/formation', label: 'Formation', isAnchor: false },
      { href: '/experience', label: 'Experience', isAnchor: false },
      { href: '/blog', label: 'Blog', isAnchor: false },
      { href: '/contact', label: 'Contact', isAnchor: false },
    ];
  };

  return {
    navLinks: getNavLinks(),
    isHome,
    pathname,
  };
}
