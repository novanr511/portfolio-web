import type { Metadata } from "next";
import Content from "@/content/data-analytics/hr-attrition.mdx";
import { AnalyticsDemoPage } from "@/components/analytics-demo-page";
import { analyticsWork } from "@/lib/data-analytics";

const work = analyticsWork.find((w) => w.slug === "hr-attrition")!;

export const metadata: Metadata = {
  title: work.name,
  description: work.summary,
  alternates: { canonical: `/data-analytics/${work.slug}` },
};

export default function Page() {
  return (
    <AnalyticsDemoPage work={work}>
      <Content />
    </AnalyticsDemoPage>
  );
}
