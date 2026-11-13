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
  // /llms-full.txt reads article MDX files at request time —
  // make sure they ship in the serverless bundle
  outputFileTracingIncludes: {
    "/llms-full.txt": ["./src/content/articles/**/*.mdx"],
  },
  cacheComponents: true,
  partialPrefetching: true,
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: ["rehype-slug"],
  },
});

export default withMDX(nextConfig);
