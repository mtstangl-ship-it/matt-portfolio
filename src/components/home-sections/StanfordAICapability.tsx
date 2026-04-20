import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { AutomationIcon } from "@/components/icons";
import { HumanPortraitMotif, SignalMapMotif } from "@/components/visuals";
import { stanfordAI } from "@/content/home";

function StanfordInner() {
  const ctaClass =
    " inline-flex shrink-0 whitespace-nowrap text-sm font-semibold text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent-dark hover:decoration-accent";

  const CtaLink = stanfordAI.ctaExternal ? (
    <a href={stanfordAI.ctaHref} target="_blank" rel="noopener noreferrer" className={ctaClass}>
      {stanfordAI.cta} ↗
    </a>
  ) : (
    <Link href={stanfordAI.ctaHref} className={ctaClass}>
      {stanfordAI.cta} →
    </Link>
  );

  return (
    <>
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 20% 0%, rgba(34,211,199,0.1), transparent 55%), radial-gradient(ellipse 60% 45% at 90% 40%, rgba(13,148,136,0.07), transparent 55%), linear-gradient(to bottom, rgba(0,0,0,0.02), transparent 40%)",
        }}
      />
      <div className="pointer-events-none absolute right-0 top-1/2 w-48 -translate-y-1/2 opacity-[0.08]" aria-hidden>
        <SignalMapMotif />
      </div>
      <Card
        variant="bordered"
        className="relative z-10 isolate border-ink-200/80 bg-paper-50 shadow-card-elevated"
      >
        <div className="pointer-events-none absolute left-6 top-10 h-24 w-24 overflow-hidden opacity-[0.07]">
          <HumanPortraitMotif />
        </div>
        <div className="flex flex-col gap-6 p-5 sm:p-6 lg:flex-row lg:items-center lg:gap-10 lg:justify-between">
          <div className="flex min-w-0 flex-1 flex-col items-center gap-5 text-center sm:flex-row sm:items-start sm:gap-8 sm:text-left">
            <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border-2 border-accent/40 bg-accent-tint p-2.5 sm:h-28 sm:w-28 sm:p-4">
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
                  <span className=" text-xl font-bold text-accent">
                    {stanfordAI.badge}
                  </span>
                </>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className=" text-[clamp(1.5rem,5vw,2.125rem)] font-bold leading-tight text-ink-950 sm:text-section">
                {stanfordAI.title}
              </h3>
              <p className=" mt-2 text-metric-sm text-ink-600">
                {stanfordAI.credential}
              </p>
              <p className=" mt-3 text-body font-semibold leading-[1.5] text-ink-800 sm:max-w-2xl">
                {stanfordAI.description}
              </p>
            </div>
          </div>
          <div className="flex shrink-0 justify-center border-t border-ink-200/80 pt-4 sm:justify-start lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
            {CtaLink}
          </div>
        </div>
      </Card>
    </>
  );
}

/** Standalone section (e.g. if used alone on a page) */
export function StanfordAICapability() {
  return (
    <Section className="relative overflow-hidden border-t border-ink-200/55 bg-support py-section">
      <StanfordInner />
    </Section>
  );
}

/** Directly under thesis headline + body (left column); before Impact */
export function StanfordAICapabilityEmbedded() {
  return (
    <div className="relative z-10 w-full">
      <StanfordInner />
    </div>
  );
}
