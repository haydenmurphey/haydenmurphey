/**
 * FloatingNav Component
 * Refactored following SOLID principles
 * - Single Responsibility: Each sub-component handles one concern
 * - Open/Closed: Easy to extend with new navigation types
 * - Dependency Inversion: Depends on abstractions (hooks, constants)
 */

'use client';

import { memo } from 'react';
import { m } from 'framer-motion';
import { NAV_ITEMS, SOCIAL_ITEMS, getAllNavIds } from '@/config/constants/navigation';
import { NAV_ANIMATION, ANIMATION_DELAYS } from '@/config/constants/animations';
import { useNavigation } from '@/hooks/useNavigation';
import { useScrollTracking } from '@/hooks/useScrollTracking';
import { NavButton, SocialLink, NavDivider } from './FloatingNav-parts/index';

function FloatingNav() {
  const { scrollToSection, isHome } = useNavigation();
  const activeSection = useScrollTracking(getAllNavIds(), isHome);

  const handleNavClick = (id: string, href?: string) => {
    scrollToSection(id, href);
  };

  return (
    <m.nav
      {...NAV_ANIMATION.container}
      className="fixed inset-y-0 right-8 z-50 hidden lg:flex flex-col justify-center gap-2"
      aria-label="Main navigation"
    >
      <div className="flex flex-col gap-2 bg-cyber-teal-dark/80 backdrop-blur-md border border-cyber-cyan/20 rounded-2xl p-3">
        {/* Main Navigation */}
        {NAV_ITEMS.map((item, index) => (
          <NavButton
            key={item.id}
            item={item}
            isActive={activeSection === item.id}
            index={index}
            staggerDelay={ANIMATION_DELAYS.small}
            onClick={() => handleNavClick(item.id, item.href)}
          />
        ))}

        <NavDivider />

        {/* Social Links */}
        {SOCIAL_ITEMS.map((item, index) => (
          <SocialLink
            key={item.id}
            item={item}
            index={index}
            staggerDelay={ANIMATION_DELAYS.small}
            baseIndex={NAV_ITEMS.length}
          />
        ))}
      </div>
    </m.nav>
  );
}

// Performance: Export memoized component to prevent unnecessary re-renders
export default memo(FloatingNav);
