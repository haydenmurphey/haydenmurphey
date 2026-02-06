import type { Metadata } from 'next';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'About',
  description: 'Learn about my journey in cybersecurity and various operations.',
  url: '/about',
  type: 'profile',
  image: '/images/about/profile.png',
  tags: ['about', 'cyber professional', 'blue team specialist', 'physics background', 'career transition'],
});

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
