#!/usr/bin/env node
/**
 * Compiles every article with the same MDX pipeline the site uses, and reports
 * every failure at once.
 *
 * `next build` stops at the first broken article, which hides the rest. This
 * script parses all of them so a batch of fixes can be made in one pass.
 *
 * Usage: node scripts/check-mdx.mjs
 */

import { readFile, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { compile } from "@mdx-js/mdx";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const articlesDir = join(root, "src", "content", "articles");

const files = (await readdir(articlesDir)).filter((file) => file.endsWith(".mdx")).sort();
const failures = [];

for (const file of files) {
  const source = await readFile(join(articlesDir, file), "utf8");
  try {
    await compile(source, {
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm],
      rehypePlugins: [rehypeSlug],
    });
  } catch (error) {
    const message = String(error.message ?? error).split("\n").slice(0, 3).join(" ");
    failures.push({ file, message });
  }
}

console.log(`checked ${files.length} articles`);
if (failures.length > 0) {
  console.error(`\n${failures.length} article(s) failed to compile:\n`);
  for (const failure of failures) {
    console.error(`  ${failure.file}\n    ${failure.message}\n`);
  }
  process.exit(1);
}
console.log("all articles compile cleanly.");
