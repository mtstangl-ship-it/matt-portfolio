"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type KeyboardEvent,
} from "react";
import { StageBikeSvg } from "./bike/StageBikeSvg";
import {
  isRenewalStage,
  RENEWAL_STAGE_INDEX,
  REVENUE_ENGINE_STAGES,
  type RevenueEngineTier,
} from "./content/revenue-engine-data";
import {
  getStageFigureKey,
  getStageFigureLabel,
  parseStageFigureKey,
  RevenueEngineInspectPanel,
} from "./RevenueEngineInspectPanel";
import { RenewalRBlock } from "./RenewalRBlock";
type RevenueEnginePlateContentProps = {
  tier: RevenueEngineTier;
  stageIndex: number;
  onStageChange: (stageIndex: number) => void;
};

const LAST_STAGE_INDEX = REVENUE_ENGINE_STAGES.length - 1;

function isSwipeRail(rail: HTMLElement | null): boolean {
  if (!rail) return false;
  return rail.scrollWidth > rail.clientWidth + 10;
}

export function RevenueEnginePlateContent({
  tier,
  stageIndex,
  onStageChange,
}: RevenueEnginePlateContentProps) {
  const figuresRef = useRef<HTMLDivElement>(null);
  const figureRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const stageIndexRef = useRef(stageIndex);

  stageIndexRef.current = stageIndex;

  const scrollRailToStage = useCallback((idx: number, instant = false) => {
    if (isRenewalStage(idx)) return;

    const rail = figuresRef.current;
    if (!rail || !isSwipeRail(rail)) return;

    const card = figureRefs.current.get(getStageFigureKey(idx));
    if (!card) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = Math.max(0, card.offsetLeft - 14);
    rail.scrollTo({
      left: target,
      behavior: instant || reduceMotion ? "auto" : "smooth",
    });
  }, []);

  const selectStage = useCallback(
    (idx: number, options?: { scroll?: boolean; instant?: boolean }) => {
      onStageChange(idx);
      if (options?.scroll !== false && !isRenewalStage(idx)) {
        scrollRailToStage(idx, options?.instant);
      }
    },
    [onStageChange, scrollRailToStage],
  );

  const handleFigureClick = useCallback(
    (idx: number) => {
      if (!isRenewalStage(idx) && isSwipeRail(figuresRef.current)) {
        scrollRailToStage(idx);
      }
      selectStage(idx, { scroll: false });
    },
    [scrollRailToStage, selectStage],
  );

  const handleRenewalSelect = useCallback(() => {
    selectStage(RENEWAL_STAGE_INDEX);
  }, [selectStage]);

  const handleChipKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
      if (!keys.includes(event.key)) return;

      event.preventDefault();

      if (event.key === "Home") {
        selectStage(0);
        return;
      }
      if (event.key === "End") {
        selectStage(LAST_STAGE_INDEX);
        return;
      }

      const delta = event.key === "ArrowRight" ? 1 : -1;
      const next = Math.min(LAST_STAGE_INDEX, Math.max(0, stageIndex + delta));
      selectStage(next);
    },
    [selectStage, stageIndex],
  );

  useEffect(() => {
    const rail = figuresRef.current;
    if (!rail) return;

    observerRef.current?.disconnect();

    const setupObserver = () => {
      if (!isSwipeRail(rail) || !("IntersectionObserver" in window)) return;

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (!isSwipeRail(rail)) return;
          if (stageIndexRef.current === RENEWAL_STAGE_INDEX) return;

          const visible = entries.filter((entry) => entry.isIntersecting);
          const bestEntry = visible.reduce<IntersectionObserverEntry | null>(
            (current, entry) =>
              !current || entry.intersectionRatio > current.intersectionRatio ? entry : current,
            null,
          );

          if (bestEntry?.target instanceof HTMLButtonElement) {
            const key = bestEntry.target.dataset.stageFig;
            if (key) {
              const idx = parseStageFigureKey(key);
              if (idx !== stageIndexRef.current) {
                onStageChange(idx);
              }
            }
          }
        },
        { root: rail, threshold: [0.6, 0.75, 0.9] },
      );

      figureRefs.current.forEach((figure) => observerRef.current?.observe(figure));
    };

    const frame = requestAnimationFrame(() => {
      if (isSwipeRail(rail)) {
        if (!isRenewalStage(stageIndexRef.current)) {
          scrollRailToStage(stageIndexRef.current, true);
        }
        requestAnimationFrame(setupObserver);
      }
    });

    return () => {
      cancelAnimationFrame(frame);
      observerRef.current?.disconnect();
    };
  }, [onStageChange, scrollRailToStage, tier]);

  const handleFiguresKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
      if (!keys.includes(event.key)) return;

      event.preventDefault();

      if (event.key === "Home") {
        handleFigureClick(0);
        return;
      }
      if (event.key === "End") {
        handleFigureClick(LAST_STAGE_INDEX);
        return;
      }

      const delta = event.key === "ArrowRight" ? 1 : -1;
      const next = Math.min(LAST_STAGE_INDEX, Math.max(0, stageIndex + delta));
      handleFigureClick(next);
    },
    [handleFigureClick, stageIndex],
  );

  const setFigureRef = useCallback((key: string, node: HTMLButtonElement | null) => {
    if (node) {
      figureRefs.current.set(key, node);
    } else {
      figureRefs.current.delete(key);
    }
  }, []);

  return (
    <div className="re-d1">
      <RenewalRBlock tier={tier} stageIndex={stageIndex} onSelect={handleRenewalSelect} />

      <h3 className="re-plate-title">Five figures &amp; the running machine.</h3>

      <div
        className="re-mobile-chips"
        role="tablist"
        aria-label="Stage navigation"
        onKeyDown={handleChipKeyDown}
      >
        {REVENUE_ENGINE_STAGES.map((stage, index) => (
          <span key={stage.n} className="re-mobile-chip-group">
            {index > 0 ? <span className="re-mobile-chip-sep" aria-hidden="true">·</span> : null}
            <button
              type="button"
              role="tab"
              className="re-mobile-chip"
              data-active={stageIndex === index ? "true" : "false"}
              aria-selected={stageIndex === index}
              tabIndex={stageIndex === index ? 0 : -1}
              aria-label={`Jump to stage ${stage.n}`}
              onClick={() => selectStage(index)}
            >
              {stage.n}
            </button>
          </span>
        ))}
      </div>

      <div className="re-figures-wrap">
        <div
          className="re-figures"
          ref={figuresRef}
          role="tablist"
          aria-label="Patent plate figures"
          onKeyDown={handleFiguresKeyDown}
        >
          {REVENUE_ENGINE_STAGES.map((stage, index) => (
            <button
              key={stage.n}
              type="button"
              role="tab"
              className="re-figure"
              data-stage-fig={String(index)}
              data-active={stageIndex === index ? "true" : "false"}
              aria-selected={stageIndex === index}
              tabIndex={stageIndex === index ? 0 : -1}
              aria-label={getStageFigureLabel(index)}
              ref={(node) => setFigureRef(String(index), node)}
              onClick={() => handleFigureClick(index)}
            >
              <div className="re-fig-head">
                <span className="re-fig-num">FIG. {index + 1}</span>
                <span>{stage.ref}</span>
              </div>
              <div className="re-fig-art">
                <StageBikeSvg stageIndex={index} tier={tier} showCalloutName={false} />
              </div>
              <div className="re-fig-body">
                <div className="re-fig-name">{stage.name}</div>
              </div>
            </button>
          ))}
        </div>
        <div className="re-figures-fade" aria-hidden="true" />
      </div>

      <RevenueEngineInspectPanel stageIndex={stageIndex} tier={tier} />
    </div>
  );
}
