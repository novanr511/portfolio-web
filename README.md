# Novan — Portfolio

Personal portfolio built with **Next.js 16 (App Router) + Tailwind CSS 4 + MDX**, styled after [business.apple.com](https://business.apple.com/): white-dominant layout with `#264a80` as the single accent color, generous whitespace, subtle view transitions, and a light/dark mode toggle.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Profile hero, latest articles, highlighted projects |
| `/articles` | All articles |
| `/articles/[slug]` | Full MDX article with prev/next navigation |
| `/projects` | Project case studies (currently empty) |
| `/about` | Bio, focus areas, contact |
| `/keystatic` | Article CMS |

## Writing articles

Articles are MDX files in `src/content/articles/`. Each file contains its own YAML frontmatter (`title`, `description`, `date`, optional `updated`, and `tags`) followed by the article body. Reading time is calculated automatically.

To write or edit articles, open `/keystatic`. Locally, Keystatic writes directly to the MDX files. In production, it uses GitHub storage so saves are committed to the repository and trigger a Vercel deployment.

For local authoring, run `npm run dev` and visit `http://localhost:3000/keystatic`. You can also create or edit the `.mdx` files directly; the filename becomes the article URL slug. Start the body with a lead paragraph, then use `##` sections (the page renders the `<h1>` title itself).

Before enabling the production editor, configure `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, and `KEYSTATIC_SECRET` in Vercel. `KEYSTATIC_SECRET` must be at least 32 characters. Without these values, `/keystatic` displays setup instructions and the API refuses writes rather than using non-persistent server storage. After adding the variables, redeploy. The production site URL defaults to `https://portfolio-web-six-zeta.vercel.app`; set `NEXT_PUBLIC_SITE_URL` only if using a different domain.

The home page, `/articles`, sitemap, RSS feed, LLM content endpoints, and per-article OG images all derive from the MDX files and update on the next build. Article bodies support GitHub-flavored Markdown (tables, task lists) and internal links like `[how RAG works](/articles/rag-explained)`.

## Editing projects

Everything is in `src/lib/projects.ts`. Set `featured: true` to show a project in the "Highlighted work" section on the home page.

## Editing profile content

Name, description, email, and social links live in `src/lib/site.ts`. Hero copy is in `src/app/page.tsx`; the bio is in `src/app/about/page.tsx`.

## SEO / GEO checklist (already wired)

- Static prerendering of every page (fast, fully crawlable HTML)
- Per-page `<title>`, description, canonical URL, and Open Graph/Twitter cards
- Auto-generated **OG images** per article via `next/og`
- **JSON-LD**: `WebSite` + `Person` on the home page; `Blog` + `ItemList` on `/articles`; `Article` + `BreadcrumbList` on article pages
- `sitemap.xml` and `robots.txt` generated from the content data — robots.txt explicitly allows AI answer-engine crawlers (GPTBot, ClaudeBot, PerplexityBot, …)
- **`/llms.txt`** — curated site index for LLMs (llmstxt.org standard), generated from the same data as the pages
- **`/llms-full.txt`** — every article's complete content in plain markdown for AI ingestion
- **RSS feed** at `/feed.xml`
- Semantic HTML: single `<h1>`, ordered `h2`/`h3`, `<article>`, `<time>`

Projects are intentionally empty for now. Add project entries to `src/lib/projects.ts` when case studies are ready; the home page and `/projects` update automatically.

## Running locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Deploying to Vercel

1. Push this folder to a GitHub repo, then import it at [vercel.com/new](https://vercel.com/new).
2. Add the Keystatic GitHub OAuth variables listed above to the Vercel project, then redeploy. Set `NEXT_PUBLIC_SITE_URL` if using a custom domain.
3. Optionally point a custom domain at the project.

No database or external CMS service is needed — articles remain versioned MDX files in the GitHub repo; each production CMS save triggers a deploy.
