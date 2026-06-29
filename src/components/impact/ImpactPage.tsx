"use client";

import { SiteGrid } from "@/components/ui";
import { FicheNav } from "@/components/layout/FicheNav";
import { ImpactShell } from "./ImpactShell";

/** /impact — Treatment A fiche chrome (FicheNav + scoped tokens in impact.css). */
export function ImpactPage() {
  return (
    <div className="impact-console relative min-h-svh">
      <FicheNav />
      <SiteGrid tone="dark" opacity={0.45} />
      <div className="impact-shell">
        <ImpactShell />
      </div>
    </div>
  );
}
