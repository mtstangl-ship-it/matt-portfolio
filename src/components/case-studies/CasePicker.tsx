import Link from "next/link";
import { caseStudyDetailHref, caseStudyEntries, type CaseSlug } from "@/content/case-studies";

/**
 * CasePicker — horizontal case-switcher at the top of every case route.
 * Tier A: primary nav between cases (hover/focus affordances, mono hint).
 */
export function CasePicker({ activeSlug }: { activeSlug: CaseSlug }) {
  return (
    <div className="case-picker-wrap">
      <p className="case-picker-hint mono mb-2 text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]">
        ↓ NAVIGATE CASES
      </p>
      <nav aria-label="Case study picker" className="case-picker flex flex-wrap gap-2">
        {caseStudyEntries.map((c) => {
          const isActive = c.slug === activeSlug;
          const num = String(c.caseNumber).padStart(2, "0");
          return (
            <Link
              key={c.slug}
              href={caseStudyDetailHref(c.slug)}
              aria-current={isActive ? "page" : undefined}
              className={[
                "mono block cursor-pointer rounded-sm border px-3 py-2 transition-colors",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--teal)]",
                isActive
                  ? "border-[var(--teal-dim)] bg-[var(--teal-wash)] text-[var(--teal)]"
                  : [
                      "border-[var(--line)] bg-[var(--bg-2)] text-[var(--muted)]",
                      "hover:border-[var(--teal-dim)] hover:bg-[rgba(29,207,170,0.07)] hover:text-[var(--ink-2)]",
                    ].join(" "),
              ].join(" ")}
            >
              {num} · <span className="uppercase">{c.shortName}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
