import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { caseStudyEntries } from "@/content/case-studies";
import { caseStudiesHomeSection } from "@/content/home";

const preview = caseStudyEntries.slice(0, 3);

export function FeaturedCaseStudiesPreview() {
  return (
    <Section className="relative overflow-hidden border-t border-ink-200/55 bg-support py-section">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 75% 55% at 50% -5%, rgba(34,211,199,0.08), transparent 55%), radial-gradient(ellipse 50% 40% at 80% 100%, rgba(13,148,136,0.04), transparent 50%)",
        }}
      />
      <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
        <div className="min-w-0 max-w-lg">
          <h2 className="font-display text-section font-bold text-ink-950">{caseStudiesHomeSection.headline}</h2>
          <p className="font-body mt-2 max-w-md text-subhead font-semibold text-ink-700">
            {caseStudiesHomeSection.subhead}
          </p>
        </div>
        <Link
          href={caseStudiesHomeSection.ctaHref}
          className="font-body shrink-0 text-metric-sm font-semibold text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent-dark hover:decoration-accent"
        >
          {caseStudiesHomeSection.cta} →
        </Link>
      </div>

      <ul className="relative z-10 mt-8 divide-y divide-ink-200/60 border-y border-ink-200/55 sm:mt-10">
        {preview.map((cs) => (
          <li key={cs.slug}>
            <Link
              href={`/case-studies/${cs.slug}`}
              className="group flex flex-col gap-2 py-6 transition-colors first:pt-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8 sm:py-7"
            >
              <div className="min-w-0">
                <h3 className="font-display text-[1.0625rem] font-bold text-ink-950 transition-colors group-hover:text-accent-dark [text-wrap:balance] sm:text-[1.125rem]">
                  {cs.title}
                </h3>
                <p className="font-body mt-1.5 max-w-[50ch] text-[0.8125rem] font-medium leading-relaxed text-ink-700">
                  {cs.oneLine}
                </p>
              </div>
              <span className="font-mono shrink-0 text-[0.55rem] font-semibold uppercase tracking-[0.14em] text-accent/80 transition-transform group-hover:translate-x-0.5">
                Read →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
