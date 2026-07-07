import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/projects";
import { TechPill } from "@/components/ui/tech-pill";

export function CaseStudyCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-surface p-8 transition-colors hover:border-accent-start/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-start"
    >
      <div>
        <div className="flex items-start justify-between gap-4">
          <p className="font-mono text-xs uppercase tracking-widest text-accent-start">
            {project.category}
          </p>
          <ArrowUpRight
            className="h-5 w-5 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
            aria-hidden="true"
          />
        </div>
        <h3 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
          {project.name}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {project.summary}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.techStack.slice(0, 4).map((tech) => (
          <TechPill key={tech}>{tech}</TechPill>
        ))}
      </div>
    </Link>
  );
}
