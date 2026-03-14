import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { CompanyWordmark } from "@/components/ui/CompanyWordmark";
import { logoPaths } from "@/content/logos";
import { transformationDashboard } from "@/content/home";

function CompanyCard({
  name,
  headline,
  narrative,
  kpis,
  capabilityTags,
  index,
}: {
  name: string;
  headline: string;
  narrative: string;
  kpis: readonly { value: string; label: string }[];
  capabilityTags: readonly string[];
  index: number;
}) {
  return (
    <article
      className="animate-fade-up border border-ink-200/80 bg-paper-50"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <header className="flex items-start justify-between gap-4 border-b border-ink-200/80 px-6 py-6">
        <div>
          <div className="mb-3">
            <CompanyWordmark name={name} src={logoPaths[name]} size="sm" />
          </div>
          <h3 className="font-display text-card-title font-semibold tracking-tight text-ink-950">
            {headline}
          </h3>
        </div>
      </header>
      <div className="px-6 py-6">
        <p className="font-body text-body text-ink-700 leading-[1.7]">
          {narrative}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 border-t border-ink-200/80 bg-ink-50/30 px-6 py-6">
        {kpis.map((kpi, i) => (
          <div key={i} className="rounded-sm bg-paper-50 px-5 py-4">
            <p className="font-mono text-metric font-semibold tabular-nums text-ink-950">
              {kpi.value}
            </p>
            <p className="font-body mt-1 text-metric-sm text-ink-600">
              {kpi.label}
            </p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 border-t border-ink-200/80 px-6 py-4">
        {capabilityTags.map((tag) => (
          <span
            key={tag}
            className="font-body text-metric-sm rounded-sm border border-ink-200/80 bg-paper-50 px-3 py-1.5 font-medium uppercase tracking-[0.08em] text-ink-600"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}

export function TransformationImpactDashboard() {
  return (
    <section className="border-t border-ink-200 bg-ink-50/30 py-section">
      <Section>
        <div className="flex flex-col gap-14 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <h2 className="font-display text-section font-semibold tracking-tight text-ink-950">
              {transformationDashboard.headline}
            </h2>
            <p className="font-body mt-6 text-subhead text-ink-600 leading-relaxed">
              {transformationDashboard.subhead}
            </p>
          </div>
          <Link
            href={transformationDashboard.ctaHref}
            className="font-body shrink-0 text-metric-sm font-medium text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent-dark hover:decoration-accent"
          >
            {transformationDashboard.cta} →
          </Link>
        </div>
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {transformationDashboard.companies.map((company, i) => (
            <CompanyCard key={company.name} {...company} index={i} />
          ))}
        </div>
      </Section>
    </section>
  );
}
