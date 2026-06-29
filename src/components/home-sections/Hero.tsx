import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SiteGrid } from "@/components/ui/SiteGrid";
import { JourneyArchitectureIcon } from "@/components/icons";
import { HeroCanvasLazy } from "./HeroCanvasLazy";
import { hero } from "@/content/home";

export function Hero() {
  return (
    <Section
      container={false}
      className="relative isolate overflow-hidden border-b border-dashboard-border/90 bg-dashboard-bg pb-4 sm:pb-5 lg:min-h-[min(92vh,780px)]"
    >
      {/* Shared grid DNA, keeps the home hero on the same graph paper as About + Impact. */}
      <SiteGrid tone="dark" opacity={0.55} />
      {/* Soft transition into light sections */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-accent-signal/[0.04] via-accent-signal/[0.015] to-transparent"
        aria-hidden
      />
      {/* Mobile / tablet: copy first, then dedicated animation band (no overlap) */}
      <div className="flex flex-col lg:relative lg:min-h-[min(92vh,780px)]">
        <div className="relative z-10 order-1 bg-dashboard-bg px-4 pt-6 pb-5 sm:px-6 sm:pt-section sm:pb-8 lg:order-2 lg:absolute lg:inset-0 lg:z-10 lg:flex lg:items-center lg:bg-transparent lg:pb-0 lg:pt-0">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-1 lg:grid-cols-[minmax(0,26rem),1fr] lg:items-center lg:gap-16">
            <div className="flex w-full max-w-[min(20rem,100%)] flex-col sm:max-w-[22rem] lg:max-w-[26rem]">
              <p className="mb-3 flex items-center gap-2 font-mono text-[0.625rem] font-semibold uppercase leading-[1.2] tracking-[0.25em] text-accent-signal sm:mb-3.5 sm:gap-2.5">
                <JourneyArchitectureIcon className="h-4 w-4 shrink-0 text-accent-signal/75" aria-hidden />
                {hero.tagline}
              </p>
              <h1 className="mb-4  text-[clamp(1.5rem,3.6vw,1.875rem)] font-semibold leading-[1.18] tracking-[-0.025em] text-dashboard-ink-light sm:mb-5">
                {hero.headline}
              </h1>
              <p className="max-w-[min(22rem,100%)]  text-subhead font-normal leading-[1.55] tracking-[0.01em] text-dashboard-ink-muted/90">
                {hero.subhead}
              </p>
              {/* Availability + contact row — brief #6, #9: LinkedIn + Get in
                  touch must be visible in the hero, not just the footer. */}
              <div className="mt-5 flex flex-col gap-3 text-[0.8125rem] leading-[1.5] text-dashboard-ink-muted/90 sm:mt-6 sm:text-sm">
                <p className="max-w-[min(22rem,100%)] font-medium text-dashboard-ink-light/90">
                  {hero.availability}
                </p>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.18em]">
                  {hero.contactLinks.map((link) => {
                    const LinkTag = link.external ? "a" : Link;
                    const extraProps = link.external
                      ? { target: "_blank" as const, rel: "noreferrer noopener" }
                      : {};
                    return (
                      <LinkTag
                        key={link.href}
                        href={link.href}
                        {...extraProps}
                        className="inline-flex items-center gap-1.5 text-accent-signal/90 transition-colors hover:text-accent-signal"
                      >
                        {link.label}
                        <span aria-hidden>↗</span>
                      </LinkTag>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="hidden lg:block" aria-hidden />
          </div>
        </div>
        <div className="relative z-0 order-2 flex min-h-[min(58vh,420px)] w-full min-w-0 shrink-0 justify-center overflow-hidden border-t border-dashboard-border/50 bg-dashboard-bg sm:min-h-[min(68vh,520px)] lg:order-1 lg:absolute lg:inset-0 lg:min-h-[min(85vh,720px)] lg:border-t-0 lg:bg-transparent">
          <HeroCanvasLazy />
        </div>
      </div>
    </Section>
  );
}
