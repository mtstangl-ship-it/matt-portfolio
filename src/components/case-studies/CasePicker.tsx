"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  caseStudyDetailHref,
  caseStudyEntries,
  type CaseSlug,
  type CaseStudyEntry,
} from "@/content/case-studies";

function pickerLinkClass(isActive: boolean) {
  return [
    "case-picker-link mono block cursor-pointer rounded-sm border px-3 py-2 text-left text-[10px] uppercase tracking-[0.14em] transition-colors",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--teal)]",
    isActive
      ? "border-[var(--teal-dim)] bg-[var(--teal-wash)] text-[var(--teal)]"
      : [
          "border-[var(--line)] bg-transparent text-[var(--muted)]",
          "hover:border-[var(--teal-dim)] hover:bg-[rgba(29,207,170,0.07)] hover:text-[var(--ink-2)]",
        ].join(" "),
  ].join(" ");
}

/**
 * CasePicker — case-switcher at the top of every case route.
 * ≥1025px: hint + horizontal chips. ≤1024px: inline mono disclosure row + vertical list.
 */
export function CasePicker({ activeSlug }: { activeSlug: CaseSlug }) {
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const active = caseStudyEntries.find((c) => c.slug === activeSlug);
  const activeNum = active ? String(active.caseNumber).padStart(2, "0") : "--";
  const activeShort = active?.shortName ?? "";

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const renderLink = (c: CaseStudyEntry, onNavigate?: () => void) => {
    const isActive = c.slug === activeSlug;
    const num = String(c.caseNumber).padStart(2, "0");
    return (
      <Link
        key={c.slug}
        href={caseStudyDetailHref(c.slug)}
        aria-current={isActive ? "page" : undefined}
        onClick={onNavigate}
        className={pickerLinkClass(isActive)}
      >
        {num} · <span className="uppercase">{c.shortName}</span>
      </Link>
    );
  };

  return (
    <div className="case-picker-wrap" ref={wrapRef}>
      <div className="case-picker-desktop hidden min-[1025px]:block">
        <p className="case-picker-hint case-picker-hint--label mono mb-2 text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">
          ↓ NAVIGATE CASES
        </p>
        <nav aria-label="Case study picker" className="case-picker flex flex-wrap gap-2">
          {caseStudyEntries.map((c) => renderLink(c))}
        </nav>
      </div>

      <div
        className={`case-picker-dropdown min-[1025px]:hidden ${open ? "case-picker-dropdown--open" : ""}`}
      >
        <button
          type="button"
          className="case-picker-dropdown__trigger flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={`Navigate cases. Current: ${activeShort || "case"}`}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="mono min-w-0 flex-1 truncate text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">
            ↓ NAVIGATE CASES · {activeNum} ·{" "}
            <span className="text-[var(--ink-2)]">{activeShort}</span>
          </span>
          <svg
            className={`case-picker-dropdown__chevron h-3 w-3 shrink-0 text-[var(--ink-2)] transition-transform duration-200 ease-out ${open ? "rotate-180" : ""}`}
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden
          >
            <path
              d="M3 4.5 6 7.5 9 4.5"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        {open ? (
          <nav
            id={panelId}
            className="case-picker-dropdown__panel flex flex-col gap-1 border-t border-[var(--line)] p-2"
            aria-label="Case study picker"
          >
            {caseStudyEntries.map((c) => renderLink(c, close))}
          </nav>
        ) : null}
      </div>
    </div>
  );
}
