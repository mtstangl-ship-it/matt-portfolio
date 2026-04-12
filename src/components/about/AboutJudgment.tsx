import { aboutPage } from "@/content/about";

export function AboutJudgment() {
  const { evenOver, nonNegotiables } = aboutPage;

  return (
    <section className="border-b border-white/[0.06] px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display text-[clamp(1.15rem,2.5vw,1.45rem)] font-semibold tracking-[-0.02em] text-white">
          {evenOver.title}
        </h2>
        <p className="mt-2 max-w-2xl font-body text-[0.9375rem] text-dashboard-ink-muted">{evenOver.subtitle}</p>

        <ul className="mt-10 space-y-4">
          {evenOver.items.map((item) => (
            <li
              key={item.emphasis}
              className="rounded-md border border-white/[0.07] bg-dashboard-card/70 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] sm:px-5 sm:py-4"
            >
              <p className="font-display text-[0.9375rem] font-semibold text-white">
                <span className="text-accent-signal">{item.emphasis}</span>{" "}
                <span className="font-normal text-dashboard-ink-light/95">{item.rest}</span>
              </p>
              <p className="mt-2 border-t border-white/[0.06] pt-3 font-body text-[0.8125rem] leading-relaxed text-dashboard-ink-muted">
                {item.example}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-12 border-t border-white/[0.07] pt-10">
          <h3 className="font-display text-[clamp(1.05rem,2vw,1.2rem)] font-semibold tracking-[-0.02em] text-white">
            {nonNegotiables.title}
          </h3>
          <p className="mt-2 font-body text-[0.875rem] text-dashboard-ink-muted">{nonNegotiables.intro}</p>
          <ul className="mt-6 space-y-3">
            {nonNegotiables.lines.map((line) => (
              <li key={line} className="flex items-start gap-3 font-body text-[0.8125rem] leading-relaxed text-dashboard-ink-light/88">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-signal/70" aria-hidden />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
