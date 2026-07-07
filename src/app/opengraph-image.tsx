import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0b0b0d",
          color: "#f5f4f1",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: "#ff6a3d",
            fontFamily: "monospace",
            marginBottom: 24,
          }}
        >
          {site.name}
        </div>
        <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.15, maxWidth: 1000 }}>
          {site.headline}
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 40 }}>
          {site.roleTags.map((tag) => (
            <div
              key={tag}
              style={{
                fontSize: 20,
                border: "1px solid #242427",
                borderRadius: 999,
                padding: "8px 20px",
                color: "#9a9a9f",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
