/**
 * Imperative runtime ported from v2 prototype scripts (ledger.js, counters.js,
 * nav.js crosshair observer). Keeps timing constants verbatim where applicable.
 */

const LEDGER_HOLD_MS = 3500; // scripts/ledger.js — v2 pair hold (not legacy CSS --pair-hold)

function fmt(value: number, decimals: number): string {
  if (decimals > 0) return value.toFixed(decimals);
  return Math.round(value).toLocaleString();
}

function finalizeKpi(kpi: HTMLElement): void {
  const target = parseFloat(kpi.dataset.target ?? "NaN");
  const decimals = parseInt(kpi.dataset.decimals ?? "0", 10);
  const prefix = kpi.dataset.prefix ?? "";
  const suffix = kpi.dataset.suffix ?? "";
  const text = kpi.dataset.text;
  const valEl = kpi.querySelector<HTMLElement>(".kpi__val");
  const sufEl = kpi.querySelector<HTMLElement>(".kpi__suffix");
  if (!valEl) return;
  kpi.dataset.fired = "1";
  kpi.classList.add("is-firing");
  if (text) {
    valEl.textContent = text;
    return;
  }
  if (!Number.isFinite(target)) return;
  valEl.textContent = `${prefix}${fmt(target, decimals)}`;
  if (sufEl && !sufEl.textContent) sufEl.textContent = suffix;
}

export function attachLedger(root: HTMLElement): () => void {
  const solved = root.querySelector<HTMLOListElement>("#ledger-solved");
  const intent = root.querySelector<HTMLOListElement>("#ledger-intent");
  const counterEl = root.querySelector<HTMLElement>("#pair-current");
  const progressEl = root.querySelector<HTMLElement>("#ledger-progress");
  const section = root.querySelector<HTMLElement>("#ledger");
  if (!solved || !intent || !section) return () => {};

  const solvedEl = solved;
  const intentEl = intent;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) {
    Array.from(solvedEl.children).forEach((el, idx) =>
      el.classList.toggle("is-active", idx === 0)
    );
    Array.from(intentEl.children).forEach((el, idx) =>
      el.classList.toggle("is-active", idx === 0)
    );
    if (counterEl) counterEl.textContent = "01";
    return () => {};
  }

  const total = solvedEl.children.length;
  let i = 0;
  let timer: ReturnType<typeof setInterval> | null = null;
  let paused = false;

  function showPairIdx(n: number) {
    Array.from(solvedEl.children).forEach((el, idx) =>
      el.classList.toggle("is-active", idx === n)
    );
    Array.from(intentEl.children).forEach((el, idx) =>
      el.classList.toggle("is-active", idx === n)
    );
    if (counterEl) {
      counterEl.textContent = String(n + 1).padStart(2, "0");
    }
    if (progressEl) {
      progressEl.style.transition = "none";
      progressEl.style.right = "100%";
      progressEl.offsetWidth;
      progressEl.style.transition = `right ${LEDGER_HOLD_MS}ms linear`;
      progressEl.style.right = "0%";
    }
  }

  function next() {
    i = (i + 1) % total;
    showPairIdx(i);
  }

  function start() {
    stop();
    timer = setInterval(next, LEDGER_HOLD_MS);
  }

  function stop() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  function onEnter() {
    paused = true;
    stop();
  }
  function onLeave() {
    paused = false;
    if (visible) start();
  }

  let visible = false;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        visible = e.isIntersecting;
        if (visible && !paused) start();
        else stop();
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.2 }
  );
  io.observe(section);

  section.addEventListener("mouseenter", onEnter);
  section.addEventListener("mouseleave", onLeave);
  section.addEventListener("focusin", onEnter);
  function onFocusOut() {
    if (visible && !paused) start();
  }
  section.addEventListener("focusout", onFocusOut);

  showPairIdx(0);

  return () => {
    stop();
    io.disconnect();
    section.removeEventListener("mouseenter", onEnter);
    section.removeEventListener("mouseleave", onLeave);
    section.removeEventListener("focusin", onEnter);
    section.removeEventListener("focusout", onFocusOut);
  };
}

