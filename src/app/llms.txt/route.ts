import { getSortedArticles } from "@/lib/articles";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

/**
 * llms.txt (https://llmstxt.org) — a curated, machine-readable index of the
 * site for LLMs and AI answer engines. Generated from the same data sources
 * as the pages, so it stays in sync automatically.
 */
export async function GET() {
  const sortedArticles = await getSortedArticles();
  const articleLines = sortedArticles
    .map(
      (a) =>
        `- [${a.title}](${site.url}/articles/${a.slug}): ${a.description} (${formatDate(
          a.date
        )}, ${a.readingTime})`
    )
    .join("\n");

  const projectLines = projects
    .map(
      (p) =>
        `- ${p.name} — ${p.tagline}. ${p.description} (Tech: ${p.tags.join(", ")})`
    )
    .join("\n");

  const projectsSection = projects.length
    ? `## Projects

Selected work spanning the web stack and the AI stack:

${projectLines}
`
    : "";

  const body = `# ${site.name}

> ${site.description}

${site.author.name} is a web developer and SEO specialist based in ${site.location}, with years of WordPress and search-engine work, now building with Next.js and transitioning into data science and applied AI. This site is his portfolio and technical blog. All content is in English, free to read, and continuously updated.

## Articles

In-depth, research-backed articles on AI engineering: how to get started, retrieval-augmented generation, and building agents with LangChain and LangGraph.

${articleLines}

${projectsSection}## Pages

- [Home](${site.url}): profile, latest articles, and highlighted projects
- [Articles](${site.url}/articles): all articles
- [Projects](${site.url}/projects): ${projects.length ? "published project case studies" : "case studies in progress; no project entries are published yet"}
- [About](${site.url}/about): bio, focus areas, and contact
- [RSS feed](${site.url}/feed.xml): subscribe to new articles
- [Full content for LLMs](${site.url}/llms-full.txt): complete article content in plain markdown

## Contact

- LinkedIn: ${site.social.linkedin}
- GitHub: ${site.social.github}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
