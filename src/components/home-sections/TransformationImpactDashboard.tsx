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
  DASHBOARD_SESSION_TOP_RULE,
  DASHBOARD_CANVAS_PANEL,
  DashboardCoarseGridOverlay,
  DashboardFineGridOverlay,
  DashboardRadialWash,
  DashboardTopHairline,
  DashboardStarfieldSpecks,
} from "@/components/dashboard";
import { cn } from "@/lib/utils";
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
      className="group/card flex h-full flex-col overflow-hidden rounded-lg border border-dashboard-border/70 bg-dashboard-card/70 shadow-card transition-shadow hover:shadow-card-hover hover:border-accent-signal/35 hover:shadow-dashboard-glow"
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
      <header className="flex min-h-[5rem] shrink-0 items-center border-b border-dashboard-border/70 px-4 py-3 sm:min-h-[5.5rem] sm:px-5 sm:py-3">
        <div className="min-w-0 flex-1 space-y-1.5">
          <CompanyWordmark
            name={name}
            src={logoPaths[name]}
            size="sm"
            inverted
            className="object-left max-h-7 sm:max-h-8"
          />
          <h3 className=" text-[0.875rem] font-bold leading-[1.25] tracking-tight text-dashboard-ink-light line-clamp-2 sm:text-[0.9375rem] sm:leading-[1.2]">
            {headline}
          </h3>
        </div>
      </header>
      {VizComponent && (
        <div
          className="relative flex h-[9rem] shrink-0 flex-col border-b border-dashboard-border/70 bg-dashboard-muted px-4 py-4 sm:px-5 sm:py-5"
        >
          <DashboardFineGridOverlay />
          <motion.div
            className={`relative min-h-0 flex-1 w-full transform-gpu transition-transform duration-250 ease-out will-change-transform motion-reduce:transition-none ${vizHoverClasses}`}
          >
            <VizComponent isHovered={isHovered && !reducedMotion} />
          </motion.div>
        </div>
      )}
      <div className="flex min-h-0 flex-1 flex-col justify-center px-4 pt-3 pb-2 sm:px-5 sm:pt-4 sm:pb-2">
        <p className=" text-[0.8125rem] font-bold leading-[1.5] text-dashboard-ink-muted line-clamp-4 sm:text-[0.8125rem] sm:leading-[1.5]">
          {narrative}
        </p>
      </div>
      <div className="grid min-w-0 shrink-0 grid-cols-2 gap-2 border-t border-dashboard-border/70 bg-dashboard-surface px-4 pt-2 pb-3 sm:gap-2.5 sm:px-5 sm:pt-2.5 sm:pb-4">
        {kpis.map((kpi, i) => (
          <CountUpMetric
            key={`${name}-${i}-${kpi.value}`}
            {...kpi}
            index={i}
            variant="dashboard"
          />
        ))}
      </div>
      <div className="flex shrink-0 flex-wrap gap-1.5 border-t border-dashboard-border/70 px-4 py-3 sm:px-5">
        {capabilityTags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className=" text-metric-sm rounded-sm border border-accent-signal/40 bg-accent-signal/8 px-2.5 py-1 font-semibold uppercase tracking-wider text-accent-signal/95"
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
    <section
      className={cn(
        "relative overflow-hidden bg-dashboard-bg py-section",
        DASHBOARD_SESSION_TOP_RULE
      )}
    >
      <DashboardCoarseGridOverlay />
      <DashboardRadialWash />
      <DashboardTopHairline />
      <div className="relative">
        <DashboardStarfieldSpecks />
        <Section className="relative">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
            <div className="min-w-0 max-w-lg">
              <h2 className=" text-section font-bold text-dashboard-ink-light">
                {transformationDashboard.headline}
              </h2>
              <p className=" mt-2 text-subhead font-bold text-dashboard-ink-muted max-w-md">
                {transformationDashboard.subhead}
              </p>
            </div>
            <Link
              href={transformationDashboard.ctaHref}
              className=" shrink-0 text-metric-sm font-semibold text-accent-signal underline decoration-accent-signal underline-offset-4 transition-colors hover:text-accent-light hover:decoration-accent-light"
            >
              {transformationDashboard.cta} →
            </Link>
          </div>
          <div className={cn("mt-8 p-4 sm:mt-10 sm:p-5", DASHBOARD_CANVAS_PANEL)}>
            <div className="grid min-w-0 gap-6 lg:grid-cols-3 lg:items-stretch">
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
