import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { CompanyWordmark } from "@/components/ui/CompanyWordmark";
import { CaseStudyMiniViz, CaseStudyMotif, HumanPortraitMotif } from "@/components/visuals";
import { logoPaths } from "@/content/logos";
import { featuredCaseStudies } from "@/content/home";

export function FeaturedCaseStudiesPreview() {
  return (
    <Section className="relative overflow-hidden border-t border-ink-200/50 bg-support py-section">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(13 148 136) 1px, transparent 1px), linear-gradient(to bottom, rgb(13 148 136) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse at 30% 10%, rgba(13,148,136,0.16), transparent 55%), radial-gradient(ellipse at 75% 55%, rgba(13,148,136,0.10), transparent 60%)",
        }}
      />
      <div className="relative z-10 flex flex-col gap-8 sm:gap-10 lg:flex-row lg:items-end lg:justify-between">
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
      <ul className="relative z-10 mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featuredCaseStudies.items.map((item, i) => (
          <li key={item.slug}>
            <Link
              href={`/work#${item.slug}`}
              className="group/card block overflow-hidden rounded-xl border border-ink-200/70 bg-base-50 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-card-hover hover:shadow-glow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
            >
              {/* Visual portal: doorway frame + motif */}
              <div className="relative h-44 overflow-hidden bg-gradient-to-br from-ink-150/40 via-support-200 to-accent-tint/20 transition-all duration-300 group-hover/card:from-accent-tint/45 group-hover/card:via-support-200 group-hover/card:to-ink-150/35">
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
                  aria-hidden
                  style={{
                    background:
                      "radial-gradient(circle at 40% 30%, rgba(13,148,136,0.20), transparent 55%), radial-gradient(circle at 75% 60%, rgba(13,148,136,0.12), transparent 60%)",
                  }}
                />

                {/* Portal rim */}
                <div
                  className="absolute inset-3 rounded-lg border border-accent/30 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
                  aria-hidden
                />

                {/* Mini signal layer (subtle, moves slightly on hover) */}
                <div className="pointer-events-none absolute right-4 top-4 h-14 w-20 text-accent/80 opacity-[0.20] transition-transform duration-300 group-hover/card:translate-x-1 group-hover/card:opacity-[0.26]">
                  <CaseStudyMiniViz motif={item.motif} />
                </div>

                {/* Human presence: only on first tile and very subtle */}
                {i === 0 && (
                  <div className="pointer-events-none absolute left-4 bottom-4 h-12 w-12 text-ink-800 opacity-[0.06] transition-opacity duration-300 group-hover/card:opacity-[0.10]">
                    <HumanPortraitMotif />
                  </div>
                )}

                <div className="absolute inset-0 flex items-center justify-center px-6">
                  <div className="h-24 w-32 text-accent/55 transition-transform duration-300 group-hover/card:text-accent group-hover/card:scale-[1.06]">
                    <CaseStudyMotif variant={item.motif} />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="relative p-6">
                <span className="inline-flex items-center rounded-full border border-ink-200/70 bg-base-50 px-3 py-1 font-body text-eyebrow font-semibold uppercase tracking-wider text-ink-600">
                  {item.category}
                </span>

                <div className="mt-4 mb-4 min-h-[2.25rem] transition-transform duration-300 group-hover/card:translate-y-[-1px]">
                  <CompanyWordmark
                    name={item.client}
                    src={logoPaths[item.client]}
                    size="md"
                    className="max-h-9 w-auto max-w-full object-contain object-left"
                  />
                </div>

                <h3 className="font-display text-[1.05rem] font-bold text-ink-950 leading-tight transition-colors group-hover/card:text-accent-dark">
                  {item.title}
                </h3>
                <p className="font-body mt-3 text-body font-semibold text-ink-800 leading-[1.5]">
                  {item.outcome}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 rounded-sm border border-accent/30 bg-accent/5 px-3 py-2 font-body text-metric-sm font-semibold text-accent transition-all group-hover/card:gap-3 group-hover/card:bg-accent/10 group-hover/card:text-accent-dark">
                  <span>Case study</span>
                  <span aria-hidden className="transition-transform duration-300 group-hover/card:translate-x-0.5">
                    →
                  </span>
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
