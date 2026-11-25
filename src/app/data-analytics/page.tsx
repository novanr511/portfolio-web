import type { Metadata } from "next";
import Link from "next/link";
import { ViewTransition } from "react";
import { Reveal } from "@/components/reveal";
import { analyticsWork } from "@/lib/data-analytics";
import SalesDemo from "@/content/data-analytics/sales-performance.mdx";
import HrDemo from "@/content/data-analytics/hr-attrition.mdx";
import FinanceDemo from "@/content/data-analytics/finance-risk-modeling.mdx";

export const metadata: Metadata = {
  title: "Data Analytics",
  description:
    "Data analytics work by Novandri R.: verified case studies and public-data demos covering sales performance, HR attrition, finance risk, time series, and retrieval systems.",
  alternates: { canonical: "/data-analytics" },
  openGraph: {
    title: "Data Analytics — Novandri R.",
    description:
      "Verified case studies and reproducible public-data demos in analytics and applied AI.",
  },
};

const demos = [
  { slug: "sales-performance", name: "Sales Performance Analysis", Content: SalesDemo },
  { slug: "hr-attrition", name: "HR Attrition Analysis", Content: HrDemo },
  { slug: "finance-risk-modeling", name: "Finance Risk Modeling", Content: FinanceDemo },
] as const;

export default function DataAnalyticsPage() {
  const caseStudies = analyticsWork.filter((w) => w.kind === "Case study");

  return (
    <ViewTransition
      enter={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      exit={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      default="none"
    >
      <div className="mx-auto max-w-5xl px-6 pb-24 pt-16 sm:pt-24">
        <Reveal>
          <p className="page-eyebrow">Data analytics</p>
          <h1 className="page-title mt-5">From data to a decision you can defend.</h1>
          <p className="page-subtitle mt-5 max-w-2xl">
            Two kinds of work live here. Case studies from shipped systems, and
            demos computed from public datasets where every number is
            reproducible. No figure on this page is presented without its
            source or its limitation.
          </p>
        </Reveal>

        <section className="page-band mt-12 -mx-6 px-6 py-11" aria-label="Selected analytics case studies">
          <Reveal>
            <p className="page-eyebrow">Selected work</p>
            <h2 className="page-title mt-3 text-[28px]">Case studies</h2>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {caseStudies.map((work, i) => (
              <Reveal key={work.slug} delay={i * 80}>
                <Link
                  href={work.href}
                  transitionTypes={["nav-forward"]}
                  className="editorial-card group flex h-full flex-col rounded-2xl border border-border bg-background/70 p-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  <p className="page-eyebrow">{work.kind}</p>
                  <h3 className="mt-3 text-[18px] font-semibold tracking-tight text-foreground group-hover:text-accent">
                    {work.name}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-muted">
                    {work.summary}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
                    {work.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-surface px-2.5 py-0.5 text-[11px] font-medium text-accent"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="mt-5 text-[13px] font-medium text-accent">
                    Read the case study
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mt-20" aria-label="Public-data demos">
          <Reveal>
            <p className="page-eyebrow">Reproducible demos</p>
            <h2 className="page-title mt-3 text-[28px] sm:text-[34px]">
              Analytics on public data
            </h2>
            <p className="page-subtitle mt-4 max-w-2xl">
              Each demo below names its dataset, shows the calculation, and
              states what the data cannot support. The numbers come from a
              script in the repository, not from memory.
            </p>
            <nav className="mt-6 flex flex-wrap gap-2.5" aria-label="Demo sections">
              {demos.map((demo) => (
                <a
                  key={demo.slug}
                  href={`#${demo.slug}`}
                  className="inline-flex min-h-11 items-center rounded-full border border-border px-4 text-[13px] font-medium text-foreground transition-colors hover:border-accent/40 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  {demo.name}
                </a>
              ))}
            </nav>
          </Reveal>

          {demos.map((demo) => {
            const meta = analyticsWork.find((w) => w.slug === demo.slug);
            return (
              <section
                key={demo.slug}
                id={demo.slug}
                className="mt-16 scroll-mt-24 border-t border-border pt-12"
                aria-labelledby={`${demo.slug}-heading`}
              >
                <Reveal>
                  <p className="page-eyebrow">Public-data demo</p>
                  <h3 id={`${demo.slug}-heading`} className="page-title mt-3 text-[26px] sm:text-[32px]">
                    {demo.name}
                  </h3>
                  {meta?.dataset && (
                    <p className="mt-3 text-[13.5px] text-muted">
                      Dataset: {meta.dataset}. {" "}
                      {meta.sourceUrl && (
                        <a
                          href={meta.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-accent hover:underline"
                        >
                          View the source file
                        </a>
                      )}
                    </p>
                  )}
                </Reveal>
                <div className="prose prose-lg prose-article mt-8 max-w-none">
                  <demo.Content />
                </div>
              </section>
            );
          })}
        </section>

        <Reveal>
          <div className="editorial-card mt-20 rounded-2xl border border-border bg-surface px-7 py-8">
            <h2 className="page-title text-[24px]">Want the full method?</h2>
            <p className="page-subtitle mt-2 max-w-xl text-[14px]">
              The chart and metric script is in this repository, so every demo
              can be re-run against the same source files.
            </p>
            <a
              href="https://github.com/novanr511/portfolio-web/blob/main/scripts/build_data_analytics_demos.py"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-11 items-center rounded-full bg-accent px-6 py-3 text-[14px] font-medium text-accent-contrast transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              Read the analysis script
            </a>
          </div>
        </Reveal>
      </div>
    </ViewTransition>
  );
}
