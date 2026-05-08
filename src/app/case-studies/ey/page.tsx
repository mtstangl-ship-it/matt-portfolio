import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EyCase } from "@/components/case-studies/cases/ey";
import { caseStudyEntries } from "@/content/case-studies";

export function generateMetadata(): Metadata {
  const entry = caseStudyEntries.find((c) => c.slug === "ey");
  if (!entry) return { title: "Case study" };
  return {
    title: entry.title,
    description: entry.oneLine,
  };
}

export default function EyHealthcarePage() {
  const entry = caseStudyEntries.find((c) => c.slug === "ey");
  if (!entry) notFound();
  return <EyCase entry={entry} />;
}
