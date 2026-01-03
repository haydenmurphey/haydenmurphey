'use client';

import { Header, FloatingNav } from '@/components/layout';
import { Experience as ExperienceSection } from '@/components/pages';

export default function ExperiencePage() {
  return (
    <main className="relative min-h-screen cyber-bg-animated">
      <Header />
      <FloatingNav />
      <ExperienceSection />
    </main>
  );
}
