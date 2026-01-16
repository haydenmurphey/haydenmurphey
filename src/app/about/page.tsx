'use client';

export const dynamic = "force-static";

import { Header, FloatingNav } from '@/components/layout';
import { m } from 'framer-motion';
import { Shield, Zap, Brain, Target, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import NextImage from 'next/image';

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-cyber-darker via-cyber-dark to-cyber-navy cyber-bg-animated">
      <Header />
      <FloatingNav />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
              {/* Profile Photo */}
              <m.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="relative shrink-0"
              >
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-cyber-cyan/30 shadow-neon-cyan bg-gradient-to-br from-cyber-cyan/20 to-cyber-green/20">
                  {/* Profile Photo */}
                  <NextImage
                    src="/images/about/hacker-pic.png"
                    alt="Cybersecurity analyst avatar"
                    width={192}
                    height={192}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
                {/* Status indicator */}
                <div className="absolute bottom-4 right-4 w-6 h-6 bg-cyber-green rounded-full border-4 border-cyber-dark animate-pulse" />
              </m.div>

              {/* Header Content */}
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyber-teal-dark/50 border border-cyber-cyan/30 rounded-full mb-4">
                  <div className="w-2 h-2 bg-cyber-green rounded-full animate-pulse" />
                  <span className="text-sm text-cyber-gray-light font-mono">
                    Currently Open For Work
                  </span>
                </div>

                <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                  About <span className="text-cyber-cyan">Me</span>
                </h1>

                <p className="text-xl text-cyber-gray-light leading-relaxed max-w-2xl md:max-w-none">
                  Early career Cybersecurity professional looking to expand their knowledge of the industry through projects, labs, and professional work.
                </p>
              </div>
            </div>
          </m.div>

          {/* Main Content */}
          <div className="max-w-5xl mx-auto">
            {/* Story Section */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-cyber-teal-dark/30 backdrop-blur-sm border border-cyber-cyan/20 rounded-2xl p-8 md:p-12 mb-12"
            >
              <h2 className="text-3xl font-bold text-cyber-cyan mb-6">My Journey</h2>

              <div className="space-y-4 text-cyber-gray-light leading-relaxed">

                <p>
                  From a young age, I was always fascinated by computers. At first it began from an interest in gaming with friends but then it grew into more. I realized the power that comes with computers and all that can be accomplished with them.
                </p>

                <p>
                  This led me to pursuing a major in Computer Science where I studied in the discipline of development including frontend and backend work. This helped me develop a strong backbone in systems and various coding languages.
                </p>

                <p>
                  Eventually, I found myself gaining an interest in cybersecurity while recognizing it&apos;s importance in maintaining the integrity and privacy of our digital world. With the world continuously becoming more digital, this impact cannot be understated.
                </p>

                <p>
                  Looking forward, I&apos;m focused on growing my expertise in all that comes with the industry including threat detection, security architecture, and much more. I strive to bring positive contributions to the broader cybersecurity community and continue to diversify my skillset in the process.
                </p>
              </div>
            </m.div>

            {/* Skills Grid */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid md:grid-cols-2 gap-6 mb-12"
            >
              <div className="bg-cyber-teal-dark/30 backdrop-blur-sm border border-cyber-cyan/20 rounded-xl p-6 hover:border-cyber-cyan/50 transition-all duration-300">
                <Brain className="text-cyber-cyan mb-4" size={32} />
                <h3 className="text-xl font-bold text-white mb-3">Coding Languages</h3>
                <p className="text-cyber-gray leading-relaxed">
                  Specializing in threat detection, incident response, and security monitoring.
                  Building robust defenses through understanding attacker methodologies.
                </p>
              </div>

              <div className="bg-cyber-teal-dark/30 backdrop-blur-sm border border-cyber-green/20 rounded-xl p-6 hover:border-cyber-green/50 transition-all duration-300">
                <Brain className="text-cyber-green mb-4" size={32} />
                <h3 className="text-xl font-bold text-white mb-3">Analytical Thinking</h3>
                <p className="text-cyber-gray leading-relaxed">
                  Applying scientific methodology to cybersecurity challenges. Breaking down complex
                  problems into manageable components for systematic analysis.
                </p>
              </div>

              <div className="bg-cyber-teal-dark/30 backdrop-blur-sm border border-cyber-orange/20 rounded-xl p-6 hover:border-cyber-orange/50 transition-all duration-300">
                <Zap className="text-cyber-orange mb-4" size={32} />
                <h3 className="text-xl font-bold text-white mb-3">Rapid Response</h3>
                <p className="text-cyber-gray leading-relaxed">
                  Quick identification and mitigation of security incidents. Minimizing impact
                  through efficient triage and coordinated response procedures.
                </p>
              </div>

              <div className="bg-cyber-teal-dark/30 backdrop-blur-sm border border-cyber-cyan/20 rounded-xl p-6 hover:border-cyber-cyan/50 transition-all duration-300">
                <Target className="text-cyber-cyan mb-4" size={32} />
                <h3 className="text-xl font-bold text-white mb-3">Threat Hunting</h3>
                <p className="text-cyber-gray leading-relaxed">
                  Proactive identification of threats before they manifest. Using data analysis
                  and pattern recognition to detect anomalies and potential compromises.
                </p>
              </div>
            </m.div>

            {/* Philosophy Section */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-cyber-teal-dark/30 to-cyber-navy/30 backdrop-blur-sm border border-cyber-green/20 rounded-2xl p-8 md:p-12 mb-12"
            >
              <h2 className="text-3xl font-bold text-cyber-green mb-6">Philosophy</h2>

              <div className="space-y-4 text-cyber-gray-light leading-relaxed">
                <p className="text-lg">
                  <span className="text-cyber-cyan font-mono">&ldquo;Defense through understanding, detection through vigilance.&rdquo;</span>
                </p>

                <p>
                  Effective cybersecurity requires more than just implementing tools and controls.
                  It demands a deep understanding of both attacker tactics and defender capabilities.
                  My mission is to maintain strong security postures through continuous monitoring,
                  proactive threat hunting, and data-driven defense strategies.
                </p>

                <p>
                  Every security incident is an opportunity to learn and improve. Every vulnerability
                  discovered is a chance to strengthen defenses. This mindset of continuous improvement
                  and adaptation drives my approach to cybersecurity and keeps me motivated in the
                  ever-evolving landscape of information security.
                </p>
              </div>
            </m.div>

            {/* CTA Section */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid md:grid-cols-2 gap-6"
            >
              <Link
                href="/projects"
                className="group p-8 bg-gradient-to-br from-cyber-cyan/10 to-cyber-green/10 border border-cyber-cyan/30 rounded-xl hover:border-cyber-cyan hover:shadow-neon-cyan transition-all duration-300"
              >
                <h3 className="text-2xl font-bold text-cyber-cyan mb-3 group-hover:text-cyber-green transition-colors">
                  View My Projects
                </h3>
                <p className="text-cyber-gray-light mb-4">
                  Explore defensive security tools and Blue Team automation projects
                </p>
                <div className="inline-flex items-center gap-2 text-cyber-cyan group-hover:gap-4 transition-all">
                  <span className="font-mono">See Projects</span>
                  <ArrowRight size={20} />
                </div>
              </Link>

              <Link
                href="/contact"
                className="group p-8 bg-gradient-to-br from-cyber-green/10 to-cyber-orange/10 border border-cyber-green/30 rounded-xl hover:border-cyber-green hover:shadow-neon-green transition-all duration-300"
              >
                <h3 className="text-2xl font-bold text-cyber-green mb-3 group-hover:text-cyber-cyan transition-colors">
                  Drop Me a Message
                </h3>
                <p className="text-cyber-gray-light mb-4">
                  Connect for collaboration, discussion, etc.
                </p>
                <div className="inline-flex items-center gap-2 text-cyber-green group-hover:gap-4 transition-all">
                  <span className="font-mono">Contact Me</span>
                  <ArrowRight size={20} />
                </div>
              </Link>
            </m.div>
          </div>
        </div>
      </section>
    </main>
  );
}
