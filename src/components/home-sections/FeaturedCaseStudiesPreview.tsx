import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { CompanyWordmark } from "@/components/ui/CompanyWordmark";
import { CaseStudyMiniViz, CaseStudyMotif, HumanPortraitMotif } from "@/components/visuals";
import { logoPaths } from "@/content/logos";
import { featuredCaseStudies } from "@/content/home";

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
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(13 148 136) 1px, transparent 1px), linear-gradient(to bottom, rgb(13 148 136) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
        <div className="min-w-0 max-w-lg">
          <h2 className="font-display text-section font-bold text-ink-950">
            {featuredCaseStudies.headline}
          </h2>
          <p className="font-body mt-2 text-subhead font-semibold text-ink-700 max-w-md">
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
      <ul className="relative z-10 mt-8 grid grid-cols-1 gap-6 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
        {featuredCaseStudies.items.map((item, i) => (
          <li key={item.slug}>
            <Link
              href={`/work#${item.slug}`}
              className="group/card block overflow-hidden rounded-2xl border border-ink-200/55 bg-paper-50 shadow-portal transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-accent/45 hover:shadow-portal-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
            >
              {/* Portal frame — darker interior suggests depth */}
              <div className="relative h-44 overflow-hidden sm:h-52">
                {/* Base: darker "looking through" layer */}
                <div
                  className="absolute inset-0 bg-gradient-to-b from-[#1a1918] via-[#22201e] to-[#1c1b19]"
                  aria-hidden
                />
                {/* Accent wash */}
                <div
                  className="absolute inset-0 opacity-[0.15] transition-opacity duration-300 group-hover/card:opacity-[0.2]"
                  aria-hidden
                  style={{
                    background:
                      "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(34,211,199,0.4), transparent 65%)",
                  }}
                />
                {/* Subtle grid */}
                <div
                  className="absolute inset-0 opacity-[0.06]"
                  aria-hidden
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgb(34 211 199) 1px, transparent 1px), linear-gradient(to bottom, rgb(34 211 199) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />

                {/* Inner frame — portal rim */}
                <div
                  className="pointer-events-none absolute inset-4 rounded-lg border border-accent-signal/20 opacity-60 transition-opacity duration-300 group-hover/card:opacity-100 group-hover/card:border-accent-signal/40"
                  aria-hidden
                />

                {/* Mini viz — ambient layer */}
                <div className="pointer-events-none absolute right-6 top-6 h-16 w-24 text-accent-signal/90 opacity-[0.18] transition-all duration-300 group-hover/card:opacity-[0.28] group-hover/card:translate-x-0.5 group-hover/card:scale-105">
                  <CaseStudyMiniViz motif={item.motif} />
                </div>

                {/* Human presence — first card only */}
                {i === 0 && (
                  <div className="pointer-events-none absolute left-5 bottom-5 h-14 w-14 text-dashboard-ink-light opacity-[0.05] transition-opacity duration-300 group-hover/card:opacity-[0.08]">
                    <HumanPortraitMotif />
                  </div>
                )}

                {/* Central motif — focal point */}
                <div className="absolute inset-0 flex items-center justify-center px-6">
                  <div className="h-28 w-36 text-accent-signal/70 transition-all duration-300 group-hover/card:text-accent-signal group-hover/card:scale-110">
                    <CaseStudyMotif variant={item.motif} />
                  </div>
                </div>
              </div>

              {/* Content — invitation layer */}
              <div className="relative p-5 sm:p-6">
                <span className="inline-flex items-center rounded-full border border-ink-200/60 bg-base-100 px-3 py-1.5 font-body text-[0.5625rem] font-semibold uppercase tracking-[0.12em] text-ink-600">
                  {item.category}
                </span>

                <div className="mt-3 mb-2 min-h-[2rem] transition-transform duration-300 group-hover/card:translate-y-[-1px] sm:mt-4 sm:mb-3 sm:min-h-[2.25rem]">
                  <CompanyWordmark
                    name={item.client}
                    src={logoPaths[item.client]}
                    size="md"
                    className="max-h-9 w-auto max-w-full object-contain object-left"
                  />
                </div>

                <h3 className="font-display text-[1rem] font-bold text-ink-950 leading-tight transition-colors duration-300 group-hover/card:text-accent-dark [text-wrap:balance] sm:text-[1.125rem]">
                  {item.title}
                </h3>
                <p className="font-body mt-2 text-[0.8125rem] font-semibold text-ink-700 leading-[1.5] sm:mt-3 sm:text-[0.875rem]">
                  {item.outcome}
                </p>
                <span className="mt-5 inline-flex items-center gap-2.5 rounded-md border border-accent/35 bg-accent/8 px-4 py-2.5 font-body text-metric-sm font-semibold text-accent transition-all duration-300 group-hover/card:gap-3 group-hover/card:bg-accent/12 group-hover/card:border-accent/50 group-hover/card:text-accent-dark">
                  <span>Explore</span>
                  <span aria-hidden className="transition-transform duration-300 group-hover/card:translate-x-1">
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
