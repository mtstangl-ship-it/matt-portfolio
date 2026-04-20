"use client";

import { SiteGrid } from "@/components/ui";
import { ImpactDashboardBriefing } from "./ImpactDashboardBriefing";

export function ImpactPage() {
  return (
    <div className="relative min-h-svh bg-dashboard-bg">
      <SiteGrid tone="dark" opacity={0.45} />
      <ImpactDashboardBriefing />
    </div>
  );
}

