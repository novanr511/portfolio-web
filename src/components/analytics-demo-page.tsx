import type { ReactNode } from "react";
import Link from "next/link";
import { ViewTransition } from "react";
import { Reveal } from "@/components/reveal";
import type { AnalyticsWork } from "@/lib/data-analytics";

/**
 * Shared shell for a single data-analytics demo. Keeps the index page to
 * summaries while each subject owns its own URL and full write-up.
 */
export function AnalyticsDemoPage({
  work,
  children,
}: {
  work: AnalyticsWork;
  children: ReactNode;
}) {
  return (
    <ViewTransition
      enter={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      exit={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      default="none"
    >
      <div className="mx-auto max-w-3xl px-6 pb-24 pt-14 sm:pt-20">
        <Reveal>
          <Link
            href="/data-analytics"
            transitionTypes={["nav-back"]}
            className="inline-flex min-h-11 items-center text-[13.5px] font-medium text-muted transition-colors hover:text-accent"
          >
            <span aria-hidden>←</span> All data analytics work
          </Link>
        </Reveal>

        <Reveal delay={60}>
          <header className="mt-9">
            <p className="page-eyebrow">Public-data demo</p>
            <h1 className="page-title mt-3 text-[30px] sm:text-[40px]">
              {work.name}
            </h1>
            <p className="page-subtitle mt-4 text-[16px]">{work.summary}</p>
            {work.dataset && (
              <p className="mt-5 text-[13.5px] text-muted">
                Dataset: {work.dataset}. {" "}
                {work.sourceUrl && (
                  <a
                    href={work.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-accent hover:underline"
                  >
                    View the source file
                  </a>
                )}
              </p>
            )}
          </header>
        </Reveal>

        <div className="prose prose-lg prose-article mt-10 max-w-none">
          {children}
        </div>
      </div>
    </ViewTransition>
  );
}
