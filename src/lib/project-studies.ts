import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export type ProjectStudy = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  tags: string[];
  inLanguage: string;
  readingTime: string;
};

const studiesDir = path.join(process.cwd(), "src", "content", "projects");

let cache: Promise<ProjectStudy[]> | null = null;

/**
 * Long-form project case studies live as MDX files in
 * `src/content/projects/<slug>.mdx`, with metadata in YAML frontmatter.
 * The slug matches the corresponding entry in `src/lib/projects.ts`.
 */
export async function getProjectStudies(): Promise<ProjectStudy[]> {
  cache ??= loadStudies();
  return cache;
}

export async function getProjectStudy(
  slug: string
): Promise<ProjectStudy | undefined> {
  const all = await getProjectStudies();
  return all.find((s) => s.slug === slug);
}

async function loadStudies(): Promise<ProjectStudy[]> {
  const files = (await readdir(studiesDir)).filter((f) => f.endsWith(".mdx"));

  const studies = await Promise.all(
    files.map(async (file): Promise<ProjectStudy> => {
      const raw = await readFile(path.join(studiesDir, file), "utf8");
      const { data, content } = matter(raw);
      const slug = file.replace(/\.mdx$/, "");

      const words = content.trim().split(/\s+/).length;
      const minutes = Math.max(1, Math.round(words / 200));

      return {
        slug,
        title: String(data.title ?? slug),
        description: String(data.description ?? ""),
        date: data.date
          ? new Date(data.date as string).toISOString().slice(0, 10)
          : "",
        updated: data.updated
          ? new Date(data.updated as string).toISOString().slice(0, 10)
          : undefined,
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        inLanguage: String(data.inLanguage ?? "id"),
        readingTime: `${minutes} min read`,
      };
    })
  );

  return studies.sort((a, b) => b.date.localeCompare(a.date));
}
