"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import type { ImpactOutcomeMode } from "@/content/impact-page";
import { impactPage } from "@/content/impact-page";
import { CountUpMetric } from "@/components/dashboard";
import { ImpactSystemMapViz } from "./ImpactSystemMapViz";

export function ImpactGlobalImpactSection() {
  const segments = impactPage.globalImpact.segments;
  const [mode, setMode] = useState<ImpactOutcomeMode>("all");

  const metrics = useMemo(() => impactPage.globalImpact.metricsByMode[mode], [mode]);
  const modeLabel = mode === "all" ? "All outcomes" : segments.find((s) => s.key === mode)?.label;
  const modeNarrative =
    mode === "all"
      ? "Cross-system synthesis view: revenue, operations, and healthcare signals combined."
      : mode === "revenue"
        ? "Revenue lens: offering design and relationship architecture driving measurable commercial performance."
        : mode === "operations"
          ? "Operations lens: workflow orchestration and handoff alignment reducing effort and resolution time."
          : "Healthcare lens: ecosystem activation and public engagement translating into real care outcomes.";

  return (
    <section className="relative border-b border-dashboard-border/90 bg-dashboard-bg py-section-sm">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(34,211,199,0.28) 1px, transparent 1px), linear-gradient(to bottom, rgba(34,211,199,0.18) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[42rem]">
            <h2 className="font-display text-section font-bold text-dashboard-ink-light">
              {impactPage.globalImpact.headline}
            </h2>
            <p className="mt-3 font-body text-subhead font-bold leading-[1.6] text-dashboard-ink-muted">
              {impactPage.globalImpact.subhead}
            </p>
          </div>

          <div className="w-full lg:w-auto lg:max-w-[30rem]">
            <div
              role="tablist"
              aria-label="Global impact segments"
              className="relative inline-flex w-full flex-wrap justify-start gap-2 rounded-sm border border-dashboard-border/70 bg-dashboard-surface/25 p-2 lg:flex-nowrap lg:gap-0 lg:p-1"
            >
              {segments.map((s) => {
                const active = s.key === mode;
                return (
                  <button
                    key={s.key}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setMode(s.key as ImpactOutcomeMode)}
                    className={[
                      "relative flex-1 rounded-sm px-3 py-2 text-left transition-colors",
                      "font-body text-[0.75rem] font-bold uppercase tracking-[0.12em]",
                      active
                        ? "text-accent-signal border border-accent-signal/45"
                        : "bg-transparent text-dashboard-ink-muted hover:text-dashboard-ink-light/90 border border-transparent hover:border-dashboard-border/60",
                      "sm:flex-none sm:w-auto",
                    ].join(" ")}
                  >
                    {active ? (
                      <motion.span
                        layoutId="impact-mode-pill"
                        className="absolute inset-0 rounded-sm bg-accent-signal/15"
                        transition={{ type: "spring", stiffness: 450, damping: 35 }}
                      />
                    ) : null}
                    <span className="relative">{s.label}</span>
                  </button>
                );
              })}
            </div>
            <p className="mt-2 font-body text-[0.75rem] font-bold leading-[1.5] text-dashboard-ink-muted/90">
              Toggle the outcome lens—watch the system map re-instrument.
            </p>
            <motion.p
              key={mode}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              className="mt-2 font-body text-[0.75rem] font-bold leading-[1.55] text-dashboard-ink-light/80"
            >
              {modeNarrative}
            </motion.p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr,1.1fr] lg:items-start">
          <motion.div
            className="rounded-sm border border-dashboard-border/80 bg-dashboard-muted/55 p-4 shadow-[inset_0_1px_0_rgba(232,230,226,0.06)] sm:p-5"
            initial={false}
            animate={{
              boxShadow:
                mode === "all"
                  ? "inset 0 1px 0 rgba(232,230,226,0.08), 0 0 0 0 rgba(34,211,199,0)"
                  : "inset 0 1px 0 rgba(232,230,226,0.08), 0 0 28px -16px rgba(34,211,199,0.35)",
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <div className="flex items-center justify-between gap-4">
              <p className="font-body text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-dashboard-ink-light/80">
                Aggregate impact (all work)
              </p>
              <p className="font-body text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-accent-signal/90">
                {modeLabel}
              </p>
            </div>

            <div className="mt-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={mode}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="grid grid-cols-1 gap-2 sm:grid-cols-3"
                >
                  {metrics.map((m, i) => (
                    <CountUpMetric
                      key={`${m.label}-${m.value}`}
                      value={String(m.value)}
                      label={m.label}
                      index={i}
                      variant="dashboard"
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {["Autodesk", "Wipro", "EY"].map((company) => (
                <span
                  key={company}
                  className="font-body text-metric-sm rounded-sm border border-dashboard-border/70 bg-dashboard-muted/45 px-2.5 py-1 font-semibold uppercase tracking-[0.12em] text-dashboard-ink-muted"
                >
                  {company}
                </span>
              ))}
            </div>
          </motion.div>

          <div className="rounded-sm border border-dashboard-border/80 bg-dashboard-muted/55 p-4 shadow-[inset_0_1px_0_rgba(232,230,226,0.06)] sm:p-5">
            <div className="flex items-center justify-between">
              <p className="font-body text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-dashboard-ink-light/80">
                Signal system map
              </p>
              <p className="font-body text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-dashboard-ink-muted">
                {mode === "all" ? "All signal channels" : `${mode} lens`}
              </p>
            </div>
            <div className="mt-4">
              <ImpactSystemMapViz mode={mode} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

