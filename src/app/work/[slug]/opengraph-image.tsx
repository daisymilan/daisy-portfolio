import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { getProjectBySlug } from "@/content/projects";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

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
        <div style={{ fontSize: 22, color: "#4fd1ff", fontFamily: "monospace" }}>
          {project?.category ?? "Case Study"}
        </div>
        <div style={{ fontSize: 60, fontWeight: 700, marginTop: 20, maxWidth: 1000 }}>
          {project?.name ?? site.name}
        </div>
        <div style={{ fontSize: 26, color: "#9a9a9f", marginTop: 24, maxWidth: 900 }}>
          {project?.summary ?? site.headline}
        </div>
        <div style={{ fontSize: 20, color: "#63636a", marginTop: 48, fontFamily: "monospace" }}>
          {site.name}
        </div>
      </div>
    ),
    { ...size }
  );
}
