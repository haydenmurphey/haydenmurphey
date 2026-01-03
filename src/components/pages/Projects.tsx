'use client';

import { m } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';
import { projects } from '@/data/projects';

export default function ProjectsSection() {
  return (
    <section
      id="projects"
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
            className="text-cyber-green font-mono text-sm mb-4 tracking-widest"
          >
            PROJECT PORTFOLIO
          </m.p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            All My Projects
          </h2>
          <p className="text-cyber-gray-light text-lg max-w-2xl mx-auto">
            Full Stack Development, DevSecOps & Blue Team Operations
          </p>
          <m.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-6 mx-auto w-24 h-1 bg-gradient-to-r from-transparent via-cyber-cyan to-transparent"
          />
        </m.div>

        {/* Projects Grid */}
        <div className="space-y-12">
          {projects.map((project, index) => (
            <m.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`
                grid md:grid-cols-2 gap-8 items-center
                ${index % 2 === 1 ? 'md:grid-flow-dense' : ''}
              `}
            >
              {/* Project Info */}
              <div className={index % 2 === 1 ? 'md:col-start-1' : ''}>
                {/* Status Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyber-teal-dark/50 border border-cyber-cyan/30 rounded-full mb-4">
                  <div className={`w-2 h-2 ${project.statusColor} rounded-full`} />
                  <span className="text-sm text-cyber-gray-light font-mono">
                    {project.status}
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {project.title}
                </h3>

                <p className="text-cyber-gray mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-cyber-navy/50 border border-cyber-cyan/20 rounded-lg text-sm text-cyber-cyan font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-cyber-cyan/10 border border-cyber-cyan/30 rounded-lg text-cyber-cyan hover:bg-cyber-cyan/20 hover:shadow-neon-cyan transition-all duration-300 group"
                    >
                      <Github size={18} />
                      <span className="font-mono text-sm">View Code</span>
                      <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                  )}
                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-cyber-green/10 border border-cyber-green/30 rounded-lg text-cyber-green hover:bg-cyber-green/20 hover:shadow-neon-green transition-all duration-300 group"
                    >
                      <span className="font-mono text-sm">Live Demo</span>
                      <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                  )}
                </div>
              </div>

              {/* Project Image */}
              <div className={`relative ${index % 2 === 1 ? 'md:col-start-2' : ''}`}>
                <div className="relative aspect-video rounded-xl overflow-hidden border border-cyber-cyan/20 bg-cyber-navy/30 backdrop-blur-sm group hover:border-cyber-cyan/50 transition-colors">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyber-cyan/10 to-cyber-green/10" />
                  
                  {/* Special treatment for portfolio project */}
                  {project.image === 'current-site' ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                      <m.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                      >
                        <m.div
                          animate={{ 
                            textShadow: [
                              '0 0 10px rgba(0, 255, 255, 0.5)',
                              '0 0 20px rgba(0, 255, 255, 0.8)',
                              '0 0 10px rgba(0, 255, 255, 0.5)'
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="text-4xl md:text-5xl font-bold text-cyber-cyan mb-2"
                        >
                          You&apos;re Here
                        </m.div>
                        <m.div
                          animate={{ 
                            opacity: [0.5, 1, 0.5],
                            scale: [1, 1.05, 1]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="text-2xl md:text-3xl font-mono text-cyber-green"
                        >
                          Explore ↓
                        </m.div>
                      </m.div>
                      
                      {/* Animated particles */}
                      <div className="absolute inset-0 overflow-hidden">
                        {[...Array(20)].map((_, i) => (
                          <m.div
                            key={i}
                            className="absolute w-1 h-1 bg-cyber-cyan rounded-full"
                            initial={{ 
                              x: Math.random() * 100 + '%',
                              y: Math.random() * 100 + '%',
                              opacity: 0
                            }}
                            animate={{ 
                              y: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
                              opacity: [0, 1, 0]
                            }}
                            transition={{ 
                              duration: Math.random() * 3 + 2,
                              repeat: Infinity,
                              delay: Math.random() * 2
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    /* Regular project image */
                    <Image 
                      src={project.image} 
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  )}
                </div>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
