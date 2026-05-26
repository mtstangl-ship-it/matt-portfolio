"use client";

import { useCallback, useState } from "react";
import type { RevenueEngineTier } from "./content/revenue-engine-data";
import { RevenueEngineHeader } from "./RevenueEngineHeader";
import { RevenueEnginePlateContent } from "./RevenueEnginePlateContent";

export type { RevenueEngineTier } from "./content/revenue-engine-data";

export function RevenueEnginePatentPlate() {
  const [tier, setTier] = useState<RevenueEngineTier>("growth");
  const [stageIndex, setStageIndex] = useState(0);

  const handleStageChange = useCallback((nextStage: number) => {
    setStageIndex(nextStage);
  }, []);

  return (
    <div className="revenue-engine-patent-plate" data-tier={tier}>
      <RevenueEngineHeader stageIndex={stageIndex} tier={tier} onTierChange={setTier} />
      <main
        id="re-plate-body"
        className="re-plate-body"
        role="tabpanel"
        aria-labelledby={tier === "growth" ? "re-tier-tab-growth" : "re-tier-tab-nurture"}
        aria-label="Patent plate figures"
      >
        <RevenueEnginePlateContent
          tier={tier}
          stageIndex={stageIndex}
          onStageChange={handleStageChange}
        />
      </main>
    </div>
  );
}
