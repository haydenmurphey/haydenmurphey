/**
 * NavButton Component
 * Reusable navigation button with tooltip and active state
 */

'use client';

import { m } from 'framer-motion';
import { type NavItem } from '@/config/constants/navigation';

interface NavButtonProps {
  item: NavItem;
  isActive: boolean;
  index: number;
  staggerDelay: number;
  onClick: () => void;
}

export function NavButton({ item, isActive, index, staggerDelay, onClick }: NavButtonProps) {
  const Icon = item.icon;
  
  return (
    <m.button
      onClick={onClick}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * staggerDelay }}
      className={`
        relative group p-3 rounded-xl transition-all duration-300
        ${isActive
          ? 'bg-cyber-cyan text-cyber-dark shadow-neon-cyan'
          : 'text-cyber-gray-light hover:text-cyber-cyan hover:bg-cyber-navy/50'
        }
      `}
      aria-label={item.label}
      aria-current={isActive ? 'page' : undefined}
    >
      <Icon size={20} />

      {/* Tooltip - Shows on hover regardless of active state */}
      <span 
        className={`
          absolute right-full mr-4 top-1/2 -translate-y-1/2 
          px-3 py-2 rounded-lg text-sm whitespace-nowrap 
          opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none
          ${isActive 
            ? 'bg-cyber-dark border border-cyber-cyan/50 text-cyber-cyan' 
            : 'bg-cyber-dark border border-cyber-cyan/30 text-cyber-gray-light'
          }
        `}
      >
        {item.label}
      </span>
    </m.button>
  );
}
