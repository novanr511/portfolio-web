import type { Metadata } from "next";
import { ViewTransition } from "react";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "What this site stores, when analytics runs, and the local browser keys it uses — a plain note for novandri.com.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    siteName: site.name,
    title: "Privacy — Novandri",
    description:
      "What this site stores, when analytics runs, and the local browser keys it uses.",
  },
};

const sections = [
  {
    title: "Analytics, only after you opt in",
    body: "If you choose “Accept analytics”, this site loads Google Tag Manager (container GTM-5C6D2KTN), which can then run Google Analytics tags. Those tags may collect the pages you view, the referring page, your browser and device type, an approximate region derived from your IP address, and interactions such as clicks. Google processes that data under its own terms; on my side it appears only as aggregated reports in the Google interface, not as a list of named visitors, and I do not use it for advertising.",
  },
  {
    title: "Nothing stored before consent",
    body: "Before you make a choice, Consent Mode v2 keeps ad_storage, analytics_storage, ad_user_data and ad_personalization set to denied. The GTM script itself may load, but with those signals denied it does not write analytics cookies such as _ga or send analytics events. Choosing “Reject” simply leaves those defaults in place. Your choice is saved locally and applied again on later visits.",
  },
  {
    title: "Local browser storage",
    body: "This site writes two keys to localStorage, both of which stay in your browser and are never sent to a server by this site: “theme” remembers your light/dark preference, and “novan-consent” remembers your analytics choice so the banner does not reappear on every page. Clearing site data in your browser removes both.",
  },
  {
    title: "No account, no database",
    body: "This is a static site. The articles, projects and pages are files, served as-is. There is no sign-in, no comment form, and no server-side database of visitors operated by this site. There is nothing to register for and nothing to delete from an account, because there are no accounts.",
  },
];

export default function PrivacyPage() {
  return (
    <ViewTransition
      enter={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      exit={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      default="none"
    >
      <div className="mx-auto max-w-5xl px-6 pb-24 pt-16 sm:pt-24">
        <Reveal>
          <p className="page-eyebrow">04 / Privacy</p>
          <h1 className="page-title mt-5">Privacy</h1>
          <p className="page-subtitle mt-4 max-w-2xl">
            A short, plain note on what this site stores and when.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-10 max-w-2xl space-y-5 text-[16px] leading-relaxed text-muted">
            <p>
              This is a personal portfolio written and maintained by{" "}
              {site.author.name} in {site.location}. This page was added on 22
              November 2026 to describe what the site actually does. It is a
              description of current behaviour, not legal advice and not a
              claim of compliance with any specific regulation.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {sections.map((section, i) => (
            <Reveal key={section.title} delay={i * 90}>
              <section className="editorial-card flex h-full flex-col rounded-2xl border border-border bg-surface p-6">
                <p className="page-eyebrow">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-2 text-[16px] font-semibold tracking-tight text-foreground">
                  {section.title}
                </h2>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">
                  {section.body}
                </p>
              </section>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="editorial-card mt-14 rounded-2xl border border-border bg-surface px-7 py-8">
            <h2 className="page-title text-[24px]">Questions</h2>
            <p className="page-subtitle mt-2 max-w-xl text-[14px]">
              If something here is unclear or you would like a detail corrected,
              you can reach me directly.
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
