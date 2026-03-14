import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { stanfordAI } from "@/content/home";

export function StanfordAICapability() {
  const CtaLink = stanfordAI.ctaExternal ? (
    <a
      href={stanfordAI.ctaHref}
      target="_blank"
      rel="noopener noreferrer"
      className="font-body shrink-0 text-metric-sm font-medium text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent-dark hover:decoration-accent"
    >
      {stanfordAI.cta} ↗
    </a>
  ) : (
    <Link
      href={stanfordAI.ctaHref}
      className="font-body shrink-0 text-metric-sm font-medium text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent-dark hover:decoration-accent"
    >
      {stanfordAI.cta} →
    </Link>
  );

  return (
    <Section className="border-t border-ink-200 py-section">
      <Card variant="bordered" className="overflow-hidden">
        <div className="flex flex-col gap-10 p-8 sm:flex-row sm:items-start sm:justify-between lg:p-12">
          <div className="flex items-start gap-8">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-sm bg-accent/10">
              <span className="font-display text-xl font-bold tracking-tight text-accent">
                {stanfordAI.badge}
              </span>
            </div>
            <div>
              <p className="font-body text-eyebrow font-medium uppercase tracking-[0.18em] text-accent">
                Certification
              </p>
              <h3 className="font-display mt-3 text-section font-semibold tracking-tight text-ink-950">
                {stanfordAI.title}
              </h3>
              <p className="font-body mt-2 text-metric-sm text-ink-600">
                {stanfordAI.credential}
              </p>
              <p className="font-body mt-6 max-w-xl text-body text-ink-700 leading-[1.7]">
                {stanfordAI.description}
              </p>
            </div>
          </div>
          <div className="shrink-0 border-t border-ink-200/80 pt-8 sm:border-t-0 sm:border-l sm:pl-10 sm:pt-0">
            {CtaLink}
          </div>
        </div>
      </Card>
    </Section>
  );
}
