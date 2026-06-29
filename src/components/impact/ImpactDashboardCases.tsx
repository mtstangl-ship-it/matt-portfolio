"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  GEORGIA_PATH_D,
  impactCaseHealth,
  impactCaseOps,
  impactCaseRevenue,
  type ImpactBriefingTab,
  type LadderTier,
} from "@/content/impact-dashboard-briefing";

function RoleParagraph({
  lead,
  bold,
  trail,
}: {
  lead: string;
  bold: string;
  trail: string;
}) {
  return (
    <p className="m-0 max-w-[44ch] text-[17px] leading-snug text-dashboard-ink-light/95 text-pretty">
      {lead}
      <b className="font-medium text-dashboard-ink-light">{bold}</b>
      {trail}
    </p>
  );
}

function HeroMetric({
  hero,
  lbl,
  unit,
}: {
  hero: { kind: "aov"; em: string } | { kind: "plain"; em: string; suffix: string } | { kind: "decimal"; em: string; suffix: string };
  lbl: string;
  unit: string;
}) {
  return (
    <div className="flex flex-col items-start gap-2 md:items-end md:text-right">
      <div
        className=" text-[clamp(3.5rem,11vw,8.25rem)] font-light leading-[0.9] tracking-[-0.04em] text-dashboard-ink-light tabular-nums"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {hero.kind === "aov" ? (
          <>
            $<em className="font-normal not-italic text-accent-signal">{hero.em}</em>M
          </>
        ) : hero.kind === "decimal" ? (
          <>
            <em className="font-normal not-italic text-accent-signal">{hero.em}</em>
            {hero.suffix}
          </>
        ) : (
          <>
            <em className="font-normal not-italic text-accent-signal">{hero.em}</em>
            {hero.suffix}
          </>
        )}
      </div>
      <div className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-accent-signal">{lbl}</div>
      {unit ? (
      <div className="font-mono text-xs tracking-[0.06em] text-dashboard-ink-muted whitespace-nowrap">{unit}</div>
      ) : null}
    </div>
  );
}

function MetricsStrip({
  metrics,
}: {
  metrics: readonly { v: string; vSmall: string; k: string }[];
}) {
  return (
    <div
      className="my-6 grid grid-cols-2 gap-px border border-dashboard-border bg-dashboard-border md:grid-cols-4"
      role="list"
    >
      {metrics.map((m) => (
        <div
          key={m.k}
          role="listitem"
          className="flex flex-col gap-1 bg-dashboard-surface px-4 py-4"
        >
          <div className="text-[26px] font-medium tracking-[-0.02em] text-dashboard-ink-light tabular-nums">
            {m.v}
            {m.vSmall ? (
              <small className="ml-0.5 text-sm font-normal text-dashboard-ink-muted">{m.vSmall}</small>
            ) : null}
          </div>
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-dashboard-ink-muted">
            {m.k}
          </div>
        </div>
      ))}
    </div>
  );
}

function SectionHead({ title, hint }: { title: string; hint: string }) {
  return (
    <div className="mb-4 mt-8 flex flex-wrap items-baseline justify-between gap-4">
      <h3 className="m-0 text-lg font-medium tracking-[-0.005em] text-dashboard-ink-light">{title}</h3>
      <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-dashboard-ink-muted">
        {hint}
      </span>
    </div>
  );
}

function ServiceChipPill({ label, state }: { label: string; state: "innovated" | "optimized" | "refined" }) {
  const cls =
    state === "innovated"
      ? "border-accent-signal/50 text-accent-signal"
      : state === "optimized"
        ? "border-dashboard-border text-dashboard-ink-light"
        : "border-dashboard-border text-dashboard-ink-muted";
  return (
    <span
      className={cn(
        "rounded-sm border bg-dashboard-bg px-2.5 py-1.5 font-mono text-xs tracking-[0.04em]",
        cls
      )}
    >
      {label}
    </span>
  );
}

