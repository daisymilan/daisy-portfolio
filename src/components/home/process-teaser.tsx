import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { process } from "@/content/site";

export function ProcessTeaser() {
  return (
    <Section>
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="How I Work"
            title="Three steps, no surprises."
          />
        </Reveal>

        <RevealGroup className="mt-12 grid gap-8 sm:grid-cols-3">
          {process.map((item) => (
            <RevealItem key={item.step}>
              <p className="font-mono text-sm text-accent-start">{item.step}</p>
              <h3 className="mt-3 text-xl font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1} className="mt-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-1 text-sm font-medium text-foreground hover:text-accent-start"
          >
            See how I work with clients <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </Container>
    </Section>
  );
}