export function attachDashboardCounters(root: HTMLElement): () => void {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cards = Array.from(root.querySelectorAll<HTMLElement>(".card[data-card]"));

  if (reduced) {
    cards.forEach((card) => {
      card.dataset.fired = "1";
      card.classList.add("is-in-view");
      card.querySelectorAll<HTMLElement>(".kpi[data-kpi]").forEach((kpi) =>
        finalizeKpi(kpi)
      );
    });
    return () => {};
  }

  function animateKpi(kpi: HTMLElement, delay: number): void {
    if (kpi.dataset.fired === "1") return;
    const target = parseFloat(kpi.dataset.target ?? "");
    const decimals = parseInt(kpi.dataset.decimals ?? "0", 10);
    const prefix = kpi.dataset.prefix ?? "";
    const suffix = kpi.dataset.suffix ?? "";
    const text = kpi.dataset.text;
    const valEl = kpi.querySelector<HTMLElement>(".kpi__val");
    const sufEl = kpi.querySelector<HTMLElement>(".kpi__suffix");

    window.setTimeout(() => {
      kpi.dataset.fired = "1";
      kpi.classList.add("is-firing");

      if (text && valEl) {
        valEl.textContent = "";
        let i = 0;
        const tick = () => {
          if (i > text.length) return;
          valEl.textContent = text.slice(0, i++);
          if (i <= text.length) window.setTimeout(tick, 110);
        };
        tick();
        return;
      }

      if (!valEl || !Number.isFinite(target)) return;

      const dur = 1500;
      const start = performance.now();
      const ease = (t: number) => 1 - Math.pow(1 - t, 3);
      function step(now: number) {
        if (!valEl) return;
        const t = Math.min(1, (now - start) / dur);
        const v = ease(t) * target;
        valEl.textContent = `${prefix}${fmt(v, decimals)}`;
        if (sufEl && !sufEl.textContent) sufEl.textContent = suffix;
        if (t < 1) requestAnimationFrame(step);
        else valEl.textContent = `${prefix}${fmt(target, decimals)}`;
      }
      requestAnimationFrame(step);
    }, delay);
  }

  function fireCard(card: HTMLElement, baseDelay: number): void {
    card.classList.add("is-in-view");
    const kpis = card.querySelectorAll<HTMLElement>(".kpi[data-kpi]");
    kpis.forEach((kpi, idx) => animateKpi(kpi, baseDelay + idx * 180));
  }

  let cardOrder = 0;
  const observers: IntersectionObserver[] = [];

  cards.forEach((card) => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          if (card.dataset.fired === "1") return;
          card.dataset.fired = "1";
          const offset = cardOrder * 600;
          cardOrder += 1;
          fireCard(card, offset);
          io.disconnect();
        });
      },
      { rootMargin: "0px 0px -15% 0px", threshold: 0.3 }
    );
    io.observe(card);
    observers.push(io);
  });

  const cleanHover: (() => void)[] = [];
  if (matchMedia("(hover: hover)").matches) {
    cards.forEach((card) => {
      const onEnter = () => {
        if (card.dataset.replayLock === "1") return;
        card.dataset.replayLock = "1";
        card.querySelectorAll<SVGElement>(".kpi__arc-fill").forEach((arc) => {
          arc.style.strokeDasharray = "0 100";
          arc.getBoundingClientRect();
          arc.style.strokeDasharray = "100 100";
        });
        window.setTimeout(() => {
          card.dataset.replayLock = "";
        }, 1600);
      };
      card.addEventListener("mouseenter", onEnter);
      cleanHover.push(() => card.removeEventListener("mouseenter", onEnter));
    });
  }

  return () => {
    observers.forEach((o) => o.disconnect());
    cleanHover.forEach((c) => c());
  };
}

export function attachCrosshairFade(root: HTMLElement): () => void {
  const targets = Array.from(
    root.querySelectorAll<HTMLElement>(".card, .cred__card, .case, .tile")
  );
  if (!targets.length) return () => {};

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || !("IntersectionObserver" in window)) {
    targets.forEach((t) => t.classList.add("xhair-on"));
    return () => {};
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("xhair-on");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  targets.forEach((t) => io.observe(t));
  return () => io.disconnect();
}

/** Wire attachLedger + counters + crosshair — returns single teardown */
export function attachHomeV2Animations(root: HTMLElement): () => void {
  const a = attachLedger(root);
  const b = attachDashboardCounters(root);
  const c = attachCrosshairFade(root);
  return () => {
    a();
    b();
    c();
  };
}
