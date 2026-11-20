import { cn } from "@/lib/utils";

/**
 * CSS-only entrance animation for above-the-fold content (page headers).
 *
 * Unlike <Reveal>, which is driven by Framer Motion and stays invisible until
 * JavaScript loads, this animates on first paint — so headlines show up
 * immediately even on slow phones. Honors prefers-reduced-motion via the
 * global rule in globals.css.
 */
export function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("animate-fade-up", className)}
      style={delay ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
