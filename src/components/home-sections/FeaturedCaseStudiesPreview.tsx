import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { CompanyWordmark } from "@/components/ui/CompanyWordmark";
import { logoPaths } from "@/content/logos";
import { featuredCaseStudies } from "@/content/home";

export function FeaturedCaseStudiesPreview() {
  return (
    <Section className="border-t border-ink-200 py-section">
      <div className="flex flex-col gap-14 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="font-display text-section font-semibold tracking-tight text-ink-950">
            {featuredCaseStudies.headline}
          </h2>
          <p className="font-body mt-6 text-subhead text-ink-600 max-w-md">
            {featuredCaseStudies.subhead}
          </p>
        </div>
        <Link
          href={featuredCaseStudies.ctaHref}
          className="font-body shrink-0 text-metric-sm font-medium text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent-dark hover:decoration-accent"
        >
          {featuredCaseStudies.cta} →
        </Link>
      </div>
      <ul className="mt-16 grid divide-y divide-ink-200 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
        {featuredCaseStudies.items.map((item) => (
          <li
            key={item.slug}
            className="group py-10 first:pt-0 lg:px-10 lg:py-0 lg:first:pl-0 lg:last:pr-0"
          >
            <Link
              href={`/work#${item.slug}`}
              className="block transition-colors hover:text-ink-950"
            >
              <div className="mb-5">
                <CompanyWordmark
                  name={item.client}
                  src={logoPaths[item.client]}
                  size="sm"
                />
              </div>
              <span className="font-body text-eyebrow font-medium uppercase tracking-[0.12em] text-ink-500">
                {item.category}
              </span>
              <h3 className="font-display mt-4 text-card-title font-semibold tracking-tight text-ink-950 transition-colors group-hover:text-ink-700">
                {item.title}
              </h3>
              <p className="font-body mt-4 text-body text-ink-600 leading-[1.65] max-w-sm">
                {item.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
