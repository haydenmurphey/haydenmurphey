import type { Metadata } from 'next';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'Education & Certifications - Academic Background',
  description: 'Academic background in Computer Science and Physics. Postgraduate studies in Information Security and Materials Science. Pursuing CompTIA Security+, CEH, BTL1, and GSEC certifications.',
  url: '/formation',
  type: 'profile',
  tags: ['education', 'certifications', 'computer science', 'physics degree', 'information security', 'professional development'],
});

export default function FormationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
