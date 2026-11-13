import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-[15px] font-semibold tracking-tight text-foreground">
            {site.wordmark.replace(/\.$/, "")}
            <span className="text-accent">.</span>
          </p>
          <p className="mt-1.5 max-w-xs text-[13px] leading-relaxed text-muted">
            Web developer and SEO specialist in Jakarta, learning data science
            and applied AI in public.
          </p>
        </div>
        <nav
          className="flex flex-col gap-2 text-[13px] sm:items-end"
          aria-label="Footer"
        >
          <Link
            href="/articles"
            className="text-muted transition-colors hover:text-accent"
          >
            Articles
          </Link>
          <Link
            href="/projects"
            className="text-muted transition-colors hover:text-accent"
          >
            Projects
          </Link>
          <Link
            href="/about"
            className="text-muted transition-colors hover:text-accent"
          >
            About
          </Link>
          <a
            href="/feed.xml"
            className="text-muted transition-colors hover:text-accent"
          >
            RSS feed
          </a>
          <a
            href={site.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-accent"
          >
            LinkedIn ↗
          </a>
        </nav>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-5">
          <p className="text-[12px] text-muted">
            © {site.year} {site.name}. Built with Next.js.
          </p>
        </div>
      </div>
    </footer>
  );
}
