import bundleAnalyzer from '@next/bundle-analyzer';
import { withSentryConfig } from '@sentry/nextjs';
import path from 'path';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Image optimization
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Static optimization
  output: 'standalone',

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  // Compression
  compress: true,
  
  // PoweredBy header removal for security
  poweredByHeader: false,

  webpack: (config) => {
    // Ensure the @ alias resolves correctly during server builds
    config.resolve.alias['@'] = config.resolve.alias['@'] ?? path.resolve(process.cwd(), 'src');
    return config;
  },
};

// Wrap with Sentry config for error tracking (only if DSN is configured)
const configWithSentry = process.env.NEXT_PUBLIC_SENTRY_DSN && withSentryConfig
  ? withSentryConfig(nextConfig, {
      // Sentry Webpack Plugin Options
      silent: true,
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      
      // Upload source maps to Sentry
      widenClientFileUpload: true,
      
      // Transpile SDK to be compatible with older browsers
      transpileClientSDK: true,
      
      // Automatically tree-shake Sentry logger statements
      disableLogger: true,
      
      // Hide source maps from generated client bundles
      hideSourceMaps: true,
      
      // Automatically instrument Next.js data fetching
      automaticVercelMonitors: true,
    })
  : nextConfig;

export default withBundleAnalyzer ? withBundleAnalyzer(configWithSentry) : configWithSentry;
