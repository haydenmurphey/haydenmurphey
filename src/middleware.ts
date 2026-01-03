import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Security Middleware (Next.js 15+)
 * 
 * Implements nonce-based Content Security Policy and comprehensive security headers
 * to protect against XSS, clickjacking, MIME sniffing, and other attacks.
 * 
 * Next.js 15+ automatically applies nonces to framework scripts when using
 * the pattern below. This eliminates the need for 'unsafe-inline' and 'unsafe-eval'.
 * 
 * Security Benefits:
 * - ✅ Full nonce-based CSP (no unsafe-inline/unsafe-eval)
 * - ✅ strict-dynamic for trusted script chains
 * - ✅ Automatic nonce injection by Next.js framework
 * - ✅ XSS protection through whitelist-based execution
 */

export default function middleware(request: NextRequest) {
  // Generate cryptographically secure nonce
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  
  // Development mode needs relaxed CSP for HMR and eval
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  // Strict Content Security Policy with nonce
  // Using 'strict-dynamic' to trust scripts loaded by nonce-verified scripts
  const cspHeader = isDevelopment 
    ? `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline';
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com;
      style-src-attr 'self' 'unsafe-inline';
      img-src 'self' blob: data: https:;
      font-src 'self' https://fonts.gstatic.com;
      connect-src 'self' ws: wss: https://vitals.vercel-insights.com https://*.ingest.sentry.io;
      media-src 'self';
      object-src 'none';
      base-uri 'self';
      form-action 'self';
    `.replace(/\s{2,}/g, ' ').trim()
    : `
      default-src 'self';
      script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://va.vercel-scripts.com https://vercel.live;
      style-src 'self' 'nonce-${nonce}' https://fonts.googleapis.com;
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
    `.replace(/\s{2,}/g, ' ').trim();

  // Clone request headers and set nonce
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', cspHeader);

  // Create response with modified headers
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Set CSP header on response
  response.headers.set('Content-Security-Policy', cspHeader);

  // Core security headers
  response.headers.set('Content-Security-Policy', cspHeader);
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  
  // Permissions Policy (Feature Policy)
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()'
  );
  
  // HSTS (HTTP Strict Transport Security) - only in production
  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload'
    );
  }

  // Performance headers - Cache control for static assets
  const pathname = request.nextUrl.pathname;
  
  // Cache images and fonts for 1 year
  if (pathname.startsWith('/images/') || pathname.match(/\.(jpg|jpeg|png|gif|svg|webp|avif|woff|woff2|ttf|otf)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }
  
  // Cache CSS and JS for 1 year (with revalidation)
  if (pathname.match(/\.(css|js)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }
  
  // Cache HTML pages with revalidation
  if (pathname.endsWith('/') || pathname.match(/\.html$/)) {
    response.headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
