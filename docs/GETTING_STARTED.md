# Getting Started Guide

![Next.js](https://img.shields.io/badge/Next.js-15.5-black)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)

**Complete setup guide for deploying the Cybersecurity Portfolio Template**

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.0.0 or higher ([Download](https://nodejs.org/))
- **npm** 9.0.0 or higher (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))
- **Code Editor** (VS Code recommended)

### Verify Installation

```bash
node --version  # Should be v18.0.0 or higher
npm --version   # Should be 9.0.0 or higher
git --version   # Any recent version
```

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
# Option A: Use GitHub template (recommended)
# Click "Use this template" on GitHub, then clone your new repository:
git clone https://github.com/<your-username>/<your-portfolio-repo>.git
cd <your-portfolio-repo>

# Option B: Clone directly from the canonical repository
git clone https://github.com/zer0spin/cybersecurity-portfolio-template.git
cd cybersecurity-portfolio-template
```

### 2. Install Dependencies

```bash
# Install all dependencies
npm install

# This will install:
# - Next.js 15.5
# - React 19
# - TypeScript 5.5
# - Tailwind CSS 3.4
# - And all other dependencies
```

### 3. Configure Environment

```bash
# Create environment variables file
cp .env.example .env.local

# Edit .env.local with your values
# (See Configuration section below)
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. You should see the portfolio homepage.

### 5. Build for Production

```bash
# Create optimized production build
npm run build

# Test production build locally
npm start
```

---

## ⚙️ Configuration

### Site Metadata

Edit `src/config/site.config.ts`:

```typescript
export const siteConfig = {
  // Personal Information
  name: 'Your Name',
  title: 'Your Professional Title',
  description: 'Your professional bio (150-160 characters for SEO)',
  
  // URLs
  url: 'https://yourdomain.com',
  locale: 'en-US',
  
  // Contact
  email: 'your.email@example.com',
  
  // Verification Codes (optional)
  googleVerification: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  bingVerification: process.env.NEXT_PUBLIC_BING_VERIFICATION,
};
```

### Social Links

Edit `src/config/social.config.ts`:

```typescript
export const socialLinks = {
  linkedin: 'https://linkedin.com/in/yourprofile',
  github: 'https://github.com/yourusername',
  twitter: 'https://twitter.com/yourhandle',
  email: 'mailto:your.email@example.com',
};
```

### Theme Customization

Edit `tailwind.config.ts` to customize colors:

```typescript
theme: {
  extend: {
    colors: {
      'cyber-cyan': '#00f0ff',      // Primary accent color
      'cyber-green': '#00ff9f',     // Success/highlight color
      'cyber-purple': '#b026ff',    // Secondary accent
      'cyber-dark': '#0a0e1a',      // Background dark
      'cyber-navy': '#1a1f35',      // Card background
      // Customize these to match your brand
    }
  }
}
```

### Environment Variables

Create `.env.local` file in the root:

```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Search Console Verification (optional)
NEXT_PUBLIC_GOOGLE_VERIFICATION=your-google-verification-code
NEXT_PUBLIC_BING_VERIFICATION=your-bing-verification-code

# Analytics (optional - for future implementation)
# NEXT_PUBLIC_UMAMI_WEBSITE_ID=your-umami-id
# NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.com

# Sentry Monitoring (optional)
# NEXT_PUBLIC_SENTRY_DSN=https://example.ingest.sentry.io/123
# SENTRY_ORG=your-org
# SENTRY_PROJECT=your-project
```

---

## 📝 Content Management

### Creating Blog Posts

1. Create a new `.mdx` file in `src/content/blog/`:

```bash
touch src/content/blog/my-new-post.mdx
```

2. Add frontmatter and content:

```mdx
---
title: 'Your Post Title'
description: 'Brief description for SEO and preview cards'
date: '2025-10-14'
category: 'Security'  # Or: DevOps, Projects, Automation
author: 'Your Name'
featured: false       # Set true for featured post
coverImage: '/images/blog/my-post-cover.png'
tags: ['Tag1', 'Tag2', 'Tag3']
---

# Your Post Title

Your content here...

## Code Examples

```javascript
console.log('Hello, World!');
\```

## Images

![Alt text](/images/blog/image.png)
```

3. Add cover image:

```bash
# Place cover image in public/images/blog/
# Recommended size: 1200x630px (Open Graph standard)
# Format: PNG or JPG (will be auto-optimized to WebP/AVIF)
```

### Content Guidelines

- **Title**: 50-60 characters for optimal SEO
- **Description**: 150-160 characters
- **Category**: Choose from: Security, DevOps, Projects, Automation
- **Tags**: 3-5 relevant tags
- **Cover Image**: 1200x630px, <500KB
- **Content**: Use proper markdown formatting

### Updating Projects

Edit `src/data/projects.ts`. This single source populates both the home preview and the `/projects` page.

```typescript
export const projects = [
  {
    title: 'Project Name',
    description: 'Brief project description',
    image: '/images/projects/project-name.png',
    status: 'Production',
    statusColor: 'bg-cyber-green',
    tags: ['Tag1', 'Tag2', 'Tag3'],
    links: {
      github: 'https://github.com/username/repo',
      demo: 'https://demo.example.com',
    },
  },
];
```

### Updating Experience

Edit `src/components/pages/Experience.tsx`:

```typescript
const experiences = [
  {
    company: 'Company Name',
    position: 'Your Position',
    period: '2024 - Present',
    description: 'Role description and key achievements',
    technologies: ['Tech1', 'Tech2', 'Tech3'],
  },
  // Add more experiences...
];
```

### Updating Education

Edit `src/components/pages/Formation.tsx`:

```typescript
const educationData = [
  {
    title: 'Degree Name',
    organization: 'University Name',
    period: '2020 - 2024',
    type: 'degree',
    description: 'Brief description',
    extraSections: [
      {
        title: 'Research Projects',
        items: ['Highlight 1', 'Highlight 2'],
        accent: 'cyan',
      },
    ],
  },
  // Add more education entries...
];
```

---

## 🖼️ Image Optimization

### Image Guidelines

| Type | Size | Format | Location |
|------|------|--------|----------|
| Blog Covers | 1200x630px | PNG/JPG | `/public/images/blog/` |
| Project Images | 800x600px | PNG/JPG | `/public/images/projects/` |
| Profile Photo | 400x400px | PNG/JPG | `/public/images/about/` |
| Favicon | 512x512px | PNG | `/public/` |
| OG Image | 1200x630px | PNG | `/public/images/site/` |

### Optimization Tips

```bash
# Install Sharp for image optimization (already included)
npm install sharp

# Optimize images before adding
# Use tools like:
# - TinyPNG (https://tinypng.com/)
# - Squoosh (https://squoosh.app/)
# - ImageOptim (Mac)
```

### Using Next.js Image Component

```typescript
import Image from 'next/image';

<Image
  src="/images/blog/cover.png"
  alt="Descriptive alt text"
  width={1200}
  height={630}
  priority={false}  // Set true for above-the-fold images
/>
```

---

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**:
```bash
git add .
git commit -m "Initial setup"
git push origin main
```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure:
     - Framework Preset: **Next.js**
     - Build Command: `npm run build`
     - Output Directory: `.next`
   - Add environment variables (if any)
   - Click "Deploy"

3. **Configure Custom Domain** (optional):
   - Go to project settings
   - Add your custom domain
   - Update DNS records as shown

### Netlify

1. **Build Settings**:
```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

2. **Deploy**:
   - Connect GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `.next`
   - Deploy

### Other Platforms

- **AWS Amplify**: Use Next.js preset
- **Cloudflare Pages**: Use `npm run build` and `.next` output
- **Railway**: Use Next.js template
- **Render**: Use static site with Next.js

---

## 🧪 Testing Your Site

### Before Deployment Checklist

- [ ] All personal information updated
- [ ] Social links configured
- [ ] At least 1-2 blog posts created
- [ ] Projects section updated
- [ ] Experience section updated
- [ ] Images optimized and added
- [ ] Environment variables set
- [ ] Build succeeds locally (`npm run build`)
- [ ] No console errors in browser
- [ ] Mobile responsive checked
- [ ] Lighthouse score >90

### Run Lighthouse Audit

```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run audit (after starting production server)
npm run build
npm start
lighthouse http://localhost:3000 --view
```

### Check Build Output

```bash
npm run build

# Look for:
# ✓ All pages pre-rendered (SSG)
# ✓ No errors or warnings
# ✓ Reasonable bundle sizes
# ✓ Image optimization working
```

---

## 🔧 Troubleshooting

### Build Errors

**Error**: `Module not found`
```bash
# Solution: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Error**: `TypeScript errors`
```bash
# Solution: Check types
npm run lint
# Fix errors shown
```

**Error**: `Image optimization failed`
```bash
# Solution: Check image paths and formats
# Ensure images exist in public/ directory
# Verify image paths start with /
```

### Development Issues

**Issue**: Hot reload not working
```bash
# Solution: Restart dev server
# Press Ctrl+C
npm run dev
```

**Issue**: Styles not updating
```bash
# Solution: Clear Next.js cache
rm -rf .next
npm run dev
```

**Issue**: Environment variables not loading
```bash
# Solution: Restart dev server after changing .env.local
# Ensure variables start with NEXT_PUBLIC_ for client-side
```

### Performance Issues

**Issue**: Slow build times
```bash
# Solution: 
# 1. Optimize images before adding
# 2. Reduce number of blog posts during development
# 3. Use npm run dev instead of build for testing
```

---

## 📚 Next Steps

After basic setup:

1. **Customize Design**: Adjust colors, fonts, animations
2. **Add Content**: Write blog posts, update projects
3. **Implement Analytics**: Add Umami or Plausible
4. **Set Up Monitoring**: Implement error tracking
5. **SEO Optimization**: Submit sitemap to Google Search Console
6. **Performance**: Follow [PERFORMANCE.md](./PERFORMANCE.md) guide
7. **Security**: Review [SECURITY.md](./SECURITY.md) checklist

---

## 🆘 Getting Help

- **Documentation**: Check other docs in `/docs` folder
- **Issues**: [GitHub Issues](https://github.com/zer0spin/cybersecurity-portfolio-template/issues)
- **Discussions**: [GitHub Discussions](https://github.com/zer0spin/cybersecurity-portfolio-template/discussions)
- **Maintainer**: Contact Marcos Oliveira ([@zer0spin](https://github.com/zer0spin)) via issues/discussions for questions; email [zer0spinsec@proton.me](mailto:zer0spinsec@proton.me) for private disclosures
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)

---

## 📝 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [MDX Documentation](https://mdxjs.com/)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Ready to build something amazing!** 🚀

**Maintained by Marcos Oliveira ([@zer0spin](https://github.com/zer0spin)) with contributions from the cybersecurity community.**

*Last updated: October 16, 2025*
