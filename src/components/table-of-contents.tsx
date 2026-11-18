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

  useEffect(() => {
    if (variant === "mobile") return;

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -65% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings, variant]);

  if (headings.length === 0) return null;

  const list = (
    <ul className="m-0 list-none space-y-1 border-l border-border p-0">
      {headings.map((heading) => {
        const active = heading.id === activeId;
        return (
          <li
            key={heading.id}
            className={heading.level === 3 ? "pl-4" : "pl-0"}
          >
            <a
              href={`#${heading.id}`}
              aria-current={active ? "location" : undefined}
              className={`-ml-px block border-l-2 py-1 pr-2 text-[12.5px] leading-snug transition-colors ${
                active
                  ? "border-accent font-medium text-accent"
                  : "border-transparent text-muted hover:border-accent/40 hover:text-foreground"
              }`}
            >
              {heading.text}
            </a>
          </li>
        );
      })}
    </ul>
  );

  if (variant === "mobile") {
    return (
      <details className="mb-10 rounded-xl border border-border bg-surface px-4 py-3 lg:hidden">
        <summary className="cursor-pointer text-[13px] font-medium text-foreground">
          On this page
        </summary>
        <div className="mt-3">{list}</div>
      </details>
    );
  }

  return (
    <nav
      aria-label="On this page"
      className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-3"
    >
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted">
        On this page
      </p>
      {list}
    </nav>
  );
}
