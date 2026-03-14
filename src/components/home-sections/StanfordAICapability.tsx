import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
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
    <Section className="border-t-2 border-accent/20 bg-accent-muted/60 py-section">
      <Card variant="bordered" className="overflow-hidden border-ink-300 bg-paper-50">
        <div className="flex flex-col gap-8 p-8 sm:flex-row sm:items-start sm:justify-between lg:p-10">
          <div className="flex items-start gap-8">
            <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-md border-2 border-accent/30 bg-accent-muted/60 p-3">
              {stanfordAI.certImage ? (
                <Image
                  src={stanfordAI.certImage}
                  alt={`${stanfordAI.title} certification`}
                  width={112}
                  height={112}
                  className="object-contain"
                />
              ) : (
                <span className="font-display text-2xl font-bold text-accent">
                  {stanfordAI.badge}
                </span>
              )}
            </div>
            <div>
              <h3 className="font-display text-section font-bold text-ink-950">
                {stanfordAI.title}
              </h3>
              <p className="font-body mt-2 text-metric-sm text-ink-600">
                {stanfordAI.credential}
              </p>
              <p className="font-body mt-3 max-w-md text-body font-semibold text-ink-800 leading-[1.5]">
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
