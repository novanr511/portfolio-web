import { analyticsWork } from "@/lib/data-analytics";
import { getSortedArticles } from "@/lib/articles";
import { getProjectStudies } from "@/lib/project-studies";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

/**
 * llms.txt (https://llmstxt.org) — a short, curated, machine-readable index of
 * the site for LLMs and AI answer engines. Generated from the same data
 * sources as the pages, so it stays in sync automatically. getSortedArticles()
 * returns only the curated allowlist, so this index lists the pieces that are
 * actually published rather than every file in the archive.
 */
export async function GET() {
  const sortedArticles = await getSortedArticles();
  const studies = await getProjectStudies();
  const articleLines = sortedArticles
    .map(
      (a) =>
        `- [${a.title}](${site.url}/articles/${a.slug}): ${a.description} (${formatDate(
          a.date
        )}, ${a.readingTime})`
    )
    .join("\n");

  const projectLines = projects
    .map((p) => {
      const study = p.caseStudy
        ? studies.find((s) => s.slug === p.slug)
        : undefined;
      const title = study
        ? `[${study.title}](${site.url}/projects/${p.slug})`
        : p.name;
      return `- ${title} — ${p.tagline}. ${p.description} (Tech: ${p.tags.join(", ")})${study ? ` (${study.readingTime})` : ""}`;
    })
    .join("\n");

  const analyticsLines = analyticsWork
    .map((w) => `- [${w.name}](${site.url}${w.href}): ${w.summary} (Tech: ${w.tags.join(", ")})`)
    .join("\n");

  const analyticsSection = `## Data analytics

Documented projects and reproducible public-data demos. Each linked page states its sources and limitations.

${analyticsLines}
`;

  const projectsSection = projects.length
    ? `## Projects

Selected work spanning the web stack and the AI stack:

${projectLines}
`
    : "";

  const body = `# ${site.name}

> ${site.description}

${site.author.name} is a web developer and SEO specialist based in ${site.location}, with years of WordPress and search-engine work, now building with Next.js and applying data science and AI to real problems. This is a curated technical portfolio and blog: ${sortedArticles.length} in-depth articles on technical SEO, AI search, applied AI and machine learning, each kept because it documents first-hand work or a sourced result. The archive of templated drafts is deliberately not published here. All content is in English and free to read.

## Articles

A curated set of ${sortedArticles.length} research-backed articles on technical SEO, AI search, retrieval-augmented generation, model evaluation, and the measurement work behind the projects. This is a set of pieces worth reading, not a count of everything ever written.

${articleLines}

${projectsSection}${analyticsSection}## Pages

- [Home](${site.url}): profile, latest articles, and highlighted projects
- [Articles](${site.url}/articles): all ${sortedArticles.length} curated articles
- [Projects](${site.url}/projects): ${projects.length ? "published project case studies" : "case studies in progress; no project entries are published yet"}
- [Data analytics](${site.url}/data-analytics): documented projects and public-data demos
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
