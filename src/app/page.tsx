import { Hero } from "@/components/home/hero";
import { FeaturedWork } from "@/components/home/featured-work";
import { SkillsGrid } from "@/components/home/skills-grid";
import { ProcessTeaser } from "@/components/home/process-teaser";
import { CtaSection } from "@/components/home/cta-section";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedWork />
      <SkillsGrid />
      <ProcessTeaser />
      <CtaSection />
    </>
  );
}
