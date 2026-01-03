'use client';

import { m } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { memo, useState, useEffect } from 'react';
import { siteConfig } from '@/config/site.config';

interface HomeTranslations {
  badge: string;
  title: string;
  codename: string;
  tagline: string;
  description: string;
  cta: string;
}

interface HomeSectionProps {
  translations?: HomeTranslations;
}

function HomeSection({ translations }: HomeSectionProps) {
  const defaultTranslations: HomeTranslations = {
    badge: 'Blue Team | Defensive Security',
    title: siteConfig.author.name,
    codename: siteConfig.codename,
    tagline: siteConfig.author.tagline,
    description: siteConfig.author.description,
    cta: 'Explore Projects',
  };

  const t: HomeTranslations = translations ?? defaultTranslations;

  // Performance: Reduce particle count on mobile devices for better GPU performance
  // Desktop: 12 particles, Mobile: 6 particles
  // Use state to ensure consistent SSR/CSR rendering (prevents hydration mismatch)
  const [particleCount, setParticleCount] = useState(12);

  useEffect(() => {
    // Only run on client after hydration
    const updateParticleCount = () => {
      setParticleCount(window.innerWidth < 768 ? 6 : 12);
    };

    updateParticleCount();
    window.addEventListener('resize', updateParticleCount);

    return () => window.removeEventListener('resize', updateParticleCount);
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-cyber-darker via-cyber-dark to-cyber-navy"
    >
      {/* Animated Background Pattern */}
      {/* Performance: will-change hint for GPU acceleration of blur animations */}
      <div className="absolute inset-0 opacity-10" style={{ willChange: 'opacity' }}>
        <div className="absolute top-20 left-20 w-64 h-64 bg-cyber-cyan rounded-full blur-3xl animate-pulse-slow" style={{ willChange: 'opacity' }} />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyber-green rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s', willChange: 'opacity' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="max-w-4xl">
          {/* Badge */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-cyber-teal-dark/50 border border-cyber-cyan/30 rounded-full mb-8"
          >
            <div className="w-2 h-2 bg-cyber-green rounded-full animate-pulse" />
            <span className="text-sm text-cyber-gray-light font-mono">
              {t.badge}
            </span>
          </m.div>

          {/* Main Title */}
          <m.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="text-white">{t.title} </span>
            <span className="text-cyber-cyan font-mono">({t.codename})</span>
          </m.h1>

          {/* Tagline */}
          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-cyber-gray-light mb-8 leading-relaxed"
          >
            {t.tagline}
          </m.p>

          {/* Description */}
          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-cyber-gray mb-12 leading-relaxed max-w-3xl"
          >
            {t.description}
          </m.p>

          {/* CTA Button */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <a
              href="#projects-preview"
              className="inline-flex items-center gap-3 px-8 py-4 bg-cyber-cyan text-cyber-dark font-bold rounded-lg hover:shadow-neon-cyan hover:scale-105 transition-all duration-300 group"
            >
              {t.cta}
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </a>
          </m.div>
        </div>

        {/* Right: Quantum Defense Visualization */}
        <m.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden lg:flex justify-center items-center relative h-[600px]"
        >
          {/* Central Shield (Core) */}
          {/* Performance: will-change for box-shadow animation optimization */}
          <m.div
            className="absolute w-40 h-40 rounded-full bg-gradient-to-br from-cyber-cyan/20 to-cyber-green/20 border-4 border-cyber-cyan/50 backdrop-blur-sm z-10"
            style={{ willChange: 'box-shadow' }}
            animate={{
              boxShadow: [
                '0 0 20px rgba(0, 217, 255, 0.3)',
                '0 0 40px rgba(0, 217, 255, 0.6)',
                '0 0 20px rgba(0, 217, 255, 0.3)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl">🛡️</span>
            </div>
          </m.div>

          {/* Orbital Ring 1 - Threats */}
          {/* Performance: will-change for rotation optimization */}
          <m.div
            className="absolute w-80 h-80 rounded-full border-2 border-cyber-orange/20"
            style={{ willChange: 'transform' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            {[0, 90, 180, 270].map((angle) => (
              <m.div
                key={angle}
                className="absolute w-8 h-8 bg-cyber-orange/30 rounded-full border-2 border-cyber-orange flex items-center justify-center text-xs"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `rotate(${angle}deg) translate(160px) rotate(-${angle}deg)`,
                }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: angle / 90,
                }}
              >
                ⚠️
              </m.div>
            ))}
          </m.div>

          {/* Orbital Ring 2 - Defense Layers */}
          {/* Performance: will-change for rotation optimization */}
          <m.div
            className="absolute w-[500px] h-[500px] rounded-full border-2 border-cyber-cyan/20"
            style={{ willChange: 'transform' }}
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          >
            {[30, 120, 210, 300].map((angle) => (
              <m.div
                key={angle}
                className="absolute w-6 h-6 bg-cyber-cyan/40 rounded-full border-2 border-cyber-cyan flex items-center justify-center text-xs"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `rotate(${angle}deg) translate(250px) rotate(-${angle}deg)`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: angle / 120,
                }}
              >
                🔒
              </m.div>
            ))}
          </m.div>

          {/* Quantum Particles - Data Packets */}
          {/* Performance: Reduced particle count on mobile (6) vs desktop (12) for better GPU performance */}
          {[...Array(particleCount)].map((_, i) => (
            <m.div
              key={i}
              className="absolute w-2 h-2 bg-cyber-green rounded-full"
              style={{
                top: '50%',
                left: '50%',
                willChange: 'transform, opacity',
              }}
              animate={{
                x: [0, Math.cos((i * (360 / particleCount) * Math.PI) / 180) * 180, 0],
                y: [0, Math.sin((i * (360 / particleCount) * Math.PI) / 180) * 180, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * (0.6 / particleCount),
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full opacity-20">
            <m.circle
              cx="50%"
              cy="50%"
              r="140"
              fill="none"
              stroke="url(#gradient1)"
              strokeWidth="2"
              strokeDasharray="5,10"
              animate={{ strokeDashoffset: [0, -100] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />
            <m.circle
              cx="50%"
              cy="50%"
              r="220"
              fill="none"
              stroke="url(#gradient2)"
              strokeWidth="2"
              strokeDasharray="8,15"
              animate={{ strokeDashoffset: [0, 100] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            />
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00d9ff" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#00ff9f" stopOpacity="0.5" />
              </linearGradient>
              <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#00ff9f" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#ff6b35" stopOpacity="0.5" />
              </linearGradient>
            </defs>
          </svg>

          {/* Floating Labels */}
          <m.div
            className="absolute top-10 right-10 px-4 py-2 bg-cyber-navy/80 border border-cyber-cyan/30 rounded-lg backdrop-blur-sm"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <p className="text-xs text-cyber-cyan font-mono">SIEM</p>
          </m.div>

          <m.div
            className="absolute bottom-10 left-10 px-4 py-2 bg-cyber-navy/80 border border-cyber-green/30 rounded-lg backdrop-blur-sm"
            animate={{
              y: [0, 10, 0],
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          >
            <p className="text-xs text-cyber-green font-mono">EDR</p>
          </m.div>

          <m.div
            className="absolute top-1/3 left-0 px-4 py-2 bg-cyber-navy/80 border border-cyber-orange/30 rounded-lg backdrop-blur-sm"
            animate={{
              x: [-10, 0, -10],
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          >
            <p className="text-xs text-cyber-orange font-mono">IDS</p>
          </m.div>
        </m.div>
      </div>
      </div>
    </section>
  );
}

// Performance: Export memoized component to prevent unnecessary re-renders
export default memo(HomeSection);
