import type { Metadata } from "next";
import { aboutPage } from "@/content/about";

export const metadata: Metadata = {
  title: "About — Matt Stangl",
  description:
    "Systems that turn ambiguity into momentum—strategy, service design, adoption, and growth.",
};

export default function About() {
  return (
    <div className="min-h-screen bg-dashboard-bg text-dashboard-ink-light">
      {/* 1. Hero */}
      <section className="border-b border-white/[0.06] px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="font-body text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-accent-signal/85">
            About
          </p>
          <h1 className="mt-4 font-display text-[clamp(1.65rem,4.5vw,2.5rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-white">
            {aboutPage.hero.headline}
          </h1>
          <p className="mt-5 max-w-[40ch] font-body text-[clamp(0.9375rem,2vw,1.0625rem)] font-normal leading-[1.55] text-dashboard-ink-muted">
            {aboutPage.hero.subhead}
          </p>
        </div>
      </section>

      {/* 2. Visual strip */}
      <section className="border-b border-white/[0.06] bg-dashboard-muted/40 px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {aboutPage.visualStrip.flow.map((label, i) => (
              <span key={label} className="flex items-center gap-2 sm:gap-3">
                <span className="rounded-full border border-accent-signal/35 bg-dashboard-card/80 px-3 py-1.5 font-mono text-[0.5625rem] font-semibold uppercase tracking-[0.12em] text-accent-signal/95">
                  {label}
                </span>
                {i < aboutPage.visualStrip.flow.length - 1 ? (
                  <span className="text-[0.65rem] font-medium text-dashboard-ink-muted/60" aria-hidden>
                    →
                  </span>
                ) : null}
              </span>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {aboutPage.visualStrip.pills.map((p) => (
              <span
                key={p}
                className="rounded-md border border-white/[0.08] bg-dashboard-surface/60 px-2.5 py-1 font-mono text-[0.5rem] font-semibold uppercase tracking-[0.14em] text-dashboard-ink-light/75"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 3. How I think */}
      <section className="px-4 py-12 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display text-[clamp(1.15rem,2.5vw,1.35rem)] font-semibold tracking-[-0.02em] text-white">
            {aboutPage.howIThink.title}
          </h2>
          <ul className="mt-8 space-y-0 divide-y divide-white/[0.07] border-y border-white/[0.07]">
            {aboutPage.howIThink.statements.map((line) => (
              <li
                key={line}
                className="py-4 font-body text-[0.9375rem] font-medium leading-snug text-dashboard-ink-light/92 first:pt-4 last:pb-4"
              >
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. What I do — cards */}
      <section className="border-t border-white/[0.06] bg-dashboard-muted/25 px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-[clamp(1.15rem,2.5vw,1.35rem)] font-semibold tracking-[-0.02em] text-white">
            {aboutPage.whatIDo.title}
          </h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {aboutPage.whatIDo.cards.map((c) => (
              <div
                key={c.title}
                className="rounded-md border border-accent-signal/15 bg-dashboard-card/90 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
              >
                <p className="font-body text-[0.8125rem] font-semibold leading-snug text-accent-signal/95">{c.title}</p>
                <p className="mt-2 font-body text-[0.8125rem] leading-relaxed text-dashboard-ink-muted">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Select signals */}
      <section className="border-t border-white/[0.06] px-4 py-12 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-[clamp(1.15rem,2.5vw,1.35rem)] font-semibold tracking-[-0.02em] text-white">
            {aboutPage.signals.title}
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {aboutPage.signals.tiles.map((t) => (
              <div
                key={t.value}
                className="rounded-md border border-white/[0.08] bg-gradient-to-br from-dashboard-card to-dashboard-muted/80 px-3 py-4"
              >
                <p className="font-mono text-[clamp(1.25rem,3vw,1.65rem)] font-bold tabular-nums tracking-[-0.03em] text-white">
                  {t.value}
                </p>
                <p className="mt-2 font-body text-[0.6875rem] font-medium leading-snug text-dashboard-ink-muted">{t.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Career arc */}
      <section className="border-t border-white/[0.06] bg-dashboard-muted/20 px-4 py-12 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-2xl space-y-5">
          <h2 className="font-display text-[clamp(1.15rem,2.5vw,1.35rem)] font-semibold tracking-[-0.02em] text-white">
            {aboutPage.career.title}
          </h2>
          {aboutPage.career.paragraphs.map((p) => (
            <p key={p.slice(0, 28)} className="font-body text-[0.9375rem] leading-[1.65] text-dashboard-ink-light/88">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* 7. Personal note */}
      <section className="border-t border-white/[0.06] px-4 py-12 sm:px-6 sm:pb-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display text-[clamp(1.05rem,2vw,1.2rem)] font-semibold tracking-[-0.02em] text-white">
            {aboutPage.personal.title}
          </h2>
          <div className="mt-5 space-y-3 font-body text-[0.9375rem] leading-[1.6] text-dashboard-ink-muted">
            {aboutPage.personal.sentences.map((s) => (
              <p key={s}>{s}</p>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
