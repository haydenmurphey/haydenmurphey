import type { Metadata } from 'next';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'Professional Experience - Cybersecurity Career',
  description: 'Professional cybersecurity experience.',
  url: '/experience',
  type: 'profile',
  tags: ['professional experience', 'blue team career', 'SOC analyst', 'security instructor', 'cybersecurity background'],
});

export default function ExperienceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
