import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2 className="mt-10 text-2xl font-semibold text-foreground" {...props} />
  ),
  h3: (props) => (
    <h3 className="mt-8 text-xl font-semibold text-foreground" {...props} />
  ),
  p: (props) => (
    <p className="mt-4 text-base leading-relaxed text-muted" {...props} />
  ),
  ul: (props) => (
    <ul className="mt-4 list-disc space-y-2 pl-5 text-base text-muted" {...props} />
  ),
  ol: (props) => (
    <ol className="mt-4 list-decimal space-y-2 pl-5 text-base text-muted" {...props} />
  ),
  a: (props) => (
    <a className="text-foreground underline underline-offset-4 hover:text-accent-start" {...props} />
  ),
  code: (props) => (
    <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-sm text-foreground" {...props} />
  ),
  blockquote: (props) => (
    <blockquote className="mt-4 border-l-2 border-accent-start pl-4 text-muted italic" {...props} />
  ),
};
