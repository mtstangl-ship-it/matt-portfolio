"use client";

import type { CSSProperties } from "react";
import type { TierKey } from "./revenue-tier-config";
import { tierKinds, tierServiceCounts } from "./revenue-tier-config";
import { revenueTierCopy } from "./revenue-tier-copy";
import { CategoryServiceBox } from "./CategoryServiceBox";

const tierSurface: Record<
  TierKey,
  {
    row: string;
    title: string;
    rx: string;
    businessGlow?: boolean;
  }
> = {
  business: {
    row: "border-accent-signal/50 bg-[rgba(18,22,22,0.82)] shadow-[0_0_0_1px_rgba(34,211,199,0.12)]",
    title: "font-extrabold tracking-wide text-[rgba(248,246,242,0.98)]",
    rx: "rounded-[5px]",
    businessGlow: true,
  },
  professional: {
    row: "border-accent-signal/35 bg-[rgba(14,13,12,0.58)]",
    title: "font-bold tracking-wide text-[rgba(238,236,232,0.94)]",
    rx: "rounded-[4px]",
  },
  included: {
    row: "border-accent-signal/22 bg-[rgba(12,11,10,0.42)]",
    title: "font-semibold tracking-wide text-[rgba(210,206,198,0.88)]",
    rx: "rounded-[3px]",
  },
};

const tierTypeScale: Record<TierKey, CSSProperties> = {
  business: {
    ["--tier-title" as string]: "clamp(0.78125rem, 0.38rem + 1.5vw, 0.90625rem)",
  },
  professional: {
    ["--tier-title" as string]: "clamp(0.75rem, 0.36rem + 1.4vw, 0.875rem)",
  },
  included: {
    ["--tier-title" as string]: "clamp(0.71875rem, 0.34rem + 1.3vw, 0.84375rem)",
  },
};

type Props = {
  tier: TierKey;
  isActive: boolean;
  onSelect: () => void;
};

export function PlanTierRow({ tier, isActive, onSelect }: Props) {
  const surface = tierSurface[tier];
  const copy = revenueTierCopy[tier];
  const counts = tierServiceCounts[tier];

  return (
    <div
      style={tierTypeScale[tier]}
      className={`relative flex min-h-0 cursor-pointer flex-col overflow-hidden border duration-200 ease-out ${surface.row} ${
        surface.rx
      } ${
        isActive
          ? "min-h-[min(13rem,34vh)] max-h-[min(27rem,54vh)] flex-1"
          : "h-11 max-h-11 shrink-0 sm:h-12 sm:max-h-12"
      } ${!isActive ? "opacity-[0.58]" : "opacity-100"} ${
        surface.businessGlow && isActive ? "shadow-[0_0_24px_rgba(34,211,199,0.12)]" : ""
      } ${isActive ? "ring-1 ring-accent-signal/40" : ""} transition-opacity`}
      onMouseEnter={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
    >
      <div
        className={`flex shrink-0 items-center justify-between gap-2 border-b border-white/[0.07] px-2.5 py-2 sm:px-3 ${
          isActive ? "bg-white/[0.03]" : ""
        }`}
      >
        <h3
          className={`truncate font-[family-name:var(--font-body)] [font-size:var(--tier-title)] ${surface.title}`}
        >
          {copy.planLabel}
        </h3>
        <span className="shrink-0 font-mono text-[0.5625rem] font-semibold uppercase tracking-[0.14em] text-accent-signal/45">
          {isActive ? "Scroll" : "Open"}
        </span>
      </div>

      {isActive ? (
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-1.5 py-2 sm:px-2 sm:py-2.5 [scrollbar-gutter:stable]">
          <div className="grid min-h-0 w-full grid-cols-1 gap-2 min-[480px]:grid-cols-3 min-[480px]:gap-2 md:gap-2.5">
            {tierKinds.map((kind, idx) => (
              <CategoryServiceBox
                key={kind}
                kind={kind}
                count={counts[idx]}
                labelIndex={idx as 0 | 1 | 2}
                compact={tier === "included"}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
