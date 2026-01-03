/**
 * MobileMenuButton Component
 * Toggle button for mobile navigation
 */

'use client';

import { Menu, X } from 'lucide-react';

interface MobileMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export function MobileMenuButton({ isOpen, onClick }: MobileMenuButtonProps) {
  return (
    <button
      onClick={onClick}
      className="lg:hidden p-2 text-cyber-cyan hover:bg-cyber-teal-dark rounded-lg transition-colors"
      aria-label="Toggle menu"
      aria-expanded={isOpen}
    >
      {isOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  );
}
