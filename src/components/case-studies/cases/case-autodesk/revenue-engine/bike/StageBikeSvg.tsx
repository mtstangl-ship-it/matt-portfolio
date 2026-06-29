import {
  CALLOUT_FOR_STAGE,
  STAGE_PARTS_CUMULATIVE,
  type RevenueEngineTier,
} from "../content/revenue-engine-data";
import { BikeDrawing } from "./BikeDrawing";
import { getTierAccent } from "./bike-geometry";
import { PartsCallout } from "./PartsCallout";

type StageBikeSvgProps = {
  stageIndex: number;
  tier: RevenueEngineTier;
  showCalloutName?: boolean;
  showCallout?: boolean;
  motion?: boolean;
  rider?: boolean;
  ground?: boolean;
  className?: string;
};

export function StageBikeSvg({
  stageIndex,
  tier,
  showCalloutName = true,
  showCallout = true,
  motion = false,
  rider = false,
  ground = true,
  className = "re-bike-svg",
}: StageBikeSvgProps) {
  const parts = new Set(STAGE_PARTS_CUMULATIVE[stageIndex] ?? []);
  const accent = getTierAccent(tier);
  const callout = CALLOUT_FOR_STAGE[stageIndex];

  return (
    <svg
      viewBox="0 0 400 240"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <BikeDrawing
        parts={parts}
        tier={tier}
        accent={accent}
        motion={motion}
        rider={rider}
        ground={ground}
      />
      {showCallout && callout ? (
        <PartsCallout
          px={callout.px}
          py={callout.py}
          lx={callout.lx}
          ly={callout.ly}
          refLabel={callout.ref}
          name={showCalloutName ? callout.label : null}
          accent={accent}
        />
      ) : null}
    </svg>
  );
}
