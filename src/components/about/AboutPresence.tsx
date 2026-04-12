import { aboutPage } from "@/content/about";

export function AboutPresence() {
  const { presence } = aboutPage;

  return (
    <section className="border-b border-white/[0.06] bg-dashboard-muted/20 px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display text-[clamp(1.15rem,2.5vw,1.45rem)] font-semibold tracking-[-0.02em] text-white">
          {presence.title}
        </h2>
        <p className="mt-3 max-w-2xl font-body text-[0.9375rem] leading-relaxed text-dashboard-ink-muted">{presence.intro}</p>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5">
          {presence.items.map((item) => (
            <div
              key={item.title}
              className="rounded-md border border-accent-signal/12 bg-dashboard-card/85 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
            >
              <p className="font-body text-[0.8125rem] font-semibold text-accent-signal/95">{item.title}</p>
              <p className="mt-2 font-body text-[0.8125rem] leading-relaxed text-dashboard-ink-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
