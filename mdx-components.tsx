import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { Figure } from "@/components/figure";
import {
  Lead,
  KeyPoint,
  PullQuote,
  Trap,
  Mark,
  KeyFigures,
} from "@/components/article-emphasis";

const components: MDXComponents = {
  a: ({ href = "", children, ...props }) => {
    // Internal links become <Link> for client-side transitions
    if (href.startsWith("/")) {
      return (
        <Link href={href} transitionTypes={["nav-back"]} {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  },
  // Wide tables (evidence-status grids, comparison matrices) cannot fit a
  // phone viewport. Wrap every MDX table in a horizontally scrollable region
  // so columns keep their width instead of collapsing into unreadable stacks.
  table: ({ children, ...props }) => (
    <div className="table-scroll">
      <table {...props}>{children}</table>
    </div>
  ),
  // Inline figures: authors can place <Figure src=... alt=... caption=... />
  // anywhere in an MDX article to support the surrounding paragraph.
  Figure: ({ src, alt, caption, width, height }) => (
    <Figure
      src={String(src ?? "")}
      alt={String(alt ?? "")}
      caption={caption ? String(caption) : undefined}
      width={width ? Number(width) : undefined}
      height={height ? Number(height) : undefined}
    />
  ),
  Lead,
  KeyPoint,
  PullQuote,
  Trap,
  Mark,
  KeyFigures,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
