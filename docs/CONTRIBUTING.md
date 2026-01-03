# Contributing to Cybersecurity Portfolio Template

![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)
![Code Style](https://img.shields.io/badge/code%20style-prettier-ff69b4.svg)
![Commitizen](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)

Thank you for considering contributing to the Cybersecurity Portfolio Template! This document provides guidelines and standards for contributions. The project is stewarded by ([@zer0spin](https://github.com/zer0spin)) with support from the cybersecurity community.

---

## 📋 Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Coding Standards](#coding-standards)
5. [Commit Guidelines](#commit-guidelines)
6. [Pull Request Process](#pull-request-process)
7. [Testing Requirements](#testing-requirements)

---

## 🤝 Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

**Positive behavior includes:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards others

**Unacceptable behavior includes:**
- Trolling, insulting/derogatory comments, personal or political attacks
- Public or private harassment
- Publishing others' private information without permission
- Other conduct which could reasonably be considered inappropriate

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- Git
- Code editor (VS Code recommended)

### Initial Setup

```bash
# Fork and clone
git clone https://github.com/zer0spin/cybersecurity-portfolio-template.git
cd cybersecurity-portfolio-template

# Install dependencies
npm install

# Create feature branch
git checkout -b feature/your-feature-name

# Start development
npm run dev
```

---

## 💻 Development Workflow

### 1. Pick an Issue

- Browse [open issues](https://github.com/zer0spin/cybersecurity-portfolio-template/issues)
- Comment that you're working on it
- Or create a new issue to propose changes

### 2. Create a Branch

```bash
# Feature branch
git checkout -b feature/add-dark-mode

# Bug fix branch
git checkout -b fix/navigation-bug

# Documentation branch
git checkout -b docs/update-readme
```

**Branch naming conventions:**
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `perf/` - Performance improvements
- `test/` - Test additions/fixes
- `chore/` - Maintenance tasks

### 3. Make Changes

Follow our [Coding Standards](#coding-standards) below.

### 4. Test Your Changes

```bash
# Run linter
npm run lint

# Build production
npm run build

# Test production build
npm start
```

### 5. Commit Your Changes

Follow our [Commit Guidelines](#commit-guidelines) below.

### 6. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

---

## 📐 Coding Standards

### TypeScript

**Use explicit types**:
```typescript
// ❌ Bad
function getPost(slug) {
  return posts.find(p => p.slug === slug);
}

// ✅ Good
function getPost(slug: string): BlogPost | undefined {
  return posts.find(p => p.slug === slug);
}
```

**Avoid `any` type**:
```typescript
// ❌ Bad
function handleData(data: any) { /* ... */ }

// ✅ Good
function handleData(data: BlogPost) { /* ... */ }
```

**Use interfaces for objects**:
```typescript
interface BlogPost {
  slug: string;
  title: string;
  content: string;
  date: string;
}
```

---

### React Components

**Functional components with TypeScript**:
```typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button onClick={onClick} className={`btn btn-${variant}`}>
      {label}
    </button>
  );
}
```

**Use hooks correctly**:
```typescript
// useCallback for event handlers
const handleClick = useCallback(() => {
  doSomething();
}, [dependency]);

// useMemo for expensive calculations
const sortedPosts = useMemo(() => {
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}, [posts]);

// memo for pure components
export const BlogCard = memo(function BlogCard({ post }: Props) {
  return <div>{post.title}</div>;
});
```

---

### SOLID Principles

#### Single Responsibility Principle
```typescript
// ❌ Bad: Component does too much
function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  
  // Fetching logic
  useEffect(() => { /* ... */ }, []);
  
  // Filtering logic
  useEffect(() => { /* ... */ }, [search]);
  
  // Rendering logic
  return <div>...</div>;
}

// ✅ Good: Split into hooks and components
function useBlogPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => { /* fetch logic */ }, []);
  return posts;
}

function useBlogFilter(posts: BlogPost[], search: string) {
  return useMemo(() => {
    return posts.filter(p => p.title.includes(search));
  }, [posts, search]);
}

function BlogPage() {
  const [search, setSearch] = useState('');
  const posts = useBlogPosts();
  const filtered = useBlogFilter(posts, search);
  
  return <BlogList posts={filtered} />;
}
```

#### Dependency Inversion
```typescript
// ❌ Bad: Direct dependency on implementation
function BlogPage() {
  const post = getPostFromFileSystem(slug); // Tightly coupled
}

// ✅ Good: Depend on abstraction
interface IBlogRepository {
  getPost(slug: string): Promise<BlogPost | null>;
}

function BlogPage({ repository }: { repository: IBlogRepository }) {
  const post = await repository.getPost(slug); // Loosely coupled
}
```

---

### File Organization

```
component/
├── ComponentName.tsx          # Main component
├── ComponentName.test.tsx     # Tests (when implemented)
├── ComponentName.types.ts     # Types (if complex)
└── index.ts                   # Re-export

feature/
├── components/                # Feature-specific components
├── hooks/                     # Feature-specific hooks
├── utils/                     # Feature-specific utilities
└── index.ts                   # Public API
```

**Naming conventions:**
- Components: `PascalCase` (BlogCard.tsx)
- Hooks: `camelCase` with `use` prefix (useScrollTracking.ts)
- Utilities: `camelCase` (formatDate.ts)
- Constants: `UPPER_SNAKE_CASE` (MAX_POSTS_PER_PAGE)
- Types/Interfaces: `PascalCase` with `I` prefix for interfaces (IBlogRepository)

---

### CSS/Tailwind

**Use Tailwind utilities**:
```tsx
// ✅ Good: Tailwind classes
<div className="flex items-center gap-4 p-6 bg-cyber-dark rounded-lg">
  ...
</div>

// Only create custom CSS for:
// 1. Complex animations
// 2. Syntax highlighting
// 3. Global styles
```

**Organize classes logically**:
```tsx
// Layout → Spacing → Colors → Typography → Effects
<div className="
  flex flex-col items-center
  p-6 gap-4
  bg-cyber-dark text-cyber-cyan
  text-lg font-bold
  hover:shadow-neon-cyan transition-all
">
```

---

## 📝 Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style (formatting, no logic change)
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Adding tests
- `chore`: Maintenance tasks

### Examples

```bash
# Feature
feat(blog): add syntax highlighting for Rust code

Implemented Rust syntax highlighter with support for:
- Keywords (fn, let, mut, etc.)
- Macros (println!, vec!, etc.)
- String literals and comments

Closes #123

# Bug Fix
fix(nav): prevent active section flickering on scroll

Changed scroll tracking to use requestAnimationFrame
instead of direct scroll listener. This reduces
DOM queries from 60/sec to 1/frame.

Fixes #456

# Documentation
docs(security): add XSS vulnerability remediation guide

# Refactor
refactor(blog): extract BlogRepository from components

Implements Repository Pattern to decouple data access
from UI components. Makes testing easier and follows
Dependency Inversion Principle.
```

### Commit Best Practices

1. **One logical change per commit**
2. **Use imperative mood** ("add" not "added")
3. **Keep subject line under 72 characters**
4. **Reference issues** in footer
5. **Explain "why", not "what"** in body

---

## 🔀 Pull Request Process

### Before Submitting

- [ ] Code follows our style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated (if needed)
- [ ] No console errors or warnings
- [ ] Build succeeds (`npm run build`)
- [ ] Lint passes (`npm run lint`)

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## How Has This Been Tested?
Describe testing approach

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed
- [ ] Commented complex code
- [ ] Updated documentation
- [ ] No new warnings
- [ ] Build succeeds
```

### Review Process

1. **Automated checks** must pass (lint, build)
2. **One approving review** required
3. **Address feedback** within 7 days
4. **Squash and merge** when approved

---

## 🧪 Testing Requirements

### Testing Strategy (Planned Implementation)

While tests are not currently implemented, this is the planned approach:

#### Unit Tests
```typescript
// Example: lib/blog.test.ts
describe('getPostBySlug', () => {
  it('should return post when slug is valid', () => {
    const post = getPostBySlug('valid-slug');
    expect(post).toBeDefined();
    expect(post?.slug).toBe('valid-slug');
  });

  it('should return null when slug is invalid', () => {
    const post = getPostBySlug('../../../etc/passwd');
    expect(post).toBeNull();
  });
});
```

#### Component Tests
```typescript
// Example: components/CodeBlock.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { CodeBlock } from './CodeBlock';

describe('CodeBlock', () => {
  it('should sanitize malicious code', () => {
    const maliciousCode = '<script>alert("XSS")</script>';
    render(<CodeBlock>{maliciousCode}</CodeBlock>);
    
    expect(screen.queryByText('alert')).not.toBeInTheDocument();
  });
  
  it('should copy code to clipboard', async () => {
    render(<CodeBlock>const x = 1;</CodeBlock>);
    
    const copyButton = screen.getByLabelText('Copy code');
    fireEvent.click(copyButton);
    
    // Assert clipboard contains code
  });
});
```

---

## 🐛 Reporting Bugs

### Security Vulnerabilities

**DO NOT** open public issues for security issues.
Email: zer0spinsec@proton.me

### Bug Reports

Include:
1. **Description**: What happened?
2. **Expected behavior**: What should happen?
3. **Steps to reproduce**:
   1. Step 1
   2. Step 2
   3. ...
4. **Environment**:
   - OS: Windows/Mac/Linux
   - Browser: Chrome/Firefox/Safari
   - Node version: 18.x
5. **Screenshots**: If applicable
6. **Additional context**: Any other info

---

## 💡 Feature Requests

### Propose a Feature

1. **Check existing issues** first
2. **Describe the feature** clearly
3. **Explain use case** and benefits
4. **Provide examples** if possible
5. **Consider implementation** complexity

### Feature Template

```markdown
## Feature Description
Clear description of the proposed feature

## Use Case
Why is this feature needed?

## Proposed Implementation
How should it work?

## Alternatives Considered
Other approaches you've thought about

## Additional Context
Screenshots, mockups, references
```

---

## 📞 Getting Help

- **Documentation**: Check `/docs` folder
- **Discussions**: [GitHub Discussions](https://github.com/zer0spin/cybersecurity-portfolio-template/discussions)
- **Issues**: [GitHub Issues](https://github.com/zer0spin/cybersecurity-portfolio-template/issues)
- **Maintainer**: Reach out to Marcos Oliveira ([@zer0spin](https://github.com/zer0spin)) via issues/discussions; email [zer0spinsec@proton.me](mailto:zer0spinsec@proton.me) for security disclosures
- **Discord**: [Join our community](#) (if applicable)

---

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Clean Code Principles](https://github.com/ryanmcdermott/clean-code-javascript)

---

## 🙏 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Credited in release notes
- Mentioned in project README

Thank you for contributing! 🚀

---

**Maintained by Marcos Oliveira ([@zer0spin](https://github.com/zer0spin)) with contributions from the cybersecurity community.**

*Last updated: October 16, 2025*
