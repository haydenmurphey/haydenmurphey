export const dynamic = "force-static";

import type { Metadata } from 'next';
import { Header } from '@/components/layout';
import HomelabsSection from '@/components/pages/Homelabs';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'Home Labs - Practice Scenarios',
  description: 'Hands-on homelab scenarios designed for practice.',
  url: '/homelabs',
  type: 'website',
  tags: ['homelab', 'blue team lab', 'detection engineering', 'incident response lab', 'purple team exercises'],
});

export default function HomelabsPage() {
  return (
    <main className="relative cyber-bg-animated">
      <Header />
      <HomelabsSection />
    </main>
  );
}
