import type { Metadata } from "next";
import { ViewTransition } from "react";
import { Reveal } from "@/components/reveal";
import { ArticleCard } from "@/components/article-card";
import { getSortedArticles } from "@/lib/articles";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "In-depth articles on learning AI, retrieval-augmented generation (RAG), LangChain, LangGraph, and building reliable systems with large language models.",
  alternates: { canonical: "/articles" },
  openGraph: {
    title: "Articles — Novandri R.",
    description:
      "In-depth articles on learning AI, RAG, LangChain, LangGraph, and building reliable LLM systems.",
  },
};

/** Blog + ItemList JSON-LD so crawlers see the full post inventory */
function blogJsonLd(sortedArticles: Awaited<ReturnType<typeof getSortedArticles>>) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${site.url}/articles#blog`,
        name: `${site.author.name} — Articles`,
        description:
          "In-depth articles on AI engineering: getting started, RAG, LangChain, and LangGraph.",
        url: `${site.url}/articles`,
        inLanguage: "en",
        publisher: {
          "@type": "Person",
          "@id": `${site.url}/#person`,
          name: site.author.name,
          url: site.url,
        },
        blogPost: sortedArticles.map((a) => ({
          "@type": "BlogPosting",
          headline: a.title,
          description: a.description,
          url: `${site.url}/articles/${a.slug}`,
          datePublished: a.date,
          dateModified: a.updated ?? a.date,
          author: {
            "@type": "Person",
            "@id": `${site.url}/#person`,
            name: site.author.penName,
            url: site.url,
          },
          keywords: a.tags.join(", "),
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          {
            "@type": "ListItem",
            position: 2,
            name: "Articles",
            item: `${site.url}/articles`,
          },
        ],
      },
    ],
  };
}

export default async function ArticlesPage() {
  const sortedArticles = await getSortedArticles();
  return (
    <ViewTransition
      enter={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      exit={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      default="none"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogJsonLd(sortedArticles)).replace(/</g, "\\u003c"),
        }}
      />
      <div className="mx-auto max-w-5xl px-6 pb-24 pt-16 sm:pt-24">
        <Reveal>
          <h1 className="text-[36px] font-semibold leading-tight tracking-[-0.02em] text-foreground sm:text-[44px]">
            Articles
          </h1>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-muted">
            Practical, researched deep dives on AI engineering — getting
            started, retrieval-augmented generation, and building agents with
            LangChain and LangGraph.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sortedArticles.map((article, i) => (
            <Reveal key={article.slug} delay={i * 80}>
              <ArticleCard article={article} />
            </Reveal>
          ))}
        </div>
      </div>
    </ViewTransition>
  );
}
