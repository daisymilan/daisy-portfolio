import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { CaseStudyCard } from "@/components/work/case-study-card";
import { ProjectGridCard } from "@/components/work/project-grid-card";
import { featuredProjects, gridProjects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies and projects: AI agents, workflow automation, and full-stack systems built for real business operations.",
};

export default function WorkPage() {
  return (
    <>
      <Section className="pb-0 pt-20 sm:pt-28">
        <Container>
          <Reveal>
            <SectionHeading
              as="h1"
              eyebrow="Work"
              title="Selected case studies."
              description="Five systems worth walking through in depth — architecture, decisions, and what shipped. Everything below is anonymized; no client or company names appear on this site."
            />
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="sr-only">Featured case studies</h2>
          <RevealGroup className="grid gap-6 sm:grid-cols-2">
            {featuredProjects.map((project) => (
              <RevealItem key={project.slug}>
                <CaseStudyCard project={project} />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section className="border-t border-border bg-surface/40">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="More Projects"
              title="Smaller builds, broader range."
              description="Lighter in scope, or QA/consulting rather than a full build — expand each for details."
            />
          </Reveal>

          <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2">
            {gridProjects.map((project) => (
              <RevealItem key={project.slug}>
                <ProjectGridCard project={project} />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>
    </>
  );
}
