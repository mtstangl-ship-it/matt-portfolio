import { Section } from "@/components/ui/Section";
import { JourneyArchitectureIcon } from "@/components/icons";
import { NetworkAbstractMotif } from "@/components/visuals";
import { HeroAtmosphereBackground } from "./HeroAtmosphereBackground";
import { hero } from "@/content/home";

export function Hero() {
  return (
    <Section
      container={false}
      className="relative isolate overflow-hidden border-b border-dashboard-border bg-dashboard-bg pt-section pb-section-sm"
    >
      <HeroAtmosphereBackground />
      <div className="relative z-10 mx-auto flex max-w-6xl px-6 flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl">
          <p className="font-body text-eyebrow font-bold uppercase text-dashboard-ink-light/95 flex items-center gap-2">
            <JourneyArchitectureIcon className="h-3.5 w-3.5 shrink-0" aria-hidden />
            {hero.tagline}
          </p>
          <h1 className="font-display mt-4 text-hero font-bold leading-[0.98] text-dashboard-ink-light">
            {hero.headline}
          </h1>
          <p className="font-body mt-6 max-w-2xl text-body-lg font-semibold leading-[1.5] text-dashboard-ink-muted">
            {hero.subhead}
          </p>
        </div>
        <div className="mt-4 hidden w-full max-w-sm text-accent-signal/40 lg:block">
          <NetworkAbstractMotif />
        </div>
      </div>
    </Section>
  );
}
