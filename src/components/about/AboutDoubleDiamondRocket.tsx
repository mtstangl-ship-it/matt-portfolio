import type { ReactNode } from "react";
import { aboutPage } from "@/content/about";

/**
 * Subtle full-height wash — one fuselage silhouette, doesn’t fight text for scale.
 */
function RocketFuselageBackdrop() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 z-0 mx-auto w-[min(92%,22rem)] text-white/[0.06] sm:w-[min(88%,26rem)]"
      viewBox="0 0 400 920"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <path
        d="M200 32 L268 145 L288 320 L305 780 L200 888 L95 780 L112 320 L132 145 Z"
        fill="currentColor"
        fillOpacity="0.4"
        stroke="rgba(45,212,191,0.22)"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <path
        d="M200 32 L240 115 L160 115 Z"
        fill="#d4cfc7"
        fillOpacity="0.08"
      />
      <line x1="125" y1="220" x2="275" y2="220" stroke="rgba(232,230,226,0.1)" strokeWidth="0.7" />
      <line x1="118" y1="380" x2="282" y2="380" stroke="rgba(232,230,226,0.08)" strokeWidth="0.7" />
      <ellipse cx="200" cy="180" rx="24" ry="20" fill="rgba(19,78,74,0.2)" stroke="rgba(45,212,191,0.25)" strokeWidth="1" />
      <rect x="178" y="420" width="44" height="40" rx="5" fill="rgba(19,78,74,0.15)" stroke="rgba(45,212,191,0.2)" strokeWidth="0.8" />
      <path
        d="M95 780 L28 895 L88 835 L100 800 Z"
        fill="currentColor"
        fillOpacity="0.22"
        stroke="rgba(26,24,22,0.35)"
        strokeWidth="1"
      />
      <path
        d="M305 780 L372 895 L312 835 L300 800 Z"
        fill="currentColor"
        fillOpacity="0.22"
        stroke="rgba(26,24,22,0.35)"
        strokeWidth="1"
      />
      <path
        d="M172 888 L200 918 L228 888 L200 902 Z"
        fill="#f59e0b"
        fillOpacity="0.12"
      />
    </svg>
  );
}

/** Small rhombus — title only so clip never fights paragraphs and grids. */
function DiamondTitleBadge({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-[13.5rem] justify-center sm:max-w-[15rem]">
      <div
        className="w-full overflow-hidden bg-[#090807] shadow-[inset_0_0_0_2px_rgba(45,212,191,0.45),0_0_28px_-10px_rgba(13,148,136,0.18)]"
        style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
      >
        <div className="px-[clamp(1.5rem,12vmin,2.75rem)] py-[clamp(2.75rem,14vmin,4rem)]">
          <p className="text-center font-mono text-[0.5rem] font-semibold uppercase leading-snug tracking-[0.16em] text-accent-signal sm:text-[0.5625rem] sm:tracking-[0.18em]">
            {children}
          </p>
        </div>
      </div>
    </div>
  );
}

