"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

/* =========================================================================
 * Service Assembly · five-phase customer-planning blueprint with interactivity.
 *
 * v3 upgrades from v2 (legacy lift):
 *   1. Phase click-to-expand (one expanded at a time; Phase 01 default).
 *   2. Backstage toggle (SHOW BACKSTAGE / HIDE BACKSTAGE) — dramatizes the
 *      central argument that "the design lived in the backstage".
 *   3. Visibly transforming tier swap — sliding-indicator pill + crossfade
 *      on the frontstage list of every expanded phase.
 *   4. Mobile carousel (scroll-snap) at ≤ 768px; each slide = one phase,
 *      always expanded. Dot indicators + "View full blueprint" escape hatch
 *      that opens a fullscreen modal containing the desktop blueprint.
 *
 * All transitions wrapped in `@media (prefers-reduced-motion: reduce)` via
 * scoped CSS overrides (see case-autodesk.css).
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

/* -------------------------------------------------------------------------
 *  Inner blueprint primitives — used by desktop grid AND by fullscreen modal
 *  so the legacy 5-column layout always exists somewhere on the page.
 * ----------------------------------------------------------------------- */

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`autodesk-bp-chevron${open ? " is-open" : ""}`}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 5l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ActsList({ tier, phase, animKey }: { tier: Tier; phase: Phase; animKey: string }) {
  const content = phase[tier];
  return (
    <div className="autodesk-bp-acts-wrap" key={animKey}>
      <span className="autodesk-bp-rail-sub">{content.sub}</span>
      <ul className="autodesk-bp-acts">
        {content.acts.map((a) => (
          <li
            key={a.text}
            className={
              a.kind === "star"
                ? "autodesk-bp-acts-star"
                : a.kind === "help"
                  ? "autodesk-bp-acts-help"
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

function BackstageBlock({ rows, justRevealed }: { rows: BackstageRow[]; justRevealed: boolean }) {
  return (
    <div
      className={`autodesk-bp-backstage${justRevealed ? " is-just-revealed" : ""}`}
      aria-label="Backstage row"
    >
      <span className="autodesk-bp-backstage-divider" aria-hidden="true">
        <span>↓ backstage</span>
      </span>
      <div className="autodesk-bp-backstage-rows">
        {rows.map((r) => (
          <span key={r.label} className="autodesk-bp-bs">
            <b>{r.label}</b> · {r.text}
          </span>
        ))}
      </div>
    </div>
  );
}

function PhaseColumn({
  phase,
  expanded,
  onToggle,
  tier,
  showBackstage,
  backstageJustRevealed,
  alwaysExpanded = false,
  panelId,
}: {
  phase: Phase;
  expanded: boolean;
  onToggle: () => void;
  tier: Tier;
  showBackstage: boolean;
  backstageJustRevealed: boolean;
  alwaysExpanded?: boolean;
  panelId: string;
}) {
  const isOpen = alwaysExpanded || expanded;
  const handleKey = (e: React.KeyboardEvent) => {
    if (alwaysExpanded) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle();
    }
  };
  return (
    <div
      className={`autodesk-bp-col autodesk-bp-phase-col${isOpen ? " is-expanded" : ""}`}
      data-phase={phase.idx}
    >
      <button
        type="button"
        className="autodesk-bp-phase-header"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        onKeyDown={handleKey}
        disabled={alwaysExpanded}
      >
        <span className="autodesk-bp-idx">{phase.idx}</span>
        <span className="autodesk-bp-ttl">{phase.title}</span>
        <span className="autodesk-bp-sub">{phase.dek}</span>
        {!isOpen ? (
          <span className="autodesk-bp-preview" key={`${phase.idx}-${tier}`}>
            <span className="autodesk-bp-preview-list">{phase[tier].preview}</span>
          </span>
        ) : null}
        {!alwaysExpanded ? (
          <span className="autodesk-bp-expand-row" aria-hidden="true">
            <Chevron open={isOpen} />
            <span className="autodesk-bp-expand-hint">
              {isOpen ? "↑ collapse" : "↓ expand for full detail"}
            </span>
          </span>
        ) : null}
      </button>
      <div
        className="autodesk-bp-panel"
        id={panelId}
        role="region"
        aria-hidden={!isOpen}
        data-open={isOpen ? "true" : "false"}
      >
        <ActsList tier={tier} phase={phase} animKey={`${phase.idx}-${tier}`} />
        {showBackstage ? (
          <BackstageBlock rows={phase.backstage} justRevealed={backstageJustRevealed} />
        ) : null}
      </div>
    </div>
  );
}

function BlueprintShell({
  tier,
  setTier,
  showBackstage,
  setShowBackstage,
  expandedIdx,
  setExpandedIdx,
  backstageJustRevealed,
  mode,
  idBase,
}: {
  tier: Tier;
  setTier: (t: Tier) => void;
  showBackstage: boolean;
  setShowBackstage: (b: boolean) => void;
  expandedIdx: number;
  setExpandedIdx: (i: number) => void;
  backstageJustRevealed: boolean;
  mode: "grid" | "carousel" | "modal";
  idBase: string;
}) {
  const phaseCols = PHASES.map((phase, i) => (
    <PhaseColumn
      key={phase.idx}
      phase={phase}
      expanded={expandedIdx === i}
      onToggle={() => setExpandedIdx(expandedIdx === i ? -1 : i)}
      tier={tier}
      showBackstage={showBackstage}
      backstageJustRevealed={backstageJustRevealed && expandedIdx === i}
      alwaysExpanded={mode === "carousel"}
      panelId={`${idBase}-panel-${i}`}
    />
  ));

  return (
    <section
      className={`autodesk-blueprint autodesk-blueprint--${mode}`}
      data-tier={tier}
      data-backstage={showBackstage ? "on" : "off"}
      aria-label="Future journey and backstage blueprint"
    >
      <div className="autodesk-bp-head">
        <span className="autodesk-bp-head-k">FUTURE.JOURNEY + BACKSTAGE</span>
        <span className="autodesk-bp-head-t">
          End-to-end post-purchase experience · one journey, two service tiers
        </span>
        <span className="autodesk-bp-head-spacer" />

        <span className="autodesk-tier-toggle" role="radiogroup" aria-label="Service tier">
          <span className="autodesk-tier-toggle-indicator" aria-hidden="true" />
          <button
            type="button"
            role="radio"
            aria-checked={tier === "growth"}
            data-tier="growth"
            data-active={tier === "growth"}
            onClick={() => setTier("growth")}
          >
            ● GROWTH PLUS <small>~700–1000</small>
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={tier === "nurture"}
            data-tier="nurture"
            data-active={tier === "nurture"}
            onClick={() => setTier("nurture")}
          >
            ● NURTURE PLUS <small>~400–600</small>
          </button>
        </span>

        <button
          type="button"
          className="autodesk-backstage-toggle"
          aria-pressed={showBackstage}
          onClick={() => setShowBackstage(!showBackstage)}
        >
          <span className="autodesk-backstage-toggle-dot" aria-hidden="true" />
          {showBackstage ? "HIDE BACKSTAGE" : "SHOW BACKSTAGE"}
        </button>
      </div>

      <p className="autodesk-tier-summary" data-tier={tier}>
        {TIER_LABELS[tier]}
      </p>

      <div className="autodesk-bp-stage">
        <div className="autodesk-bp-grid">{phaseCols}</div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
 *  Mobile carousel — scroll-snap, dot indicators, fullscreen escape hatch
 * ----------------------------------------------------------------------- */

function CarouselDots({
  count,
  active,
  onSelect,
}: {
  count: number;
  active: number;
  onSelect: (i: number) => void;
}) {
  return (
    <ol className="autodesk-bp-carousel-dots" aria-label="Phase indicators">
      {Array.from({ length: count }, (_, i) => (
        <li key={i}>
          <button
            type="button"
            aria-label={`Show phase ${String(i + 1).padStart(2, "0")}`}
            aria-current={i === active ? "step" : undefined}
            data-active={i === active}
            onClick={() => onSelect(i)}
          />
        </li>
      ))}
    </ol>
  );
}

/* -------------------------------------------------------------------------
 *  Fullscreen modal — desktop blueprint inside scrollable / zoomable container
 * ----------------------------------------------------------------------- */

function FullscreenModal({
  open,
  onClose,
  tier,
  setTier,
  showBackstage,
  setShowBackstage,
  expandedIdx,
  setExpandedIdx,
  backstageJustRevealed,
  returnFocusRef,
}: {
  open: boolean;
  onClose: () => void;
  tier: Tier;
  setTier: (t: Tier) => void;
  showBackstage: boolean;
  setShowBackstage: (b: boolean) => void;
  expandedIdx: number;
  setExpandedIdx: (i: number) => void;
  backstageJustRevealed: boolean;
  returnFocusRef: React.RefObject<HTMLButtonElement>;
}) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      returnFocusRef.current?.focus();
    };
  }, [open, onClose, returnFocusRef]);

  if (!open) return null;

  return (
    <div
      className="autodesk-bp-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Full blueprint"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="autodesk-bp-modal-frame">
        <header className="autodesk-bp-modal-bar">
          <span className="autodesk-bp-modal-k">FULL BLUEPRINT · pinch-zoom &amp; pan supported</span>
          <button
            type="button"
            className="autodesk-bp-modal-close"
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Close full blueprint"
          >
            ✕
          </button>
        </header>
        <div className="autodesk-bp-modal-scroll">
          <BlueprintShell
            tier={tier}
            setTier={setTier}
            showBackstage={showBackstage}
            setShowBackstage={setShowBackstage}
            expandedIdx={expandedIdx}
            setExpandedIdx={setExpandedIdx}
            backstageJustRevealed={backstageJustRevealed}
            mode="modal"
            idBase="autodesk-bp-modal"
          />
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
 *  Top-level artifact — picks desktop vs. mobile, owns interaction state.
 * ----------------------------------------------------------------------- */

export function AutodeskJourneyArtifact() {
  const [tier, setTier] = useState<Tier>("growth");
  const [showBackstage, setShowBackstage] = useState<boolean>(false);
  const [expandedIdx, setExpandedIdx] = useState<number>(0);
  const [backstageJustRevealed, setBackstageJustRevealed] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [carouselIdx, setCarouselIdx] = useState<number>(0);

  const carouselRef = useRef<HTMLDivElement>(null);
  const modalTriggerRef = useRef<HTMLButtonElement>(null);
  const idBase = useId().replace(/:/g, "");

  // Flash backstage "↓ backstage" indicator for ~600ms after reveal.
  useEffect(() => {
    if (!showBackstage) {
      setBackstageJustRevealed(false);
      return;
    }
    setBackstageJustRevealed(true);
    const t = window.setTimeout(() => setBackstageJustRevealed(false), 700);
    return () => window.clearTimeout(t);
  }, [showBackstage]);

  // Sync carousel scroll position → active dot
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const slideW = el.clientWidth * 0.85;
        const idx = Math.round(el.scrollLeft / slideW);
        const clamped = Math.max(0, Math.min(PHASES.length - 1, idx));
        setCarouselIdx(clamped);
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const scrollToSlide = useCallback((i: number) => {
    const el = carouselRef.current;
    if (!el) return;
    const slideW = el.clientWidth * 0.85;
    el.scrollTo({ left: slideW * i, behavior: "smooth" });
  }, []);

  return (
    <div className="autodesk-blueprint-root">
      {/* Desktop grid · visible ≥ 769px */}
      <div className="autodesk-blueprint-desktop">
        <BlueprintShell
          tier={tier}
          setTier={setTier}
          showBackstage={showBackstage}
          setShowBackstage={setShowBackstage}
          expandedIdx={expandedIdx}
          setExpandedIdx={setExpandedIdx}
          backstageJustRevealed={backstageJustRevealed}
          mode="grid"
          idBase={`${idBase}-desk`}
        />
      </div>

      {/* Mobile carousel · visible ≤ 768px */}
      <div className="autodesk-blueprint-mobile">
        <section
          className="autodesk-blueprint autodesk-blueprint--carousel"
          data-tier={tier}
          data-backstage={showBackstage ? "on" : "off"}
          aria-label="Future journey and backstage blueprint (mobile)"
        >
          <div className="autodesk-bp-head autodesk-bp-head--mobile">
            <span className="autodesk-bp-head-k">FUTURE.JOURNEY + BACKSTAGE</span>
            <span className="autodesk-tier-toggle" role="radiogroup" aria-label="Service tier">
              <span className="autodesk-tier-toggle-indicator" aria-hidden="true" />
              <button
                type="button"
                role="radio"
                aria-checked={tier === "growth"}
                data-tier="growth"
                data-active={tier === "growth"}
                onClick={() => setTier("growth")}
              >
                ● GROWTH
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={tier === "nurture"}
                data-tier="nurture"
                data-active={tier === "nurture"}
                onClick={() => setTier("nurture")}
              >
                ● NURTURE
              </button>
            </span>
            <button
              type="button"
              className="autodesk-backstage-toggle"
              aria-pressed={showBackstage}
              onClick={() => setShowBackstage(!showBackstage)}
            >
              <span className="autodesk-backstage-toggle-dot" aria-hidden="true" />
              {showBackstage ? "HIDE BACKSTAGE" : "SHOW BACKSTAGE"}
            </button>
          </div>

          <p className="autodesk-tier-summary" data-tier={tier}>
            {TIER_LABELS[tier]}
          </p>

          <div className="autodesk-bp-carousel" ref={carouselRef}>
            {PHASES.map((phase, i) => (
              <div className="autodesk-bp-carousel-slide" key={phase.idx}>
                <PhaseColumn
                  phase={phase}
                  expanded
                  onToggle={() => {}}
                  tier={tier}
                  showBackstage={showBackstage}
                  backstageJustRevealed={backstageJustRevealed}
                  alwaysExpanded
                  panelId={`${idBase}-mob-panel-${i}`}
                />
              </div>
            ))}
          </div>

          <CarouselDots count={PHASES.length} active={carouselIdx} onSelect={scrollToSlide} />

          <button
            type="button"
            className="autodesk-bp-modal-trigger"
            ref={modalTriggerRef}
            onClick={() => setModalOpen(true)}
          >
            <span aria-hidden="true">⤢</span> View full blueprint
          </button>
        </section>
      </div>

      <FullscreenModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        tier={tier}
        setTier={setTier}
        showBackstage={showBackstage}
        setShowBackstage={setShowBackstage}
        expandedIdx={expandedIdx}
        setExpandedIdx={setExpandedIdx}
        backstageJustRevealed={backstageJustRevealed}
        returnFocusRef={modalTriggerRef}
      />
    </div>
  );
}
