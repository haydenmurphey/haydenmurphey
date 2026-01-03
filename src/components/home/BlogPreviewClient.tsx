'use client';

import { m } from 'framer-motion';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import type { BlogPostMetadata } from '@/lib/blog';
import { formatDate } from '@/lib/date-utils';

interface BlogPreviewClientProps {
  posts: BlogPostMetadata[];
}

export default function BlogPreviewClient({ posts: latestPosts }: BlogPreviewClientProps) {
  return (
    <section
      id="blog-preview"
      className="min-h-screen py-20 bg-gradient-to-br from-cyber-darker via-cyber-dark to-cyber-navy"
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
            KNOWLEDGE SHARING
          </m.p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My recent logs
          </h2>
          <p className="text-cyber-gray-light text-lg max-w-2xl mx-auto mb-6">
            Technical articles & insights on Cybersecurity
          </p>
          <m.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-24 h-1 bg-gradient-to-r from-transparent via-cyber-cyan to-transparent mx-auto"
          />
        </m.div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {latestPosts.map((post, index) => (
            <m.article
              key={post.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full flex flex-col bg-cyber-teal-dark/30 backdrop-blur-sm border border-cyber-green/20 rounded-xl overflow-hidden hover:border-cyber-green/50 hover:shadow-glow-green transition-all duration-300">
                {/* Featured Image - Clickable */}
                <Link href={`/blog/${post.slug}`} className="block relative aspect-video bg-cyber-navy/30 cursor-pointer overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyber-green/10 to-cyber-cyan/10 z-10" />
                  {/* Show cover image for each post */}
                  {post.coverImage ? (
                    <Image 
                      src={post.coverImage} 
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center p-6">
                      <svg className="w-full h-full max-w-[150px] text-cyber-green/30" viewBox="0 0 200 150" fill="currentColor">
                        <rect x="20" y="30" width="160" height="90" rx="8" fill="none" stroke="currentColor" strokeWidth="2" />
                        <rect x="30" y="40" width="50" height="30" rx="4" fill="currentColor" opacity="0.3" />
                        <line x1="90" y1="45" x2="160" y2="45" stroke="currentColor" strokeWidth="2" />
                        <line x1="90" y1="55" x2="140" y2="55" stroke="currentColor" strokeWidth="2" />
                        <line x1="30" y1="85" x2="160" y2="85" stroke="currentColor" strokeWidth="1.5" />
                        <line x1="30" y1="95" x2="160" y2="95" stroke="currentColor" strokeWidth="1.5" />
                        <line x1="30" y1="105" x2="120" y2="105" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    </div>
                  )}
                </Link>

                {/* Post Content */}
                <div className="flex-1 p-6 flex flex-col">
                  {/* Category Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded-full mb-3 w-fit">
                    <span className="text-xs text-cyber-green font-mono">
                      {post.category}
                    </span>
                  </div>

                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyber-green transition-colors cursor-pointer">
                      {post.title}
                    </h3>
                  </Link>

                    <p className="text-cyber-gray mb-4 leading-relaxed text-sm flex-1">
                    {post.description}
                  </p>

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-3 text-xs text-cyber-gray-light pt-4 border-t border-cyber-cyan/10">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} className="text-cyber-green" />
                      {formatDate(post.date, 'short')}
                    </span>
                    <span className="text-cyber-cyan/30">•</span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} className="text-cyber-green" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </m.article>
          ))}
        </div>

        {/* View All Button - Desktop */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="hidden md:flex justify-center"
        >
          <Link
            href="./blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-cyber-green/10 border border-cyber-green/30 rounded-lg text-cyber-green hover:bg-cyber-green/20 hover:shadow-neon-green transition-all duration-300 group"
          >
            <span className="font-mono text-sm">View All</span>
            <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </m.div>

        {/* View All Button - Mobile */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center md:hidden"
        >
          <Link
            href="./blog"
            className="inline-flex items-center gap-2 px-8 py-4 bg-cyber-green text-cyber-dark font-bold rounded-lg hover:shadow-neon-green hover:scale-105 transition-all duration-300 group"
          >
            View All Articles
            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </m.div>
      </div>
    </section>
  );
}
