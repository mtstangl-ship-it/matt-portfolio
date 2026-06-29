"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  DASHBOARD_SESSION_TOP_RULE,
  DASHBOARD_CANVAS_PANEL,
  DASHBOARD_MODE_RAIL,
  DASHBOARD_MODE_RAIL_SURFACE,
  DashboardFineGridOverlay,
  DashboardTopHairline,
} from "@/components/dashboard";
import { cn } from "@/lib/utils";
import { ImpactCentralSystem } from "./ImpactCentralSystem";
import { ImpactSignalFieldBackground } from "./ImpactSignalFieldBackground";
import { ImpactInterconnectSignals } from "./ImpactInterconnectSignals";
import { ImpactDataNoiseBackground } from "./ImpactDataNoiseBackground";
import { ImpactSignalOverlays } from "./ImpactSignalOverlays";
import { ImpactMicroReadouts } from "./ImpactMicroReadouts";
import { ImpactAmbientMetrics } from "./ImpactAmbientMetrics";
import { ImpactSystemSummary } from "./ImpactSystemSummary";
import { SiteGrid } from "@/components/ui/SiteGrid";
import type { ImpactOutcomeMode } from "@/content/impact-page";
import { impactMissionControl } from "@/content/impact-mission-control";
const systemKeys = ["revenue", "operations", "healthcare"] as const;

