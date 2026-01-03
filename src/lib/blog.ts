import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { siteConfig } from '@/config/site.config';

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

// SECURITY: Slug validation regex - only allow kebab-case slugs
const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  featured?: boolean;
  coverImage?: string;
  tags?: string[];
  content: string;
}

export interface BlogPostMetadata {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  featured?: boolean;
  coverImage?: string;
  tags?: string[];
}

/**
 * Get all blog post slugs
 */
export function getAllPostSlugs(): string[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
      .filter(fileName => fileName.endsWith('.mdx'))
      .map(fileName => fileName.replace(/\.mdx$/, ''));
  } catch (error) {
    console.error('Error reading blog directory:', error);
    return [];
  }
}

/**
 * Calculate read time based on content
 * Average reading speed: 200-250 words per minute (using 225 WPM)
 */
function calculateReadTime(content: string): string {
  const wordsPerMinute = 225;
  
  // Remove code blocks to not count them fully
  const contentWithoutCode = content.replace(/```[\s\S]*?```/g, '');
  
  // Count words (split by whitespace and filter empty strings)
  const words = contentWithoutCode.trim().split(/\s+/).filter(word => word.length > 0);
  const wordCount = words.length;
  
  // Calculate minutes (round up)
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  
  // Return formatted string
  return `${minutes} min read`;
}

/**
 * Validates slug format to prevent path traversal attacks
 * @param slug - The slug to validate
 * @returns true if slug is valid, false otherwise
 */
function isValidSlug(slug: string): boolean {
  return SLUG_REGEX.test(slug);
}

/**
 * Get a single blog post by slug
 * SECURITY: Implements path traversal prevention
 */
export function getPostBySlug(slug: string): BlogPost | null {
  try {
    // SECURITY: Validate slug format (only kebab-case allowed)
    if (!isValidSlug(slug)) {
      console.error(`Invalid slug format: ${slug}`);
      return null;
    }
    
    // Construct path
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    
    // SECURITY: Verify path is within blog directory (prevent traversal)
    const normalizedPath = path.normalize(fullPath);
    const normalizedDir = path.normalize(postsDirectory);
    
    if (!normalizedPath.startsWith(normalizedDir)) {
      console.error(`Path traversal attempt detected: ${slug}`);
      return null;
    }
    
    // SECURITY: Check file exists before reading
    if (!fs.existsSync(fullPath)) {
      console.error(`Post not found: ${slug}`);
      return null;
    }
    
    // Safe to read file
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Calculate read time from content if not manually set
    const readTime = data.readTime || calculateReadTime(content);

    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      readTime,
      category: data.category,
  author: data.author || siteConfig.author.name,
      featured: data.featured || false,
      coverImage: data.coverImage,
      tags: data.tags || [],
      content,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

/**
 * Get all blog posts metadata (sorted by date)
 */
export function getAllPosts(): BlogPostMetadata[] {
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map((slug) => {
      const post = getPostBySlug(slug);
      if (!post) return null;
      
      // Remove content for metadata-only queries
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { content, ...metadata } = post;
      return metadata;
    })
    .filter((post): post is BlogPostMetadata => post !== null)
    .sort((a, b) => {
      // Sort by date (newest first)
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  return posts;
}

/**
 * Get recent blog posts (limit)
 */
export function getRecentPosts(limit: number = 3): BlogPostMetadata[] {
  const allPosts = getAllPosts();
  return allPosts.slice(0, limit);
}

/**
 * Get featured blog post
 */
export function getFeaturedPost(): BlogPostMetadata | null {
  const allPosts = getAllPosts();
  return allPosts.find(post => post.featured) || null;
}

/**
 * Get posts by category
 */
export function getPostsByCategory(category: string): BlogPostMetadata[] {
  const allPosts = getAllPosts();
  return allPosts.filter(post => post.category === category);
}

/**
 * Get all categories
 */
export function getAllCategories(): string[] {
  const allPosts = getAllPosts();
  const categories = allPosts.map(post => post.category);
  return [...new Set(categories)];
}
