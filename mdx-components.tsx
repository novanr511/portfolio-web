import type { MDXComponents } from "mdx/types";
import Link from "next/link";

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
};

export function useMDXComponents(): MDXComponents {
  return components;
}
