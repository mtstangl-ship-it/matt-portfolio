import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero, SiteGrid } from "@/components/ui";
import { caseStudyEntries } from "@/content/case-studies";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return caseStudyEntries.map((cs) => ({ slug: cs.slug }));
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

  return (
    <article className="relative min-h-screen bg-paper-50">
      <SiteGrid tone="light" opacity={0.25} />
      <PageHero
        eyebrow={entry.panelLabel}
        title={entry.title}
        subtitle={entry.oneLine}
        tone="article"
        narrow
        meta={
          <Link
            href="/case-studies"
            className="font-mono text-eyebrow font-semibold uppercase tracking-[0.25em] text-accent/90 transition-colors hover:text-accent-dark"
          >
            ← Back to case studies
          </Link>
        }
      />

      <div className="relative mx-auto max-w-3xl px-4 py-section sm:px-6">
        <div className="space-y-5">
          {entry.body.map((p, i) => (
            <p
              key={i}
              className="font-body text-body-lg leading-[1.65] text-ink-800"
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}
