import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { homeAboutTeaser } from "@/content/home";

export function HomeAboutTeaser() {
  return (
    <Section className="border-t border-ink-200/55 bg-paper-50 py-section-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
        <div className="max-w-xl">
          <h2 className="font-display text-section font-bold text-ink-950">{homeAboutTeaser.headline}</h2>
          <p className="font-body mt-2 text-subhead font-semibold text-ink-700">{homeAboutTeaser.line}</p>
        </div>
        <Link
          href={homeAboutTeaser.ctaHref}
          className="font-body shrink-0 text-metric-sm font-semibold text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent-dark hover:decoration-accent"
        >
          {homeAboutTeaser.cta} →
        </Link>
      </div>
    </Section>
  );
}
