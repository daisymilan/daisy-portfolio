import { Reveal } from "@/components/ui/reveal";
import { timeline } from "@/content/timeline";

export function Timeline() {
  return (
    <ol className="relative space-y-10 border-l border-border pl-8">
      {timeline.map((entry, i) => (
        <Reveal as="li" key={entry.title} delay={i * 0.05} className="relative">
          <span className="absolute -left-[calc(2rem+1px)] top-1.5 h-2.5 w-2.5 rounded-full bg-accent-start" />
          <p className="font-mono text-xs uppercase tracking-widest text-accent-start">
            {entry.period}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-foreground">
            {entry.title}
          </h3>
          <p className="text-sm text-muted">{entry.org}</p>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
            {entry.description}
          </p>
        </Reveal>
      ))}
    </ol>
  );
}
