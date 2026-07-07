import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { featuredProjects } from "@/content/projects";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/work", "/about", "/services", "/blog", "/contact"].map(
    (route) => ({
      url: `${site.url}${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8,
    })
  );

  const caseStudyRoutes = featuredProjects.map((project) => ({
    url: `${site.url}/work/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogRoutes = getAllPosts().map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...caseStudyRoutes, ...blogRoutes];
}
