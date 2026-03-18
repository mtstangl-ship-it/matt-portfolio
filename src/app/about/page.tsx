import { PageContainer } from "@/components/layout";
import { HumanPortraitMotif } from "@/components/visuals";

export default function About() {
  return (
    <PageContainer className="relative overflow-hidden">
      <div className="pointer-events-none absolute -right-10 top-0 h-48 w-48 opacity-[0.06]">
        <HumanPortraitMotif />
      </div>
      <div className="relative z-10">
        <h1 className="text-3xl font-semibold">About</h1>
        <p className="mt-4 text-neutral-600">Background and experience.</p>
      </div>
    </PageContainer>
  );
}
