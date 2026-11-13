export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  year: string;
  featured?: boolean;
  links: { live?: string; source?: string };
};

/**
 * Add or edit projects here. Entries with `featured: true`
 * appear in the "Highlighted work" section on the home page.
 */
export const projects: Project[] = [
  {
    slug: "headless-wordpress-platform",
    name: "Headless WordPress Content Platform",
    tagline: "WordPress as a CMS, Next.js as the frontend",
    description:
      "Rebuilt a WordPress site as a headless stack: editors keep the WordPress workflow they know, while a statically generated Next.js frontend serves content from the edge. Page loads dropped from seconds to near-instant, and the editorial team lost nothing in the transition.",
    tags: ["Next.js", "WordPress", "Headless CMS", "Vercel"],
    year: "2026",
    featured: true,
    links: { live: "https://example.com", source: "https://github.com/novan" },
  },
  {
    slug: "support-rag-assistant",
    name: "Customer-Support RAG Assistant",
    tagline: "A retrieval-augmented assistant over product docs",
    description:
      "Built a RAG pipeline that answers customer-support questions from product documentation: documents chunked and embedded, retrieved with hybrid vector + keyword search, reranked, then synthesized by an LLM with citations. Includes a small evaluation harness that measures retrieval hit-rate against a question set.",
    tags: ["Python", "LangChain", "RAG", "Embeddings", "FastAPI"],
    year: "2026",
    featured: true,
    links: { source: "https://github.com/novan" },
  },
  {
    slug: "multi-site-wordpress-performance",
    name: "Multi-Site WordPress Performance Overhaul",
    tagline: "Largest Contentful Paint cut from 4.2s to 1.6s",
    description:
      "Audited and rebuilt a network of WordPress sites: asset pipeline cleanup, image strategy, database query optimization, and full-page caching at the edge. Core Web Vitals moved from failing to comfortably green across every property in the network.",
    tags: ["WordPress", "PHP", "Performance", "Core Web Vitals"],
    year: "2025",
    links: { live: "https://example.com" },
  },
  {
    slug: "churn-prediction-notebook",
    name: "Customer Churn Prediction",
    tagline: "From raw CSV to a model you can explain",
    description:
      "An end-to-end machine learning workflow on a telecom churn dataset: exploratory analysis, feature engineering, gradient-boosted tree models, threshold selection tied to business cost, and a SHAP-based explanation layer so the results are actually usable by a non-technical audience.",
    tags: ["Python", "scikit-learn", "Pandas", "SHAP", "Jupyter"],
    year: "2025",
    links: { source: "https://github.com/novan" },
  },
];
