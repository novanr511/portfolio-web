import type { Metadata } from "next";
import Content from "@/content/data-analytics/msft-finance-model.mdx";
import { AnalyticsDemoPage } from "@/components/analytics-demo-page";
import { analyticsWork } from "@/lib/data-analytics";

const work = analyticsWork.find((w) => w.slug === "msft-finance-model")!;

export const metadata: Metadata = {
  title: work.name,
  description: work.summary,
  alternates: { canonical: `/data-analytics/${work.slug}` },
  openGraph: {
    title: `${work.name} — Novandri R.`,
    description: work.summary,
    url: `/data-analytics/${work.slug}`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${work.name} — Novandri R.`,
    description: work.summary,
  },
};

export default function Page() {
  return (
    <AnalyticsDemoPage work={work}>
      <Content />
    </AnalyticsDemoPage>
  );
}
