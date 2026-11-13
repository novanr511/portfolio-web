"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";

const nav = [
  { href: "/", label: "Home" },
  { href: "/articles", label: "Articles" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  return (
    <header
      style={{ viewTransitionName: "site-header" }}
      className="sticky top-0 z-50 border-b border-border bg-background/75 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          transitionTypes={["nav-back"]}
          className="text-[17px] font-semibold tracking-tight text-foreground"
        >
          Novan<span className="text-accent">.</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 sm:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              transitionTypes={[isActive(item.href) ? "nav-back" : "nav-forward"]}
              className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-300 ${
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
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted hover:bg-surface hover:text-foreground"
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
              {open ? (
                <path d="M5 5l14 14M19 5L5 19" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-border transition-[max-height] duration-300 ease-out sm:hidden ${
          open ? "max-h-64" : "max-h-0 border-t-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-4 py-3" aria-label="Mobile">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-xl px-4 py-2.5 text-[15px] font-medium transition-colors ${
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
