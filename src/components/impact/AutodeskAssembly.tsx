"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { autodeskServices, type AutodeskService } from "@/content/impact-autodesk-services";

type TierId = "01" | "02" | "03";

type TierConfig = {
  id: TierId;
  deckPn: string;
  name: string;
  sub: string;
  lift: string;
  desc: string;
  drawingNotes: [string, string];
};

const TIERS: TierConfig[] = [
  {
    id: "01",
    deckPn: "T01",
    name: "Business Plan · Premium",
    sub: "950 customers · 6 services · coaching",
    lift: "950 customers · 6 services · coaching",
    desc: "Strategic planning and coaching-heavy delivery. Designed to expand accounts.",
    drawingNotes: [
      "T01-A · 6 SERVICES · COACHING PRIMARY",
      "DELTA FROM T02: +2 SERVICES · REVENUE FOCUS",
    ],
  },
  {
    id: "02",
    deckPn: "T02",
    name: "Professional Plan · Targeted",
    sub: "25K+ customers · 4 services · attach",
    lift: "25K+ customers · 4 services · attach",
    desc: "Targeted engagements that accelerate deployment and close capability gaps.",
    drawingNotes: [
      "T02-A · 4 SERVICES · CAPABILITY PRIMARY",
      "DELTA FROM T03: −1 SERVICE · ATTACH FOCUS",
    ],
  },
  {
    id: "03",
    deckPn: "T03",
    name: "Included Plan · Foundational",
    sub: "1M+ customers · 5 services · retain",
    lift: "1M+ customers · 5 services · retain",
    desc: "Self-service and onboarding paths that feed customers upsell-ready into higher tiers.",
    drawingNotes: [
      "T03-A · 5 SERVICES · ONBOARDING PRIMARY",
      "BASE TIER · RETAIN FOCUS",
    ],
  },
];

const TIMELINE_ANCHORS = [
  { stage: "0", name: "BUILD", date: "JAN 2025" },
  { stage: "1", name: "LAUNCH", date: "JUL 2025" },
  { stage: "2", name: "SCALE", date: "DEC 2025" },
] as const;

function servicesForTier(tier: TierId, side: "L" | "R"): AutodeskService[] {
  return autodeskServices.filter((s) => s.tier === tier && s.side === side);
}

function Chip({
  service,
  index,
  side,
  openTooltip,
  onToggleTooltip,
  onShowTooltip,
  onDismissTooltip,
}: {
  service: AutodeskService;
  index: number;
  side: "L" | "R";
  openTooltip: string | null;
  onToggleTooltip: (partNumber: string) => void;
  onShowTooltip: (partNumber: string) => void;
  onDismissTooltip: () => void;
}) {
  const isOpen = openTooltip === service.partNumber;
  const staggerMs = side === "L" ? index * 50 : index * 50 + 150;

  return (
    <div
      className="impact-chip-wrap"
      style={{ transitionDelay: `${staggerMs}ms` }}
    >
      <button
        type="button"
        className="impact-chip"
        data-cls={service.classification}
        data-chip-id={`${service.tier}-${service.side}-${service.partNumber}`}
        aria-expanded={isOpen}
        aria-describedby={isOpen ? `chip-tip-${service.partNumber}` : undefined}
        onClick={() => onToggleTooltip(service.partNumber)}
        onMouseEnter={() => {
          if (window.matchMedia("(hover: hover)").matches) {
            onShowTooltip(service.partNumber);
          }
        }}
        onMouseLeave={() => {
          if (window.matchMedia("(hover: hover)").matches) {
            onDismissTooltip();
          }
        }}
      >
        {side === "L" ? (
          <>
            <span className="cls" aria-hidden />
            <span className="pn">{service.partNumber}</span>
            <span className="nm">{service.name}</span>
          </>
        ) : (
          <>
            <span className="pn">{service.partNumber}</span>
            <span className="nm">{service.name}</span>
            <span className="cls" aria-hidden />
          </>
        )}
      </button>
      {isOpen ? (
        <div
          id={`chip-tip-${service.partNumber}`}
          className="impact-chip-tooltip"
          role="tooltip"
        >
          {service.description}
        </div>
      ) : null}
    </div>
  );
}