/** All dense copy lives here — full-width rectangle, predictable reading order. */
function ContentPanel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={[
        "rounded-lg border border-white/[0.1] bg-[#0c0b0a]/90 px-4 py-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-[2px]",
        "sm:px-5 sm:py-7",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function ModeStrip({ mode }: { mode: string }) {
  return (
    <span className="shrink-0 font-mono text-[0.5rem] font-semibold uppercase tracking-[0.18em] text-accent-signal/85">{mode}</span>
  );
}

function PhaseBlock({
  label,
  phaseNote,
  mode,
  children,
}: {
  label: string;
  phaseNote: string;
  mode: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/[0.08] pb-3">
        <div className="min-w-0">
          <h3 className="font-display text-base font-semibold text-white sm:text-lg">{label}</h3>
          <p className="mt-0.5 font-body text-[0.7rem] text-dashboard-ink-muted">{phaseNote}</p>
        </div>
        <ModeStrip mode={mode} />
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

export function AboutDoubleDiamondRocket() {
  const m = aboutPage.operatingModel;
  const d1 = m.diamond1;
  const d2 = m.diamond2;

  return (
    <div className="relative mt-10 sm:mt-12">
      <div className="relative isolate mx-auto max-w-lg sm:max-w-xl">
        <RocketFuselageBackdrop />

        <div className="relative z-10 flex flex-col gap-10 sm:gap-12">
          {/* A — same width as content panel */}
          <div className="rounded-lg border border-white/[0.12] bg-dashboard-card/85 px-4 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[0.55rem] font-bold text-accent-signal">A</span>
              <p className="font-body text-[0.875rem] font-medium leading-snug text-dashboard-ink-light/95">{m.journey.from}</p>
            </div>
          </div>

          {/* Diamond 1 — badge + panel */}
          <div className="flex flex-col gap-5">
            <DiamondTitleBadge>{m.leftDiamondTitle}</DiamondTitleBadge>

            <ContentPanel className="space-y-10">
              <PhaseBlock label={d1.discover.label} phaseNote={d1.discover.phaseNote} mode={d1.discover.mode}>
                <div className="rounded-md border border-white/[0.08] bg-black/30 px-3 py-2.5">
                  <p className="font-mono text-[0.45rem] font-semibold uppercase tracking-[0.12em] text-dashboard-ink-muted">Start with</p>
                  <p className="mt-1.5 font-body text-[0.8125rem] font-semibold leading-snug text-dashboard-ink-light/95">{d1.discover.pillar}</p>
                </div>
                <div>
                  <p className="font-mono text-[0.45rem] font-semibold uppercase tracking-[0.12em] text-dashboard-ink-muted">Then run in parallel</p>
                  <ul className="mt-2.5 space-y-2">
                    {d1.discover.branches.map((line) => (
                      <li
                        key={line}
                        className="border-l-2 border-accent-signal/45 pl-3 font-body text-[0.8125rem] leading-relaxed text-dashboard-ink-light/92"
                      >
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              </PhaseBlock>

              <PhaseBlock label={d1.define.label} phaseNote={d1.define.phaseNote} mode={d1.define.mode}>
                <ul className="space-y-2">
                  {d1.define.steps.map((step) => (
                    <li
                      key={step}
                      className="rounded-md border border-white/[0.06] bg-black/25 px-3 py-2.5 font-body text-[0.8125rem] leading-relaxed text-dashboard-ink-light/88"
                    >
                      {step}
                    </li>
                  ))}
                </ul>
              </PhaseBlock>
            </ContentPanel>
          </div>

          <div className="rounded-lg border border-accent-signal/30 bg-accent-signal/[0.07] px-4 py-4 text-center shadow-[0_0_24px_-12px_rgba(34,211,199,0.18)]">
            <p className="font-mono text-[0.5rem] font-semibold uppercase tracking-[0.16em] text-accent-signal/85">Between diamonds</p>
            <p className="mt-2 font-display text-[0.9375rem] font-semibold leading-snug text-white sm:text-[1rem]">{m.bridge}</p>
          </div>

          {/* Diamond 2 */}
          <div className="flex flex-col gap-5">
            <DiamondTitleBadge>{m.rightDiamondTitle}</DiamondTitleBadge>

            <ContentPanel className="space-y-10">
              <PhaseBlock label={d2.develop.label} phaseNote={d2.develop.phaseNote} mode={d2.develop.mode}>
                <div className="rounded-md border border-white/[0.08] bg-black/30 px-3 py-2.5">
                  <p className="font-mono text-[0.45rem] font-semibold uppercase tracking-[0.12em] text-dashboard-ink-muted">Lead with</p>
                  <p className="mt-1.5 font-body text-[0.8125rem] font-semibold leading-snug text-dashboard-ink-light/95">{d2.develop.pillar}</p>
                </div>
                <ul className="space-y-2">
                  {d2.develop.branches.map((line) => (
                    <li
                      key={line}
                      className="border-l-2 border-accent-signal/45 pl-3 font-body text-[0.8125rem] leading-relaxed text-dashboard-ink-light/92"
                    >
                      {line}
                    </li>
                  ))}
                </ul>
              </PhaseBlock>

              <PhaseBlock label={d2.deliver.label} phaseNote={d2.deliver.phaseNote} mode={d2.deliver.mode}>
                <div className="rounded-md border border-dashed border-accent-signal/28 bg-black/25 px-3 py-3">
                  <div className="flex items-start gap-3">
                    <span
                      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent-signal/35 text-base text-accent-signal"
                      aria-hidden
                    >
                      ↻
                    </span>
                    <p className="font-mono text-[0.65rem] leading-relaxed text-dashboard-ink-muted sm:text-[0.6875rem]">
                      Iteration loop across implementation—prototype, learn, build, release.
                    </p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {d2.deliver.steps.map((step) => (
                    <li
                      key={step}
                      className="rounded-md border border-white/[0.06] bg-black/25 px-3 py-2.5 font-body text-[0.8125rem] leading-relaxed text-dashboard-ink-light/88"
                    >
                      {step}
                    </li>
                  ))}
                </ul>
              </PhaseBlock>
            </ContentPanel>
          </div>

          <div className="rounded-lg border border-white/[0.12] bg-dashboard-card/85 px-4 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[0.55rem] font-bold text-accent-signal">B</span>
              <p className="font-body text-[0.875rem] font-medium leading-snug text-dashboard-ink-light/95">{m.journey.to}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
