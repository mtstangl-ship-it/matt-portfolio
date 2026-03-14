import { Section } from "@/components/ui/Section";
import { brandThesis } from "@/content/home";

export function BrandThesis() {
  return (
    <Section className="border-t border-ink-200 bg-paper-100/60 py-section">
      <div className="mx-auto max-w-2xl prose-optimal">
        <h2 className="font-display text-section font-semibold tracking-tight text-ink-950">
          {brandThesis.headline}
        </h2>
        <div className="font-body mt-12 space-y-10 text-body text-ink-700 sm:text-body-lg">
          {brandThesis.body.map((paragraph, i) => (
            <p key={i} className="leading-[1.75]">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </Section>
  );
}
