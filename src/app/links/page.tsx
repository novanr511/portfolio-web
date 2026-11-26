import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Links",
  description:
    "A short list of links from Novandri R., including the Pindah Karir YouTube channel and the Urunan untuk Hutan fundraiser.",
  alternates: { canonical: "/links" },
  openGraph: {
    title: `Links: ${site.author.penName}`,
    description:
      "The Pindah Karir YouTube channel and the Urunan untuk Hutan fundraiser.",
    url: "/links",
  },
  twitter: {
    card: "summary_large_image",
    title: `Links: ${site.author.penName}`,
    description:
      "The Pindah Karir YouTube channel and the Urunan untuk Hutan fundraiser.",
  },
};

const links = [
  {
    label: "YouTube",
    title: "Pindah Karir",
    note: "Watch the channel.",
    href: "https://www.youtube.com/@pindah_karir",
    action: "Watch on YouTube",
  },
  {
    label: "Fundraiser",
    title: "Urunan untuk Hutan",
    note: "Open the campaign page.",
    href: "https://kitabisa.com/campaign/patunganuntukhutan?utm_source=socialsharing_donor_web_undefined&utm_medium=share_campaign_copas&utm_campaign=share_detail_campaign",
    action: "Open the campaign",
  },
];

export default function LinksPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 pb-24 pt-16 sm:pt-24">
      <p className="page-eyebrow">Links</p>
      <h1 className="page-title mt-5">A short list.</h1>

      <ul className="mt-12 grid gap-4">
        {links.map((link, i) => (
          <li key={link.href}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="editorial-card group flex min-h-24 flex-col gap-3 rounded-2xl border border-border bg-surface px-6 py-6 transition-colors hover:border-accent/40 hover:bg-tint focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:flex-row sm:items-center sm:justify-between"
            >
              <span className="flex min-w-0 items-start gap-4">
                <span className="mt-1 text-[12px] font-medium tabular-nums text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0">
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
                    {link.label}
                  </span>
                  <span className="mt-1 block text-[19px] font-semibold tracking-tight text-foreground sm:text-[21px]">
                    {link.title}
                  </span>
                  <span className="mt-1 block text-[13.5px] leading-relaxed text-muted">
                    {link.note}
                  </span>
                </span>
              </span>
              <span className="shrink-0 self-start text-[13px] font-medium text-accent sm:self-center">
                {link.action}
              </span>
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-10 text-[13px] leading-relaxed text-muted">
        For work and writing, see the{" "}
        <a
          href="/about"
          className="font-medium text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          about page
        </a>
        .
      </p>
    </main>
  );
}