export function AutodeskAssembly() {
  const [activeTier, setActiveTier] = useState<TierId>("01");
  const [openTooltip, setOpenTooltip] = useState<string | null>(null);
  const [leadersSvg, setLeadersSvg] = useState("");
  const [leadersReady, setLeadersReady] = useState(false);
  const assemblyRef = useRef<HTMLDivElement>(null);
  const leadersRef = useRef<SVGSVGElement>(null);
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const drawLeaders = useCallback(() => {
    const assembly = assemblyRef.current;
    const leadersSvgEl = leadersRef.current;
    if (!assembly || !leadersSvgEl) return;

    if (window.matchMedia("(max-width: 880px)").matches) {
      setLeadersSvg("");
      setLeadersReady(false);
      return;
    }

    const rect = assembly.getBoundingClientRect();
    leadersSvgEl.setAttribute("viewBox", `0 0 ${rect.width} ${rect.height}`);
    leadersSvgEl.setAttribute("width", String(rect.width));
    leadersSvgEl.setAttribute("height", String(rect.height));

    const active = assembly.querySelector('.impact-tier[data-state="active"]');
    if (!active) {
      setLeadersSvg("");
      setLeadersReady(false);
      return;
    }

    const deck = active.querySelector(".impact-tier__deck");
    if (!deck) return;

    const deckRect = deck.getBoundingClientRect();
    const aRect = assembly.getBoundingClientRect();
    const chips = Array.from(active.querySelectorAll(".impact-chip"));
    let svg = "";

    chips.forEach((chip) => {
      const cr = chip.getBoundingClientRect();
      const parent = chip.closest(".impact-tier__chips");
      const isLeft = parent?.classList.contains("impact-tier__chips--left");
      const x1 = (isLeft ? cr.right : cr.left) - aRect.left;
      const y1 = cr.top + cr.height / 2 - aRect.top;
      const x2 = (isLeft ? deckRect.left : deckRect.right) - aRect.left;
      const y2 = deckRect.top + deckRect.height / 2 - aRect.top;
      const mid = isLeft ? x1 + 18 : x1 - 18;
      svg += `<polyline class="impact-leader-line" points="${x1},${y1} ${mid},${y1} ${x2},${y2}" fill="none" stroke="var(--teal-low)" stroke-width="1" />`;
      svg += `<circle cx="${x2}" cy="${y2}" r="2.4" class="tick" />`;
    });

    setLeadersSvg(svg);
    if (reduceMotion) {
      setLeadersReady(true);
    } else {
      setLeadersReady(false);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setLeadersReady(true));
      });
    }
  }, [reduceMotion]);

  useEffect(() => {
    const t1 = window.setTimeout(drawLeaders, 60);
    const t2 = window.setTimeout(drawLeaders, 450);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [activeTier, drawLeaders]);

  useEffect(() => {
    const onResize = () => {
      window.clearTimeout((window as Window & { __impactAsmResize?: number }).__impactAsmResize);
      (window as Window & { __impactAsmResize?: number }).__impactAsmResize = window.setTimeout(
        drawLeaders,
        120,
      );
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [drawLeaders]);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".impact-chip-wrap")) {
        setOpenTooltip(null);
      }
    };
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setOpenTooltip(null);
    };
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const onDeckKey = (e: ReactKeyboardEvent<HTMLButtonElement>, id: TierId) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActiveTier(id);
      setOpenTooltip(null);
    }
  };

  const leadersClass = [
    "impact-leaders",
    leadersReady && !reduceMotion ? "impact-leaders--drawn" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="impact-assembly" id="assembly" ref={assemblyRef}>
      <span className="impact-assembly__corner">SHEET 01-A · 1 : 1</span>
      <svg
        ref={leadersRef}
        className={leadersClass}
        aria-hidden
        preserveAspectRatio="none"
        dangerouslySetInnerHTML={{ __html: leadersSvg }}
      />

      <div className="impact-tier-stack" role="list">
        {TIERS.map((tier) => {
          const isActive = activeTier === tier.id;
          return (
            <div
              key={tier.id}
              className="impact-tier"
              data-tier={tier.id}
              data-state={isActive ? "active" : "stowed"}
              role="listitem"
            >
              {isActive ? (
                <div className="impact-drawing-notes" aria-label="Drawing notes">
                  <p>{tier.drawingNotes[0]}</p>
                  <p>{tier.drawingNotes[1]}</p>
                </div>
              ) : null}
              <div className="impact-tier__chips impact-tier__chips--left">
                {servicesForTier(tier.id, "L").map((svc, i) => (
                  <Chip
                    key={svc.partNumber}
                    service={svc}
                    index={i}
                    side="L"
                    openTooltip={isActive ? openTooltip : null}
                    onToggleTooltip={(pn) =>
                      setOpenTooltip((cur) => (cur === pn ? null : pn))
                    }
                    onShowTooltip={(pn) => setOpenTooltip(pn)}
                    onDismissTooltip={() => setOpenTooltip(null)}
                  />
                ))}
              </div>
              <button
                type="button"
                className="impact-tier__deck"
                data-deck-id={tier.id}
                aria-expanded={isActive}
                aria-controls={`tier-${tier.id}-detail`}
                onClick={() => {
                  setActiveTier(tier.id);
                  setOpenTooltip(null);
                }}
                onKeyDown={(e) => onDeckKey(e, tier.id)}
              >
                <span className="pn">{tier.deckPn}</span>
                <span className="nm">{tier.name}</span>
                <span className="lift">{tier.lift}</span>
                <span className="chev" aria-hidden>
                  ›
                </span>
              </button>
              <div className="impact-tier__chips impact-tier__chips--right">
                {servicesForTier(tier.id, "R").map((svc, i) => (
                  <Chip
                    key={svc.partNumber}
                    service={svc}
                    index={i}
                    side="R"
                    openTooltip={isActive ? openTooltip : null}
                    onToggleTooltip={(pn) =>
                      setOpenTooltip((cur) => (cur === pn ? null : pn))
                    }
                    onShowTooltip={(pn) => setOpenTooltip(pn)}
                    onDismissTooltip={() => setOpenTooltip(null)}
                  />
                ))}
              </div>
              {isActive ? (
                <p className="impact-tier__desc" id={`tier-${tier.id}-detail`}>
                  {tier.desc}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="impact-cls-legend" aria-label="Classification legend">
        <span className="item">
          <span className="sw full" /> Innovated
        </span>
        <span className="item">
          <span className="sw half" /> Optimized
        </span>
        <span className="item">
          <span className="sw outline" /> Refined
        </span>
      </div>

      <div className="impact-customer-scale" aria-label="12-month program timeline">
        <div className="impact-customer-scale__bar">
          <span className="impact-customer-scale__fill" aria-hidden />
        </div>
        <div className="impact-customer-scale__labels">
          {TIMELINE_ANCHORS.map((anchor) => (
            <div key={anchor.stage} className="impact-customer-scale__item">
              <span className="impact-customer-scale__stage">{anchor.stage}</span>
              <span className="impact-customer-scale__name">{anchor.name}</span>
              <span className="impact-customer-scale__date">{anchor.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
