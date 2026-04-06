import type { Metadata } from "next";
import { CaseStudyIntelPanel } from "@/components/case-studies";
import { caseStudiesPage, caseStudyEntries } from "@/content/case-studies";

export const metadata: Metadata = {
  title: "Case Studies",
  description: caseStudiesPage.subhead,
};

export default function CaseStudiesIndexPage() {
  const [featured, ...supporting] = caseStudyEntries;

  return (
    <div className="min-h-screen bg-paper-50">
      <div className="border-b border-ink-200/60 bg-support/30 px-4 py-10 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-display text-3xl font-bold text-ink-950 sm:text-4xl">{caseStudiesPage.title}</h1>
          <p className="font-body mt-3 max-w-2xl text-subhead font-semibold leading-relaxed text-ink-700">
            {caseStudiesPage.subhead}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-section sm:px-6">
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
