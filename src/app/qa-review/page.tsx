import type { Metadata } from "next";
import Link from "next/link";
import { readFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * Internal review page for the QA fixes in commit 398402c. It is intentionally
 * absent from the header, footer, sitemap and llms inventories: this is a
 * working artefact, not published content. Reason (R-24, R-05).
 */
export const metadata: Metadata = {
  title: "QA review: fixed articles",
  robots: { index: false, follow: false },
};

const factual = [
  "the-future-of-work-skills-that-will-matter-in-the-next-decade",
  "pricing-strategy-how-to-charge-what-your-product-is-worth",
  "what-ecommerce-share-of-retail-sales-measures",
  "how-to-evaluate-oil-markets",
];

const emphasis = [
  "ai-fallback-design-explained",
  "ai-for-cybersecurity-metrics-that-matter",
  "ai-for-healthcare-operations-pitfalls",
  "ai-for-supply-chain-forecasting-exceptions-documentation",
  "ai-supply-chain-forecasting-trade-offs",
  "bear-markets-for-small-teams",
  "brand-awareness-metrics-that-are-actually-useful",
  "category-design-create-a-market",
  "content-operations-calendars-roles-and-review-loops",
  "getting-started-with-estate-planning",
  "growth-loops-pitfalls",
  "how-retailers-use-data-to-optimize-product-placement",
  "how-to-get-more-customer-reviews",
  "how-to-get-product-management-right",
  "influence-in-practice",
  "influencer-marketing-measurement",
  "inventory-management-metrics-that-matter",
  "jobs-to-be-done-as-a-product-and-marketing-tool",
  "last-mile-delivery-explained",
  "marketing-dashboards-without-the-hype",
  "marketplaces-in-practice",
  "prompt-injection-llm-applications-threat-model",
  "real-estate-markets-reits-property-cycles-and-investment-analysis",
  "retail-media-networks",
  "retail-technology-best-practices",
  "returns-and-reverse-logistics",
  "the-future-of-work-skills-that-will-matter-in-the-next-decade",
  "tool-calling-examples",
  "trade-promotions-in-practice",
  "waitlist-and-launch-marketing-building-demand-before-product",
  "what-ai-search-actually-measures",
];

const analytics = [
  "/data-analytics/sales-performance",
  "/data-analytics/hr-attrition",
  "/data-analytics/msft-finance-model",
  "/data-analytics/olist-delivery-risk",
];

function articleTitle(slug: string) {
  try {
    const raw = readFileSync(
      path.join(process.cwd(), "src", "content", "articles", `${slug}.mdx`),
      "utf8"
    );
    return String(matter(raw).data.title ?? slug);
  } catch {
    return slug;
  }
}

function ReviewList({ slugs }: { slugs: string[] }) {
  return (
    <ol className="mt-6 grid gap-2">
      {slugs.map((slug, i) => (
        <li key={`${slug}-${i}`}>
          <Link
            href={`/articles/${slug}`}
            className="inline-flex min-h-11 items-center rounded-lg px-3 py-2 text-[14px] text-foreground transition-colors hover:bg-surface hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <span className="mr-3 text-[12px] text-muted">{String(i + 1).padStart(2, "0")}</span>
            {articleTitle(slug)}
          </Link>
        </li>
      ))}
    </ol>
  );
}

export default function QaReviewPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 pb-24 pt-16 sm:pt-24">
      <p className="page-eyebrow">Internal review</p>
      <h1 className="page-title mt-5">Articles touched by the QA fixes</h1>
      <p className="page-subtitle mt-4 max-w-2xl">
        Every link below resolves to the local article. Four factual corrections
        and thirty-one emphasis fixes, with one article in both groups. This page
        is not in the navigation, sitemap, or llms inventories.
      </p>

      <section className="mt-12">
        <h2 className="text-[12px] font-semibold uppercase tracking-[0.18em] text-accent">
          Factual and source fixes, 4 articles
        </h2>
        <ReviewList slugs={factual} />
      </section>

      <section className="mt-12">
        <h2 className="text-[12px] font-semibold uppercase tracking-[0.18em] text-accent">
          Em dash fixes inside emphasis components, 31 articles
        </h2>
        <ReviewList slugs={emphasis} />
      </section>

      <section className="mt-12">
        <h2 className="text-[12px] font-semibold uppercase tracking-[0.18em] text-accent">
          Data analytics pages, 4 routes
        </h2>
        <ol className="mt-6 grid gap-2">
          {analytics.map((href) => (
            <li key={href}>
              <Link
                href={href}
                className="inline-flex min-h-11 items-center rounded-lg px-3 py-2 text-[14px] text-foreground transition-colors hover:bg-surface hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {href}
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
