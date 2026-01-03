import type { Metric } from 'web-vitals';

/**
 * Web Vitals Monitoring
 * 
 * Tracks Core Web Vitals metrics for performance monitoring:
 * - CLS (Cumulative Layout Shift)
 * - FID (First Input Delay)
 * - FCP (First Contentful Paint)
 * - LCP (Largest Contentful Paint)
 * - TTFB (Time to First Byte)
 * - INP (Interaction to Next Paint)
 * 
 * Metrics are logged to console in development and can be sent
 * to analytics services in production.
 */

// Rating thresholds based on web.dev recommendations
const THRESHOLDS = {
  CLS: { good: 0.1, needsImprovement: 0.25 },
  FID: { good: 100, needsImprovement: 300 },
  FCP: { good: 1800, needsImprovement: 3000 },
  LCP: { good: 2500, needsImprovement: 4000 },
  TTFB: { good: 800, needsImprovement: 1800 },
  INP: { good: 200, needsImprovement: 500 },
} as const;

type MetricName = keyof typeof THRESHOLDS;

/**
 * Determines the rating of a metric based on its value
 */
function getRating(name: MetricName, value: number): 'good' | 'needs-improvement' | 'poor' {
  const threshold = THRESHOLDS[name];
  if (value <= threshold.good) return 'good';
  if (value <= threshold.needsImprovement) return 'needs-improvement';
  return 'poor';
}

/**
 * Formats metric value for display
 */
function formatValue(name: MetricName, value: number): string {
  // CLS is unitless, others are in milliseconds
  if (name === 'CLS') {
    return value.toFixed(3);
  }
  return `${Math.round(value)}ms`;
}

/**
 * Main handler for web vitals metrics
 */
export function reportWebVitals(metric: Metric): void {
  const { name, value, rating, id } = metric;
  
  // Calculate custom rating if needed
  const customRating = getRating(name as MetricName, value);
  const formattedValue = formatValue(name as MetricName, value);

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    const emoji = customRating === 'good' ? '✅' : customRating === 'needs-improvement' ? '⚠️' : '❌';
    console.log(
      `${emoji} ${name}: ${formattedValue} (${customRating})`,
      { id, rating, value, delta: metric.delta }
    );
  }

  // Send to analytics in production
  if (process.env.NODE_ENV === 'production') {
    // Example: Send to Google Analytics
    if (typeof window !== 'undefined' && 'gtag' in window) {
      const gtag = (window as { gtag?: (...args: unknown[]) => void }).gtag;
      gtag?.('event', name, {
        event_category: 'Web Vitals',
        event_label: id,
        value: Math.round(name === 'CLS' ? value * 1000 : value),
        non_interaction: true,
        metric_id: id,
        metric_value: value,
        metric_delta: metric.delta,
        metric_rating: customRating,
      });
    }

    // Example: Send to custom analytics endpoint
    // fetch('/api/monitoring/web-vitals', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     name,
    //     value,
    //     rating: customRating,
    //     id,
    //     delta: metric.delta,
    //     timestamp: Date.now(),
    //   }),
    // }).catch(console.error);
  }
}

/**
 * Initializes web vitals tracking
 * Should be called in the root layout or _app
 */
export async function initWebVitals(): Promise<void> {
  try {
    const { onCLS, onFCP, onLCP, onTTFB, onINP } = await import('web-vitals');
    
    onCLS(reportWebVitals);
    onFCP(reportWebVitals);
    onLCP(reportWebVitals);
    onTTFB(reportWebVitals);
    onINP(reportWebVitals);
  } catch (error) {
    console.error('Failed to initialize web vitals:', error);
  }
}
