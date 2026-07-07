"use client";

import { useEffect, useRef } from "react";

export function HeroBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    function onMove(e: PointerEvent) {
      const rect = el!.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el!.style.setProperty("--x", `${x}%`);
      el!.style.setProperty("--y", `${y}%`);
    }

    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="bg-grid pointer-events-none absolute inset-0 overflow-hidden [--x:50%] [--y:20%]"
    >
      <div
        className="absolute inset-0 opacity-40 transition-[background] duration-300"
        style={{
          background:
            "radial-gradient(600px circle at var(--x) var(--y), color-mix(in srgb, var(--accent-start) 18%, transparent), transparent 70%)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
    </div>
  );
}
