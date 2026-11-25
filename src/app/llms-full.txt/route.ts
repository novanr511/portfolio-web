import { readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { analyticsWork } from "@/lib/data-analytics";
import { getSortedArticles } from "@/lib/articles";
import { getProjectStudies } from "@/lib/project-studies";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

/**
 * llms-full.txt (https://llmstxt.org) — the complete published content as
 * plain markdown for LLM ingestion. Article bodies are read straight from the
 * MDX sources so they match what readers see, but only the curated allowlist
 * from getSortedArticles() is included. With Cache Components enabled this
 * route is prerendered at build time; no `dynamic` segment config is needed
 * (and `force-static` is incompatible with cacheComponents).
 */
export async function GET() {
  const sortedArticles = await getSortedArticles();
  const studies = await getProjectStudies();
  const sections = await Promise.all(
    sortedArticles.map(async (a) => {
      const raw = await readArticleBody(a.slug);
      return `## ${a.title}\n\n- URL: ${site.url}/articles/${a.slug}\n- Published: ${a.date}\n- Tags: ${a.tags.join(", ")}\n\n${raw.trim()}\n`;
    })
  );

  const studySections = await Promise.all(
    studies
      .filter((s) => projects.some((p) => p.slug === s.slug && p.caseStudy))
      .map(async (s) => {
        const raw = await readStudyBody(s.slug);
        return `## ${s.title}\n\n- URL: ${site.url}/projects/${s.slug}\n- Published: ${s.date}\n- Tags: ${s.tags.join(", ")}\n\n${raw.trim()}\n`;
      })
  );

  const demoSections = await Promise.all(
    analyticsWork
      .filter((w) => w.kind === "Public-data demo" || w.kind === "Applied project")
      .map(async (w) => {
        const raw = await readBody("data-analytics", w.slug);
        return `## ${w.name}\n\n- URL: ${site.url}${w.href}\n- Dataset: ${w.dataset ?? "see page"}\n\n${raw.trim()}\n`;
      })
  );

  const body = `# ${site.name} — full content

> ${site.description}

Below is the complete content of the ${sortedArticles.length} curated articles, the published project case studies, and the public-data analytics demos on the site, in markdown. The canonical page URLs are listed under each heading. The wider archive of templated drafts is not included.

${[...sections, ...studySections, ...demoSections].join("\n---\n\n")}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control":
        "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}

const cache = new Map<string, string>();

function readBody(kind: "articles" | "projects" | "data-analytics", slug: string): Promise<string> {
  const key = `${kind}/${slug}`;
  const cached = cache.get(key);
  if (cached) return Promise.resolve(cached);

  return readFile(
    path.join(process.cwd(), "src", "content", kind, `${slug}.mdx`),
    "utf8"
  ).then((raw) => {
    // Strip frontmatter — LLMs get the prose only
    const body = matter(raw).content;
    cache.set(key, body);
    return body;
  });
}

function readArticleBody(slug: string): Promise<string> {
  return readBody("articles", slug);
}

function readStudyBody(slug: string): Promise<string> {
  return readBody("projects", slug);
}
