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
      <ul className="relative z-10 mt-8 grid grid-cols-1 gap-6 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {featuredCaseStudies.items.map((item, i) => (
          <li key={item.slug}>
            <Link
              href={`/work#${item.slug}`}
              className="group/card block overflow-hidden rounded-2xl border border-ink-200/70 bg-paper-50 shadow-portal transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.015] hover:border-accent/50 hover:shadow-[0_20px_50px_-10px_rgb(26_24_22_/0.2),0_0_32px_-6px_rgb(13_148_136_/0.25)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
            >
              {/* Portal frame — depth, vignette, threshold feel */}
              <div className="relative h-44 overflow-hidden sm:h-52">
                {/* Base: darker interior with subtle vignette */}
                <div
                  className="absolute inset-0 bg-gradient-to-b from-[#1a1918] via-[#21201d] to-[#1b1a18]"
                  aria-hidden
                />
                <div
                  className="absolute inset-0 opacity-[0.5] transition-opacity duration-300 group-hover/card:opacity-[0.35]"
                  aria-hidden
                  style={{
                    boxShadow: "inset 0 0 80px 20px rgba(0,0,0,0.4)",
                  }}
                />
                {/* Accent wash — brighter on hover */}
                <div
                  className="absolute inset-0 opacity-[0.14] transition-opacity duration-300 group-hover/card:opacity-[0.24]"
                  aria-hidden
                  style={{
                    background:
                      "radial-gradient(ellipse 65% 55% at 50% 45%, rgba(34,211,199,0.5), transparent 70%)",
                  }}
                />
                {/* Subtle grid — more visible on hover */}
                <div
                  className="absolute inset-0 opacity-[0.05] transition-opacity duration-300 group-hover/card:opacity-[0.09]"
                  aria-hidden
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgb(34 211 199) 1px, transparent 1px), linear-gradient(to bottom, rgb(34 211 199) 1px, transparent 1px)",
                    backgroundSize: "18px 18px",
                  }}
                />

                {/* Inner frame — portal rim, glows on hover */}
                <div
                  className="pointer-events-none absolute inset-4 rounded-lg border border-white/[0.06] transition-all duration-300 group-hover/card:border-accent-signal/35 group-hover/card:shadow-[0_0_24px_-4px_rgba(34,211,199,0.2)]"
                  aria-hidden
                />

                {/* Client logo — integrated in portal, inverted */}
                <div className="pointer-events-none absolute left-4 top-4 flex h-6 w-16 items-center opacity-[0.3] transition-all duration-300 group-hover/card:opacity-[0.45]">
                  <CompanyWordmark
                    name={item.client}
                    src={logoPaths[item.client]}
                    size="sm"
                    inverted
                    className="max-h-5 max-w-full object-contain object-left"
                  />
                </div>

                {/* Mini viz — ambient layer */}
                <div className="pointer-events-none absolute right-5 top-5 h-14 w-20 text-accent-signal/80 opacity-[0.2] transition-all duration-300 group-hover/card:opacity-[0.32] group-hover/card:translate-x-0.5 group-hover/card:scale-105">
                  <CaseStudyMiniViz motif={item.motif} />
                </div>

                {/* Human presence — first card only */}
                {i === 0 && (
                  <div className="pointer-events-none absolute left-5 bottom-5 h-12 w-12 text-dashboard-ink-light opacity-[0.06] transition-opacity duration-300 group-hover/card:opacity-[0.1]">
                    <HumanPortraitMotif />
                  </div>
                )}

                {/* Central motif — focal point */}
                <div className="absolute inset-0 flex items-center justify-center px-6">
                  <div className="h-28 w-36 text-accent-signal/65 transition-all duration-300 group-hover/card:text-accent-signal group-hover/card:opacity-100 group-hover/card:scale-110">
                    <CaseStudyMotif variant={item.motif} />
                  </div>
                </div>
              </div>

              {/* Threshold — subtle accent line between portal and content */}
              <div
                className="h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent opacity-60 transition-opacity duration-300 group-hover/card:opacity-100"
                aria-hidden
              />

              {/* Content — invitation layer */}
              <div className="relative p-5 sm:p-6">
                <span className="inline-flex items-center rounded-full border border-ink-200/50 bg-base-100/90 px-2.5 py-1 font-body text-[0.5625rem] font-semibold uppercase tracking-[0.12em] text-ink-500">
                  {item.category}
                </span>

                <div className="mt-3.5 mb-2 min-h-[2rem] sm:mt-4 sm:mb-2.5 sm:min-h-[2.25rem]">
                  <CompanyWordmark
                    name={item.client}
                    src={logoPaths[item.client]}
                    size="md"
                    className="max-h-9 w-auto max-w-full object-contain object-left transition-transform duration-300 group-hover/card:translate-x-0.5"
                  />
                </div>

                <h3 className="font-display text-[1rem] font-bold text-ink-950 leading-[1.2] transition-colors duration-300 group-hover/card:text-accent-dark [text-wrap:balance] sm:text-[1.0625rem]">
                  {item.title}
                </h3>
                <p className="font-body mt-2 text-[0.8125rem] font-medium text-ink-700 leading-[1.5] sm:mt-2.5 sm:text-[0.8125rem]">
                  {item.outcome}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 rounded-lg border border-accent/30 bg-accent/[0.07] px-4 py-2.5 font-body text-metric-sm font-semibold text-accent transition-all duration-300 group-hover/card:gap-3 group-hover/card:border-accent/45 group-hover/card:bg-accent/12 group-hover/card:text-accent-dark group-hover/card:shadow-[0_0_0_1px_rgba(13,148,136,0.15)]">
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
