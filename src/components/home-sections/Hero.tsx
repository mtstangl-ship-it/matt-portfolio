import { Section } from "@/components/ui/Section";
import { JourneyArchitectureIcon } from "@/components/icons";
import { HeroAtmosphereBackground } from "./HeroAtmosphereBackground";
import { hero } from "@/content/home";

export function Hero() {
  return (
    <Section
      container={false}
      className="relative isolate overflow-hidden border-b border-dashboard-border bg-dashboard-bg pb-section-sm lg:min-h-[min(82vh,560px)]"
    >
      {/* Mobile / tablet: copy first, then dedicated animation band (no overlap) */}
      <div className="flex flex-col lg:relative lg:min-h-[min(82vh,560px)]">
        <div className="relative z-10 order-1 bg-dashboard-bg px-4 pt-section pb-6 sm:px-6 sm:pb-8 lg:order-2 lg:absolute lg:inset-0 lg:z-10 lg:flex lg:items-center lg:bg-transparent lg:pb-0">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-1 lg:grid-cols-[minmax(0,26rem),1fr] lg:items-center lg:gap-16">
            <div className="max-w-[20rem] sm:max-w-[22rem] lg:max-w-[26rem]">
              <p className="font-body text-eyebrow font-bold uppercase tracking-wider text-dashboard-ink-light/90 flex items-center gap-2">
                <JourneyArchitectureIcon className="h-3.5 w-3.5 shrink-0" aria-hidden />
                {hero.tagline}
              </p>
              <h1 className="font-display mt-2.5 whitespace-pre-line text-[clamp(1.625rem,3.8vw,2.125rem)] font-semibold leading-[1.15] tracking-tight text-dashboard-ink-light sm:text-[clamp(1.875rem,4vw,2.375rem)] lg:text-hero-tight">
                {hero.headline
                  .replace(" — ", " —\n")
                  .replace(" into ", "\ninto ")}
              </h1>
              <p className="font-body mt-3 max-w-md text-body font-semibold leading-[1.5] text-dashboard-ink-muted sm:mt-4 sm:text-body-lg">
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
