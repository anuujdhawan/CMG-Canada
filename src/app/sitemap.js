import { getAllPages } from "@/lib/sitePages";
import { site } from "@/config/site";

/**
 * Sitemap — one URL for every page built from the scraped content, using each
 * page's own sitemap priority and last-modified date from the content files.
 * Emits nothing unless the site URL is configured.
 */
export default function sitemap() {
  if (!site.url) return [];

  const base = site.url.replace(/\/$/, "");

  return getAllPages()
    .map((page) => {
      const lastModified = page.meta.lastModified ? new Date(page.meta.lastModified) : new Date();
      return {
        url: `${base}${page.path === "/" ? "" : page.path}`,
        lastModified,
        changeFrequency: page.path.startsWith("/blog/") ? "monthly" : "weekly",
        priority: page.meta.priority || 0.7,
      };
    })
    .sort((a, b) => b.priority - a.priority || a.url.localeCompare(b.url));
}
