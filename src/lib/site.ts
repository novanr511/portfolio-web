export const site = {
  name: "Novandri R.",
  /** Short wordmark used in the header/footer logo */
  wordmark: "Novandri.",
  title: "Novandri R. — Web Developer, SEO Specialist & Aspiring Data Scientist",
  description:
    "Portfolio of Novandri R., a web developer and SEO specialist from Jakarta building with Next.js and WordPress, now diving into data science, machine learning, and applied AI. Practical articles on AI, RAG, LangChain, and LangGraph.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en_US",
  location: "Jakarta, Indonesia",
  author: {
    name: "Novandri R.",
    /** Full pen name used for article bylines and Article JSON-LD */
    penName: "Rachmadwipa Novandri",
    jobTitle: "Web Developer & SEO Specialist",
  },
  social: {
    github: "https://github.com/novanr511",
    linkedin: "https://www.linkedin.com/in/novandri511/",
  },
  /** Copyright year — bump it when the site is next updated */
  year: 2026,
  keywords: [
    "Novandri",
    "Novan",
    "web developer",
    "frontend engineer",
    "Next.js developer",
    "WordPress developer",
    "SEO specialist",
    "Jakarta",
    "data science",
    "machine learning",
    "RAG",
    "LangChain",
    "LangGraph",
    "AI engineering",
  ],
} as const;
