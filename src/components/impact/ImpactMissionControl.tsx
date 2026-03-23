"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import type { ComponentType } from "react";
import {
  JourneyFlowViz,
  OrchestrationTimelineViz,
  TowerConvergenceViz,
} from "@/components/dashboard";
import { ImpactSystemMapViz } from "./ImpactSystemMapViz";
import { ImpactSignalFieldBackground } from "./ImpactSignalFieldBackground";
import { ImpactInterconnectSignals } from "./ImpactInterconnectSignals";
import { ImpactMetricInstrument } from "./ImpactMetricInstrument";
import type { ImpactOutcomeMode } from "@/content/impact-page";
import { impactMissionControl } from "@/content/impact-mission-control";

const systemKeys = ["revenue", "operations", "healthcare"] as const;

const modeToViz: Record<ImpactOutcomeMode, ComponentType<{ isHovered?: boolean }>> = {
  all: JourneyFlowViz,
  revenue: JourneyFlowViz,
  operations: TowerConvergenceViz,
  healthcare: OrchestrationTimelineViz,
};

export function ImpactMissionControl() {
  const [mode, setMode] = useState<ImpactOutcomeMode>("all");
  const [expandedSystem, setExpandedSystem] = useState<(typeof systemKeys)[number]>("revenue");

  const metrics = useMemo(() => impactMissionControl.metricsByMode[mode], [mode]);
  const Viz = modeToViz[mode];
  const emphasizedSystem = mode === "all" ? expandedSystem : mode;

  useEffect(() => {
    if (mode !== "all") {
      setExpandedSystem(mode);
    }
  }, [mode]);

  return (
    <section className="relative overflow-hidden bg-dashboard-bg px-4 py-6 sm:px-6 sm:py-8 lg:min-h-[calc(100vh-8.5rem)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.58]"
        style={{
          background:
            "radial-gradient(1200px 620px at 10% -10%, rgba(34,211,199,0.12), transparent 60%), radial-gradient(950px 520px at 95% 10%, rgba(34,211,199,0.08), transparent 62%), linear-gradient(180deg, rgba(0,0,0,0.36) 0%, rgba(0,0,0,0.18) 35%, rgba(0,0,0,0.3) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(232,230,226,0.06) 0px, rgba(232,230,226,0.06) 1px, transparent 1px, transparent 10px), repeating-linear-gradient(90deg, rgba(232,230,226,0.04) 0px, rgba(232,230,226,0.04) 1px, transparent 1px, transparent 12px)",
        }}
      />
      <ImpactSignalFieldBackground mode={mode} />

      <div className="relative mx-auto max-w-6xl">
        <div className="rounded-sm border border-dashboard-border/80 bg-[#0f0e0d]/90 shadow-[0_28px_70px_-28px_rgba(0,0,0,0.75),inset_0_1px_0_rgba(232,230,226,0.06)]">
          <header className="flex flex-col gap-4 border-b border-dashboard-border/80 px-4 py-4 sm:px-5 sm:py-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[38rem]">
              <p className="font-body text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-accent-signal/90">
                Mission Control
              </p>
              <h1 className="mt-2 font-display text-hero-tight font-semibold leading-[1.03] text-dashboard-ink-light">
                {impactMissionControl.headline}
              </h1>
              <p className="mt-2 font-body text-[0.875rem] font-bold leading-[1.6] text-dashboard-ink-muted">
                {impactMissionControl.subhead}
              </p>
            </div>

            <div className="w-full lg:w-auto lg:max-w-[32rem]">
              <div
                role="tablist"
                aria-label="Mission control modes"
                className="inline-flex w-full flex-wrap gap-2 rounded-sm border border-dashboard-border/75 bg-dashboard-muted/55 p-1.5 lg:flex-nowrap lg:gap-0"
              >
                {impactMissionControl.modes.map((m) => {
                  const active = mode === m.key;
                  return (
                    <button
                      key={m.key}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setMode(m.key)}
                      className={[
                        "relative flex-1 rounded-sm px-3 py-2",
                        "font-body text-[0.75rem] font-bold uppercase tracking-[0.12em]",
                        active
                          ? "border border-accent-signal/55 text-accent-signal"
                          : "border border-transparent text-dashboard-ink-muted hover:text-dashboard-ink-light",
                      ].join(" ")}
                    >
                      {active ? (
                        <motion.span
                          layoutId="control-mode-pill"
                          className="absolute inset-0 rounded-sm bg-accent-signal/14"
                          transition={{ type: "spring", stiffness: 420, damping: 34 }}
                        />
                      ) : null}
                      <span className="relative">{m.label}</span>
                    </button>
                  );
                })}
              </div>
              <motion.p
                key={mode}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 font-body text-[0.75rem] font-bold leading-[1.5] text-dashboard-ink-muted/95"
              >
                {impactMissionControl.stateNarrative[mode]}
              </motion.p>
            </div>
          </header>

          <div className="relative grid gap-4 p-4 sm:p-5 lg:grid-cols-[15rem,1fr,18rem] lg:grid-rows-[auto_auto] lg:gap-5">
            <ImpactInterconnectSignals mode={mode} />
            <aside className="rounded-sm border border-dashboard-border/75 bg-dashboard-muted/60 p-3.5 lg:row-span-2">
              <p className="font-body text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-dashboard-ink-light/85">
                Aggregate metrics
              </p>
              <AnimatePresence mode="wait">
                <ImpactMetricInstrument key={mode} mode={mode} metrics={metrics} />
              </AnimatePresence>
            </aside>

            <div className="relative rounded-sm border border-dashboard-border/75 bg-dashboard-muted/60 p-3.5">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.11]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(34,211,199,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(34,211,199,0.2) 1px, transparent 1px)",
                  backgroundSize: "18px 18px",
                }}
              />
              <div className="relative flex items-center justify-between">
                <p className="font-body text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-dashboard-ink-light/80">
                  System canvas
                </p>
                <p className="font-body text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-accent-signal/90">
                  {mode.toUpperCase()} state
                </p>
              </div>

              <div className="relative mt-3 h-[18rem]">
                <ImpactSystemMapViz mode={mode} />
                <div className="pointer-events-none absolute inset-0 hidden lg:block">
                  {systemKeys.map((key, i) => {
                    const isActive = expandedSystem === key;
                    const pos =
                      i === 0
                        ? "left-[8%] top-[12%]"
                        : i === 1
                          ? "left-[44%] top-[4%]"
                          : "right-[8%] top-[12%]";
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setExpandedSystem(key)}
                        className={`pointer-events-auto absolute ${pos} rounded-sm border px-2.5 py-1 font-body text-[0.625rem] font-semibold uppercase tracking-[0.12em] transition-colors ${
                          isActive
                            ? "border-accent-signal/55 bg-accent-signal/14 text-accent-signal"
                            : "border-dashboard-border/70 bg-[#0e0d0c]/75 text-dashboard-ink-muted hover:text-dashboard-ink-light"
                        }`}
                      >
                        {key}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <aside className="rounded-sm border border-dashboard-border/75 bg-dashboard-muted/60 p-3.5">
              <p className="font-body text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-dashboard-ink-light/85">
                Active engine
              </p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`viz-${mode}`}
                  initial={{ opacity: 0, scale: 0.98, y: 6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.985, y: -6 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="mt-3 h-[11.5rem] rounded-sm border border-dashboard-border/70 bg-[#0f0e0d]/85 p-2.5"
                >
                  <Viz isHovered />
                </motion.div>
              </AnimatePresence>
              <p className="mt-2 font-body text-[0.75rem] font-bold leading-[1.55] text-dashboard-ink-muted">
                Live instrumentation view updates with mode state to show system behavior, not static slides.
              </p>
            </aside>

            <div className="rounded-sm border border-dashboard-border/75 bg-dashboard-muted/60 p-3.5 lg:col-span-2">
              <div className="flex flex-wrap items-center gap-2">
                {systemKeys.map((key) => {
                  const active = expandedSystem === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setExpandedSystem(key)}
                      className={`rounded-sm border px-2.5 py-1 font-body text-[0.625rem] font-semibold uppercase tracking-[0.12em] transition-colors ${
                        active
                          ? "border-accent-signal/55 bg-accent-signal/14 text-accent-signal"
                          : "border-dashboard-border/70 bg-[#0e0d0c]/75 text-dashboard-ink-muted hover:text-dashboard-ink-light"
                      }`}
                    >
                      {impactMissionControl.systems[key].title}
                    </button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={expandedSystem}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="mt-3"
                >
                  <h3 className="font-display text-[1.1rem] font-semibold text-dashboard-ink-light">
                    {impactMissionControl.systems[expandedSystem].title}
                  </h3>
                  <p className="mt-2 font-body text-[0.875rem] font-bold leading-[1.62] text-dashboard-ink-muted">
                    {impactMissionControl.systems[expandedSystem].narrative}
                  </p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-3">
                    {impactMissionControl.systems[expandedSystem].signals.map((item) => (
                      <div
                        key={item}
                        className="rounded-sm border border-dashboard-border/70 bg-[#0e0d0c]/80 px-2.5 py-2"
                      >
                        <div className="font-body text-[0.75rem] font-bold leading-[1.5] text-dashboard-ink-muted">
                          {item}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                {systemKeys.map((key) => {
                  const system = impactMissionControl.systems[key];
                  const isFocused = emphasizedSystem === key;
                  return (
                    <motion.button
                      key={`module-${key}`}
                      type="button"
                      onClick={() => setExpandedSystem(key)}
                      className={`rounded-sm border px-2.5 py-2 text-left transition-colors ${
                        isFocused
                          ? "border-accent-signal/55 bg-accent-signal/10"
                          : "border-dashboard-border/70 bg-[#0e0d0c]/72"
                      }`}
                      initial={false}
                      animate={{
                        opacity: isFocused ? 1 : mode === "all" ? 0.9 : 0.55,
                        scale: isFocused ? 1.02 : 1,
                      }}
                      transition={{ duration: 0.26, ease: "easeOut" }}
                    >
                      <p className={`font-body text-[0.625rem] font-semibold uppercase tracking-[0.12em] ${isFocused ? "text-accent-signal" : "text-dashboard-ink-muted"}`}>
                        {system.title}
                      </p>
                      <p className="mt-1.5 font-body text-[0.75rem] font-bold leading-[1.5] text-dashboard-ink-muted">
                        {system.signals[0]}
                      </p>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-between rounded-sm border border-dashboard-border/75 bg-dashboard-muted/60 px-3.5 py-2.5 lg:col-span-3">
              <p className="font-body text-[0.75rem] font-bold text-dashboard-ink-muted">
                Executive state feed: integrated across Autodesk, Wipro, and EY by system type.
              </p>
              <Link
                href="/contact"
                className="font-body text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-accent-signal hover:text-accent-light"
              >
                Request deep-dive session →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

