"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PlanTierRow } from "./revenue/PlanTierRow";
import { RevenueLeadMetric } from "./revenue/RevenueLeadMetric";
import { RevenueLayerDescriptors } from "./revenue/RevenueLayerDescriptors";
import { tierOrder, type TierKey } from "./revenue/revenue-tier-config";

export type { TierKey };

const DEFAULT_TIER: TierKey = "business";
const LEAVE_RESET_MS = 160;

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
        const next = e.relatedTarget;
        if (next instanceof Node && e.currentTarget.contains(next)) return;
        scheduleResetToBusiness();
      }}
    >
      <div className="shrink-0 px-0.5">
        <RevenueLeadMetric />
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-1 px-0.5 min-[380px]:gap-1.5 sm:gap-2 sm:px-1">
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
                ? "flex min-h-0 min-w-0 flex-1 flex-col"
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
