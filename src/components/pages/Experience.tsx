'use client';

import { type ReactNode } from 'react';
import { m } from 'framer-motion';
import { Calendar, Shield, Settings, ArrowRight, Music } from 'lucide-react';
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
    title: 'Software Validation - AI Trainer',
    company: <span>DataAnnotation · Freelance Remote</span>,
    period: 'May 2025 - Present',
    description: 'Reviewed, corrected, and validated code results against specifications and test cases to improve quality. Worked extensively with JSON and Node.js to reproduce issues, debug logica errors, and verify fixes.',
    icon: <Shield size={20} />,
    achievements: [
      'Worked on over 15 different AI projects to improve quality',
      'Analyzed thousands of data points to spot trends and recognize faults',
      'Implemented automated quantitative analysis programs with Python'
    ]
  },
  {
    title: 'Assistant Researcher',
    company: <span>MusicCPR · Part-time</span>,
    period: 'October 2022 - July 2023',
    description: 'Coordinated with professors on solving various bugs within the site. Conducted independent testing on the site using my background in music.',
    icon: <Music size={20} />,
    achievements: [
      'Balanced being a full time college student with learning the ins and outs of web development',
      'Indentified key musical instrument redudencies'
    ]
  },
  {
    title: 'Geotechnical Technician',
    company: <span>Townes Site Engineering · Full-time</span>,
    period: 'May 2021 - Aug 2025',
    description: 'Worked along a team of engineers and other geotechs to complete contracted work by various construction sites. With this I conducted independent testings/inspections on site and in lab on materials including soil, concrete, and steel. ',
    icon: <Settings size={20} />,
    achievements: [
      'Performed inspections on job sites containing over 8 billion dollars of infrastructure',
      'Worked on over 30 different job sites',
      'Developed exceptional teamwork skills to complete tasks required in contracts',
      'Completed over 3000 different independent tests on concrete.'
    ]
  }
];

export default function ExperienceSection() {
  const title = 'Professional Experience';
  const subtitle = 'TIMELINE';
  const description = 'From experience in Civil Engineering to formal academic education and work in Computer Science. Each experience shaped my analytical approach to cyber work giving me a balanced sight on the physical and technical aspects.';
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
      </div>
    </section>
  );
}