function RevenueLadder({ tiers }: { tiers: readonly LadderTier[] }) {
  const [openId, setOpenId] = useState<string>("business");

  return (
    <div className="flex flex-col border border-dashboard-border bg-dashboard-surface">
      {tiers.map((tier) => {
        const open = openId === tier.id;
        return (
          <button
            key={tier.id}
            type="button"
            aria-expanded={open}
            className={cn(
              "grid w-full cursor-pointer border-t border-dashboard-border px-4 py-5 text-left transition-colors first:border-t-0 md:px-5",
              "grid-cols-[40px_1fr] gap-3 md:grid-cols-[56px_1fr_auto] md:gap-4",
              open ? "bg-dashboard-card/80" : "hover:bg-dashboard-card/50"
            )}
            onClick={() => setOpenId((prev) => (prev === tier.id ? "" : tier.id))}
          >
            <span className="flex flex-col items-start gap-0.5 font-mono text-xs tracking-[0.08em] text-dashboard-ink-muted">
              <span className="text-sm text-accent-signal">{tier.stepLabel}</span>
              <span>{tier.stepSub}</span>
            </span>
            <span className="flex min-w-0 flex-col gap-2">
              <span className=" text-lg font-medium tracking-[-0.005em] text-dashboard-ink-light">
                {tier.name}{" "}
                <span
                  className={cn(
                    "ml-1 inline-block translate-y-px text-dashboard-ink-muted transition-transform",
                    open && "rotate-90 text-accent-signal"
                  )}
                  aria-hidden
                >
                  ›
                </span>
              </span>
              <span className="max-w-[60ch] text-sm text-dashboard-ink-light/90">{tier.desc}</span>
            </span>
            <span className="col-start-2 flex flex-col items-start gap-2 tabular-nums md:col-start-3 md:items-end">
              <span className="text-[22px] font-medium tracking-[-0.01em] text-dashboard-ink-light">
                +<em className="not-italic text-accent-signal">{tier.lift.replace("+", "")}</em>%{" "}
                <span className="text-[13px] font-normal text-dashboard-ink-muted">{tier.liftNote}</span>
              </span>
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-dashboard-ink-muted">
                {tier.sub}
              </span>
            </span>
            <span className="col-span-full mt-3 border border-dashboard-border bg-dashboard-bg">
              <span
                className="block h-[3px] bg-accent-signal transition-[width] duration-300 ease-out"
                style={{ width: `${tier.barPct}%` }}
              />
            </span>
            {open ? (
              <div className="col-span-full mt-4 grid gap-4 border-t border-dashed border-dashboard-border pt-4">
                <div className="flex flex-wrap gap-2">
                  {tier.services.map((s) => (
                    <ServiceChipPill key={s.label} label={s.label} state={s.state} />
                  ))}
                </div>
                <div className="mt-2 flex flex-wrap gap-4 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-dashboard-ink-muted">
                  <span className="before:mr-1.5 before:inline-block before:h-2 before:w-2 before:border before:border-accent-signal before:bg-accent-signal before:align-middle before:content-['']">
                    Innovated {tier.legend.innovated}
                  </span>
                  <span className="before:mr-1.5 before:inline-block before:h-2 before:w-2 before:border before:border-dashboard-border before:bg-transparent before:align-middle before:content-['']">
                    Optimized {tier.legend.optimized}
                  </span>
                  <span className="before:mr-1.5 before:inline-block before:h-2 before:w-2 before:border before:border-dashed before:border-dashboard-border before:bg-transparent before:align-middle before:content-['']">
                    Refined {tier.legend.refined}
                  </span>
                </div>
              </div>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

function OpsCaseBody() {
  const o = impactCaseOps;
  return (
    <>
      <SectionHead title={o.compareTitle} hint={o.compareHint} />
      <div className="grid grid-cols-1 gap-4 border border-dashboard-border bg-dashboard-surface p-5 md:grid-cols-2 md:gap-6">
        <div className="flex flex-col gap-3">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-dashboard-ink-muted">
            {o.beforeTtl}
          </div>
          <div className=" text-[44px] font-normal leading-none tracking-[-0.02em] text-dashboard-ink-light tabular-nums">
            {o.beforeBig}
            <small className="ml-1 text-lg text-dashboard-ink-muted">{o.beforeUnit}</small>
          </div>
          <div className="relative h-2 border border-dashboard-border bg-dashboard-bg">
            <span className="absolute inset-y-[-1px] left-[-1px] bg-dashboard-ink-muted" style={{ width: `${o.beforeBar}%` }} />
          </div>
          <p className="m-0 max-w-[40ch] text-sm text-dashboard-ink-light/90">{o.beforeNote}</p>
        </div>
        <div className="flex flex-col gap-3">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-dashboard-ink-muted">
            {o.afterTtl}
          </div>
          <div className=" text-[44px] font-normal leading-none tracking-[-0.02em] text-accent-signal tabular-nums">
            {o.afterBig}
            <small className="ml-1 text-lg text-dashboard-ink-muted">{o.afterUnit}</small>
          </div>
          <div className="relative h-2 border border-dashboard-border bg-dashboard-bg">
            <span className="absolute inset-y-[-1px] left-[-1px] bg-accent-signal" style={{ width: `${o.afterBar}%` }} />
          </div>
          <p className="m-0 max-w-[40ch] text-sm text-dashboard-ink-light/90">{o.afterNote}</p>
        </div>
        <div className="col-span-full mt-2 flex flex-wrap items-center justify-between gap-3 border-t border-dashed border-dashboard-border pt-4 font-mono text-xs uppercase tracking-[0.06em] text-dashboard-ink-muted">
          <span>{o.deltaLeft}</span>
          <span className="font-medium text-accent-signal">{o.deltaRight}</span>
        </div>
      </div>
      <SectionHead title={o.handoffTitle} hint={o.handoffHint} />
      <div className="border border-dashboard-border bg-dashboard-surface p-5">
        <div className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-dashboard-ink-muted">
          {o.handoffLabel}
        </div>
        <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-0">
          <div
            className="pointer-events-none absolute left-7 top-7 hidden h-[calc(100%-3.5rem)] w-px bg-dashboard-border md:block"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute left-[8%] right-[8%] top-7 hidden h-px bg-dashboard-border/80 md:block"
            aria-hidden
          />
          {o.handoffNodes.map((n) => (
            <div key={n.dot} className="relative z-[1] flex flex-col items-center gap-3 text-center md:px-3">
              <div
                className={cn(
                  "flex h-14 w-14 shrink-0 items-center justify-center rounded-full border bg-dashboard-surface font-mono text-[13px] tracking-[0.06em]",
                  n.tier === "1" ? "border-accent-signal/60 text-accent-signal" : "border-dashboard-border text-dashboard-ink-muted"
                )}
              >
                {n.dot}
              </div>
              <div className=" text-[15px] font-medium text-dashboard-ink-light">{n.h}</div>
              <p className="m-0 max-w-[26ch] text-pretty text-[13px] text-dashboard-ink-light/85">{n.d}</p>
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-dashboard-ink-muted">
                <span className="font-medium text-accent-signal">{n.sla}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function HealthGeoCase() {
  const h = impactCaseHealth;
  const [hoverCity, setHoverCity] = useState<string | null>(null);
  const [activeCity, setActiveCity] = useState<string>("atlanta");

  const highlight = hoverCity ?? activeCity;

  useEffect(() => {
    setHoverCity(null);
  }, [activeCity]);

  return (
    <>
      <SectionHead title={h.geoTitle} hint={h.geoHint} />
      <div className="grid grid-cols-1 gap-5 border border-dashboard-border bg-dashboard-surface p-5 lg:grid-cols-[1.2fr_0.9fr] lg:gap-6">
        <div className="relative aspect-[5/6] min-h-[280px] overflow-hidden border border-dashboard-border bg-dashboard-bg">
          <svg viewBox="-10 -10 300 340" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
            <defs>
              <filter id="impactNodeGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2.2" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              d={GEORGIA_PATH_D}
              fill="rgb(13 31 26)"
              stroke="rgb(34 211 199)"
              strokeOpacity={0.4}
              strokeWidth={1.5}
            />
            <g stroke="rgb(34 211 199)" strokeOpacity={0.14} strokeWidth={1} strokeDasharray="3 4" fill="none">
              <line x1="70" y1="96" x2="120" y2="72" />
              <line x1="70" y1="96" x2="246" y2="224" />
              <line x1="120" y1="72" x2="246" y2="224" />
            </g>
            {h.cities.map((c) => {
              const on = highlight === c.id;
              const dim = highlight && highlight !== c.id;
              return (
                <g
                  key={c.id}
                  className={cn("cursor-pointer transition-opacity duration-200", dim && "opacity-[0.28]")}
                  filter="url(#impactNodeGlow)"
                  onMouseEnter={() => setHoverCity(c.id)}
                  onMouseLeave={() => setHoverCity(null)}
                  onClick={() => setActiveCity(c.id)}
                >
                  <circle
                    cx={c.cx}
                    cy={c.cy}
                    r={c.r}
                    fill="rgb(10 15 14)"
                    stroke="rgb(34 211 199)"
                    strokeWidth={on ? 2 : 1.5}
                  />
                  <circle cx={c.cx} cy={c.cy} r={c.r * 0.45} fill="rgb(34 211 199)" />
                  <text
                    x={c.lx}
                    y={c.ly}
                    textAnchor="middle"
                    fill={on ? "rgb(34 211 199)" : "rgb(163 159 152)"}
                    className="font-mono text-[9px] tracking-[0.1em]"
                  >
                    {c.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
        <div className="flex flex-col" role="list">
          {h.cities.map((c) => {
            const on = activeCity === c.id;
            return (
              <button
                key={c.id}
                type="button"
                role="listitem"
                data-active={on}
                className={cn(
                  "grid w-full cursor-pointer grid-cols-[auto_1fr_auto] gap-4 border-t border-dashboard-border py-4 text-left transition-colors first:border-t-0",
                  on && "bg-dashboard-card/60 -mx-3 px-3"
                )}
                onMouseEnter={() => setHoverCity(c.id)}
                onMouseLeave={() => setHoverCity(null)}
                onClick={() => setActiveCity(c.id)}
              >
                <span className="font-mono text-[11px] font-semibold tracking-[0.1em] text-accent-signal">{c.idLabel}</span>
                <span>
                  <span className="block  text-[17px] font-medium tracking-[-0.005em] text-dashboard-ink-light">
                    {c.name}
                  </span>
                  <small className="mt-0.5 block text-[13px] font-normal text-dashboard-ink-muted">{c.small}</small>
                </span>
                <span className="text-right tabular-nums">
                  <span className="block text-lg font-medium text-dashboard-ink-light">{c.num}</span>
                  <small className="mt-0.5 block font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-dashboard-ink-muted">
                    {c.numSmall}
                  </small>
                </span>
              </button>
            );
          })}
          {h.partners.length > 0 ? (
          <div className="mt-2 grid grid-cols-1 gap-3 border-t border-dashboard-border pt-4 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-dashboard-ink-muted sm:grid-cols-3">
            {h.partners.map((p) => (
              <span key={p.b}>
                <b className="mb-0.5 block  text-[22px] font-medium tracking-[-0.01em] text-dashboard-ink-light">
                  {p.b}
                </b>
                {p.rest}
              </span>
            ))}
          </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export function ImpactCasePanels({ activeTab }: { activeTab: ImpactBriefingTab }) {
  const r = impactCaseRevenue;
  const o = impactCaseOps;
  const h = impactCaseHealth;

  return (
    <>
      <section
        className={cn(activeTab === "revenue" ? "block" : "hidden")}
        role="tabpanel"
        aria-label="Revenue case study"
        aria-hidden={activeTab !== "revenue"}
      >
        <div className="grid grid-cols-1 gap-6 border-b border-dashboard-border py-8 md:grid-cols-[1.2fr_1fr] md:items-end md:gap-8 md:py-10">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-dashboard-ink-muted">
              <span className="h-px w-6 bg-accent-signal" />
              <span>{r.tag}</span>
            </div>
            <h2 className="m-0 max-w-[22ch]  text-[clamp(1.625rem,3.4vw,2.25rem)] font-medium leading-snug tracking-[-0.015em] text-dashboard-ink-light text-balance">
              {r.title}
            </h2>
            <RoleParagraph lead={r.roleLead} bold={r.roleBold} trail={r.roleTrail} />
          </div>
          <HeroMetric hero={r.hero} lbl={r.heroLbl} unit={r.heroUnit} />
        </div>
        <MetricsStrip metrics={r.metrics} />
        <SectionHead title={r.sectionTitle} hint={r.sectionHint} />
        <RevenueLadder tiers={r.tiers} />
      </section>

      <section
        className={cn(activeTab === "ops" ? "block" : "hidden")}
        role="tabpanel"
        aria-label="Operations case study"
        aria-hidden={activeTab !== "ops"}
      >
        <div className="grid grid-cols-1 gap-6 border-b border-dashboard-border py-8 md:grid-cols-[1.2fr_1fr] md:items-end md:gap-8 md:py-10">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-dashboard-ink-muted">
              <span className="h-px w-6 bg-accent-signal" />
              <span>{o.tag}</span>
            </div>
            <h2 className="m-0 max-w-[22ch]  text-[clamp(1.625rem,3.4vw,2.25rem)] font-medium leading-snug tracking-[-0.015em] text-dashboard-ink-light text-balance">
              {o.title}
            </h2>
            <RoleParagraph lead={o.roleLead} bold={o.roleBold} trail={o.roleTrail} />
          </div>
          <HeroMetric hero={o.hero} lbl={o.heroLbl} unit={o.heroUnit} />
        </div>
        <MetricsStrip metrics={o.metrics} />
        <OpsCaseBody />
      </section>

      <section
        className={cn(activeTab === "health" ? "block" : "hidden")}
        role="tabpanel"
        aria-label="Healthcare case study"
        aria-hidden={activeTab !== "health"}
      >
        <div className="grid grid-cols-1 gap-6 border-b border-dashboard-border py-8 md:grid-cols-[1.2fr_1fr] md:items-end md:gap-8 md:py-10">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-dashboard-ink-muted">
              <span className="h-px w-6 bg-accent-signal" />
              <span>{h.tag}</span>
            </div>
            <h2 className="m-0 max-w-[22ch]  text-[clamp(1.625rem,3.4vw,2.25rem)] font-medium leading-snug tracking-[-0.015em] text-dashboard-ink-light text-balance">
              {h.title}
            </h2>
            <RoleParagraph lead={h.roleLead} bold={h.roleBold} trail={h.roleTrail} />
          </div>
          <HeroMetric hero={h.hero} lbl={h.heroLbl} unit={h.heroUnit} />
        </div>
        <MetricsStrip metrics={h.metrics} />
        <HealthGeoCase />
      </section>
    </>
  );
}
