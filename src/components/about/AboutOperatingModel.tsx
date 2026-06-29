import { aboutPage } from "@/content/about";
import { AboutDoubleDiamondRocket } from "./AboutDoubleDiamondRocket";

export function AboutOperatingModel() {
  const { operatingModel: m } = aboutPage;

  return (
    <section className="border-b border-white/[0.06] bg-dashboard-muted/15 px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className=" text-[clamp(1.15rem,2.5vw,1.45rem)] font-semibold tracking-[-0.02em] text-white">
          {m.title}
        </h2>
        <p className="mt-3 max-w-3xl  text-[0.9375rem] leading-relaxed text-dashboard-ink-muted">{m.intro}</p>

        <AboutDoubleDiamondRocket />
      </div>
    </section>
  );
}
