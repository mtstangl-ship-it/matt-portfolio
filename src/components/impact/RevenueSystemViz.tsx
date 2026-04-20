"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PlanTierRow } from "./revenue/PlanTierRow";
import { RevenueLeadMetric } from "./revenue/RevenueLeadMetric";
import { RevenueLayerDescriptors } from "./revenue/RevenueLayerDescriptors";
import { tierOrder, type TierKey } from "./revenue/revenue-tier-config";
import { revenueVizCopy } from "@/content/revenue-viz";

export type { TierKey };

const DEFAULT_TIER: TierKey = "business";
const LEAVE_RESET_MS = 160;

function TierSystemCue() {
  const c = revenueVizCopy.tierCue;
  return (
    <div className="rounded-sm border border-accent-signal/25 bg-[rgba(6,8,8,0.78)] px-3 py-2.5 text-center shadow-[inset_0_1px_0_rgba(34,211,199,0.08)] sm:px-4">
      <p className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.14em] text-accent-signal">{c.kicker}</p>
      <p className="mt-0.5 font-mono text-[0.5rem] font-semibold uppercase tracking-[0.18em] text-[rgba(232,230,226,0.82)]">
        {c.sub}
      </p>
      <p className="mt-1.5 font-body text-[0.5625rem] font-medium text-accent-signal/60">{c.hint}</p>
    </div>
  );
}

/**
 * Mobile-only: appears AFTER ImpactSystemSummary (Autodesk framing + impact).
 * Bridge + tier labels + exploration prompt, no duplicate title/metrics.
 */
function MobileTierExplorationGate() {
  const v = revenueVizCopy;
  return (
    <div className="space-y-3 border-t border-white/[0.1] pt-4 lg:hidden">
      <p className="px-1 text-center font-body text-[0.6875rem] font-medium leading-relaxed text-[rgba(210,208,202,0.9)]">
        {v.transitionLine}
      </p>
      <TierSystemCue />
      <p className="font-mono text-[0.5rem] font-bold uppercase tracking-[0.18em] text-accent-signal/80 text-center">
        {v.explorePrompt}
      </p>
    </div>
  );
}

export function RevenueSystemViz({
  onTierHover,
}: {
  onTierHover?: (tier: TierKey | null) => void;
}) {
  const [hoveredTier, setHoveredTier] = useState<TierKey>(DEFAULT_TIER);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearLeaveTimer = useCallback(() => {
    if (leaveTimerRef.current !== null) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
  }, []);

  useEffect(() => () => clearLeaveTimer(), [clearLeaveTimer]);

  const selectTier = useCallback(
    (tier: TierKey) => {
      clearLeaveTimer();
      setHoveredTier((prev) => {
        if (prev === tier) return prev;
        onTierHover?.(tier);
        return tier;
      });
    },
    [clearLeaveTimer, onTierHover]
  );

  const scheduleResetToBusiness = useCallback(() => {
    clearLeaveTimer();
    leaveTimerRef.current = setTimeout(() => {
      leaveTimerRef.current = null;
      setHoveredTier(DEFAULT_TIER);
      onTierHover?.(DEFAULT_TIER);
    }, LEAVE_RESET_MS);
  }, [clearLeaveTimer, onTierHover]);

  return (
    <div
      className="flex min-h-0 w-full flex-1 flex-col gap-0 overflow-y-auto overflow-x-hidden overscroll-contain"
      role="img"
      aria-label="Autodesk revenue: projected AOV impact and three plan tiers with innovated, optimized, and refined service units"
      onMouseLeave={(e) => {
        if (typeof window !== "undefined" && !window.matchMedia("(hover: hover)").matches) return;
        const next = e.relatedTarget;
        if (next instanceof Node && e.currentTarget.contains(next)) return;
        scheduleResetToBusiness();
      }}
    >
      {/* Desktop: large lead metric (summary column carries story on mobile) */}
      <div className="order-1 hidden shrink-0 px-0.5 lg:block">
        <RevenueLeadMetric />
      </div>

      {/* Tier cue (desktop) + bridge to plans (mobile) + plan stack */}
      <div className="order-2 flex min-h-0 flex-1 flex-col gap-3 px-0.5 min-[380px]:gap-3 sm:gap-3 sm:px-1 lg:gap-1.5">
        <div className="hidden lg:block">
          <TierSystemCue />
        </div>
        <MobileTierExplorationGate />
        <div className="shrink-0">
          <RevenueLayerDescriptors
            tier={hoveredTier}
            pairing={hoveredTier === "business" ? "stack" : "inline"}
          />
        </div>

        {tierOrder.map((tier) => (
          <div
            key={tier}
            className={
              hoveredTier === tier
                ? "flex min-h-0 min-w-0 flex-col max-lg:flex-1 max-lg:basis-0 max-lg:overflow-hidden lg:flex-none lg:overflow-visible"
                : "flex shrink-0 flex-col"
            }
          >
            <PlanTierRow
              tier={tier}
              isActive={hoveredTier === tier}
              onSelect={() => selectTier(tier)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
