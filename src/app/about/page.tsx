import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Timeline } from "@/components/about/timeline";
import { skillCategories } from "@/content/skills";
import { certifications, education } from "@/content/timeline";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "From running e-commerce operations to building AI agents and automation platforms — the story behind the work.",
};

const storyBeats = [
  {
    label: "Before",
    title: "I ran the businesses that needed automation.",
    body: "Before I wrote a line of production code, I managed Shopify stores, ran Meta ad campaigns, and built lead-generation systems by hand. I know what a manual process costs because I was the one doing it — copying data between tools, chasing leads, reconciling spreadsheets at the end of the day.",
  },
  {
    label: "The Shift",
    title: "I taught myself to build the tools I used to need.",
    body: "In 2024 I went through a full-stack development bootcamp and immediately pointed it at the hardest, most useful problems I knew: AI agents and workflow orchestration, not tutorial apps. The operational background meant I already knew which automations were actually worth building.",
  },
  {
    label: "Now",
    title: "I build production AI systems and automation platforms.",
    body: "Today I design and ship AI-powered workflows, business automations, and full-stack applications — voice agents that triage calls, compliance pipelines that run unattended, and dashboards that replace spreadsheets. The goal is always the same: systems that keep working after I walk away.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Section className="pt-20 sm:pt-28">
        <Container>
          <Reveal>
            <SectionHeading
              as="h1"
              eyebrow="About"
              title="An operator who learned to build."
              description={site.bio}
            />
          </Reveal>

          <div className="mt-14 space-y-12">
            {storyBeats.map((beat, i) => (
              <Reveal key={beat.label} delay={i * 0.05} className="grid gap-4 sm:grid-cols-[120px_1fr]">
                <p className="font-mono text-xs uppercase tracking-widest text-accent-start">
                  {beat.label}
                </p>
                <div>
                  <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
                    {beat.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                    {beat.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-t border-border bg-surface/40">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Path" title="Experience" />
          </Reveal>
          <div className="mt-12">
            <Timeline />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Toolkit" title="Skills" />
          </Reveal>
          <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2">
            {skillCategories.map((group) => (
              <RevealItem
                key={group.category}
                className="rounded-2xl border border-border bg-surface p-6"
              >
                <h3 className="text-base font-semibold text-foreground">
                  {group.category}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted"
                    >
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
          <div className="grid gap-10 sm:grid-cols-2">
            <Reveal>
              <SectionHeading eyebrow="Education" title="Learning path" />
              <ul className="mt-6 space-y-4">
                {education.map((item) => (
                  <li key={item.title}>
                    <p className="text-sm font-medium text-foreground">
                      {item.title}
                    </p>
                    <p className="text-sm text-muted">{item.org}</p>
                    {item.description && (
                      <p className="mt-1 text-sm text-muted">
                        {item.description}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.05}>
              <SectionHeading eyebrow="Certifications" title="Training" />
              <ul className="mt-6 space-y-2">
                {certifications.map((cert) => (
                  <li key={cert} className="text-sm text-muted">
                    {cert}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
