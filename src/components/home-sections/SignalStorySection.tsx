"use client";

import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { signalStoryCopy } from "@/content/signal-story";
import { SignalStoryVisualGrid } from "./SignalStoryVisualGrid";

export function SignalStorySection() {
  return (
    <section className="relative overflow-hidden border-t border-ink-200/40 bg-[#070605] py-section">
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
          <p className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.2em] text-accent/90">
            {signalStoryCopy.title}
          </p>
          <p className="font-body mt-4 text-[1.0625rem] font-semibold leading-relaxed text-[rgba(232,230,226,0.92)] md:text-[1.125rem]">
            {signalStoryCopy.intro}
          </p>
        </div>
        <p className="mt-6 font-mono text-[0.5rem] font-medium uppercase tracking-[0.14em] text-[rgba(180,176,170,0.55)]">
          <Link href="/signal-story" className="text-accent/80 underline-offset-4 transition-colors hover:text-accent">
            Full arc
          </Link>
          <span className="text-[rgba(180,176,170,0.45)]"> · curated work</span>
        </p>

        <div className="mt-10">
          <SignalStoryVisualGrid />
        </div>
      </Section>
    </section>
  );
}
