"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type CategoryScrollerProps = {
  children: ReactNode;
};

/**
 * Renders a single-row, horizontally scrollable strip of category links.
 *
 * Native scrolling (trackpad, touch, shift+wheel) works on the container,
 * but a long strip is hard to discover with a mouse alone, so this adds
 * previous/next buttons, edge fades that appear only when there is more
 * content in that direction, and vertical-wheel-to-horizontal panning that
 * yields back to the page once the strip reaches its end.
 */
export function CategoryScroller({ children }: CategoryScrollerProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);

  const syncEdges = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    // Sub-pixel scroll positions are common; treat <1px as "at the edge".
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft >= max - 1);
  }, []);

  // Track scroll position and content size.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    syncEdges();
    el.addEventListener("scroll", syncEdges, { passive: true });

    const observer = new ResizeObserver(syncEdges);
    observer.observe(el);
    for (const child of Array.from(el.children)) observer.observe(child);

    return () => {
      el.removeEventListener("scroll", syncEdges);
      observer.disconnect();
    };
  }, [syncEdges, children]);

  // Let a vertical wheel gesture pan the strip horizontally, but hand the
  // gesture back to the page as soon as the strip cannot scroll further.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey) return; // leave pinch-zoom alone
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return; // already horizontal

      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0) return;

      const delta = event.deltaY;
      const atLeftEdge = el.scrollLeft <= 0;
      const atRightEdge = el.scrollLeft >= max - 1;

      if ((delta < 0 && atLeftEdge) || (delta > 0 && atRightEdge)) return;

      event.preventDefault();
      el.scrollLeft += delta;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const scrollBy = (direction: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction * el.clientWidth * 0.8,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-sm font-semibold text-foreground">
          Browse by category
        </h2>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            disabled={atStart}
            aria-label="Scroll categories left"
            className="rounded-full border border-border p-1.5 text-muted transition-colors hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-accent"
          >
            <Chevron direction="left" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            disabled={atEnd}
            aria-label="Scroll categories right"
            className="rounded-full border border-border p-1.5 text-muted transition-colors hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-accent"
          >
            <Chevron direction="right" />
          </button>
        </div>
      </div>

      <div className="relative mt-3">
        <div
          ref={scrollerRef}
          role="group"
          aria-label="Article categories, scrollable"
          tabIndex={0}
          className="category-scroller flex flex-nowrap gap-2 overflow-x-auto pb-1"
        >
          {children}
        </div>

        {/* Edge fades hint that the strip continues past the viewport. */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-background to-transparent transition-opacity duration-200 ${
            atStart ? "opacity-0" : "opacity-100"
          }`}
        />
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-background to-transparent transition-opacity duration-200 ${
            atEnd ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>
    </>
  );
}

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {direction === "left" ? (
        <path d="M10 3.5 5.5 8l4.5 4.5" />
      ) : (
        <path d="M6 3.5 10.5 8 6 12.5" />
      )}
    </svg>
  );
}
