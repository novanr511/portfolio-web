import type { MetadataRoute } from "next";
import { analyticsWork } from "@/lib/data-analytics";
import { getSortedArticles } from "@/lib/articles";
import { getProjectStudies } from "@/lib/project-studies";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

/**
 * Single source of truth: everything derives from `src/lib/*` data,
 * so adding an article or a new content type flows through here
 * automatically on the next build — no manual URL bookkeeping.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sortedArticles = await getSortedArticles();
  const projectStudies = await getProjectStudies();

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
      url: `${site.url}/data-analytics`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${site.url}/about`,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${site.url}/privacy`,
      lastModified: new Date("2026-11-22"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const articlePages: MetadataRoute.Sitemap = sortedArticles.map((article) => ({
    url: `${site.url}/articles/${article.slug}`,
    lastModified: new Date(article.updated ?? article.date),
    changeFrequency: "yearly",
    priority: 0.8,
  }));

  const studyPages: MetadataRoute.Sitemap = projectStudies
    .filter((study) => projects.some((p) => p.slug === study.slug && p.caseStudy))
    .map((study) => ({
      url: `${site.url}/projects/${study.slug}`,
      lastModified: new Date(study.updated ?? study.date),
      changeFrequency: "yearly",
      priority: 0.8,
    }));

  const analyticsPages: MetadataRoute.Sitemap = analyticsWork
    .filter((work) => work.kind === "Public-data demo")
    .map((work) => ({
      url: `${site.url}${work.href}`,
      changeFrequency: "yearly",
      priority: 0.7,
    }));

  return [...staticPages, ...articlePages, ...studyPages, ...analyticsPages];
}
