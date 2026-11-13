import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
        <div
          style={{
            display: "flex",
            fontSize: 22,
            fontWeight: 600,
            color: "#264a80",
          }}
        >
          Novan.
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 64,
              fontWeight: 700,
              color: "#1d1d1f",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            Frontend engineering meets
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 64,
              fontWeight: 700,
              color: "#264a80",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            data science &amp; AI.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 26,
              color: "#6e6e73",
            }}
          >
            Articles on AI, RAG, LangChain &amp; LangGraph
          </div>
        </div>
        <div
          style={{
            display: "flex",
            height: 10,
            width: "100%",
            borderRadius: 5,
            backgroundColor: "#264a80",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
