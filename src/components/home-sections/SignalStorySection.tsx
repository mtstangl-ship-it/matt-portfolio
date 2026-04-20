"use client";

import Link from "next/link";
import { Eyebrow, Section, SiteGrid } from "@/components/ui";
import { signalStoryCopy, signalStoryHomeVideos } from "@/content/signal-story";
import { YouTubeInline } from "./YouTubeInline";

export function SignalStorySection() {
  const [caronHero, healthHero, ...rest] = signalStoryHomeVideos;
  const [a, b] = rest;

  return (
    <section className="relative overflow-hidden border-t border-ink-200/40 bg-[#070605] py-section">
      <SiteGrid tone="dark" opacity={0.5} />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 90% 50% at 50% -10%, rgba(34,211,199,0.09), transparent 55%), radial-gradient(ellipse 60% 40% at 100% 100%, rgba(13,148,136,0.06), transparent 45%)",
        }}
      />
      <Section className="relative z-10">
        <div className="max-w-3xl">
          <Eyebrow tone="signal" className="tracking-[0.25em]">
            {signalStoryCopy.title}
          </Eyebrow>
          <p className="mt-4 text-[1.0625rem] font-semibold leading-relaxed text-[rgba(232,230,226,0.92)] md:text-[1.125rem]">
            {signalStoryCopy.homeTeaser}
          </p>
        </div>
        <p className="mt-6">
          <Link
            href="/signal-story"
            className="font-mono text-eyebrow font-semibold uppercase tracking-[0.25em] text-accent-signal/85 transition-colors hover:text-accent-signal"
          >
            Open the archive →
          </Link>
        </p>

        <div className="mt-10 flex flex-col gap-6 md:gap-8">
          {/* Two featured hero pieces, stacked — same large frame as the original single lead */}
          <div className="flex flex-col gap-8 md:gap-10">
            <YouTubeInline
              youtubeId={caronHero.youtubeId}
              title={caronHero.title}
              label={caronHero.label}
              variant="hero"
              previewStartSeconds={caronHero.previewStartSeconds}
              previewDurationSeconds={caronHero.previewDurationSeconds}
            />
            <YouTubeInline
              youtubeId={healthHero.youtubeId}
              title={healthHero.title}
              label={healthHero.label}
              variant="hero"
              previewStartSeconds={healthHero.previewStartSeconds}
              previewDurationSeconds={healthHero.previewDurationSeconds}
            />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-6 lg:gap-8">
            {a ? (
              <YouTubeInline
                youtubeId={a.youtubeId}
                title={a.title}
                label={a.label}
                variant="default"
                previewStartSeconds={a.previewStartSeconds}
                previewDurationSeconds={a.previewDurationSeconds}
              />
            ) : null}
            {b ? (
              <YouTubeInline
                youtubeId={b.youtubeId}
                title={b.title}
                label={b.label}
                variant="default"
                previewStartSeconds={b.previewStartSeconds}
                previewDurationSeconds={b.previewDurationSeconds}
              />
            ) : null}
          </div>
        </div>
      </Section>
    </section>
  );
}
