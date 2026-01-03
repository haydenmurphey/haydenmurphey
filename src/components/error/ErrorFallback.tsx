'use client';

import { m } from 'framer-motion';

interface ErrorFallbackProps {
  error?: Error;
  resetError?: () => void;
}

/**
 * Error Fallback Component
 * 
 * A visually appealing fallback UI for error boundaries.
 * Displays a user-friendly error message with recovery options.
 */
export function ErrorFallback({ error, resetError }: ErrorFallbackProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cyber-dark px-4">
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        {/* Error Icon */}
        <m.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="mb-8"
        >
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-cyber-cyan mb-2">
            Oops! Something went wrong
          </h1>
          <p className="text-cyber-gray-light">
            We encountered an unexpected error. Don&apos;t worry, your data is safe.
          </p>
        </m.div>

        {/* Action Buttons */}
        <div className="space-y-4">
          {resetError && (
            <m.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              onClick={resetError}
              className="w-full px-6 py-3 bg-cyber-cyan text-cyber-dark font-semibold rounded-lg hover:bg-cyber-cyan/90 transition-colors"
            >
              Try Again
            </m.button>
          )}

          <m.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={() => window.location.reload()}
            className="w-full px-6 py-3 border border-cyber-cyan/30 text-cyber-cyan rounded-lg hover:bg-cyber-cyan/10 transition-colors"
          >
            Refresh Page
          </m.button>

          <m.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            onClick={() => window.location.href = '/'}
            className="w-full px-6 py-3 border border-cyber-cyan/30 text-cyber-cyan rounded-lg hover:bg-cyber-cyan/10 transition-colors"
          >
            Go to Homepage
          </m.button>
        </div>

        {/* Error Details (Development Only) */}
        {process.env.NODE_ENV === 'development' && error && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-left"
          >
            <p className="text-xs font-mono text-red-400 break-all">
              {error.toString()}
            </p>
            {error.stack && (
              <pre className="mt-2 text-xs font-mono text-red-400/70 overflow-auto max-h-40">
                {error.stack}
              </pre>
            )}
          </m.div>
        )}

        {/* Help Text */}
        <m.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-sm text-cyber-gray-light"
        >
          If the problem persists, please contact support.
        </m.p>
      </m.div>
    </div>
  );
}
