'use client';

import { m } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface SectionFooterProps {
  icon?: LucideIcon;
  iconColor?: string;
  seeMoreLink?: string;
  seeMoreText?: string;
}

export default function SectionFooter({
  icon: Icon,
  iconColor = 'text-cyber-cyan',
  seeMoreLink,
  seeMoreText = 'View Complete Details'
}: SectionFooterProps) {
  return (
    <div className="mt-16">
      {/* See More Button - Mobile Only */}
      {seeMoreLink && (
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12 md:hidden"
        >
          <Link
            href={seeMoreLink}
            className={`inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyber-cyan to-cyber-green text-cyber-dark font-bold rounded-lg hover:shadow-neon-cyan hover:scale-105 transition-all duration-300 group`}
          >
            {seeMoreText}
            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </m.div>
      )}

      {/* Decorative Footer */}
      <m.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="flex justify-center items-center gap-4"
      >
        <div className={`h-px w-16 bg-gradient-to-r from-transparent to-${iconColor.split('-')[1]}/30`} />
        {Icon && <Icon className={`${iconColor}/50`} size={24} />}
        <div className={`h-px w-16 bg-gradient-to-l from-transparent to-${iconColor.split('-')[1]}/30`} />
      </m.div>
    </div>
  );
}
