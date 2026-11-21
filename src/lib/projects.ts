export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  year: string;
  featured?: boolean;
  /** True when a long-form case study exists at src/content/projects/<slug>.mdx */
  caseStudy?: boolean;
  links: { live?: string; source?: string };
};

/**
 * The project catalogue. One line per project; the long-form case study for
 * each entry (when `caseStudy` is true) lives in
 * `src/content/projects/<slug>.mdx` and is rendered at `/projects/<slug>`.
 *
 * Entries with `featured: true` also appear in "Highlighted work" on the home
 * page. Every consumer — home page, /projects, sitemap, llms.txt — reads from
 * this single source of truth.
 */
export const projects: Project[] = [
  {
    slug: "btc-monthly-ml",
    name: "BTC Monthly ML",
    tagline: "A walk-forward Bitcoin study where the honest baseline won",
    description:
      "A full research pipeline for monthly Bitcoin direction — walk-forward validation, leakage-controlled features, seven candidate models, a conformal price-range model, a Monte Carlo path forecast, plus a BI dashboard and a RAG research agent. The finding: the 92% accuracy is descriptive, not a tradable edge.",
    tags: [
      "Python",
      "scikit-learn",
      "XGBoost",
      "LightGBM",
      "Time Series",
      "Conformal Prediction",
      "FastAPI",
      "RAG",
    ],
    year: "2026",
    featured: true,
    caseStudy: true,
    // No public repository yet — add `source` here when the code is published.
    links: {},
  },
  {
    slug: "novan-base-wordpress-theme",
    name: "Novan Base — WordPress Theme",
    tagline: "A bespoke editorial theme, built from an empty folder",
    description:
      "A custom WordPress theme built as hands-on evidence for a Senior WordPress Developer role: classic templates, native Gutenberg and ACF blocks, WooCommerce templates, WCAG 2.2 AA markup, REST endpoints, WebP assets, and a free live demo that boots straight from the GitHub repo with WordPress Playground.",
    tags: [
      "WordPress",
      "PHP",
      "Gutenberg",
      "ACF",
      "WooCommerce",
      "REST API",
      "WCAG 2.2",
      "Web Animations",
    ],
    year: "2026",
    featured: true,
    caseStudy: true,
    links: {
      live:
        "https://playground.wordpress.net/?blueprint-url=https%3A%2F%2Fraw.githubusercontent.com%2Fnovanr511%2Fportfolio-web%2Fmain%2Fwp-theme%2Fblueprint.json",
      source: "https://github.com/novanr511/portfolio-web/tree/main/wp-theme",
    },
  },
];
