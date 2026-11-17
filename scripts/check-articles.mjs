#!/usr/bin/env node
/**
 * Article quality gate.
 *
 * Enforces the editorial standard in docs/publication-wide-editorial-standard.md
 * mechanically, so it cannot drift again:
 *
 *   - frontmatter is valid and the description fits the CMS limit
 *   - the article ends with a reading-list section that contains real links
 *   - the article links to other articles, and those links resolve
 *   - the article is long enough to answer its question
 *   - no trailing whitespace
 *
 * Legacy articles are allowed to fail specific checks. That debt is recorded in
 * scripts/article-quality-baseline.json. The gate fails when a file breaks a
 * check it is not allowed to break, so quality can only improve.
 *
 * Usage:
 *   node scripts/check-articles.mjs            # gate (fails on regressions)
 *   node scripts/check-articles.mjs --report   # full report, always exits 0
 *   node scripts/check-articles.mjs --update-baseline
 */

import { readFile, readdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const articlesDir = join(root, "src", "content", "articles");
const baselinePath = join(root, "scripts", "article-quality-baseline.json");

const reportOnly = process.argv.includes("--report");
const updateBaseline = process.argv.includes("--update-baseline");

const MIN_WORDS = 700;
const MAX_DESCRIPTION = 180;
const MIN_SOURCES = 2;
const MIN_INTERNAL_LINKS = 1;

const readFrontmatter = (source) => {
  const match = source.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) return { raw: null, body: source };
  return { raw: match[1], body: source.slice(match[0].length) };
};

const field = (raw, name) => {
  const match = raw.match(new RegExp(`^${name}:\\s*(.*)$`, "m"));
  return match ? match[1].trim().replace(/^["']|["']$/g, "") : null;
};

const files = (await readdir(articlesDir)).filter((file) => file.endsWith(".mdx")).sort();
const slugs = new Set(files.map((file) => file.replace(/\.mdx$/, "")));

const violations = new Map();

const add = (file, check) => {
  if (!violations.has(file)) violations.set(file, new Set());
  violations.get(file).add(check);
};

const wordCount = (body) =>
  body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/^\s*[|>-].*$/gm, " ")
    .split(/\s+/)
    .filter(Boolean).length;

for (const file of files) {
  const source = await readFile(join(articlesDir, file), "utf8");
  const { raw, body } = readFrontmatter(source);

  if (raw === null) {
    add(file, "missing-frontmatter");
    continue;
  }

  const title = field(raw, "title");
  const description = field(raw, "description");
  const date = field(raw, "date");
  const tags = raw.match(/^tags:\s*\n((?:\s*-\s*.+\n)+)/m);

  if (!title) add(file, "missing-title");
  if (!description) add(file, "missing-description");
  else if (description.length > MAX_DESCRIPTION) add(file, "description-too-long");
  if (!date || Number.isNaN(Date.parse(date))) add(file, "invalid-date");
  if (!tags) add(file, "missing-tags");

  // Reserved titles are placeholders, not publishable articles. They keep
  // valid frontmatter but are not scored on reading list, links or length
  // until the content is actually written (remove the marker to opt in).
  const isPlanned = body.includes("PLANNED TITLE");
  if (isPlanned) continue;

  // Reading-list section with real links.
  const reading = body.match(/^##\s+(Further Reading|References\s*&\s*Further Reading)\s*$/m);
  if (!reading) {
    add(file, "no-reading-list");
  } else {
    const after = body.slice(reading.index + reading[0].length);
    const nextHeading = after.search(/^##\s+/m);
    const section = nextHeading === -1 ? after : after.slice(0, nextHeading);
    const links = section.match(/https?:\/\/[^\s)]+/g) ?? [];
    if (links.length < MIN_SOURCES) add(file, "too-few-sources");
  }

  // Internal links must resolve.
  const internal = [...body.matchAll(/\]\(\/articles\/([^)]+)\)/g)].map((match) => match[1]);
  if (internal.length < MIN_INTERNAL_LINKS) add(file, "too-few-internal-links");
  for (const slug of internal) {
    if (!slugs.has(slug)) add(file, `broken-internal-link:${slug}`);
  }

  if (wordCount(body) < MIN_WORDS) add(file, "too-short");

  if (/[ \t]+$/m.test(source)) add(file, "trailing-whitespace");
}

const baseline = JSON.parse(await readFile(baselinePath, "utf8")).files ?? {};

const regressions = [];
const current = {};

for (const file of files) {
  const found = [...(violations.get(file) ?? [])].sort();
  current[file] = found;
  const allowed = new Set(baseline[file] ?? []);
  const newOnes = found.filter((check) => !allowed.has(check));
  if (newOnes.length > 0) regressions.push({ file, checks: newOnes });
}

const totalViolations = Object.values(current).reduce((sum, list) => sum + list.length, 0);
const cleanFiles = Object.values(current).filter((list) => list.length === 0).length;

console.log(`articles: ${files.length}`);
console.log(`fully clean: ${cleanFiles}`);
console.log(`open violations: ${totalViolations} across ${Object.values(current).filter((l) => l.length).length} files`);
console.log(`baselined (legacy debt allowed): ${Object.keys(baseline).length} files`);

if (reportOnly) {
  console.log("\nremaining violations by check:");
  const tally = new Map();
  for (const list of Object.values(current)) {
    for (const check of list) tally.set(check, (tally.get(check) ?? 0) + 1);
  }
  for (const [check, count] of [...tally].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${String(count).padStart(4)}  ${check}`);
  }
  process.exit(0);
}

if (updateBaseline) {
  await writeFile(baselinePath, `${JSON.stringify({ note: "Articles allowed to fail specific checks. Remove an entry to require that check.", files: current }, null, 2)}\n`);
  console.log("\nbaseline updated.");
  process.exit(0);
}

if (regressions.length > 0) {
  console.error(`\n${regressions.length} article(s) regressed:\n`);
  for (const regression of regressions) {
    console.error(`  ${regression.file}: ${regression.checks.join(", ")}`);
  }
  console.error("\nFix the article, or extend scripts/article-quality-baseline.json if the debt is intentional.");
  process.exit(1);
}

console.log("\nno regressions.");
