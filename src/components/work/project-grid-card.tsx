"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Project } from "@/content/projects";
import { TechPill } from "@/components/ui/tech-pill";
import { cn } from "@/lib/utils";

export function ProjectGridCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const panelId = `project-detail-${project.slug}`;

  return (
    <div className="rounded-3xl border border-border bg-surface p-6">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-start justify-between gap-4 text-left"
      >
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-accent-cool">
            {project.category}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-foreground">
            {project.name}
          </h3>
          <p className="mt-2 text-sm text-muted">{project.summary}</p>
        </div>
        <ChevronDown
          className={cn(
            "mt-1 h-5 w-5 shrink-0 text-muted transition-transform",
            open && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>

      <div
        id={panelId}
        className={cn(
          "grid overflow-hidden transition-all duration-300",
          open ? "mt-5 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="min-h-0">
          <p className="text-sm leading-relaxed text-muted">
            {project.overview}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <TechPill key={tech}>{tech}</TechPill>
            ))}
          </div>
          <p className="mt-4 text-sm text-foreground">
            <span className="font-medium">Impact — </span>
            {project.impact}
          </p>
        </div>
      </div>
    </div>
  );
}
