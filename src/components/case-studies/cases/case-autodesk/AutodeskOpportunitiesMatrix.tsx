"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* =========================================================================
 * Autodesk · Top 5 Opportunities matrix (Section 04 supporting artifact).
 *
 * Restates the engagement output ("Summary: Top 5 opportunities" internal
 * slide) in Tier-A grammar: no illustrations, no Autodesk branding, fiche-
 * register columns and bands. Static on desktop (the journey artifact in
 * Section 02 is the interactive centerpiece); mobile gets the same
 * scroll-snap carousel + fullscreen-modal pattern as the journey artifact.
 * ========================================================================= */

type Opportunity = {
  idx: string;
  title: string;
  dek: string;
  digital: string[];
  outcomes: string[];
};

const OPPORTUNITIES: Opportunity[] = [
  {
    idx: "01",
    title: "Inform, inspire, align",
    dek: "Workshops and check-ins that uncover, build, validate, and update customer business intents (CBIs).",
    digital: [
      "Explore industry trends & goals",
      "Configure CBI-based relevant outcomes & capabilities",
      "Gather/review user goals",
    ],
    outcomes: ["Faster pipeline velocity", "Improved EX effort & satisfaction"],
  },
  {
    idx: "02",
    title: "Compare workflow changes",
    dek: "Methods that help customers compare specific workflow changes with risks and benefits.",
    digital: [
      "Gather/review workflow insights",
      "Explore personalized use-cases with existing solutions",
    ],
    outcomes: [
      "Faster pipeline velocity",
      "Faster implementation time",
      "Improved EX effort & satisfaction",
    ],
  },
  {
    idx: "03",
    title: "Create, customize, track rollout",
    dek: "Hybrid-guided experience that helps customers prepare for rollout and support adoption.",
    digital: [
      "Customize goals & metrics",
      "Find & assign learning paths",
      "Find service-provider offerings & request coaching/training",
      "Monitor adoption, activities, progress against goals",
    ],
    outcomes: [
      "Faster implementation time",
      "Increase consumption & usage",
      "Improved EX effort & satisfaction",
    ],
  },
  {
    idx: "04",
    title: "Estimate ROI, track value, celebrate",
    dek: "Hybrid-guided experience that helps customers estimate ROI, plan value tracking, and share success stories.",
    digital: [
      "Estimate quantitative & qualitative value of use-cases",
      "Customize & track value metrics",
      "Gather/review user feedback",
      "Create & share report/case-study with leaders & community",
    ],
    outcomes: ["Increased value delivered", "Improved EX effort & satisfaction"],
  },
  {
    idx: "05",
    title: "Build trust · technical health",
    dek: "High-touch check-ins providing roadmap insights, feature request status, and escalation management.",
    digital: [
      "Monitor technical health",
      "Escalate support tickets",
      "Provide feedback on products",
      "Create & track feature requests",
      "View relevant product updates",
    ],
    outcomes: ["Improved EX effort & satisfaction"],
  },
];

const DIGITAL_LABEL = "GUIDING DIGITAL EXPERIENCE";
const OUTCOMES_LABEL = "BUSINESS OUTCOMES";

/* -------------------------------------------------------------------------
 *  Reusable primitives
 * ----------------------------------------------------------------------- */

function OppHeader({ opp }: { opp: Opportunity }) {
  return (
    <div className="autodesk-opps-header">
      <span className="autodesk-opps-idx">{opp.idx}</span>
      <h4 className="autodesk-opps-ttl">{opp.title}</h4>
      <p className="autodesk-opps-dek">{opp.dek}</p>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="autodesk-opps-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function BandLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="autodesk-opps-band-label">
      <span>{children}</span>
    </div>
  );
}

function MatrixMobileStack() {
  return (
    <div className="autodesk-opps-modal-stack">
      {OPPORTUNITIES.map((opp, i) => (
        <article className="autodesk-opps-modal-card" key={opp.idx}>
          <OppHeader opp={opp} />
          <div className="autodesk-opps-mobile-band">
            <BandLabel>{DIGITAL_LABEL}</BandLabel>
            <BulletList items={opp.digital} />
          </div>
          <div className="autodesk-opps-mobile-band">
            <BandLabel>{OUTCOMES_LABEL}</BandLabel>
            <BulletList items={opp.outcomes} />
          </div>
          {i < OPPORTUNITIES.length - 1 ? (
            <hr className="autodesk-opps-modal-card-sep" aria-hidden="true" />
          ) : null}
        </article>
      ))}
    </div>
  );
}

