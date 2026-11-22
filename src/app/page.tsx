import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import { HomeMarquee } from "@/components/home-marquee";
import { Reveal } from "@/components/reveal";
import { ArticleCard } from "@/components/article-card";
import { ProjectCard } from "@/components/project-card";
import { categorySlug, getSortedArticles } from "@/lib/articles";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

/** Article inventory is read from the filesystem at render time */
export const instant = false;

/** Home page JSON-LD: Person, WebSite identity lives in the root layout */
function homeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${site.url}/#person`,
        name: site.author.penName,
        jobTitle: site.author.jobTitle,
        url: site.url,
        description: site.description,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Jakarta",
          addressCountry: "ID",
        },
        sameAs: [site.social.github, site.social.linkedin],
      },
    ],
  };
}

export default async function Home() {
  const articles = await getSortedArticles();
  const latest = articles.slice(0, 3);
  const featured = projects.filter((p) => p.featured);

  const topicCounts = new Map<string, number>();
  for (const article of articles) {
    for (const tag of article.tags) {
      topicCounts.set(tag, (topicCounts.get(tag) ?? 0) + 1);
    }
  }
  const topics = [
    ...new Set([
      ...[...topicCounts.entries()]
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .slice(0, 8)
        .map(([tag]) => tag),
      // Explicitly surfaced because they map directly to the work I do.
      "Technical SEO",
      "SEO",
      "Data Analytics",
    ]),
  ];

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

      {/* Hero: identity statement, with a decorative marquee and a real portrait */}
      <section className="home-hero" aria-labelledby="home-heading">
        <div className="home-hero-stage">
          <HomeMarquee name="Novandri" />

          <div className="home-portrait">
            <Image
              src="/novandri-portrait.jpg"
              alt="Portrait of Novandri"
              width={500}
              height={667}
              fetchPriority="high"
              loading="eager"
              sizes="(max-width: 640px) 150px, 250px"
            />
          </div>

          <div className="home-hero-copy">
            <h1 id="home-heading">
              Web developer. SEO specialist. Learning AI in public.
            </h1>
            <p>
              {site.author.name}, based in {site.location}. Building with Next.js
              and WordPress, going deep on data science and applied AI.
            </p>
          </div>

          <div className="home-hero-bar">
            <Link
              href="/articles"
              transitionTypes={["nav-forward"]}
              className="primary"
            >
              Read the writing
            </Link>
            <Link href="/projects" transitionTypes={["nav-forward"]}>
              See the work
            </Link>
          </div>
        </div>
      </section>

      {/* Statement: only facts already in site config */}
      <section className="home-statement border-b border-border">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
          <Reveal>
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-accent">
              01 / Position
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-6 max-w-3xl text-[32px] sm:text-[44px]">
              Practical web work, now with machine learning underneath.
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-muted sm:text-[18px]">
              {site.description}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Work: real featured projects */}
      {featured.length > 0 && (
        <section className="home-work border-b border-border">
          <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
            <Reveal>
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-accent">
                02 / Work
              </p>
              <h2 className="mt-6 text-[32px] sm:text-[44px]">Selected project</h2>
            </Reveal>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {featured.map((project, i) => (
                <Reveal key={project.slug} delay={i * 90}>
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>
            <Reveal>
              <Link
                href="/projects"
                transitionTypes={["nav-forward"]}
                className="mt-8 inline-flex min-h-11 items-center text-[14px] font-medium text-accent transition-opacity hover:opacity-70"
              >
                All projects
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* Focus band: real tags counted from the article bank, shown without numbers */}
      {topics.length > 0 && (
        <section className="home-focus py-20 sm:py-24">
          <div className="mx-auto max-w-5xl px-6">
            <Reveal>
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--band-acc)" }}>
                03 / Focus
              </p>
              <h2 className="mt-6 text-[32px] sm:text-[44px]">
                Topics I keep returning to.
              </h2>
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed opacity-80">
                Drawn from the tags on the writing, not from a list of claimed skills.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <ul className="mt-10 flex flex-wrap gap-2.5">
                {topics.map((topic) => (
                  <li key={topic}>
                    <Link
                      href={`/articles/category/${categorySlug(topic)}`}
                      transitionTypes={["nav-forward"]}
                      className="home-topic"
                    >
                      {topic}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      )}

      {/* Writing: latest real articles */}
      <section className="home-writing border-b border-border">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
          <Reveal>
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-accent">
              04 / Writing
            </p>
            <h2 className="mt-6 text-[32px] sm:text-[44px]">Latest writing</h2>
            <p className="mt-4 text-[15px] text-muted">
              Deep dives on AI, RAG, and agent engineering.
            </p>
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
              className="mt-8 inline-flex min-h-11 items-center text-[14px] font-medium text-accent transition-opacity hover:opacity-70"
            >
              All articles
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Contact: real destinations only */}
      <section className="home-contact">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
          <Reveal>
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-accent">
              05 / Contact
            </p>
            <h2 className="mt-6 text-[32px] sm:text-[52px]">Let&apos;s connect.</h2>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-muted">
              Good conversations about the web, SEO, or applied AI are welcome.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center rounded-full bg-accent px-6 py-3 text-[14px] font-medium text-accent-contrast transition-opacity hover:opacity-90"
              >
                LinkedIn
              </a>
              <a
                href={site.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center rounded-full border border-border px-6 py-3 text-[14px] font-medium text-foreground transition-colors hover:border-accent/40"
              >
                GitHub
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </ViewTransition>
  );
}
