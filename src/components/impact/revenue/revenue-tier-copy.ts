import type { TierKey } from "./revenue-tier-config";

/** Compact tier blurbs — paired with `whyThisMatters` + metrics in the descriptor panel. */
export const revenueTierCopy: Record<
  TierKey,
  {
    planLabel: string;
    executiveSummary: string;
    /** Optional second line; omit redundancy with executiveSummary. */
    summaryLines: [string, string];
    microMetrics: readonly string[];
  }
> = {
  business: {
    planLabel: "Business Plan",
    executiveSummary:
      "White-glove success, strategic account planning, and coaching-heavy delivery—built to expand accounts, strengthen retention, and run post-purchase as a revenue motion.",
    summaryLines: [
      "Guided adoption · deeper engagement · expansion plays",
      "",
    ],
    microMetrics: ["15 services", "6 innovated", "4 optimized", "5 refined"],
  },
  professional: {
    planLabel: "Professional Plan",
    executiveSummary:
      "Scaled success for the mid-market: raise utilization and adoption by mixing guided plays with self-service—strong outcomes without full premium desk coverage.",
    summaryLines: ["Balanced cost-to-serve · guided + self-serve", ""],
    microMetrics: ["10 services", "4 innovated", "3 optimized", "3 refined"],
  },
  included: {
    planLabel: "Included Plan",
    executiveSummary:
      "Foundational onboarding and self-service paths so every customer reaches first value faster, with less reliance on reactive support.",
    summaryLines: ["Retention at the base · feeds upsell into higher tiers", ""],
    microMetrics: ["5 services", "2 innovated", "1 optimized", "2 refined"],
  },
};
