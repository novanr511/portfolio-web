import type { Metadata } from "next";
import { ViewTransition } from "react";
import { Reveal } from "@/components/reveal";
import { ArticleCard } from "@/components/article-card";
import { sortedArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "In-depth articles on learning AI, retrieval-augmented generation (RAG), LangChain, LangGraph, and building reliable systems with large language models.",
  alternates: { canonical: "/articles" },
  openGraph: {
    title: "Articles — Novan",
    description:
      "In-depth articles on learning AI, RAG, LangChain, LangGraph, and building reliable LLM systems.",
  },
};

export default function ArticlesPage() {
  return (
    <ViewTransition
      enter={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      exit={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      default="none"
    >
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
