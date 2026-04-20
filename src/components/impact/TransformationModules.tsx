"use client";

import { TransformationModule } from "./TransformationModule";
import { transformationDashboard } from "@/content/home";
import { impactPage } from "@/content/impact-page";

export function TransformationModules() {
  const profiles = impactPage.transformationModules.profiles;

  return (
    <section className="relative border-b border-dashboard-border/90 bg-dashboard-bg py-section">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(115deg, rgba(34,211,199,0.22) 0%, transparent 35%, transparent 65%, rgba(34,211,199,0.12) 100%)",
        }}
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-[52rem]">
          <h2 className=" text-section font-bold text-dashboard-ink-light">
            Transformation modules
          </h2>
          <p className="mt-3  text-subhead font-bold leading-[1.6] text-dashboard-ink-muted">
            Expanded proof blocks for each system: Autodesk, Wipro, and EY.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-6">
          {transformationDashboard.companies.map((company, i) => {
            const profile = profiles[company.name as keyof typeof profiles];
            return (
              <TransformationModule
                key={company.name}
                company={{
                  ...company,
                  theme: profile?.theme ?? "",
                  expandedNarrative: profile?.expandedNarrative ?? company.narrative,
                  signalSystemImpact: profile?.signalSystemImpact ?? [],
                }}
                index={i}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

