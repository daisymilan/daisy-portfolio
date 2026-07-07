import { cn } from "@/lib/utils";

export function Section({
  className,
  children,
  id,
  ...props
}: React.ComponentPropsWithoutRef<"section"> ) {
  return (
    <section
      id={id}
      className={cn("py-20 sm:py-28", className)}
      {...props}
    >
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  as = "h2",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  as?: "h1" | "h2";
}) {
  const HeadingTag = as;
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow && (
        <p className="font-mono text-xs uppercase tracking-widest text-accent-start">
          {eyebrow}
        </p>
      )}
      <HeadingTag
        className={cn(
          "mt-3 font-semibold tracking-tight text-foreground",
          as === "h1" ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl"
        )}
      >
        {title}
      </HeadingTag>
      {description && (
        <p className="mt-4 text-base text-muted sm:text-lg">{description}</p>
      )}
    </div>
  );
}
