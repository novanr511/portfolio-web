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
};

export function useMDXComponents(): MDXComponents {
  return components;
}
