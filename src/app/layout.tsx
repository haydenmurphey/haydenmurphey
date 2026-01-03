import type { Metadata } from 'next';
import { Space_Mono, Inter } from 'next/font/google';
import { headers } from 'next/headers';
import './globals.css';
import { generateSEO, generatePersonSchema, generateWebsiteSchema, sanitizeJSON } from '@/lib/seo';
import { LazyMotionWrapper } from '@/components/motion';
import { WebVitalsMonitor } from '@/components/monitoring';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono',
});

const inter = Inter({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://yourdomain.com'),
  ...generateSEO({
    title: 'Your Name - Blue Team Cybersecurity Professional',
    description: 'Professional cybersecurity portfolio showcasing Blue Team operations, defensive security expertise, SIEM, SOC operations, threat hunting, and incident response capabilities.',
    url: '/',
    type: 'website',
    tags: ['portfolio', 'blue team', 'SOC analyst', 'threat hunting', 'security operations'],
  }),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Retrieve nonce from middleware headers (only in production)
  const nonce = process.env.NODE_ENV === 'production' 
    ? (await headers()).get('x-nonce') || undefined
    : undefined;
  
  // Generate structured data for SEO
  const personSchema = generatePersonSchema();
  const websiteSchema = generateWebsiteSchema();

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0a1929" />
        
        {/* JSON-LD Structured Data - Sanitized to prevent XSS, with nonce for CSP */}
        <script
          type="application/ld+json"
          {...(nonce && { nonce })}
          dangerouslySetInnerHTML={{ __html: sanitizeJSON(personSchema) }}
        />
        <script
          type="application/ld+json"
          {...(nonce && { nonce })}
          dangerouslySetInnerHTML={{ __html: sanitizeJSON(websiteSchema) }}
        />
      </head>
      <body className={`${spaceMono.variable} ${inter.variable} font-sans`} suppressHydrationWarning>
        <WebVitalsMonitor />
        <LazyMotionWrapper>
          {children}
        </LazyMotionWrapper>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
