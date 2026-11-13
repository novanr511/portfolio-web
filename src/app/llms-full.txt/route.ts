import { readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { getSortedArticles } from "@/lib/articles";
import { site } from "@/lib/site";

/**
 * llms-full.txt (https://llmstxt.org) — the complete site content as plain
 * markdown for LLM ingestion. Article bodies are read straight from the
 * MDX sources, so it always matches what readers see.
 */
export async function GET() {
  const sortedArticles = await getSortedArticles();
  const sections = await Promise.all(
    sortedArticles.map(async (a) => {
      const raw = await readArticleBody(a.slug);
      return `## ${a.title}\n\n- URL: ${site.url}/articles/${a.slug}\n- Published: ${a.date}\n- Tags: ${a.tags.join(", ")}\n\n${raw.trim()}\n`;
    })
  );

  const body = `# ${site.name} — full content

> ${site.description}

Below is the complete, up-to-date content of every article on the site, in markdown. The canonical page URLs are listed under each heading.

${sections.join("\n---\n\n")}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

const cache = new Map<string, string>();

async function readArticleBody(slug: string): Promise<string> {
  const cached = cache.get(slug);
  if (cached) return cached;

  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "articles",
    `${slug}.mdx`
  );
  const raw = await readFile(filePath, "utf8");
  // Strip frontmatter — LLMs get the prose only
  const body = matter(raw).content;
  cache.set(slug, body);
  return body;
}
