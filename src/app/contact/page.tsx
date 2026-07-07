import type { Metadata } from "next";
import { Download, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "@/components/contact/contact-form";
import { GithubIcon, LinkedinIcon } from "@/components/ui/social-icons";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch about a project, role, or automation idea.",
};

export default function ContactPage() {
  return (
    <Section className="pt-20 sm:pt-28">
      <Container>
        <Reveal>
          <SectionHeading
            as="h1"
            eyebrow="Contact"
            title="Let's build something."
            description="Whether it's a role, a project, or just a question about how something was built — I read everything myself."
          />
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_320px]">
          <Reveal delay={0.05}>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.1} className="space-y-6">
            <div className="rounded-2xl border border-border bg-surface p-6">
              <p className="text-xs font-medium uppercase tracking-wide text-muted">
                Direct
              </p>
              <a
                href={`mailto:${site.email}`}
                className="mt-2 block text-sm font-medium text-foreground hover:text-accent-start"
              >
                {site.email}
              </a>
              <p className="mt-4 flex items-center gap-2 text-sm text-muted">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {site.locationShort}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6">
              <p className="text-xs font-medium uppercase tracking-wide text-muted">
                Elsewhere
              </p>
              <div className="mt-3 flex gap-3">
                <a
                  href={site.social.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="GitHub"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground hover:bg-background"
                >
                  <GithubIcon className="h-4 w-4" />
                </a>
                <a
                  href={site.social.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="LinkedIn"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground hover:bg-background"
                >
                  <LinkedinIcon className="h-4 w-4" />
                </a>
              </div>
            </div>

            <a
              href={site.resumeUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-surface p-6 text-sm font-medium text-foreground hover:bg-background"
            >
              Download Resume <Download className="h-4 w-4" aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
