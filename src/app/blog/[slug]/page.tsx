import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Calendar, Clock, ArrowLeft, User } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import type { ComponentPropsWithoutRef } from 'react';
import type { MDXComponents } from 'mdx/types';
import { getPostBySlug, getAllPostSlugs } from '@/lib/blog';
import { CodeBlock } from '@/components/ui';
import { formatDate } from '@/lib/date-utils';

import { generateSEO, generateBlogPostSchema, generateBreadcrumbSchema } from '@/lib/seo';
import '@/styles/code-highlight.css';

// Metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  // Generate SEO metadata with all Open Graph and Twitter Card tags
  return generateSEO({
    title: post.title,
    description: post.description,
    url: `/blog/${slug}`,
    image: post.coverImage || '/images/site/og-default.png',
    type: 'article',
    publishedTime: post.date,
    author: post.author,
    tags: [post.category, 'cybersecurity', 'blue team', 'security blog', 'infosec'],
  });
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Custom MDX components for styling
const components = {
  h1: (props: ComponentPropsWithoutRef<'h1'>) => (
    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 mt-8" {...props} />
  ),
  h2: (props: ComponentPropsWithoutRef<'h2'>) => (
    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 mt-8 border-l-4 border-cyber-cyan pl-4" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<'h3'>) => (
    <h3 className="text-2xl md:text-3xl font-bold text-cyber-cyan mb-3 mt-6" {...props} />
  ),
  h4: (props: ComponentPropsWithoutRef<'h4'>) => (
    <h4 className="text-xl md:text-2xl font-bold text-cyber-green mb-2 mt-4" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<'p'>) => (
    <p className="text-cyber-gray-light text-lg leading-relaxed mb-4" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<'ul'>) => (
    <ul className="list-disc list-inside space-y-2 mb-4 text-cyber-gray-light ml-4" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<'ol'>) => (
    <ol className="list-decimal list-inside space-y-2 mb-4 text-cyber-gray-light ml-4" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<'li'>) => (
    <li className="text-cyber-gray-light" {...props} />
  ),
  a: (props: ComponentPropsWithoutRef<'a'>) => (
    <a className="text-cyber-cyan hover:text-cyber-green underline transition-colors" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote className="border-l-4 border-cyber-cyan bg-cyber-navy/30 p-4 my-4 italic text-cyber-gray-light" {...props} />
  ),
  code: (props: ComponentPropsWithoutRef<'code'>) => {
    const { children, className, ...rest } = props;
    const isInline = !className;
    
    if (isInline) {
      return (
        <code className="bg-cyber-navy/70 text-cyber-green px-2 py-1 rounded font-mono text-sm border border-cyber-cyan/20" {...rest}>
          {children}
        </code>
      );
    }
    
    // For code blocks, return the code element to be wrapped by pre
    return <code className={className} {...rest}>{children}</code>;
  },
  pre: (props: ComponentPropsWithoutRef<'pre'>) => {
    const { children, ...rest } = props;
    
    // Extract code content and className from children
    if (children && typeof children === 'object' && 'props' in children) {
      const childElement = children as { props: { children: unknown; className?: string } };
      const code = childElement.props.children;
      const className = childElement.props.className;
      
      if (typeof code === 'string') {
        return <CodeBlock className={className}>{code}</CodeBlock>;
      }
    }
    
    // Fallback to regular pre
    return (
      <pre className="bg-cyber-darker border border-cyber-cyan/30 rounded-lg p-6 overflow-x-auto my-6 font-mono text-sm shadow-lg shadow-cyber-cyan/5 relative" {...rest}>
        {children}
      </pre>
    );
  },
  hr: (props: ComponentPropsWithoutRef<'hr'>) => (
    <hr className="border-cyber-cyan/30 my-8" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-bold text-white" {...props} />
  ),
  em: (props: ComponentPropsWithoutRef<'em'>) => (
    <em className="italic text-cyber-cyan" {...props} />
  ),
  table: (props: ComponentPropsWithoutRef<'table'>) => (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full border border-cyber-cyan/30" {...props} />
    </div>
  ),
  thead: (props: ComponentPropsWithoutRef<'thead'>) => (
    <thead className="bg-cyber-navy/50" {...props} />
  ),
  tbody: (props: ComponentPropsWithoutRef<'tbody'>) => (
    <tbody className="divide-y divide-cyber-cyan/20" {...props} />
  ),
  tr: (props: ComponentPropsWithoutRef<'tr'>) => (
    <tr className="hover:bg-cyber-navy/30 transition-colors" {...props} />
  ),
  th: (props: ComponentPropsWithoutRef<'th'>) => (
    <th className="px-4 py-3 text-left text-cyber-cyan font-mono text-sm" {...props} />
  ),
  td: (props: ComponentPropsWithoutRef<'td'>) => (
    <td className="px-4 py-3 text-cyber-gray-light" {...props} />
  ),
} satisfies MDXComponents;

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Generate structured data for the blog post
  const blogPostSchema = generateBlogPostSchema({
    title: post.title,
    description: post.description,
    url: `/blog/${slug}`,
    image: post.coverImage,
    publishedTime: post.date,
    author: post.author,
    tags: post.tags,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.title, url: `/blog/${slug}` },
  ]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-cyber-darker via-cyber-dark to-cyber-navy">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Header Navigation */}
      <div className="container mx-auto px-6 py-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-cyber-cyan hover:text-cyber-green transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-mono">Back to Blog</span>
        </Link>
      </div>

      {/* Article Header */}
      <article className="container mx-auto px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Category Badge */}
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-cyber-cyan/10 border border-cyber-cyan/30 rounded-full text-cyber-cyan font-mono text-sm">
              {post.category}
            </span>
          </div>

          {/* Cover Image */}
          {post.coverImage && (
            <div className="relative aspect-video rounded-xl overflow-hidden border border-cyber-cyan/20 mb-8">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                priority
              />
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Description */}
          <p className="text-xl text-cyber-gray-light mb-8 leading-relaxed">
            {post.description}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-cyber-gray-light text-sm mb-8 pb-8 border-b border-cyber-cyan/20">
            <div className="flex items-center gap-2">
              <User size={18} className="text-cyber-cyan" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-cyber-cyan" />
              <span>
                {formatDate(post.date, 'long')}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-cyber-cyan" />
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-invert prose-lg max-w-none code-highlight">
            <MDXRemote source={post.content} components={components} />
          </div>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-cyber-cyan/20">
            <div className="flex items-center justify-between">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 bg-cyber-cyan/10 border border-cyber-cyan/30 rounded-lg text-cyber-cyan hover:bg-cyber-cyan/20 hover:shadow-neon-cyan transition-all duration-300 group"
              >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-mono text-sm">All Articles</span>
              </Link>

              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-cyber-green/10 border border-cyber-green/30 rounded-lg text-cyber-green hover:bg-cyber-green/20 hover:shadow-neon-green transition-all duration-300 group"
              >
                <span className="font-mono text-sm">Back to Home</span>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
