import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { CaseStudyIntelPanel } from "@/components/case-studies";
import { caseStudyEntries } from "@/content/case-studies";
import { caseStudiesHomeSection } from "@/content/home";

const preview = caseStudyEntries.slice(0, 3);
const [featured, ...supporting] = preview;

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
          className="font-body shrink-0 text-sm font-semibold text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent-dark hover:decoration-accent"
        >
          {caseStudiesHomeSection.cta} →
        </Link>
      </div>

      <div className="relative z-10 mt-8 flex flex-col gap-4 sm:mt-10 sm:gap-5">
        {featured ? <CaseStudyIntelPanel entry={featured} mode="homeFeatured" /> : null}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          {supporting.map((entry) => (
            <CaseStudyIntelPanel key={entry.slug} entry={entry} mode="homeSupporting" />
          ))}
        </div>
      </div>
    </Section>
  );
}
