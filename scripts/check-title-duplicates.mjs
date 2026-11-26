#!/usr/bin/env node
/**
 * Duplicate-title guard for the article title bank.
 *
 * Reads docs/article-title-registry.json (the single source of truth for
 * reserved titles) and scans src/content/articles for actual files. It fails on:
 *
 *   - two files with the same slug or title
 *   - a title in the registry that is already a file but mislabelled as planned
 *   - exact duplicate titles/slugs anywhere in the registry
 *   - near-duplicate titles (Jaccard >= 0.5) or slugs (Jaccard >= 0.72)
 *
 * Usage:
 *   node scripts/check-title-duplicates.mjs
 */

import { readFile, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const registryPath = join(root, "docs", "article-title-registry.json");
const articlesDir = join(root, "src", "content", "articles");

const registry = JSON.parse(await readFile(registryPath, "utf8"));
const files = (await readdir(articlesDir)).filter((f) => f.endsWith(".mdx")).sort();

const readTitle = async (file) => {
  const source = await readFile(join(articlesDir, file), "utf8");
  const match = source.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return "";
  const title = match[1].match(/^title:\s*["']?(.*?)["']?\s*$/m);
  return title ? title[1].trim() : "";
};

const fileTitles = new Map();
for (const file of files) fileTitles.set(file.replace(/\.mdx$/, ""), await readTitle(file));

const entries = [
  ...registry.existing.map((e) => ({ ...e, source: "existing" })),
  ...registry.planned.map((e) => ({ ...e, source: "planned" })),
  ...registry.high_traffic_backlog.map((e) => ({ ...e, source: "backlog" })),
  ...(registry.title_bank_2 ?? []).map((e) => ({ ...e, source: "title_bank_2" })),
];

const problems = [];

// 1. Files on disk must be unique.
const slugCounts = new Map();
const titleCounts = new Map();
for (const [slug, title] of fileTitles) {
  slugCounts.set(slug, (slugCounts.get(slug) ?? 0) + 1);
  const key = title.toLowerCase();
  titleCounts.set(key, (titleCounts.get(key) ?? 0) + 1);
}
for (const [slug, n] of slugCounts) if (n > 1) problems.push(`duplicate file slug: ${slug}`);
for (const [title, n] of titleCounts) if (n > 1 && title) problems.push(`duplicate file title: ${title}`);

// 2. Planned/backlog entries must not collide with an already-written article.
// Reserved titles may legitimately have a placeholder file on disk; the real
// collision is against an entry in the "existing" section of the registry.
const existingSlugs = new Set(registry.existing.map((e) => e.slug));
const existingTitles = new Set(registry.existing.map((e) => e.title.toLowerCase()));
for (const e of entries) {
  if (e.source === "existing") continue;
  if (existingSlugs.has(e.slug)) problems.push(`${e.id} collides with an existing article slug: ${e.slug}`);
  if (existingTitles.has(e.title.toLowerCase())) problems.push(`${e.id} collides with an existing article title: ${e.title}`);
}

// 3. Exact duplicates inside the registry.
const regSlugs = new Map();
const regTitles = new Map();
for (const e of entries) {
  regSlugs.set(e.slug, (regSlugs.get(e.slug) ?? 0) + 1);
  regTitles.set(e.title.toLowerCase(), (regTitles.get(e.title.toLowerCase()) ?? 0) + 1);
}
for (const [slug, n] of regSlugs) if (n > 1) problems.push(`duplicate registry slug: ${slug}`);
for (const [title, n] of regTitles) if (n > 1) problems.push(`duplicate registry title: ${title}`);

// 4. Near-duplicate titles and slugs (only report pairs involving a new entry).
// Ignore stopwords and generic title scaffolding so that "What Is X" and
// "What Is Y" are not treated as near-duplicates just for sharing "what is".
const STOPWORDS = new Set(
  ("a an and are as at be by for from how in is it its of on or that the their this to was what when where which who why with you your " +
   "guide explained examples example checklist template framework practices mistakes pitfalls metrics decisions decision comparison compared vs " +
   "beginners practice scale small teams into about").split(" "),
);
const tokens = (text) =>
  new Set((text.toLowerCase().match(/[a-z0-9]+/g) ?? []).filter((word) => word.length > 2 && !STOPWORDS.has(word)));
const jaccard = (a, b) => {
  const A = tokens(a), B = tokens(b);
  if (!A.size && !B.size) return 0;
  let hits = 0;
  for (const t of A) if (B.has(t)) hits += 1;
  return hits / (A.size + B.size - hits);
};

for (const e of entries) {
  if (e.source === "existing") continue;
  let worstTitle = { score: 0, other: "" };
  let worstSlug = { score: 0, other: "" };
  for (const o of entries) {
    if (o === e) continue;
    const ts = jaccard(e.title, o.title);
    if (ts > worstTitle.score) worstTitle = { score: ts, other: o.title };
    const ss = jaccard(e.slug, o.slug);
    if (ss > worstSlug.score) worstSlug = { score: ss, other: o.slug };
  }
  if (worstTitle.score >= 0.5) {
    problems.push(`${e.id} near-duplicate title (${worstTitle.score.toFixed(2)}): "${e.title}" <-> "${worstTitle.other}"`);
  }
  if (worstSlug.score >= 0.72) {
    problems.push(`${e.id} near-duplicate slug (${worstSlug.score.toFixed(2)}): ${e.slug} <-> ${worstSlug.other}`);
  }
}

console.log(`files: ${files.length} | registry: ${entries.length} (${registry.existing.length} existing, ${registry.planned.length} planned, ${registry.high_traffic_backlog.length} high-traffic backlog)`);
if (problems.length === 0) {
  console.log("no duplicate titles or slugs.");
  process.exit(0);
}
console.error(`\n${problems.length} duplicate problem(s):`);
for (const p of problems) console.error(`  - ${p}`);
process.exit(1);
