/**
 * SocialIcons Component
 * Social media icon links (desktop only)
 */

'use client';

import { Github, Linkedin, Twitter } from 'lucide-react';
import { socialConfig } from '@/config/social.config';

export function SocialIcons() {
  return (
    <div className="hidden lg:flex items-center gap-2">
      <a
        href={socialConfig.linkedin.url}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 rounded-lg bg-cyber-teal-dark border border-cyber-cyan/20 flex items-center justify-center text-cyber-cyan hover:border-cyber-cyan hover:shadow-neon-cyan transition-all duration-300"
        aria-label={socialConfig.linkedin.label}
      >
        <Linkedin size={18} />
      </a>
      <a
        href={socialConfig.github.url}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 rounded-lg bg-cyber-teal-dark border border-cyber-gray/20 flex items-center justify-center text-cyber-gray-light hover:border-cyber-gray-light hover:text-white hover:shadow-glow-cyan transition-all duration-300"
        aria-label={socialConfig.github.label}
      >
        <Github size={18} />
      </a>
      <a
        href={socialConfig.twitter.url}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 rounded-lg bg-cyber-teal-dark border border-blue-400/20 flex items-center justify-center text-blue-400 hover:border-blue-400 hover:shadow-neon-blue transition-all duration-300"
        aria-label={socialConfig.twitter.label}
      >
        <Twitter size={18} />
      </a>
    </div>
  );
}
