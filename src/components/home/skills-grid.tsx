import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { skillCategories } from "@/content/skills";

export function SkillsGrid() {
  return (
    <Section className="border-t border-border bg-surface/40">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="What I Work With"
            title="A full stack, end to end."
            description="From the model call to the database to the interface a user actually touches."
          />
        </Reveal>

        <RevealGroup className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2">
          {skillCategories.map((group) => (
            <RevealItem key={group.category} className="bg-background p-8">
              <h3 className="text-lg font-semibold text-foreground">
                {group.category}
              </h3>
              <p className="mt-2 text-sm text-muted">{group.description}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
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
  );
}
