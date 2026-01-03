import BlogPreviewClient from './BlogPreviewClient';
import { getRecentPosts } from '@/lib/blog';

export default function BlogPreview() {
  // Show 6 recent posts (including new portfolio article)
  const latestPosts = getRecentPosts(6);
  return <BlogPreviewClient posts={latestPosts} />;
}
