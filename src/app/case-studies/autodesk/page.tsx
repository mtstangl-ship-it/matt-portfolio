import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AutodeskCase } from "@/components/case-studies/cases/autodesk";
import { caseStudyEntries } from "@/content/case-studies";

export function generateMetadata(): Metadata {
  const entry = caseStudyEntries.find((c) => c.slug === "autodesk");
  if (!entry) return { title: "Case study" };
  return {
    title: entry.title,
    description: entry.oneLine,
  };
}

/** Static route takes precedence over `[slug]` so Tier A Autodesk CSS loads via `./layout.tsx`. */
export default function AutodeskCasePage() {
  const entry = caseStudyEntries.find((c) => c.slug === "autodesk");
  if (!entry) notFound();
  return <AutodeskCase entry={entry} />;
}
