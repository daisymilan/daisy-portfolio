import { ArrowRight, Download } from "lucide-react";
import { Container } from "@/components/ui/container";
import { MagneticLink } from "@/components/ui/magnetic-link";
import { site } from "@/content/site";
import { HeroBackground } from "./hero-background";

const words = site.headline.split(" ");
const afterHeadline = 0.05 * words.length;

// Entrance animations here are pure CSS (animate-fade-up + animation-delay),
// so the headline is visible on first paint instead of waiting for JS.
function delay(seconds: number) {
  return { animationDelay: `${seconds}s` };
}

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <HeroBackground />
      <Container className="relative py-28 sm:py-36">
        <p className="animate-fade-up font-mono text-sm text-accent-start">
          Hi, I&rsquo;m {site.name.split(" ")[0]}.
        </p>

        <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-6xl">
          {words.map((word, i) => (
            <span
              key={i}
              className="mr-[0.25em] inline-block animate-fade-up"
              style={delay(0.05 * i)}
            >
              {word}
            </span>
          ))}
        </h1>

        <p
          className="mt-6 max-w-xl animate-fade-up text-lg text-muted"
          style={delay(afterHeadline + 0.1)}
        >
          {site.bio}
        </p>

        <ul
          className="mt-6 flex animate-fade-in flex-wrap gap-2"
          style={delay(afterHeadline + 0.2)}
        >
          {site.roleTags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div
          className="mt-10 flex animate-fade-up flex-wrap items-center gap-4"
          style={delay(afterHeadline + 0.3)}
        >
          <MagneticLink
            href="/work"
            className="bg-foreground text-background hover:opacity-90"
          >
            View Work <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </MagneticLink>
          <MagneticLink
            href={site.resumeUrl}
            external
            className="border border-border text-foreground hover:bg-surface"
          >
            Download Resume <Download className="h-4 w-4" aria-hidden="true" />
          </MagneticLink>
        </div>
      </Container>
    </section>
  );
}
