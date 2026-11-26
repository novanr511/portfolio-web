import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * Separate answer-surface crawlers from model-training crawlers.
 *
 * OAI-SearchBot, ChatGPT-User, Claude-SearchBot and PerplexityBot power
 * answer engines that can cite a page, so they are allowed.
 *
 * GPTBot, ClaudeBot, CCBot, Google-Extended and Applebot-Extended are
 * training/data-collection crawlers. Allowing them gives no search or
 * citation benefit, so they are blocked.
 */
export default function robots(): MetadataRoute.Robots {
  const trainingCrawlers = [
    "GPTBot",
    "ClaudeBot",
    "CCBot",
    "Google-Extended",
    "Applebot-Extended",
  ];

  const answerCrawlers = [
    "OAI-SearchBot",
    "ChatGPT-User",
    "Claude-SearchBot",
    "PerplexityBot",
  ];

  return {
    rules: [
      { userAgent: trainingCrawlers, disallow: "/" },
      { userAgent: answerCrawlers, allow: "/", disallow: "/keystatic" },
      { userAgent: "*", allow: "/", disallow: "/keystatic" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
