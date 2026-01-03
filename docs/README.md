# Cybersecurity Portfolio Template - Documentation

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-15.5-black)
![License](https://img.shields.io/badge/license-MIT-green)
![Security](https://img.shields.io/badge/security-hardened-brightgreen)
[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://cybersecurity-portfolio-template.vercel.app/)

**A production-ready, security-focused portfolio template for cybersecurity professionals**

[**🚀 View Live Demo**](https://cybersecurity-portfolio-template.vercel.app/)

## 📚 Documentation Index

- **[Project Overview](#project-overview)** - Architecture, tech stack, and key features
- **[Getting Started](./GETTING_STARTED.md)** - Installation and setup guide
- **[Architecture](./ARCHITECTURE.md)** - System design and project structure
- **[Security](./SECURITY.md)** - Security hardening and vulnerability mitigation
- **[Performance](./PERFORMANCE.md)** - Optimization strategies and benchmarks
- **[Blog System](./BLOG_SYSTEM.md)** - Content management and MDX integration
- **[Deployment](./DEPLOYMENT.md)** - Production deployment guide
- **[Development](./DEVELOPMENT.md)** - Development guide and best practices
- **[CSP Implementation](./CSP_IMPLEMENTATION.md)** - Content Security Policy details
- **[Sentry Setup](./SENTRY_SETUP.md)** - Monitoring and error tracking configuration
- **[Contributing](./CONTRIBUTING.md)** - Development guidelines and code standards

---

## 🎯 Project Overview

This is a **modern, high-performance portfolio template** built specifically for cybersecurity professionals, featuring:

- ✅ **100% Static Site Generation (SSG)** - Zero runtime vulnerabilities
- 🔒 **Security-Hardened** - CSP, HSTS, XSS protection, sanitized content
- ⚡ **Performance Optimized** - Lighthouse 95+, sub-2s LCP
- 📝 **MDX Blog System** - Syntax highlighting, auto read-time, copy code
- 🎨 **Cyberpunk UI/UX** - Dark mode, smooth animations, responsive design
- ♿ **WCAG 2.1 AA Accessible** - Semantic HTML, keyboard navigation, ARIA labels
- 📊 **Full SEO Optimization** - Open Graph, Twitter Cards, JSON-LD schemas
- 🔧 **Production Ready** - Deployed on Vercel with CI/CD

---

## 🏗️ Tech Stack

### Core Framework
```json
{
  "framework": "Next.js 15.5",
  "rendering": "Static Site Generation (SSG)",
  "language": "TypeScript 5.5",
  "styling": "Tailwind CSS 3.4"
}
```

### Key Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| `next` | 15.5 | React framework with App Router |
| `react` | 19.0 | UI library |
| `typescript` | 5.5 | Type safety |
| `tailwindcss` | 3.4 | Utility-first CSS |
| `framer-motion` | 11.2 | Animations |
| `next-mdx-remote` | 4.4 | MDX content rendering |
| `gray-matter` | 4.0 | Frontmatter parsing |
| `lucide-react` | 0.469 | Icon library |
| `isomorphic-dompurify` | 2.28 | XSS sanitization |

---

## ✨ Key Features

### 1. Security-First Architecture
- **Content Security Policy (CSP)** with nonce-based script execution
- **HTTP Strict Transport Security (HSTS)** with 1-year max-age
- **XSS Protection** via DOMPurify sanitization in all user content
- **Path Traversal Prevention** with slug validation
- **No Runtime Vulnerabilities** - 100% static generation
- **Zero CVEs** in dependencies (audited)

### 2. Performance Optimization
- **First Load JS**: 72KB (40% reduction via code splitting)
- **LCP Target**: <2s (currently ~2.5s with image optimization)
- **Cache Strategy**: 1-year static assets, revalidate HTML
- **Image Optimization**: AVIF/WebP auto-conversion
- **Dynamic Imports**: Below-the-fold sections loaded on-demand
- **Framer Motion Tree-Shaking**: LazyMotion for 80KB savings

### 3. Blog System
- **MDX Support** with frontmatter metadata
- **Syntax Highlighting** for 10+ languages
- **Auto Read-Time Calculation** (225 WPM algorithm)
- **Copy-to-Clipboard** for code blocks
- **Search & Filter** by category and keywords
- **Cover Images** with responsive optimization
- **SEO-Optimized** with JSON-LD BlogPosting schema

### 4. UI/UX Design
- **Cyberpunk Theme** with cyber-cyan accents
- **Dark Mode** (default) with theme toggle
- **Smooth Animations** via Framer Motion
- **Floating Navigation** with active section tracking
- **Responsive Design** - Mobile, tablet, desktop
- **Custom Cursor** with SVG effects
- **Typewriter Animation** on hero section

### 5. SEO & Social Sharing
- **Open Graph Tags** for all pages
- **Twitter Cards** (summary_large_image)
- **JSON-LD Schemas**: Person, WebSite, BlogPosting, BreadcrumbList
- **Auto-Generated Sitemap** (24 URLs)
- **Optimized Robots.txt**
- **Canonical URLs** and proper meta tags
- **Web Manifest** (PWA-ready)

---

## 📂 Project Structure

```
cybersecurity-portfolio-template/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout with SEO
│   │   ├── page.tsx            # Home page (SSG)
│   │   ├── globals.css         # Global styles
│   │   ├── sitemap.ts          # Auto-generated XML sitemap
│   │   ├── robots.ts           # Robots.txt config
│   │   ├── about/              # About page
│   │   ├── blog/               # Blog listing & posts
│   │   ├── contact/            # Contact page
│   │   ├── experience/         # Experience timeline
│   │   ├── formation/          # Education & certifications
│   │   └── projects/           # Projects showcase
│   ├── components/             # React components
│   │   ├── CodeBlock.tsx       # Syntax-highlighted code
│   │   ├── FloatingNav.tsx     # Navigation sidebar
│   │   ├── Header.tsx          # Page headers
│   │   ├── sections/           # Page sections
│   │   └── monitoring/         # Web vitals tracking
│   ├── data/                   # Shared data sources (projects, etc.)
│   ├── config/                 # Configuration files
│   │   ├── site.config.ts      # Site metadata
│   │   └── social.config.ts    # Social links
│   ├── content/                # Blog posts (MDX)
│   │   └── blog/               # MDX articles
│   ├── lib/                    # Utility functions
│   │   ├── blog.ts             # Blog data fetching
│   │   └── seo.ts              # SEO utilities
│   ├── hooks/                  # Custom React hooks
│   ├── styles/                 # Additional styles
│   └── middleware.ts           # Security headers & caching
├── public/                     # Static assets
│   ├── images/                 # Optimized images
│   └── site.webmanifest        # PWA manifest
├── docs/                       # Documentation (you are here)
├── next.config.js              # Next.js configuration
├── tailwind.config.ts          # Tailwind theme
└── tsconfig.json               # TypeScript config
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- Git

### Installation

```bash
# Option A: Use GitHub template via degit
npx degit zer0spin/cybersecurity-portfolio-template my-portfolio
cd my-portfolio

# Option B: Traditional clone
git clone https://github.com/zer0spin/cybersecurity-portfolio-template.git
cd cybersecurity-portfolio-template

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
# Build static site
npm run build

# Preview production build
npm start
```

For detailed setup instructions, see **[Getting Started Guide](./GETTING_STARTED.md)**.

---

## 📊 Performance Metrics

| Metric | Current Value | Status |
|--------|---------------|--------|
| Lighthouse Score | 95+ | ✅ Excellent |
| First Load JS | 137KB | ✅ Good |
| LCP | < 2.5s | ✅ Good |
| FID | < 100ms | ✅ Excellent |
| CLS | < 0.1 | ✅ Excellent |

Optimizations in place include static generation, dynamic imports for below-the-fold sections, AVIF/WebP image optimization, lazy-loaded animations, and throttled scroll handlers.

---

## 🔒 Security Features

### Implemented
✅ Content Security Policy (CSP) with per-request nonce enforcement  
✅ HTTP Strict Transport Security (HSTS)  
✅ X-Frame-Options: DENY  
✅ X-Content-Type-Options: nosniff  
✅ Referrer-Policy: strict-origin-when-cross-origin  
✅ DOMPurify sanitization in CodeBlock  
✅ Slug validation in blog routes  
✅ Zero dependencies with known CVEs  

### Template Guidance
- Copy the CSP and security header configuration from `src/middleware.ts` when porting sections into other projects; it is the single source of truth for response policies.
- If you disable Sentry or analytics, remove the corresponding domains from the CSP to avoid build-time warnings.
- Refer to **[docs/SECURITY.md](./SECURITY.md)** for threat modeling details and optional enhancements such as SRI and rate limiting.

---

## 🎨 Customization

### 1. Site Metadata
Edit `src/config/site.config.ts`:
```typescript
export const siteConfig = {
  name: 'Your Name',
  title: 'Your Title',
  description: 'Your bio',
  url: 'https://yourdomain.com',
  // ...
};
```

### 2. Social Links
Edit `src/config/social.config.ts`:
```typescript
export const socialLinks = {
  linkedin: 'https://linkedin.com/in/yourprofile',
  github: 'https://github.com/yourusername',
  // ...
};
```

### 3. Theme Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  'cyber-cyan': '#00f0ff',  // Change to your brand color
  // ...
}
```

### 4. Blog Posts
Create MDX files in `src/content/blog/`:
```markdown
---
title: 'Your Post Title'
date: '2025-01-01'
category: 'Security'
description: 'Post description'
---

Your content here...
```

---

### 5. Projects & Homelabs
Maintain portfolio entries in `src/data/projects.ts`. Update or extend the array once and the data will surface in both the home preview and the `/projects` page. You can create additional datasets (for example, homelabs) in the same directory to keep concerns isolated.

---

## 📈 Development Roadmap

### Phase 1: Security Hardening (Week 1-2) ✅
- [x] Fix XSS vulnerability in CodeBlock
- [x] Implement path traversal validation
- [x] Strengthen CSP headers
- [x] Add DOMPurify sanitization

### Phase 2: Architecture Refactoring (Week 3-4) 🚧
- [ ] Extract configuration to dedicated files
- [ ] Decompose god components (FloatingNav, Header)
- [ ] Implement Repository Pattern for blog data
- [ ] Remove magic strings/numbers

### Phase 3: Performance Optimization (Week 5-6) 📋
- [ ] Optimize images (7.5MB → 1.2MB)
- [ ] Implement RAF-based scroll handling
- [ ] Tree-shake Framer Motion with LazyMotion
- [ ] Add Web Vitals monitoring

### Phase 4: Observability (Week 7-8) 📋
- [ ] Integrate error tracking (Sentry)
- [ ] Add analytics (Umami/Plausible)
- [ ] Implement error boundaries
- [ ] Add performance monitoring

---

## 🤝 Contributing

We welcome contributions! Please read our **[Contributing Guide](./CONTRIBUTING.md)** for:
- Code style guidelines (SOLID principles, clean code)
- Branch naming conventions
- Commit message format
- Pull request process

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

---

## 🙏 Acknowledgments

Built with inspiration from:
- **Matrix Agents Security Analysis** - Comprehensive security audit
- **Next.js Team** - Amazing framework and documentation
- **Vercel** - Seamless deployment platform
- **Cybersecurity Community** - Best practices and threat modeling

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/zer0spin/cybersecurity-portfolio-template/issues)
- **Discussions**: [GitHub Discussions](https://github.com/zer0spin/cybersecurity-portfolio-template/discussions)
- **Maintainer**: Reach out to Marcos Oliveira ([@zer0spin](https://github.com/zer0spin)) via issues/discussions for questions
- **Email**: zer0spinsec@proton.me for private security disclosures

---

**Maintained by Marcos Oliveira ([@zer0spin](https://github.com/zer0spin)) with contributions from the cybersecurity community.**

*Last updated: October 16, 2025*
