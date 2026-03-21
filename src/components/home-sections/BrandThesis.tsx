import { Section } from "@/components/ui/Section";
import { JourneyThesisVisual } from "@/components/visuals";
import { brandThesis } from "@/content/home";
import Image from "next/image";

export function BrandThesis() {
  return (
    <Section className="relative overflow-hidden border-t border-ink-200/50 bg-base py-section">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse at 20% 10%, rgba(34,211,199,0.22), transparent 55%), radial-gradient(ellipse at 80% 0%, rgba(13,148,136,0.16), transparent 50%), linear-gradient(to bottom, rgba(0,0,0,0.04), rgba(0,0,0,0) 45%)",
        }}
      />
      <div className="relative z-10 grid gap-6 sm:gap-10 lg:grid-cols-[1fr,minmax(0,1.2fr)] lg:items-center lg:gap-12">
        <div>
          <h2 className="font-display text-section font-bold text-ink-950">
            {brandThesis.headline}
          </h2>
          <div className="font-body mt-6 space-y-3 text-body font-bold leading-[1.55] text-ink-900 sm:mt-8 sm:space-y-4 sm:text-body-lg prose-optimal">
            {brandThesis.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="min-h-[140px] w-full max-w-xl lg:min-h-[240px] lg:max-w-none">
          <div className="relative h-full w-full overflow-hidden rounded-lg border border-ink-200/70 bg-support-50 p-2 sm:p-4">
            {/* Editorial, separated composition: both panels stay side by side, scaling down on small screens */}
            <div className="grid h-full grid-cols-[1.05fr,0.95fr] gap-2 sm:gap-4 lg:items-stretch">
              <div className="flex min-w-0 items-center justify-center rounded-md border border-ink-200/60 bg-base-50 px-2 py-1.5 sm:px-4 sm:py-3">
                <div className="w-full min-w-0 text-ink-400/70">
                  <JourneyThesisVisual className="h-[90px] sm:h-[130px] lg:h-[170px]" />
                </div>
              </div>

              <div className="relative min-h-[100px] min-w-0 overflow-hidden rounded-md border border-ink-200/60 bg-base-50 shadow-card sm:min-h-[180px] lg:min-h-0">
                <Image
                  src="/images/portraits/matt-portrait.png"
                  alt="Portrait of Matt"
                  fill
                  className="object-cover object-[50%_20%]"
                  sizes="(max-width: 1024px) 100vw, 280px"
                  priority
                  style={{ filter: "grayscale(12%) contrast(1.08) saturate(0.9)" }}
                />
                {/* Subtle tonality only (kept away from the face center) */}
                <div className="absolute inset-0 bg-gradient-to-tr from-base-50/25 via-transparent to-accent-tint/8" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-base-50/55" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
