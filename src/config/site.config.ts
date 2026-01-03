/**
 * Site Configuration
 *
 * Central configuration for site-wide metadata, branding, and URLs.
 * ⚠️ IMPORTANT: Update these values with your own information!
 *
 * This is a template - replace all placeholder values with your actual details.
 */

export const siteConfig = {
  /**
   * Site identity and branding
   * Replace with your name and professional details
   */
  name: 'Your Name - Cybersecurity Professional',
  codename: 'your-handle', // Your preferred username/handle
  author: {
    name: 'Your Full Name',
    codename: 'your-handle',
    jobTitle: 'Cybersecurity Specialist | Blue Team', // Your professional title
    tagline: 'Your professional tagline or motto',
    description: 'Your professional bio. Describe your background, expertise, and what makes you unique in the cybersecurity field.',
    organization: 'Your Organization or Independent',
  },

  /**
   * Site URLs and domains
   * Update with your actual domain
   */
  urls: {
    base: 'https://yourdomain.com',
    canonical: 'https://yourdomain.com',
  },

  /**
   * Default SEO metadata
   * Customize for better search engine optimization
   */
  seo: {
    title: 'Your Name - Cybersecurity Professional Portfolio',
    description: 'Professional portfolio showcasing cybersecurity projects, blog posts, and expertise. Specializing in [your specializations].',
    keywords: [
      'cybersecurity',
      'blue team',
      'defensive security',
      'security analyst',
      'SOC analyst',
      'SIEM',
      'incident response',
      'threat hunting',
      'security operations',
      'your name', // Replace with your actual name
      'your handle', // Replace with your handle
    ],
  },

  /**
   * Default OG image
   * Path to your social media preview image (recommended: 1200x630px)
   */
  defaultImage: '/images/site/og-default.png',

  /**
   * Supported languages
   * Add or remove languages as needed
   */
  languages: {
    default: 'en-US',
    supported: ['en-US'], // Add 'pt-BR', 'es-ES', etc. as needed
  },

  /**
   * Theme configuration
   */
  theme: {
    defaultMode: 'dark',
    color: '#0a1929', // Your brand color in hex
  },

  /**
   * Educational background
   * Update with your actual educational institutions
   */
  education: [
    {
      name: 'Your University Name',
      type: 'EducationalOrganization',
    },
    // Add more education entries as needed
  ],

  /**
   * Areas of expertise
   * List your key skills and specializations
   */
  expertise: [
    'Cybersecurity',
    'Blue Team Operations',
    'SIEM',
    'Incident Response',
    'Threat Hunting',
    'Security Operations Center',
    'Defensive Security',
    // Add your specific expertise areas
  ],
} as const;

export type SiteConfig = typeof siteConfig;
