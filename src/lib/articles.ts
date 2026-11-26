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
  /** Optional supporting image path, relative to /public (e.g. /images/articles/<slug>.png) */
  image?: string;
  /** Alt text describing what the image shows */
  imageAlt?: string;
  /** Optional short caption, e.g. source or what the chart measures */
  imageCaption?: string;
};

const articlesDir = path.join(process.cwd(), "src", "content", "articles");

import { CURATED_SLUG_SET as CURATED_SLUGS } from "./curated-slugs";

let cache: Promise<Article[]> | null = null;

/**
 * Articles live as MDX files in `src/content/articles/<slug>.mdx`, with all
 * metadata in YAML frontmatter. Edit them by hand or through the Keystatic
 * CMS at /keystatic — both write the same files.
 *
 * Every consumer of this function sees only the curated allowlist, so the
 * homepage, /articles, sitemap, feed, categories, llms.txt and llms-full.txt
 * all stay in sync from this one gate.
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

export type FaqEntry = { question: string; answer: string };

/**
 * Derive FAQPage entries from question-formatted H2 sections. An article opts
 * in simply by writing `## A natural question?` followed by a short answer
 * paragraph — no extra frontmatter or CMS field is needed.
 */
export async function getArticleFaq(slug: string): Promise<FaqEntry[]> {
  const raw = await readFile(path.join(articlesDir, `${slug}.mdx`), "utf8");
  const body = matter(raw).content;

  return body
    .split(/^##\s+/m)
    .slice(1)
    .map((section) => {
      const lineEnd = section.indexOf("\n");
      if (lineEnd === -1) return null;
      const question = section.slice(0, lineEnd).trim();
      if (!question.endsWith("?")) return null;

      const paragraph = section
        .slice(lineEnd + 1)
        .split(/\n\s*\n/)
        .map((part) => part.trim())
        .find((part) => part && !part.startsWith("<") && !part.startsWith("```"));
      if (!paragraph) return null;

      const answer = paragraph
        .replace(/<[^>]+>/g, "")
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .replace(/[`*_>]/g, "")
        .replace(/\s+/g, " ")
        .trim();

      return answer.length >= 20 ? { question, answer } : null;
    })
    .filter((entry): entry is FaqEntry => entry !== null)
    .slice(0, 8);
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
  const files = (await readdir(articlesDir))
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => ({ file, slug: file.replace(/\.mdx$/, "") }))
    // Reversible curation gate, not deletion: the whole archive stays on disk,
    // but only allowlisted slugs are ever read or parsed. Nothing is removed —
    // add a slug back to CURATED_SLUGS to publish it again across every endpoint.
    .filter(({ slug }) => CURATED_SLUGS.has(slug));

  const articles = await Promise.all(
    files.map(async ({ file, slug }): Promise<Article> => {
      const raw = await readFile(path.join(articlesDir, file), "utf8");
      const { data, content } = matter(raw);

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
        image: typeof data.image === "string" ? data.image : undefined,
        imageAlt: typeof data.imageAlt === "string" ? data.imageAlt : undefined,
        imageCaption:
          typeof data.imageCaption === "string" ? data.imageCaption : undefined,
      };
    })
  );

  return articles.sort((a, b) => b.date.localeCompare(a.date));
}
