import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * Deliberately permissive: search crawlers AND AI answer-engine crawlers
 * (GEO). New AI agents get crawled by the generic rule automatically.
 */
export default function robots(): MetadataRoute.Robots {
  const aiUserAgents = [
    "GPTBot", // OpenAI training
    "OAI-SearchBot", // ChatGPT Search
    "ChatGPT-User", // user-triggered ChatGPT browsing
    "ClaudeBot", // Anthropic training
    "Claude-User", // user-triggered Claude browsing
    "Claude-SearchBot", // Claude search
    "PerplexityBot", // Perplexity answer engine
    "Google-Extended", // Gemini grounding
    "Applebot-Extended", // Apple Intelligence
    "CCBot", // Common Crawl (feeds many engines)
  ];

  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: aiUserAgents, allow: "/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
