import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WiproCase } from "@/components/case-studies/cases/wipro";
import { caseStudyEntries } from "@/content/case-studies";

export function generateMetadata(): Metadata {
  const entry = caseStudyEntries.find((c) => c.slug === "wipro");
  if (!entry) return { title: "Case study" };
  return {
    title: entry.title,
    description: entry.oneLine,
  };
}

/** Static route takes precedence over `[slug]` so Tier A Wipro CSS loads via `./layout.tsx`. */
export default function WiproCasePage() {
  const entry = caseStudyEntries.find((c) => c.slug === "wipro");
  if (!entry) notFound();
  return <WiproCase entry={entry} />;
}
