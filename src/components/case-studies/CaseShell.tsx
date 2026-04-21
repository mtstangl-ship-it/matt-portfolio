"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import type { CaseStudyEntry, CaseSlug } from "@/content/case-studies";
import { caseStudyEntries } from "@/content/case-studies";

/**
 * CaseShell — minimal wrapper for every /case-studies/[slug] route.
 *
 * The bespoke case body (.mast hero, .outcome, .metrics, .chapter stack) is
 * rendered verbatim from the extracted reference HTML via
 * `dangerouslySetInnerHTML`. That keeps the long-form content 1:1 with
 * reference/Case Study.html without re-deriving hundreds of lines of JSX
 * that would drift from the source.
 *
 * Responsibilities:
 *   1. Scope .impact-console tokens and data-case accent vars to the article.
 *   2. Provide the shared "back to case studies" link.
 *   3. Provide prev/next case navigation (Next Link routing, not hash).
 *   4. Wire the small set of interactive widgets that the reference HTML
 *      ships with: Autodesk tier toggle, AI terminal severity filter, AI
 *      telemetry node switcher.
 */
export function CaseShell({
  entry,
  body,
  dataCase,
}: {
  entry: CaseStudyEntry;
  /** Raw HTML body extracted from reference/Case Study.html. */
  body: string;
  /** The `data-case` value used by the reference CSS. `synth` for Synthetic
   * Users, otherwise matches the route slug. */
  dataCase: string;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = bodyRef.current;
    if (!root) return;

    // ---- Autodesk tier toggle (Growth ↔ Nurture) ----
    // Clicking a button sets aria-checked on its siblings and pushes the
    // selected tier onto the nearest .adsk-hero so the hero's [data-tier]
    // CSS swap kicks in.
    const tierBtns = Array.from(
      root.querySelectorAll<HTMLButtonElement>(".tier-toggle button[data-tier]"),
    );
    const onTierClick = (e: Event) => {
      const btn = e.currentTarget as HTMLButtonElement;
      const tier = btn.dataset.tier;
      const group = btn.closest(".tier-toggle");
      if (!group || !tier) return;
      group
        .querySelectorAll<HTMLButtonElement>("button")
        .forEach((b) => b.setAttribute("aria-checked", b === btn ? "true" : "false"));
      const hero = btn.closest<HTMLElement>(".adsk-hero");
      if (hero) hero.setAttribute("data-tier", tier);
    };
    tierBtns.forEach((b) => b.addEventListener("click", onTierClick));
    // Default any Autodesk hero without a data-tier to "growth" so the
    // CSS selectors render the initial state correctly.
    root.querySelectorAll<HTMLElement>(".adsk-hero").forEach((h) => {
      if (!h.getAttribute("data-tier")) h.setAttribute("data-tier", "growth");
    });

    // ---- AI Review Terminal severity filter ----
    const termBtns = Array.from(
      root.querySelectorAll<HTMLButtonElement>(".term-filters button"),
    );
    const termItems = Array.from(
      root.querySelectorAll<HTMLElement>("#term-body li, .term-body li"),
    );
    const onTermClick = (e: Event) => {
      const btn = e.currentTarget as HTMLButtonElement;
      termBtns.forEach((b) => b.setAttribute("aria-pressed", "false"));
      btn.setAttribute("aria-pressed", "true");
      const sev = btn.dataset.sev;
      termItems.forEach((li) => {
        const match = sev === "all" || li.dataset.sev === sev;
        li.classList.toggle("hidden", !match);
      });
    };
    termBtns.forEach((b) => b.addEventListener("click", onTermClick));

    // ---- AI build telemetry nodes: week selector ----
    const telBtns = Array.from(
      root.querySelectorAll<HTMLButtonElement>(".tel-node"),
    );
    const telPanels = Array.from(
      root.querySelectorAll<HTMLElement>(".tel-panel"),
    );
    const onTelClick = (e: Event) => {
      const btn = e.currentTarget as HTMLButtonElement;
      const wk = btn.dataset.wk;
      telBtns.forEach((x) => x.setAttribute("aria-pressed", "false"));
      btn.setAttribute("aria-pressed", "true");
      telPanels.forEach((p) => p.classList.toggle("active", p.dataset.wk === wk));
    };
    telBtns.forEach((b) => b.addEventListener("click", onTelClick));

    // ---- Signal Strip column hover highlight (AI case only) ----
    const sigCols = Array.from(
      root.querySelectorAll<HTMLElement>("#signal-strip .sig-col, .signal-strip .sig-col"),
    );
    const onSigEnter = (e: Event) => {
      const col = e.currentTarget as HTMLElement;
      sigCols.forEach((c) => c.setAttribute("data-active", "false"));
      col.setAttribute("data-active", "true");
    };
    sigCols.forEach((c) => c.addEventListener("mouseenter", onSigEnter));

    return () => {
      tierBtns.forEach((b) => b.removeEventListener("click", onTierClick));
      termBtns.forEach((b) => b.removeEventListener("click", onTermClick));
      telBtns.forEach((b) => b.removeEventListener("click", onTelClick));
      sigCols.forEach((c) => c.removeEventListener("mouseenter", onSigEnter));
    };
  }, [body]);

  // Prev/next case navigation — wraps.
  const total = caseStudyEntries.length;
  const idx = caseStudyEntries.findIndex((c) => c.slug === entry.slug);
  const prev = caseStudyEntries[(idx - 1 + total) % total];
  const next = caseStudyEntries[(idx + 1) % total];

  return (
    <article
      data-case={entry.slug as CaseSlug}
      className="impact-console relative min-h-screen"
    >
      {/* Breadcrumb row — the reference HTML has a .crumb block per case but
          we own a site-level breadcrumb so only the back-link is needed. */}
      <div className="mx-auto max-w-[960px] px-6 pt-10">
        <Link
          href="/case-studies"
          className="mono text-[var(--muted)] transition-colors hover:text-[var(--teal)]"
        >
          ← All case studies
        </Link>
      </div>

      {/* The extracted HTML body — mast, outcome, metrics, chapters, lesson. */}
      <main
        ref={bodyRef}
        className="shell"
        dangerouslySetInnerHTML={{ __html: body }}
      />

      {/* Prev / next case navigation. */}
      <nav
        aria-label="Case study navigation"
        className="mx-auto flex max-w-[960px] flex-col gap-6 border-t border-[var(--line)] px-6 py-10 md:flex-row md:items-center md:justify-between"
      >
        <Link
          href={`/case-studies/${prev.slug}`}
          className="group block min-w-0 flex-1"
        >
          <div className="mono text-[var(--muted)] group-hover:text-[var(--teal)]">
            ← Previous · Case {String(prev.caseNumber).padStart(2, "0")}
          </div>
          <div className="mt-2 text-[var(--ink)] group-hover:text-[var(--teal)]">
            {prev.title}
          </div>
        </Link>
        <Link
          href={`/case-studies/${next.slug}`}
          className="group block min-w-0 flex-1 md:text-right"
        >
          <div className="mono text-[var(--muted)] group-hover:text-[var(--teal)]">
            Next · Case {String(next.caseNumber).padStart(2, "0")} →
          </div>
          <div className="mt-2 text-[var(--ink)] group-hover:text-[var(--teal)]">
            {next.title}
          </div>
        </Link>
      </nav>
    </article>
  );
}
