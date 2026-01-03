'use client';

import { m } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  description?: string;
  icon?: LucideIcon;
  iconColor?: string;
  seeMoreLink?: string;
  seeMoreText?: string;
}

export default function SectionTitle({
  title,
  subtitle,
  description,
  icon: Icon,
  iconColor = 'text-cyber-cyan',
  seeMoreLink,
  seeMoreText = 'View More'
}: SectionTitleProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      {/* Subtitle */}
      {subtitle && (
        <m.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={`${iconColor} font-mono text-sm mb-4 tracking-widest uppercase`}
        >
          {subtitle}
        </m.p>
      )}

      {/* Title with Icon and See More button */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-6">
        {Icon && (
          <m.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Icon className={`${iconColor} hidden md:block`} size={48} />
          </m.div>
        )}

        <h2 className="text-4xl md:text-5xl font-bold text-white">
          {title}
        </h2>

        {seeMoreLink && (
          <Link
            href={seeMoreLink}
            className={`hidden md:inline-flex items-center gap-2 px-6 py-3 bg-${iconColor.split('-')[1]}/10 border border-${iconColor.split('-')[1]}/30 rounded-lg ${iconColor} hover:bg-${iconColor.split('-')[1]}/20 transition-all duration-300 group whitespace-nowrap`}
          >
            <span className="font-mono text-sm">{seeMoreText}</span>
            <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        )}
      </div>

      {/* Description */}
      {description && (
        <p className="text-cyber-gray-light text-lg max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      )}

      {/* See More button - Mobile */}
      {seeMoreLink && (
        <div className="flex justify-center mt-6 md:hidden">
          <Link
            href={seeMoreLink}
            className={`inline-flex items-center gap-2 px-6 py-3 ${iconColor} border border-current rounded-lg hover:bg-current/10 transition-all duration-300 group`}
          >
            <span className="font-mono text-sm">{seeMoreText}</span>
            <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      )}

      {/* Decorative Line */}
      <m.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-8 mx-auto w-24 h-1 bg-gradient-to-r from-transparent via-cyber-cyan to-transparent"
      />
    </m.div>
  );
}
