import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="font-mono text-sm text-accent-start">404</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        This route doesn&rsquo;t exist — but it&rsquo;s handled gracefully.
      </h1>
      <p className="mt-4 max-w-md text-muted">
        The page you&rsquo;re looking for was moved, renamed, or never built. Let&rsquo;s get you back.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background hover:opacity-90"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to home
      </Link>
    </Container>
  );
}
