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
    <Section container={false} className="relative overflow-hidden border-t border-ink-200/50 bg-support py-10">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 20% 0%, rgba(34,211,199,0.30), transparent 55%), radial-gradient(ellipse at 80% 30%, rgba(13,148,136,0.22), transparent 60%), linear-gradient(to bottom, rgba(0,0,0,0.03), rgba(0,0,0,0))",
        }}
      />
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-12 sm:gap-y-10 md:gap-x-16">
        {logoCompanies.map((name) => (
          <div
            key={name}
            className="flex w-full max-w-[12rem] shrink-0 items-center justify-center sm:w-auto sm:max-w-none"
          >
            <CompanyWordmark
              name={name}
              src={logoPaths[name]}
              size="lg"
              className="max-h-11 w-auto max-w-[min(100%,12.5rem)] object-center sm:max-h-10 sm:w-[9.375rem] sm:object-left"
            />
          </div>
        ))}
        {showStanford && (
          <div className="flex w-full max-w-[13rem] shrink-0 items-center justify-center sm:w-auto">
            <Image
              src={stanfordAI.certImage}
              alt="Stanford AI Certified"
              width={132}
              height={132}
              className="h-[3rem] w-auto max-w-full object-contain sm:h-[2.75rem]"
              priority
            />
          </div>
        )}
      </div>
    </Section>
  );
}
