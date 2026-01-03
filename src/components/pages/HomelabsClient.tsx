'use client';

import { memo, useCallback, useMemo, useState } from 'react';
import { m } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { BadgeCheck, Filter, Layers, RefreshCw, ShieldAlert, Timer, Wrench } from 'lucide-react';
import type { HomelabMetadata } from '@/lib/homelabs';

interface HomelabsClientProps {
  labs: HomelabMetadata[];
  featured: HomelabMetadata | null;
  focusAreas: string[];
  difficulties: string[];
}

export default function HomelabsClient({ labs, featured, focusAreas, difficulties }: HomelabsClientProps) {
  const [activeFocus, setActiveFocus] = useState<string>('All');
  const [activeDifficulty, setActiveDifficulty] = useState<string>('All');

  const focusFilters = useMemo(() => ['All', ...focusAreas], [focusAreas]);
  const difficultyFilters = useMemo(() => ['All', ...difficulties], [difficulties]);
  const catalog = useMemo(() => {
    const withoutFeatured = featured ? labs.filter((lab) => lab.slug !== featured.slug) : labs;
    return withoutFeatured.filter((lab) => {
      const focusMatch = activeFocus === 'All' || lab.focusArea === activeFocus;
      const difficultyMatch = activeDifficulty === 'All' || lab.difficulty === activeDifficulty;
      return focusMatch && difficultyMatch;
    });
  }, [labs, featured, activeFocus, activeDifficulty]);

  const handleFocusChange = useCallback((value: string) => {
    setActiveFocus(value);
  }, []);

  const handleDifficultyChange = useCallback((value: string) => {
    setActiveDifficulty(value);
  }, []);

  const handleReset = useCallback(() => {
    setActiveFocus('All');
    setActiveDifficulty('All');
  }, []);

  const featuredObjectives = useMemo(() => featured?.objectives.slice(0, 4) ?? [], [featured]);

  return (
    <section className="min-h-screen pb-24 bg-gradient-to-b from-cyber-darker via-cyber-dark to-cyber-navy">
      <div className="pt-28 pb-12 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.12),_transparent)]">
        <div className="container mx-auto px-6">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center max-w-3xl mx-auto"
          >
            {/* <m.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-cyber-green/15 border border-cyber-green/30 rounded-full text-sm font-mono text-cyber-green tracking-widest"
            >
              <Beaker size={16} />
              HANDS-ON CYBER RANGES
            </m.p> */}
            <m.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-cyber-green font-mono text-sm mb-4 tracking-widest"
            >
                HANDS-ON CYBER RANGES
            </m.p>
            <m.h2
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold text-white"
            >
              Home Labs
            </m.h2>
            <m.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mt-6 text-lg text-cyber-gray-light"
            >
              Blueprinted environments I run at home to pressure-test detections, rehearse incident response, and validate purple team strategies. Each lab ships with scenario context, required tooling, and success metrics.
            </m.p>
            <m.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="mt-8 mx-auto w-24 h-1 bg-gradient-to-r from-transparent via-cyber-green to-transparent"
            />
          </m.div>
        </div>
      </div>

      <div className="container mx-auto px-6">
        {featured && (
          <m.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="relative mb-20 overflow-hidden rounded-3xl border border-cyber-cyan/30 bg-cyber-teal-dark/40 backdrop-blur-xl"
          >
            <div className="grid lg:grid-cols-[1fr_420px] gap-10 p-10">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyber-cyan/15 border border-cyber-cyan/30 rounded-full text-xs font-mono text-cyber-cyan mb-4">
                  <BadgeCheck size={14} />
                  Featured runbook
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{featured.title}</h2>
                <p className="text-cyber-gray-light text-base md:text-lg leading-relaxed mb-6">
                  {featured.description}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-cyber-gray-light mb-8">
                  <span className="inline-flex items-center gap-2">
                    <ShieldAlert size={16} className="text-cyber-green" />
                    {featured.difficulty}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Timer size={16} className="text-cyber-green" />
                    {featured.duration}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Layers size={16} className="text-cyber-cyan" />
                    {featured.focusArea}
                  </span>
                </div>
                {featuredObjectives.length > 0 && (
                  <div className="mb-8">
                    <p className="text-xs font-mono text-cyber-cyan/70 tracking-widest mb-3">
                      MISSION OBJECTIVES
                    </p>
                    <ul className="space-y-2 text-sm text-cyber-gray-light">
                      {featuredObjectives.map((objective) => (
                        <li key={objective} className="flex gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyber-green" />
                          <span>{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <Link
                  href={`/homelabs/${featured.slug}`}
                  prefetch
                  className="inline-flex items-center gap-2 px-6 py-3 bg-cyber-green text-cyber-dark font-semibold rounded-lg hover:shadow-neon-green transition-all duration-300"
                >
                  Launch featured lab
                  <Timer size={18} />
                </Link>
              </div>

              <div className="relative h-full min-h-[280px]">
                {featured.coverImage ? (
                  <Image
                    src={featured.coverImage}
                    alt={featured.title}
                    fill
                    className="rounded-2xl object-cover"
                    sizes="(max-width: 1024px) 100vw, 420px"
                  />
                ) : (
                  <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle,_rgba(34,211,238,0.25),_transparent)]" />
                )}
                <div className="absolute inset-0 rounded-2xl border border-cyber-cyan/20" />
              </div>
            </div>
          </m.section>
        )}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-10">
          <div className="flex items-center gap-3 text-cyber-gray-light">
            <Filter size={18} className="text-cyber-green" />
            <span className="font-mono text-sm uppercase tracking-[0.2em]">Filter Labs</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex flex-wrap gap-2">
              {focusFilters.map((focus) => (
                <FilterButton
                  key={focus}
                  label={focus === 'All' ? 'Focus: All' : focus}
                  isActive={activeFocus === focus}
                  onClick={() => handleFocusChange(focus)}
                />
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {difficultyFilters.map((difficulty) => (
                <FilterButton
                  key={difficulty}
                  label={difficulty === 'All' ? 'Difficulty: All' : difficulty}
                  isActive={activeDifficulty === difficulty}
                  onClick={() => handleDifficultyChange(difficulty)}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm text-cyber-cyan border border-cyber-cyan/30 rounded-lg hover:bg-cyber-cyan/10 transition-colors"
            >
              <RefreshCw size={16} />
              Reset
            </button>
          </div>
        </div>

  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {catalog.map((lab, index) => (
            <CatalogCard key={lab.slug} lab={lab} index={index} />
          ))}
        </div>

        {catalog.length === 0 && (
          <div className="mt-20 text-center text-cyber-gray-light">
            <p className="text-lg">No labs match the selected filters yet. Reset filters to view all scenarios.</p>
          </div>
        )}
      </div>
    </section>
  );
}

interface FilterButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const FilterButton = memo(function FilterButton({ label, isActive, onClick }: FilterButtonProps) {
  const stateClasses = isActive
    ? 'border-cyber-green bg-cyber-green/20 text-white'
    : 'border-cyber-cyan/20 text-cyber-gray-light hover:border-cyber-cyan/40';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-lg border text-sm transition-all ${stateClasses}`}
    >
      {label}
    </button>
  );
});

FilterButton.displayName = 'FilterButton';

interface CatalogCardProps {
  lab: HomelabMetadata;
  index: number;
}

const CatalogCard = memo(function CatalogCard({ lab, index }: CatalogCardProps) {
  const displayedTools = useMemo(() => {
    const toolsPreview = lab.tools.slice(0, 2).join(' · ');
    return lab.tools.length > 2 ? `${toolsPreview} +` : toolsPreview;
  }, [lab.tools]);

  const objectives = useMemo(() => lab.objectives.slice(0, 3), [lab.objectives]);

  return (
    <m.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="flex flex-col bg-cyber-teal-dark/35 border border-cyber-cyan/20 rounded-2xl overflow-hidden backdrop-blur"
    >
      {lab.coverImage ? (
        <div className="relative aspect-video">
          <Image
            src={lab.coverImage}
            alt={lab.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cyber-darker via-transparent" />
        </div>
      ) : (
        <div className="relative aspect-video bg-[radial-gradient(circle,_rgba(14,165,233,0.25),_transparent)]" />
      )}
      <div className="flex-1 p-6">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-cyber-navy/70 border border-cyber-cyan/30 rounded-full text-xs font-mono text-cyber-cyan">
            {lab.focusArea}
          </span>
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-cyber-green/15 border border-cyber-green/30 rounded-full text-xs font-mono text-cyber-green">
            {lab.difficulty}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-white mb-3">{lab.title}</h3>
        <p className="text-sm text-cyber-gray-light leading-relaxed mb-4">{lab.description}</p>
        <div className="flex flex-wrap gap-3 text-xs text-cyber-gray-light mb-6">
          <span className="inline-flex items-center gap-1">
            <Timer size={14} className="text-cyber-green" />
            {lab.duration}
          </span>
          {displayedTools && (
            <span className="inline-flex items-center gap-1">
              <Wrench size={14} className="text-cyber-cyan" />
              {displayedTools}
            </span>
          )}
        </div>
        {objectives.length > 0 && (
          <ul className="space-y-2 text-xs text-cyber-gray-light/90 mb-6">
            {objectives.map((objective) => (
              <li key={objective} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyber-green" />
                <span>{objective}</span>
              </li>
            ))}
          </ul>
        )}
        <Link
          href={`/homelabs/${lab.slug}`}
          prefetch
          className="inline-flex items-center gap-2 text-sm text-cyber-cyan hover:text-cyber-green transition-colors font-semibold"
        >
          Open lab
          <Layers size={16} />
        </Link>
      </div>
    </m.article>
  );
});

CatalogCard.displayName = 'CatalogCard';
