import { readdirSync } from "node:fs";
import path from "node:path";
import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import { CURATED_SLUG_SET } from "./src/lib/curated-slugs";

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

  /**
   * The curated archive stays on disk but is no longer published. Send every
   * de-listed article URL to the hub with a permanent redirect so existing
   * links keep their equity instead of becoming soft 404s.
   */
  async redirects() {
    const articlesDir = path.join(__dirname, "src", "content", "articles");
    return readdirSync(articlesDir)
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => file.replace(/\.mdx$/, ""))
      .filter((slug) => !CURATED_SLUG_SET.has(slug))
      .map((slug) => ({
        source: `/articles/${slug}`,
        destination: "/articles",
        permanent: true,
      }));
  },
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
