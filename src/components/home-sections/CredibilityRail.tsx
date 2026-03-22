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
    <Section
      className="relative overflow-hidden border-t border-ink-200/50 bg-support-100 py-6 sm:py-7"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "linear-gradient(to bottom, rgba(26,24,22,0.025), transparent 35%), radial-gradient(ellipse 80% 50% at 50% 0%, rgba(13,148,136,0.06), transparent 50%)",
        }}
      />
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-5 sm:gap-x-12 sm:gap-y-6 md:gap-x-14">
        {logoCompanies.map((name) => (
          <div
            key={name}
            className="flex shrink-0 items-center justify-center opacity-90 transition-opacity duration-200 hover:opacity-100"
          >
            <CompanyWordmark
              name={name}
              src={logoPaths[name]}
              size="md"
              className="h-7 w-auto max-w-[6.5rem] object-contain sm:h-7 sm:max-w-[7rem]"
            />
          </div>
        ))}
        {showStanford && (
          <div className="flex shrink-0 items-center justify-center opacity-90 transition-opacity duration-200 hover:opacity-100">
            <Image
              src={stanfordAI.certImage}
              alt="Stanford AI Certified"
              width={132}
              height={132}
              className="h-5 w-auto object-contain sm:h-5"
              priority
            />
          </div>
        )}
      </div>
    </Section>
  );
}
