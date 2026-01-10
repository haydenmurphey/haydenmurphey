import type { Metadata } from 'next';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'Project Portfolio',
  description: 'Explore various projects including skills from many different displicines in the computation world.',
  url: '/projects',
  type: 'website',
  tags: ['cybersecurity projects', 'blue team tools', 'devsecops', 'security community', 'open source security'],
});

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
