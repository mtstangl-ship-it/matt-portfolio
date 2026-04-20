"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { ComponentType } from "react";
import { CountUpMetric, JourneyFlowViz, OrchestrationTimelineViz, SignalMiniViz, TowerConvergenceViz } from "@/components/dashboard";
import { CompanyWordmark } from "@/components/ui/CompanyWordmark";
import { logoPaths } from "@/content/logos";

const vizMap = {
  Autodesk: JourneyFlowViz,
  Wipro: TowerConvergenceViz,
  EY: OrchestrationTimelineViz,
} as const;

type TransformationCompany = {
  name: string;
  headline: string;
  narrative: string;
  expandedNarrative: string;
  theme: string;
  signalSystemImpact: readonly { label: string; value: string }[];
  kpis: readonly { value: string; label: string }[];
  capabilityTags: readonly string[];
};

const moduleIdentity = {
  Autodesk: {
    accent: "rgba(34,211,199,0.18)",
    glow: "rgba(34,211,199,0.28)",
    panelLabel: "Revenue architecture module",
    marker: "R",
    vizMotionClass: "group-hover:scale-[1.04] group-hover:-translate-y-[2px]",
  },
  Wipro: {
    accent: "rgba(34,211,199,0.14)",
    glow: "rgba(34,211,199,0.22)",
    panelLabel: "Operations performance module",
    marker: "O",
    vizMotionClass: "group-hover:scale-[1.02]",
  },
  EY: {
    accent: "rgba(34,211,199,0.16)",
    glow: "rgba(34,211,199,0.26)",
    panelLabel: "Healthcare outcomes module",
    marker: "H",
    vizMotionClass: "group-hover:scale-[1.03] group-hover:-translate-y-[1px]",
  },
} as const;

export function TransformationModule({
  company,
  index,
}: {
  company: TransformationCompany;
  index: number;
}) {
  const reducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const VizComponent = vizMap[company.name as keyof typeof vizMap] as ComponentType<{
    isHovered?: boolean;
  }> | null;

  const signalVariant =
    company.name === "Autodesk"
      ? "autodesk"
      : company.name === "Wipro"
        ? "wipro"
        : "ey";
  const identity = moduleIdentity[company.name as keyof typeof moduleIdentity];
  const moduleHover =
    company.name === "Autodesk"
      ? { scale: 1.012, y: -2 }
      : company.name === "Wipro"
        ? { scale: 1.008, y: -1 }
        : { scale: 1.01, y: -2 };

  return (
    <motion.article
      className="group relative overflow-hidden rounded-sm border border-dashboard-border/80 bg-dashboard-muted/50 shadow-card-elevated"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileHover={
        reducedMotion
          ? undefined
          : {
              ...moduleHover,
              boxShadow: "0 16px 42px -18px rgba(34,211,199,0.22)",
            }
      }
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.42]"
        style={{
          background: `radial-gradient(700px 280px at 100% -10%, ${identity.accent}, transparent 62%), radial-gradient(500px 240px at 0% 110%, ${identity.glow}, transparent 70%)`,
        }}
      />
      <div className="relative border-b border-dashboard-border/75 bg-dashboard-card/40 px-5 py-4 sm:px-6">
        <div className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgb(34 211 199) 1px, transparent 1px), linear-gradient(to bottom, rgb(34 211 199) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
          aria-hidden
        />
        <div className="relative flex items-center justify-between gap-3">
          <CompanyWordmark
            name={company.name}
            src={logoPaths[company.name]}
            size="md"
            inverted
            className="object-left max-h-9"
          />
          <div className="flex items-center gap-2">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-sm border border-accent-signal/45 bg-accent-signal/12 font-mono text-[0.625rem] font-bold text-accent-signal">
              {identity.marker}
            </span>
            <span className=" text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-dashboard-ink-muted">
              {identity.panelLabel}
            </span>
          </div>
          <div className="font-mono text-[0.75rem] font-bold text-dashboard-ink-muted/80">
            {String(index + 1).padStart(2, "0")} / 03
          </div>
        </div>
      </div>

      <div className="relative p-5 sm:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <div className="relative w-full lg:w-[44%]">
            <div className="relative overflow-hidden rounded-sm border border-dashboard-border/70 bg-[#100f0e]/85 p-3 sm:p-4">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.14]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgb(34 211 199 / 0.55) 1px, transparent 1px), linear-gradient(to bottom, rgb(34 211 199 / 0.35) 1px, transparent 1px)",
                  backgroundSize: "14px 14px",
                }}
              />

              <div className={`relative h-[17rem] w-full transform-gpu transition-transform duration-300 ease-out ${identity.vizMotionClass}`}>
                {VizComponent && (
                  <div className="h-full w-full">
                    <VizComponent isHovered={!reducedMotion && isHovered} />
                  </div>
                )}
              </div>

              <div className="relative mt-3">
                <SignalMiniViz
                  variant={signalVariant as "autodesk" | "wipro" | "ey"}
                  isHovered={!reducedMotion && isHovered}
                />
              </div>
            </div>
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <p className=" text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-accent-signal/95">
              {company.theme}
            </p>
            <h3 className=" text-[1.35rem] font-semibold leading-[1.15] tracking-[-0.02em] text-dashboard-ink-light">
              {company.headline}
            </h3>
            <p className=" text-[0.9375rem] font-bold leading-[1.6] text-dashboard-ink-muted">
              {company.narrative}
            </p>
            <p className="rounded-sm border border-dashboard-border/70 bg-[#120f0e]/90 px-3 py-2.5  text-[0.8125rem] font-bold leading-[1.65] text-dashboard-ink-muted/95">
              {company.expandedNarrative}
            </p>

            <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
              {company.signalSystemImpact.map((ssi) => (
                <div
                  key={`${company.name}-${ssi.label}`}
                  className="rounded-sm border border-dashboard-border/70 bg-dashboard-muted/35 px-3 py-2.5"
                >
                  <p className=" text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-accent-signal/90">
                    {ssi.label}
                  </p>
                  <p className="mt-1.5  text-[0.75rem] font-bold leading-[1.55] text-dashboard-ink-muted">
                    {ssi.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {company.kpis.map((kpi, i) => (
                <CountUpMetric
                  key={`${company.name}-${kpi.label}-${i}`}
                  value={kpi.value}
                  label={kpi.label}
                  index={i}
                  variant="dashboard"
                />
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {company.capabilityTags.map((tag) => (
                <span
                  key={tag}
                  className=" text-metric-sm rounded-sm border border-accent-signal/40 bg-accent-signal/8 px-2.5 py-1 font-semibold uppercase tracking-wider text-accent-signal/95"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

