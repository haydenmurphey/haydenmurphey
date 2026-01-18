'use client';

import { m } from 'framer-motion';
import { Mail, Linkedin, Github, ExternalLink, FileText } from 'lucide-react';
import TypewriterAnimation from '@/components/ui/TypewriterAnimation';

interface ContactMethod {
  name: string;
  icon: React.ReactNode;
  href: string;
  description: string;
  color: string;
}

const contactMethods: ContactMethod[] = [
  {
    name: 'LinkedIn',
    icon: <Linkedin size={24} />,
    href: 'https://linkedin.com/in/haydenmurphey',
    description: 'Connect for professional networking',
    color: 'border-cyber-cyan/30 hover:border-cyber-cyan hover:shadow-glow-cyan text-cyber-cyan'
  },
  {
    name: 'GitHub',
    icon: <Github size={24} />,
    href: 'https://github.com/haydenmurphey',
    description: 'View my open source projects',
    color: 'border-cyber-gray/30 hover:border-cyber-gray-light hover:shadow-glow-cyan text-cyber-gray-light'
  },
  {
    name: 'Resume',
    icon: <FileText size={24} />, // Changed to FileText for visual distinction
    href: 'mailto:hsmurphey@gmail.com',
    description: 'Download my latest CV',
    color: 'border-cyber-green/30 hover:border-cyber-green hover:shadow-glow-green text-cyber-green'
  },
  {
    name: 'Email',
    icon: <Mail size={24} />,
    href: 'mailto:hsmurphey@gmail.com',
    description: 'Send me an email directly',
    color: 'border-cyber-green/30 hover:border-cyber-green hover:shadow-glow-green text-cyber-green'
  }
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="min-h-screen py-20 bg-gradient-to-br from-cyber-teal-dark via-cyber-dark to-cyber-darker flex items-center"
    >
      <div className="container mx-auto px-6">
        {/* Constrained max-width to keep the 2x2 grid looking tight */}
        <div className="max-w-3xl mx-auto">

          {/* Section Header */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <m.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-cyber-green font-mono text-sm mb-4 tracking-widest"
            >
              MY CONTACT
            </m.p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Drop a <span className="text-cyber-green"> Message Below</span>
            </h2>
            <p className="text-cyber-gray-light text-lg max-w-2xl mx-auto mb-6">
              Reach out through these channels.
            </p>
            <m.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto w-24 h-1 bg-gradient-to-r from-transparent via-cyber-green to-transparent"
            />
          </m.div>

          {/* Contact Methods - Changed to md:grid-cols-2 */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {contactMethods.map((method, index) => (
              <m.a
                key={method.name}
                href={method.href}
                target={method.href.startsWith('mailto') ? undefined : '_blank'}
                rel={method.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`
                  flex flex-col items-center justify-center p-8 bg-cyber-teal-dark/30 backdrop-blur-sm border rounded-lg
                  transition-all duration-300 group hover:scale-[1.02]
                  ${method.color}
                `}
              >
                <div className="w-14 h-14 rounded-lg bg-cyber-navy/50 flex items-center justify-center mb-4">
                  {method.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-1">
                  {method.name}
                </h3>
                <p className="text-cyber-gray text-sm text-center">
                  {method.description}
                </p>
                <ExternalLink
                  size={16}
                  className="mt-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                />
              </m.a>
            ))}
          </div>

          {/* Decorative Footer */}
          <m.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center gap-6 mb-16"
          >
            <div className="flex items-center gap-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyber-cyan/30" />
              <TypewriterAnimation
                text="by ~/haydenmurphey"
                speed={150}
                className="text-2xl font-bold"
                delay={1000}
              />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyber-cyan/30" />
            </div>
            <TypewriterAnimation
              text="[OK] Currently open for work..."
              speed={150}
              className="text-lg font-mono text-cyber-gray-light"
              delay={1400}
            />
          </m.div>
        </div>
      </div>
    </section>
  );
}