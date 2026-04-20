"use client";

import type { SystemKey } from "./ImpactCentralSystem";
import { impactMissionControl } from "@/content/impact-mission-control";

function parseScalePrefix(buildLine: string): { prefix: string; body: string } {
  const m = buildLine.match(/^(\d+\+)\s*(.*)$/);
  if (m) return { prefix: m[1], body: m[2] };
  return { prefix: "", body: buildLine };
}

export function ImpactSystemSummary({ system }: { system: SystemKey }) {
  const summary = impactMissionControl.systemSummary[system];
  const hasBuildTimeframe = "buildLine" in summary && Boolean(summary.buildLine);
  const outcomesHeading =
    "outcomesTitle" in summary && summary.outcomesTitle ? summary.outcomesTitle : "Outcomes";
  const isRevenue = system === "revenue";
  const scaleParts =
    isRevenue && "buildLine" in summary && summary.buildLine
      ? parseScalePrefix(summary.buildLine)
      : { prefix: "", body: "" };

  return (
    <div className="flex flex-col gap-4">
      {isRevenue && "leadMetric" in summary && summary.leadMetric ? (
        <div
          className="order-2 border-b border-dashboard-border/30 pb-4 lg:order-1"
          aria-label={`${summary.leadMetric.value} ${summary.leadMetric.label}`}
        >
          <p
            className="max-lg:max-w-[16rem] font-mono font-bold tabular-nums tracking-[-0.03em] text-white max-lg:mx-auto max-lg:text-center lg:max-w-none lg:text-left"
            style={{
              fontSize: "clamp(1.5rem, 4.5vw, 2.35rem)",
              lineHeight: 0.95,
              textShadow: "0 0 24px rgba(34,211,199,0.2)",
            }}
          >
            {summary.leadMetric.value}
          </p>
          <p className="mt-2 font-body text-[0.6875rem] font-semibold uppercase leading-snug tracking-[0.12em] text-accent-signal/85 max-lg:text-center lg:text-left">
            {summary.leadMetric.label}
          </p>
          {summary.leadMetric.descriptor ? (
            <p className="mt-1.5 font-body text-[0.5rem] font-semibold uppercase tracking-[0.1em] text-dashboard-ink-light/55 max-lg:text-center lg:text-left">
              {summary.leadMetric.descriptor}
            </p>
          ) : null}
        </div>
      ) : null}

      <div
        className={`space-y-2 ${isRevenue ? "order-1 lg:order-2" : ""}`}
      >
        {system === "revenue" ? (
          <div className="space-y-2">
            <p className="font-mono text-[0.78rem] font-bold uppercase tracking-[0.12em] text-accent-signal max-lg:text-center lg:text-left">
              {summary.label}
            </p>
            {"systemContextLine" in summary && summary.systemContextLine ? (
              <p className="font-body text-[0.62rem] leading-relaxed text-dashboard-ink-light/85 max-lg:mx-auto max-lg:line-clamp-3 max-lg:max-w-[42ch] max-lg:text-center lg:mx-0 lg:max-w-none lg:text-left">
                {summary.systemContextLine}
              </p>
            ) : null}
          </div>
        ) : (
          <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.14em] text-dashboard-ink-muted/70">
            {summary.label}
          </p>
        )}
        {summary.introLines.length > 0 ? (
          <div
            className="mt-1 space-y-2.5 rounded-md border border-accent-signal/22 px-2.5 py-2.5"
            style={{
              background:
                "linear-gradient(135deg, rgba(34,211,199,0.07) 0%, rgba(12,11,10,0.35) 55%, rgba(12,11,10,0.2) 100%)",
              boxShadow: "inset 0 1px 0 rgba(34,211,199,0.12)",
            }}
          >
            <p className="font-mono text-[0.5rem] font-bold uppercase tracking-[0.14em] text-accent-signal/85">
              Context
            </p>
            <div className="space-y-2.5">
              {summary.introLines.map((line) => (
                <p
                  key={line}
                  className="font-body text-[0.62rem] leading-relaxed text-dashboard-ink-light/88"
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        ) : null}
        {!isRevenue ? (
          <p className="font-body text-[0.6rem] leading-snug text-dashboard-ink-light/75">
            <span className="font-bold text-accent-signal/90">{summary.modelTitle}</span>
            <span className="text-dashboard-ink-muted/70"> {summary.model}</span>
          </p>
        ) : null}
      </div>

      <div className={`h-px w-full bg-dashboard-border/25 ${isRevenue ? "order-4 lg:order-3" : ""}`} />

      {isRevenue ? (
        <div className={`space-y-4 ${isRevenue ? "order-5 lg:order-4" : ""}`}>
          <div
            className="rounded-md border border-accent-signal/18 px-2.5 py-2 lg:hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(14,13,12,0.92) 0%, rgba(10,10,9,0.94) 100%)",
              boxShadow: "inset 0 1px 0 rgba(34,211,199,0.06)",
            }}
          >
            <p className="font-mono text-[0.55rem] font-bold uppercase tracking-[0.12em] text-accent-signal/80">
              Transformation spine
            </p>
            <p className="mt-1.5 font-body text-[0.65rem] leading-snug text-dashboard-ink-light/88 line-clamp-4">
              {"strategicRole" in summary ? summary.strategicRole : ""}
            </p>
            <p className="mt-2 border-t border-white/[0.06] pt-2 font-body text-[0.6rem] leading-snug text-dashboard-ink-muted/90">
              {"buildLine" in summary && summary.buildLine ? (
                <>
                  {scaleParts.prefix ? (
                    <span className="font-semibold text-white">{scaleParts.prefix}</span>
                  ) : null}
                  <span>{scaleParts.body}</span>
                </>
              ) : null}
              {"timeframeLine" in summary && summary.timeframeLine ? (
                <>
                  <span className="mx-1.5 text-dashboard-ink-muted/50">·</span>
                  <span className="font-semibold text-white">2Q</span>{" "}
                  <span>{summary.timeframeLine.replace(/^2Q\s*/, "")}</span>
                </>
              ) : null}
            </p>
          </div>

          <div className="hidden space-y-4 lg:block">
            <div className="space-y-1.5">
              <p className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.12em] text-dashboard-ink-muted/75">
                Strategic role
              </p>
              <p className="font-body text-[0.72rem] leading-relaxed text-dashboard-ink-light/90">
                {"strategicRole" in summary ? summary.strategicRole : ""}
              </p>
            </div>
            <div className="space-y-1.5">
              <p className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.12em] text-dashboard-ink-muted/75">
                Scale
              </p>
              <div
                className="rounded-md border border-accent-signal/14 px-2.5 py-1.5"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(14,13,12,0.88) 0%, rgba(10,10,9,0.9) 70%, rgba(34,211,199,0.04) 100%)",
                  boxShadow: "inset 0 1px 0 rgba(232,230,226,0.03)",
                }}
              >
                {"buildLine" in summary && summary.buildLine ? (
                  <p className="font-body text-[0.72rem] leading-relaxed text-dashboard-ink-light">
                    {scaleParts.prefix ? (
                      <span className="font-semibold text-white">{scaleParts.prefix}</span>
                    ) : null}
                    <span>{scaleParts.body}</span>
                  </p>
                ) : null}
              </div>
            </div>
            <div className="space-y-1.5">
              <p className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.12em] text-dashboard-ink-muted/75">
                Speed
              </p>
              <div
                className="rounded-md border border-accent-signal/14 px-2.5 py-1.5"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(14,13,12,0.88) 0%, rgba(10,10,9,0.9) 70%, rgba(34,211,199,0.04) 100%)",
                  boxShadow: "inset 0 1px 0 rgba(232,230,226,0.03)",
                }}
              >
                {"timeframeLine" in summary && summary.timeframeLine ? (
                  <p className="font-body text-[0.72rem] leading-relaxed text-dashboard-ink-light">
                    <span className="font-semibold text-white">2Q </span>
                    <span>{summary.timeframeLine.replace(/^2Q\s*/, "")}</span>
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : hasBuildTimeframe ? (
        <div className="space-y-3">
          <div className="space-y-1">
            <p className="font-mono text-[0.5rem] font-bold uppercase tracking-[0.14em] text-dashboard-ink-muted/70">
              Build
            </p>
            <p className="font-mono text-[0.65rem] leading-tight text-dashboard-ink-light/85">
              {"buildLine" in summary ? summary.buildLine : ""}
            </p>
          </div>
          <div className="space-y-1">
            <p className="font-mono text-[0.5rem] font-bold uppercase tracking-[0.14em] text-dashboard-ink-muted/70">
              Timeframe
            </p>
            <p className="font-mono text-[0.65rem] leading-tight text-dashboard-ink-light/85">
              {"timeframeLine" in summary ? summary.timeframeLine : ""}
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="font-mono text-[0.5rem] font-bold uppercase tracking-[0.14em] text-dashboard-ink-muted/70">
            Scope
          </p>
          <div className="space-y-1.5">
            {summary.scopeLines.map((line) => (
              <p
                key={line}
                className="font-mono text-[0.65rem] leading-tight text-dashboard-ink-light/85"
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      )}

      <div className={`space-y-2.5 ${isRevenue ? "order-3 lg:order-5" : ""}`}>
        <p className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.12em] text-dashboard-ink-muted/75">
          {outcomesHeading}
        </p>
        <div className="grid grid-cols-1 gap-2">
          {summary.outcomes.map((o) => (
            <div
              key={o.value}
              className="flex items-baseline justify-between gap-3 rounded-md border border-accent-signal/14 px-2.5 py-1.5"
              style={{
                background:
                  "linear-gradient(135deg, rgba(14,13,12,0.88) 0%, rgba(10,10,9,0.9) 70%, rgba(34,211,199,0.04) 100%)",
                boxShadow: "inset 0 1px 0 rgba(232,230,226,0.03)",
              }}
            >
              <span className="font-mono text-[0.82rem] font-bold tabular-nums text-white">{o.value}</span>
              <div className="flex min-w-0 flex-col items-end gap-0.5 text-right">
                <span className="font-body text-[0.5rem] font-semibold uppercase tracking-[0.1em] text-dashboard-ink-light/75">
                  {o.label}
                </span>
                {"descriptor" in o && o.descriptor ? (
                  <span className="font-body text-[0.42rem] font-semibold uppercase tracking-[0.08em] text-dashboard-ink-light/58">
                    {o.descriptor}
                  </span>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
