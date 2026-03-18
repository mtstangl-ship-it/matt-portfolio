import { Section } from "@/components/ui/Section";
import { CompanyWordmark } from "@/components/ui/CompanyWordmark";
import Image from "next/image";
import { logoPaths } from "@/content/logos";
import { hero, stanfordAI } from "@/content/home";

const logoCompanies = hero.proofStrip.filter(
  (item) => item !== "Stanford AI Certified"
) as (keyof typeof logoPaths)[];
const showStanford = hero.proofStrip.includes("Stanford AI Certified");

export function CredibilityRail() {
  return (
    <Section container={false} className="border-t border-ink-200/50 bg-support py-10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-14 gap-y-8 px-6 sm:gap-x-16">
        {logoCompanies.map((name) => (
          <CompanyWordmark
            key={name}
            name={name}
            src={logoPaths[name]}
            size="lg"
          />
        ))}
        {showStanford && (
          <div className="flex h-[2.75rem] w-[9.375rem] items-center justify-center">
            <Image
              src={stanfordAI.certImage}
              alt="Stanford AI Certified"
              width={120}
              height={120}
              className="h-[2.75rem] w-auto object-contain"
              priority
            />
          </div>
        )}
      </div>
    </Section>
  );
}
