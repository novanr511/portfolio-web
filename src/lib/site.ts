export const site = {
  name: "Novandri",
  /** Short wordmark used in the header/footer logo */
  wordmark: "Novandri.",
  title: "Rachmadwipa Novandri — Web Developer & SEO Specialist",
  description:
    "Portfolio of Rachmadwipa Novandri, a Jakarta web developer and SEO specialist building with Next.js and WordPress, learning data science and applied AI.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.NODE_ENV === "production"
      ? "https://novandri.com"
      : "http://localhost:3000"),
  locale: "en_US",
  location: "Jakarta, Indonesia",
  author: {
    /** One canonical entity name used in bylines, schema, and metadata. */
    name: "Rachmadwipa Novandri",
    penName: "Rachmadwipa Novandri",
    jobTitle: "Web Developer & SEO Specialist",
  },
  social: {
    github: "https://github.com/novanr511",
    linkedin: "https://www.linkedin.com/in/novandri511/",
  },
  contact: {
    email: "novandri511@gmail.com",
    /** Stored without the leading "+" for the wa.me deep link. */
    whatsapp: "6285155426779",
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
