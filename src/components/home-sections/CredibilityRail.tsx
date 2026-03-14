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
    <Section className="border-t-2 border-accent/20 bg-gradient-to-r from-ink-100 via-accent-muted/30 to-ink-100 py-10">
      <div className="flex flex-wrap items-center justify-center gap-x-14 gap-y-8 sm:gap-x-16">
        {logoCompanies.map((name) => (
          <CompanyWordmark
            key={name}
            name={name}
            src={logoPaths[name]}
            size="lg"
          />
        ))}
        {showStanford && (
          <span className="font-body text-metric-sm font-bold uppercase tracking-widest text-ink-600">
            Stanford AI Certified
          </span>
        )}
      </div>
    </Section>
  );
}
