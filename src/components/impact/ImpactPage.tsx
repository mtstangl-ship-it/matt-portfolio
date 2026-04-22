"use client";

import { SiteGrid } from "@/components/ui";
import { ImpactShell } from "./ImpactShell";

/**
 * /impact page body. ImpactShell is the Phase B2 port that matches
 * reference/Impact Dashboard.html 1:1; the `.impact-console` wrapper
 * feeds it the OKLCH token set (--bg, --teal, etc.) and the scoped
 * rules in impact.css do the rest.
 */
export function ImpactPage() {
  return (
    <div className="impact-console relative min-h-svh">
      <SiteGrid tone="dark" opacity={0.45} />
      <ImpactShell />
    </div>
  );
}
