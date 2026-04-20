"use client";

import { PageHero, SiteGrid } from "@/components/ui";
import { impactMissionControl } from "@/content/impact-mission-control";
import { ImpactMissionControl } from "./ImpactMissionControl";

export function ImpactPage() {
  return (
    <div className="relative bg-dashboard-bg">
      <SiteGrid tone="dark" opacity={0.45} />
      <PageHero
        eyebrow={impactMissionControl.eyebrow}
        title={impactMissionControl.headline}
        subtitle={impactMissionControl.tagline}
        tone="dark"
        meta={
          <p className="font-mono text-eyebrow font-semibold uppercase tracking-[0.25em] text-dashboard-ink-muted/70 tabular-nums">
            {impactMissionControl.subhead}
          </p>
        }
      />
      <ImpactMissionControl />
    </div>
  );
}

