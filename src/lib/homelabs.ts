import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const labsDirectory = path.join(process.cwd(), 'src/content/homelabs');

const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export interface Homelab {
  slug: string;
  title: string;
  description: string;
  date: string;
  difficulty: string;
  duration: string;
  status: string;
  focusArea: string;
  category: string;
  coverImage?: string;
  tools: string[];
  objectives: string[];
  requirements: string[];
  tags: string[];
  featured?: boolean;
  readTime: string;
  content: string;
}

export interface HomelabMetadata {
  slug: string;
  title: string;
  description: string;
  date: string;
  difficulty: string;
  duration: string;
  status: string;
  focusArea: string;
  category: string;
  coverImage?: string;
  tools: string[];
  objectives: string[];
  requirements: string[];
  tags: string[];
  featured?: boolean;
  readTime: string;
}

// In-memory caches to avoid repeated disk access during build/runtime
const labCache = new Map<string, Homelab>();
let allLabsCache: HomelabMetadata[] | null = null;

function calculateReadTime(content: string): string {
  const wordsPerMinute = 225;
  const sanitizedContent = content.replace(/```[\s\S]*?```/g, '');
  const words = sanitizedContent.trim().split(/\s+/).filter(Boolean);
  const minutes = Math.max(1, Math.ceil(words.length / wordsPerMinute));
  return `${minutes} min read`;
}

function isValidSlug(slug: string): boolean {
  return SLUG_REGEX.test(slug);
}

export function getAllLabSlugs(): string[] {
  try {
    const fileNames = fs.readdirSync(labsDirectory);
    return fileNames
      .filter((fileName) => fileName.endsWith('.mdx'))
      .map((fileName) => fileName.replace(/\.mdx$/, ''));
  } catch (error) {
    console.error('Error reading homelabs directory:', error);
    return [];
  }
}

function readLabFromDisk(slug: string): Homelab | null {
  try {
    if (!isValidSlug(slug)) {
      console.error(`Invalid homelab slug format: ${slug}`);
      return null;
    }

    const fullPath = path.join(labsDirectory, `${slug}.mdx`);
    const normalizedPath = path.normalize(fullPath);
    const normalizedDir = path.normalize(labsDirectory);

    if (!normalizedPath.startsWith(normalizedDir)) {
      console.error(`Path traversal attempt detected for homelab: ${slug}`);
      return null;
    }

    if (!fs.existsSync(fullPath)) {
      console.error(`Homelab not found: ${slug}`);
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const readTime = data.readTime || calculateReadTime(content);

    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      difficulty: data.difficulty || 'Intermediate',
      duration: data.duration || readTime,
      status: data.status || 'Ready',
      focusArea: data.focusArea || data.category || 'Blue Team',
      category: data.category || 'Blue Team',
      coverImage: data.coverImage,
      tools: Array.isArray(data.tools) ? data.tools : [],
      objectives: Array.isArray(data.objectives) ? data.objectives : [],
      requirements: Array.isArray(data.requirements) ? data.requirements : [],
      tags: Array.isArray(data.tags) ? data.tags : [],
      featured: data.featured || false,
      readTime,
      content,
    };
  } catch (error) {
    console.error(`Error reading homelab ${slug}:`, error);
    return null;
  }
}

export function getLabBySlug(slug: string): Homelab | null {
  if (labCache.has(slug)) {
    return labCache.get(slug) ?? null;
  }

  const lab = readLabFromDisk(slug);
  if (lab) {
    labCache.set(slug, lab);
  }

  return lab;
}

export function getAllLabs(): HomelabMetadata[] {
  if (allLabsCache) {
    return allLabsCache;
  }

  const slugs = getAllLabSlugs();
  const labs = slugs
    .map((slug) => {
      const lab = getLabBySlug(slug);
      if (!lab) return null;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { content, ...metadata } = lab;
      return metadata;
    })
    .filter((lab): lab is HomelabMetadata => lab !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  allLabsCache = labs;
  return labs;
}

export function getRecentLabs(limit: number = 3): HomelabMetadata[] {
  return getAllLabs().slice(0, limit);
}

export function getFeaturedLab(): HomelabMetadata | null {
  const labs = getAllLabs();
  return labs.find((lab) => lab.featured) || null;
}

export function getFocusAreas(): string[] {
  const labs = getAllLabs();
  const focusAreas = labs.map((lab) => lab.focusArea).filter(Boolean);
  return [...new Set(focusAreas)];
}

export function getDifficulties(): string[] {
  const labs = getAllLabs();
  const difficulties = labs.map((lab) => lab.difficulty).filter(Boolean);
  return [...new Set(difficulties)];
}
