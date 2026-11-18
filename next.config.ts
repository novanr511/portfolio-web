import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Allow .mdx content files to be imported
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // llms-full.txt reads MDX at request time — make sure both article and
  // project case-study sources ship in the serverless bundle.
  outputFileTracingIncludes: {
    "/llms-full.txt": [
      "./src/content/articles/**/*.mdx",
      "./src/content/projects/**/*.mdx",
    ],
  },
  cacheComponents: true,
  partialPrefetching: true,
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      // Strip YAML frontmatter when compiling MDX (metadata is read
      // separately via gray-matter in src/lib/articles.ts)
      "remark-frontmatter",
      "remark-mdx-frontmatter",
      // GitHub-flavored markdown: tables, task lists, etc.
      "remark-gfm",
    ],
    rehypePlugins: ["rehype-slug"],
  },
});

export default withMDX(nextConfig);
