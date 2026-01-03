/**
 * Navigation Configuration
 * Centralized navigation items for consistent routing across the application
 */

import { 
  Home, 
  Briefcase, 
  GraduationCap, 
  FolderGit2, 
  FileText, 
  Mail,
  Linkedin,
  Github,
  Twitter,
  FlaskConical
} from 'lucide-react';

export interface NavItem {
  id: string;
  icon: React.ElementType;
  label: string;
  href?: string;
  isExternal?: boolean;
}

/**
 * Main navigation items
 * Used in FloatingNav and mobile navigation
 */
export const NAV_ITEMS: NavItem[] = [
  { 
    id: 'home', 
    icon: Home, 
    label: 'Home', 
    href: '/' 
  },
  { 
    id: 'projects-preview', 
    icon: FolderGit2, 
    label: 'Projects', 
    href: '/projects' 
  },
  { 
    id: 'homelabs-preview', 
    icon: FlaskConical, 
    label: 'Home Labs', 
    href: '/homelabs' 
  },
  { 
    id: 'formation', 
    icon: GraduationCap, 
    label: 'Formation', 
    href: '/formation' 
  },
  { 
    id: 'experience', 
    icon: Briefcase, 
    label: 'Experience', 
    href: '/experience' 
  },
  { 
    id: 'blog-preview', 
    icon: FileText, 
    label: 'Blog', 
    href: '/blog' 
  },
  { 
    id: 'contact', 
    icon: Mail, 
    label: 'Contact', 
    href: '/contact' 
  },
];

/**
 * Social media links
 * Displayed in FloatingNav and footer
 */
export const SOCIAL_ITEMS: NavItem[] = [
  {
    id: 'linkedin',
    icon: Linkedin,
    label: 'LinkedIn',
    isExternal: true,
    href: 'https://linkedin.com/in/your-linkedin-username'
  },
  {
    id: 'github',
    icon: Github,
    label: 'GitHub',
    isExternal: true,
    href: 'https://github.com/yourusername'
  },
  {
    id: 'twitter',
    icon: Twitter,
    label: 'X (Twitter)',
    isExternal: true,
    href: 'https://twitter.com/yourusername'
  },
];

/**
 * Navigation configuration
 */
export const NAV_CONFIG = {
  // Scroll offset for active section detection (default value, can be calculated dynamically)
  scrollOffset: 300,
  
  // Smooth scroll behavior
  scrollBehavior: 'smooth' as ScrollBehavior,
  
  // Animation delays (in seconds)
  animationDelays: {
    baseDelay: 0.1,
    socialDelay: 0.15,
    themeDelay: 0.2,
  },
} as const;

/**
 * Get scroll offset dynamically based on viewport height
 * Use this in client components where window is available
 */
export function getScrollOffset(): number {
  if (typeof window === 'undefined') {
    return NAV_CONFIG.scrollOffset;
  }
  return window.innerHeight / 3;
}

/**
 * Get all navigation item IDs
 * Useful for scroll tracking
 */
export function getAllNavIds(): string[] {
  return NAV_ITEMS.map(item => item.id);
}

/**
 * Get navigation item by ID
 */
export function getNavItemById(id: string): NavItem | undefined {
  return NAV_ITEMS.find(item => item.id === id);
}

/**
 * Get social item by ID
 */
export function getSocialItemById(id: string): NavItem | undefined {
  return SOCIAL_ITEMS.find(item => item.id === id);
}
