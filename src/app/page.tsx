export const dynamic = "force-static";

import type { Metadata } from 'next';
import dynamic1 from 'next/dynamic';
import { Header, FloatingNav } from '@/components/layout';
import HomeSection from '@/components/home/Home';
import HomelabPreview from '@/components/home/HomelabPreview';
import { generateSEO } from '@/lib/seo';
import { siteConfig } from '@/config/site.config';

// Dynamic imports for below-the-fold content
const ProjectsPreview = dynamic1(() => import('@/components/home/ProjectsPreview'));
const BlogPreview = dynamic1(() => import('@/components/home/BlogPreview'));
const FormationSection = dynamic1(() => import('@/components/pages/Formation'));
const ExperienceSection = dynamic1(() => import('@/components/pages/Experience'));
const ContactSection = dynamic1(() => import('@/components/pages/Contact'));

export const metadata: Metadata = generateSEO({
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  url: '/',
  type: 'profile',
  tags: [...siteConfig.expertise],
});

export default function Home() {
  // English translations
  const homeTranslations = {
    badge: 'Currently Open For Work',
    title: siteConfig.author.name,
    codename: siteConfig.codename,
    tagline: siteConfig.author.tagline,
    description: siteConfig.author.description,
    cta: 'Explore Projects',
  };

  return (
    <main className="relative min-h-screen cyber-bg-animated">
      {/* Header with Navigation */}
      <Header />
      
      {/* Floating Navigation */}
      <FloatingNav />

      {/* Main Content Sections */}
      <section id="home" aria-labelledby="home-heading">
        <HomeSection translations={homeTranslations} />
      </section>
      
      <section id="projects" aria-labelledby="projects-heading">
        <ProjectsPreview />
      </section>

      <section id="homelabs" aria-labelledby="homelabs-heading">
        <HomelabPreview />
      </section>
      
      <section id="formation" aria-labelledby="formation-heading">
        <FormationSection />
      </section>
      
      <section id="experience" aria-labelledby="experience-heading">
        <ExperienceSection />
      </section>
      
      <section id="blog" aria-labelledby="blog-heading">
        <BlogPreview />
      </section>
      
      <section id="contact" aria-labelledby="contact-heading">
        <ContactSection />
      </section>
    </main>
  );
}
