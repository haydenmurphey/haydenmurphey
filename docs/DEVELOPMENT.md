# Development Guide

![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)
![Next.js](https://img.shields.io/badge/Next.js-15.5-black)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)

**Comprehensive guide for developers customizing and extending this portfolio template**

---

## 📋 Table of Contents

1. [Development Setup](#development-setup)
2. [Project Structure](#project-structure)
3. [Configuration Files](#configuration-files)
4. [Adding Content](#adding-content)
5. [Customization Guide](#customization-guide)
6. [Component Development](#component-development)
7. [Styling](#styling)
8. [Build & Deployment](#build--deployment)
9. [Troubleshooting](#troubleshooting)

---

## 🛠️ Development Setup

### Prerequisites

- **Node.js** 18.0.0 or higher
- **npm** 9.0.0 or higher
- **Git**
- **Code Editor** (VS Code recommended)

### Initial Setup

```bash
# Clone the canonical repository or your fork
git clone https://github.com/zer0spin/cybersecurity-portfolio-template.git
cd cybersecurity-portfolio-template

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Start development server
npm run dev
```

### Development Server

```bash
# Start server (default: http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Analyze bundle size
npm run analyze
```

---

## 📁 Project Structure

### Directory Overview

```
cybersecurity-portfolio-template/
├── public/                  # Static assets
│   ├── images/             # Images (will be optimized)
│   │   ├── about/          # About page images
│   │   ├── blog/           # Blog post covers
│   │   ├── projects/       # Project screenshots
│   │   └── site/           # Site-wide images (OG, favicon)
│   ├── favicon.ico         # Site favicon
│   └── site.webmanifest    # PWA manifest
│
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── layout.tsx      # Root layout (SEO, metadata)
│   │   ├── page.tsx        # Homepage
│   │   ├── globals.css     # Global styles + Tailwind
│   │   ├── sitemap.ts      # Sitemap generation
│   │   ├── robots.ts       # Robots.txt configuration
│   │   ├── about/          # About page route
│   │   ├── blog/           # Blog routes
│   │   │   ├── page.tsx    # Blog listing
│   │   │   └── [slug]/     # Individual blog post
│   │   ├── contact/        # Contact page
│   │   ├── experience/     # Professional experience
│   │   ├── formation/      # Education & certifications
│   │   ├── homelabs/       # Homelab projects
│   │   └── projects/       # Projects showcase
│   │
│   ├── components/         # React components
│   │   ├── home/           # Homepage preview sections
│   │   ├── layout/         # Header, floating navigation, shared chrome
│   │   ├── pages/          # Page-specific sections (Experience, Formation, etc.)
│   │   ├── ui/             # Shared UI primitives (SectionTitle, CodeBlock, etc.)
│   │   ├── monitoring/     # Web Vitals instrumentation
│   │   ├── motion/         # LazyMotion wrapper for Framer Motion
│   │   └── error/          # Error boundary and fallback components
│   │
│   ├── config/             # Configuration files
│   │   ├── site.config.ts  # Site metadata ⚠️ Update this!
│   │   ├── social.config.ts # Social links ⚠️ Update this!
│   │   └── constants/      # Constants (navigation, etc.)
│   │
│   ├── content/            # MDX content
│   │   ├── blog/           # Blog posts (MDX)
│   │   └── homelabs/       # Homelab writeups (MDX)
│   │
│   ├── data/               # Structured data
│   │   └── projects.ts     # Projects data ⚠️ Update this!
│   │
│   ├── lib/                # Utility functions
│   │   ├── blog.ts         # Blog data access
│   │   └── seo.ts          # SEO utilities
│   │
│   ├── hooks/              # Custom React hooks
│   │   ├── useNavigation.ts
│   │   └── useTheme.ts
│   │
│   └── middleware.ts       # Security headers & caching
│
├── docs/                   # Documentation
│   ├── ARCHITECTURE.md     # Architecture guide
│   ├── SECURITY.md         # Security documentation
│   ├── DEPLOYMENT.md       # Deployment guide
│   ├── PERFORMANCE.md      # Performance optimization
│   ├── BLOG_SYSTEM.md      # Blog system guide
│   └── CONTRIBUTING.md     # Contribution guidelines
│
├── .env.example            # Environment variables template
├── next.config.js          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies
├── README.md               # Project overview
├── CHANGELOG.md            # Version history
└── SECURITY.md             # Security policy
```

---

## ⚙️ Configuration Files

### 1. Site Configuration (`src/config/site.config.ts`)

**REQUIRED: Update with your information!**

```typescript
export const siteConfig = {
  name: 'Your Name - Cybersecurity Professional',
  codename: 'your-handle',
  author: {
    name: 'Your Full Name',
    jobTitle: 'Your Title',
    tagline: 'Your tagline',
    description: 'Your bio',
  },
  urls: {
    base: 'https://yourdomain.com',
    canonical: 'https://yourdomain.com',
  },
  seo: {
    title: 'Your SEO Title',
    description: 'Your SEO description',
    keywords: ['your', 'keywords'],
  },
};
```

### 2. Social Configuration (`src/config/social.config.ts`)

**REQUIRED: Update with your social profiles!**

```typescript
export const socialConfig = {
  linkedin: {
    username: 'your-linkedin-username',
    url: 'https://linkedin.com/in/your-linkedin-username',
  },
  github: {
    username: 'your-github-username',
    url: 'https://github.com/your-github-username',
  },
  twitter: {
    username: 'your-twitter-handle',
    url: 'https://twitter.com/your-twitter-handle',
  },
};
```

### 3. Environment Variables (`.env.local`)

Optional configuration:

```bash
# Site URL
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Search Console (Optional)
NEXT_PUBLIC_GOOGLE_VERIFICATION=your-code
NEXT_PUBLIC_BING_VERIFICATION=your-code

# Sentry (Optional)
NEXT_PUBLIC_SENTRY_DSN=your-dsn

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## 📝 Adding Content

### Blog Posts

Create MDX files in `src/content/blog/`:

```mdx
---
title: 'Your Post Title'
description: 'SEO-friendly description (150-160 chars)'
date: '2025-01-15'
category: 'Security'  # Security, DevOps, Projects, Automation
author: 'Your Name'
featured: false
coverImage: '/images/blog/your-post-cover.png'
tags: ['Tag1', 'Tag2', 'Tag3']
---

# Your Content Here

Write your content using **Markdown** syntax!

## Code Examples

\```javascript
console.log('Hello, World!');
\```

## Images

![Alt text](/images/blog/image.png)
```

### Projects

Update `src/data/projects.ts`:

```typescript
export const projects = [
  {
    title: 'Your Project Name',
    description: 'Brief project description',
    image: '/images/projects/project-name.png',
    status: 'Production', // Production, Development, Planning
    statusColor: 'bg-cyber-green',
    tags: ['Security', 'Python', 'Docker'],
    links: {
      github: 'https://github.com/you/project',
      demo: 'https://demo.example.com', // Optional
      article: '/blog/project-article', // Optional
    },
  },
];
```

### Experience

Edit `src/components/pages/Experience.tsx`:

```typescript
const experiences = [
  {
    company: 'Company Name',
    position: 'Your Position',
    period: '2024 - Present',
    description: 'Role description and achievements',
    technologies: ['Tech1', 'Tech2', 'Tech3'],
  },
];
```

### Education & Certifications

Edit `src/components/pages/Formation.tsx`:

```typescript
const educationData = [
  {
    title: 'Degree or Certification Name',
    organization: 'Institution Name',
    period: '2020 - 2024',
    type: 'degree', // 'degree', 'postgrad', 'certification'
    description: 'Brief description',
    icon: '🎓',
  },
];
```

---

## 🎨 Customization Guide

### Theme Colors

Edit `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      'cyber-cyan': '#00f0ff',    // Primary accent
      'cyber-green': '#00ff9f',   // Success color
      'cyber-purple': '#b026ff',  // Secondary accent
      'cyber-dark': '#0a0e1a',    // Background
      'cyber-navy': '#1a1f35',    // Card background
      // Customize these!
    }
  }
}
```

### Fonts

Update `src/app/layout.tsx`:

```typescript
import { Inter, Space_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono',
});
```

### Animations

Adjust animation timing in components using Framer Motion:

```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.1 }}
>
  {/* Content */}
</motion.div>
```

---

## 🧩 Component Development

### Creating New Components

```typescript
// src/components/features/YourComponent.tsx
'use client'; // If component uses hooks/interactivity

import { motion } from 'framer-motion';

interface YourComponentProps {
  title: string;
  description?: string;
}

export function YourComponent({ title, description }: YourComponentProps) {
  return (
    <motion.div
      className="p-6 bg-cyber-navy rounded-lg border border-cyber-cyan/20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h3 className="text-xl font-bold text-cyber-cyan">{title}</h3>
      {description && <p className="mt-2 text-gray-400">{description}</p>}
    </motion.div>
  );
}
```

### Component Best Practices

1. **Server Components by Default** - Use 'use client' only when needed
2. **TypeScript Interfaces** - Always define prop types
3. **Accessibility** - Include ARIA labels and semantic HTML
4. **Performance** - Lazy load heavy components
5. **Styling** - Use Tailwind classes consistently

---

## 🎨 Styling

### Tailwind CSS

```typescript
// Responsive Design
<div className="flex flex-col md:flex-row lg:grid lg:grid-cols-3">

// Dark Theme Colors
<div className="bg-cyber-dark text-cyber-cyan">

// Hover Effects
<button className="hover:bg-cyber-cyan/10 hover:shadow-lg hover:shadow-cyber-cyan/20">

// Animations
<div className="transition-all duration-300 ease-in-out">
```

### Custom Styles

Add custom CSS to `src/app/globals.css`:

```css
@layer components {
  .custom-class {
    @apply bg-cyber-navy text-cyber-cyan;
  }
}
```

---

## 🚀 Build & Deployment

### Production Build

```bash
# Build
npm run build

# Check build output
# Look for:
# ✓ All pages are static (SSG)
# ✓ No errors or warnings
# ✓ Reasonable bundle sizes

# Test locally
npm start
```

### Environment-Specific Builds

```bash
# Production
NODE_ENV=production npm run build

# Staging
NODE_ENV=staging npm run build
```

### Pre-Deployment Checklist

- [ ] Updated all personal information in configs
- [ ] Replaced placeholder images
- [ ] Added at least 2-3 blog posts
- [ ] Updated projects section
- [ ] Tested build locally
- [ ] Checked Lighthouse score (>90)
- [ ] Verified all links work
- [ ] Reviewed security headers

---

## 🐛 Troubleshooting

### Common Issues

#### Build Fails with Module Not Found

```bash
# Solution: Clean install
rm -rf node_modules package-lock.json .next
npm install
```

#### Images Not Loading

- Ensure images are in `public/` directory
- Use paths starting with `/` (e.g., `/images/blog/cover.png`)
- Check image file extensions match imports

#### TypeScript Errors

```bash
# Check types
npm run lint

# Rebuild
rm -rf .next
npm run build
```

#### Hot Reload Not Working

```bash
# Restart dev server
# Press Ctrl+C
npm run dev
```

#### Styles Not Applying

```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### Performance Issues

1. **Optimize Images**: Use Next.js Image component
2. **Code Splitting**: Dynamic imports for large components
3. **Bundle Analysis**: Run `npm run analyze`
4. **Lazy Loading**: Use React.lazy for below-fold content

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Guide](https://www.framer.com/motion/)
- [MDX Documentation](https://mdxjs.com/)

---

## 🤝 Getting Help

- **Documentation**: Check other docs in `/docs` folder
- **Issues**: [GitHub Issues](https://github.com/zer0spin/cybersecurity-portfolio-template/issues)
- **Discussions**: [GitHub Discussions](https://github.com/zer0spin/cybersecurity-portfolio-template/discussions)
- **Maintainer**: Contact Marcos Oliveira ([@zer0spin](https://github.com/zer0spin)) via issues/discussions; email [zer0spinsec@proton.me](mailto:zer0spinsec@proton.me) for private security matters

---

**Happy coding! Build something amazing.** 🚀

*Last updated: October 16, 2025*
