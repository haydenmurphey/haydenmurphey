'use client';

import { memo, useMemo } from 'react';
import { m } from 'framer-motion';
import Link from 'next/link';
import { Activity, ArrowRight, Beaker, Clock, ShieldAlert } from 'lucide-react';
import type { HomelabMetadata } from '@/lib/homelabs';

interface HomelabPreviewClientProps {
  labs: HomelabMetadata[];
}

interface LabCardProps {
  lab: HomelabMetadata;
  index: number;
}

const LabCard = memo(function LabCard({ lab, index }: LabCardProps) {
  const objectives = useMemo(() => lab.objectives.slice(0, 3), [lab.objectives]);

  return (
    <m.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group h-full"
    >
      <div className="flex flex-col h-full bg-cyber-teal-dark/40 backdrop-blur-sm border border-cyber-cyan/20 rounded-xl overflow-hidden hover:border-cyber-green/40 hover:shadow-glow-green/40 transition-all">
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-center justify-between mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-cyber-green/15 border border-cyber-green/30 rounded-full text-xs font-mono text-cyber-green">
              <Beaker size={14} />
              {lab.focusArea}
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-cyber-navy/70 border border-cyber-cyan/30 rounded-full text-xs font-mono text-cyber-cyan">
              <ShieldAlert size={14} />
              {lab.difficulty}
            </span>
          </div>

          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyber-green transition-colors">
            {lab.title}
          </h3>
          <p className="text-sm text-cyber-gray mb-4 leading-relaxed">
            {lab.description}
          </p>

          <div className="flex flex-wrap gap-3 text-xs text-cyber-gray-light">
            <span className="inline-flex items-center gap-1">
              <Clock size={14} className="text-cyber-green" />
              {lab.duration}
            </span>
            <span className="inline-flex items-center gap-1">
              <Activity size={14} className="text-cyber-cyan" />
              {lab.status}
            </span>
          </div>
        </div>

        {objectives.length > 0 && (
          <div className="px-6 pb-6">
            <p className="text-xs font-mono text-cyber-cyan/70 tracking-wide mb-3">
              FIRST OBJECTIVES
            </p>
            <ul className="space-y-2 text-sm text-cyber-gray-light">
              {objectives.map((objective) => (
                <li key={objective} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyber-green" />
                  <span>{objective}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-auto px-6 pb-6">
          <Link
            href={`/homelabs/${lab.slug}`}
            prefetch
            className="inline-flex items-center gap-2 px-5 py-3 bg-cyber-green/15 border border-cyber-green/30 rounded-lg text-cyber-green hover:bg-cyber-green/30 hover:text-cyber-dark transition-all duration-300 group"
          >
            <span className="font-mono text-sm">Launch lab</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </m.article>
  );
});

LabCard.displayName = 'LabCard';

export default function HomelabPreviewClient({ labs }: HomelabPreviewClientProps) {
  return (
    <section
      id="homelabs-preview"
      className="min-h-screen py-20 bg-gradient-to-br from-cyber-navy via-cyber-dark to-cyber-darker"
    >
      <div className="container mx-auto px-6">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
        >
          <m.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-cyber-cyan font-mono text-sm mb-4 tracking-widest"
          >
            HOME LABS
          </m.p>
          <h2 id="homelabs-heading" className="text-4xl md:text-5xl font-bold text-white mb-4">
            Detection-first playground
          </h2>
          <p className="text-cyber-gray-light text-lg max-w-3xl mx-auto">
            Recreate the exact defensive scenarios I build to train SOC teams: zero-to-prod environments, attack simulations, and response playbooks ready to execute.
          </p>
          <m.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-24 h-1 bg-gradient-to-r from-transparent via-cyber-green to-transparent mx-auto mt-6"
          />
        </m.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {labs.map((lab, index) => (
            <LabCard key={lab.slug} lab={lab} index={index} />
          ))}
        </div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="flex justify-center"
        >
          <Link
            href="/homelabs"
            prefetch
            className="inline-flex items-center gap-2 px-8 py-4 bg-cyber-cyan text-cyber-dark font-semibold rounded-lg hover:shadow-neon-cyan hover:scale-105 transition-all duration-300 group"
          >
            Explore full catalog
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </m.div>
      </div>
    </section>
  );
}
