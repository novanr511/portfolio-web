import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { Reveal } from "@/components/reveal";
import {
  getAdjacentArticles,
  getArticle,
  sortedArticles,
} from "@/lib/articles";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return sortedArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.description,
    keywords: [...article.tags],
    alternates: { canonical: `/articles/${article.slug}` },
    openGraph: {
      type: "article",
      url: `${site.url}/articles/${article.slug}`,
      title: article.title,
      description: article.description,
      publishedTime: article.date,
      modifiedTime: article.updated ?? article.date,
      authors: [site.author.name],
      tags: article.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const { default: Post } = await import(`@/content/articles/${slug}.mdx`);
  const { newer, older } = getAdjacentArticles(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${site.url}/articles/${article.slug}#article`,
        headline: article.title,
        description: article.description,
        datePublished: article.date,
        dateModified: article.updated ?? article.date,
        inLanguage: "en",
        author: {
          "@type": "Person",
          "@id": `${site.url}/#person`,
          name: site.author.name,
          url: site.url,
        },
        publisher: {
          "@type": "Person",
          name: site.author.name,
        },
        mainEntityOfPage: `${site.url}/articles/${article.slug}`,
        keywords: article.tags.join(", "),
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
            name: "Articles",
            item: `${site.url}/articles`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: article.title,
            item: `${site.url}/articles/${article.slug}`,
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

      <article className="mx-auto max-w-5xl px-6 pb-16 pt-14 sm:pt-20">
        {/* Back link */}
        <Reveal>
          <Link
            href="/articles"
            transitionTypes={["nav-back"]}
            className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-muted transition-colors hover:text-accent"
          >
            <span aria-hidden>←</span> All articles
          </Link>
        </Reveal>

        {/* Article header */}
        <Reveal delay={60}>
          <header className="mt-8 max-w-2xl">
            <div className="flex flex-wrap gap-1.5">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-tint px-2.5 py-0.5 text-[11px] font-medium text-accent"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="mt-5 text-[32px] font-semibold leading-[1.15] tracking-[-0.02em] text-foreground sm:text-[40px]">
              {article.title}
            </h1>
            <p className="mt-4 text-[17px] leading-relaxed text-muted">
              {article.description}
            </p>
            <div className="mt-6 flex items-center gap-3 border-t border-border pt-5 text-[13px] text-muted">
              <span className="font-medium text-foreground">
                {site.author.name}
              </span>
              <time dateTime={article.date}>
                {new Date(article.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span className="text-border" aria-hidden>
                ·
              </span>
              <span>{article.readingTime}</span>
            </div>
          </header>
        </Reveal>

        {/* Body */}
        <Reveal delay={120}>
          <div className="prose prose-article mt-12 max-w-2xl prose-p:leading-[1.8] prose-headings:tracking-[-0.01em]">
            <Post />
          </div>
        </Reveal>

        {/* Prev / next */}
        <Reveal>
          <nav
            className="mt-16 grid gap-4 border-t border-border pt-10 sm:grid-cols-2"
            aria-label="More articles"
          >
            {older ? (
              <Link
                href={`/articles/${older.slug}`}
                transitionTypes={["nav-forward"]}
                className="group rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent/30 hover:bg-tint"
              >
                <span className="text-[12px] font-medium uppercase tracking-wide text-muted">
                  Older
                </span>
                <p className="mt-1.5 text-[15px] font-semibold leading-snug text-foreground group-hover:text-accent">
                  {older.title}
                </p>
              </Link>
            ) : (
              <span />
            )}
            {newer ? (
              <Link
                href={`/articles/${newer.slug}`}
                transitionTypes={["nav-forward"]}
                className="group rounded-2xl border border-border bg-surface p-5 text-right transition-colors hover:border-accent/30 hover:bg-tint sm:col-start-2"
              >
                <span className="text-[12px] font-medium uppercase tracking-wide text-muted">
                  Newer
                </span>
                <p className="mt-1.5 text-[15px] font-semibold leading-snug text-foreground group-hover:text-accent">
                  {newer.title}
                </p>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </Reveal>
      </article>
    </ViewTransition>
  );
}
