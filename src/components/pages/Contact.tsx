'use client';

import { m } from 'framer-motion';
import { Mail, Linkedin, Github, ExternalLink } from 'lucide-react';
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
    href: 'https://linkedin.com/in/your-linkedin-username',
    description: 'Connect for professional networking',
    color: 'border-cyber-cyan/30 hover:border-cyber-cyan hover:shadow-glow-cyan text-cyber-cyan'
  },
  {
    name: 'GitHub',
    icon: <Github size={24} />,
    href: 'https://github.com/yourusername',
    description: 'View my open source projects',
    color: 'border-cyber-gray/30 hover:border-cyber-gray-light hover:shadow-glow-cyan text-cyber-gray-light'
  },
  {
    name: 'Email',
    icon: <Mail size={24} />,
    href: 'mailto:your.email@example.com',
    description: 'Send me a secure email',
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
        <div className="max-w-4xl mx-auto">


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
              SECURE CONTACT
            </m.p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Drop a <span className="text-cyber-green">Secure Message</span>
            </h2>
            <p className="text-cyber-gray-light text-lg max-w-2xl mx-auto mb-6">
              For sensitive topics, reach out through the channels below. Encrypted links and trusted networks are always preferred.
            </p>
            <m.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto w-24 h-1 bg-gradient-to-r from-transparent via-cyber-green to-transparent"
            />
          </m.div>

          {/* Contact Methods */}
          <div className="grid md:grid-cols-3 gap-4 mb-16">
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
                  flex flex-col items-center justify-center p-6 bg-cyber-teal-dark/30 backdrop-blur-sm border rounded-lg
                  transition-all duration-300 group hover:scale-105
                  ${method.color}
                `}
              >
                <div className="w-12 h-12 rounded-lg bg-cyber-navy/50 flex items-center justify-center mb-3">
                  {method.icon}
                </div>
                <h3 className="text-base font-bold text-white mb-1">
                  {method.name}
                </h3>
                <p className="text-cyber-gray text-xs text-center">
                  {method.description}
                </p>
                <ExternalLink
                  size={14}
                  className="mt-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
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
                text="by ~/yourusername"
                speed={150}
                className="text-2xl font-bold"
                delay={1000}
              />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyber-cyan/30" />
            </div>
            <TypewriterAnimation
              text="[OK] Fighting digital entropy since 2025..."
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
