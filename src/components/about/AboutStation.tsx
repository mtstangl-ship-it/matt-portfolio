import type { ReactNode } from "react";

type Tone = "default" | "muted" | "surface";

/**
 * Translucent tones, the GalaxyBackground lives behind everything, so section
 * surfaces are deliberately see-through. Content areas remain readable via the
 * card/border treatments inside each section.
 */
const toneClass: Record<Tone, string> = {
  default: "bg-dashboard-bg/55 backdrop-blur-[2px]",
  muted: "bg-dashboard-muted/18 backdrop-blur-[2px]",
  surface: "bg-dashboard-muted/10 backdrop-blur-[2px]",
};

/**
 * AboutStation, section primitive for the About page.
 *
 * Responsibilities:
 * - Render a section that sits above the site-wide GalaxyBackground.
 * - Display a continuous station spine in the left gutter, with a node marker
 *   at the station's entry point.
 * - Carry the station code + kicker (both desktop and mobile).
 * - Optionally mount celestial decor in the right margin.
 */
export function AboutStation({
  code,
  kicker,
  title,
  subtitle,
  tone = "default",
  children,
  bleed = false,
  decor,
  last = false,
  titleAs = "h2",
}: {
  code: string;
  kicker: string;
  title: string;
  subtitle?: string;
  tone?: Tone;
  children: ReactNode;
  /** When true, the content area has no max-width cap. */
  bleed?: boolean;
  /** Optional celestial accent rendered in the right margin. */
  decor?: ReactNode;
  /** Last section, stops the spine from extending past the footer. */
  last?: boolean;
  /** Heading level for the station title. First station = h1, all others h2. */
  titleAs?: "h1" | "h2";
}) {
  const TitleTag = titleAs;
  return (
    <section
      className={`relative border-b border-white/[0.05] ${toneClass[tone]} px-4 py-16 sm:px-6 sm:py-24`}
    >
      <div className="mx-auto flex w-full max-w-6xl gap-6 sm:gap-8 lg:gap-12">
        {/* Left gutter, continuous spine + station node + tag */}
        <div className="relative hidden w-14 shrink-0 flex-col items-start sm:flex lg:w-20">
          {/* Full-height spine (butts against next section's spine) */}
          <span
            aria-hidden
            className="absolute left-0 top-0 w-px bg-white/[0.08]"
            style={{ height: last ? "calc(100% - 3rem)" : "100%" }}
          />
          {/* Accent segment near the node */}
          <span
            aria-hidden
            className="absolute left-0 top-0 w-px bg-gradient-to-b from-accent-signal/55 via-accent-signal/20 to-transparent"
            style={{ height: "5rem" }}
          />
          {/* Station node marker */}
          <span
            aria-hidden
            className="absolute -left-[3px] top-[0.4rem] h-[7px] w-[7px] rounded-full border border-accent-signal bg-dashboard-bg"
            style={{ boxShadow: "0 0 10px rgba(34,211,199,0.6)" }}
          />

          <div className="flex flex-col items-start gap-2 pl-4">
            <span className="font-mono text-[0.6875rem] font-semibold tracking-[0.24em] text-accent-signal">
              {code}
            </span>
            <span className="font-mono text-[0.5rem] uppercase tracking-[0.28em] text-dashboard-ink-muted/85">
              {kicker}
            </span>
          </div>
        </div>

        <div className="relative min-w-0 flex-1">
          {/* Mobile station marker */}
          <div className="mb-6 flex items-center gap-2 sm:hidden">
            <span className="h-[7px] w-[7px] rounded-full border border-accent-signal bg-dashboard-bg" aria-hidden />
            <span className="font-mono text-[0.625rem] font-semibold tracking-[0.2em] text-accent-signal">
              {code}
            </span>
            <span className="h-px flex-1 bg-accent-signal/25" aria-hidden />
            <span className="font-mono text-[0.5rem] uppercase tracking-[0.24em] text-dashboard-ink-muted/85">
              {kicker}
            </span>
          </div>

          <div className="relative">
            <TitleTag
              className={
                titleAs === "h1"
                  ? // Hero station, page h1. Larger, closer to PageHero's hero-tight scale
                    // but kept expressive with uppercase display treatment to preserve About's tone.
                    "max-w-[24ch] font-display text-hero-tight font-semibold leading-[1.05] tracking-[-0.03em] text-white"
                  : "max-w-[38ch] font-display text-[clamp(1.35rem,3vw,1.75rem)] font-semibold leading-[1.15] tracking-[-0.025em] text-white"
              }
            >
              {title}
            </TitleTag>
            {subtitle ? (
              <p className="mt-4 max-w-[52ch] font-body text-subhead font-semibold leading-relaxed text-dashboard-ink-muted">
                {subtitle}
              </p>
            ) : null}

            {/* Right-margin decor, hidden below lg so content breathes on mobile */}
            {decor ? (
              <div className="pointer-events-none absolute -right-4 -top-4 hidden lg:block">
                {decor}
              </div>
            ) : null}
          </div>

          <div className={bleed ? "mt-10" : "mt-10 max-w-4xl"}>{children}</div>
        </div>
      </div>
    </section>
  );
}
