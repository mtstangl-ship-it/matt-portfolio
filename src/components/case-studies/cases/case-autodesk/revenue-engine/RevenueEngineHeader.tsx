"use client";

import { useCallback, type KeyboardEvent } from "react";
import {
  getStagePillLabel,
  TIER_LABELS,
  type RevenueEngineTier,
} from "./content/revenue-engine-data";

type RevenueEngineHeaderProps = {
  stageIndex: number;
  tier: RevenueEngineTier;
  onTierChange: (tier: RevenueEngineTier) => void;
};

export function RevenueEngineHeader({ stageIndex, tier, onTierChange }: RevenueEngineHeaderProps) {
  const stagePill = getStagePillLabel(stageIndex);

  const handleTierKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      onTierChange(tier === "growth" ? "nurture" : "growth");
    },
    [tier, onTierChange],
  );

  return (
    <header className="re-app-header">
      <div className="re-header-row">
        <div className="re-state">
          <span className="re-pill re-pill-accent" aria-live="polite">
            {stagePill}
          </span>
        </div>
      </div>

      <div className="re-header-controls">
        <div
          className="re-cg"
          role="tablist"
          aria-label="Tier"
          onKeyDown={handleTierKeyDown}
        >
          <span className="re-cg-label">TIER</span>
          <button
            type="button"
            role="tab"
            id="re-tier-tab-growth"
            aria-selected={tier === "growth"}
            aria-controls="re-plate-body"
            data-active={tier === "growth" ? "true" : "false"}
            data-tier="growth"
            tabIndex={tier === "growth" ? 0 : -1}
            onClick={() => onTierChange("growth")}
          >
            <span className="re-tier-dot" aria-hidden="true" />
            {TIER_LABELS.growth}
          </button>
          <button
            type="button"
            role="tab"
            id="re-tier-tab-nurture"
            aria-selected={tier === "nurture"}
            aria-controls="re-plate-body"
            data-active={tier === "nurture" ? "true" : "false"}
            data-tier="nurture"
            tabIndex={tier === "nurture" ? 0 : -1}
            onClick={() => onTierChange("nurture")}
          >
            <span className="re-tier-dot" aria-hidden="true" />
            {TIER_LABELS.nurture}
          </button>
        </div>
      </div>
    </header>
  );
}
