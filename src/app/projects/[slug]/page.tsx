import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { Reveal } from "@/components/reveal";
import { TableOfContents } from "@/components/table-of-contents";
import { getProjectStudy, getProjectStudies } from "@/lib/project-studies";
import { site } from "@/lib/site";

/** Full prerender at build; skip instant-UI validation (static content) */
export const instant = false;

export function generateStaticParams() {
  return getProjectStudies().then((all) => all.map((s) => ({ slug: s.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = await getProjectStudy(slug);
  if (!study) return {};

  return {
    title: study.title,
    description: study.description,
    keywords: [...study.tags],
    alternates: { canonical: `/projects/${study.slug}` },
    openGraph: {
      siteName: site.name,
      type: "article",
      url: `${site.url}/projects/${study.slug}`,
      title: study.title,
      description: study.description,
      publishedTime: study.date,
      modifiedTime: study.updated ?? study.date,
      authors: [site.author.penName],
      tags: study.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: study.title,
      description: study.description,
    },
  };
}

export default async function ProjectStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = await getProjectStudy(slug);
  if (!study) notFound();

  const { default: Study } = await import(`@/content/projects/${slug}.mdx`);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ScholarlyArticle",
        "@id": `${site.url}/projects/${study.slug}#article`,
        headline: study.title,
        description: study.description,
        datePublished: study.date,
        dateModified: study.updated ?? study.date,
        inLanguage: study.inLanguage,
        author: {
          "@type": "Person",
          "@id": `${site.url}/#person`,
          name: site.author.penName,
          url: site.url,
        },
        publisher: {
          "@type": "Person",
          name: site.author.penName,
        },
        mainEntityOfPage: `${site.url}/projects/${study.slug}`,
        keywords: study.tags.join(", "),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: site.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Projects",
            item: `${site.url}/projects`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: study.title,
            item: `${site.url}/projects/${study.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <ViewTransition
      enter={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      exit={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      default="none"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="mx-auto max-w-6xl px-6 pb-16 pt-14 sm:pt-20">
        <div className="lg:grid lg:grid-cols-[264px_minmax(0,1fr)] lg:gap-12">
          {/* Sticky table of contents — desktop only */}
          <aside className="hidden lg:block">
            <TableOfContents headings={study.headings} />
          </aside>

          <article className="mx-auto max-w-3xl lg:mx-0">
            {/* Back link */}
            <Reveal>
              <Link
                href="/projects"
                transitionTypes={["nav-back"]}
                className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-muted transition-colors hover:text-accent"
              >
                <span aria-hidden>←</span> All projects
              </Link>
            </Reveal>

            {/* Collapsible table of contents — mobile only */}
            <div className="mt-6 lg:hidden">
              <TableOfContents headings={study.headings} variant="mobile" />
            </div>

            {/* Case study header */}
            <Reveal delay={60}>
              <header className="mt-8">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-accent px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-accent-contrast">
                    Case study
                  </span>
                  {study.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-tint px-2.5 py-0.5 text-[11px] font-medium text-accent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h1 className="mt-5 text-[26px] font-semibold leading-[1.25] tracking-[-0.02em] text-foreground sm:text-[34px]">
                  {study.title}
                </h1>
                <p className="mt-4 text-[17px] leading-relaxed text-muted">
                  {study.description}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-border pt-5 text-[13px] text-muted">
                  <Link
                    href="/about"
                    className="font-medium text-foreground underline-offset-4 hover:text-accent hover:underline"
                  >
                    {site.author.penName}
                  </Link>
                  <time dateTime={study.date}>
                    {new Date(study.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <span className="text-border" aria-hidden>
                    ·
                  </span>
                  <span>{study.readingTime}</span>
                  <span className="text-border" aria-hidden>
                    ·
                  </span>
                  <span>English</span>
                </div>
              </header>
            </Reveal>

            {/* Body */}
            <Reveal delay={120}>
              <div className="prose prose-lg prose-article mt-12 max-w-none prose-p:leading-[1.8] prose-headings:tracking-[-0.01em]">
                <Study />
              </div>
            </Reveal>

            {/* Footer navigation */}
            <Reveal>
              <nav
                className="mt-16 flex flex-col gap-4 border-t border-border pt-10"
                aria-label="More project reading"
              >
                <Link
                  href="/projects"
                  transitionTypes={["nav-back"]}
                  className="group rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent/30 hover:bg-tint"
                >
                  <span className="text-[12px] font-medium uppercase tracking-wide text-muted">
                    Back
                  </span>
                  <p className="mt-1.5 text-[15px] font-semibold leading-snug text-foreground group-hover:text-accent">
                    All projects →
                  </p>
                </Link>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/articles/why-data-quality-matters-more-than-model-complexity"
                    transitionTypes={["nav-forward"]}
                    className="group rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent/30 hover:bg-tint"
                  >
                    <span className="text-[12px] font-medium uppercase tracking-wide text-muted">
                      Related reading
                    </span>
                    <p className="mt-1.5 text-[15px] font-semibold leading-snug text-foreground group-hover:text-accent">
                      Why Data Quality Matters More Than Model Complexity
                    </p>
                  </Link>
                  <Link
                    href="/articles/scenario-analysis-and-monte-carlo-when-to-use-each"
                    transitionTypes={["nav-forward"]}
                    className="group rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent/30 hover:bg-tint"
                  >
                    <span className="text-[12px] font-medium uppercase tracking-wide text-muted">
                      Related reading
                    </span>
                    <p className="mt-1.5 text-[15px] font-semibold leading-snug text-foreground group-hover:text-accent">
                      Scenario Analysis and Monte Carlo: When to Use Each
                    </p>
                  </Link>
                </div>
              </nav>
            </Reveal>
          </article>
        </div>
      </div>
    </ViewTransition>
  );
}
