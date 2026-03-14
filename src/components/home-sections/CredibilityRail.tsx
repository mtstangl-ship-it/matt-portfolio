import { Section } from "@/components/ui/Section";
import { CompanyWordmark } from "@/components/ui/CompanyWordmark";
import { logoPaths } from "@/content/logos";
import { hero } from "@/content/home";

export function CredibilityRail() {
  const items = hero.proofStrip.filter((item) => item !== "Stanford AI Certified");
  const stanford = hero.proofStrip.includes("Stanford AI Certified");

  return (
    <Section className="border-t border-ink-200/80 py-10">
      <div className="flex flex-col flex-wrap items-center justify-center gap-12 sm:flex-row sm:gap-x-16 sm:gap-y-8">
        {items.map((name) => (
          <CompanyWordmark
            key={name}
            name={name}
            src={logoPaths[name]}
            size="md"
            className="transition-opacity hover:opacity-90"
          />
        ))}
        {stanford && (
          <span className="font-body text-metric-sm font-medium uppercase tracking-[0.1em] text-ink-400">
            Stanford AI Certified
          </span>
        )}
      </div>
    </Section>
  );
}
