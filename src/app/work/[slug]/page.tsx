import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Lightbulb, Rocket } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { TechPill } from "@/components/ui/tech-pill";
import { MermaidDiagram } from "@/components/ui/mermaid-diagram";
import { CaseStudyCard } from "@/components/work/case-study-card";
import { featuredProjects, getProjectBySlug } from "@/content/projects";

export function generateStaticParams() {
  return featuredProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.name,
    description: project.summary,
    openGraph: {
      title: project.name,
      description: project.summary,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project || !project.featured) notFound();

  const related = featuredProjects
    .filter((p) => p.slug !== project.slug)
    .slice(0, 2);

  return (
    <>
      <Section className="pb-0 pt-16 sm:pt-24">
        <Container>
          <Reveal>
            <Link
              href="/work"
              className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Work
            </Link>

            <p className="mt-6 font-mono text-xs uppercase tracking-widest text-accent-start">
              {project.category}
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              {project.name}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted">
              {project.summary}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <TechPill key={tech}>{tech}</TechPill>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 sm:grid-cols-3">
            <Reveal>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">
                Overview
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {project.overview}
              </p>
            </Reveal>
            {project.problem && (
              <Reveal delay={0.05}>
                <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">
                  Problem
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {project.problem}
                </p>
              </Reveal>
            )}
            {project.businessGoal && (
              <Reveal delay={0.1}>
                <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">
                  Business Goal
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {project.businessGoal}
                </p>
              </Reveal>
            )}
          </div>
        </Container>
      </Section>

      {project.architectureDiagram && (
        <Section className="border-t border-border bg-surface/40">
          <Container>
            <Reveal>
              <SectionHeading eyebrow="Architecture" title="System design" />
            </Reveal>
            <Reveal delay={0.1} className="mt-10">
              <MermaidDiagram chart={project.architectureDiagram} />
            </Reveal>
            {project.solution && (
              <Reveal delay={0.15} className="mt-8 max-w-3xl">
                <p className="text-sm leading-relaxed text-muted">
                  {project.solution}
                </p>
              </Reveal>
            )}
          </Container>
        </Section>
      )}

      {project.challenges && project.challenges.length > 0 && (
        <Section>
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow="Challenges"
                title="What made this hard"
              />
            </Reveal>
            <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2">
              {project.challenges.map((item, i) => (
                <RevealItem
                  key={i}
                  className="rounded-2xl border border-border bg-surface p-6"
                >
                  <div className="flex items-start gap-3">
                    <Lightbulb
                      className="mt-0.5 h-5 w-5 shrink-0 text-accent-start"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {item.challenge}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {item.solution}
                      </p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </Container>
        </Section>
      )}

      <Section className="border-t border-border bg-surface/40">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Business Impact" title="What it changed" />
          </Reveal>
          <Reveal delay={0.05} className="mt-8 max-w-2xl">
            <p className="text-base leading-relaxed text-foreground">
              {project.impact}
            </p>
          </Reveal>
          {project.metrics && project.metrics.length > 0 && (
            <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2">
              {project.metrics.map((metric) => (
                <RevealItem
                  key={metric.label}
                  className="rounded-2xl border border-border bg-surface p-6"
                >
                  <p className="text-2xl font-semibold text-foreground">
                    {metric.value}
                  </p>
                  <p className="mt-1 text-sm text-muted">{metric.label}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          )}
        </Container>
      </Section>

      {(project.lessonsLearned || project.futureImprovements) && (
        <Section>
          <Container>
            <div className="grid gap-10 sm:grid-cols-2">
              {project.lessonsLearned && (
                <Reveal>
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">
                    Lessons Learned
                  </h2>
                  <ul className="mt-4 space-y-3">
                    {project.lessonsLearned.map((lesson, i) => (
                      <li key={i} className="text-sm leading-relaxed text-muted">
                        {lesson}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}
              {project.futureImprovements && (
                <Reveal delay={0.05}>
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">
                    Future Improvements
                  </h2>
                  <ul className="mt-4 space-y-3">
                    {project.futureImprovements.map((item, i) => (
                      <li key={i} className="text-sm leading-relaxed text-muted">
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}
            </div>
          </Container>
        </Section>
      )}

      {related.length > 0 && (
        <Section className="border-t border-border">
          <Container>
            <Reveal>
              <SectionHeading eyebrow="Related" title="More case studies" />
            </Reveal>
            <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2">
              {related.map((p) => (
                <RevealItem key={p.slug}>
                  <CaseStudyCard project={p} />
                </RevealItem>
              ))}
            </RevealGroup>
            <Reveal delay={0.1} className="mt-10">
              <Link
                href="/work"
                className="inline-flex items-center gap-1 text-sm font-medium text-foreground hover:text-accent-start"
              >
                <Rocket className="h-4 w-4" aria-hidden="true" /> View all work
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Reveal>
          </Container>
        </Section>
      )}
    </>
  );
}
