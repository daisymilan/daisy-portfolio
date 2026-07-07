import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { CaseStudyCard } from "@/components/work/case-study-card";
import { featuredProjects } from "@/content/projects";

export function FeaturedWork() {
  const preview = featuredProjects.slice(0, 3);

  return (
    <Section>
      <Container>
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Selected Work"
              title="Systems built to run without me."
              description="A sample of AI agents, automations, and full-stack platforms shipped for real operations — not demos."
            />
            <Link
              href="/work"
              className="hidden items-center gap-1 text-sm font-medium text-foreground hover:text-accent-start sm:inline-flex"
            >
              View all work <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {preview.map((project) => (
            <RevealItem key={project.slug}>
              <CaseStudyCard project={project} />
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-10 sm:hidden">
          <Link
            href="/work"
            className="inline-flex items-center gap-1 text-sm font-medium text-foreground"
          >
            View all work <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
