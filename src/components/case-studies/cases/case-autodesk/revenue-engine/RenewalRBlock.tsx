"use client";

import { RStageSvg } from "./bike/RStageSvg";
import {
  isRenewalStage,
  RENEWAL,
  RENEWAL_OUTCOMES,
  type RevenueEngineTier,
} from "./content/revenue-engine-data";
import { RenewalOutcomesRow } from "./RenewalOutcomes";

type RenewalRBlockProps = {
  tier: RevenueEngineTier;
  stageIndex: number;
  onSelect: () => void;
};

export function RenewalRBlock({ tier, stageIndex, onSelect }: RenewalRBlockProps) {
  const isActive = isRenewalStage(stageIndex);

  return (
    <button
      type="button"
      className="re-r-block"
      data-active={isActive ? "true" : "false"}
      aria-pressed={isActive}
      aria-label="Select renewal stage"
      onClick={onSelect}
    >
      <div className="re-r-art-wrap">
        <RStageSvg tier={tier} />
      </div>
      <div className="re-r-meta">
        <div className="re-r-id">
          {RENEWAL.n}
          <span className="re-r-id-sub">{RENEWAL.subtitle}</span>
        </div>
      </div>
      <div className="re-r-divider" aria-hidden="true" />
      <div className="re-r-metrics">
        <RenewalOutcomesRow outcomes={RENEWAL_OUTCOMES} variant="banner" />
      </div>
    </button>
  );
}
