import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { CompanyWordmark } from "@/components/ui/CompanyWordmark";
import { CaseStudyMiniViz, CaseStudyMotif, HumanPortraitMotif } from "@/components/visuals";
import { logoPaths } from "@/content/logos";
import { featuredCaseStudies } from "@/content/home";

export function FeaturedCaseStudiesPreview() {
  return (
    <Section className="border-t border-ink-200/50 bg-support py-section">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="font-display text-section font-bold text-ink-950">
            {featuredCaseStudies.headline}
          </h2>
          <p className="font-body mt-2 text-subhead font-bold text-ink-800 max-w-md">
            {featuredCaseStudies.subhead}
          </p>
        </div>
        <Link
          href={featuredCaseStudies.ctaHref}
          className="font-body shrink-0 text-metric-sm font-semibold text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent-dark hover:decoration-accent"
        >
          {featuredCaseStudies.cta} →
        </Link>
      </div>
      <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featuredCaseStudies.items.map((item, i) => (
          <li key={item.slug}>
            <Link
              href={`/work#${item.slug}`}
              className="group/card block overflow-hidden rounded-lg border-2 border-ink-200/70 bg-base-50 shadow-card transition-all duration-300 hover:border-accent/40 hover:shadow-card-hover hover:shadow-glow-sm"
            >
              {/* Visual portal: motif hero + gradient */}
              <div className="relative flex h-32 items-center justify-center overflow-hidden bg-gradient-to-br from-ink-150/50 via-support-200 to-accent-tint/25 transition-all duration-300 group-hover/card:from-accent-tint/50 group-hover/card:via-support-200 group-hover/card:to-ink-150/40">
                <div className="pointer-events-none absolute right-3 top-3 h-14 w-20 text-accent/70 opacity-[0.18] transition-opacity duration-300 group-hover/card:opacity-[0.26]">
                  <CaseStudyMiniViz motif={item.motif} />
                </div>
                {i === 0 && (
                  <div className="pointer-events-none absolute left-3 bottom-2 h-12 w-12 text-ink-800 opacity-[0.08]">
                    <HumanPortraitMotif />
                  </div>
                )}
                <div className="h-16 w-24 text-accent/60 transition-all duration-300 group-hover/card:text-accent group-hover/card:scale-105">
                  <CaseStudyMotif variant={item.motif} />
                </div>
              </div>

              {/* Content */}
              <div className="relative p-6">
                <span className="font-body text-eyebrow font-semibold uppercase tracking-wider text-ink-500">
                  {item.category}
                </span>
                <div className="mt-3 mb-4">
                  <CompanyWordmark
                    name={item.client}
                    src={logoPaths[item.client]}
                    size="sm"
                  />
                </div>
                <h3 className="font-display text-card-title font-bold text-ink-950 leading-tight transition-colors group-hover/card:text-accent-dark">
                  {item.title}
                </h3>
                <p className="font-body mt-4 text-body font-semibold text-ink-800 leading-[1.5]">
                  {item.outcome}
                </p>
                <span className="mt-6 inline-flex items-center gap-1 font-body text-metric-sm font-semibold text-accent underline decoration-accent/40 underline-offset-4 transition-all group-hover/card:gap-2 group-hover/card:text-accent-dark group-hover/card:decoration-accent">
                  Case study
                  <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
