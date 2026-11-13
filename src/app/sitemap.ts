import type { MetadataRoute } from "next";
import { sortedArticles } from "@/lib/articles";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: site.url, changeFrequency: "weekly", priority: 1 },
    {
      url: `${site.url}/articles`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${site.url}/projects`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    { url: `${site.url}/about`, changeFrequency: "yearly", priority: 0.6 },
  ];

  const articlePages: MetadataRoute.Sitemap = sortedArticles.map((article) => ({
    url: `${site.url}/articles/${article.slug}`,
    lastModified: new Date(article.updated ?? article.date),
    changeFrequency: "yearly",
    priority: 0.8,
  }));

  return [...staticPages, ...articlePages];
}
