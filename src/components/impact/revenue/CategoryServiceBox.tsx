"use client";

import { useEffect, useState } from "react";
import { CLUSTER_LABELS, type CategoryKind, type TierKey } from "./revenue-tier-config";
import { ServiceCategoryContent } from "./ServiceCategoryContent";

type Props = {
  kind: CategoryKind;
  tier: TierKey;
  count: number;
  /** 0 = Innovated, 1 = Optimized, 2 = Refined */
  labelIndex: 0 | 1 | 2;
  /** Typography scale for Included vs Business */
  compact?: boolean;
};

/** True when device supports hover (skip hover-only motion on touch-first). */
function useHoverCapable() {
  const [ok, setOk] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover)");
    const apply = () => setOk(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return ok;
}

/** Subtle left accent so Innovated / Optimized / Refined read distinctly at a glance. */
const headerByKind: Record<CategoryKind, string> = {
  innovated:
    "border-l-[3px] border-l-accent-signal/50 bg-gradient-to-r from-accent-signal/[0.07] to-transparent",
  optimized: "border-l-[3px] border-l-accent-signal/28 bg-white/[0.02]",
  refined: "border-l-[3px] border-l-white/25 bg-white/[0.03]",
};

export function CategoryServiceBox({
  kind,
  tier,
  count,
  labelIndex,
  compact,
}: Props) {
  const label = CLUSTER_LABELS[labelIndex];
  const hoverCapable = useHoverCapable();
  const [cardHovered, setCardHovered] = useState(false);
  const animationActive = hoverCapable && cardHovered;

  return (
    <div
      className="relative flex h-full min-h-0 min-w-0 flex-col overflow-hidden rounded-md border border-accent-signal/38 bg-black/[0.22] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
      onMouseEnter={() => setCardHovered(true)}
      onMouseLeave={() => setCardHovered(false)}
    >
      <div
        className={`flex shrink-0 items-center justify-between gap-2 border-b border-white/[0.06] py-1.5 pl-2 pr-2.5 sm:pl-2.5 sm:pr-3 ${headerByKind[kind]} ${
          compact ? "py-1 sm:py-1.5" : ""
        }`}
      >
        <span
          className={`min-w-0 truncate font-semibold uppercase tracking-[0.12em] text-accent-signal ${
            compact
              ? "[font-size:clamp(0.53125rem,calc(0.32rem+1.15vw),0.625rem)]"
              : "[font-size:clamp(0.5625rem,calc(0.35rem+1.35vw),0.6875rem)]"
          }`}
        >
          {label}
        </span>
        <span
          className="shrink-0 rounded-md bg-white/[0.07] px-1.5 py-0.5 font-[family-name:var(--font-mono)] tabular-nums text-white/75 [font-size:clamp(0.53125rem,calc(0.32rem+1.2vw),0.625rem)]"
          aria-label={`${count} services`}
        >
          {count}
        </span>
      </div>
      <div
        className={`relative flex min-h-0 flex-1 flex-col overflow-hidden ${
          compact ? "p-2 sm:p-2.5" : "p-2 sm:p-2.5 md:p-3"
        }`}
      >
        {/* Pills need a floor on touch; on lg, flex-1 + min-h fills the grid row without h-full collapsing to 0 */}
        <div className="relative flex min-h-[8.5rem] w-full min-w-0 flex-1 flex-col overflow-hidden lg:min-h-0">
          <ServiceCategoryContent kind={kind} tier={tier} count={count} hovered={animationActive} />
        </div>
      </div>
    </div>
  );
}
