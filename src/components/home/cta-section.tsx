import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { MagneticLink } from "@/components/ui/magnetic-link";

export function CtaSection() {
  return (
    <Section className="border-t border-border">
      <Container>
        <Reveal className="flex flex-col items-start gap-8 rounded-3xl border border-border bg-surface p-10 sm:flex-row sm:items-center sm:justify-between sm:p-14">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Let&rsquo;s build something.
            </h2>
            <p className="mt-3 max-w-md text-muted">
              If there&rsquo;s a process eating your team&rsquo;s time, or an AI feature you
              want built right the first time — let&rsquo;s talk.
            </p>
          </div>
          <MagneticLink
            href="/contact"
            className="bg-foreground text-background hover:opacity-90"
          >
            Get in touch <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </MagneticLink>
        </Reveal>
      </Container>
    </Section>
  );
}
