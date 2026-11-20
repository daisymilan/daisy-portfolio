import { navLinks, type NavLink } from "@/content/site";
import { getAllPosts } from "@/lib/blog";

/**
 * Nav links that should actually be shown. The Blog link stays hidden until
 * the first post is published, so visitors never land on an empty page.
 * Server-only: reads the blog folder from disk.
 */
export function getVisibleNavLinks(): NavLink[] {
  const hasPosts = getAllPosts().length > 0;
  return navLinks.filter((link) => link.href !== "/blog" || hasPosts);
}
