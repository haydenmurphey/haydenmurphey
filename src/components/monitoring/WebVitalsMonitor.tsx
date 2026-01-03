'use client';

import { useEffect } from 'react';
import { initWebVitals } from '@/lib/monitoring/web-vitals';

/**
 * Web Vitals Monitor Component
 * 
 * Initializes Core Web Vitals tracking when mounted.
 * Should be included in the root layout to monitor performance across all pages.
 * 
 * Tracks:
 * - CLS (Cumulative Layout Shift)
 * - FCP (First Contentful Paint)
 * - LCP (Largest Contentful Paint)
 * - TTFB (Time to First Byte)
 * - INP (Interaction to Next Paint)
 */
export function WebVitalsMonitor() {
  useEffect(() => {
    // Initialize web vitals tracking on client side
    initWebVitals();
  }, []);

  // This component doesn't render anything
  return null;
}
