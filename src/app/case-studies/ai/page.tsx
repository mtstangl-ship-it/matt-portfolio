import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AiCase } from "@/components/case-studies/cases/ai";
import { caseStudyEntries } from "@/content/case-studies";

export function generateMetadata(): Metadata {
  const entry = caseStudyEntries.find((c) => c.slug === "ai");
  if (!entry) return { title: "Case study" };
  return {
    title: entry.title,
    description: entry.oneLine,
  };
}

/** Static route takes precedence over `[slug]` so Tier A Centaur CSS loads via `./layout.tsx`. */
export default function CentaurPracticePage() {
  const entry = caseStudyEntries.find((c) => c.slug === "ai");
  if (!entry) notFound();
  return <AiCase entry={entry} />;
}