function MatrixGrid({ minWidth }: { minWidth?: number }) {
  return (
    <div
      className="autodesk-opps-grid"
      style={minWidth ? { minWidth: `${minWidth}px` } : undefined}
    >
      <div className="autodesk-opps-band autodesk-opps-band--header">
        {OPPORTUNITIES.map((opp) => (
          <div key={opp.idx} className="autodesk-opps-col">
            <OppHeader opp={opp} />
          </div>
        ))}
      </div>

      <BandLabel>{DIGITAL_LABEL}</BandLabel>
      <div className="autodesk-opps-band">
        {OPPORTUNITIES.map((opp) => (
          <div key={opp.idx} className="autodesk-opps-col">
            <BulletList items={opp.digital} />
          </div>
        ))}
      </div>

      <BandLabel>{OUTCOMES_LABEL}</BandLabel>
      <div className="autodesk-opps-band">
        {OPPORTUNITIES.map((opp) => (
          <div key={opp.idx} className="autodesk-opps-col">
            <BulletList items={opp.outcomes} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
 *  Fullscreen modal (mirrors the journey artifact's modal contract)
 * ----------------------------------------------------------------------- */

function MatrixModal({
  open,
  onClose,
  returnFocusRef,
}: {
  open: boolean;
  onClose: () => void;
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
      className="autodesk-opps-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Full opportunities matrix"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="autodesk-opps-modal-frame">
        <header className="autodesk-opps-modal-bar">
          <span className="autodesk-opps-modal-k">
            TOP 5 OPPORTUNITIES · full matrix
          </span>
          <button
            type="button"
            className="autodesk-opps-modal-close"
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Close full matrix"
          >
            ✕
          </button>
        </header>
        <div className="autodesk-opps-modal-scroll">
          <div className="autodesk-opps-modal-desktop">
            <MatrixGrid minWidth={1100} />
          </div>
          <div className="autodesk-opps-modal-mobile">
            <MatrixMobileStack />
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
 *  Top-level artifact
 * ----------------------------------------------------------------------- */

export function AutodeskOpportunitiesMatrix() {
  const [carouselIdx, setCarouselIdx] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const modalTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const slideW = el.clientWidth * 0.85;
        const idx = Math.round(el.scrollLeft / slideW);
        setCarouselIdx(Math.max(0, Math.min(OPPORTUNITIES.length - 1, idx)));
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
    <section
      className="autodesk-opps-matrix"
      aria-label="Top 5 opportunities prioritized from CX/EX research"
    >
      <span className="autodesk-opps-stamp">
        FIG. 04-A · TOP 5 OPPORTUNITIES · PRIORITIZED FROM CX/EX RESEARCH
      </span>

      {/* Desktop · static 5-column grid */}
      <div className="autodesk-opps-desktop">
        <MatrixGrid />
      </div>

      {/* Mobile · scroll-snap carousel + modal escape hatch */}
      <div className="autodesk-opps-mobile">
        <div className="autodesk-opps-carousel" ref={carouselRef}>
          {OPPORTUNITIES.map((opp) => (
            <article className="autodesk-opps-carousel-slide" key={opp.idx}>
              <OppHeader opp={opp} />
              <div className="autodesk-opps-mobile-band">
                <BandLabel>{DIGITAL_LABEL}</BandLabel>
                <BulletList items={opp.digital} />
              </div>
              <div className="autodesk-opps-mobile-band">
                <BandLabel>{OUTCOMES_LABEL}</BandLabel>
                <BulletList items={opp.outcomes} />
              </div>
            </article>
          ))}
        </div>

        <ol className="autodesk-opps-dots" aria-label="Opportunity indicators">
          {OPPORTUNITIES.map((opp, i) => (
            <li key={opp.idx}>
              <button
                type="button"
                aria-label={`Show opportunity ${opp.idx}`}
                aria-current={i === carouselIdx ? "step" : undefined}
                data-active={i === carouselIdx}
                onClick={() => scrollToSlide(i)}
              />
            </li>
          ))}
        </ol>

        <button
          type="button"
          className="autodesk-opps-modal-trigger"
          ref={modalTriggerRef}
          onClick={() => setModalOpen(true)}
        >
          <span aria-hidden="true">⤢</span> View full matrix
        </button>
      </div>

      <p className="autodesk-opps-evidence">
        <span className="autodesk-opps-evidence-k">EVIDENCE BASE</span>
        4-phase CSXD sprint · 37 GTM interviews · 34 customer prototypes · 288 employee surveys ·
        25 manager validations
      </p>

      <MatrixModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        returnFocusRef={modalTriggerRef}
      />
    </section>
  );
}
