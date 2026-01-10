import bundleAnalyzer from '@next/bundle-analyzer';
import { withSentryConfig } from '@sentry/nextjs';
import path from 'path';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  images: {
    unoptimized: true, // Crucial for GitHub Pages
    formats: ['image/avif', 'image/webp'],
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Changed to 'export' for GitHub Pages compatibility
  output: 'export', 
  
  // basePath: '/your-repo-name', // Reminder: Add this if your repo isn't username.github.io

  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  // Note: headers() removed because they aren't supported by 'output: export'
  
  poweredByHeader: false,

  webpack: (config) => {
    config.resolve.alias['@'] = config.resolve.alias['@'] ?? path.resolve(process.cwd(), 'src');
    return config;
  },
};

const configWithSentry = process.env.NEXT_PUBLIC_SENTRY_DSN && withSentryConfig
  ? withSentryConfig(nextConfig, {
      silent: true,
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      widenClientFileUpload: true,
      transpileClientSDK: true,
      disableLogger: true,
      hideSourceMaps: true,
      automaticVercelMonitors: true,
    })
  : nextConfig;

export default withBundleAnalyzer ? withBundleAnalyzer(configWithSentry) : configWithSentry;