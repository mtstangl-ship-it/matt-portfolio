import { Section } from "@/components/ui/Section";
import { JourneyThesisVisual } from "@/components/visuals";
import { brandThesis } from "@/content/home";

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
        <div className="min-h-[140px] w-full max-w-lg text-ink-400/70 lg:min-h-[180px] lg:max-w-none">
          <JourneyThesisVisual />
        </div>
      </div>
    </Section>
  );
}
