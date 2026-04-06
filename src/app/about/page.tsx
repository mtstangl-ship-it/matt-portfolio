import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { aboutPage } from "@/content/about";

export const metadata: Metadata = {
  title: "About — Matt Stangl",
  description:
    "Service and experience transformation leader—strategy, systems, storytelling, and measurable business impact.",
};

export default function About() {
  return (
    <div className="min-h-screen bg-base-100">
      <Section className="border-b border-ink-200/40 bg-gradient-to-b from-paper-50 to-base-100 py-12 sm:py-16">
        <div className="max-w-3xl">
          <p className="font-body text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-accent-signal/80">
            About
          </p>
          <h1 className="mt-3 font-display text-[clamp(1.75rem,4vw,2.375rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-ink-950">
            {aboutPage.hero.headline}
          </h1>
          <p className="mt-5 max-w-[46ch] font-body text-[clamp(1rem,2.1vw,1.125rem)] font-normal leading-[1.55] text-ink-700">
            {aboutPage.hero.subhead}
          </p>
        </div>
      </Section>

      <Section className="py-10 sm:py-14">
        <div className="mx-auto max-w-[46rem] space-y-5">
          {aboutPage.intro.map((p) => (
            <p
              key={p.slice(0, 24)}
              className="font-body text-[1.02rem] leading-[1.65] text-ink-800 [text-wrap:pretty]"
            >
              {p}
            </p>
          ))}
        </div>
      </Section>

      <Section className="border-t border-ink-200/35 bg-paper-50/80 py-10 sm:py-14">
        <div className="mx-auto max-w-[46rem]">
          <h2 className="font-display text-[clamp(1.25rem,2.5vw,1.5rem)] font-semibold tracking-[-0.02em] text-ink-950">
            {aboutPage.pillars.title}
          </h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-8">
            {aboutPage.pillars.items.map((item) => (
              <li key={item.title} className="min-w-0">
                <p className="font-body text-[0.9375rem] font-semibold leading-snug text-ink-950">{item.title}</p>
                <p className="mt-1.5 font-body text-[0.9375rem] leading-relaxed text-ink-600">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="py-10 sm:py-14">
        <div className="mx-auto max-w-[46rem]">
          <h2 className="font-display text-[clamp(1.25rem,2.5vw,1.5rem)] font-semibold tracking-[-0.02em] text-ink-950">
            {aboutPage.career.title}
          </h2>
          <div className="mt-6 space-y-5">
            {aboutPage.career.paragraphs.map((p) => (
              <p key={p.slice(0, 20)} className="font-body text-[1.02rem] leading-[1.65] text-ink-800 [text-wrap:pretty]">
                {p}
              </p>
            ))}
          </div>
        </div>
      </Section>

      <Section className="border-t border-ink-200/35 bg-paper-50/80 py-10 sm:py-14">
        <div className="mx-auto max-w-[46rem]">
          <h2 className="font-display text-[clamp(1.2rem,2.2vw,1.4rem)] font-semibold tracking-[-0.02em] text-ink-950">
            {aboutPage.personal.title}
          </h2>
          <p className="mt-4 font-body text-[1.02rem] leading-[1.65] text-ink-700 [text-wrap:pretty]">
            {aboutPage.personal.body}
          </p>
        </div>
      </Section>

      <Section className="border-t border-ink-200/40 py-12 sm:py-16">
        <div className="mx-auto max-w-[46rem] rounded-lg border border-ink-200/50 bg-base-100 px-5 py-6 shadow-card sm:px-8 sm:py-8">
          <h2 className="font-display text-[clamp(1.2rem,2.2vw,1.35rem)] font-semibold tracking-[-0.02em] text-ink-950">
            {aboutPage.closing.title}
          </h2>
          <p className="mt-3 font-body text-[1rem] leading-[1.65] text-ink-700 [text-wrap:pretty]">
            {aboutPage.closing.body}
          </p>
        </div>
      </Section>
    </div>
  );
}
