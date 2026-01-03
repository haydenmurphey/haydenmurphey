'use client';

import { Header } from '@/components/layout';
import { Projects as ProjectsSection } from '@/components/pages';

export default function ProjectsPage() {
  return (
    <main className="relative cyber-bg-animated">
      <Header />
      <ProjectsSection />
    </main>
  );
}
