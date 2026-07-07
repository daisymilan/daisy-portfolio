import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { mdxComponents } from "@/components/mdx-components";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <Section className="pt-16 sm:pt-24">
      <Container className="max-w-2xl">
        <Reveal>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Blog
          </Link>
          <p className="mt-6 font-mono text-xs text-muted">
            {post.date} · {post.readingTime}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {post.title}
          </h1>
        </Reveal>

        <Reveal delay={0.05} className="mt-10">
          <MDXRemote source={post.content} components={mdxComponents} />
        </Reveal>
      </Container>
    </Section>
  );
}
