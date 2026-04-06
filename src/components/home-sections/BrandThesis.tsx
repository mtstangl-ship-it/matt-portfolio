import { Section } from "@/components/ui/Section";
import { JourneyThesisVisual } from "@/components/visuals";
import { brandThesis } from "@/content/home";
import Image from "next/image";

export function BrandThesis() {
  return (
    <Section className="relative overflow-hidden border-t border-ink-200/55 bg-base-100 py-section">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 15% 5%, rgba(34,211,199,0.12), transparent 50%), radial-gradient(ellipse 60% 50% at 88% 8%, rgba(13,148,136,0.08), transparent 48%), linear-gradient(to bottom, rgba(0,0,0,0.02), transparent 30%, transparent 70%, rgba(26,24,22,0.02) 100%)",
        }}
      />
      <div className="relative z-10 grid gap-8 sm:gap-10 lg:grid-cols-[1fr,minmax(0,1.2fr)] lg:items-center lg:gap-12">
        <div className="min-w-0 max-w-lg">
          <h2 className="font-display text-section font-bold text-ink-950">
            {brandThesis.headline}
          </h2>
          <div className="font-body mt-4 space-y-3 text-subhead font-bold leading-[1.5] text-ink-900 sm:mt-6 sm:space-y-4 sm:text-body-lg sm:leading-[1.55] prose-optimal">
            {brandThesis.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="min-h-[180px] w-full max-w-xl sm:min-h-[160px] lg:min-h-[240px] lg:max-w-none">
          <div className="relative h-full w-full overflow-hidden rounded-lg border border-ink-200/60 bg-paper-100 shadow-card-elevated p-4">
            {/* Stack on mobile for better composition; side-by-side from sm up */}
            <div className="grid h-full grid-cols-1 gap-4 sm:grid-cols-[1.05fr,0.95fr] lg:items-stretch">
              <div className="flex min-h-[100px] min-w-0 items-center justify-center rounded-lg border border-ink-200/50 bg-paper-50 px-4 py-3 sm:min-h-0">
                <div className="w-full min-w-0 text-ink-400/70">
                  <JourneyThesisVisual className="h-[100px] sm:h-[130px] lg:h-[170px]" />
                </div>
              </div>

              <div className="relative min-w-0 overflow-hidden rounded-lg border border-ink-200/50 bg-paper-50 shadow-card">
                <Image
                  src="/images/portraits/matt-portrait.png"
                  alt="Portrait of Matt"
                  width={1024}
                  height={1024}
                  className="h-auto w-full max-h-[min(52vh,380px)] object-cover object-[50%_20%] sm:max-h-[400px] lg:max-h-[360px]"
                  sizes="(max-width: 640px) min(100vw - 3rem, 36rem), (max-width: 1024px) min(45vw, 24rem), min(360px, 28vw)"
                  style={{ filter: "grayscale(12%) contrast(1.08) saturate(0.9)" }}
                />
                {/* Subtle tonality — depth and editorial warmth */}
                <div className="absolute inset-0 bg-gradient-to-tr from-paper-50/30 via-transparent to-accent-tint/10" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-paper-100/60" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
