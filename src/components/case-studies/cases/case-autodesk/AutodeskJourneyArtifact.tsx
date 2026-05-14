"use client";

import type { KeyboardEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

/* =========================================================================
 * Autodesk Journey Artifact · H-pattern shifter + Renewal (R) payoff slot.
 * Tier toggle preserved; backstage always visible on phases 01–05.
 * ========================================================================= */

type ActKind = "star" | "normal" | "help";
type Activity = { kind: ActKind; text: string; superDollar?: boolean };
type TierContent = { sub: string; preview: string; acts: Activity[] };
type BackstageRow = { label: "People" | "Process" | "Platform"; text: string };
type Phase = {
  idx: string;
  title: string;
  dek: string;
  growth: TierContent;
  nurture: TierContent;
  backstage: BackstageRow[];
};

const PHASES: Phase[] = [
  {
    idx: "01",
    title: "Identify outcomes",
    dek: "Establish trust. Inform & inspire decision-makers. Align & prioritize outcomes.",
    growth: {
      sub: "High-touch · ADSK & Partner-led",
      preview: "Executive programs · Innovation & thought-leadership · Business alignment · EBRs",
      acts: [
        { kind: "star", text: "Executive programs (1:few)" },
        { kind: "normal", text: "Innovation & thought-leadership" },
        { kind: "normal", text: "Business alignment workshops" },
        { kind: "normal", text: "EBRs & outcome reviews" },
      ],
    },
    nurture: {
      sub: "Medium-touch · digital-guided",
      preview: "Executive engagements · QBR · Outcome alignment workshops",
      acts: [
        { kind: "star", text: "Executive engagements (1:many)" },
        { kind: "normal", text: "QBR · outcomes & value review" },
        { kind: "help", text: "Outcome alignment workshops" },
      ],
    },
    backstage: [
      { label: "People", text: "Sales + CSM enabled on common CBI method" },
      { label: "Process", text: "Outcome discovery, standard-yet-flexible" },
      { label: "Platform", text: "Gainsight playbooks · SFDC signal" },
    ],
  },
  {
    idx: "02",
    title: "Evaluate solutions",
    dek: "Assess current state. Design & validate new solutions. Create & present the business case.",
    growth: {
      sub: "High-touch · ADSK & Partner-led",
      preview: "Capability assessment · Technical demos · Custom solution design · Pilots & business case",
      acts: [
        { kind: "star", text: "Capability & workflow assessment" },
        { kind: "normal", text: "Technical demonstrations" },
        { kind: "normal", text: "Custom solution design" },
        { kind: "normal", text: "Validate in pilots · build a business case" },
      ],
    },
    nurture: {
      sub: "Medium-touch · digital-guided",
      preview: "Coordinated solution evaluation · Trial validation · Capability assessment",
      acts: [
        { kind: "star", text: "Coordinated solution evaluation" },
        { kind: "normal", text: "Test & validate in trial" },
        { kind: "help", text: "Capability assessment · Tech demo" },
      ],
    },
    backstage: [
      { label: "People", text: "Partners + Tech Sales on ROI & assessment" },
      { label: "Process", text: "Shared ROI projection templates" },
      { label: "Platform", text: "Solution & reference architecture library" },
    ],
  },
  {
    idx: "03",
    title: "Create a plan",
    dek: "Define milestones, metrics, R&R. Prioritize & schedule. Source & customize content.",
    growth: {
      sub: "High-touch · ADSK & Partner-led",
      preview: "Success planning · Value planning · Implementation planning · Custom training",
      acts: [
        { kind: "star", text: "Success planning workshops" },
        { kind: "normal", text: "Value planning workshops" },
        { kind: "normal", text: "Implementation planning", superDollar: true },
        { kind: "normal", text: "Custom training development", superDollar: true },
      ],
    },
    nurture: {
      sub: "Medium-touch · digital-guided",
      preview: "Guided roll-out · Reference plans · Value planning",
      acts: [
        { kind: "star", text: "Guided roll-out planning" },
        { kind: "normal", text: "Reference plans & learning paths" },
        { kind: "help", text: "Value planning · Implementation", superDollar: true },
      ],
    },
    backstage: [
      { label: "People", text: "Value consultants on success & value planning" },
      { label: "Process", text: "Standard method for success planning" },
      { label: "Platform", text: "Plan telemetry · learning content routing" },
    ],
  },
  {
    idx: "04",
    title: "Execute the plan",
    dek: "Inspire & upskill users. Support project adoption. Track progress & update plan.",
    growth: {
      sub: "High-touch · ADSK & Partner-led",
      preview: "Initiative check-ins · Deployment assistance · Project training · Health reviews",
      acts: [
        { kind: "star", text: "Frequent initiative check-ins" },
        { kind: "normal", text: "Deployment assistance", superDollar: true },
        { kind: "normal", text: "Project training & coaching", superDollar: true },
        { kind: "normal", text: "Technical health reviews", superDollar: true },
      ],
    },
    nurture: {
      sub: "Medium-touch · digital-guided",
      preview: "QBR · Health monitoring · Deployment · Coaching",
      acts: [
        { kind: "star", text: "QBR · outcomes & value review" },
        { kind: "normal", text: "Monitor health · escalate issues" },
        { kind: "help", text: "Deployment · Coaching", superDollar: true },
      ],
    },
    backstage: [
      { label: "People", text: "Partners + CSMs on adoption & change mgmt" },
      { label: "Process", text: "Real-time activity, status, goal tracking" },
      { label: "Platform", text: "Shared customer health · tier-aware alerts" },
    ],
  },
  {
    idx: "05",
    title: "Assess the value",
    dek: "Track & measure value realized. Communicate achievements. Optimize solution value.",
    growth: {
      sub: "High-touch · ADSK & Partner-led",
      preview: "QBRs · Roadmap review · Case studies & roadmap sessions",
      acts: [
        { kind: "star", text: "QBRs · review outcomes & value" },
        { kind: "normal", text: "Roadmap & feature request review" },
        { kind: "normal", text: "Case studies · product roadmap sessions" },
      ],
    },
    nurture: {
      sub: "Medium-touch · digital-guided",
      preview: "QBR · Product roadmap reviews · Case studies",
      acts: [
        { kind: "star", text: "QBR · outcomes & value review" },
        { kind: "normal", text: "Product roadmap reviews" },
        { kind: "help", text: "Create & share case studies" },
      ],
    },
    backstage: [
      { label: "People", text: "Partners + CSMs on value measurement" },
      { label: "Process", text: "Standard value-tracking & roadmap review" },
      { label: "Platform", text: "Value dashboards · case-study authoring" },
    ],
  },
];

const POSITION_COUNT = PHASES.length + 1;
const RENEWAL_SLOT = PHASES.length;

const TIER_LABELS = {
  growth: "GROWTH PLUS · ~700–1000 accounts · high-touch",
  nurture: "NURTURE PLUS · ~400–600 accounts · digital-guided",
} as const;

type Tier = "growth" | "nurture";

const SLIDE_FOOTER_META: Record<Tier, Record<number, readonly string[]>> = {
  growth: {
    1: ["TIER · GROWTH PLUS", "CADENCE · 1:FEW", "OWNER · SALES + CSM", "KPI · CBI ALIGNED"],
    2: ["TIER · GROWTH PLUS", "CADENCE · 1:FEW", "OWNER · TECH SALES + PARTNERS", "KPI · BUSINESS CASE"],
    3: ["TIER · GROWTH PLUS", "CADENCE · 1:FEW", "OWNER · VALUE CONSULTANTS", "KPI · PLAN COMMITMENT"],
    4: ["TIER · GROWTH PLUS", "CADENCE · 1:FEW", "OWNER · CSM + PARTNERS", "KPI · ADOPTION"],
    5: ["TIER · GROWTH PLUS", "CADENCE · 1:FEW", "OWNER · CSM + PARTNERS", "KPI · VALUE REALIZED"],
  },
  nurture: {
    1: ["TIER · NURTURE PLUS", "CADENCE · 1:MANY", "OWNER · CSM (DIGITAL)", "KPI · CBI ALIGNED"],
    2: ["TIER · NURTURE PLUS", "CADENCE · 1:MANY", "OWNER · PARTNERS", "KPI · TRIAL VALIDATED"],
    3: ["TIER · NURTURE PLUS", "CADENCE · 1:MANY", "OWNER · CSM (DIGITAL)", "KPI · PLAN PUBLISHED"],
    4: ["TIER · NURTURE PLUS", "CADENCE · 1:MANY", "OWNER · CSM + PARTNERS", "KPI · HEALTH SCORE"],
    5: ["TIER · NURTURE PLUS", "CADENCE · 1:MANY", "OWNER · CSM (DIGITAL)", "KPI · VALUE REPORTED"],
  },
};

const RENEWAL_FOOTER_LINES = [
  "PAYOFF · 106% NRR",
  "SCALE · 8-FIGURE",
  "OUTCOMES · 100+",
  "AREAS · 5",
] as const;

/** Narrow screens: truncated shifter labels */
const SHIFTER_LABEL_SHORT = [
  "01 · IDEN",
  "02 · EVAL",
  "03 · CREA",
  "04 · EXEC",
  "05 · ASSE",
  "R · RENEW",
] as const;

const R_HEX_POINTS = "480,182 495.59,191 495.59,209 480,218 464.41,209 464.41,191";

const LOAD_BEARING_SENTENCE =
  "I led the design. I earned the modernization work for my larger org. The design demanded it.";

const RENEWAL_NARRATIVE =
  "The journey returns to Identify with refined context: outcomes accumulated, platform telemetry deepened, partner coordination institutionalized. Same five phases. New starting altitude.";

function SlideFooterBand({
  tier,
  slideOrdinal,
  renewal,
  layerKey,
}: {
  tier: Tier;
  slideOrdinal: number;
  renewal: boolean;
  layerKey: string;
}) {
  const lines = renewal ? [...RENEWAL_FOOTER_LINES] : [...(SLIDE_FOOTER_META[tier][slideOrdinal] ?? [])];
  return (
    <div className="autodesk-journey-slide-footer-wrap">
      <div
        className={`autodesk-journey-slide-footer${renewal ? " autodesk-journey-slide-footer--renewal" : ""}`}
        role="presentation"
      >
        {lines.map((line, cellIdx) => {
          const sep = line.indexOf(" · ");
          const keyPart = sep >= 0 ? line.slice(0, sep) : line;
          const valPart = sep >= 0 ? line.slice(sep + 3) : "";
          const extended = cellIdx >= 2;
          return (
            <span
              key={`${layerKey}-${cellIdx}`}
              className={`autodesk-journey-slide-footer-cell${extended ? " autodesk-journey-slide-footer-cell--extended" : ""}`}
            >
              <span className="autodesk-journey-slide-footer-key">{keyPart}</span>
              <span className="autodesk-journey-slide-footer-sep-inner"> · </span>
              <span className="autodesk-journey-slide-footer-val">{valPart}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

function ActsList({ tier, phase }: { tier: Tier; phase: Phase }) {
  const content = phase[tier];
  return (
    <div className="autodesk-journey-tier-crossfade">
      <span className="autodesk-journey-frontstage-k">FRONTSTAGE</span>
      <span className="autodesk-journey-rail-sub">{content.sub}</span>
      <ul className="autodesk-journey-acts">
        {content.acts.map((a) => (
          <li
            key={a.text}
            className={
              a.kind === "star"
                ? "autodesk-journey-act-star"
                : a.kind === "help"
                  ? "autodesk-journey-act-help"
                  : undefined
            }
          >
            {a.text}
            {a.superDollar ? <sup>$</sup> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

function BackstageBlock({ rows }: { rows: BackstageRow[] }) {
  return (
    <div className="autodesk-journey-backstage" aria-label="Backstage row">
      <span className="autodesk-journey-backstage-divider" aria-hidden="true">
        <span>↓ backstage</span>
      </span>
      <div className="autodesk-journey-backstage-rows">
        {rows.map((r) => (
          <span key={r.label} className="autodesk-journey-bs">
            <b>{r.label}</b> · {r.text}
          </span>
        ))}
      </div>
    </div>
  );
}

function RenewalPanel() {
  return (
    <div className="autodesk-journey-renewal-panel">
      <h3 className="autodesk-journey-renewal-header">R · RENEWAL</h3>
      <p className="autodesk-journey-renewal-narrative">{RENEWAL_NARRATIVE}</p>
      <div className="autodesk-journey-renewal-metrics" aria-label="Renewal outcome metrics">
        <div className="autodesk-journey-renewal-metric">
          <span className="autodesk-journey-renewal-metric-val">100+</span>
          <span className="autodesk-journey-renewal-metric-lbl">
            <span>OUTCOMES</span>
            <span>PRIORITIZED</span>
          </span>
        </div>
        <div className="autodesk-journey-renewal-metric">
          <span className="autodesk-journey-renewal-metric-val">8-fig</span>
          <span className="autodesk-journey-renewal-metric-lbl">
            <span>MODERNIZATION</span>
            <span>INITIATED</span>
          </span>
        </div>
        <div className="autodesk-journey-renewal-metric">
          <span className="autodesk-journey-renewal-metric-val">5</span>
          <span className="autodesk-journey-renewal-metric-lbl">
            <span>PROGRAM</span>
            <span>AREAS</span>
          </span>
        </div>
        <div className="autodesk-journey-renewal-metric">
          <span className="autodesk-journey-renewal-metric-val">106%</span>
          <span className="autodesk-journey-renewal-metric-lbl">
            <span>NRR</span>
            <span>PATH</span>
          </span>
        </div>
      </div>
      <p className="autodesk-journey-renewal-loadbearing">{LOAD_BEARING_SENTENCE}</p>
    </div>
  );
}

const SHIFTER_LAYOUT = [
  { role: "phase" as const, slotIndex: 0, cx: 120, cy: 40, labelTop: true },
  { role: "phase" as const, slotIndex: 1, cx: 120, cy: 200, labelTop: false },
  { role: "phase" as const, slotIndex: 2, cx: 300, cy: 40, labelTop: true },
  { role: "phase" as const, slotIndex: 3, cx: 300, cy: 200, labelTop: false },
  { role: "phase" as const, slotIndex: 4, cx: 480, cy: 40, labelTop: true },
  { role: "renewal" as const, slotIndex: 5, cx: 480, cy: 200, labelTop: false },
];

const GEAR_INNER_R = 18;
const TOOTH_HEIGHT = 5;
const TOOTH_DELTA_DEG = 2;

const RAD = Math.PI / 180;

/** Clockwise degrees from 12 o'clock; SVG y-positive down. */
function polarFromTop(cx: number, cy: number, r: number, degCwFromTop: number) {
  const rad = degCwFromTop * RAD;
  return { x: cx + r * Math.sin(rad), y: cy - r * Math.cos(rad) };
}

/** Triangular teeth; tip at radius + toothHeight (spec: 18 → 23). */
function generateTeeth(cx: number, cy: number, radius: number, count: number, toothHeight: number): string[] {
  const outerR = radius + toothHeight;
  const step = 360 / count;
  const polys: string[] = [];
  for (let i = 0; i < count; i++) {
    const c = i * step;
    const b1 = polarFromTop(cx, cy, radius, c - TOOTH_DELTA_DEG);
    const b2 = polarFromTop(cx, cy, radius, c + TOOTH_DELTA_DEG);
    const tip = polarFromTop(cx, cy, outerR, c);
    polys.push(`${b1.x},${b1.y} ${b2.x},${b2.y} ${tip.x},${tip.y}`);
  }
  return polys;
}

function innerHexHubPoints(cx: number, cy: number, vertexRadius: number): string {
  return [0, 60, 120, 180, 240, 300]
    .map((deg) => {
      const p = polarFromTop(cx, cy, vertexRadius, deg);
      return `${p.x},${p.y}`;
    })
    .join(" ");
}

function JourneyShifter({
  phaseIndex,
  navigateToSlot,
}: {
  phaseIndex: number;
  navigateToSlot: (slotIndex: number) => void;
}) {
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusSlot = useCallback((i: number) => {
    const j = ((i % POSITION_COUNT) + POSITION_COUNT) % POSITION_COUNT;
    queueMicrotask(() => btnRefs.current[j]?.focus());
  }, []);

  const onNodeKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>, slotIndex: number) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        const next = (slotIndex + 1) % POSITION_COUNT;
        navigateToSlot(next);
        focusSlot(next);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        const next = (slotIndex - 1 + POSITION_COUNT) % POSITION_COUNT;
        navigateToSlot(next);
        focusSlot(next);
      }
    },
    [navigateToSlot, focusSlot],
  );

  const hStrokeD = [
    "M 120 40 L 120 200",
    "M 300 40 L 300 200",
    "M 480 40 L 480 200",
    "M 120 120 L 480 120",
  ].join(" ");

  return (
    <div className="autodesk-journey-shifter">
      <nav className="autodesk-journey-shifter-nav" aria-label="Customer Value Journey phases">
        <svg className="autodesk-journey-shifter-svg" viewBox="0 0 600 240" aria-hidden="true">
          <path className="autodesk-journey-shifter-stroke" d={hStrokeD} fill="none" />

          {SHIFTER_LAYOUT.map((slot) => {
            const isRenewal = slot.role === "renewal";
            const phase = !isRenewal ? PHASES[slot.slotIndex] : null;
            const isActive = phaseIndex === slot.slotIndex;
            const fullLabel = isRenewal
              ? "R · RENEWAL"
              : `${phase!.idx} · ${phase!.title.toUpperCase()}`;
            const shortLabel = SHIFTER_LABEL_SHORT[slot.slotIndex];
            const labelY = slot.labelTop ? 14 : 228;
            const labelAnchorClass = slot.labelTop
              ? "autodesk-journey-shifter-label autodesk-journey-shifter-label--top"
              : "autodesk-journey-shifter-label autodesk-journey-shifter-label--bottom";

            const cx = slot.cx;
            const cy = slot.cy;

            const forwardNodeClass = [
              "autodesk-journey-shifter-node",
              isActive ? "autodesk-journey-shifter-node--active" : "",
            ]
              .filter(Boolean)
              .join(" ");

            const renewalNodeClass = [
              "autodesk-journey-shifter-node--renewal",
              isActive ? "autodesk-journey-shifter-node--active" : "",
            ]
              .filter(Boolean)
              .join(" ");

            const numberFillClass = `autodesk-journey-shifter-number${isActive ? " autodesk-journey-shifter-number--active" : ""}`;

            const toothClass = [
              "autodesk-journey-shifter-tooth",
              isActive ? "autodesk-journey-shifter-tooth--active" : "",
            ]
              .filter(Boolean)
              .join(" ");

            const circleTeeth = !isRenewal
              ? generateTeeth(cx, cy, GEAR_INNER_R, 12, TOOTH_HEIGHT)
              : generateTeeth(cx, cy, GEAR_INNER_R, 6, TOOTH_HEIGHT);

            return (
              <g key={slot.slotIndex} className="autodesk-journey-shifter-slot">
                {!isRenewal ? (
                  <>
                    {circleTeeth.map((pts, ti) => (
                      <polygon key={`t-${ti}`} className={toothClass} points={pts} pointerEvents="none" />
                    ))}
                    <circle className={forwardNodeClass} cx={cx} cy={cy} r={GEAR_INNER_R} pointerEvents="none" />
                    <circle className="autodesk-journey-shifter-hub" cx={cx} cy={cy} r={6} pointerEvents="none" />
                  </>
                ) : (
                  <>
                    {circleTeeth.map((pts, ti) => (
                      <polygon key={`ht-${ti}`} className={toothClass} points={pts} pointerEvents="none" />
                    ))}
                    <polygon className={renewalNodeClass} points={R_HEX_POINTS} pointerEvents="none" />
                    <polygon
                      className="autodesk-journey-shifter-hub autodesk-journey-shifter-hub--hex"
                      points={innerHexHubPoints(cx, cy, 6)}
                      pointerEvents="none"
                    />
                  </>
                )}
                <text
                  className={`${numberFillClass}${isRenewal ? " autodesk-journey-shifter-number--renewal" : ""}`}
                  x={cx}
                  y={cy}
                  textAnchor="middle"
                  dominantBaseline="central"
                  pointerEvents="none"
                >
                  {isRenewal ? "R" : phase!.idx}
                </text>
                <text
                  className={`${labelAnchorClass} autodesk-journey-shifter-label-full${isActive ? " autodesk-journey-shifter-label--active" : ""}`}
                  x={cx}
                  y={labelY}
                  textAnchor="middle"
                  dominantBaseline={slot.labelTop ? "auto" : "hanging"}
                  pointerEvents="none"
                >
                  {fullLabel}
                </text>
                <text
                  className={`${labelAnchorClass} autodesk-journey-shifter-label-short${isActive ? " autodesk-journey-shifter-label--active" : ""}`}
                  x={cx}
                  y={labelY}
                  textAnchor="middle"
                  dominantBaseline={slot.labelTop ? "auto" : "hanging"}
                  pointerEvents="none"
                >
                  {shortLabel}
                </text>
                <foreignObject x={cx - 22} y={cy - 22} width="44" height="44">
                  <div className="autodesk-journey-shifter-fo-root">
                    <button
                      ref={(el) => {
                        btnRefs.current[slot.slotIndex] = el;
                      }}
                      type="button"
                      className="autodesk-journey-shifter-hit"
                      aria-current={isActive ? "true" : undefined}
                      aria-label={
                        isRenewal ? "Renewal: Renewal" : `Phase ${phase!.idx}: ${phase!.title}`
                      }
                      onClick={() => navigateToSlot(slot.slotIndex)}
                      onKeyDown={(e) => onNodeKeyDown(e, slot.slotIndex)}
                    />
                  </div>
                </foreignObject>
              </g>
            );
          })}
          <g className="autodesk-journey-shifter-stick" aria-hidden="true">
            {(() => {
              const a = SHIFTER_LAYOUT[phaseIndex];
              const x = a.cx;
              const y = a.cy;
              return (
                <>
                  <line x1={x} y1={y} x2={x} y2={y - 28} />
                  <circle cx={x} cy={y - 28} r={5} />
                </>
              );
            })()}
          </g>
        </svg>
      </nav>
    </div>
  );
}

export function AutodeskJourneyArtifact() {
  const [tier, setTier] = useState<Tier>("growth");
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [lastPhaseIndex, setLastPhaseIndex] = useState(0);
  const [isWide, setIsWide] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1025px)");
    const sync = () => setIsWide(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (phaseIndex < PHASES.length) setLastPhaseIndex(phaseIndex);
  }, [phaseIndex]);

  const navigateToSlot = useCallback((slotIndex: number) => {
    const i = ((slotIndex % POSITION_COUNT) + POSITION_COUNT) % POSITION_COUNT;
    setPhaseIndex(i);
  }, []);

  const phase = phaseIndex < PHASES.length ? PHASES[phaseIndex] : null;
  const footerPhase = PHASES[lastPhaseIndex];
  const slideOrdinal = Number.parseInt(footerPhase.idx, 10);
  const renewalActive = phaseIndex === RENEWAL_SLOT;

  return (
    <div className="autodesk-journey-root">
      <section
        className="autodesk-journey-artifact autodesk-blueprint"
        data-tier={tier}
        data-renewal-active={renewalActive ? "true" : "false"}
        data-layout-wide={isWide ? "true" : "false"}
        aria-label="Customer Value Journey"
      >
        <div className="autodesk-journey-intro">
          <span className="autodesk-journey-intro-k">FUTURE.JOURNEY + BACKSTAGE</span>
          <span className="autodesk-journey-intro-t">
            End-to-end post-purchase experience · one journey, two service tiers
          </span>
        </div>

        <div className="autodesk-journey-toolbar">
          <div className="autodesk-journey-tier-toggle">
            <span className="autodesk-journey-tier-indicator" aria-hidden="true" />
            <button
              type="button"
              className="autodesk-journey-tier-toggle-btn"
              aria-pressed={tier === "growth"}
              data-tier="growth"
              data-active={tier === "growth"}
              onClick={() => setTier("growth")}
            >
              ● GROWTH PLUS <small>~700–1000</small>
            </button>
            <button
              type="button"
              className="autodesk-journey-tier-toggle-btn"
              aria-pressed={tier === "nurture"}
              data-tier="nurture"
              data-active={tier === "nurture"}
              onClick={() => setTier("nurture")}
            >
              ● NURTURE PLUS <small>~400–600</small>
            </button>
          </div>
        </div>

        <p className="autodesk-journey-tier-summary" data-tier={tier}>
          {TIER_LABELS[tier]}
        </p>

        <div className="autodesk-journey-body">
          <div className="autodesk-journey-left-column">
            <JourneyShifter phaseIndex={phaseIndex} navigateToSlot={navigateToSlot} />
          </div>
          <div className="autodesk-journey-right-column">
            <div className="autodesk-journey-detail-stack">
              <div
                className={`autodesk-journey-detail-layer${renewalActive ? "" : " autodesk-journey-detail-layer--visible"}`}
                aria-hidden={renewalActive}
              >
                {phase ? (
                  <div className="autodesk-journey-phase-card">
                    <header className="autodesk-journey-slide-head">
                      <span className="autodesk-journey-slide-idx">{phase.idx}</span>
                      <span className="autodesk-journey-slide-ttl">{phase.title}</span>
                      <p className="autodesk-journey-slide-dek">{phase.dek}</p>
                    </header>
                    <div className="autodesk-journey-slide-panel">
                      <ActsList key={`${phase.idx}-${tier}`} tier={tier} phase={phase} />
                      <BackstageBlock rows={phase.backstage} />
                    </div>
                  </div>
                ) : null}
              </div>

              <div
                className={`autodesk-journey-detail-layer${renewalActive ? " autodesk-journey-detail-layer--visible" : ""}`}
                aria-hidden={!renewalActive}
              >
                <div className="autodesk-journey-phase-card autodesk-journey-phase-card--renewal">
                  <RenewalPanel />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="autodesk-journey-footer-stack">
          <div
            className={`autodesk-journey-footer-layer${renewalActive ? "" : " autodesk-journey-footer-layer--visible"}`}
            aria-hidden={renewalActive}
          >
            <SlideFooterBand tier={tier} slideOrdinal={slideOrdinal} renewal={false} layerKey={`p-${tier}-${slideOrdinal}`} />
          </div>
          <div
            className={`autodesk-journey-footer-layer${renewalActive ? " autodesk-journey-footer-layer--visible" : ""}`}
            aria-hidden={!renewalActive}
          >
            <SlideFooterBand tier={tier} slideOrdinal={slideOrdinal} renewal layerKey={`r-${tier}`} />
          </div>
        </div>
      </section>
    </div>
  );
}
