import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
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
    <article className="min-h-screen bg-paper-50 px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/case-studies"
          className="font-mono text-[0.55rem] font-semibold uppercase tracking-[0.14em] text-accent/90 transition-colors hover:text-accent-dark"
        >
          ← Case Studies
        </Link>
        <header className="mt-8 border-b border-ink-200/55 pb-8">
          <h1 className="font-display text-3xl font-bold leading-tight tracking-[-0.02em] text-ink-950 sm:text-[2rem]">
            {entry.title}
          </h1>
          <p className="font-body mt-4 text-lg font-semibold text-ink-700">{entry.oneLine}</p>
        </header>
        <div className="mt-8 space-y-5">
          {entry.body.map((p, i) => (
            <p key={i} className="font-body text-[1.0625rem] leading-[1.65] text-ink-800">
              {p}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}
