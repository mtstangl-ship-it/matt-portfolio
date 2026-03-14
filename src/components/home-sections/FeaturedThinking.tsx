import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { featuredThinking } from "@/content/home";

export function FeaturedThinking() {
  return (
    <Section className="border-t border-ink-300 bg-paper-100 py-section">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="font-display text-section font-bold text-ink-950">
            {featuredThinking.headline}
          </h2>
          <p className="font-body mt-2 text-subhead font-bold text-ink-800 max-w-md">
            {featuredThinking.subhead}
          </p>
        </div>
        <Link
          href={featuredThinking.ctaHref}
          className="font-body shrink-0 text-metric-sm font-semibold text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent-dark hover:decoration-accent"
        >
          {featuredThinking.cta} →
        </Link>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featuredThinking.items.map((item, i) => (
          <Card
            key={i}
            variant="subtle"
            className="animate-fade-up border-l-4 border-l-accent p-6 motion-reduce:animate-none"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <blockquote className="font-display text-quote font-bold italic leading-[1.5] text-ink-950">
              &ldquo;{item.quote}&rdquo;
            </blockquote>
            <footer className="mt-6 flex items-center justify-between gap-4">
              <span className="font-body text-eyebrow font-semibold uppercase text-accent">
                {item.topic}
              </span>
              <span className="font-mono text-metric-sm tabular-nums text-ink-500">
                {item.date}
              </span>
            </footer>
          </Card>
        ))}
      </div>
    </Section>
  );
}
