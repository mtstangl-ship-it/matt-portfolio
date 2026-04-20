import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";

type HeroTone = "light" | "dark" | "article";

/**
 * Tone matrix, one place that owns surface / ink pairings for page heroes.
 * Each tone sets: outer shell, border, title ink, subtitle ink, eyebrow tone.
 */
const toneMap: Record<
  HeroTone,
  {
    shell: string;
    border: string;
    title: string;
    subtitle: string;
    meta: string;
    eyebrow: "accent" | "signal";
  }
> = {
  light: {
    // Translucent so the page-root SiteGrid reads through the hero band.
    shell: "bg-support/40",
    border: "border-ink-200/60",
    title: "text-ink-950",
    subtitle: "text-ink-700",
    meta: "text-ink-500",
    eyebrow: "accent",
  },
  dark: {
    shell: "bg-[#070605]/85",
    border: "border-white/[0.06]",
    title: "text-dashboard-ink-light",
    subtitle: "text-[rgba(232,230,226,0.92)]",
    meta: "text-[rgba(180,176,170,0.55)]",
    eyebrow: "signal",
  },
  article: {
    shell: "bg-paper-50/70",
    border: "border-ink-200/55",
    title: "text-ink-950",
    subtitle: "text-ink-700",
    meta: "text-ink-500",
    eyebrow: "accent",
  },
};

export interface PageHeroProps {
  /** Optional small mono label above the title. */
  eyebrow?: string;
  /** The page title. Rendered as an h1. */
  title: string;
  /** Single lead paragraph. Kept to one tight sentence for consistency. */
  subtitle?: string;
  /** Optional slot rendered below the subtitle, back links, mono meta, CTAs. */
  meta?: ReactNode;
  /** Light / dark / article surface treatment. */
  tone?: HeroTone;
  /** Narrow the container (case-study article style). */
  narrow?: boolean;
  /** Extra className on the outer section shell. */
  className?: string;
}

/**
 * PageHero, the single hero primitive for every page except Home and About.
 *
 * Responsibilities:
 * - Lock horizontal gutter (`px-4 sm:px-6`) and vertical rhythm (`py-section`).
 * - Lock title scale to `text-hero-tight` so every page title is the same size.
 * - Lock subtitle width to `max-w-[52ch]` for a consistent measure.
 * - Route eyebrow styling through the shared `Eyebrow` primitive.
 *
 * Non-goals:
 * - Expressive hero treatments (Home and About have bespoke compositions).
 *   This component is the *baseline*, departures from it are intentional.
 */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  meta,
  tone = "light",
  narrow = false,
  className = "",
}: PageHeroProps) {
  const t = toneMap[tone];
  const container = narrow
    ? "mx-auto max-w-3xl"
    : "mx-auto max-w-6xl";

  return (
    <section
      className={`relative border-b ${t.border} ${t.shell} px-4 py-section sm:px-6 ${className}`.trim()}
    >
      <div className={`relative ${container}`}>
        {eyebrow ? (
          <Eyebrow tone={t.eyebrow} className="mb-4 tracking-[0.25em]">
            {eyebrow}
          </Eyebrow>
        ) : null}

        <h1
          className={`font-display text-hero-tight font-bold ${t.title}`}
        >
          {title}
        </h1>

        {subtitle ? (
          <p
            className={`font-body mt-5 max-w-[52ch] text-subhead font-semibold leading-relaxed ${t.subtitle}`}
          >
            {subtitle}
          </p>
        ) : null}

        {meta ? <div className={`mt-6 ${t.meta}`}>{meta}</div> : null}
      </div>
    </section>
  );
}
