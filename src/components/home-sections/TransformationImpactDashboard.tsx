"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { CompanyWordmark } from "@/components/ui/CompanyWordmark";
import {
  JourneyFlowViz,
  TowerConvergenceViz,
  OrchestrationTimelineViz,
  CountUpMetric,
} from "@/components/dashboard";
import { logoPaths } from "@/content/logos";
import { transformationDashboard } from "@/content/home";

const vizMap = {
  Autodesk: JourneyFlowViz,
  Wipro: TowerConvergenceViz,
  EY: OrchestrationTimelineViz,
} as const;


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
  const VizComponent = vizMap[name as keyof typeof vizMap];

  return (
    <motion.article
      className="overflow-hidden border border-dashboard-border bg-dashboard-card shadow-card transition-shadow hover:shadow-card-hover hover:border-accent-signal/30 hover:shadow-dashboard-glow"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <header className="flex items-start justify-between gap-4 border-b border-dashboard-border px-6 py-5">
        <div>
          <div className="mb-2">
            <CompanyWordmark name={name} src={logoPaths[name]} size="sm" inverted />
          </div>
          <h3 className="font-display text-card-title font-bold text-dashboard-ink-light">
            {headline}
          </h3>
        </div>
      </header>
      {VizComponent && (
        <div className="relative border-b border-dashboard-border bg-dashboard-muted px-6 py-5">
          <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: "linear-gradient(to right, rgb(34 211 199) 1px, transparent 1px), linear-gradient(to bottom, rgb(34 211 199) 1px, transparent 1px)", backgroundSize: "16px 16px" }} aria-hidden />
          <div className="relative">
            <VizComponent />
          </div>
        </div>
      )}
      <div className="px-6 py-5">
        <p className="font-body text-body font-bold text-dashboard-ink-muted leading-[1.5]">
          {narrative}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 border-t border-dashboard-border bg-dashboard-surface px-6 py-5">
        {kpis.map((kpi, i) => (
          <CountUpMetric
            key={`${name}-${i}-${kpi.value}`}
            {...kpi}
            index={i}
            variant="dashboard"
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-2 border-t border-dashboard-border px-6 py-3">
        {capabilityTags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="font-body text-metric-sm rounded-sm border border-accent-signal/50 bg-accent-signal/10 px-2.5 py-1 font-bold uppercase text-accent-signal"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

export function TransformationImpactDashboard() {
  return (
    <section className="relative overflow-hidden border-t-2 border-accent/60 bg-dashboard-bg py-section">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(34 211 199) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(34 211 199) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-accent-signal to-transparent opacity-90"
        aria-hidden
      />
      <Section className="relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-lg">
            <h2 className="font-display text-section font-bold text-dashboard-ink-light">
              {transformationDashboard.headline}
            </h2>
            <p className="font-body mt-2 text-subhead font-bold text-dashboard-ink-muted">
              {transformationDashboard.subhead}
            </p>
          </div>
          <Link
            href={transformationDashboard.ctaHref}
            className="font-body shrink-0 text-metric-sm font-semibold text-accent-signal underline decoration-accent-signal underline-offset-4 transition-colors hover:text-accent-light hover:decoration-accent-light"
          >
            {transformationDashboard.cta} →
          </Link>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {transformationDashboard.companies.map((company, i) => (
            <CompanyCard key={company.name} {...company} index={i} />
          ))}
        </div>
      </Section>
    </section>
  );
}
