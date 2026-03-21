import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { AutomationIcon } from "@/components/icons";
import { HumanPortraitMotif, SignalMapMotif } from "@/components/visuals";
import { stanfordAI } from "@/content/home";

export function StanfordAICapability() {
  const CtaLink = stanfordAI.ctaExternal ? (
    <a
      href={stanfordAI.ctaHref}
      target="_blank"
      rel="noopener noreferrer"
      className="font-body shrink-0 text-metric-sm font-semibold text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent-dark hover:decoration-accent"
    >
      {stanfordAI.cta} ↗
    </a>
  ) : (
    <Link
      href={stanfordAI.ctaHref}
      className="font-body shrink-0 text-metric-sm font-semibold text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent-dark hover:decoration-accent"
    >
      {stanfordAI.cta} →
    </Link>
  );

  return (
    <Section className="relative overflow-hidden border-t border-ink-200/50 bg-support py-section">
      {/* Editorial tonal depth behind the card (kept extremely low opacity). */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse at 25% 0%, rgba(34,211,199,0.22), transparent 55%), radial-gradient(ellipse at 85% 30%, rgba(13,148,136,0.18), transparent 60%), linear-gradient(to bottom, rgba(0,0,0,0.03), rgba(0,0,0,0) 45%)",
        }}
      />
      <div className="pointer-events-none absolute right-0 top-1/2 w-48 -translate-y-1/2 opacity-[0.07]" aria-hidden>
        <SignalMapMotif />
      </div>
      <Card
        variant="bordered"
        className="relative z-10 overflow-hidden border-ink-200 bg-base-50"
      >
        <div className="pointer-events-none absolute left-6 top-10 h-24 w-24 opacity-[0.07]">
          <HumanPortraitMotif />
        </div>
        <div className="flex flex-col gap-6 p-5 sm:flex-row sm:items-start sm:justify-between sm:gap-8 sm:p-6 lg:p-8">
          <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:gap-8 sm:text-left">
            <div className="flex h-[7.5rem] w-[7.5rem] shrink-0 flex-col items-center justify-center gap-2 overflow-hidden rounded-md border-2 border-accent/40 bg-accent-tint p-3 sm:h-28 sm:w-28 sm:p-4">
              {stanfordAI.certImage ? (
                <Image
                  src={stanfordAI.certImage}
                  alt={`${stanfordAI.title} certification`}
                  width={112}
                  height={112}
                  className="h-full w-full object-contain p-0.5"
                />
              ) : (
                <>
                  <AutomationIcon className="h-10 w-10 text-accent" />
                  <span className="font-display text-xl font-bold text-accent">
                    {stanfordAI.badge}
                  </span>
                </>
              )}
            </div>
            <div className="w-full min-w-0 max-w-lg">
              <h3 className="font-display text-[clamp(1.5rem,5vw,2.125rem)] font-bold leading-tight text-ink-950 sm:text-section">
                {stanfordAI.title}
              </h3>
              <p className="font-body mt-2 text-metric-sm text-ink-600">
                {stanfordAI.credential}
              </p>
              <p className="font-body mt-3 max-w-md text-body font-semibold leading-[1.5] text-ink-800">
                {stanfordAI.description}
              </p>
            </div>
          </div>
          <div className="shrink-0 border-t border-ink-200/80 pt-5 sm:border-t-0 sm:border-l sm:pl-6 sm:pt-0 lg:pl-8">
            {CtaLink}
          </div>
        </div>
      </Card>
    </Section>
  );
}
