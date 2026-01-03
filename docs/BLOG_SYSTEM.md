# Blog System Documentation

![MDX](https://img.shields.io/badge/MDX-supported-blue)
![Syntax Highlighting](https://img.shields.io/badge/syntax-10%2B%20languages-success)
![Auto Read Time](https://img.shields.io/badge/read%20time-automatic-brightgreen)

**Complete guide to the MDX-powered blog system**

---

## 📋 Overview

The cybersecurity portfolio template uses a powerful MDX-based blog system that combines:
- **Markdown** for easy content writing
- **React Components** embedded in content
- **Syntax Highlighting** for code blocks
- **Auto Read-Time** calculation
- **SEO Optimization** with JSON-LD schemas
- **Search & Filter** functionality

---

## 📝 Creating Blog Posts

### 1. Create MDX File

Create a new file in `src/content/blog/`:

```bash
src/content/blog/my-awesome-post.mdx
```

### 2. Add Frontmatter

Start your MDX file with YAML frontmatter:

```markdown
---
title: 'Building Secure CI/CD Pipelines with GitHub Actions'
description: 'Learn how to implement security best practices in your CI/CD workflows'
date: '2025-10-14'
category: 'DevSecOps'
author: 'Your Name'
featured: false
coverImage: '/images/blog/cicd-security-cover.png'
tags: ['GitHub Actions', 'Security', 'CI/CD', 'DevOps']
---

Your content starts here...
```

### Frontmatter Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | ✅ Yes | Post title (50-60 chars for SEO) |
| `description` | string | ✅ Yes | Brief description (150-160 chars) |
| `date` | string | ✅ Yes | Publication date (YYYY-MM-DD) |
| `category` | string | ✅ Yes | Category (Security, DevOps, Projects, Automation) |
| `author` | string | ❌ No | Author name (defaults to site author) |
| `featured` | boolean | ❌ No | Mark as featured post (shows on homepage) |
| `coverImage` | string | ❌ No | Cover image path (1200x630px recommended) |
| `tags` | string[] | ❌ No | Post tags (3-5 recommended) |

---

## ✍️ Writing Content

### Markdown Basics

```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*
~~Strikethrough~~

- Unordered list item
- Another item

1. Ordered list item
2. Another item

[Link text](https://example.com)

![Image alt text](/images/blog/image.png)

> Blockquote
```

### Code Blocks

The blog system automatically applies syntax highlighting:

````markdown
```javascript
// JavaScript code
function greeting(name) {
  console.log(`Hello, ${name}!`);
}
```

```python
# Python code
def greeting(name):
    print(f"Hello, {name}!")
```

```bash
# Bash commands
echo "Hello, World!"
npm install package-name
```
````

**Supported Languages**:
- JavaScript / TypeScript
- Python
- Bash / Shell
- JSON
- YAML
- Markdown
- HTML / CSS
- SQL
- Rust (planned)
- Go (planned)

### Features

Each code block includes:
- **Language Label** (top-right corner)
- **Copy Button** (appears on hover)
- **Line Numbers** (optional, planned)
- **Diff Highlighting** (planned)

---

## 🎨 Styling

### Using Tailwind Classes

You can use Tailwind CSS classes directly in MDX:

```markdown
<div className="bg-cyber-navy p-6 rounded-lg border border-cyber-cyan/30">
  Custom styled content
</div>
```

### Custom Components (Planned)

```markdown
<Callout type="info">
  Important information here
</Callout>

<Alert type="warning">
  Warning message
</Alert>

<Tabs>
  <Tab label="JavaScript">
    ```javascript
    console.log('Hello');
    ```
  </Tab>
  <Tab label="Python">
    ```python
    print('Hello')
    ```
  </Tab>
</Tabs>
```

---

## 📊 Blog Features

### 1. Auto Read-Time Calculation

The system automatically calculates reading time based on:
- **Word Count**: 225 words per minute (average reading speed)
- **Code Blocks**: Reduced weight (skimmed, not fully read)

```typescript
// lib/blog.ts
function calculateReadTime(content: string): string {
  const wordsPerMinute = 225;
  const contentWithoutCode = content.replace(/```[\s\S]*?```/g, '');
  const words = contentWithoutCode.trim().split(/\s+/);
  const wordCount = words.length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}
```

**Example**:
- 900 words → 4 min read
- 1,500 words + code → 7 min read

### 2. Search & Filter

The blog listing page includes:

**Search Bar**:
- Searches in title and description
- Real-time filtering
- Case-insensitive

**Category Filters**:
- All (default)
- Security
- DevOps
- Projects
- Automation

**Result Counter**:
- Shows "X articles found"
- "No results" message with clear button

### 3. SEO Optimization

Each blog post includes:

**Meta Tags**:
```html
<title>Post Title | Your Name</title>
<meta name="description" content="Post description">
<meta name="keywords" content="tag1, tag2, tag3">
```

**Open Graph** (Facebook, LinkedIn):
```html
<meta property="og:title" content="Post Title">
<meta property="og:description" content="Post description">
<meta property="og:image" content="https://yourdomain.com/images/blog/cover.png">
<meta property="og:type" content="article">
```

**Twitter Cards**:
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Post Title">
<meta name="twitter:image" content="https://yourdomain.com/images/blog/cover.png">
```

**JSON-LD Schema** (BlogPosting):
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Post Title",
  "description": "Post description",
  "image": "https://yourdomain.com/images/blog/cover.png",
  "author": {
    "@type": "Person",
    "name": "Your Name"
  },
  "datePublished": "2025-10-14",
  "keywords": ["tag1", "tag2", "tag3"]
}
```

### 4. Cover Images

**Specifications**:
- **Size**: 1200x630px (Open Graph standard)
- **Format**: PNG or JPG (auto-optimized to WebP/AVIF)
- **Max File Size**: <500KB (before optimization)
- **Location**: `/public/images/blog/`

**Display**:
- Blog listing cards
- Blog post header
- Social media previews
- Homepage featured article

---

## 🏗️ Blog Architecture

### File Structure

```
src/
├── content/
│   └── blog/
│       ├── post-1.mdx
│       ├── post-2.mdx
│       └── post-3.mdx
├── app/
│   └── blog/
│       ├── page.tsx              # Blog listing
│       └── [slug]/
│           └── page.tsx          # Blog post template
├── components/
│   ├── CodeBlock.tsx             # Syntax highlighting
│   └── sections/
│       ├── Blog.tsx              # Blog listing (server)
│       ├── BlogClient.tsx        # Blog listing (client)
│       ├── BlogPreview.tsx       # Homepage preview (server)
│       └── BlogPreviewClient.tsx # Homepage preview (client)
└── lib/
    └── blog.ts                   # Blog data access layer
```

### Data Flow

```
1. Build Time:
   MDX Files → gray-matter → Frontmatter + Content
                           ↓
   Blog.ts Functions → getAllPosts(), getPostBySlug()
                           ↓
   Static Paths Generated → /blog/post-1, /blog/post-2, etc.
                           ↓
   HTML Pre-rendered → Static files

2. Request Time:
   User Visits /blog/my-post
              ↓
   CDN Serves Pre-rendered HTML
              ↓
   React Hydrates Client Components
              ↓
   CodeBlock Becomes Interactive
```

---

## 🔧 Advanced Configuration

### Custom Read Time

Override automatic calculation in frontmatter:

```markdown
---
title: 'My Post'
readTime: '10 min read'  # Manual override
---
```

### Draft Posts

Keep posts as drafts by not committing them, or add a `draft` field:

```markdown
---
title: 'Draft Post'
draft: true  # Won't be published
---
```

Then filter in `lib/blog.ts`:

```typescript
export function getAllPosts(): BlogPostMetadata[] {
  return slugs
    .map(slug => getPostBySlug(slug))
    .filter(post => post !== null && !post.draft)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}
```

### Categories

Add new categories by updating the category type:

```typescript
// lib/blog.ts or types/blog.ts
export type BlogCategory = 
  | 'Security' 
  | 'DevOps' 
  | 'Projects' 
  | 'Automation'
  | 'Tutorial'    // New category
  | 'Case Study'; // New category
```

Then update the filter UI in `BlogClient.tsx`.

---

## 📈 Blog Analytics (Planned)

Future implementation will include:

- **Page views** per post
- **Reading completion** rate
- **Popular posts** widget
- **Related posts** recommendations
- **Comments** system (GitHub Discussions integration)

---

## 🎯 Best Practices

### Content Guidelines

1. **Title**: 50-60 characters for optimal SEO
2. **Description**: 150-160 characters (shows in Google)
3. **Headings**: Use H2 (##) and H3 (###) for structure
4. **Images**: Always include alt text for accessibility
5. **Code**: Keep code blocks under 50 lines (readability)
6. **Links**: Use descriptive link text (not "click here")
7. **Lists**: Break up long paragraphs with lists

### SEO Optimization

- **Keywords**: Include target keywords in title, description, and first paragraph
- **Internal Links**: Link to other relevant blog posts
- **External Links**: Link to authoritative sources
- **Image Alt Text**: Descriptive alt text for all images
- **URL Slug**: Keep slugs short and descriptive (post-title not this-is-a-very-long-post-title-about-something)

### Accessibility

- **Headings**: Use proper heading hierarchy (H1 → H2 → H3)
- **Alt Text**: Describe images for screen readers
- **Contrast**: Ensure text has sufficient contrast
- **Link Text**: Descriptive link text (not "here" or "this")

---

## 🔐 Security

The blog system includes several security measures:

### XSS Protection

All content is sanitized before rendering:

```typescript
// CodeBlock.tsx
import DOMPurify from 'isomorphic-dompurify';

const sanitizedCode = DOMPurify.sanitize(code, {
  ALLOWED_TAGS: ['span'],
  ALLOWED_ATTR: ['class']
});
```

### Path Traversal Prevention

Slug validation prevents directory traversal attacks:

```typescript
// lib/blog.ts
const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

if (!SLUG_REGEX.test(slug)) {
  return null; // Invalid slug rejected
}
```

### Content Security Policy

The middleware issues a nonce-backed CSP in production, allowing the blog to execute only scripts that carry the generated nonce:

```typescript
// Simplified excerpt from src/middleware.ts
const csp = `
  default-src 'self';
  script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://va.vercel-scripts.com https://vercel.live;
  style-src 'self' 'nonce-${nonce}' https://fonts.googleapis.com;
  img-src 'self' blob: data: https:;
  connect-src 'self' https://vitals.vercel-insights.com https://vercel.live https://*.ingest.sentry.io;
`;
response.headers.set('Content-Security-Policy', csp);
```

When you introduce additional embeds, whitelist the hostnames in the corresponding CSP directives instead of falling back to `unsafe-inline`.

---

## 🚀 Performance

### Static Generation

- All blog posts pre-rendered at build time
- Zero server-side processing
- Instant page loads (TTFB <50ms)

### Image Optimization

- Automatic WebP/AVIF conversion
- Responsive images (srcset)
- Lazy loading below the fold
- Priority loading for featured images

### Code Splitting

- Blog components loaded on-demand
- Syntax highlighter loaded per page
- Reduced initial bundle size

---

## 📚 Examples

Current sample posts you can reference:

- **`advanced-log-analysis.mdx`** – SIEM lab focused on log enrichment and correlation
- **`incident-response-playbook.mdx`** – Incident handling walkthrough with actionable steps
- **`intro-to-threat-hunting.mdx`** – Foundational hunting techniques and toolchain overview
- **`siem-best-practices.mdx`** – Guidance for tuning detection engineering workflows

---

## 🆘 Troubleshooting

### Post Not Showing

1. Check frontmatter syntax (YAML format)
2. Verify date format (YYYY-MM-DD)
3. Ensure file has `.mdx` extension
4. Rebuild site (`npm run build`)

### Syntax Highlighting Not Working

1. Check language name in code fence
2. Verify supported languages list
3. Check for typos in language name

### Cover Image Not Displaying

1. Verify image exists in `/public/images/blog/`
2. Check image path starts with `/`
3. Confirm image format (PNG/JPG)
4. Check file size (<500KB recommended)

---

*Last updated: October 16, 2025*
