"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { ArticleCard } from "@/components/article-card";
import { Reveal } from "@/components/reveal";
import type { Article } from "@/lib/articles";

type ArticleSearchProps = {
  articles: Article[];
};

/** Read the shared ?q= value from the URL as an external store. */
function subscribeToUrl(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  return () => window.removeEventListener("popstate", onChange);
}

function getUrlQuery() {
  return new URLSearchParams(window.location.search).get("q") ?? "";
}

function getServerQuery() {
  return "";
}

/**
 * Client-side article filter. The full, serializable article list is passed
 * from the server page; filtering runs in the browser so results appear
 * instantly without a round trip. The active query is mirrored into ?q= so a
 * filtered view can be bookmarked or shared.
 */
export function ArticleSearch({ articles }: ArticleSearchProps) {
  // `draft` holds what the user is typing; when null we follow the URL value.
  // This avoids setting state inside an effect (React's recommended pattern
  // for state derived from an external store is useSyncExternalStore).
  const [draft, setDraft] = useState<string | null>(null);
  const urlQuery = useSyncExternalStore(
    subscribeToUrl,
    getUrlQuery,
    getServerQuery
  );
  const query = draft ?? urlQuery;
  const inputRef = useRef<HTMLInputElement>(null);

  const updateQuery = useCallback((next: string) => {
    setDraft(next);
    const url = new URL(window.location.href);
    if (next.trim()) url.searchParams.set("q", next.trim());
    else url.searchParams.delete("q");
    window.history.replaceState(null, "", `${url.pathname}${url.search}`);
  }, []);

  // "/" focuses search, Escape clears it — unless the user is typing elsewhere.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const typing =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;
      if (e.key === "/" && !typing) {
        e.preventDefault();
        inputRef.current?.focus();
      } else if (e.key === "Escape" && document.activeElement === inputRef.current) {
        updateQuery("");
        inputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [updateQuery]);

  const results = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (terms.length === 0) return articles;
    return articles.filter((article) => {
      const haystack = `${article.title} ${article.description} ${article.tags.join(" ")}`.toLowerCase();
      return terms.every((term) => haystack.includes(term));
    });
  }, [articles, query]);

  return (
    <>
      <section aria-label="Search articles" className="mt-8">
        <div className="relative">
          <SearchIcon />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => updateQuery(e.target.value)}
            placeholder="Search articles by title, topic, or keyword..."
            aria-label="Search articles"
            className="w-full rounded-xl border border-border bg-surface py-3 pl-11 pr-11 text-[15px] text-foreground outline-none transition-colors placeholder:text-muted/70 hover:border-accent/40 focus:border-accent focus-visible:outline-2 focus-visible:outline-accent"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                updateQuery("");
                inputRef.current?.focus();
              }}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
            >
              <CloseIcon />
            </button>
          )}
        </div>
        <div className="mt-2 flex items-center justify-between gap-3 text-[12.5px] text-muted">
          <p aria-live="polite">
            {query.trim() ? (
              <>
                <span className="font-medium text-foreground">{results.length}</span> of{" "}
                {articles.length} articles match
              </>
            ) : (
              <>{articles.length} articles — press <kbd className="rounded border border-border px-1.5 py-0.5 font-sans text-[11px]">/</kbd> to search</>
            )}
          </p>
          {query.trim() && (
            <button
              type="button"
              onClick={() => updateQuery("")}
              className="text-accent underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-accent"
            >
              Clear
            </button>
          )}
        </div>
      </section>

      {results.length > 0 ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((article, i) => (
            <Reveal key={article.slug} delay={Math.min(i, 12) * 40}>
              <ArticleCard article={article} />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-border bg-surface p-10 text-center">
          <p className="text-[17px] font-medium text-foreground">No articles found</p>
          <p className="mt-2 text-[14px] text-muted">
            Try fewer words or a broader topic.
          </p>
          <button
            type="button"
            onClick={() => updateQuery("")}
            className="mt-5 rounded-full border border-accent px-4 py-2 text-[13.5px] font-medium text-accent transition-colors hover:bg-tint focus-visible:outline-2 focus-visible:outline-accent"
          >
            Show all articles
          </button>
        </div>
      )}
    </>
  );
}

function SearchIcon() {
  return (
    <svg
      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.2-3.2" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
