"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  IMPACT_TAB_STORAGE_KEY,
  crumbLabels,
  impactBriefingIdentity,
  impactBriefingTabs,
  impactBriefingTop,
  type ImpactBriefingTab,
} from "@/content/impact-dashboard-briefing";
import { ImpactCasePanels } from "./ImpactDashboardCases";

function isImpactTab(v: string | null): v is ImpactBriefingTab {
  return v === "revenue" || v === "ops" || v === "health";
}

export function ImpactDashboardBriefing() {
  const [activeTab, setActiveTab] = useState<ImpactBriefingTab>("revenue");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(IMPACT_TAB_STORAGE_KEY);
      if (isImpactTab(saved)) setActiveTab(saved);
    } catch {
      /* ignore */
    }
  }, []);

  const selectTab = (id: ImpactBriefingTab) => {
    setActiveTab(id);
    try {
      localStorage.setItem(IMPACT_TAB_STORAGE_KEY, id);
    } catch {
      /* ignore */
    }
  };

  const id = impactBriefingIdentity;

  return (
    <main id="top" className="relative z-[1] mx-auto max-w-[1200px] px-6 pb-24 pt-6 md:px-8 md:pb-40 md:pt-8">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-dashboard-border pb-4">
        <div className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-dashboard-ink-muted">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-signal shadow-[0_0_10px_rgb(34_211_199)]" aria-hidden />
          <span className="text-dashboard-border">/</span>
          <span className="text-dashboard-ink-light/90">
            {impactBriefingTop.crumbLead} <span className="text-dashboard-border">·</span>{" "}
            <span className="font-medium text-dashboard-ink-light">{impactBriefingTop.crumbMid}</span>{" "}
            <span className="text-dashboard-border">·</span>{" "}
            <span aria-current="page" className="text-accent-signal">
              {crumbLabels[activeTab]}
            </span>
          </span>
        </div>
        <div className="hidden items-baseline gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-dashboard-ink-muted min-[721px]:flex">
          <b className=" text-xs font-medium normal-case tracking-normal text-dashboard-ink-light">
            {impactBriefingTop.sigName}
          </b>
          <em className=" not-italic text-xs font-normal normal-case tracking-normal text-dashboard-ink-muted">
            {impactBriefingTop.sigRole}
          </em>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-8 py-10 md:grid-cols-[1.1fr_0.9fr] md:items-end md:gap-16 md:py-12 lg:gap-20">
        <div>
          <p className="m-0 mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-accent-signal">
            {id.kicker}
          </p>
          <h1 className="m-0 mb-4 max-w-[18ch]  text-[clamp(2.5rem,6vw,4rem)] font-medium leading-[1.02] tracking-[-0.02em] text-balance text-dashboard-ink-light">
            {id.headline}
            <span className="text-dashboard-ink-muted">{id.headlineMuted}</span>
          </h1>
          <p className="m-0 max-w-[46ch] text-[17px] leading-snug text-dashboard-ink-light/95 text-pretty">{id.sub}</p>
        </div>
        <div
          className="border border-dashboard-border p-6"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.21 0.015 220 / 0.6), oklch(0.19 0.015 220 / 0.6))",
          }}
        >
          {id.card.map((row) => (
            <div
              key={row.k}
              className="flex flex-wrap items-baseline justify-between gap-4 border-t border-dashed border-dashboard-border pt-3 first:border-t-0 first:pt-0"
            >
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-dashboard-ink-muted">
                {row.k}
              </span>
              <span
                className={cn(
                  "max-w-[26ch] text-right text-[15px] text-dashboard-ink-light",
                  "teal" in row && row.teal && "text-accent-signal"
                )}
              >
                {"vBold" in row && row.vBold ? <b className="font-semibold">{row.v}</b> : row.v}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div
        className="sticky top-0 z-10 -mx-6 bg-gradient-to-b from-dashboard-bg from-70% to-transparent px-6 py-3 md:-mx-8 md:px-8"
        style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
      >
        <div
          className="grid grid-cols-1 border border-dashboard-border bg-dashboard-bg sm:grid-cols-3"
          role="tablist"
          aria-label="Impact case studies"
        >
          {impactBriefingTabs.map((t) => {
            const selected = activeTab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={selected}
                className={cn(
                  "relative flex flex-col gap-0.5 border-b border-dashboard-border p-4 text-left transition-colors last:border-b-0 sm:border-b-0 sm:border-r sm:border-dashboard-border sm:last:border-r-0",
                  selected ? "bg-dashboard-surface" : "hover:bg-dashboard-card/35"
                )}
                onClick={() => selectTab(t.id)}
              >
                {selected ? (
                  <span className="absolute inset-x-0 top-0 h-0.5 bg-accent-signal" aria-hidden />
                ) : null}
                <span
                  className={cn(
                    "font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-dashboard-ink-muted",
                    selected && "text-accent-signal"
                  )}
                >
                  {t.idx}
                </span>
                <span
                  className={cn(
                    " text-[17px] font-medium tracking-[-0.005em] text-dashboard-ink-light/90 sm:text-[17px]",
                    selected && "text-dashboard-ink-light"
                  )}
                >
                  {t.name}
                </span>
                <span className="mt-1 font-mono text-[10.5px] font-semibold uppercase tracking-[0.1em] text-dashboard-ink-muted">
                  {t.client}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <ImpactCasePanels activeTab={activeTab} />

      <div className="mt-12 flex flex-wrap items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-dashboard-ink-muted">
        <span>End of briefing</span>
        <span className="h-px min-w-[4rem] flex-1 bg-dashboard-border" aria-hidden />
        <span className="text-dashboard-ink-muted/80">↘ Case studies</span>
      </div>

      <section className="mt-5 grid gap-4 border border-dashboard-border bg-dashboard-surface p-6 md:p-8">
        <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-accent-signal">
          Handoff · deeper narrative
        </div>
        <h3 className="m-0 max-w-[30ch]  text-2xl font-medium tracking-[-0.01em] text-dashboard-ink-light">
          Want the full story behind each transformation? The case studies walk through constraints, craft, and outcomes
          in more depth.
        </h3>
        <Link
          href="/case-studies"
          className="inline-flex w-max items-center gap-3 border border-accent-signal/40 px-[18px] py-3.5 font-mono text-[13px] font-semibold uppercase tracking-[0.08em] text-accent-signal transition-colors hover:border-accent-signal hover:bg-accent-signal/5"
        >
          Open case studies <span aria-hidden>→</span>
        </Link>
      </section>

      <footer className="mt-10 grid grid-cols-1 gap-3 border-t border-dashboard-border pt-8 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-dashboard-ink-muted md:grid-cols-3">
        <div>
          {impactBriefingTop.sigName} · {impactBriefingTop.sigRole}
        </div>
        <div className="md:text-center">Impact Console · v2026.04</div>
        <div className="md:text-right">
          <a href="#top" className="text-dashboard-ink-light/90 underline-offset-4 hover:text-accent-signal hover:underline">
            Back to top ↑
          </a>
        </div>
      </footer>
    </main>
  );
}
