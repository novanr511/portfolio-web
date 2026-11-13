import { collection, config, fields } from "@keystatic/core";

/**
 * Keystatic CMS config (https://keystatic.com)
 *
 * Storage mode:
 * - Local in development: writes directly to the repo files.
 * - GitHub in production: edits are committed to the repo and trigger a
 *   Vercel deploy. GitHub OAuth environment variables must be configured.
 */
const storage =
  process.env.NODE_ENV === "production"
    ? {
        kind: "github" as const,
        repo: { owner: "novanr511", name: "portfolio-web" },
      }
    : { kind: "local" as const };

export default config({
  storage,
  ui: {
    brand: { name: "Novandri — Portfolio CMS" },
    navigation: {
      Articles: ["articles"],
    },
  },
  collections: {
    articles: collection({
      label: "Articles",
      slugField: "title",
      path: "src/content/articles/*",
      format: { contentField: "content" },
      entryLayout: "content",
      schema: {
        title: fields.slug({
          name: {
            label: "Title",
            validation: { isRequired: true },
            description: "The article headline (shown on the page and in search results).",
          },
          slug: {
            label: "URL slug",
            description: "Used as /articles/<slug>. Keep it short and descriptive.",
          },
        }),
        description: fields.text({
          label: "Description",
          multiline: true,
          validation: { isRequired: true, length: { max: 180 } },
          description:
            "Summary for cards, meta description, and AI engines (max ~180 chars for SEO).",
        }),
        date: fields.date({
          label: "Publish date",
          validation: { isRequired: true },
        }),
        updated: fields.date({
          label: "Updated date",
          description: "Optional — set when you meaningfully revise the article.",
        }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value || "tag",
        }),
        content: fields.mdx({
          label: "Content",
        }),
      },
    }),
  },
});
