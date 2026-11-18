"use client";

import { useEffect, useState } from "react";
import type { TocHeading } from "@/lib/project-studies";

type Props = {
  headings: TocHeading[];
  /** `sidebar` is sticky on desktop; `mobile` is a collapsible block. */
  variant?: "sidebar" | "mobile";
};

export function TableOfContents({ headings, variant = "sidebar" }: Props) {
  const [activeId, setActiveId] = useState(headings[0]?.id ?? "");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (variant === "mobile") return;

    const update = () => {
      const elements = headings
        .map((heading) => document.getElementById(heading.id))
        .filter((el): el is HTMLElement => el !== null);

      let current = elements[0]?.id ?? "";
      for (const el of elements) {
        if (el.getBoundingClientRect().top <= 140) current = el.id;
      }
      setActiveId(current);

      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(
        max > 0 ? Math.min(100, Math.max(0, (doc.scrollTop / max) * 100)) : 0
      );
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [headings, variant]);

  if (headings.length === 0) return null;

  const list = (
    <ol className="toc-scroll m-0 max-h-[calc(100vh-16rem)] list-none space-y-0.5 overflow-y-auto p-0 pr-1">
      {headings.map((heading) => {
        const active = heading.id === activeId;
        return (
          <li key={heading.id} className={heading.level === 3 ? "pl-4" : ""}>
            <a
              href={`#${heading.id}`}
              aria-current={active ? "location" : undefined}
              className={`flex items-start gap-2 rounded-lg px-2.5 py-[7px] text-[12.5px] leading-snug transition-colors ${
                active
                  ? "bg-tint font-medium text-accent"
                  : "text-muted hover:bg-tint/60 hover:text-foreground"
              }`}
            >
              {heading.level === 3 && (
                <span
                  aria-hidden
                  className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-current opacity-45"
                />
              )}
              <span>{heading.text}</span>
            </a>
          </li>
        );
      })}
    </ol>
  );

  if (variant === "mobile") {
    return (
      <details className="toc-mobile group rounded-2xl border border-border bg-surface">
        <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3.5 text-[13px] font-medium text-foreground">
          <span>On this page</span>
          <svg
            aria-hidden
            viewBox="0 0 16 16"
            fill="none"
            className="h-4 w-4 text-muted transition-transform duration-200 group-open:rotate-180"
          >
            <path
              d="m4 6 4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </summary>
        <div className="border-t border-border px-2.5 py-3">{list}</div>
      </details>
    );
  }

  return (
    <nav
      aria-label="On this page"
      className="sticky top-24 rounded-2xl border border-border bg-surface p-5"
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
          Contents
        </p>
        <span className="text-[11px] tabular-nums text-muted">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="mb-4 h-[2px] w-full overflow-hidden rounded-full bg-border">
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>
      {list}
    </nav>
  );
}
