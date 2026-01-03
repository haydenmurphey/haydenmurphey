import * as Sentry from '@sentry/nextjs';

/**
 * Sentry Server Configuration
 * 
 * Monitors server-side errors, API routes, and SSR issues.
 * Only initializes if DSN is configured.
 */

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,

    // Adjust sample rate for production traffic
    tracesSampleRate: 1.0,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,

    // Environment
    environment: process.env.NODE_ENV || 'development',

    // Release tracking - automatically set by Vercel
    release: process.env.VERCEL_GIT_COMMIT_SHA,
  });
}
