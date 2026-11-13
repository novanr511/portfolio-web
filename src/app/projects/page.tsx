import type { Metadata } from "next";
import { ViewTransition } from "react";
import { Reveal } from "@/components/reveal";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected projects by Novan: headless WordPress and Next.js platforms, performance engineering, and data science work — RAG assistants and machine learning models.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects — Novan",
    description:
      "Selected projects: headless WordPress platforms, performance engineering, RAG assistants, and machine learning work.",
  },
};

const featured = projects.filter((p) => p.featured);
const others = projects.filter((p) => !p.featured);

export default function ProjectsPage() {
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
      </div>
    </ViewTransition>
  );
}
