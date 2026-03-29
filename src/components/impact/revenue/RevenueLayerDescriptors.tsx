"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { TierKey } from "./revenue-tier-config";
import { revenueTierCopy } from "./revenue-tier-copy";
import { impactMissionControl } from "@/content/impact-mission-control";

type Props = {
  tier: TierKey;
};

/** Plan copy under 50M+ — tight spacing; proof points span horizontally on wider viewports. */
export function RevenueLayerDescriptors({ tier }: Props) {
  const tierMeta = impactMissionControl.revenueTierExplanation[tier];
  const copy = revenueTierCopy[tier];
  const tagline = copy.summaryLines[0]?.trim();

  return (
    <div
      className="relative z-20 w-full rounded-sm border border-white/[0.06] bg-[rgba(8,9,9,0.72)] px-2 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:px-2.5"
      aria-live="polite"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={tier}
          initial={{ opacity: 0.96 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.85 }}
          transition={{ duration: 0.12 }}
          className="flex flex-col gap-1.5"
        >
          <p className="font-[family-name:var(--font-body)] text-[length:clamp(0.65625rem,0.35rem+1vw,0.8125rem)] font-semibold leading-snug text-[rgba(248,246,242,0.96)]">
            {copy.executiveSummary}
          </p>
          <p className="font-[family-name:var(--font-body)] text-[length:clamp(0.59375rem,0.28rem+0.88vw,0.6875rem)] font-medium leading-snug text-accent-signal">
            {tierMeta.whyThisMatters}
          </p>
          {tagline ? (
            <p className="font-[family-name:var(--font-body)] text-[length:clamp(0.5625rem,0.26rem+0.82vw,0.65625rem)] leading-snug text-[rgba(200,206,202,0.85)]">
              {tagline}
            </p>
          ) : null}
          <p
            className="font-[family-name:var(--font-mono)] text-[length:clamp(0.53125rem,0.24rem+0.78vw,0.625rem)] font-semibold tabular-nums text-accent-signal/90"
            style={{ letterSpacing: "0.02em" }}
          >
            {copy.microMetrics.join("  ·  ")}
          </p>

          {/* Proof points: span the row (stack only on very narrow) */}
          <div className="grid grid-cols-1 gap-1.5 border-t border-white/[0.06] pt-1.5 min-[420px]:grid-cols-3 min-[420px]:gap-2">
            {tierMeta.enabled.slice(0, 3).map((line) => (
              <p
                key={line}
                className="min-w-0 text-center font-[family-name:var(--font-body)] text-[length:clamp(0.53125rem,0.24rem+0.78vw,0.625rem)] leading-tight text-[rgba(228,226,222,0.88)] min-[420px]:text-left"
              >
                {line}
              </p>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
