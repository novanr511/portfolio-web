import type { Metadata } from "next";
import Link from "next/link";
import { ViewTransition } from "react";
import { Reveal } from "@/components/reveal";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Project case studies are in progress. Selected work in web development, WordPress, Next.js, and applied AI will be published here.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects — Novandri R.",
    description:
      "Case studies are being prepared; articles cover the same areas from the inside.",
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
          <h1 className="text-[36px] font-semibold leading-tight tracking-[-0.02em] text-foreground sm:text-[44px]">
            Projects
          </h1>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-muted">
            Work I&apos;m proud of — from shipping production web platforms to
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
              <>
                <Reveal>
                  <h2 className="mt-14 text-[12px] font-semibold uppercase tracking-widest text-muted">
                    Highlighted
                  </h2>
                </Reveal>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  {featured.map((project, i) => (
                    <Reveal key={project.slug} delay={i * 90}>
                      <ProjectCard project={project} />
                    </Reveal>
                  ))}
                </div>
              </>
            )}

            {others.length > 0 && (
              <>
                <Reveal>
                  <h2 className="mt-16 text-[12px] font-semibold uppercase tracking-widest text-muted">
                    More work
                  </h2>
                </Reveal>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  {others.map((project, i) => (
                    <Reveal key={project.slug} delay={i * 90}>
                      <ProjectCard project={project} />
                    </Reveal>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </ViewTransition>
  );
}
