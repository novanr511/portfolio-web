export const site = {
  name: "Novan",
  title: "Novan — Frontend Engineer & Aspiring Data Scientist",
  description:
    "Portfolio of Novan, a frontend engineer building websites with Next.js and WordPress, now diving into data science, machine learning, and applied AI. Practical articles on AI, RAG, LangChain, and LangGraph.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en_US",
  author: {
    name: "Novan",
    jobTitle: "Frontend Engineer",
  },
  social: {
    email: "hello@novan.dev",
    github: "https://github.com/novan",
    linkedin: "https://www.linkedin.com/in/novan",
  },
  /** Copyright year — bump it when the site is next updated */
  year: 2026,
  keywords: [
    "Novan",
    "frontend engineer",
    "Next.js developer",
    "WordPress developer",
    "data science",
    "machine learning",
    "RAG",
    "LangChain",
    "LangGraph",
    "AI engineering",
  ],
} as const;
