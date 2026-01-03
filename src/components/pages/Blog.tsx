import BlogSectionClient from './BlogClient';
import { getAllPosts, getFeaturedPost, getAllCategories } from '@/lib/blog';

export default function BlogSection() {
  const allPosts = getAllPosts();
  const featuredPost = getFeaturedPost();
  const recentPosts = featuredPost
    ? allPosts.filter(post => post.slug !== featuredPost.slug)
    : allPosts;
  const allCategories = getAllCategories();

  return <BlogSectionClient featuredPost={featuredPost} recentPosts={recentPosts} allCategories={allCategories} />;
}
