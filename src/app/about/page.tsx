import type { Metadata } from "next";
import {
  AboutMissionColumn,
  AboutStation,
  GalaxyBackground,
  DecorPad,
  DecorGuidance,
  DecorPayload,
  DecorTelemetry,
  DecorOperatorLog,
  IconSatBay,
  IconTelemetryChannel,
} from "@/components/about";
import { aboutPage } from "@/content/about";

export const metadata: Metadata = {
  title: "About — Matt Stangl",
  description:
    "Systems that turn ambiguity into momentum—strategy, service design, adoption, and growth.",
};

/* ----------------------------------------------------------------------------
 * FlightPlan — mission-profile trajectory.
 * Four waypoints along a dashed ascent arc, each with a small icon, timestamp,
 * name, and micro-caption. Reads like a briefing slide.
 * ------------------------------------------------------------------------- */

function WpIconTarget() {
  return (
    <svg viewBox="0 0 20 20" className="h-[18px] w-[18px] text-accent-signal" aria-hidden>
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1" fill="none" vectorEffect="non-scaling-stroke" />
      <circle cx="10" cy="10" r="2" stroke="currentColor" strokeWidth="0.9" fill="none" />
      <line x1="10" y1="1" x2="10" y2="4" stroke="currentColor" strokeWidth="1" />
      <line x1="10" y1="16" x2="10" y2="19" stroke="currentColor" strokeWidth="1" />
      <line x1="1" y1="10" x2="4" y2="10" stroke="currentColor" strokeWidth="1" />
      <line x1="16" y1="10" x2="19" y2="10" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function WpIconGrid() {
  return (
    <svg viewBox="0 0 20 20" className="h-[18px] w-[18px] text-accent-signal" aria-hidden>
      <rect x="3" y="3" width="14" height="14" stroke="currentColor" strokeWidth="1" fill="none" vectorEffect="non-scaling-stroke" />
      <line x1="3" y1="8" x2="17" y2="8" stroke="currentColor" strokeWidth="0.7" />
      <line x1="3" y1="12" x2="17" y2="12" stroke="currentColor" strokeWidth="0.7" />
      <line x1="8" y1="3" x2="8" y2="17" stroke="currentColor" strokeWidth="0.7" />
      <line x1="12" y1="3" x2="12" y2="17" stroke="currentColor" strokeWidth="0.7" />
      <circle cx="10" cy="10" r="1.5" fill="currentColor" />
    </svg>
  );
}

function WpIconLander() {
  return (
    <svg viewBox="0 0 22 18" className="h-[18px] w-[22px] text-accent-signal" aria-hidden>
      <path d="M7 3 L15 3 L18 9 L4 9 Z" stroke="currentColor" strokeWidth="1" fill="none" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      <line x1="5" y1="9" x2="2" y2="16" stroke="currentColor" strokeWidth="0.9" />
      <line x1="9" y1="9" x2="8" y2="16" stroke="currentColor" strokeWidth="0.9" />
      <line x1="13" y1="9" x2="14" y2="16" stroke="currentColor" strokeWidth="0.9" />
      <line x1="17" y1="9" x2="20" y2="16" stroke="currentColor" strokeWidth="0.9" />
      <line x1="1" y1="16" x2="21" y2="16" stroke="currentColor" strokeWidth="0.7" strokeDasharray="1.5 2" />
    </svg>
  );
}

function WpIconAscend() {
  return (
    <svg viewBox="0 0 20 20" className="h-[18px] w-[18px] text-accent-signal" aria-hidden>
      <path d="M 2 17 Q 8 9 17 3" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="2 2" vectorEffect="non-scaling-stroke" />
      <polygon points="17,3 12,3 16,7" stroke="currentColor" strokeWidth="1" fill="none" strokeLinejoin="round" />
      <circle cx="2" cy="17" r="1.5" fill="currentColor" />
    </svg>
  );
}

const FLIGHT_WAYPOINTS = [
  { t: "T-90", name: "Strategy", note: "Plot the target", Icon: WpIconTarget },
  { t: "T-30", name: "Systems", note: "Build the spine", Icon: WpIconGrid },
  { t: "T+10", name: "Adoption", note: "Land in workflows", Icon: WpIconLander },
  { t: "T+90", name: "Growth", note: "Extend orbit", Icon: WpIconAscend },
];

function FlightPlan() {
  return (
    <div>
      <div className="flex items-baseline gap-3">
        <p className="font-mono text-[0.5rem] uppercase tracking-[0.28em] text-accent-signal/80">
          Flight plan · Mission profile
        </p>
        <span className="h-px flex-1 bg-accent-signal/25" aria-hidden />
        <p className="font-mono text-[0.5rem] uppercase tracking-[0.22em] text-dashboard-ink-muted/80">
          Ascent trajectory
        </p>
      </div>

      <div className="relative mt-8 pt-4">
        {/* Dashed ascent arc — decorative, above the rail */}
        <svg
          aria-hidden
          className="absolute inset-x-0 top-0 hidden h-12 w-full sm:block"
          viewBox="0 0 800 48"
          preserveAspectRatio="none"
        >
          <path
            d="M 20 42 Q 220 -6 420 20 T 780 32"
            stroke="rgba(34,211,199,0.5)"
            strokeWidth="1"
            strokeDasharray="3 5"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
          {/* small rocket tip at arc end */}
          <polygon
            points="780,32 772,28 772,36"
            fill="rgba(34,211,199,0.85)"
          />
        </svg>

        {/* Horizontal rail through waypoints */}
        <div className="relative">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-[13px] h-px bg-gradient-to-r from-transparent via-accent-signal/45 to-transparent"
          />
          <div className="relative grid grid-cols-2 gap-y-10 sm:grid-cols-4 sm:gap-y-0">
            {FLIGHT_WAYPOINTS.map((wp) => (
              <div key={wp.name} className="flex flex-col items-center text-center">
                {/* Node marker */}
                <span
                  aria-hidden
                  className="relative h-[26px] w-[26px] shrink-0 rounded-full border border-accent-signal/70 bg-dashboard-bg"
                  style={{ boxShadow: "0 0 14px rgba(34,211,199,0.35)" }}
                >
                  <span className="absolute inset-0 flex items-center justify-center">
                    <wp.Icon />
                  </span>
                </span>

                {/* Timestamp */}
                <span className="mt-4 font-mono text-[0.55rem] font-semibold tracking-[0.26em] text-accent-signal">
                  {wp.t}
                </span>

                {/* Name */}
                <span className="mt-2 font-display text-[0.9375rem] font-semibold uppercase tracking-[0.08em] text-white">
                  {wp.name}
                </span>

                {/* Note */}
                <span className="mt-1 font-mono text-[0.55rem] uppercase tracking-[0.22em] text-dashboard-ink-muted">
                  {wp.note}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  const {
    howIThink,
    operatingModel,
    evenOver,
    whatIDo,
    presence,
    career,
    personal,
    hero,
  } = aboutPage;

  return (
    <div className="relative min-h-screen text-dashboard-ink-light">
      <GalaxyBackground />

      {/* 00 · Launch pad — priming beliefs + flight plan */}
      <AboutStation
        code="00"
        kicker="Launch pad"
        title={hero.headline}
        subtitle={hero.subhead}
        decor={<DecorPad />}
      >
        <div className="space-y-16 sm:space-y-20">
          {/* Pre-flight beliefs — spacious 2x2 grid */}
          <div>
            <p className="font-mono text-[0.5rem] uppercase tracking-[0.28em] text-accent-signal/80">
              Pre-flight beliefs
            </p>
            <ul className="mt-6 grid gap-px bg-white/[0.06] sm:grid-cols-2">
              {howIThink.statements.map((line, i) => (
                <li
                  key={line}
                  className="relative bg-dashboard-card/50 px-5 py-7 backdrop-blur-[2px] sm:px-7 sm:py-10"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[0.9rem] font-semibold tracking-[0.18em] text-accent-signal">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px flex-1 bg-accent-signal/25" aria-hidden />
                  </div>
                  <p className="mt-4 font-display text-[1rem] font-medium leading-[1.45] tracking-[-0.01em] text-white sm:text-[1.0625rem]">
                    {line}
                  </p>
                  <span
                    aria-hidden
                    className="absolute left-5 top-5 h-1.5 w-1.5 border-l border-t border-accent-signal/60 sm:left-7 sm:top-7"
                    style={{ transform: "translate(-6px, -6px)" }}
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* Flight plan — mission profile trajectory */}
          <FlightPlan />
        </div>
      </AboutStation>

      {/* 01 · Launch system — the operating model */}
      <AboutStation
        code="01"
        kicker="Launch system"
        title={operatingModel.title}
        subtitle={operatingModel.intro}
        tone="surface"
        bleed
      >
        <AboutMissionColumn />
      </AboutStation>

      {/* 02 · Guidance laws — decision principles + red lines */}
      <AboutStation
        code="02"
        kicker="Guidance laws"
        title={evenOver.title}
        subtitle={evenOver.subtitle}
        decor={<DecorGuidance />}
      >
        <ul className="space-y-3">
          {evenOver.items.map((item) => (
            <li
              key={item.emphasis}
              className="border border-white/[0.07] bg-dashboard-card/65 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-[2px] sm:px-5"
            >
              <p className="font-display text-[0.9375rem] font-semibold text-white">
                <span className="text-accent-signal">{item.emphasis}</span>{" "}
                <span className="font-normal text-dashboard-ink-light/95">{item.rest}</span>
              </p>
              <p className="mt-2 border-t border-white/[0.06] pt-3 font-body text-[0.8125rem] leading-relaxed text-dashboard-ink-muted">
                {item.example}
              </p>
            </li>
          ))}
        </ul>
      </AboutStation>

      {/* 03 · Payload — what the system ships */}
      <AboutStation
        code="03"
        kicker="Payload"
        title={whatIDo.title}
        subtitle="The outcomes this system is built to launch."
        tone="muted"
        decor={<DecorPayload />}
      >
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {whatIDo.cards.map((c, i) => (
            <div
              key={c.title}
              className="relative border border-accent-signal/15 bg-dashboard-card/80 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-[2px]"
            >
              <div className="flex items-center gap-2">
                <IconSatBay />
                <span className="font-mono text-[0.55rem] font-semibold tracking-[0.22em] text-accent-signal/75">
                  BAY {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-3 font-body text-[0.8125rem] font-semibold leading-snug text-accent-signal/95">
                {c.title}
              </p>
              <p className="mt-2 font-body text-[0.8125rem] leading-relaxed text-dashboard-ink-muted">
                {c.body}
              </p>
              {/* Corner ticks */}
              <span aria-hidden className="absolute left-0 top-0 h-1.5 w-1.5 border-l border-t border-accent-signal/50" />
              <span aria-hidden className="absolute right-0 bottom-0 h-1.5 w-1.5 border-r border-b border-accent-signal/50" />
            </div>
          ))}
        </div>
      </AboutStation>

      {/* 04 · Telemetry — signals from working together */}
      <AboutStation
        code="04"
        kicker="Telemetry"
        title={presence.title}
        subtitle={presence.intro}
        tone="surface"
        decor={<DecorTelemetry />}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5">
          {presence.items.map((item, i) => (
            <div
              key={item.title}
              className="relative border border-accent-signal/12 bg-dashboard-card/75 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-[2px]"
            >
              <div className="flex items-center gap-2">
                <IconTelemetryChannel />
                <span className="font-mono text-[0.55rem] font-semibold tracking-[0.22em] text-accent-signal/75">
                  CH {String(i + 1).padStart(2, "0")}
                </span>
                <span className="ml-auto flex items-center gap-1 font-mono text-[0.55rem] tracking-[0.2em] text-accent-signal/70">
                  <span
                    className="h-1 w-1 rounded-full bg-accent-signal"
                    style={{ boxShadow: "0 0 6px rgba(34,211,199,0.8)" }}
                  />
                  LIVE
                </span>
              </div>
              <p className="mt-3 font-body text-[0.8125rem] font-semibold text-accent-signal/95">
                {item.title}
              </p>
              <p className="mt-2 font-body text-[0.8125rem] leading-relaxed text-dashboard-ink-muted">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </AboutStation>

      {/* 05 · Operator log — career arc + personal note */}
      <AboutStation
        code="05"
        kicker="Operator log"
        title={career.title}
        decor={<DecorOperatorLog />}
        last
      >
        <div className="space-y-5">
          {career.paragraphs.map((p) => (
            <p
              key={p.slice(0, 28)}
              className="font-body text-[0.9375rem] leading-[1.65] text-dashboard-ink-light/88"
            >
              {p}
            </p>
          ))}
        </div>
        <div className="mt-12 border-t border-white/[0.07] pt-10">
          <p className="font-mono text-[0.5rem] uppercase tracking-[0.24em] text-accent-signal/80">
            {personal.title} · Off-shift
          </p>
          <div className="mt-4 space-y-3 font-body text-[0.9375rem] leading-[1.6] text-dashboard-ink-muted">
            {personal.sentences.map((s) => (
              <p key={s}>{s}</p>
            ))}
          </div>
        </div>
      </AboutStation>
    </div>
  );
}
