/**
 * ThemeToggle Component
 * Theme switcher button with icon and tooltip
 */

'use client';

import { Moon, Sun } from 'lucide-react';
import { m } from 'framer-motion';

interface ThemeToggleProps {
  isDark: boolean;
  index: number;
  staggerDelay: number;
  onClick: () => void;
}

export function ThemeToggle({ isDark, index, staggerDelay, onClick }: ThemeToggleProps) {
  return (
    <m.button
      onClick={onClick}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * staggerDelay }}
      className="relative group p-3 rounded-xl text-cyber-gray-light hover:text-cyber-cyan hover:bg-cyber-navy/50 transition-all duration-300"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}

      {/* Tooltip */}
      <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-2 bg-cyber-dark border border-cyber-cyan/30 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {isDark ? 'Light Mode' : 'Dark Mode'}
      </span>
    </m.button>
  );
}
