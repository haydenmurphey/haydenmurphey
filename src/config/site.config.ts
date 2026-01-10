/**
 * Site Configuration
 */

export const siteConfig = {
  /**
   * Site identity and branding
   */
  name: 'Hayden Murphey - Cybersecurity Professional',
  codename: '',
  author: {
    name: 'Hayden Murphey',
    codename: 'haydenmurphey',
    jobTitle: 'Cybersecurity Specialist', // Your professional title
    tagline: '{EDIT} My Professional Cybersecurity Journey',
    description: 'Your professional bio. Describe your background, expertise, and what makes you unique in the cybersecurity field.',
    organization: 'Independent',
  },

  /**
   * Site URLs and domains
   */
  urls: {
    base: 'https://haydenmurphey.site',
    canonical: 'https://haydenmurphey.site',
  },

  /**
   * Default SEO metadata
   * Customize for better search engine optimization
   */
  seo: {
    title: 'Hayden Murphey - Cybersecurity Professional Portfolio',
    description: 'Professional portfolio showcasing cybersecurity projects, blog posts, and expertise.',
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
      'Hayden Murphey', // Replace with your actual name
      'haydenmurphey', // Replace with your handle
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
    color: '#0a1929',
  },

  /**
   * Educational background
   */
  education: [
    {
      name: 'James Madison University',
      type: 'University',
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
