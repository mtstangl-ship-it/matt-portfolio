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
      className="overflow-hidden border border-ink-300 bg-paper-50 shadow-card transition-shadow hover:shadow-card-hover"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <header className="flex items-start justify-between gap-4 border-b border-ink-200 px-6 py-5">
        <div>
          <div className="mb-2">
            <CompanyWordmark name={name} src={logoPaths[name]} size="sm" />
          </div>
          <h3 className="font-display text-card-title font-bold text-ink-950">
            {headline}
          </h3>
        </div>
      </header>
      {VizComponent && (
        <div className="relative border-b border-ink-300 bg-accent-muted/30 px-6 py-5">
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)", backgroundSize: "16px 16px" }} aria-hidden />
          <div className="relative">
            <VizComponent />
          </div>
        </div>
      )}
      <div className="px-6 py-5">
        <p className="font-body text-body font-bold text-ink-900 leading-[1.5]">
          {narrative}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 border-t border-ink-300 bg-ink-200/70 px-6 py-5">
        {kpis.map((kpi, i) => (
          <CountUpMetric key={i} {...kpi} index={i} />
        ))}
      </div>
      <div className="flex flex-wrap gap-2 border-t border-ink-200 px-6 py-3">
        {capabilityTags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="font-body text-metric-sm rounded-sm border-2 border-ink-200 bg-paper-50 px-2.5 py-1 font-bold uppercase text-ink-700"
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
    <section className="relative overflow-hidden border-t-2 border-accent/30 bg-gradient-to-b from-accent-muted/50 to-ink-200/90 py-section">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent opacity-60"
        aria-hidden
      />
      <Section className="relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-lg">
            <h2 className="font-display text-section font-bold text-ink-950">
              {transformationDashboard.headline}
            </h2>
            <p className="font-body mt-2 text-subhead font-bold text-ink-800">
              {transformationDashboard.subhead}
            </p>
          </div>
          <Link
            href={transformationDashboard.ctaHref}
            className="font-body shrink-0 text-metric-sm font-semibold text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent-dark hover:decoration-accent"
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
