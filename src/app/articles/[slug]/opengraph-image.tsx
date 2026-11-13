import { ImageResponse } from "next/og";
import { getArticle } from "@/lib/articles";
import { site } from "@/lib/site";

export const alt = "Article cover";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: "#ffffff",
        }}
      >
        <div style={{ display: "flex", gap: 12 }}>
          {(article?.tags ?? []).slice(0, 3).map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                padding: "8px 18px",
                borderRadius: 999,
                backgroundColor: "#eef3f9",
                color: "#264a80",
                fontSize: 20,
                fontWeight: 600,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 54,
            fontWeight: 700,
            color: "#1d1d1f",
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
          }}
        >
          {article?.title ?? "Article"}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", fontSize: 24, color: "#6e6e73" }}>
            {site.author.name}
            {article ? ` · ${article.readingTime}` : ""}
          </div>
          <div
            style={{
              display: "flex",
              height: 10,
              width: 140,
              borderRadius: 5,
              backgroundColor: "#264a80",
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
