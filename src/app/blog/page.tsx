import type { Metadata } from "next";
import Link from "next/link";
import { FileText } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on building AI agents, automation systems, and full-stack products.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <Section className="pt-20 sm:pt-28">
      <Container>
        <Reveal>
          <SectionHeading
            as="h1"
            eyebrow="Writing"
            title="Notes from the build."
            description="Longer-form thinking on AI agents, automation architecture, and shipping production systems."
          />
        </Reveal>

        {posts.length === 0 ? (
          <Reveal delay={0.1} className="mt-16 flex flex-col items-center gap-4 rounded-3xl border border-dashed border-border py-20 text-center">
            <FileText className="h-8 w-8 text-muted" aria-hidden="true" />
            <p className="text-base font-medium text-foreground">
              Nothing published yet.
            </p>
            <p className="max-w-sm text-sm text-muted">
              I&rsquo;m writing up how a few of the case studies were actually built. Check back soon.
            </p>
          </Reveal>
        ) : (
          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2">
            {posts.map((post) => (
              <RevealItem key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="block rounded-3xl border border-border bg-surface p-8 transition-colors hover:border-accent-start/50"
                >
                  <p className="font-mono text-xs text-muted">
                    {post.date} · {post.readingTime}
                  </p>
                  <h2 className="mt-3 text-xl font-semibold text-foreground">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm text-muted">{post.excerpt}</p>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        )}
      </Container>
    </Section>
  );
}
