#!/usr/bin/env node
/**
 * Looks up the correct arXiv identifier for a paper title using the arXiv API.
 *
 * Used to repair registry entries whose arXiv id pointed at a different
 * paper. Prints the proposed id and the title the API returned so a human can
 * confirm the match before it is written back.
 *
 * Usage: node scripts/lookup-arxiv.mjs "Paper title here"
 */

const query = process.argv.slice(2).join(" ").trim();
if (!query) {
  console.error("usage: node scripts/lookup-arxiv.mjs \"paper title\"");
  process.exit(1);
}

const url = `https://export.arxiv.org/api/query?search_query=ti:%22${encodeURIComponent(
  query,
)}%22&max_results=5`;

const response = await fetch(url, { headers: { "user-agent": "novandri-arxiv-lookup/1.0" } });
if (!response.ok) {
  console.error(`arXiv API returned HTTP ${response.status}`);
  process.exit(1);
}

const xml = await response.text();
const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map((match) => {
  const block = match[1];
  const id = block.match(/<id>([^<]+)<\/id>/)?.[1] ?? "";
  const title = block.match(/<title>([\s\S]*?)<\/title>/)?.[1]?.replace(/\s+/g, " ").trim() ?? "";
  const published = block.match(/<published>([^<]+)<\/published>/)?.[1] ?? "";
  return { id, title, published };
});

if (entries.length === 0) {
  console.log(`no arXiv results for: ${query}`);
  process.exit(0);
}

console.log(`query: ${query}\n`);
for (const entry of entries) {
  const year = entry.published.slice(0, 4);
  console.log(`  ${entry.id}\n    ${entry.title}  (${year})\n`);
}
