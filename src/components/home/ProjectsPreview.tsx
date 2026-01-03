'use client';

import { m } from 'framer-motion';
import { ExternalLink, Github, ArrowRight, FolderGit2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { projects as allProjects } from '@/data/projects';

export default function ProjectsPreviewSection() {
  const featuredProjects = allProjects.slice(0, 3);

  return (
    <section
      id="projects-preview"
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
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My Favorite Deployments
          </h2>
          <p className="text-cyber-gray-light text-lg max-w-2xl mx-auto">
            Projects, tools and automation I like 
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
          {featuredProjects.map((project, index) => (
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
                  {/* Project Image */}
                  <Image 
                    src={project.image} 
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </m.div>
          ))}
        </div>

        {/* Section Footer */}
        <div className="mt-16">
          {/* See More Button - Mobile */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mb-12 md:hidden"
          >
            <Link
              href="./projects"
              className="inline-flex items-center gap-2 px-8 py-4 bg-cyber-cyan text-cyber-dark font-bold rounded-lg hover:shadow-neon-cyan hover:scale-105 transition-all duration-300 group"
            >
              View All Projects
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </m.div>

          {/* Desktop See More Link */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="hidden md:flex justify-center mb-12"
          >
            <Link
              href="./projects"
              className="inline-flex items-center gap-2 px-8 py-4 text-cyber-cyan hover:text-cyber-green transition-colors duration-300 group"
            >
              <span className="font-mono text-lg">View All Projects</span>
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </m.div>

          {/* Decorative Footer */}
          <m.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex justify-center items-center gap-4"
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyber-cyan/30" />
            <FolderGit2 className="text-cyber-cyan/50" size={24} />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyber-cyan/30" />
          </m.div>
        </div>
      </div>
    </section>
  );
}
