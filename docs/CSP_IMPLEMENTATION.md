# Content Security Policy Implementation

This document explains how the cybersecurity portfolio template enforces its Content Security Policy (CSP), how nonces are propagated through the rendering pipeline, and how to extend the policy safely.

---

## 1. Current Implementation (Next.js 15)

The template ships with a strict nonce-based CSP that avoids `unsafe-inline` and `unsafe-eval` in production builds. The policy is generated in `src/middleware.ts` and uses the automatic nonce injection that is available in Next.js 15.

Key characteristics:

- Cryptographically secure nonce generated per request (`crypto.randomUUID` → base64 encoded)
- `strict-dynamic` trusts scripts that are bootstrapped by the original nonce-bearing scripts
- Analytics domains (`va.vercel-scripts.com`, `vercel.live`) and Sentry ingestion are explicitly allowed
- Styles also receive a nonce so inline `<style>` tags can execute without falling back to `unsafe-inline`
- Development mode keeps a relaxed policy to support React Fast Refresh and source maps

### Production Policy Snapshot

```text
default-src 'self';
script-src 'self' 'nonce-{nonce}' 'strict-dynamic' https://va.vercel-scripts.com https://vercel.live;
style-src 'self' 'nonce-{nonce}' https://fonts.googleapis.com;
style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com;
style-src-attr 'self' 'unsafe-inline';
img-src 'self' blob: data: https:;
font-src 'self' https://fonts.gstatic.com;
connect-src 'self' https://vitals.vercel-insights.com https://vercel.live https://*.ingest.sentry.io;
media-src 'self';
object-src 'none';
frame-ancestors 'none';
base-uri 'self';
form-action 'self';
upgrade-insecure-requests;
block-all-mixed-content;
```

### Development Policy Snapshot

```text
default-src 'self';
script-src 'self' 'unsafe-eval' 'unsafe-inline';
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com;
style-src-attr 'self' 'unsafe-inline';
img-src 'self' blob: data: https:;
font-src 'self' https://fonts.gstatic.com;
connect-src 'self' ws: wss: https://vitals.vercel-insights.com https://*.ingest.sentry.io;
```

---

## 2. How the Nonce Flows

1. **Middleware** generates the nonce and appends it to both the request header (`x-nonce`) and the response `Content-Security-Policy` header.
2. **App Router Layout** retrieves the nonce via `headers().get('x-nonce')` and passes it to inline JSON-LD `<script>` tags.
3. **Next.js 15 runtime** automatically applies the same nonce to all framework-managed scripts, so no additional wiring is required for hydration bundles.

Relevant excerpts:

```typescript
// src/middleware.ts
const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
requestHeaders.set('x-nonce', nonce);
response.headers.set('Content-Security-Policy', cspHeader);

// src/app/layout.tsx
const nonce = process.env.NODE_ENV === 'production'
  ? (await headers()).get('x-nonce') || undefined
  : undefined;

<script
  type="application/ld+json"
  {...(nonce && { nonce })}
  dangerouslySetInnerHTML={{ __html: sanitizeJSON(personSchema) }}
/>
```

---

## 3. Allowing Additional Scripts

When you need to introduce another script source (for example a security scanner widget or privacy-friendly analytics vendor):

1. **Prefer nonce usage**. If the provider supports inline snippets, inject the nonce attribute onto the `<script>` tag you add in `layout.tsx`.
2. **Add hostnames to the CSP**. Extend the `script-src` directive inside `middleware.ts` so the remote host is explicitly whitelisted.
3. **Avoid `unsafe-inline`**. Only fall back to the development policy if the third-party vendor has no nonce support and you are comfortable with the associated risk.

Example of whitelisting an additional analytics endpoint:

```diff
- script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://va.vercel-scripts.com https://vercel.live;
+ script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://va.vercel-scripts.com https://vercel.live https://analytics.example.com;
```

---

## 4. Updating Style and Font Sources

The production policy applies the nonce to `style-src`. This covers inline critical CSS and the JSON-LD `<style>` tags emitted by Next.js. If you introduce hosted fonts or CSS frameworks:

- Add the CDN domain to `style-src` and `style-src-elem`.
- Mirror font providers inside `font-src`.
- If the provider injects inline styles that do not accept nonces, evaluate whether the styles can be self-hosted instead of enabling `unsafe-inline`.

---

## 5. Testing the Policy

1. Run `npm run build && npm start` to launch the production server locally.
2. Inspect headers with `curl -I http://localhost:3000 | findstr Content-Security-Policy` (PowerShell) to confirm the nonce changes per request.
3. Open the browser dev tools → Console → look for CSP violation warnings when visiting each route.
4. If you add new assets or analytics tools, repeat the inspection to ensure no requests are blocked.

---

## 6. Troubleshooting

| Symptom | Likely Cause | Fix |
|---------|--------------|-----|
| Blank screen in production | Script request blocked by CSP | Add host to `script-src` or pass the nonce attribute correctly |
| Inline script ignored | Missing `nonce` attribute | Retrieve the nonce in the component and set `nonce={nonce}` |
| Styles missing | New stylesheet host not in `style-src` | Append domain to `style-src` and `style-src-elem` directives |
| Web Vitals or Sentry offline | `connect-src` missing endpoint | Extend `connect-src` with the required origin |

---

## 7. Reference Material

- Next.js Content Security Policy guide: https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy
- MDN CSP Reference: https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
- OWASP CSP Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html

Last updated: October 16, 2025
