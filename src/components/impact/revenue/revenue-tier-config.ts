/** Mirrors `RevenueTierKey` from ImpactCentralSystem (duplicated here to avoid circular imports). */
export type TierKey = "business" | "professional" | "included";

export const CLUSTER_LABELS = ["Innovated", "Optimized", "Refined"] as const;

export type CategoryKind = "innovated" | "optimized" | "refined";

export const tierServiceCounts: Record<
  TierKey,
  readonly [innovated: number, optimized: number, refined: number]
> = {
  business: [6, 4, 5],
  professional: [4, 3, 3],
  included: [2, 1, 2],
};

export const tierKinds: readonly CategoryKind[] = ["innovated", "optimized", "refined"];

/** Top → bottom: Business, Professional, Included */
export const tierOrder: TierKey[] = ["business", "professional", "included"];
