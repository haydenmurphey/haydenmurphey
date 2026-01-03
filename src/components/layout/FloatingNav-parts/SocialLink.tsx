/**
 * SocialLink Component
 * Reusable social media link with tooltip
 */

'use client';

import { m } from 'framer-motion';
import { type NavItem } from '@/config/constants/navigation';

interface SocialLinkProps {
  item: NavItem;
  index: number;
  staggerDelay: number;
  baseIndex: number;
}

export function SocialLink({ item, index, staggerDelay, baseIndex }: SocialLinkProps) {
  const Icon = item.icon;
  const totalDelay = (baseIndex + index) * staggerDelay;
  
  return (
    <m.a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: totalDelay }}
      className="relative group p-3 rounded-xl text-cyber-gray-light hover:text-cyber-green hover:bg-cyber-navy/50 transition-all duration-300"
      aria-label={item.label}
    >
      <Icon size={20} />

      {/* Tooltip */}
      <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-2 bg-cyber-dark border border-cyber-green/30 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {item.label}
      </span>
    </m.a>
  );
}
