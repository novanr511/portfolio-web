# Novan Base — Custom WordPress Theme

Bespoke editorial WordPress theme built as a portfolio piece and as a practical
demonstration of the skills required for a **Senior WordPress Developer / Tech Lead**
role: custom theming, Gutenberg/ACF blocks, WCAG 2.2 AA markup, REST API and
performance-conscious assets.

Visual reference: Shopify **Rare — Charisma** (editorial fashion, warm taupe /
cream / black palette). All imagery was generated for this demo and optimised
to WebP.

---

## 1. Structure

```
wp-theme/
├── style.css                     Theme header (WordPress requirement)
├── functions.php                 Bootstrap / includes
├── header.php  footer.php        Site chrome, landmarks, skip link
├── front-page.php                Composed from template parts
├── index.php  page.php  category.php
├── single.php  search.php  404.php  comments.php
├── woocommerce/
│   ├── archive-product.php         Shop archive
│   ├── single-product.php          Single product wrapper
│   ├── content-product.php         Product card
│   ├── content-product_cat.php     Category card
│   └── content-single-product.php  Product layout + tabs + related
├── inc/
│   ├── setup.php                 Theme supports, menus, image sizes
│   ├── enqueue.php               CSS/JS, editor assets, font hints
│   ├── template-tags.php         Safe content helpers + fallbacks
│   ├── acf.php                   Options page + ACF block
│   ├── blocks.php                Native Gutenberg block registration
│   ├── rest.php                  Custom REST endpoints
│   ├── woocommerce.php           WC support + shop sidebar
│   └── demo-content.php          Blueprint-only content seeder
├── blocks/
│   └── collection-card/
│       ├── block.json            Block metadata (API v3)
│       └── index.js              Editor UI, plain JS (no build step)
├── template-parts/
│   ├── section-hero.php
│   ├── section-collections.php
│   ├── section-editorial.php
│   ├── block-collection-showcase.php
│   └── content.php
├── assets/
│   ├── css/main.css
│   ├── js/main.js
│   └── images/*.webp             Generated editorial imagery
└── blueprint.json                WordPress Playground demo configuration
```

---

## 2. Design tokens

| Token | Value |
| --- | --- |
| Ink | `#111111` |
| Cream | `#f7f4ef` |
| Beige | `#e9dfd2` |
| Taupe | `#c6a98f` |
| Dark | `#171717` |
| Display font | Cormorant Garamond (serif) |
| Body font | DM Sans |

---

## 3. Run locally

This theme lives in a subdirectory of the Next.js portfolio repo. WordPress can
only activate themes inside `wp-content/themes/`, so link it into a local
WordPress install (Local by Flywheel is used here):

```bash
ln -s /Users/novandri511/Data-science-3/portfolio-novan/wp-theme \
  "/Users/novandri511/Local Sites/supernova/app/public/wp-content/themes/novan-base"
```

Then open **Appearance → Themes → Activate** in the Local site. Editing files in
this repo immediately updates the WordPress site.

---

## 4. Live demo (free, no hosting)

`blueprint.json` boots a fresh WordPress in the browser and installs the theme
straight from the `wp-theme/` subdirectory of this repository.

```
https://playground.wordpress.net/?blueprint-url=https://raw.githubusercontent.com/novanr511/portfolio-web/main/wp-theme/blueprint.json
```

Requirements: the GitHub repository must be **public** and the `main` branch
must contain this folder. No ZIP, server, or hosting is needed.

The blueprint also installs ACF, logs in as `admin`, and sets site options so
the demo is ready to explore.

---

## 5. Page templates

| Halaman | Template | Catatan |
| --- | --- | --- |
| Beranda | `front-page.php` | Hero → collections → editorial → newsletter |
| Shop | `woocommerce/archive-product.php` | Sidebar filter + grid responsif |
| Produk | `woocommerce/content-single-product.php` | Gallery, harga, add-to-cart, tabs, related |
| Artikel | `single.php` | Header editorial, hero image, reading time, related posts |
| Kategori artikel | `category.php` | Hero kategori + deskripsi + grid |
| Arsip lain | `index.php` | Fallback |

Blueprint meng-install **WooCommerce** dan men-seed 6 produk + 3 artikel
via `inc/demo-content.php`, jadi semua halaman tersebut bisa langsung dilihat.

## 6. Editable content (ACF)

With ACF active, **Theme Options** exposes:

- Wordmark, announcement text
- Hero eyebrow / heading / description / image
- Collections repeater (image, title, caption)
- Editorial eyebrow / heading / description / image

Without ACF, every helper in `inc/template-tags.php` falls back to bundled
content, so the theme never fatals.

---

## 7. Blocks

- **`novan/collection-card`** — native Gutenberg block, `block.json` API v3,
  editor UI built with `wp.*` globals (no webpack/build step). Supports image
  selection via `MediaUpload`.
- **`acf/collection-showcase`** — ACF block rendered by PHP
  (`template-parts/block-collection-showcase.php`) with a repeater field.

---

## 8. Accessibility (WCAG 2.2 AA)

- Skip link, semantic landmarks, correct heading order
- `:focus-visible` styles (light on dark sections)
- `aria-expanded` / `aria-controls` on menu and search toggles
- Keyboard close (Escape), focus returned to trigger
- Carousel is a labelled region with `tabindex="0"` and descriptive buttons
- Decorative SVGs are `aria-hidden`, informative images have alt text
- Visible focus targets ≥ 44px, reduced-motion support

---

## 9. Performance

- All imagery converted from PNG (~29 MB) to WebP (~500 KB total)
- `width`/`height` attributes prevent layout shift
- `loading="lazy"` + `decoding="async"` on below-the-fold images,
  `fetchpriority="high"` on the hero
- Cache-busted asset versions via `filemtime()`

---

## 10. REST endpoints

| Endpoint | Description |
| --- | --- |
| `GET /wp-json/novan/v1/collections` | Collection cards as JSON |
| `GET /wp-json/novan/v1/site` | Brand and site metadata |
