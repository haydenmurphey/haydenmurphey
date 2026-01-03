/**
 * Header Component
 * Refactored following SOLID principles
 * - Single Responsibility: Each sub-component handles one concern
 * - Open/Closed: Easy to extend with new navigation types
 * - Dependency Inversion: Depends on hooks and config abstractions
 */

'use client';

import { useState } from 'react';
import { m } from 'framer-motion';
import { ANIMATION_DURATIONS } from '@/config/constants/animations';
import { useHeaderNavigation } from '@/hooks/useHeaderNavigation';
import { DesktopNav, SocialIcons, MobileMenuButton, MobileMenu } from './Header-parts/index';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { navLinks } = useHeaderNavigation();

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <m.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: ANIMATION_DURATIONS.smooth }}
      className="fixed top-0 left-0 right-0 z-40 bg-cyber-dark/90 backdrop-blur-md border-b border-cyber-cyan/10"
    >
      <nav className="container mx-auto px-6 py-4 flex items-center justify-center relative">
        {/* Desktop Navigation - Centered */}
        <DesktopNav links={navLinks} />

        {/* Right side: Social + Mobile Menu - Absolute positioned */}
        <div className="absolute right-6 flex items-center gap-4">
          <SocialIcons />
          <MobileMenuButton isOpen={isMenuOpen} onClick={handleMenuToggle} />
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMenuOpen} links={navLinks} onClose={handleMenuClose} />
    </m.header>
  );
}
