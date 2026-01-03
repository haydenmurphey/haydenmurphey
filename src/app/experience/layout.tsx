import type { Metadata } from 'next';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'Professional Experience - Blue Team Career',
  description: 'Professional cybersecurity experience in Blue Team operations, SOC analysis, incident response, and security education. Background in physics and computational security.',
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
