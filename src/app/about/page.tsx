import type { Metadata } from "next";
import Link from "next/link";
import { ViewTransition } from "react";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Novandri R.: a web developer and SEO specialist from Jakarta with years of WordPress and search work, now transitioning into data science and applied AI.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — Novandri R.",
    description:
      "Web developer and SEO specialist from Jakarta, now transitioning into data science and applied AI.",
  },
};

const focus = [
  {
    title: "Web Platforms",
    description:
      "Production websites and platforms built on Next.js and React — fast, accessible, and maintainable. Years of WordPress work when a real editorial workflow is what the team needs.",
    tags: ["Next.js", "React", "WordPress", "TypeScript", "Tailwind"],
  },
  {
    title: "SEO & Web Performance",
    description:
      "Technical SEO as an engineering discipline — crawled, indexed, and fast. I've done it for the Ministry of Health of Indonesia and dozens of client sites, and I bring the same measurement mindset to Core Web Vitals.",
    tags: ["Technical SEO", "Core Web Vitals", "Caching", "Structured Data"],
  },
  {
    title: "Data Science & AI (in progress)",
    description:
      "The current chapter: Python and pandas fluency, classical ML with scikit-learn, and applied AI systems — RAG pipelines, evaluations, and agents with LangChain and LangGraph.",
    tags: ["Python", "scikit-learn", "RAG", "LangGraph", "Pandas"],
  },
];

export default function AboutPage() {
  return (
    <ViewTransition
      enter={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      exit={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      default="none"
    >
      <div className="mx-auto max-w-5xl px-6 pb-24 pt-16 sm:pt-24">
        <Reveal>
          <h1 className="text-[36px] font-semibold leading-tight tracking-[-0.02em] text-foreground sm:text-[44px]">
            About
          </h1>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-8 max-w-2xl space-y-5 text-[16px] leading-relaxed text-muted">
            <p>
              I&apos;m {site.author.name}, based in {site.location}. I&apos;ve
              been building for the web since 2020 — starting as a freelance
              WordPress developer, then working with studios, law firms, and
              startups, alongside technical support and SEO roles at
              Niagahoster and the Ministry of Health of Indonesia.
            </p>
            <p>
              That SEO work quietly changed how I think: rankings are just
              measurement, content, and engineering discipline compounded over
              time. At some point the most interesting part of the job stopped
              being the framework and started being the data — so I made the
              transition deliberate. I&apos;m now learning data science and
              applied AI in public, building retrieval-augmented systems,
              training classical ML models, and writing about everything that
              breaks along the way.{" "}
              <Link
                href="/articles"
                transitionTypes={["nav-forward"]}
                className="font-medium text-accent hover:underline"
              >
                The articles
              </Link>{" "}
              are that learning process, distilled.
            </p>
            <p>
              My conviction is that the best AI engineers come from exactly
              this path: people who have shipped production web software, who
              understand how search and measurement actually work, and who now
              aim that discipline at a stack that badly needs it. Lifelong
              learning is the whole method — the rest is just repertoire.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {focus.map((item, i) => (
            <Reveal key={item.title} delay={i * 90}>
              <div className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6">
                <h2 className="text-[16px] font-semibold tracking-tight text-foreground">
                  {item.title}
                </h2>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">
                  {item.description}
                </p>
                <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-background px-2.5 py-0.5 text-[11px] font-medium text-accent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-14 rounded-2xl border border-border bg-surface px-7 py-8">
            <h2 className="text-[18px] font-semibold tracking-tight text-foreground">
              Get in touch
            </h2>
            <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-muted">
              Whether it&apos;s web development, SEO, a data science role, or
              something at the intersection — I&apos;d love to hear from you.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-accent px-5 py-2.5 text-[13.5px] font-medium text-accent-contrast transition-colors hover:bg-accent-strong"
              >
                LinkedIn ↗
              </a>
              <a
                href={site.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-border px-5 py-2.5 text-[13.5px] font-medium text-foreground transition-colors hover:border-accent/40 hover:text-accent"
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </ViewTransition>
  );
}
