'use client';

import { Header, FloatingNav } from '@/components/layout';
import { Formation as FormationSection } from '@/components/pages';

export default function FormationPage() {
  return (
  <main className="relative min-h-screen cyber-bg-animated">
      <Header />
      <FloatingNav />
      <FormationSection />
    </main>
  );
}
