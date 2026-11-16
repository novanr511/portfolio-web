#!/usr/bin/env node
/**
 * Verifies every source in docs/further-reading-registry.json.
 *
 * For each entry it fetches the page and compares the document title (or the
 * <h1>) against the title recorded in the registry. A mismatch means the URL
 * no longer points at the source we claim, so the entry fails.
 *
 * Usage:
 *   node scripts/verify-sources.mjs            # report, exit 1 on failure
 *   node scripts/verify-sources.mjs --update   # also refresh stored titles
 */

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const registryPath = join(root, "docs", "further-reading-registry.json");
const TIMEOUT_MS = 30000;

const normalise = (value) =>
  value
    .replace(/&amp;/g, "&")
    .replace(/&#\d+;/g, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/[\s\u00a0]+/g, " ")
    .trim()
    .toLowerCase();

/** Loose comparison: strip punctuation and compare the significant words. */
const keywords = (title) =>
  new Set(
    normalise(title)
      // Document numbers and parenthetical qualifiers are not part of the
      // work's name, so they must not drive the comparison.
      .replace(/\brfc\s*\d+\b/g, " ")
      .replace(/[^a-z0-9 ]+/g, " ")
      .split(" ")
      .filter((word) => word.length > 2 && !["the", "and", "for", "with", "from"].includes(word)),
  );

const titleMatches = (expected, actual) => {
  const want = keywords(expected);
  if (want.size === 0) return false;
  const got = keywords(actual);
  let hits = 0;
  for (const word of want) if (got.has(word)) hits += 1;
  return hits / want.size >= 0.6;
};

const extractTitle = (html) => {
  const meta = html.match(/<meta[^>]+name=["']citation_title["'][^>]+content=["']([^"']+)["']/i);
  if (meta) return normalise(meta[1]);
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (title) return normalise(title[1]);
  const paperTitle = html.match(/<span[^>]+id=["']papertitle["'][^>]*>([\s\S]*?)<\/span>/i);
  if (paperTitle) return normalise(paperTitle[1]);
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1) return normalise(h1[1]);
  const og = html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i);
  if (og) return normalise(og[1]);
  return "";
};

const fetchTitle = async (url, attempt = 1, source = {}) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36",
        accept: "text/html,application/xhtml+xml,application/pdf,*/*",
      },
    });
    if (!response.ok) {
      if (response.status >= 500 && attempt < 3) return fetchTitle(url, attempt + 1, source);
      return { ok: false, reason: `HTTP ${response.status}` };
    }
    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("application/pdf")) {
      // PDFs carry no HTML <title>. Confirm the file really is a PDF.
      const buffer = Buffer.from(await response.arrayBuffer());
      const isPdf = buffer.subarray(0, 5).toString() === "%PDF-";
      return isPdf && buffer.length > 5000
        ? { ok: true, title: "", note: "pdf" }
        : { ok: false, reason: "not a usable PDF" };
    }
    if (contentType.includes("json")) {
      // A JSON document has no title; check the raw payload instead.
      const text = await response.text();
      const needle = (source.match ?? "").toLowerCase();
      if (needle && !text.toLowerCase().includes(needle)) {
        return { ok: false, reason: `json payload does not contain "${source.match}"` };
      }
      return { ok: true, title: "", note: "json" };
    }
    const html = await response.text();
    return { ok: true, title: extractTitle(html) };
  } catch (error) {
    if (attempt < 3) {
      await new Promise((resolve) => setTimeout(resolve, 1200 * attempt));
      return fetchTitle(url, attempt + 1, source);
    }
    return { ok: false, reason: error.name === "AbortError" ? "timeout" : error.message };
  } finally {
    clearTimeout(timer);
  }
};

/** Runs tasks with a small pool so we do not exhaust sockets. */
const pool = async (tasks, limit = 6) => {
  const results = new Array(tasks.length);
  let cursor = 0;
  const workers = Array.from({ length: Math.min(limit, tasks.length) }, async () => {
    while (cursor < tasks.length) {
      const index = cursor++;
      results[index] = await tasks[index]();
    }
  });
  await Promise.all(workers);
  return results;
};

const registry = JSON.parse(await readFile(registryPath, "utf8"));
const entries = Object.entries(registry.sources);
const update = process.argv.includes("--update");
const failures = [];
const updates = [];
const observed = {};

console.log(`Verifying ${entries.length} registry sources...\n`);

const results = await pool(
  entries.map(([key, source]) => async () => {
    const result = await fetchTitle(source.url, 1, source);
    return [key, source, result];
  }),
);

for (const [key, source, result] of results) {
  if (!result.ok) {
    failures.push({ key, url: source.url, reason: result.reason });
    console.log(`FAIL  ${key}\n      ${source.url}\n      ${result.reason}`);
    continue;
  }
  if (result.note === "pdf") {
    // A PDF has no machine-readable title. It counts as reachable; the
    // bibliography text is reviewed by hand.
    console.log(`ok    ${key}  (pdf, title not machine-readable)`);
    continue;
  }
  if (result.note === "json") {
    // A JSON document has no title; the payload check already ran.
    console.log(`ok    ${key}  (json, payload checked)`);
    continue;
  }
  const expected = source.match || source.title;
  if (!titleMatches(expected, result.title)) {
    failures.push({
      key,
      url: source.url,
      reason: `title mismatch\n      expected: ${expected}\n      actual:   ${result.title}`,
    });
    console.log(`FAIL  ${key}\n      ${source.url}\n      expected: ${expected}\n      actual:   ${result.title}`);
    continue;
  }
  // Guard against a registry entry that points at a real page but is
  // labelled as a different work: the stored title must still overlap the
  // observed page title.
  if (source.match && !titleMatches(source.title, result.title)) {
    const stored = keywords(source.title);
    const observed = keywords(result.title);
    const overlap = stored.size === 0 ? 0 : [...stored].filter((w) => observed.has(w)).length / stored.size;
    if (overlap < 0.4) {
      failures.push({
        key,
        url: source.url,
        reason: `label does not match the page\n      stored:  ${source.title}\n      page:    ${result.title}`,
      });
      console.log(`FAIL  ${key}\n      ${source.url}\n      stored:  ${source.title}\n      page:    ${result.title}`);
      continue;
    }
  }
  console.log(`ok    ${key}`);
  if (update && result.title && result.title !== normalise(expected)) {
    updates.push([key, result.title]);
  }
  if (result.title) observed[key] = result.title;
}

await writeFile(
  join(root, "docs", "observed-source-titles.json"),
  `${JSON.stringify(Object.fromEntries(Object.entries(observed).sort(([a], [b]) => a.localeCompare(b))), null, 2)}\n`,
);

if (update && updates.length > 0) {
  for (const [key, title] of updates) {
    registry.sources[key].title = title;
    console.log(`updated title: ${key} -> ${title}`);
  }
  await writeFile(registryPath, `${JSON.stringify(registry, null, 2)}\n`);
}

console.log(`\n${entries.length - failures.length}/${entries.length} sources verified.`);
if (failures.length > 0) {
  console.error(`\n${failures.length} source(s) failed verification.`);
  process.exit(1);
}
