'use client';

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
                    Blue Team | Defensive Security
                  </span>
                </div>

                <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                  About <span className="text-cyber-cyan">Me</span>
                </h1>

                <p className="text-xl text-cyber-gray-light leading-relaxed max-w-2xl md:max-w-none">
                  Cybersecurity professional focused on Blue Team defense operations, threat detection, and building resilient security architectures.
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
                  As a dedicated cybersecurity professional, I specialize in defensive security operations with a focus on threat detection, incident response, and security monitoring. My approach combines technical expertise with strategic thinking to build resilient security architectures.
                </p>

                <p>
                  My work centers on understanding attacker methodologies and translating threat intelligence into actionable defenses. I regularly work with security tools like SIEM platforms, EDR solutions, and threat intelligence feeds to identify and neutralize threats before they impact operations.
                </p>

                <p>
                  I believe in continuous learning and staying current with the evolving threat landscape. My analytical approach to problem-solving helps me anticipate attack vectors, tune detection rules, and improve security posture through data-driven decisions.
                </p>

                <p>
                  Throughout my career, I&apos;ve developed expertise in security operations center (SOC) operations, threat hunting, and incident response. I enjoy the challenge of defending against sophisticated adversaries and collaborating with teams to strengthen organizational security.
                </p>

                <p>
                  I&apos;m passionate about the defensive side of cybersecurity and committed to advancing my skills in threat intelligence, security automation, and detection engineering. My goal is to contribute to building more secure digital environments through proactive defense strategies.
                </p>

                <p>
                  Looking forward, I&apos;m focused on growing my expertise in advanced threat detection, security architecture, and contributing to the broader cybersecurity community through knowledge sharing and collaboration.
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
                <Shield className="text-cyber-cyan mb-4" size={32} />
                <h3 className="text-xl font-bold text-white mb-3">Defensive Security</h3>
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
                  Drop a Secure Message
                </h3>
                <p className="text-cyber-gray-light mb-4">
                  Connect for collaboration, consulting, or security discussions
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
