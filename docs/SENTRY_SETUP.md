# 🔍 Sentry Setup Guide

This guide walks through enabling Sentry monitoring for the cybersecurity portfolio template.

## ⏱️ Estimated Time: 5 minutes

---

## 📋 Prerequisites

- ✅ Sentry account (free tier works)
- ✅ Project deployed on Vercel (or another platform with environment variables)
- ✅ Access to production environment variables

---

## 🚀 Step-by-Step

### 1. Create a Sentry Account

1. Visit https://sentry.io/signup/
2. Choose **"Sign up for free"**
3. Complete the registration using email, GitHub, or another provider

**Free Tier Includes**:
- ✅ 5,000 errors/month
- ✅ 10,000 performance transactions/month
- ✅ 50 session replays/month
- ✅ 30-day data retention
- ✅ Unlimited projects

> **Enough for** ~1,000 monthly visitors ✅

---

### 2. Create a Next.js Project

1. In the Sentry dashboard, click **"Create Project"**
2. Select the **Next.js** platform
3. Name the project `cybersecurity-portfolio-template` (or another descriptive name)
4. Click **"Create Project"**

---

### 3. Copy the DSN (Data Source Name)

After creating the project, Sentry displays the setup instructions.

1. Under **"Configure SDK"**, copy the **DSN**
2. It looks like `https://xxxxx@o123456.ingest.sentry.io/123456`

You can also find it later via:
- **Settings** → **Projects** → Your project → **Client Keys (DSN)**

---

### 4. Configure Environment Variables

#### Option A: Vercel Dashboard

1. Open your project in Vercel
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

```bash
# Required
NEXT_PUBLIC_SENTRY_DSN=https://xxxxx@o123456.ingest.sentry.io/123456

# Optional (for source map upload)
SENTRY_ORG=your-org-slug
SENTRY_PROJECT=cybersecurity-portfolio-template
SENTRY_AUTH_TOKEN=your-auth-token
```

4. Apply to **Production**, **Preview**, and **Development**
5. Click **"Save"**

#### Option B: Vercel CLI

```bash
# Install the Vercel CLI if needed
npm i -g vercel

# Authenticate
vercel login

# Add variables
vercel env add NEXT_PUBLIC_SENTRY_DSN
# Paste the DSN when prompted

# Optional variables
vercel env add SENTRY_ORG
vercel env add SENTRY_PROJECT
vercel env add SENTRY_AUTH_TOKEN
```

---

### 5. (Optional) Generate an Auth Token for Source Maps

Source maps let you inspect readable stack traces instead of minified bundles.

1. In Sentry, go to **Settings** → **Account** → **API** → **Auth Tokens**
2. Click **"Create New Token"**
3. Use these settings:
   - **Name**: `Vercel Deploy`
   - **Scopes**:
     - ✅ `project:read`
     - ✅ `project:releases`
     - ✅ `org:read`
4. Click **"Create Token"**
5. **Copy the token** (it is shown only once)
6. Add it to Vercel as `SENTRY_AUTH_TOKEN`

---

### 6. Deploy and Verify

1. Commit your changes:
   ```bash
   git add .
   git commit -m "feat: enable Sentry monitoring"
   git push origin main
   ```

2. Wait for the deployment to finish (usually 1-2 minutes)

3. Visit the site and browse a few pages

4. In the Sentry dashboard, open **Issues** to confirm events are arriving

---

## ✅ Validate the Integration

### Test Error Tracking

Temporarily trigger a controlled error:

```typescript
// src/app/page.tsx (TESTING ONLY)
useEffect(() => {
  // Force an error to verify Sentry wiring
  throw new Error('Sentry test error - REMOVE AFTER TEST');
}, []);
```

1. Deploy
2. Load the page
3. In Sentry, open **Issues**
4. You should see the error within seconds
5. **IMPORTANT**: Remove the test error afterwards!

### Test Performance Monitoring

1. In Sentry, open **Performance**
2. Navigate through the site
3. You should see new transactions, including:
   - Page loads
   - Navigation timing
   - Web Vitals (LCP, FID, CLS)

### Test Session Replay

1. In Sentry, open **Replays**
2. Interact with the site
3. After a few minutes, session videos appear
4. Click one to review the captured session

---

## 🎨 Optional Tuning

### Adjust Sample Rates

Edit `sentry.client.config.ts`:

```typescript
Sentry.init({
  dsn: SENTRY_DSN,

  // Capture 100% of transactions
  tracesSampleRate: 1.0,

  // Session Replay sampling
  replaysOnErrorSampleRate: 1.0,  // 100% of sessions with errors
  replaysSessionSampleRate: 0.1,  // 10% of normal sessions

  // Lower these if you need to conserve quota
  // tracesSampleRate: 0.5,
  // replaysSessionSampleRate: 0.05,
});
```

