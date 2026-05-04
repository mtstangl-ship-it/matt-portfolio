import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseComponents } from "@/components/case-studies";
import { caseStudyEntries, type CaseSlug } from "@/content/case-studies";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  /** Static routes under `case-studies/<slug>/` own CSS + layout (Centaur, EY Tier A). */
  return caseStudyEntries.filter((cs) => cs.slug !== "ai" && cs.slug !== "ey").map((cs) => ({ slug: cs.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const entry = caseStudyEntries.find((c) => c.slug === params.slug);
  if (!entry) return { title: "Case Study" };
  return {
    title: entry.title,
    description: entry.oneLine,
  };
}

export default function CaseStudyDetailPage({ params }: Props) {
  const entry = caseStudyEntries.find((c) => c.slug === params.slug);
  if (!entry) notFound();

  // Each case owns its own layout. The shell + hero live inside CaseShell,
  // which wraps the registered component's output.
  const CaseComponent = caseComponents[entry.slug as CaseSlug];
  if (!CaseComponent) notFound();

  return <CaseComponent entry={entry} />;
}
