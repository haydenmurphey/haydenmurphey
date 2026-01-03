# Deployment Guide

![Vercel](https://img.shields.io/badge/Vercel-optimized-black)
![Production](https://img.shields.io/badge/production-ready-success)
![Uptime](https://img.shields.io/badge/uptime-99.9%25-brightgreen)

**Complete deployment guide for production environments**

---

## 📋 Deployment Options

### Recommended: Vercel (Easiest)

✅ **Best for**: Next.js projects, zero configuration  
✅ **Features**: Automatic deployments, edge network, analytics  
✅ **Free Tier**: Generous limits for personal projects

### Alternative: Netlify

✅ **Best for**: Static sites, great UI  
✅ **Features**: Deploy previews, form handling, serverless functions  
✅ **Free Tier**: 100GB bandwidth/month

### Self-Hosted: VPS / Cloud

✅ **Best for**: Full control, custom requirements  
✅ **Options**: AWS, DigitalOcean, Linode, Railway  
✅ **Requirements**: Node.js 18+, PM2

---

## 🚀 Deploying to Vercel

### Method 1: GitHub Integration (Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "chore: prepare for deployment"
git push origin main
```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository

3. **Configure Project**
   ```
   Framework Preset: Next.js
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   Node Version: 18.x
   ```

4. **Environment Variables** (Optional)
   ```bash
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   NEXT_PUBLIC_GOOGLE_VERIFICATION=your-verification-code
   NEXT_PUBLIC_BING_VERIFICATION=your-verification-code
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your site is live! 🎉

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy (production)
vercel --prod

# Deploy (preview)
vercel
```

### Automatic Deployments

Once connected to GitHub:
- **Push to `main`** → Production deployment
- **Push to other branches** → Preview deployment
- **Pull requests** → Preview deployment with unique URL

---

## 🌐 Custom Domain Setup

### 1. Add Domain in Vercel

1. Go to Project Settings → Domains
2. Add your domain: `yourdomain.com`
3. Add `www` subdomain: `www.yourdomain.com`

### 2. Configure DNS

**For Apex Domain** (`yourdomain.com`):

```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

**For WWW Subdomain**:

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

**Recommended DNS Providers**:
- Cloudflare (free, fast, DDoS protection)
- Namecheap
- Google Domains
- Route 53 (AWS)

### 3. SSL Certificate

- Automatically provisioned by Vercel
- Uses Let's Encrypt
- Renews automatically
- No configuration needed ✅

### 4. Verify Setup

```bash
# Check DNS propagation (may take 1-48 hours)
nslookup yourdomain.com

# Check SSL certificate
https://www.ssllabs.com/ssltest/analyze.html?d=yourdomain.com
```

---

## 📦 Deploying to Netlify

### Method 1: Git Integration

1. **Create `netlify.toml`**
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/404.html"
  status = 404
```

2. **Connect Repository**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Choose GitHub and select your repository

3. **Configure Build**
   ```
   Build command: npm run build
   Publish directory: .next
   ```

4. **Deploy**
   - Click "Deploy site"
   - Site live in 2-3 minutes

### Method 2: Netlify CLI

```bash
# Install CLI
npm install -g netlify-cli

# Login
netlify login

# Build and deploy
netlify deploy --prod
```

---

## ☁️ Cloud Platform Deployments

### AWS Amplify

```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Initialize
amplify init

# Add hosting
amplify add hosting

# Deploy
amplify publish
```

**Configuration**:
- Framework: Next.js - SSG
- Build command: `npm run build`
- Build output directory: `.next`

### DigitalOcean App Platform

1. **Create App**
   - Go to DigitalOcean console
   - Click "Create App"
   - Connect GitHub repository

2. **Configure**
   ```
   Build Command: npm run build
   Run Command: npm start
   HTTP Port: 3000
   ```

3. **Deploy**
   - Click "Create Resources"
   - App deploys automatically

### Railway

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize
railway init

# Deploy
railway up
```

---

## 🔧 Pre-Deployment Checklist

### Code Quality
- [ ] No console errors or warnings
- [ ] All TypeScript types correct
- [ ] Linter passes: `npm run lint`
- [ ] Production build succeeds: `npm run build`
- [ ] Test production locally: `npm start`

### Content
- [ ] All personal information updated
- [ ] Social links configured
- [ ] At least 2-3 blog posts
- [ ] Projects section updated
- [ ] Images optimized (<500KB each)
- [ ] Favicon and OG images added

### Configuration
- [ ] Site URL updated in config
- [ ] Environment variables set
- [ ] Analytics configured (if applicable)
- [ ] SEO metadata complete
- [ ] Robots.txt configured

### Performance
- [ ] Lighthouse score > 90
- [ ] Images use Next/Image component
- [ ] No unnecessary dependencies
- [ ] Bundle size reasonable (<200KB)
- [ ] LCP < 2.5s

### Security
- [ ] Security headers verified
- [ ] CSP configured
- [ ] HTTPS enforced
- [ ] No secrets in code
- [ ] Dependencies updated

---

## 📊 Post-Deployment

### 1. Verify Deployment

```bash
# Check site is accessible
curl -I https://yourdomain.com

# Check security headers
curl -I https://yourdomain.com | grep -i "strict-transport-security\|content-security-policy\|x-frame-options"

# Run Lighthouse audit
npx lighthouse https://yourdomain.com --view
```

### 2. Submit to Search Engines

**Google Search Console**:
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property: `yourdomain.com`
3. Verify ownership (verification code in `robots.ts`)
4. Submit sitemap: `https://yourdomain.com/sitemap.xml`

**Bing Webmaster Tools**:
1. Go to [bing.com/webmasters](https://www.bing.com/webmasters)
2. Add site: `yourdomain.com`
3. Verify ownership
4. Submit sitemap

### 3. Set Up Monitoring

**Vercel Analytics** (Built-in):
- Automatically enabled
- View in Vercel dashboard
- Web Vitals tracking included

**Uptime Monitoring** (Optional):
- [UptimeRobot](https://uptimerobot.com) - Free tier
- [Pingdom](https://www.pingdom.com)
- [StatusCake](https://www.statuscake.com)

**Performance Monitoring** (Planned):
```typescript
// src/lib/monitoring/web-vitals.ts
export function reportWebVitals(metric: Metric) {
  // Send to analytics
  console.log(metric);
  
  // Optional: Send to external service
  // fetch('/api/analytics', {
  //   method: 'POST',
  //   body: JSON.stringify(metric)
  // });
}
```

### 4. Set Up Analytics (Optional)

**Umami** (Privacy-friendly, open-source):
```bash
# Install Umami
npm install @umami/react

# Add to layout.tsx
import Umami from '@umami/react';

<Umami websiteId="your-website-id" />
```

**Plausible** (Privacy-friendly, paid):
```html
<!-- Add to layout.tsx <head> -->
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

---

## 🔄 Continuous Deployment

### GitHub Actions (Optional)

Create `.github/workflows/ci.yml`:

```yaml
name: CI/CD

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Lint
      run: npm run lint
      
    - name: Build
      run: npm run build
      
    - name: Deploy to Vercel
      if: github.ref == 'refs/heads/main'
      run: vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

---

## 🐛 Troubleshooting

### Build Fails

**Error**: `MODULE_NOT_FOUND`
```bash
# Solution: Clean install
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Error**: `Out of memory`
```bash
# Solution: Increase Node memory
NODE_OPTIONS=--max_old_space_size=4096 npm run build
```

### Site Not Loading

**Check**:
1. DNS propagation (can take 24-48 hours)
2. SSL certificate provisioned
3. Deployment completed successfully
4. No browser cache issues (try incognito)

### Performance Issues

**Check**:
1. Images optimized
2. Code splitting working
3. No unnecessary dependencies
4. CDN caching enabled

---

## 📈 Scaling

### High Traffic Preparation

1. **Enable Caching**
   - Static assets: 1 year
   - HTML: revalidate on change
   - API responses: appropriate cache time

2. **CDN Configuration**
   - Vercel/Netlify handle this automatically
   - Custom CDN: Cloudflare, AWS CloudFront

3. **Image Optimization**
   - Use Next/Image component
   - Enable AVIF/WebP
   - Lazy load below-the-fold

4. **Monitoring**
   - Set up alerts for downtime
   - Monitor Web Vitals
   - Track error rates

---

## 🔐 Security Post-Deployment

### 1. Security Headers Check

```bash
# Check headers
curl -I https://yourdomain.com | grep -i security
```

Expected headers:
- `Strict-Transport-Security`
- `Content-Security-Policy`
- `X-Frame-Options`
- `X-Content-Type-Options`
- `Referrer-Policy`

### 2. SSL/TLS Check

- Grade A on [SSL Labs](https://www.ssllabs.com/ssltest/)
- TLS 1.2 minimum
- No weak ciphers

### 3. Regular Updates

```bash
# Check for outdated packages
npm outdated

# Update dependencies
npm update

# Security audit
npm audit

# Fix vulnerabilities
npm audit fix
```

---

## 📚 Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [DNS Checker](https://dnschecker.org/)
- [SSL Test](https://www.ssllabs.com/ssltest/)

---

**Your site is now live and production-ready!** 🎉

*Last updated: October 14, 2025*
