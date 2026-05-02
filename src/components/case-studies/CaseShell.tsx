"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import type { CaseStudyEntry, CaseSlug } from "@/content/case-studies";
import { FicheNav } from "@/components/layout/FicheNav";
import { FicheSheetFooter } from "@/components/layout/FicheSheetFooter";
import { CasePicker } from "./CasePicker";

/**
 * CaseShell — minimal wrapper for every /case-studies/[slug] route.
 *
 * Legacy cases render extracted HTML via `body`. Tier A ports (e.g. Centaur)
 * pass `children` as a React tree instead.
 */
export function CaseShell({
  entry,
  body,
  children,
}: {
  entry: CaseStudyEntry;
  /** Raw HTML body extracted from reference/Case Study.html. */
  body?: string;
  /** Tier A React port (omit when using `body`). */
  children?: ReactNode;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof body !== "string") return;
    const root = bodyRef.current;
    if (!root) return;

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
    root.querySelectorAll<HTMLElement>(".adsk-hero").forEach((h) => {
      if (!h.getAttribute("data-tier")) h.setAttribute("data-tier", "growth");
    });

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

    const telBtns = Array.from(root.querySelectorAll<HTMLButtonElement>(".tel-node"));
    const telPanels = Array.from(root.querySelectorAll<HTMLElement>(".tel-panel"));
    const onTelClick = (e: Event) => {
      const btn = e.currentTarget as HTMLButtonElement;
      const wk = btn.dataset.wk;
      telBtns.forEach((x) => x.setAttribute("aria-pressed", "false"));
      btn.setAttribute("aria-pressed", "true");
      telPanels.forEach((p) => p.classList.toggle("active", p.dataset.wk === wk));
    };
    telBtns.forEach((b) => b.addEventListener("click", onTelClick));

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

  const mainClassName = children ? "w-full max-w-none px-0" : "shell";

  const caseStudyChrome = (
    <>
      <div className="mono flex items-center gap-2 text-[var(--muted)]">
        <span aria-hidden className="inline-block h-[7px] w-[7px] rounded-full bg-[var(--teal)]" />
        <span>CASE STUDY</span>
        <span aria-hidden className="text-[var(--line-2)]">
          /
        </span>
        <span className="text-[var(--teal)]">{entry.shortName.toUpperCase()}</span>
      </div>
      <div className="h-px w-full bg-[var(--line)]" />
      <CasePicker activeSlug={entry.slug} />
    </>
  );

  const shell = (
    <article data-case={entry.slug as CaseSlug} className="impact-console relative min-h-screen">
      {children ? (
        <>
          <main className={mainClassName}>
            <div ref={bodyRef} className="tier-a-react-case">
              {children}
            </div>
          </main>
          <div className="tier-a-case-shell-head mx-auto flex max-w-[960px] flex-col gap-4 border-t border-[var(--ink-line)] px-6 pb-6 pt-8 md:pb-8 md:pt-10">
            {caseStudyChrome}
          </div>
        </>
      ) : (
        <>
          <div className="mx-auto flex max-w-[960px] flex-col gap-5 px-6 pt-10">{caseStudyChrome}</div>
          <main className={mainClassName}>
            <div ref={bodyRef}>
              <div dangerouslySetInnerHTML={{ __html: body ?? "" }} />
            </div>
          </main>
        </>
      )}
    </article>
  );

  if (children) {
    return (
      <div className="tier-a-case-root">
        <FicheNav />
        {shell}
        <FicheSheetFooter />
      </div>
    );
  }

  return shell;
}
