import type { Metadata } from "next";
import Link from "next/link";
import { caseStudiesPage, caseStudyEntries } from "@/content/case-studies";

export const metadata: Metadata = {
  title: "Case Studies",
  description: caseStudiesPage.subhead,
};

export default function CaseStudiesIndexPage() {
  return (
    <div className="min-h-screen bg-paper-50">
      <div className="border-b border-ink-200/60 bg-support/30 px-4 py-12 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-display text-3xl font-bold text-ink-950 sm:text-4xl">{caseStudiesPage.title}</h1>
          <p className="font-body mt-4 max-w-2xl text-subhead font-semibold leading-relaxed text-ink-700">
            {caseStudiesPage.subhead}
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-section sm:px-6">
        <ul className="divide-y divide-ink-200/60 border-y border-ink-200/60">
          {caseStudyEntries.map((cs) => (
            <li key={cs.slug}>
              <Link
                href={`/case-studies/${cs.slug}`}
                className="group flex flex-col gap-2 py-8 transition-colors first:pt-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8 sm:py-10"
              >
                <div className="min-w-0">
                  <h2 className="font-display text-xl font-bold text-ink-950 transition-colors group-hover:text-accent-dark [text-wrap:balance] sm:text-2xl">
                    {cs.title}
                  </h2>
                  <p className="font-body mt-2 max-w-[52ch] text-[0.9375rem] font-medium leading-relaxed text-ink-700">
                    {cs.oneLine}
                  </p>
                </div>
                <span className="font-mono shrink-0 text-[0.55rem] font-semibold uppercase tracking-[0.14em] text-accent/85">
                  Read →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
