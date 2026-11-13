import Link from "next/link";
import type { Article } from "@/lib/articles";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      transitionTypes={["nav-forward"]}
      className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:bg-tint focus-visible:outline-2 focus-visible:outline-accent"
    >
      <div className="flex flex-wrap gap-1.5">
        {article.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-background px-2.5 py-0.5 text-[11px] font-medium text-accent"
          >
            {tag}
          </span>
        ))}
      </div>
      <h3 className="mt-4 text-[17px] font-semibold leading-snug tracking-tight text-foreground">
        {article.title}
      </h3>
      <p className="mt-2 line-clamp-3 text-[13.5px] leading-relaxed text-muted">
        {article.description}
      </p>
      <div className="mt-auto pt-5 text-[12px] text-muted">
        <time dateTime={article.date}>
          {new Date(article.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <span className="mx-1.5 text-border" aria-hidden>
          ·
        </span>
        {article.readingTime}
      </div>
      <span className="mt-3 inline-flex items-center gap-1 text-[13px] font-medium text-accent">
        Read article
        <span
          aria-hidden
          className="transition-transform duration-300 group-hover:translate-x-0.5"
        >
          →
        </span>
      </span>
    </Link>
  );
}
