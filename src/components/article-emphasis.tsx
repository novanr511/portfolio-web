import type { ReactNode } from "react";

type Props = { children: ReactNode };

/**
 * Opening paragraph of an article. Reason (R-31): a larger first beat gives
 * the reader a clear entry point without adding motion or decoration.
 */
export function Lead({ children }: Props) {
  return <div className="article-lead">{children}</div>;
}

/**
 * The one sentence a section exists to deliver. Reason (R-31): a thin accent
 * rule plus weight marks hierarchy, so a reader scanning the page finds the
 * claim instead of guessing which sentence matters.
 */
export function KeyPoint({ children }: Props) {
  return <div className="article-key-point">{children}</div>;
}

/**
 * The sharpest claim in an article. Reason (R-31): an oversized italic line
 * gives one focal point per screen, the liveliness lever for a calm article.
 */
export function PullQuote({ children }: Props) {
  return <blockquote className="article-pull-quote">{children}</blockquote>;
}

/**
 * A common mistake, set apart from the argument. Reason (R-31): a quiet
 * left-rule aside flags the trap without a pill badge, dot, or icon, which
 * would turn a warning into decoration (R-09).
 */
export function Trap({ children }: Props) {
  return (
    <aside className="article-trap" aria-label="Common trap">
      <span className="article-trap-label">The trap</span>
      {children}
    </aside>
  );
}

/**
 * Inline highlight for a phrase worth scanning. Reason (R-31): a faint tint
 * marks importance without underlining, which this site reserves for links.
 */
export function Mark({ children }: Props) {
  return <mark className="article-mark">{children}</mark>;
}
