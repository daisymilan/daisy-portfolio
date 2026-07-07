import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { MagneticLink } from "@/components/ui/magnetic-link";
import { process } from "@/content/site";
import { engagementFaq, services } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI agents, business process automation, and full-stack application development — how I work with clients.",
};

export default function ServicesPage() {
  return (
    <>
      <Section className="pb-0 pt-20 sm:pt-28">
        <Container>
          <Reveal>
            <SectionHeading
              as="h1"
              eyebrow="Services"
              title="Where I can help."
              description="Four kinds of engagements, all pointed at the same outcome: less manual work, more reliable systems."
            />
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Container>
          <RevealGroup className="grid gap-6 sm:grid-cols-2">
            {services.map((service) => (
              <RevealItem
                key={service.title}
                className="rounded-3xl border border-border bg-surface p-8"
              >
                <h2 className="text-xl font-semibold text-foreground">
                  {service.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {service.description}
                </p>
                <ul className="mt-5 space-y-2">
                  {service.deliverables.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-muted"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-start" />
                      {item}
                    </li>
                  ))}
                </ul>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section className="border-t border-border bg-surface/40">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Process" title="How an engagement runs" />
          </Reveal>
          <RevealGroup className="mt-10 grid gap-8 sm:grid-cols-3">
            {process.map((item) => (
              <RevealItem key={item.step}>
                <p className="font-mono text-sm text-accent-start">{item.step}</p>
                <h3 className="mt-3 text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal>
            <SectionHeading eyebrow="FAQ" title="Common questions" />
          </Reveal>
          <RevealGroup className="mt-10 divide-y divide-border rounded-3xl border border-border bg-surface">
            {engagementFaq.map((item) => (
              <RevealItem key={item.question} className="p-6">
                <h3 className="text-base font-medium text-foreground">
                  {item.question}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.answer}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section className="border-t border-border">
        <Container>
          <Reveal className="flex flex-col items-start gap-8 rounded-3xl border border-border bg-surface p-10 sm:flex-row sm:items-center sm:justify-between sm:p-14">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Have a process worth automating?
              </h2>
              <p className="mt-3 max-w-md text-muted">
                Tell me what&rsquo;s slow or manual today — I&rsquo;ll tell you honestly whether automation is worth it.
              </p>
            </div>
            <MagneticLink
              href="/contact"
              className="bg-foreground text-background hover:opacity-90"
            >
              Start a conversation <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </MagneticLink>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
