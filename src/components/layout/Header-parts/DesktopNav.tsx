/**
 * DesktopNav Component
 * Desktop navigation menu with centered links
 */

'use client';

import Link from 'next/link';

interface NavLink {
  href: string;
  label: string;
  isAnchor: boolean;
}

interface DesktopNavProps {
  links: NavLink[];
}

export function DesktopNav({ links }: DesktopNavProps) {
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    // Extract section ID from href (remove #)
    const sectionId = href.replace('#', '');
    const element = document.getElementById(sectionId);
    
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="hidden lg:flex items-center gap-8">
      {links.map((link) =>
        link.isAnchor ? (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => handleAnchorClick(e, link.href)}
            className="text-cyber-gray-light hover:text-cyber-cyan transition-colors duration-300 relative group cursor-pointer"
          >
            {link.label}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyber-cyan group-hover:w-full transition-all duration-300" />
          </a>
        ) : (
          <Link
            key={link.href}
            href={link.href}
            className="text-cyber-gray-light hover:text-cyber-cyan transition-colors duration-300 relative group"
          >
            {link.label}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyber-cyan group-hover:w-full transition-all duration-300" />
          </Link>
        )
      )}
    </div>
  );
}
