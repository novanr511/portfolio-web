import { getSortedArticles } from "@/lib/articles";
import { site } from "@/lib/site";

/**
 * RSS 2.0 feed — helps syndication and makes the site legible
 * for feed readers and AI answer engines alike.
 */
export async function GET() {
  const sortedArticles = await getSortedArticles();
  const items = sortedArticles
    .map(
      (a) => `    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${site.url}/articles/${a.slug}</link>
      <guid isPermaLink="true">${site.url}/articles/${a.slug}</guid>
      <description>${escapeXml(a.description)}</description>
      <pubDate>${new Date(a.date).toUTCString()}</pubDate>
      ${a.tags.map((t) => `<category>${escapeXml(t)}</category>`).join("\n      ")}
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(site.name)} — Articles</title>
    <link>${site.url}</link>
    <description>${escapeXml(site.description)}</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
