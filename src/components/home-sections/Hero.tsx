import { Section } from "@/components/ui/Section";
import { hero } from "@/content/home";

export function Hero() {
  return (
    <Section className="border-b border-ink-200 bg-paper-50 pt-section pb-section-sm">
      <div className="max-w-3xl">
        <p className="font-body text-eyebrow font-bold uppercase text-accent-dark">
          {hero.tagline}
        </p>
        <h1 className="font-display mt-4 text-hero font-bold leading-[0.98] text-ink-950">
          {hero.headline}
        </h1>
        <p className="font-body mt-6 max-w-2xl text-body-lg font-semibold leading-[1.5] text-ink-700">
          {hero.subhead}
        </p>
      </div>
    </Section>
  );
}
