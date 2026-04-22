import Link from "next/link";
import { caseStudyEntries, type CaseSlug } from "@/content/case-studies";

/**
 * CasePicker — horizontal case-switcher rendered at the top of every
 * /case-studies/[slug] route. Mirrors the reference HTML's .picker block
 * but routes through Next <Link> instead of the prototype's data-case
 * article swap.
 *
 * Styling is kept inline (plain strings, no bespoke CSS file) so this
 * component can't drift from the rest of the case chrome. The .mono
 * utility from tokens-type.css supplies the uppercase/tracking; the
 * .impact-console wrapper on the article scopes the color tokens.
 */
export function CasePicker({ activeSlug }: { activeSlug: CaseSlug }) {
  return (
    <nav
      aria-label="Case study picker"
      className="case-picker flex flex-wrap gap-2"
    >
      {caseStudyEntries.map((c) => {
        const isActive = c.slug === activeSlug;
        const num = String(c.caseNumber).padStart(2, "0");
        return (
          <Link
            key={c.slug}
            href={`/case-studies/${c.slug}`}
            aria-current={isActive ? "page" : undefined}
            className={[
              "mono block border px-3 py-2 transition-colors",
              isActive
                ? "border-[var(--teal-dim)] bg-[var(--teal-wash)] text-[var(--teal)]"
                : "border-[var(--line)] bg-[var(--bg-2)] text-[var(--muted)] hover:border-[var(--line-2)] hover:text-[var(--ink-2)]",
            ].join(" ")}
          >
            {num} · <span className="uppercase">{c.shortName}</span>
          </Link>
        );
      })}
    </nav>
  );
}
