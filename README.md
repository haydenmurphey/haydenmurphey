# Cybersecurity Portfolio Template – Blue Team Edition

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Security](https://img.shields.io/badge/security-98%2F100-brightgreen?style=flat-square)](docs/SECURITY.md)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Lighthouse](https://img.shields.io/badge/Lighthouse-100-success?style=flat-square)](docs/PERFORMANCE.md)
[![Zero CVEs](https://img.shields.io/badge/CVEs-0-success?style=flat-square)](#)
[![CSP Hardened](https://img.shields.io/badge/CSP-Nonce--Based-success?style=flat-square)](#)
[![Live Demo](https://img.shields.io/badge/demo-live-success?style=flat-square)](https://cybersecurity-portfolio-template.vercel.app/)

**A production-ready, security-hardened portfolio template designed specifically for cybersecurity professionals**

[**🚀 View Live Demo**](https://cybersecurity-portfolio-template.vercel.app/)

Perfect for security analysts, penetration testers, SOC engineers, and anyone in the cybersecurity field looking to showcase their work with a modern, secure, and high-performance portfolio. Maintained by [Marcos Oliveira (@zer0spin)](https://github.com/zer0spin) with support from the Blue Team community.

## 🎯 About This Project

A modern, high-performance portfolio template specifically designed for cybersecurity professionals, with a focus on security, clean architecture, and best practices.

### ✨ Key Features

- 🔒 **Security-First**: Nonce-based CSP, XSS protection, path traversal prevention, JSON sanitization
- ⚡ **Performance Optimized**: Lighthouse 100, LCP < 2.5s, throttled scroll tracking, DOM caching
- 📝 **MDX Blog System**: Syntax highlighting, auto read-time, copy code, SEO optimized
- 📱 **Fully Responsive**: Mobile-first design, optimized for all devices
- ♿ **WCAG 2.1 AA Accessible**: ARIA labels, semantic HTML, reduced motion support
- 🛰️ **Sentry Monitoring Ready**: Optional integrations for error tracking, performance, and session replay
- 🚀 **Production Ready**: Zero CVEs, automated builds, comprehensive documentation
- 🏗️ **Clean Architecture**: SOLID principles, composable data layers, type-safe TypeScript

## 🛠️ Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| **Runtime** | [Node.js](https://nodejs.org/) | 18.0+ |
| **Framework** | [Next.js](https://nextjs.org/) | 15.5 |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | 5.5 |
| **UI Library** | [React](https://react.dev/) | 19.0 |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | 3.4 |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) | 11.2 |
| **Icons** | [Lucide React](https://lucide.dev/) | 0.469 |
| **Blog** | [MDX](https://mdxjs.com/) | 4.4 (next-mdx-remote) |
| **Security** | [DOMPurify](https://github.com/cure53/DOMPurify) | 2.28 |
| **Deployment** | [Vercel](https://vercel.com/) | Recommended |

### Key Dependencies
- `gray-matter` - Frontmatter parsing
- `isomorphic-dompurify` - XSS sanitization
- Zero dependencies with known CVEs ✅

## 🚀 Quick Start

### Prerequisites

- Node.js 18.0.0 or higher
- npm 9.0.0 or higher
- Git

### Installation

#### Option 1: Use as Template (Recommended)

1. **Click "Use this template" button** on GitHub
2. **Create your repository** with a new name
3. **Clone your repository**
  ```bash
  git clone https://github.com/<your-username>/<your-portfolio-repo>.git
  cd <your-portfolio-repo>
  ```

#### Option 2: Fork or Clone

1. **Clone the repository**
  ```bash
  git clone https://github.com/zer0spin/cybersecurity-portfolio-template.git
  cd cybersecurity-portfolio-template
  ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local   # macOS/Linux
   # copy .env.example .env.local   # Windows
   ```
   Update `.env.local` with your values. All variables are optional - the site works without them.

4. **Start the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

For detailed setup instructions, see **[Getting Started Guide](./docs/GETTING_STARTED.md)**.

## ⚙️ Environment Variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SENTRY_DSN` | No | Enables Sentry on the client, edge, and server. Leave unset to skip error monitoring entirely. |
| `SENTRY_ORG` | No | Used by the Sentry build plugin to upload source maps. Only needed if you provide a DSN and want release artifacts. |
| `SENTRY_PROJECT` | No | Companion to `SENTRY_ORG` for source map uploads. |
| `SENTRY_AUTH_TOKEN` | No | Authenticates source map uploads during CI/CD. Keep it in deployment environments only. |
| `NEXT_PUBLIC_GA_ID` | No | Optional Google Analytics 4 measurement ID if you add GA tracking. |

- Vercel Analytics and Speed Insights ship enabled via `<Analytics />` and `<SpeedInsights />`; they do not require environment variables.
- Next.js manages `NODE_ENV` automatically during `next dev`, `next build`, and production runs.

## 📁 Project Structure

```
cybersecurity-portfolio-template/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout with SEO
│   │   ├── page.tsx            # Home page (SSG)
│   │   ├── globals.css         # Global styles + Tailwind
│   │   ├── sitemap.ts          # Auto-generated sitemap
│   │   ├── robots.ts           # Robots.txt config
│   │   ├── about/              # About page
│   │   ├── blog/               # Blog listing & posts
│   │   ├── contact/            # Contact page
│   │   ├── experience/         # Experience timeline
│   │   ├── formation/          # Education & certifications
│   │   └── projects/           # Projects showcase
│   ├── components/             # React components
│   │   ├── CodeBlock.tsx       # Syntax-highlighted code (XSS protected)
│   │   ├── FloatingNav.tsx     # Navigation sidebar
│   │   ├── Header.tsx          # Page headers
│   │   └── sections/           # Page sections
│   ├── data/                   # Shared data sources (projects, etc.)
│   ├── config/                 # Configuration files
│   │   ├── site.config.ts      # Site metadata
│   │   ├── social.config.ts    # Social links
│   │   └── constants/          # Constants (navigation, etc.)
│   ├── content/                # Blog posts (MDX)
│   │   └── blog/               # MDX articles
│   ├── lib/                    # Utility functions
│   │   ├── blog.ts             # Blog data access (path traversal protected)
│   │   └── seo.ts              # SEO utilities
│   ├── hooks/                  # Custom React hooks
│   ├── styles/                 # Additional styles
│   └── middleware.ts           # Security headers & caching
├── public/                     # Static assets
│   └── images/                 # Optimized images
├── docs/                       # 📚 Comprehensive documentation
│   ├── README.md               # Documentation index
│   ├── SECURITY.md             # Security guide
│   ├── ARCHITECTURE.md         # Architecture docs
│   ├── GETTING_STARTED.md      # Setup guide
│   ├── PERFORMANCE.md          # Performance guide
│   ├── BLOG_SYSTEM.md          # Blog documentation
│   ├── DEPLOYMENT.md           # Deployment guide
│   ├── DEVELOPMENT.md          # Development guide
│   ├── CONTRIBUTING.md         # Contribution guidelines
│   ├── CSP_IMPLEMENTATION.md   # CSP implementation details
│   └── SENTRY_SETUP.md         # Sentry monitoring setup
├── next.config.js              # Next.js configuration
├── tailwind.config.ts          # Tailwind theme
├── tsconfig.json               # TypeScript config
└── package.json                # Dependencies
```

See **[Architecture Documentation](./docs/ARCHITECTURE.md)** for detailed design patterns and SOLID principles implementation.

## 🧩 Customizing This Template

### 1. Update Your Information

**Site Configuration** (`src/config/site.config.ts`):
```typescript
export const siteConfig = {
  name: 'Your Name',
  title: 'Your Professional Title | Cybersecurity Specialist',
  description: 'Your professional description',
  url: 'https://yourdomain.com',
  email: 'your.email@example.com',
  // ... other config
};
```

**Social Links** (`src/config/social.config.ts`):
```typescript
export const socialLinks = {
  linkedin: 'https://linkedin.com/in/yourprofile',
  github: 'https://github.com/yourusername',
  twitter: 'https://twitter.com/yourhandle',
  email: 'mailto:your.email@example.com',
};
```

### 2. Add Your Projects

Edit `src/data/projects.ts` to showcase your work:
```typescript
export const projects = [
  {
    title: 'Your Project Name',
    description: 'Project description',
    image: '/images/projects/project-image.png',
    status: 'Production',
    tags: ['Security', 'Python', 'SIEM'],
    links: {
      github: 'https://github.com/you/project',
      demo: 'https://demo.example.com',
    },
  },
];
```

### 3. Write Blog Posts

Create MDX files in `src/content/blog/`:
```markdown
---
title: 'Your Post Title'
description: 'SEO description'
date: '2025-01-15'
category: 'Security'
author: 'Your Name'
tags: ['Security', 'Tutorial', 'Tools']
---

Your content here with **markdown** support!
```

### 4. Update Experience & Education

Modify the content in:
- `src/components/pages/Experience.tsx` - Professional experience
- `src/components/pages/Formation.tsx` - Education and certifications

### 5. Replace Images

Update images in `public/images/`:
- **Favicon**: `public/favicon.ico`
- **Profile**: `public/images/about/profile.png`
- **Projects**: `public/images/projects/`
- **Blog covers**: `public/images/blog/`

**Image Optimization** (Recommended):
```bash
# Install Sharp for automatic image optimization
npm install sharp

# Images are automatically optimized during build
# For manual compression, use:
npm run optimize-images  # If you add this script
```

For complete customization guide, see **[docs/GETTING_STARTED.md](./docs/GETTING_STARTED.md)**.

## 📚 Documentation

Comprehensive documentation available in the `/docs` folder:

- **[Main Documentation](./docs/README.md)** - Project overview and quick links
- **[Getting Started](./docs/GETTING_STARTED.md)** - Installation and setup guide
- **[Security](./docs/SECURITY.md)** - Security hardening and vulnerability mitigation
- **[Architecture](./docs/ARCHITECTURE.md)** - System design and SOLID principles
- **[Performance](./docs/PERFORMANCE.md)** - Optimization strategies and benchmarks
- **[Blog System](./docs/BLOG_SYSTEM.md)** - Content management and MDX guide
- **[Deployment](./docs/DEPLOYMENT.md)** - Production deployment instructions
- **[Development](./docs/DEVELOPMENT.md)** - Development guide and best practices
- **[CSP Implementation](./docs/CSP_IMPLEMENTATION.md)** - Content Security Policy details
- **[Sentry Setup](./docs/SENTRY_SETUP.md)** - Monitoring and error tracking configuration
- **[Contributing](./docs/CONTRIBUTING.md)** - Development guidelines and code standards

## 🔒 Security Features

This template prioritizes security with multiple layers of protection:

### Implemented Security Measures

✅ **XSS Protection** - DOMPurify sanitization + JSON sanitization in structured data  
✅ **CSP with Nonce** - Dynamic nonce generation, removed `unsafe-inline` for scripts  
✅ **Path Traversal Prevention** - Triple-layer validation with slug/path verification  
✅ **Security Headers** - CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Permissions-Policy  
✅ **Sentry Monitoring** - Real-time error tracking and performance monitoring  
✅ **Zero CVEs** - All 856 dependencies audited and vulnerability-free  
✅ **Static Site Generation** - No runtime vulnerabilities, pre-rendered HTML  

**Security Score**: **98/100** ✅ (+3 from nonce CSP + JSON sanitization)

See **[Security Documentation](./docs/SECURITY.md)** for complete details on threat modeling, vulnerability assessment, and remediation.

## ⚡ Performance Metrics

| Metric | Value | Status |
|--------|-------|--------|
| **Lighthouse Score** | 100 | ✅ Excellent |
| **First Load JS** | 137KB | ✅ Good |
| **LCP** | <2.5s | ✅ Good |
| **FID** | <100ms | ✅ Excellent |
| **CLS** | <0.1 | ✅ Excellent |

**Performance Optimizations**:
- Static Site Generation (SSG)
- Dynamic imports for code splitting
- Image optimization (AVIF/WebP)
- Aggressive caching strategy
- **Throttled scroll tracking** (100ms + passive listeners)
- **DOM caching** to reduce querySelector calls
- LazyMotion tree-shaking (−80KB bundle size)

See **[Performance Documentation](./docs/PERFORMANCE.md)** for optimization strategies and benchmarks.

## 📝 Creating Content

### Adding Blog Posts

Create MDX files in `src/content/blog/`:

```markdown
---
title: 'Your Post Title'
description: 'Brief description for SEO'
date: '2025-10-14'
category: 'Security'
author: 'Your Name'
featured: false
coverImage: '/images/blog/cover.png'
tags: ['Tag1', 'Tag2', 'Tag3']
---

Your content here with **markdown** support!

```javascript
// Code blocks with syntax highlighting
console.log('Hello, World!');
\```
```

See **[Blog System Documentation](./docs/BLOG_SYSTEM.md)** for complete guide.

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Push to GitHub
git push origin main

# Connect repository on Vercel dashboard
# Automatic deployment on every push
```

### Other Platforms

```bash
# Build production bundle
npm run build

# Start production server
npm start

# Deploy to Netlify, AWS, DigitalOcean, etc.
```

See **[Deployment Guide](./docs/DEPLOYMENT.md)** for complete instructions on Vercel, Netlify, and cloud platforms.

## 🛠️ Customization

- Update `src/config/site.config.ts` and `src/config/social.config.ts` with your personal details and links.
- Adjust content in `src/data/projects.ts` and the page components under `src/app/` to reflect your experience and services.
- Replace assets in `public/images/` with your own media, keeping file names consistent when possible.
- Add or edit MDX posts in `src/content/blog/` to publish articles.
- Review the CSP settings in `src/middleware.ts` if you introduce new external services.

## 🧪 Code Quality

### Clean Architecture

This project follows **SOLID principles** and **clean code** practices:

- **Single Responsibility Principle** - Components have one job
- **Open/Closed Principle** - Open for extension, closed for modification
- **Dependency Inversion** - Depend on abstractions, not implementations
- **Repository Pattern** - Separate data access from business logic
- **Custom Hooks** - Reusable stateful logic

See **[Architecture Documentation](./docs/ARCHITECTURE.md)** for design patterns and refactoring roadmap.

## 🤝 Contributing

Contributions are welcome! Please read our **[Contributing Guidelines](./docs/CONTRIBUTING.md)** for:

- Code of conduct
- Development workflow
- Coding standards (SOLID, clean code)
- Commit message format
- Pull request process

### Quick Contribution

```bash
# Fork and clone
git clone https://github.com/zer0spin/cybersecurity-portfolio-template.git

# Create feature branch
git checkout -b feature/amazing-feature

# Make changes and commit
git commit -m "feat: add amazing feature"

# Push and create PR
git push origin feature/amazing-feature
```

## 📊 Project Status

### Template Status

| Component | Status | Completion |
|-----------|--------|------------|
| **Security** | ✅ Production Ready | 100% |
| **Documentation** | ✅ Complete | 100% |
| **Performance** | ✅ Optimized | 100% |
| **Accessibility** | ✅ WCAG 2.1 AA | 100% |
| **SEO** | ✅ Configured | 100% |
| **Monitoring** | ✅ Sentry Ready | 100% |
| **CI/CD** | ✅ GitHub Actions | 100% |

**This template is production-ready and fully functional out of the box!**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**You are free to**:
- ✅ Use commercially
- ✅ Modify
- ✅ Distribute
- ✅ Private use

**Conditions**:
- 📋 License and copyright notice must be included
- ⚠️ No warranty or liability

## 🙏 Acknowledgments

Built with insights from:

- **Matrix Agents Security Analysis** - Comprehensive security audit
- **OWASP Top 10** - Security best practices
- **Next.js Team** - Amazing framework and documentation
- **Vercel** - Seamless deployment platform
- **Cybersecurity Community** - Inspiration and best practices

---

## 📬 Support & Community

- **Documentation**: Complete guides in the [/docs](./docs) folder
- **Issues**: [Report bugs or request features](https://github.com/zer0spin/cybersecurity-portfolio-template/issues)
- **Discussions**: [Ask questions and share ideas](https://github.com/zer0spin/cybersecurity-portfolio-template/discussions)
- **Maintainer**: [Marcos Oliveira (@zer0spin)](https://github.com/zer0spin) — open an issue or discussion for general questions
- **Security**: See [SECURITY.md](./SECURITY.md) for reporting vulnerabilities or email [zer0spinsec@proton.me](mailto:zer0spinsec@proton.me)

## 🙏 Credits

This template was created and is actively maintained by Marcos Oliveira ([@zer0spin](https://github.com/zer0spin)). Community contributions are welcome—reach out via GitHub discussions or email [zer0spinsec@proton.me](mailto:zer0spinsec@proton.me) for responsible disclosure.

---

**Built for the Blue Team community. Showcase your security expertise with confidence.** 🛡️

**Star ⭐ this repo if you find it useful!**
