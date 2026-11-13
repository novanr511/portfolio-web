# Novan — Portfolio

Personal portfolio built with **Next.js 16 (App Router) + Tailwind CSS 4 + MDX**, styled after [business.apple.com](https://business.apple.com/): white-dominant layout with `#264a80` as the single accent color, generous whitespace, subtle view transitions, and a light/dark mode toggle.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Profile hero, latest articles, highlighted projects |
| `/articles` | All articles |
| `/articles/[slug]` | Full MDX article with prev/next navigation |
| `/projects` | All projects (featured first) |
| `/about` | Bio, focus areas, contact |

## Writing articles

Article metadata lives in `src/lib/articles.ts`; article bodies are MDX files in `src/content/articles/`.

To publish a new article:

1. Create `src/content/articles/<slug>.mdx` — start the body with a lead paragraph, then `##` sections (the page renders the `<h1>` title itself).
2. Add an entry to the `articles` array in `src/lib/articles.ts` (newest first) with `slug`, `title`, `description`, `date`, `tags`, and `readingTime`.

That's it — the home page, `/articles`, sitemap, RSS feed, and per-article OG images pick it up automatically on the next build. The body supports GitHub-flavored Markdown (tables, task lists) and internal links like `[how RAG works](/articles/rag-explained)`.

## Editing projects

Everything is in `src/lib/projects.ts`. Set `featured: true` to show a project in the "Highlighted work" section on the home page.

## Editing profile content

Name, description, email, and social links live in `src/lib/site.ts`. Hero copy is in `src/app/page.tsx`; the bio is in `src/app/about/page.tsx`.

## SEO / GEO checklist (already wired)

- Static prerendering of every page (fast, fully crawlable HTML)
- Per-page `<title>`, description, canonical URL, and Open Graph/Twitter cards
- Auto-generated **OG images** per article via `next/og`
- **JSON-LD**: `WebSite` + `Person` on the home page; `Article` + `BreadcrumbList` on article pages
- `sitemap.xml` and `robots.txt` generated from the content data
- **RSS feed** at `/feed.xml`
- Semantic HTML: single `<h1>`, ordered `h2`/`h3`, `<article>`, `<time>`

## Running locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Deploying to Vercel

1. Push this folder to a GitHub repo, then import it at [vercel.com/new](https://vercel.com/new).
2. After the first deploy, add the environment variable `NEXT_PUBLIC_SITE_URL` (see `.env.example`) with your production URL — this makes canonical URLs, sitemap entries, RSS links, and OG images absolute.
3. Optionally point a custom domain at the project.

No database, no CMS service, no runtime cost — articles are MDX files in the repo; editing one triggers a full rebuild on push.
