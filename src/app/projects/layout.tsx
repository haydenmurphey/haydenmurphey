import type { Metadata } from 'next';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'Cybersecurity Projects - Blue Team Portfolio',
  description: 'Explore cybersecurity projects including Beuni Platform (DevSecOps), Cybersec-BR Community (3,500+ members), InfoSec Digest newsletter, and defensive security tools. Real-world Blue Team implementations.',
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
