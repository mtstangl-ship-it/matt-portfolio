"use client";

import type { KeyboardEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

/* =========================================================================
 * Autodesk Journey Artifact · guided carousel (single phase at a time).
 * Tier + backstage toggles preserved; phase data co-located in PHASES.
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

const TIER_LABELS = {
  growth: "GROWTH PLUS · ~700–1000 accounts · high-touch",
  nurture: "NURTURE PLUS · ~400–600 accounts · digital-guided",
} as const;

type Tier = "growth" | "nurture";

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

function PhaseSlideCard({
  phase,
  tier,
  showBackstage,
  slideProps,
}: {
  phase: Phase;
  tier: Tier;
  showBackstage: boolean;
  slideProps: {
    role: "group";
    "aria-roledescription": string;
    "aria-label": string;
    id?: string;
  };
}) {
  return (
    <div className="autodesk-journey-slide-inner" {...slideProps}>
      <header className="autodesk-journey-slide-head">
        <span className="autodesk-journey-slide-idx">{phase.idx}</span>
        <span className="autodesk-journey-slide-ttl">{phase.title}</span>
        <p className="autodesk-journey-slide-dek">{phase.dek}</p>
      </header>
      <div className="autodesk-journey-slide-panel">
        <ActsList key={`${phase.idx}-${tier}`} tier={tier} phase={phase} />
        <div
          className="autodesk-journey-backstage-shell"
          data-open={showBackstage ? "true" : "false"}
          aria-hidden={!showBackstage}
        >
          <div className="autodesk-journey-backstage-shell-inner">
            <BackstageBlock rows={phase.backstage} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function AutodeskJourneyArtifact() {
  const [tier, setTier] = useState<Tier>("growth");
  const [showBackstage, setShowBackstage] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [isWide, setIsWide] = useState(true);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1025px)");
    const sync = () => setIsWide(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const navigatePhase = useCallback(
    (next: number, scrollMobile: "smooth" | "instant" = "smooth") => {
      const len = PHASES.length;
      const i = ((next % len) + len) % len;
      setPhaseIndex(i);
      const el = scrollRef.current;
      if (!isWide && el) {
        const w = el.clientWidth;
        el.scrollTo({ left: w * i, behavior: scrollMobile === "instant" ? "auto" : "smooth" });
      }
    },
    [isWide],
  );

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || isWide) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const w = el.clientWidth;
        if (w <= 0) return;
        const idx = Math.round(el.scrollLeft / w);
        const clamped = Math.max(0, Math.min(PHASES.length - 1, idx));
        setPhaseIndex((prev) => (prev === clamped ? prev : clamped));
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [isWide]);

  useEffect(() => {
    if (isWide || !scrollRef.current) return;
    const el = scrollRef.current;
    const w = el.clientWidth;
    el.scrollTo({ left: w * phaseIndex, behavior: "auto" });
  }, [isWide]);

  const onRegionKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      navigatePhase(phaseIndex - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      navigatePhase(phaseIndex + 1);
    }
  };

  const phase = PHASES[phaseIndex];

  return (
    <div className="autodesk-journey-root">
      <section
        tabIndex={0}
        className="autodesk-journey-carousel autodesk-blueprint"
        data-tier={tier}
        data-backstage={showBackstage ? "on" : "off"}
        role="region"
        aria-roledescription="carousel"
        aria-label="Customer Value Journey"
        onKeyDown={onRegionKeyDown}
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

          <button
            type="button"
            className="autodesk-journey-backstage-toggle"
            aria-pressed={showBackstage}
            onClick={() => setShowBackstage((v) => !v)}
          >
            <span className="autodesk-journey-backstage-dot" aria-hidden="true" />
            {showBackstage ? "HIDE BACKSTAGE" : "SHOW BACKSTAGE"}
          </button>
        </div>

        <p className="autodesk-journey-tier-summary" data-tier={tier}>
          {TIER_LABELS[tier]}
        </p>

        {isWide ? (
          <div className="autodesk-journey-viewport autodesk-journey-viewport--desktop">
            <div className="autodesk-journey-desktop-pane" key={phaseIndex}>
              <PhaseSlideCard
                phase={phase}
                tier={tier}
                showBackstage={showBackstage}
                slideProps={{
                  role: "group",
                  "aria-roledescription": "slide",
                  "aria-label": `Phase ${phase.idx}: ${phase.title}`,
                }}
              />
            </div>
          </div>
        ) : (
          <div className="autodesk-journey-viewport autodesk-journey-viewport--scroll" ref={scrollRef}>
            <div className="autodesk-journey-track">
              {PHASES.map((p) => (
                <div className="autodesk-journey-slide" key={p.idx}>
                  <PhaseSlideCard
                    phase={p}
                    tier={tier}
                    showBackstage={showBackstage}
                    slideProps={{
                      role: "group",
                      "aria-roledescription": "slide",
                      "aria-label": `Phase ${p.idx}: ${p.title}`,
                      id: `autodesk-journey-slide-${p.idx}`,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="autodesk-journey-controls">
          <button
            type="button"
            className="autodesk-journey-prev"
            aria-label="Previous phase"
            onClick={() => navigatePhase(phaseIndex - 1)}
          >
            ← prev
          </button>

          <div className="autodesk-journey-progress">
            <div className="autodesk-journey-dots-row" role="presentation">
              {PHASES.map((p, i) => (
                <button
                  key={p.idx}
                  type="button"
                  className={`autodesk-journey-dot${i === phaseIndex ? " autodesk-journey-dot--active" : ""}`}
                  aria-label={`Go to phase ${p.idx}`}
                  aria-current={i === phaseIndex ? "true" : undefined}
                  onClick={() => navigatePhase(i, "smooth")}
                />
              ))}
            </div>
            <span className="autodesk-journey-progress-label">
              {phase.idx} · {phase.title}
            </span>
          </div>

          <button
            type="button"
            className="autodesk-journey-next"
            aria-label="Next phase"
            onClick={() => navigatePhase(phaseIndex + 1)}
          >
            next →
          </button>
        </div>
      </section>
    </div>
  );
}