### Filter Specific Errors

Add custom filtering logic:

```typescript
Sentry.init({
  beforeSend(event, hint) {
    // Ignore browser extension noise
    if (
      hint.originalException?.message?.includes('chrome-extension://') ||
      hint.originalException?.message?.includes('moz-extension://')
    ) {
      return null;
    }

    // Ignore benign 404s
    if (event.exception?.values?.[0]?.value?.includes('404')) {
      return null;
    }

    return event;
  },
});
```

### Add Custom Context

```typescript
import * as Sentry from '@sentry/nextjs';

// Attach user context (if your site has authentication)
Sentry.setUser({
  id: user.id,
  email: user.email,
  username: user.username,
});

// Add useful tags
Sentry.setTag('page_locale', 'en-US');
Sentry.setTag('theme', 'dark');

// Provide extra performance metrics
Sentry.setContext('performance', {
  lcp: metrics.lcp,
  fid: metrics.fid,
  cls: metrics.cls,
});
```

---

## 📊 Recommended Dashboard Setup

### Alerts to Configure

1. **New Issue Alert**
   - Notifies when a new error appears
   - Settings → Alerts → Create Alert
   - Trigger: "A new issue is created"
   - Action: Email (and/or Slack)

2. **Performance Degradation**
   - Warns when transaction duration spikes
   - Trigger: "Transaction duration increases by 50%"
   - Action: Email

3. **Error Rate Spike**
   - Signals unexpected error volume
   - Trigger: "Error rate increases by 200%"
   - Action: Email + Slack (optional)

### Helpful Widgets

In a custom dashboard, add:

1. **Most Common Errors** – Top 5 errors by frequency
2. **Error Rate Over Time** – Line chart of volume
3. **Performance Metrics** – LCP, FID, CLS cards
4. **User Impact** – Total affected users/sessions

---

## 🔒 Security Best Practices

### 1. Never Commit Keys or Tokens

❌ **Incorrect**:
```typescript
const SENTRY_DSN = 'https://xxx@sentry.io/xxx'; // Hard-coded
```

✅ **Correct**:
```typescript
const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;
```

### 2. Strip Sensitive Data

```typescript
Sentry.init({
  beforeSend(event) {
    // Remove cookies from payloads
    if (event.request?.cookies) {
      delete event.request.cookies;
    }

    // Drop authorization headers
    if (event.request?.headers?.Authorization) {
      delete event.request.headers.Authorization;
    }

    return event;
  },
});
```

### 3. Mask Session Replay Content

Enabled by default in this template:

```typescript
Sentry.replayIntegration({
  maskAllText: true,      // Obscures visible text
  blockAllMedia: true,    // Blocks images and videos
});
```

---

## 💡 Troubleshooting

### Error: "No DSN provided"

**Cause**: `NEXT_PUBLIC_SENTRY_DSN` is missing

**Fix**:
1. Check `.env.local` (development) or Vercel (production)
2. Confirm the variable starts with `NEXT_PUBLIC_`
3. Restart the dev server with `npm run dev`

### Error: "Failed to upload source maps"

**Cause**: Invalid or missing auth token

**Fix**:
1. Regenerate the token in Sentry
2. Update `SENTRY_AUTH_TOKEN` in Vercel
3. Verify `SENTRY_ORG` and `SENTRY_PROJECT`

### No Events Showing Up

**Likely causes**:
1. Incorrect DSN – verify the copy
2. Blocked by ad blockers – test in a private window
3. CSP blocking – review `connect-src` rules in middleware
4. Development environment – Sentry reports production by default

**Fix**:
```typescript
// Force Sentry in development (only while testing)
if (process.env.NODE_ENV === 'development') {
  Sentry.init({ /* config */ });
}
```

---

## 📚 Additional Resources

- **Official Docs**: https://docs.sentry.io/platforms/javascript/guides/nextjs/
- **Sentry Dashboard**: https://sentry.io/
- **API Reference**: https://docs.sentry.io/platforms/javascript/api/
- **Best Practices**: https://docs.sentry.io/platforms/javascript/best-practices/

---

## 🎯 Final Checklist

- [ ] Sentry account created
- [ ] Next.js project created in Sentry
- [ ] DSN copied
- [ ] `NEXT_PUBLIC_SENTRY_DSN` added to the environment
- [ ] (Optional) Auth token generated and stored
- [ ] Deployment completed
- [ ] Test error confirmed in Issues
- [ ] Events visible in Performance/Replays
- [ ] Alerts configured

---

**Production-grade monitoring in minutes.** 🔍

**Free tier comfortably supports ~1,000 monthly visitors.** ✅
