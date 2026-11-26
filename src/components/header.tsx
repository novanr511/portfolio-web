"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { site } from "@/lib/site";

const nav = [
  { href: "/", label: "Home" },
  { href: "/articles", label: "Articles" },
  { href: "/about", label: "About" },
];

const projectLinks = [
  { href: "/projects", label: "All projects", description: "Case studies across web and Applied AI" },
  { href: "/data-analytics", label: "Data Analytics", description: "SQL, company finance, and public-data analysis" },
];

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  const projectsActive =
    pathname.startsWith("/projects") || pathname.startsWith("/data-analytics");

  return (
    <header
      style={{ viewTransitionName: "site-header" }}
      className="sticky top-0 z-50 border-b border-border bg-background/75 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          transitionTypes={["nav-back"]}
          className="inline-flex min-h-11 items-center text-[17px] font-semibold tracking-tight text-foreground"
        >
          {site.wordmark.replace(/\.$/, "")}
          <span className="text-accent">.</span>
        </Link>

        {/* Desktop nav: Data Analytics lives under Projects */}
        <nav className="hidden items-center gap-1 sm:flex" aria-label="Primary">
          {nav.slice(0, 2).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              transitionTypes={[isActive(item.href) ? "nav-back" : "nav-forward"]}
              className={`inline-flex min-h-11 items-center rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-300 ${
                isActive(item.href)
                  ? "bg-tint text-accent"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setProjectsOpen(true)}
            onMouseLeave={() => setProjectsOpen(false)}
          >
            <button
              type="button"
              aria-expanded={projectsOpen}
              aria-controls="projects-submenu"
              onClick={() => setProjectsOpen((v) => !v)}
              onKeyDown={(e) => {
                if (e.key === "Escape") setProjectsOpen(false);
              }}
              className={`inline-flex min-h-11 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-300 ${
                projectsActive
                  ? "bg-tint text-accent"
                  : "text-muted hover:text-foreground"
              }`}
            >
              Projects
              <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                <path d="M2 4l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button>

            {projectsOpen && (
              <div
                id="projects-submenu"
                className="absolute right-0 top-full z-50 w-64 rounded-xl border border-border bg-background p-1.5 shadow-lg"
              >
                {projectLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    transitionTypes={["nav-forward"]}
                    onClick={() => setProjectsOpen(false)}
                    className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-accent"
                  >
                    <span className="block text-[13px] font-medium text-foreground">
                      {item.label}
                    </span>
                    <span className="mt-0.5 block text-[11.5px] leading-snug text-muted">
                      {item.description}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {nav.slice(2).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              transitionTypes={[isActive(item.href) ? "nav-back" : "nav-forward"]}
              className={`inline-flex min-h-11 items-center rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-300 ${
                isActive(item.href)
                  ? "bg-tint text-accent"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="ml-1.5 h-5 w-px bg-border" aria-hidden />
          <ThemeToggle />
        </nav>

        {/* Mobile: toggle + menu button */}
        <div className="flex items-center gap-1 sm:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex h-11 w-11 items-center justify-center rounded-full text-muted hover:bg-surface hover:text-foreground"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              {menuOpen ? (
                <path d="M5 5l14 14M19 5L5 19" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu: Projects expands to reveal Data Analytics */}
      <div
        className={`overflow-hidden border-t border-border transition-[max-height] duration-300 ease-out sm:hidden ${
          menuOpen ? "max-h-[32rem]" : "max-h-0 border-t-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-4 py-3" aria-label="Mobile">
          {nav.slice(0, 2).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`inline-flex min-h-11 items-center rounded-xl px-4 py-2.5 text-[15px] font-medium transition-colors ${
                isActive(item.href)
                  ? "bg-tint text-accent"
                  : "text-muted hover:bg-surface hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}

          <button
            type="button"
            onClick={() => setProjectsOpen((v) => !v)}
            aria-expanded={projectsOpen}
            aria-controls="projects-submenu-mobile"
            className="inline-flex min-h-11 items-center justify-between rounded-xl px-4 py-2.5 text-[15px] font-medium text-muted transition-colors hover:bg-surface hover:text-foreground"
          >
            Projects
            <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
              <path d="M2 4l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
          {projectsOpen && (
            <div id="projects-submenu-mobile" className="ml-3 flex flex-col gap-1 border-l border-border pl-3">
              {projectLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    setProjectsOpen(false);
                    setMenuOpen(false);
                  }}
                  className={`inline-flex min-h-11 items-center rounded-xl px-4 py-2.5 text-[14px] font-medium transition-colors ${
                    isActive(item.href)
                      ? "bg-tint text-accent"
                      : "text-muted hover:bg-surface hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}

          {nav.slice(2).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`inline-flex min-h-11 items-center rounded-xl px-4 py-2.5 text-[15px] font-medium transition-colors ${
                isActive(item.href)
                  ? "bg-tint text-accent"
                  : "text-muted hover:bg-surface hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
