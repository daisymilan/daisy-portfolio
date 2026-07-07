"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useTheme } from "next-themes";

export function MermaidDiagram({ chart, className }: { chart: string; className?: string }) {
  const id = useId().replace(/:/g, "");
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: resolvedTheme === "dark" ? "dark" : "neutral",
          fontFamily: "var(--font-geist-mono)",
          themeVariables: {
            primaryColor: "#141416",
            primaryTextColor: resolvedTheme === "dark" ? "#f5f4f1" : "#0b0b0d",
            primaryBorderColor: "#ff6a3d",
            lineColor: resolvedTheme === "dark" ? "#4fd1ff" : "#0f92c4",
            fontSize: "14px",
          },
        });
        const { svg } = await mermaid.render(`mermaid-${id}`, chart);
        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      } catch {
        if (!cancelled) setError(true);
      }
    }

    render();
    return () => {
      cancelled = true;
    };
  }, [chart, id, resolvedTheme]);

  if (error) {
    return (
      <pre className="overflow-x-auto rounded-xl border border-border bg-surface p-4 font-mono text-xs text-muted">
        {chart}
      </pre>
    );
  }

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label="System architecture diagram"
      className={className ?? "flex justify-center overflow-x-auto rounded-2xl border border-border bg-surface p-6"}
    />
  );
}
