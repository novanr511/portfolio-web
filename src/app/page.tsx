import Link from "next/link";
import { ViewTransition } from "react";
import { Reveal } from "@/components/reveal";
import { ArticleCard } from "@/components/article-card";
import { ProjectCard } from "@/components/project-card";
import { sortedArticles } from "@/lib/articles";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

/** Home page JSON-LD: WebSite + Person — helps both search and AI engines */
function homeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        description: site.description,
        inLanguage: "en",
      },
      {
        "@type": "Person",
        "@id": `${site.url}/#person`,
        name: site.author.name,
        jobTitle: site.author.jobTitle,
        url: site.url,
        description:
          "Web developer and SEO specialist from Jakarta with years of WordPress and search-engine work, now building with Next.js and transitioning into data science and applied AI.",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Jakarta",
          addressCountry: "ID",
        },
        knowsAbout: [
          "Next.js",
          "WordPress",
          "Frontend Development",
          "Search Engine Optimization",
          "Technical SEO",
          "Web Performance",
          "Data Science",
          "Machine Learning",
          "RAG",
          "LangChain",
          "LangGraph",
        ],
        sameAs: [site.social.github, site.social.linkedin],
      },
    ],
  };
}

export default function Home() {
  const latest = sortedArticles.slice(0, 3);
  const featured = projects.filter((p) => p.featured);

  return (
    <ViewTransition
      enter={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      exit={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      default="none"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeJsonLd()).replace(/</g, "\\u003c"),
        }}
      />

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pb-20 pt-20 sm:pt-28">
        <Reveal>
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-[12.5px] font-medium text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-40 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Currently learning data science &amp; applied AI
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="mt-7 max-w-3xl text-[40px] font-semibold leading-[1.08] tracking-[-0.02em] text-foreground sm:text-[56px]">
            I build for the web — and I&apos;m going deep on{" "}
            <span className="text-accent">data science &amp; AI</span>.
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-muted sm:text-[19px]">
            I&apos;m {site.author.name}, a web developer who spent years on
            WordPress builds and SEO — from freelance sites to the Ministry of
            Health — now building with Next.js and going deep on machine
            learning, RAG systems, and AI agents. I write about what I learn
            along the way.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/articles"
              transitionTypes={["nav-forward"]}
              className="rounded-full bg-accent px-6 py-3 text-[14px] font-medium text-accent-contrast transition-colors duration-300 hover:bg-accent-strong"
            >
              Read the articles
            </Link>
            <Link
              href="/projects"
              transitionTypes={["nav-forward"]}
              className="rounded-full border border-border bg-surface px-6 py-3 text-[14px] font-medium text-foreground transition-colors duration-300 hover:bg-tint hover:border-accent/30"
            >
              See my work
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Latest articles */}
      <section className="border-t border-border bg-surface/50">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <Reveal>
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-[28px] font-semibold tracking-[-0.02em] text-foreground sm:text-[32px]">
                  Latest writing
                </h2>
                <p className="mt-2 text-[15px] text-muted">
                  Deep dives on AI, RAG, and agent engineering.
                </p>
              </div>
              <Link
                href="/articles"
                transitionTypes={["nav-forward"]}
                className="hidden shrink-0 text-[14px] font-medium text-accent transition-opacity hover:opacity-70 sm:inline-flex"
              >
                All articles →
              </Link>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((article, i) => (
              <Reveal key={article.slug} delay={i * 90}>
                <ArticleCard article={article} />
              </Reveal>
            ))}
          </div>
          <Reveal>
            <Link
              href="/articles"
              transitionTypes={["nav-forward"]}
              className="mt-8 inline-flex text-[14px] font-medium text-accent sm:hidden"
            >
              All articles →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Highlighted projects */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <Reveal>
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-[28px] font-semibold tracking-[-0.02em] text-foreground sm:text-[32px]">
                  Highlighted work
                </h2>
                <p className="mt-2 text-[15px] text-muted">
                  A selection of projects — from the web stack into the AI stack.
                </p>
              </div>
              <Link
                href="/projects"
                transitionTypes={["nav-forward"]}
                className="hidden shrink-0 text-[14px] font-medium text-accent transition-opacity hover:opacity-70 sm:inline-flex"
              >
                All projects →
              </Link>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {featured.map((project, i) => (
              <Reveal key={project.slug} delay={i * 90}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <Reveal>
            <div className="rounded-3xl bg-accent px-8 py-14 text-center sm:px-16">
              <h2 className="text-[26px] font-semibold tracking-[-0.02em] text-accent-contrast sm:text-[32px]">
                The web today, the models tomorrow.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-accent-contrast/80">
                Want to talk frontend, data science, or where the two meet?
                I&apos;m always up for a good technical conversation.
              </p>
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex rounded-full bg-background px-6 py-3 text-[14px] font-medium text-accent transition-opacity duration-300 hover:opacity-90"
              >
                Connect on LinkedIn
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </ViewTransition>
  );
}
