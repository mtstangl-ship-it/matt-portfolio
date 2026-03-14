import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { CompanyWordmark } from "@/components/ui/CompanyWordmark";
import { logoPaths } from "@/content/logos";
import { featuredCaseStudies } from "@/content/home";

export function FeaturedCaseStudiesPreview() {
  return (
    <Section className="border-t border-ink-300 bg-paper-50 py-section">
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
      <ul className="mt-10 grid grid-cols-1 divide-y divide-ink-200 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
        {featuredCaseStudies.items.map((item) => (
          <li
            key={item.slug}
            className="group py-6 first:pt-0 sm:py-8 lg:px-6 lg:py-0 lg:first:pl-0 lg:last:pr-0"
          >
            <Link
              href={`/work#${item.slug}`}
              className="block transition-colors hover:text-ink-950"
            >
              <div className="mb-4">
                <CompanyWordmark
                  name={item.client}
                  src={logoPaths[item.client]}
                  size="sm"
                />
              </div>
              <span className="font-body text-eyebrow font-semibold uppercase text-ink-500">
                {item.category}
              </span>
              <h3 className="font-display mt-3 text-card-title font-bold text-ink-950 leading-tight transition-colors group-hover:text-ink-700">
                {item.title}
              </h3>
              <p className="font-body mt-4 text-body font-semibold text-ink-800 leading-[1.5]">
                {item.outcome}
              </p>
              <span className="mt-5 inline-block font-body text-metric-sm font-semibold text-accent underline decoration-accent/40 underline-offset-4 transition-colors group-hover:text-accent-dark group-hover:decoration-accent">
                Case study →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
