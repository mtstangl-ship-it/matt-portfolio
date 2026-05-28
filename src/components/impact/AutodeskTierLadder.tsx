"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { getServiceByPartNumber } from "@/content/impact-autodesk-services";
import {
  classificationGlyph,
  CLS_LABEL,
  DOT_LAYOUTS,
  formatServiceName,
  MATH_CALLOUT,
  OWNS,
  RING_R,
  serviceAttribution,
  TIER_STAMPS,
  type ClsKey,
  type TierId,
} from "./autodesk-tier-ladder-geometry";

function LegendSwatch({ kind }: { kind: ClsKey }) {
  if (kind === "inn") {
    return (
      <svg viewBox="-9 -9 18 18" aria-hidden>
        <circle r="6" cx="0" cy="0" fill="currentColor" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    );
  }
  if (kind === "opt") {
    return (
      <svg viewBox="-9 -9 18 18" aria-hidden>
        <circle r="6" cx="0" cy="0" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <path d="M 0,-6 A 6,6 0 0,1 0,6 Z" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg viewBox="-9 -9 18 18" aria-hidden>
      <circle r="6" cx="0" cy="0" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function clsKeyFromClassification(c: string): ClsKey {
  if (c === "innovated") return "inn";
  if (c === "optimized") return "opt";
  return "rfn";
}

export function AutodeskTierLadder() {
  const [activeTier, setActiveTier] = useState<TierId>("01");
  const [pinnedPn, setPinnedPn] = useState<string | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const stampRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const litTiers = OWNS[activeTier];

  const selectTier = useCallback((tier: TierId) => {
    setActiveTier(tier);
    setPinnedPn(null);
  }, []);

  const togglePin = useCallback((pn: string) => {
    setPinnedPn((cur) => (cur === pn ? null : pn));
  }, []);

  const dismissPin = useCallback(() => setPinnedPn(null), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismissPin();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [dismissPin]);

  const pinned = pinnedPn ? getServiceByPartNumber(pinnedPn) : null;

  const onStampKey = (e: ReactKeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      selectTier(TIER_STAMPS[index].tier);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = (index + 1) % TIER_STAMPS.length;
      stampRefs.current[next]?.focus();
      selectTier(TIER_STAMPS[next].tier);
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = (index - 1 + TIER_STAMPS.length) % TIER_STAMPS.length;
      stampRefs.current[next]?.focus();
      selectTier(TIER_STAMPS[next].tier);
    }
  };

  const motionClass = reduceMotion ? " is-reduced" : "";

  const revealAttribution = useMemo(() => {
    if (!pinned) return null;
    return serviceAttribution(activeTier, pinned.tier);
  }, [pinned, activeTier]);

  return (
    <>
      <section className="impact-tier-ladder__launch" aria-label="12-month rollout">
        <div className="impact-tier-ladder__launch-eyebrow">
          <span className="kicker">↓ 12-MO ROLLOUT</span>
          <span className="title">
            JAN <b>→</b> DEC 2025 · COMPLETE
          </span>
          <span className="fig">FIG. 02-A · TIMELINE · SCENOGRAPHY</span>
        </div>
        <div className="impact-tier-ladder__launch-axis">
          <div className="impact-tier-ladder__launch-rule" aria-hidden />
          <div className="impact-tier-ladder__launch-always" aria-hidden />
          <div
            className="impact-tier-ladder__launch-t01range"
            style={{ left: "50%", right: "12px" }}
            aria-hidden
          />
          <div className="impact-tier-ladder__launch-tick" style={{ left: "0" }} aria-hidden />
          <div className="impact-tier-ladder__launch-tick" style={{ left: "50%" }} aria-hidden />
          <div className="impact-tier-ladder__launch-tick" style={{ left: "100%" }} aria-hidden />
          <div
            className="impact-tier-ladder__launch-event impact-tier-ladder__launch-event--start"
            style={{ left: "0" }}
          >
            <span className="lbl">
              <b>T03</b> · IN MARKET · ALWAYS-ON
            </span>
            <span className="dot dim" aria-hidden />
            <span className="when">JAN</span>
          </div>
          <div className="impact-tier-ladder__launch-event" style={{ left: "50%" }}>
            <span className="lbl">
              <b>T01</b> · LAUNCH
            </span>
            <span className="dot" aria-hidden />
            <span className="when acc">JUL</span>
          </div>
          <div
            className="impact-tier-ladder__launch-event impact-tier-ladder__launch-event--end"
            style={{ left: "100%" }}
          >
            <span className="lbl">
              <b>T02</b> · LAUNCH · PROGRAM END
            </span>
            <span className="dot dim" aria-hidden />
            <span className="when">DEC</span>
          </div>
        </div>
      </section>

      <section
        className={`impact-tier-ladder__panel${motionClass}`}
        aria-label="Cumulative inheritance ring diagram"
      >
        <div className="impact-tier-ladder__panel-head">
          <span className="fig">
            FIG. 02-B · CUMULATIVE INHERITANCE · <em>5 → 9 → 15</em>
          </span>
          <div className="math" aria-live="polite">
            {MATH_CALLOUT[activeTier]}
          </div>
          <div className="legend" aria-label="Classification legend">
            <span className="sw">
              <LegendSwatch kind="inn" /> INNOVATED
            </span>
            <span className="sw">
              <LegendSwatch kind="opt" /> OPTIMIZED
            </span>
            <span className="sw">
              <LegendSwatch kind="rfn" /> REFINED
            </span>
          </div>
        </div>

        <div className="impact-tier-ladder__panel-body">
          <div
            ref={stageRef}
            className="impact-tier-ladder__stage"
            onClick={(e) => {
              const t = e.target as Element;
              if (
                t.classList.contains("impact-tier-ladder__stage") ||
                t.classList.contains("cx") ||
                t.classList.contains("ring") ||
                t.classList.contains("dim-rule") ||
                t.classList.contains("dim-label")
              ) {
                dismissPin();
              }
            }}
          >
            <svg
              className="impact-tier-ladder__svg"
              viewBox="-280 -280 560 560"
              preserveAspectRatio="xMidYMid meet"
              role="img"
              aria-label="Three concentric rings showing cumulative service inheritance across tiers"
            >
              <line className="cx" x1="-280" y1="0" x2="280" y2="0" />
              <line className="cx" x1="0" y1="-280" x2="0" y2="280" />

              <line className="dim-rule" x1="-210" y1="-258" x2="210" y2="-258" />
              <line className="dim-tick" x1="-210" y1="-252" x2="-210" y2="-264" />
              <line className="dim-tick" x1="0" y1="-252" x2="0" y2="-264" />
              <line className="dim-tick" x1="210" y1="-252" x2="210" y2="-264" />
              <text className="dim-label" x="0" y="-266" textAnchor="middle">
                Ø 420 · 15 SERVICES
              </text>

              {(["01", "02", "03"] as TierId[]).map((tier) => {
                const lit = litTiers.has(tier);
                return (
                  <circle
                    key={`ring-${tier}`}
                    className={`ring${lit ? " lit" : ""}`}
                    cx="0"
                    cy="0"
                    r={RING_R[tier]}
                  />
                );
              })}

              <text
                className={`ring-lbl${litTiers.has("01") ? " lit" : ""}`}
                x="0"
                y="-220"
                textAnchor="middle"
              >
                T01 · OUTER · +6 ADDED
              </text>
              <text
                className={`ring-lbl${litTiers.has("02") ? " lit" : ""}`}
                x="0"
                y="-150"
                textAnchor="middle"
              >
                T02 · MIDDLE · +4 ADDED
              </text>
              <text
                className={`ring-lbl${litTiers.has("03") ? " lit" : ""}`}
                x="0"
                y="-80"
                textAnchor="middle"
              >
                T03 · INNER · +5 ADDED
              </text>

              <g className="dot-wedges">
                {DOT_LAYOUTS.map((dot) => (
                  <path
                    key={`wedge-${dot.service.partNumber}`}
                    className="dot-wedge"
                    d={dot.wedgePath}
                    tabIndex={-1}
                    aria-hidden
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePin(dot.service.partNumber);
                    }}
                  />
                ))}
              </g>

              {DOT_LAYOUTS.map((dot) => {
                const isLit = litTiers.has(dot.tier);
                const isPinned = pinnedPn === dot.service.partNumber;
                return (
                  <g
                    key={dot.service.partNumber}
                    className={[
                      "dot",
                      dot.cls,
                      isLit ? "lit" : "dim",
                      isPinned ? "pinned" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    transform={`translate(${dot.x},${dot.y})`}
                    tabIndex={0}
                    role="button"
                    aria-label={`${dot.service.partNumber} ${dot.service.name}`}
                    aria-pressed={isPinned}
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePin(dot.service.partNumber);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        e.stopPropagation();
                        togglePin(dot.service.partNumber);
                      }
                    }}
                  >
                    {isPinned ? <circle className="halo" r="14" /> : null}
                    <circle className="out" r="7" />
                    <circle className="fill" r="6" />
                    <path className="half" d="M 0,-6 A 6,6 0 0,1 0,6 Z" />
                  </g>
                );
              })}

              {DOT_LAYOUTS.map((dot) => {
                const isLit = litTiers.has(dot.tier);
                return (
                  <text
                    key={`pn-${dot.service.partNumber}`}
                    className={`dot-pn${isLit ? " lit" : ""}`}
                    x={dot.labelX}
                    y={dot.labelY}
                    textAnchor={dot.textAnchor}
                  >
                    {dot.service.partNumber}
                  </text>
                );
              })}
            </svg>
          </div>

          <aside className="impact-tier-ladder__stamps">
            {TIER_STAMPS.map((stamp, i) => (
              <button
                key={stamp.tier}
                ref={(el) => {
                  stampRefs.current[i] = el;
                }}
                type="button"
                className={`impact-tier-ladder__stamp${activeTier === stamp.tier ? " active" : ""}`}
                data-tier={stamp.tier}
                aria-pressed={activeTier === stamp.tier}
                onClick={() => selectTier(stamp.tier)}
                onKeyDown={(e) => onStampKey(e, i)}
              >
                <span className="corner" aria-hidden />
                <span className="pn">
                  {stamp.pn.split(" · ")[0]} · <b>{stamp.pn.split(" · ").slice(1).join(" · ")}</b>
                </span>
                <span className="name">{stamp.name}</span>
                <span className="meta">{stamp.meta}</span>
                <span className="count">
                  {stamp.count}
                  <span className="u">SERV</span>
                </span>
              </button>
            ))}
          </aside>
        </div>

        <div
          className={`impact-tier-ladder__reveal${pinned ? " is-pinned" : ""}${motionClass}`}
          aria-live="polite"
        >
          {!pinned ? (
            <p className="impact-tier-ladder__reveal-placeholder">
              <span className="crosshair" aria-hidden>
                +
              </span>
              ↓ TAP ANY NODE FOR SERVICE DETAIL
            </p>
          ) : pinned && revealAttribution ? (
            <>
              <p className="impact-tier-ladder__reveal-line1">
                <span className="pn">{pinned.partNumber}</span>
                <span className="sep"> · </span>
                <span className="nm">{formatServiceName(pinned.name)}</span>
                <span className="sep"> · </span>
                <span className="cls">
                  {classificationGlyph(clsKeyFromClassification(pinned.classification))}{" "}
                  {CLS_LABEL[clsKeyFromClassification(pinned.classification)]}
                </span>
              </p>
              <p className="impact-tier-ladder__reveal-line2">{revealAttribution}</p>
            </>
          ) : null}
        </div>

        <div className="impact-tier-ladder__panel-foot">
          <span className="hint">↓ TAP A TIER FOR ITS SET · TAP A NODE FOR THE SERVICE</span>
          <span className="sheet">
            <b>SHEET</b> · IMPACT · TIER LADDER · BUILD · V2026.05
          </span>
        </div>
      </section>
    </>
  );
}
