'use client';

import { type ReactNode } from 'react';
import { m } from 'framer-motion';
import { Calendar, Shield, Settings, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Experience {
  title: string;
  company: ReactNode;
  period: string;
  description: string;
  icon: ReactNode;
  achievements?: string[];
  companyClassName?: string;
}

const experiences: Experience[] = [
  {
    title: 'Blue Team Security Specialist',
    company: <span>TechCorp Security · Full-time</span>,
    period: 'Jan 2024 - Present',
    description: 'Lead defensive security operations including threat detection, incident response, and security monitoring. Design and implement detection rules, conduct threat hunting, and mentor junior analysts in Blue Team methodologies.',
    icon: <Shield size={20} />,
    achievements: [
      'Designed and deployed 50+ custom SIEM detection rules reducing MTTD by 40%',
      'Led incident response for 100+ security incidents with 98% successful resolution rate',
      'Implemented automated threat hunting workflows using Python and Splunk SPL',
      'Developed security playbooks for ransomware, phishing, and insider threat scenarios',
      'Conducted regular purple team exercises to validate detection capabilities',
      'Mentored 3 junior SOC analysts in threat detection and incident response'
    ]
  },
  {
    title: 'SOC Analyst Level 2',
    company: <span>Global Finance Corp · Full-time</span>,
    period: 'Jun 2022 - Dec 2023',
    description: 'Advanced security monitoring and incident investigation in a 24/7 SOC environment. Performed deep-dive analysis of security alerts, threat intelligence integration, and coordination with security teams for incident containment.',
    icon: <Shield size={20} />,
    achievements: [
      'Triaged and investigated 500+ security incidents across SIEM, EDR, and network tools',
      'Reduced false positive rate by 35% through alert tuning and correlation rules',
      'Integrated threat intelligence feeds (MISP, AlienVault OTX) with SIEM platform',
      'Created comprehensive incident reports for management and compliance teams',
      'Performed malware analysis and forensic investigation of compromised systems',
      'Developed documentation and training materials for L1 analysts'
    ]
  },
  {
    title: 'SOC Analyst Level 1',
    company: <span>CyberDefense Solutions · Full-time</span>,
    period: 'Mar 2021 - May 2022',
    description: 'First-line security monitoring and alert triage in enterprise SOC. Monitored security events from SIEM, firewalls, IDS/IPS, and endpoint protection platforms. Escalated confirmed incidents to senior analysts.',
    icon: <Settings size={20} />,
    achievements: [
      'Monitored and triaged 1000+ daily security alerts across multiple platforms',
      'Achieved 95% SLA compliance for alert response times',
      'Identified and escalated 50+ confirmed security incidents',
      'Performed initial containment actions for phishing and malware incidents',
      'Maintained detailed incident documentation and tracking in SOAR platform',
      'Completed SANS SEC401 training and applied learnings to daily operations'
    ]
  },
  {
    title: 'IT Support Specialist / Junior Security Analyst',
    company: <span>Enterprise Tech Services · Full-time</span>,
    period: 'Aug 2019 - Feb 2021',
    description: 'Provided technical support while transitioning to security role. Gained hands-on experience with security tools, vulnerability management, and basic incident response. Supported security team with log analysis and security patching.',
    icon: <Settings size={20} />,
    achievements: [
      'Resolved 200+ IT support tickets monthly with 98% satisfaction rating',
      'Assisted security team with vulnerability scanning and patch management',
      'Performed basic log analysis for security investigations',
      'Deployed security agents (EDR, DLP) across 500+ endpoints',
      'Created user security awareness training materials',
      'Obtained CompTIA Security+ certification while working full-time'
    ]
  }
];

export default function ExperienceSection() {
  const title = 'Professional Experience';
  const subtitle = 'TIMELINE';
  const description = 'From physics lab to Blue Team. Each experience shaped my analytical approach to cyber defense.';
  const achievementsLabel = 'Key Achievements:';
  
  return (
    <section
      id="experience"
      className="min-h-screen py-20 bg-gradient-to-br from-cyber-teal-dark via-cyber-dark to-cyber-darker"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <m.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-cyber-cyan font-mono text-sm mb-4 tracking-widest"
          >
            {subtitle}
          </m.p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-cyber-gray-light text-lg max-w-2xl mx-auto mb-6">
            {description}
          </p>
          <m.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-24 h-1 bg-gradient-to-r from-transparent via-cyber-cyan to-transparent mx-auto"
          />
        </m.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-cyber-cyan/20" />

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <m.div
                key={exp.title + exp.company}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-start gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Icon */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                  <div className="w-12 h-12 rounded-full bg-cyber-cyan border-4 border-cyber-dark flex items-center justify-center text-cyber-dark shadow-neon-cyan">
                    {exp.icon}
                  </div>
                </div>

                {/* Content Card */}
                <div
                  className={`flex-1 ml-20 md:ml-0 ${
                    index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                  }`}
                >
                  <div className="group p-6 bg-cyber-teal-dark/30 backdrop-blur-sm border border-cyber-cyan/20 rounded-xl hover:border-cyber-cyan/50 hover:shadow-glow-cyan transition-all duration-300">
                    {/* Period Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyber-navy/50 border border-cyber-green/30 rounded-full mb-4">
                      <Calendar size={14} className="text-cyber-green" />
                      <span className="text-sm text-cyber-green font-mono">
                        {exp.period}
                      </span>
                    </div>

                    {/* Title & Company */}
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyber-cyan transition-colors text-left">
                      {exp.title}
                    </h3>
                    <p
                      className={`font-mono text-lg mb-4 text-left ${
                        exp.companyClassName ?? 'text-cyber-green'
                      }`}
                    >
                      {exp.company}
                    </p>

                    {/* Description */}
                    <p className="text-cyber-gray leading-relaxed mb-4 text-left">
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    {exp.achievements && exp.achievements.length > 0 && (
                      <div className="mt-6">
                        <p className="text-cyber-cyan text-sm font-mono mb-3 text-left">
                          {achievementsLabel}
                        </p>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-cyber-gray-light text-sm text-left"
                            >
                              <span className="text-cyber-green mt-1">▸</span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                  </div>
                </div>

                {/* Spacer for opposite side */}
                <div className="hidden md:block flex-1" />
              </m.div>
            ))}
          </div>
        </div>

        {/* View More Button - Desktop */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="hidden md:flex justify-center mt-12"
        >
          <Link
            href="/experience"
            className="inline-flex items-center gap-2 px-6 py-3 bg-cyber-cyan/10 border border-cyber-cyan/30 rounded-lg text-cyber-cyan hover:bg-cyber-cyan/20 hover:shadow-neon-cyan transition-all duration-300 group whitespace-nowrap"
          >
            <span className="font-mono text-sm">View More</span>
            <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </m.div>

        {/* View More Button - Mobile */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12 md:hidden"
        >
          <Link
            href="/experience"
            className="inline-flex items-center gap-2 px-8 py-4 bg-cyber-cyan text-cyber-dark font-bold rounded-lg hover:shadow-neon-cyan hover:scale-105 transition-all duration-300 group"
          >
            View Complete Details
            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </m.div>
      </div>
    </section>
  );
}
