import * as Sentry from '@sentry/nextjs';

/**
 * Sentry Client Configuration
 * 
 * Monitors client-side errors, performance, and user interactions.
 * Only initializes if DSN is configured.
 */

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    
    // Adjust sample rate for production traffic
    // This controls what percentage of transactions are sent to Sentry
    tracesSampleRate: 1.0,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,

    // Session Replay
    replaysOnErrorSampleRate: 1.0, // Capture 100% of sessions with errors
    replaysSessionSampleRate: 0.1, // Capture 10% of all sessions

    // You can remove this option if you're not planning to use the Sentry Session Replay feature
    integrations: [
      Sentry.replayIntegration({
        // Mask all text content, input values, and media
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],

    // Filter out specific errors that are not actionable
    beforeSend(event, hint) {
      // Ignore browser extension errors
      if (
        hint.originalException &&
        typeof hint.originalException === 'object' &&
        'message' in hint.originalException &&
        typeof hint.originalException.message === 'string' &&
        (hint.originalException.message.includes('chrome-extension://') ||
          hint.originalException.message.includes('moz-extension://'))
      ) {
        return null;
      }
      return event;
    },

    // Environment
    environment: process.env.NODE_ENV || 'development',

    // Release tracking - automatically set by Vercel
    release: process.env.VERCEL_GIT_COMMIT_SHA,
  });
}
