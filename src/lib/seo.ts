import type { Metadata } from 'next';
import { siteConfig } from '@/config/site.config';
import { socialConfig } from '@/config/social.config';

interface SEOConfig {
  title: string;
  description: string;
  url?: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  author?: string;
  tags?: string[];
}

const authorName = siteConfig.author.name;
const authorHandle = siteConfig.codename || siteConfig.author.codename;
const canonicalUrl = siteConfig.urls.canonical;

const defaultSEO = {
  siteName: siteConfig.name,
  defaultTitle: siteConfig.seo.title,
  defaultDescription: siteConfig.seo.description,
  baseUrl: canonicalUrl,
  defaultImage: siteConfig.defaultImage,
  twitterHandle: socialConfig.twitter?.handle ?? '@your-twitter-handle',
  twitterUsername: socialConfig.twitter?.username ?? 'your-twitter-handle',
  linkedinUsername: socialConfig.linkedin?.username ?? 'your-linkedin-username',
  githubUsername: socialConfig.github?.username ?? 'your-github-username',
  authorName,
  authorHandle,
};

export function generateSEO({
  title,
  description,
  url,
  image,
  type = 'website',
  publishedTime,
  author,
  tags = [],
}: SEOConfig): Metadata {
  const fullTitle = title === defaultSEO.defaultTitle ? title : `${title} | ${defaultSEO.authorName}`;
  const fullUrl = `${defaultSEO.baseUrl}${url || '/'}`;
  const relativeImage = image || defaultSEO.defaultImage;
  const ogImage = relativeImage.startsWith('http') ? relativeImage : `${defaultSEO.baseUrl}${relativeImage}`;

  // Base keywords for all pages
  const baseKeywords = [
    'cybersecurity',
    'blue team',
    'defensive security',
    'security analyst',
    'SOC analyst',
    'SIEM',
    'incident response',
    'threat hunting',
    'security operations',
    defaultSEO.authorName,
    defaultSEO.authorHandle,
  ];

  const allKeywords = Array.from(new Set([...baseKeywords, ...tags]));

  return {
    title: fullTitle,
    description,
    keywords: allKeywords,
    authors: [{ name: author || defaultSEO.authorName }],
    creator: defaultSEO.authorName,
    publisher: defaultSEO.authorName,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type,
      locale: 'en_US',
      url: fullUrl,
      siteName: defaultSEO.siteName,
      title: fullTitle,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
          type: 'image/jpeg',
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(author && { authors: [author] }),
    },
    twitter: {
      card: 'summary_large_image',
      site: defaultSEO.twitterHandle,
      creator: defaultSEO.twitterHandle,
      title: fullTitle,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: fullUrl,
      languages: {
        'en-US': fullUrl,
      },
    },
    verification: {
      google: 'your-google-verification-code',
      yandex: 'your-yandex-verification-code',
      other: {
        'msvalidate.01': 'your-bing-verification-code',
      },
    },
  };
}

// Schema.org JSON-LD structured data
export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: defaultSEO.authorName,
    alternateName: defaultSEO.authorHandle,
    url: defaultSEO.baseUrl,
    image: `${defaultSEO.baseUrl}${siteConfig.defaultImage}`,
    sameAs: [
      `https://twitter.com/${defaultSEO.twitterUsername}`,
      `https://linkedin.com/in/${defaultSEO.linkedinUsername}`,
      `https://github.com/${defaultSEO.githubUsername}`,
    ],
    jobTitle: siteConfig.author.jobTitle,
    worksFor: {
      '@type': 'Organization',
      name: siteConfig.author.organization,
    },
    knowsAbout: siteConfig.expertise,
    alumniOf: siteConfig.education.map((education) => ({
      '@type': education.type ?? 'EducationalOrganization',
      name: education.name,
    })),
  };
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: defaultSEO.siteName,
    url: defaultSEO.baseUrl,
    description: defaultSEO.defaultDescription,
    inLanguage: 'en-US',
    author: {
      '@type': 'Person',
      name: defaultSEO.authorName,
      alternateName: defaultSEO.authorHandle,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${defaultSEO.baseUrl}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateBlogPostSchema({
  title,
  description,
  url,
  image,
  publishedTime,
  modifiedTime,
  author,
  tags,
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
  publishedTime: string;
  modifiedTime?: string;
  author: string;
  tags?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    image: image ? `${defaultSEO.baseUrl}${image}` : `${defaultSEO.baseUrl}${defaultSEO.defaultImage}`,
    url: `${defaultSEO.baseUrl}${url}`,
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: {
      '@type': 'Person',
      name: author,
      url: defaultSEO.baseUrl,
    },
    publisher: {
      '@type': 'Person',
      name: defaultSEO.authorName,
      logo: {
        '@type': 'ImageObject',
        url: `${defaultSEO.baseUrl}${siteConfig.defaultImage}`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${defaultSEO.baseUrl}${url}`,
    },
    keywords: tags?.join(', '),
    inLanguage: 'en-US',
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${defaultSEO.baseUrl}${item.url}`,
    })),
  };
}

export function generateProjectSchema({
  name,
  description,
  url,
  image,
  dateCreated,
  programmingLanguage,
  keywords,
}: {
  name: string;
  description: string;
  url: string;
  image?: string;
  dateCreated?: string;
  programmingLanguage?: string[];
  keywords?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name,
    description,
    url,
    codeRepository: url,
    ...(image && { image: `${defaultSEO.baseUrl}${image}` }),
    ...(dateCreated && { dateCreated }),
    ...(programmingLanguage && { programmingLanguage }),
    ...(keywords && { keywords: keywords.join(', ') }),
    author: {
      '@type': 'Person',
      name: defaultSEO.authorName,
      url: defaultSEO.baseUrl,
    },
  };
}

/**
 * Sanitize JSON data to prevent XSS in JSON-LD structured data
 * 
 * This function escapes dangerous HTML characters that could be used
 * for XSS attacks when JSON is embedded in HTML <script> tags.
 * 
 * @param data - Any JSON-serializable data
 * @returns Safely escaped JSON string
 * 
 * @example
 * ```tsx
 * <script
 *   type="application/ld+json"
 *   dangerouslySetInnerHTML={{ __html: sanitizeJSON(schema) }}
 * />
 * ```
 */
export function sanitizeJSON(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/'/g, '\\u0027')
    .replace(/"/g, '\\u0022');
}

export default defaultSEO;
