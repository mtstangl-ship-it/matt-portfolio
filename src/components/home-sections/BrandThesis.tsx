import { Section } from "@/components/ui/Section";
import { JourneyThesisVisual } from "@/components/visuals";
import { brandThesis } from "@/content/home";
import Image from "next/image";

export function BrandThesis() {
  return (
    <Section className="relative overflow-hidden border-t border-ink-200/50 bg-base py-section">
      <div className="relative z-10 mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1fr,minmax(0,1.2fr)] lg:items-center lg:gap-16">
        <div>
          <h2 className="font-display text-section font-bold text-ink-950">
            {brandThesis.headline}
          </h2>
          <div className="font-body mt-8 space-y-4 text-body font-bold text-ink-900 leading-[1.55] sm:text-body-lg prose-optimal">
            {brandThesis.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="min-h-[180px] w-full max-w-lg lg:min-h-[240px] lg:max-w-none">
          <div className="relative h-full w-full overflow-hidden rounded-lg border border-ink-200/70 bg-support-50">
            {/* Editorial portrait frame (human trust) */}
            <div className="absolute inset-0">
              <Image
                src="/images/portraits/matt-portrait.png"
                alt="Portrait of Matt"
                fill
                className="object-cover object-[50%_20%]"
                sizes="(max-width: 1024px) 100vw, 420px"
                priority
                style={{ filter: "grayscale(15%) contrast(1.06) saturate(0.92)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-base-50/30 via-transparent to-accent-tint/10" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-base-50/55" />
            </div>

            {/* Systems visual stays primary */}
            <div className="relative z-10 flex h-full items-end justify-center p-5">
              <div className="w-full text-ink-400/70">
                <JourneyThesisVisual />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
