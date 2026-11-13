import type { MetadataRoute } from "next";
import { getSortedArticles } from "@/lib/articles";
import { site } from "@/lib/site";

/**
 * Single source of truth: everything derives from `src/lib/*` data,
 * so adding an article or a new content type flows through here
 * automatically on the next build — no manual URL bookkeeping.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sortedArticles = await getSortedArticles();

  // The site changes whenever the newest article changes
  const latestArticleDate = sortedArticles[0]
    ? new Date(sortedArticles[0].updated ?? sortedArticles[0].date)
    : new Date(site.year, 0, 1);

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: site.url,
      lastModified: latestArticleDate,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${site.url}/articles`,
      lastModified: latestArticleDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${site.url}/projects`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${site.url}/about`,
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];

  const articlePages: MetadataRoute.Sitemap = sortedArticles.map((article) => ({
    url: `${site.url}/articles/${article.slug}`,
    lastModified: new Date(article.updated ?? article.date),
    changeFrequency: "yearly",
    priority: 0.8,
  }));

  return [...staticPages, ...articlePages];
}
