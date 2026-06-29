import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SyntheticCase } from "@/components/case-studies/cases/synthetic";
import { caseStudyEntries } from "@/content/case-studies";

export function generateMetadata(): Metadata {
  const entry = caseStudyEntries.find((c) => c.slug === "synthetic");
  if (!entry) return { title: "Case study" };
  return {
    title: entry.title,
    description: entry.oneLine,
  };
}

/** Tier A Synthetic Users — static route loads case-synthetic CSS via `./layout.tsx`. */
export default function SyntheticUsersCasePage() {
  const entry = caseStudyEntries.find((c) => c.slug === "synthetic");
  if (!entry) notFound();
  return <SyntheticCase entry={entry} />;
}
