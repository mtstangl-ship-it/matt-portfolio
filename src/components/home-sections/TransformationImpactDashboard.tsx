"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import type { ComponentType } from "react";
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
  const reducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const VizComponent = vizMap[name as keyof typeof vizMap] as ComponentType<{
    isHovered?: boolean;
  }>;
  const vizHoverClasses = reducedMotion
    ? ""
    : "group-hover/card:scale-[1.06] group-hover/card:-translate-y-[3px] group-hover/card:drop-shadow-[0_0_22px_rgba(34,211,199,0.65)] group-hover/card:brightness-[1.08]";

  return (
    <motion.article
      className="group/card flex h-full flex-col overflow-hidden border border-dashboard-border/70 bg-dashboard-card/70 shadow-card transition-shadow hover:shadow-card-hover hover:border-accent-signal/35 hover:shadow-dashboard-glow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileHover={
        reducedMotion
          ? undefined
          : {
              scale: 1.03,
              y: -2,
              transition: { duration: 0.18, ease: "easeOut" },
            }
      }
    >
      <header className="flex h-[4.25rem] shrink-0 items-center border-b border-dashboard-border/70 px-4 py-0 sm:px-5">
        <div className="min-w-0 flex-1 space-y-1.5">
          <CompanyWordmark
            name={name}
            src={logoPaths[name]}
            size="sm"
            inverted
            className="object-left"
          />
          <h3 className="font-display text-[0.9375rem] font-bold leading-[1.15] tracking-tight text-dashboard-ink-light line-clamp-1">
            {headline}
          </h3>
        </div>
      </header>
      {VizComponent && (
        <div className="relative h-[9.5rem] shrink-0 border-b border-dashboard-border/70 bg-dashboard-muted px-4 py-4 sm:px-5 sm:py-5">
          <div
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgb(34 211 199) 1px, transparent 1px), linear-gradient(to bottom, rgb(34 211 199) 1px, transparent 1px)",
              backgroundSize: "14px 14px",
            }}
            aria-hidden
          />
          <motion.div
            className={`relative w-full transform-gpu transition-transform duration-250 ease-out will-change-transform motion-reduce:transition-none ${vizHoverClasses}`}
          >
            <VizComponent isHovered={isHovered && !reducedMotion} />
          </motion.div>
        </div>
      )}
      <div className="flex min-h-[3.75rem] flex-1 flex-col justify-center px-4 py-3 sm:px-5 sm:py-4">
        <p className="font-body text-[0.8125rem] font-bold leading-[1.45] text-dashboard-ink-muted line-clamp-3 sm:text-body">
          {narrative}
        </p>
      </div>
      <div className="grid min-w-0 shrink-0 grid-cols-2 gap-2 border-t border-dashboard-border/70 bg-dashboard-surface px-4 py-3 sm:gap-2.5 sm:px-5 sm:py-4">
        {kpis.map((kpi, i) => (
          <CountUpMetric
            key={`${name}-${i}-${kpi.value}`}
            {...kpi}
            index={i}
            variant="dashboard"
          />
        ))}
      </div>
      <div className="flex shrink-0 flex-wrap gap-1.5 border-t border-dashboard-border/70 px-4 py-2.5 sm:px-5">
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
      {/* Dashboard panel wrapper: unify the grid into one instrumentation layer */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-signal/60 to-transparent" aria-hidden />
        <div className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(34,211,199,0.25), transparent 45%), radial-gradient(circle at 70% 10%, rgba(34,211,199,0.18), transparent 50%), radial-gradient(circle at 60% 70%, rgba(34,211,199,0.12), transparent 55%)",
        }} aria-hidden />
        <Section className="relative">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
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
          <div className="mt-8 rounded-md border border-dashboard-border/60 bg-dashboard-surface/25 p-4 shadow-card sm:mt-10 sm:p-5">
            <div className="grid min-w-0 grid-rows-1 gap-4 sm:gap-4 lg:grid-cols-3 lg:items-stretch">
              {transformationDashboard.companies.map((company, i) => (
                <CompanyCard key={company.name} {...company} index={i} />
              ))}
            </div>
          </div>
        </Section>
      </div>
    </section>
  );
}
