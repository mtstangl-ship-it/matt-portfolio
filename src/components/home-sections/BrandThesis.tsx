import { Section } from "@/components/ui/Section";
import { brandThesis } from "@/content/home";

export function BrandThesis() {
  return (
    <Section className="border-t border-ink-300 bg-paper-200/80 py-section">
      <div className="mx-auto max-w-2xl prose-optimal">
        <h2 className="font-display text-section font-bold text-ink-950">
          {brandThesis.headline}
        </h2>
        <div className="font-body mt-8 space-y-4 text-body font-bold text-ink-900 leading-[1.55] sm:text-body-lg">
          {brandThesis.body.map((paragraph, i) => (
            <p key={i}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </Section>
  );
}
