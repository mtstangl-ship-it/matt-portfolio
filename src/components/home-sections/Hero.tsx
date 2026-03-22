import { Section } from "@/components/ui/Section";
import { JourneyArchitectureIcon } from "@/components/icons";
import { HeroAtmosphereBackground } from "./HeroAtmosphereBackground";
import { hero } from "@/content/home";

export function Hero() {
  return (
    <Section
      container={false}
      className="relative isolate overflow-hidden border-b border-dashboard-border/90 bg-dashboard-bg pb-4 lg:pb-5 lg:min-h-[min(88vh,680px)]"
    >
      {/* Soft transition into light sections */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-accent-signal/[0.04] via-accent-signal/[0.015] to-transparent"
        aria-hidden
      />
      {/* Mobile / tablet: copy first, then dedicated animation band (no overlap) */}
      <div className="flex flex-col lg:relative lg:min-h-[min(88vh,680px)]">
        <div className="relative z-10 order-1 bg-dashboard-bg px-4 pt-6 pb-5 sm:px-6 sm:pt-section sm:pb-8 lg:order-2 lg:absolute lg:inset-0 lg:z-10 lg:flex lg:items-center lg:bg-transparent lg:pb-0 lg:pt-0">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-1 lg:grid-cols-[minmax(0,26rem),1fr] lg:items-center lg:gap-16">
            <div className="w-full max-w-[min(20rem,100%)] sm:max-w-[22rem] lg:max-w-[26rem]">
              <p className="font-body text-eyebrow font-bold uppercase tracking-wider text-dashboard-ink-light/90 flex items-center gap-2">
                <JourneyArchitectureIcon className="h-3.5 w-3.5 shrink-0" aria-hidden />
                {hero.tagline}
              </p>
              <h1 className="font-display mt-2 text-[clamp(1.375rem,4.5vw,2rem)] font-semibold leading-[1.22] tracking-tight text-dashboard-ink-light sm:mt-2.5 sm:text-[clamp(1.75rem,3.8vw,2.25rem)] lg:text-hero-tight">
                {hero.headline}
              </h1>
              <p className="font-body mt-3 max-w-[min(20rem,100%)] text-[0.875rem] font-medium leading-[1.5] text-dashboard-ink-muted sm:mt-4 sm:max-w-md sm:text-body-lg sm:leading-[1.55]">
                {hero.subhead}
              </p>
            </div>
            <div className="hidden lg:block" aria-hidden />
          </div>
        </div>
        <div className="relative z-0 order-2 flex min-h-[min(52vh,380px)] w-full min-w-0 shrink-0 justify-center overflow-hidden border-t border-dashboard-border/50 bg-dashboard-bg sm:min-h-[min(62vh,440px)] lg:order-1 lg:absolute lg:inset-0 lg:min-h-[min(78vh,620px)] lg:border-t-0 lg:bg-transparent">
          <HeroAtmosphereBackground />
        </div>
      </div>
    </Section>
  );
}
