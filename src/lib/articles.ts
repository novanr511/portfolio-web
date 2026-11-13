import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export type Article = {
  slug: string;
  title: string;
  /** Short summary used in cards, meta description, and JSON-LD */
  description: string;
  /** ISO date (published) */
  date: string;
  /** ISO date (last meaningful update), optional */
  updated?: string;
  tags: string[];
  /** Human-readable, e.g. "12 min read" — computed from the content */
  readingTime: string;
};

const articlesDir = path.join(process.cwd(), "src", "content", "articles");

let cache: Promise<Article[]> | null = null;

/**
 * Articles live as MDX files in `src/content/articles/<slug>.mdx`, with all
 * metadata in YAML frontmatter. Edit them by hand or through the Keystatic
 * CMS at /keystatic — both write the same files.
 */
export async function getSortedArticles(): Promise<Article[]> {
  cache ??= loadArticles();
  return cache;
}

export async function getArticle(
  slug: string
): Promise<Article | undefined> {
  const all = await getSortedArticles();
  return all.find((a) => a.slug === slug);
}

export async function getArticleCategories(): Promise<string[]> {
  const articles = await getSortedArticles();
  return [...new Set(articles.flatMap((article) => article.tags))].sort((a, b) =>
    a.localeCompare(b)
  );
}

export function categorySlug(category: string): string {
  return category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function getAdjacentArticles(
  all: Article[],
  slug: string
): { newer: Article | undefined; older: Article | undefined } {
  const idx = all.findIndex((a) => a.slug === slug);
  return {
    newer: idx > 0 ? all[idx - 1] : undefined,
    older:
      idx >= 0 && idx < all.length - 1 ? all[idx + 1] : undefined,
  };
}

async function loadArticles(): Promise<Article[]> {
  const files = (await readdir(articlesDir)).filter((f) =>
    f.endsWith(".mdx")
  );

  const articles = await Promise.all(
    files.map(async (file): Promise<Article> => {
      const raw = await readFile(path.join(articlesDir, file), "utf8");
      const { data, content } = matter(raw);
      const slug = file.replace(/\.mdx$/, "");

      const words = content.trim().split(/\s+/).length;
      const minutes = Math.max(1, Math.round(words / 200));

      return {
        slug,
        title: String(data.title ?? slug),
        description: String(data.description ?? ""),
        date: data.date ? new Date(data.date as string).toISOString().slice(0, 10) : "",
        updated: data.updated
          ? new Date(data.updated as string).toISOString().slice(0, 10)
          : undefined,
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        readingTime: `${minutes} min read`,
      };
    })
  );

  return articles.sort((a, b) => b.date.localeCompare(a.date));
}
