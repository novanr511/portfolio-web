import type { Metadata } from "next";
import Link from "next/link";
import { ViewTransition } from "react";
import { Reveal } from "@/components/reveal";
import { analyticsWork } from "@/lib/data-analytics";

export const metadata: Metadata = {
  title: "Data Analytics",
  description:
    "Data analytics work by Novandri R.: verified case studies and reproducible public-data demos covering sales performance, HR attrition, finance risk, time series, and retrieval systems.",
  alternates: { canonical: "/data-analytics" },
  openGraph: {
    title: "Data Analytics — Novandri R.",
    description:
      "Documented projects and reproducible public-data demos in analytics and applied AI.",
    url: "/data-analytics",
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Analytics — Novandri R.",
    description:
      "Documented projects and reproducible public-data demos in analytics and applied AI.",
  },
};

function WorkCard({ work, index }: { work: (typeof analyticsWork)[number]; index: number }) {
  return (
    <Reveal delay={index * 80}>
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
        {work.dataset && (
          <p className="mt-3 text-[12.5px] leading-relaxed text-muted">
            {work.dataset}
          </p>
        )}
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
          {work.kind === "Case study" ? "Read the case study" : "Read the analysis"}
        </span>
      </Link>
    </Reveal>
  );
}

export default function DataAnalyticsPage() {
  const caseStudies = analyticsWork.filter((w) => w.kind === "Case study");
  const demos = analyticsWork.filter((w) => w.kind === "Public-data demo");

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
            Documented projects and demos computed from public datasets. Each
            card links to a write-up with its sources and limitations.
          </p>
        </Reveal>

        <section className="page-band mt-12 -mx-6 px-6 py-11" aria-label="Analytics case studies">
          <Reveal>
            <p className="page-eyebrow">Shipped work</p>
            <h2 className="page-title mt-3 text-[28px]">Case studies</h2>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {caseStudies.map((work, i) => (
              <WorkCard key={work.slug} work={work} index={i} />
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
              Each subject has its own page with methodology, computed figures,
              charts, and what the data cannot support.
            </p>
          </Reveal>
          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {demos.map((work, i) => (
              <WorkCard key={work.slug} work={work} index={i} />
            ))}
          </div>
        </section>

        <Reveal>
          <div className="editorial-card mt-20 rounded-2xl border border-border bg-surface px-7 py-8">
            <h2 className="page-title text-[24px]">Want the full method?</h2>
            <p className="page-subtitle mt-2 max-w-xl text-[14px]">
              The chart and metric scripts live in this repository, so the
              demos can be re-run against the same public source files.
            </p>
            <a
              href="https://github.com/novanr511/portfolio-web/tree/main/scripts"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-11 items-center rounded-full bg-accent px-6 py-3 text-[14px] font-medium text-accent-contrast transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              Browse the analysis scripts
            </a>
          </div>
        </Reveal>
      </div>
    </ViewTransition>
  );
}
