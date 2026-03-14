import { Section } from "@/components/ui/Section";
import { CompanyWordmark } from "@/components/ui/CompanyWordmark";
import { logoPaths } from "@/content/logos";
import { hero } from "@/content/home";

const logoCompanies = hero.proofStrip.filter(
  (item) => item !== "Stanford AI Certified"
) as (keyof typeof logoPaths)[];
const showStanford = hero.proofStrip.includes("Stanford AI Certified");

export function CredibilityRail() {
  return (
    <Section className="border-t border-ink-300/80 bg-paper-50/60 py-8">
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-12">
        {logoCompanies.map((name) => (
          <CompanyWordmark
            key={name}
            name={name}
            src={logoPaths[name]}
            size="md"
          />
        ))}
        {showStanford && (
          <span className="font-body text-metric-sm font-semibold uppercase tracking-widest text-ink-500">
            Stanford AI Certified
          </span>
        )}
      </div>
    </Section>
  );
}
