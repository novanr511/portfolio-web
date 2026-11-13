import type { Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-surface p-7">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-tint px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-accent">
          {project.year}
        </span>
        <div className="flex gap-4 text-[13px] font-medium">
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent transition-opacity hover:opacity-70"
            >
              Live ↗
            </a>
          )}
          {project.links.source && (
            <a
              href={project.links.source}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent transition-opacity hover:opacity-70"
            >
              Source ↗
            </a>
          )}
        </div>
      </div>
      <h3 className="mt-4 text-[19px] font-semibold tracking-tight text-foreground">
        {project.name}
      </h3>
      <p className="mt-1 text-[13.5px] font-medium text-accent">
        {project.tagline}
      </p>
      <p className="mt-3 text-[14px] leading-relaxed text-muted">
        {project.description}
      </p>
      <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-background px-2.5 py-0.5 text-[11px] font-medium text-muted"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
