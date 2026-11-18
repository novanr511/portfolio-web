#!/usr/bin/env node
/**
 * Writes the "Further Reading" section for every article listed in
 * docs/further-reading-registry.json.
 *
 * Articles that currently end with a placeholder References section have that
 * section replaced. Articles with no References section get one appended.
 *
 * Every source in the registry is verified by scripts/verify-sources.mjs, so
 * the links written here always point at a real, reachable resource.
 *
 * Usage:
 *   node scripts/apply-further-reading.mjs           # write changes
 *   node scripts/apply-further-reading.mjs --check   # report, no writes
 */

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const registryPath = join(root, "docs", "further-reading-registry.json");
const articlesDir = join(root, "src", "content", "articles");
const checkOnly = process.argv.includes("--check");

const registry = JSON.parse(await readFile(registryPath, "utf8"));
const { sources, articles } = registry;

const REFERENCES_HEADING = /^##\s+(Further Reading|References\s*&\s*Further Reading)\s*$/gm;
const ANY_FURTHER_READING = /^##\s+(Further Reading|References\s*&\s*Further Reading)\s*$/m;

const formatEntry = (source) => {
  const author = source.author ? `${source.author}, ` : "";
  const year = source.year ? `${source.year}. ` : "";
  return `- ${author}${year}[${source.title}](${source.url}) — ${source.note}`;
};

const buildSection = (keys) =>
  `## References & Further Reading\n\n${keys.map((key) => formatEntry(sources[key])).join("\n")}\n`;

/**
 * Removes every reading-list section from the body and returns the remaining
 * content. The section is rewritten from the registry, so an article never
 * ends up with two of them.
 */
const stripReadingSections = (body) => {
  const matches = [...body.matchAll(REFERENCES_HEADING)];
  if (matches.length === 0) return body;
  let result = "";
  let cursor = 0;
  for (const match of matches) {
    result += body.slice(cursor, match.index);
    const after = body.slice(match.index + match[0].length);
    const nextHeading = after.search(/^##\s+/m);
    cursor = match.index + match[0].length + (nextHeading === -1 ? after.length : nextHeading);
  }
  result += body.slice(cursor);
  return result.replace(/\n{3,}/g, "\n\n").replace(/\s+$/, "");
};

let changed = 0;
let skipped = 0;
const problems = [];

for (const [slug, keys] of Object.entries(articles)) {
  const file = join(articlesDir, `${slug}.mdx`);
  let content;
  try {
    content = await readFile(file, "utf8");
  } catch {
    problems.push(`${slug}: file not found`);
    continue;
  }

  const unknown = keys.filter((key) => !sources[key]);
  if (unknown.length > 0) {
    problems.push(`${slug}: unknown source keys ${unknown.join(", ")}`);
    continue;
  }

  const section = buildSection(keys);
  const stripped = stripReadingSections(content);
  const next = `${stripped}\n\n${section}`;

  if (next === content) {
    skipped += 1;
    continue;
  }

  if (!ANY_FURTHER_READING.test(next)) {
    problems.push(`${slug}: no Further Reading heading after write`);
  }

  if (!checkOnly) {
    await writeFile(file, next);
  }
  changed += 1;
}

console.log(`${checkOnly ? "would update" : "updated"}: ${changed} articles`);
console.log(`already current: ${skipped}`);
if (problems.length > 0) {
  console.error("\nproblems:");
  for (const problem of problems) console.error(`  ${problem}`);
  process.exit(1);
}
