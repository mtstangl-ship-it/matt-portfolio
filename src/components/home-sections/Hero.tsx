import { Section } from "@/components/ui/Section";
import { hero } from "@/content/home";

const activeHeadline = hero.headlines[hero.activeHeadlineIndex];

export function Hero() {
  return (
    <Section className="pt-section pb-section-sm">
      <div className="max-w-4xl">
        <p className="font-body text-eyebrow font-medium uppercase tracking-[0.2em] text-accent">
          {hero.tagline}
        </p>
        <h1 className="font-display mt-8 text-hero font-semibold tracking-tight text-ink-950">
          {activeHeadline}
        </h1>
        <p className="font-body mt-10 max-w-2xl text-body-lg text-ink-600 prose-optimal">
          {hero.subhead}
        </p>
      </div>
    </Section>
  );
}
