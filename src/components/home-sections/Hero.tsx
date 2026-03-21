import { Section } from "@/components/ui/Section";
import { JourneyArchitectureIcon } from "@/components/icons";
import { HeroAtmosphereBackground } from "./HeroAtmosphereBackground";
import { hero } from "@/content/home";

export function Hero() {
  return (
    <Section
      container={false}
      className="relative isolate overflow-hidden border-b border-dashboard-border bg-dashboard-bg pb-section-sm lg:min-h-[min(92vh,640px)]"
    >
      {/* Mobile / tablet: copy first, then dedicated animation band (no overlap) */}
      <div className="flex flex-col lg:relative lg:min-h-[min(92vh,640px)]">
        <div className="relative z-10 order-1 bg-dashboard-bg px-6 pt-section pb-6 sm:pb-8 lg:order-2 lg:absolute lg:inset-0 lg:z-10 lg:flex lg:items-center lg:bg-transparent lg:pb-0">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-1 lg:grid-cols-[1fr,1fr] lg:items-center lg:gap-12">
            <div>
              <p className="font-body text-eyebrow font-bold uppercase text-dashboard-ink-light/95 flex items-center gap-2">
                <JourneyArchitectureIcon className="h-3.5 w-3.5 shrink-0" aria-hidden />
                {hero.tagline}
              </p>
              <h1 className="font-display mt-4 text-4xl font-bold leading-[0.98] text-dashboard-ink-light sm:text-5xl lg:text-hero">
                {hero.headline}
              </h1>
              <p className="font-body mt-6 max-w-2xl text-body-lg font-semibold leading-[1.5] text-dashboard-ink-muted">
                {hero.subhead}
              </p>
            </div>
            <div className="hidden lg:block" aria-hidden />
          </div>
        </div>
        <div className="relative z-0 order-2 flex min-h-[min(72vh,580px)] w-full min-w-0 shrink-0 justify-center overflow-hidden border-t border-dashboard-border/50 bg-dashboard-bg lg:order-1 lg:absolute lg:inset-0 lg:min-h-0 lg:border-t-0 lg:bg-transparent">
          <HeroAtmosphereBackground />
        </div>
      </div>
    </Section>
  );
}
