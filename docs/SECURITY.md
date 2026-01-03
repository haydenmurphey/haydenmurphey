# Security Documentation

![Security Score](https://img.shields.io/badge/security-96%2F100-brightgreen)
![CVEs](https://img.shields.io/badge/CVEs-0-success)
![Last Audit](https://img.shields.io/badge/last%20audit-October%202025-blue)

Security posture, threat modelling notes, and hardening guidance for the cybersecurity portfolio template. Maintained by Marcos Oliveira ([@zer0spin](https://github.com/zer0spin)).

---

## 1. Security Overview

| Area | Status | Notes |
|------|--------|-------|
| Application Surface | Low | Static output only; no runtime mutation |
| Content Security Policy | Strong | Nonce-based in production, relaxed in development only |
| Transport Security | Strong | HSTS (1 year, preload), HTTPS-only links |
| Dependency Health | Strong | `npm audit` clean as of 16 Oct 2025 |
| Data Exposure | Minimal | No PII processed; content is owner-authored |

**Overall risk level**: Low. All entry points are controlled by the site author and rendered at build time.

---

## 2. Threat Model

| Threat | Likelihood | Impact | Mitigations |
|--------|------------|--------|-------------|
| Cross-site scripting via MDX content | Low | Medium | DOMPurify sanitisation, nonce-based CSP, JSON sanitisation |
| Path traversal on content loader | Very low | High | Slug regex validation, path normalisation, file existence checks |
| Supply-chain compromise (npm) | Low | High | Minimal dependency surface, monthly `npm audit`, Dependabot alerts |
| MITM / downgrade attack | Very low | Medium | HSTS, HTTPS enforcement, no mixed content |
| Sensitive data leakage | Negligible | Low | No user input, no secrets in client bundle |

Because the site is fully pre-rendered, typical injection or authentication attacks are out of scope. The main controls focus on protecting the author-managed content pipeline and ensuring third-party integrations are vetted.

---

## 3. Implemented Controls

### 3.1 Security Headers (see `src/middleware.ts`)

- Content-Security-Policy with per-request nonce and `strict-dynamic`
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- X-XSS-Protection: 1; mode=block (legacy browser guard)
- Permissions-Policy: disables camera, microphone, payment, sensors, USB
- Strict-Transport-Security: 31536000 seconds with preload (production)

### 3.2 Input and Output Sanitisation

- `DOMPurify` cleans code blocks before syntax highlighting
- `sanitizeJSON` escapes characters in JSON-LD snippets to prevent script breakout
- Slugs validated (`/^[a-z0-9]+(?:-[a-z0-9]+)*$/`) and normalised before disk access

### 3.3 Static Site Generation

- All routes compiled to static HTML during `next build`
- No server-side rendering, no mutable state, no databases
- Repeat requests are served directly from the CDN edge cache

### 3.4 Dependency Management

- Dependencies pinned via `package-lock.json`
- Monthly audit cadence (and after each dependency update)
- Current key packages: `next@15.5.5`, `react@19.0.0`, `typescript@5.5.0`, `isomorphic-dompurify@2.28.0`

---

## 4. Historical Vulnerabilities (All Resolved)

| ID | Issue | Resolution |
|----|-------|------------|
| SEC-001 | CodeBlock XSS via unsanitised highlighted HTML | Introduced DOMPurify sanitisation before and after highlighting; added unit test scaffolding |
| SEC-002 | Path traversal in `lib/blog.ts` when reading MDX files | Added slug regex, path normalisation, directory boundary enforcement, existence checks |
| SEC-003 | Missing HSTS in production middleware | HSTS header now injected (31536000s, includeSubDomains, preload) |

All fixes verified manually and through regression checks using malicious payload samples.

---

## 5. Hardening Roadmap

| Priority | Item | Status |
|----------|------|--------|
| High | Configure Subresource Integrity (SRI) for external analytics scripts | Planned |
| Medium | Implement rate limiting and CAPTCHA before enabling a live contact form | Planned |
| Medium | Add CSP report-uri / report-to endpoints for violation telemetry | Planned |
| Low | Publish `/.well-known/security.txt` with disclosure policy | Planned |
| Low | Automate security linting (Semgrep / ESLint security ruleset) | Planned |

Template users can adopt or skip these items depending on their deployment environment.

---

## 6. Guidance for Template Consumers

1. **Keep dependencies patched** – run `npm audit` and `npm outdated` monthly. Merge Dependabot alerts promptly.
2. **Maintain CSP hygiene** – if you add analytics or monitoring services, update `script-src`, `connect-src`, and `img-src` in `middleware.ts`. Prefer nonce-based script tags instead of reverting to `unsafe-inline`.
3. **Store secrets outside the repo** – configure Sentry DSNs, verification tokens, and analytics IDs via environment variables (`.env.local`, Vercel dashboard).
4. **Harden forms before enabling them** – any contact API should include rate limiting, bot filtering, and input validation. The template currently ships without a backend form to avoid this risk.
5. **Monitor production** – enable Sentry, Vercel Analytics, or another APM tool to detect anomalies.

---

## 7. Dependency Security Snapshot (16 Oct 2025)

```bash
$ npm audit
# found 0 vulnerabilities

$ npm ls --depth=0
cybersecurity-portfolio-template@1.0.0
├── @sentry/nextjs@10.19.0
├── @vercel/analytics@1.5.0
├── @vercel/speed-insights@1.2.0
├── framer-motion@11.2.0
├── gray-matter@4.0.3
├── isomorphic-dompurify@2.28.0
├── lucide-react@0.469.0
├── next@15.5.5
├── next-mdx-remote@4.4.1
├── react@19.0.0
├── react-dom@19.0.0
├── tailwindcss@3.4.0
└── typescript@5.5.0
```

---

## 8. Incident Response

- **Preferred channel**: zer0spinsec@proton.me
- **Response objective**: acknowledge within 48 hours, resolve or provide mitigation within 30 days depending on severity
- **Disclosure**: coordinated disclosure; credit researchers in release notes if desired
- **Do not** open public GitHub issues for suspected security flaws

---

## 9. Reference Material

- Next.js security documentation: https://nextjs.org/docs/app/building-your-application/security
- OWASP Cheat Sheet Series: https://cheatsheetseries.owasp.org/
- Mozilla Observatory: https://observatory.mozilla.org/
- Content Security Policy reference: https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP

Last updated: October 16, 2025
Next scheduled review: January 2026
