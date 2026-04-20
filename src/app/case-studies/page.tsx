import type { Metadata } from "next";
import { CaseStudyIntelPanel } from "@/components/case-studies";
import { PageHero, SiteGrid } from "@/components/ui";
import { caseStudiesPage, caseStudyEntries } from "@/content/case-studies";

export const metadata: Metadata = {
  title: "Case Studies",
  description: caseStudiesPage.subhead,
};

export default function CaseStudiesIndexPage() {
  const [featured, ...supporting] = caseStudyEntries;

  return (
    <div className="relative min-h-screen bg-paper-50">
      <SiteGrid tone="light" opacity={0.3} />
      <PageHero
        eyebrow={caseStudiesPage.eyebrow}
        title={caseStudiesPage.title}
        subtitle={caseStudiesPage.subhead}
        tone="light"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-section sm:px-6">
        {featured ? (
          <div className="mb-5 md:mb-6">
            <CaseStudyIntelPanel entry={featured} mode="pageFeatured" />
          </div>
        ) : null}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 md:items-stretch">
          {supporting.map((entry) => (
            <CaseStudyIntelPanel key={entry.slug} entry={entry} mode="pageSupporting" />
          ))}
        </div>
      </div>
    </div>
  );
}
