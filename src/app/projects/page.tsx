import type { Metadata } from "next";
import Link from "next/link";
import { ViewTransition } from "react";
import { Reveal } from "@/components/reveal";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Project case studies in web development, WordPress, Next.js, and applied AI — from headless platforms and custom WordPress themes to applied machine learning.",
  alternates: { canonical: "/projects" },
  openGraph: {
    siteName: site.name,
    title: "Projects — Novandri R.",
    description:
      "Case studies on WordPress theming, headless platforms and applied machine learning.",
  },
};

export default function ProjectsPage() {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <ViewTransition
      enter={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      exit={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      default="none"
    >
      <div className="mx-auto max-w-5xl px-6 pb-24 pt-16 sm:pt-24">
        <Reveal>
          <p className="page-eyebrow">02 / Work</p>
          <h1 className="page-title mt-5">Projects</h1>
          <p className="page-subtitle mt-4 max-w-2xl">
            Work I&apos;m proud of, from shipping production web platforms to
            the data science projects marking my transition into AI.
          </p>
        </Reveal>

        {projects.length === 0 ? (
          <Reveal>
            <div className="mt-16 rounded-3xl border border-dashed border-border bg-surface/60 px-8 py-16 text-center">
              <p className="text-[20px] font-semibold tracking-tight text-foreground sm:text-[24px]">
                Case studies in progress.
              </p>
              <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-muted">
                I&apos;m writing up selected work right now — from headless
                WordPress platforms to RAG pipelines. In the meantime, the
                articles cover the same ground from the inside.
              </p>
              <Link
                href="/articles"
                transitionTypes={["nav-forward"]}
                className="mt-8 inline-flex rounded-full bg-accent px-6 py-3 text-[14px] font-medium text-accent-contrast transition-colors duration-300 hover:bg-accent-strong"
              >
                Read the articles
              </Link>
            </div>
          </Reveal>
        ) : (
          <>
            {featured.length > 0 && (
              <div className="page-band mt-14 -mx-6 px-6 py-10">
                <Reveal>
                  <p className="page-eyebrow">Featured</p>
                  <h2 className="page-title mt-3 text-[28px]">Highlighted</h2>
                </Reveal>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  {featured.map((project, i) => (
                    <Reveal key={project.slug} delay={i * 90}>
                      <ProjectCard project={project} />
                    </Reveal>
                  ))}
                </div>
              </div>
            )}

            {others.length > 0 && (
              <>
                <Reveal>
                  <h2 className="page-eyebrow mt-16">
                    More work
                  </h2>
                </Reveal>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  {others.map((project, i) => (
                    <Reveal key={project.slug} delay={i * 90}>
                      <ProjectCard project={project} />
                    </Reveal>
                  ))}
                  <Reveal delay={others.length * 90}>
                    <Link
                      href="/data-analytics"
                      transitionTypes={["nav-forward"]}
                      className="editorial-card group flex h-full flex-col rounded-2xl border border-border bg-surface p-7 transition-colors hover:border-accent/40 hover:bg-tint/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                    >
                      <span className="rounded-full bg-tint px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-accent">
                        2026
                      </span>
                      <h3 className="mt-4 text-[19px] font-semibold tracking-tight text-foreground group-hover:text-accent">
                        Data Analytics
                      </h3>
                      <p className="mt-1 text-[13.5px] font-medium text-accent">
                        Sales, HR, finance, and research work in one place
                      </p>
                      <p className="mt-3 text-[14px] leading-relaxed text-muted">
                        A summary of verified case studies and reproducible
                        public-data demos, including margin leakage in retail,
                        attrition drivers, and risk modeling.
                      </p>
                      <div className="mt-auto pt-5 text-[13px] font-medium text-accent">
                        Browse data analytics
                      </div>
                    </Link>
                  </Reveal>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </ViewTransition>
  );
}
