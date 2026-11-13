export type Article = {
  slug: string;
  title: string;
  /** Short summary used in cards, meta description, and JSON-LD */
  description: string;
  /** ISO date (published) */
  date: string;
  /** ISO date (last meaningful update), optional */
  updated?: string;
  tags: string[];
  /** Human-readable, e.g. "12 min read" */
  readingTime: string;
};

/**
 * Add a new article:
 * 1. Create `src/content/articles/<slug>.mdx` with the article body.
 * 2. Add an entry below (newest first). Nothing else to wire up —
 *    lists, sitemap, RSS, and OG images pick it up automatically.
 */
export const articles: Article[] = [
  {
    slug: "how-to-start-learning-ai",
    title: "How to Actually Start Learning AI as a Developer in 2026",
    description:
      "A no-fluff roadmap for developers entering AI and machine learning: what to learn, in what order, what to skip, and how to build a portfolio of AI projects that proves you can do the work.",
    date: "2026-11-08",
    tags: ["AI", "Machine Learning", "Career", "Learning Path"],
    readingTime: "11 min read",
  },
  {
    slug: "rag-explained",
    title: "Retrieval-Augmented Generation, Explained From the Inside Out",
    description:
      "How RAG actually works under the hood — chunking, embeddings, vector search, hybrid retrieval, and reranking — plus the design decisions that separate a demo chatbot from a production system.",
    date: "2026-11-10",
    tags: ["RAG", "Retrieval", "Embeddings", "LLM", "Vector Databases"],
    readingTime: "14 min read",
  },
  {
    slug: "langchain-to-langgraph",
    title: "From LangChain to LangGraph: Building Stateful AI Agents That Don't Fall Apart",
    description:
      "Why chains stop scaling when agents get real, how LangGraph models agent state as a graph, and the patterns — checkpoints, human-in-the-loop, subgraphs — that make long-running agents reliable.",
    date: "2026-11-13",
    tags: ["LangGraph", "LangChain", "Agents", "LLM", "Python"],
    readingTime: "13 min read",
  },
];

export const sortedArticles = [...articles].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

export function getArticle(slug: string): Article | undefined {
  return sortedArticles.find((a) => a.slug === slug);
}

export function getAdjacentArticles(slug: string): {
  newer: Article | undefined;
  older: Article | undefined;
} {
  const idx = sortedArticles.findIndex((a) => a.slug === slug);
  return {
    newer: idx > 0 ? sortedArticles[idx - 1] : undefined,
    older:
      idx >= 0 && idx < sortedArticles.length - 1
        ? sortedArticles[idx + 1]
        : undefined,
  };
}