export function ImpactMissionControl() {
  const [mode, setMode] = useState<ImpactOutcomeMode>("revenue");
  const [expandedSystem, setExpandedSystem] = useState<(typeof systemKeys)[number]>("revenue");

  const activeSystem = mode === "all" ? expandedSystem : mode;

  useEffect(() => {
    if (mode !== "all") {
      setExpandedSystem(mode);
    }
  }, [mode]);

  return (
    <section
      className={cn(
        "relative overflow-hidden bg-dashboard-bg px-3 py-4 sm:px-5 sm:py-5 lg:min-h-[calc(100vh-8.5rem)]",
        DASHBOARD_SESSION_TOP_RULE
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.42] lg:opacity-[0.58]"
        style={{
          background:
            "radial-gradient(1200px 620px at 10% -10%, rgba(34,211,199,0.12), transparent 60%), radial-gradient(950px 520px at 95% 10%, rgba(34,211,199,0.08), transparent 62%), linear-gradient(180deg, rgba(0,0,0,0.36) 0%, rgba(0,0,0,0.18) 35%, rgba(0,0,0,0.3) 100%)",
        }}
      />
      <SiteGrid tone="dark" opacity={0.6} className="lg:opacity-100" />
      <ImpactSignalFieldBackground mode={mode} />
      <ImpactDataNoiseBackground mode={mode} />

      <div className="relative mx-auto max-w-6xl">
        {/* Continuous surface: no outer card, gradient edge for definition */}
        <div
          className={cn("relative overflow-hidden", DASHBOARD_CANVAS_PANEL)}
          style={{
            background:
              "linear-gradient(to bottom, rgba(15,14,13,0.94) 0%, rgba(12,11,10,0.97) 100%), linear-gradient(to right, rgba(34,211,199,0.03) 0%, transparent 20%, transparent 80%, rgba(34,211,199,0.02) 100%)",
            boxShadow: "inset 0 1px 0 rgba(232,230,226,0.04)",
          }}
        >
          <DashboardTopHairline className="z-[1]" />
          <header className="relative z-[2] flex flex-col gap-2 border-b border-dashboard-border/20 px-3 py-2 sm:px-4 sm:py-2.5 lg:flex-row lg:items-end lg:justify-between" style={{ opacity: 0.85 }}>
            <div>
              <div className="flex items-baseline gap-3">
                <h2 className="font-mono text-eyebrow font-semibold uppercase tracking-[0.25em] text-accent-signal">
                  Console
                </h2>
                <p className="font-mono text-[0.625rem] font-semibold tabular-nums text-dashboard-ink-muted/60">
                  {impactMissionControl.subhead}
                </p>
              </div>
            </div>

            <div className="w-full lg:w-auto lg:max-w-[30rem]">
              <div
                role="tablist"
                aria-label="Mission control modes"
                className={cn(
                  "relative inline-flex w-full flex-wrap gap-2 p-1.5 lg:flex-nowrap lg:gap-0",
                  DASHBOARD_MODE_RAIL,
                  DASHBOARD_MODE_RAIL_SURFACE
                )}
              >
                <DashboardFineGridOverlay className="z-0" opacity={0.06} />
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
                        "relative z-10 flex-1 px-3 py-2",
                        " text-[0.75rem] font-bold uppercase tracking-[0.12em]",
                        active ? "text-accent-signal" : "text-dashboard-ink-muted hover:text-dashboard-ink-light",
                      ].join(" ")}
                      style={
                        active
                          ? {
                              background: "rgba(34,211,199,0.1)",
                              boxShadow: "inset 0 0 0 1px rgba(34,211,199,0.3)",
                            }
                          : undefined
                      }
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-1.5 font-mono text-[0.625rem] font-semibold tabular-nums text-dashboard-ink-muted/60"
              >
                {impactMissionControl.stateNarrative[mode]}
              </motion.p>
            </div>
          </header>

          <div
            className={
              activeSystem === "revenue"
                ? "relative isolate grid gap-0 p-3 sm:p-4 lg:grid-cols-[18rem,minmax(0,1fr)]"
                : "relative isolate grid gap-0 p-3 sm:p-4 lg:grid-cols-[18rem,minmax(0,1fr)]"
            }
          >
            {/* Tertiary layer, must not capture clicks or sit above content */}
            <div
              className="pointer-events-none col-span-full row-span-full"
              style={{ zIndex: 0 }}
            >
              <ImpactInterconnectSignals mode={mode} />
              <ImpactSignalOverlays mode={mode} />
              <ImpactAmbientMetrics mode={mode} />
              <ImpactMicroReadouts />
            </div>

            {/* Supporting: Autodesk / system summary, on mobile revenue mode, source narrative BEFORE tier UI */}
            <aside
              className={
                activeSystem === "revenue"
                  ? "relative z-10 order-1 col-span-1 py-4 pr-3 pl-2 max-lg:border-b max-lg:border-dashboard-border/20 max-lg:pb-6 lg:order-none lg:row-span-2 lg:border-b-0"
                  : "relative z-10 order-2 col-span-1 py-4 pr-3 pl-2 max-lg:border-t max-lg:border-dashboard-border/15 lg:order-none lg:row-span-2"
              }
              style={{
                background:
                  "linear-gradient(to bottom, rgba(12,11,10,0.92) 0%, rgba(12,11,10,0.85) 100%), linear-gradient(to right, transparent 70%, rgba(34,211,199,0.03) 100%)",
                boxShadow: "inset -1px 0 0 rgba(34,211,199,0.06)",
              }}
            >
              <ImpactSystemSummary key={activeSystem} system={activeSystem} />
            </aside>

            {/* Primary: System brain, revenue tier viz; on mobile must follow summary after narrative */}
            <div
              className={`relative z-20 col-span-1 flex min-h-0 flex-col p-3 lg:order-none lg:row-span-2 lg:p-6 ${
                activeSystem === "revenue"
                  ? "order-2 justify-stretch max-lg:pt-2"
                  : "order-1 items-center justify-center"
              }`}
              style={{
                background:
                  "radial-gradient(ellipse 85% 75% at 50% 48%, rgba(34,211,199,0.1) 0%, transparent 50%), linear-gradient(135deg, rgba(15,14,13,0.9) 0%, rgba(15,14,13,0.7) 100%), linear-gradient(to right, transparent 55%, rgba(34,211,199,0.06) 85%, rgba(34,211,199,0.12) 100%)",
                boxShadow:
                  "inset 0 0 0 1px rgba(34,211,199,0.12), inset 0 0 120px -30px rgba(34,211,199,0.08), 2px 0 24px -8px rgba(34,211,199,0.15)",
              }}
            >
              <div
                className={
                  activeSystem === "revenue"
                    ? "relative flex min-h-0 w-full flex-1 flex-col max-lg:min-h-[min(38rem,88svh)] lg:min-h-0"
                    : "relative w-full flex-1 min-h-[20rem] sm:min-h-[22rem] lg:min-h-[26rem]"
                }
                style={
                  activeSystem === "revenue"
                    ? undefined
                    : { minHeight: "clamp(18rem, 55vh, 28rem)" }
                }
              >
                <ImpactCentralSystem activeSystem={activeSystem} />
              </div>
            </div>

            {/* Supporting: System narrative */}
            <div
              className={`relative z-10 order-3 flex flex-wrap items-center gap-2 p-2 max-lg:border-t max-lg:border-dashboard-border/10 lg:order-none lg:col-span-2`}
              style={{
                background:
                  "linear-gradient(to top, rgba(34,211,199,0.03) 0%, transparent 50%), linear-gradient(135deg, rgba(15,14,13,0.2) 0%, transparent 100%)",
                opacity: 0.8,
                boxShadow: "inset 0 1px 0 rgba(34,211,199,0.04)",
              }}
            >
              {systemKeys.map((key) => {
                const active = expandedSystem === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setExpandedSystem(key)}
                    className={`px-2 py-0.5  text-[0.5625rem] font-semibold uppercase tracking-[0.1em] transition-colors ${
                      active ? "text-accent-signal" : "text-dashboard-ink-muted/70 hover:text-dashboard-ink-light"
                    }`}
                  >
                    {impactMissionControl.systems[key].title}
                  </button>
                );
              })}
              <span className=" text-[0.5rem] font-medium text-dashboard-ink-muted/50">
                {impactMissionControl.systems[expandedSystem].narrative}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

