"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { Container } from "@/components/ui/container";
import { MagneticLink } from "@/components/ui/magnetic-link";
import { site } from "@/content/site";
import { HeroBackground } from "./hero-background";

const words = site.headline.split(" ");

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <HeroBackground />
      <Container className="relative py-28 sm:py-36">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-sm text-accent-start"
        >
          Hi, I&rsquo;m {site.name.split(" ")[0]}.
        </motion.p>

        <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-6xl">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 * i, ease: [0.16, 1, 0.3, 1] }}
              className="mr-[0.25em] inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 * words.length + 0.1 }}
          className="mt-6 max-w-xl text-lg text-muted"
        >
          {site.bio}
        </motion.p>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.05 * words.length + 0.2 }}
          className="mt-6 flex flex-wrap gap-2"
        >
          {site.roleTags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted"
            >
              {tag}
            </li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 * words.length + 0.3 }}
          className="mt-10 flex flex-wrap items-center gap-4"
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
        </motion.div>
      </Container>
    </section>
  );
}
