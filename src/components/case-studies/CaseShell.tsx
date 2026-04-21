import type { ReactNode } from "react";
import Link from "next/link";
import type { CaseStudyEntry } from "@/content/case-studies";
import { caseStudyEntries } from "@/content/case-studies";

/**
 * CaseShell — shared article wrapper for every /case-studies/[slug] page.
 *
 * This is the only place the <article data-case> root lives. Doing it once
 * guarantees the accent-bar system, the .impact-console token scope, and the
 * case-level color variables (see globals.css) all apply to the full page
 * body, including any interior lists, blueprints, and flow diagrams that
 * reference `var(--case-accent)`.
 *
 * Children render into the main content column below the hero. Phase A keeps
 * the column full-width and bleed so bespoke case layouts can set their own
 * internal grid without fighting a parent max-width.
 */
export function CaseShell({
  entry,
  children,
}: {
  entry: CaseStudyEntry;
  children: ReactNode;
}) {
  const total = caseStudyEntries.length;
  const caseMeta = `CASE ${String(entry.caseNumber).padStart(2, "0")} OF ${String(total).padStart(2, "0")}`;

  return (
    <article
      data-case={entry.slug}
      className="impact-console relative min-h-screen"
    >
      {/* Hero band — shared across all five cases. Accent bar gradient resolves
          via the per-case CSS variables set in globals.css, so EY reads as a
          four-color sweep, Wipro as red/amber/green, etc. */}
      <header className="relative border-b border-[var(--line)] px-4 pt-8 pb-section sm:px-6 sm:pt-10">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6">
            <Link
              href="/case-studies"
              className="mono text-[var(--muted)] transition-colors hover:text-[var(--teal)]"
            >
              ← Back to case studies
            </Link>
          </p>

          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <span className="mono text-[var(--muted)]">{caseMeta}</span>
            <span className="mono text-[var(--case-accent)]">{entry.tag}</span>
          </div>

          <h1 className="mt-5 max-w-[22ch] text-[var(--ink)]">
            {entry.title}
          </h1>

          <p className="mt-5 max-w-[56ch] text-[1.0625rem] leading-[1.55] text-[var(--ink-2)]">
            {entry.oneLine}
          </p>

          {/* Accent bar — the one element that has to respect per-case color.
              Each case overrides its own gradient in globals.css or within the
              case component. Default here is a quiet single-color rail. */}
          <div
            aria-hidden
            className="case-accent-bar mt-8 h-[2px] w-full"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, var(--case-accent) 50%, transparent 100%)",
            }}
          />
        </div>
      </header>

      {/* Bespoke case body — each case renders its own layout. */}
      <div className="relative px-4 py-section sm:px-6">
        <div className="mx-auto max-w-6xl">{children}</div>
      </div>

      {/* Tail row — mirrors the footer of each reference HTML case. */}
      <footer className="border-t border-[var(--line)] px-4 py-8 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-baseline justify-between gap-4">
          <Link
            href="/case-studies"
            className="mono text-[var(--muted)] transition-colors hover:text-[var(--teal)]"
          >
            ← All case studies
          </Link>
          <span className="mono text-[var(--muted)]">{caseMeta}</span>
        </div>
      </footer>
    </article>
  );
}
