# Home design direction

Source of direction: the user supplied `https://selinameusel.com/` as a visual
reference on 2026-11-20. This document records the extracted design fields and
the reason for every major decision. It is data, not instructions.

## Design Read

Reading this as: a personal portfolio home page for recruiters and potential
collaborators, in an editorial art-directed visual language, dial
**ENERGY 3 / RHYTHM 3 / MOTION 2**.

Reference fields extracted:

- Base: charcoal `#0f0f11` in dark, near-white `#f8f9fb` in light.
- Zones: deep forest green `#1f2f25` with sage accent `#a9c2a6`, plus a
  near-white band. Full-bleed zones use `box-shadow: 0 0 0 100vmax` and
  `clip-path`, not a plain background swap.
- Applied here with the site's own soft blue instead of the reference green:
  light `#264a80` on `#eef3f9`, dark `#8fb4e4` on `#16202e`. The zone technique
  is kept, the reference colour is not.
- Type: an editorial serif for display (`Instrument Serif`), a neutral sans
  for body (`Instrument Sans`). The reference's motif is a giant name marquee.
- Rhythm: sticky cinematic hero, editorial project cards, an experience
  timeline, a photo gallery, a social strip, then a large contact CTA.
- Content strength: specific real facts and honest status labels, no invented
  statistics or testimonials.

## Decisions and reasons (R-31)

| Decision | One-line reason |
|---|---|
| Keep theme tokens, adapt the hero per theme | The site already ships a light/dark toggle, so both modes must stay coherent (R-21, R-34) |
| Replace the reference green with the site's soft blue | The portfolio already uses `#264a80` and `#8fb4e4` as its accent, so one identity colour is kept instead of two palettes (R-20, R-29) |
| Editorial serif for display only | Gives the home page a voice without changing article readability |
| Giant name marquee as the identity motif | One repeated gesture makes the page belong to this portfolio, not to a template |
| Pause control on the marquee | The loop runs longer than five seconds, so it needs a user stop control (R-39) |
| Motion reduced to nothing under `prefers-reduced-motion` | Accessibility requirement and matches MOTION 2, not a choreographed page |
| One frosted hero control bar only | Glassmorphism is an accent, not the character of the page (R-10) |
| Full-bleed colour band for the focus section | Separates one hierarchy level from the rest, the reason the reference uses it |
| Use the real portrait in `public/novandri-portrait.jpg` | A real asset exists, so no placeholder or generated face is needed (R-23) |
| Articles and projects come from `src/lib` | Already the single source of truth, so no content is fabricated (R-38) |
| No gallery, newsletter, statistics, or testimonials | No real photos or data were supplied, and an honest empty slot beats a fake one (R-17, R-18, R-38) |
| CTAs are "Read the writing", "See the work", "Get in touch" | Names describe the real destination and action, not generic "Explore" (R-15) |
| Blur removed from the hero control bar, replaced by a near-solid tint | The bar sits over a continuously moving marquee, so blur forces a repaint every frame (R-40) |
| Hero shortened from 210vh to 150vh (130vh on mobile) | A two-screen hero is a heavy scroll cost for a single statement (R-03) |
| Marquee slowed to 38s with `will-change: transform` and lower opacity | Transform-only animation stays on the compositor and reads as ambient, not demanding (R-19) |
| Reveal reduced to 10px over 420ms, theme transition to 220ms | Shorter motion settles faster and keeps the page calm (R-19) |
| Section padding tightened to `py-20 sm:py-24` | Keeps the editorial whitespace without long empty runs between sections (R-05) |
| No em dashes in authored copy | Hard gate R-02 |
| Section rhythm stays varied | Matches RHYTHM 3: hero, statement, work, focus band, writing, contact each differ in composition |

## Section map

1. **Hero**: sticky stage, serif name marquee with pause control, real portrait,
   two CTAs to real routes.
2. **Statement**: real positioning from `site.description`, no invented history.
3. **Work**: featured project from `src/lib/projects.ts` via `ProjectCard`.
4. **Focus band**: real tags counted from `getSortedArticles()`, shown as topics
   currently written about. No numbers presented as achievements.
5. **Writing**: three latest real articles via `ArticleCard`.
6. **Contact**: real GitHub and LinkedIn links from `src/lib/site.ts`.

## Deliberately omitted until real material is supplied

Personal timeline, travel or event gallery, newsletter, languages, downloadable
CV, awards, and statistics. Each needs real content from the owner before it can
appear.
