#!/usr/bin/env node
/**
 * Tier ladder verification + screenshots (Polish Pass 1).
 * Usage: node scripts/verify-tier-ladder.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const BASE = process.env.BASE_URL || "http://localhost:3333";
const OUT = join(
  process.cwd(),
  "reference/impact-visual-pass/verification-screenshots/tier-ladder-polish-1",
);

async function main() {
  const { chromium } = await import("playwright");
  await mkdir(OUT, { recursive: true });

  const browser = await chromium.launch();
  const results = {
    gates: {},
    fixes: {},
    attribution: {},
    v1LaunchStrip: {},
    v2RingCentering: {},
    viewports: {},
  };

  async function openImpact(page, mode) {
    if (mode === "direct") {
      await page.goto(`${BASE}/impact#tab-01`, { waitUntil: "networkidle" });
    } else if (mode === "soft") {
      await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
      await page.click('a[href="/impact"]');
      await page.waitForURL(/\/impact/);
      await page.evaluate(() => {
        localStorage.setItem("impact-briefing-tab", "revenue");
        location.hash = "#tab-01";
      });
      await page.reload({ waitUntil: "networkidle" });
    } else {
      await page.goto(`${BASE}/impact#tab-01`, { waitUntil: "networkidle" });
      await page.reload({ waitUntil: "networkidle" });
    }
    await page.waitForSelector(".impact-tier-ladder__panel", { timeout: 15000 });
  }

  async function readState(page) {
    return page.evaluate(() => {
      const math = document.querySelector(".impact-tier-ladder__panel-head .math")?.textContent?.trim();
      const ringLabels = Array.from(document.querySelectorAll(".impact-tier-ladder__svg .ring-lbl")).map(
        (el) => el.textContent?.trim(),
      );
      const activeStamp = document.querySelector(".impact-tier-ladder__stamp.active")?.getAttribute("data-tier");
      const revealDefault = !!document.querySelector(".impact-tier-ladder__reveal-placeholder");
      const bodyChildren = Array.from(
        document.querySelector(".impact-tier-ladder__panel-body")?.children ?? [],
      ).map((el) => el.className.split(" ").find((c) => c.startsWith("impact-tier-ladder__")) ?? el.className);
      return { math, ringLabels, activeStamp, revealDefault, bodyChildren };
    });
  }

  async function screenshot(page, name) {
    await page.screenshot({ path: join(OUT, `${name}.png`), fullPage: false });
  }

  async function pinAndReadAttribution(page, stampTier, partPrefix) {
    if (stampTier) await page.click(`.impact-tier-ladder__stamp[data-tier="${stampTier}"]`);
    await page.waitForTimeout(200);
    await page.locator(`.impact-tier-ladder__svg .dot[aria-label^="${partPrefix}"]`).click();
    await page.waitForTimeout(200);
    return page.evaluate(() => ({
      line2: document.querySelector(".impact-tier-ladder__reveal-line2")?.textContent?.trim(),
      hasSvgGlyph: !!document.querySelector(".impact-tier-ladder__reveal-line1 .cls svg"),
    }));
  }

  // Three-state gate
  for (const mode of ["direct", "soft", "hard"]) {
    const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
    await openImpact(page, mode);
    const state = await readState(page);
    const pass =
      state.activeStamp === "01" &&
      state.revealDefault &&
      state.math === "T01 · OWNS 15 · ADDS 6 · INHERITS 9 FROM T02 · T03" &&
      state.ringLabels?.join("|") ===
        "T01 · BUSINESS · +6 ADDED|T02 · PROFESSIONAL · +4 ADDED|T03 · INCLUDED · 5" &&
      state.bodyChildren?.join(">") ===
        "impact-tier-ladder__stage>impact-tier-ladder__reveal>impact-tier-ladder__stamps";
    results.gates[mode] = { pass, state };
    await page.close();
  }

  const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
  await openImpact(page, "direct");
  await screenshot(page, "desktop-t01-default");

  // Fix checks
  const desktopState = await readState(page);
  results.fixes = {
    ringLabels: desktopState.ringLabels,
    bodyOrder: desktopState.bodyChildren,
    revealAboveStamps:
      desktopState.bodyChildren?.[1] === "impact-tier-ladder__reveal" &&
      desktopState.bodyChildren?.[2] === "impact-tier-ladder__stamps",
  };
  await page.click('.impact-tier-ladder__stamp[data-tier="03"]');
  await page.waitForTimeout(200);
  results.fixes.t03Math = await page.evaluate(() =>
    document.querySelector(".impact-tier-ladder__panel-head .math")?.textContent?.trim(),
  );
  await page.click('.impact-tier-ladder__stamp[data-tier="01"]');
  await page.waitForTimeout(200);

  // Attribution test cases
  const cases = [
    { stamp: "01", pn: "01-A", expected: "T01 NATIVE" },
    { stamp: "01", pn: "02-A", expected: "INHERITED FROM T02" },
    { stamp: "01", pn: "03-A", expected: "INHERITED FROM T03" },
    { stamp: "02", pn: "02-A", expected: "T02 NATIVE" },
    { stamp: "02", pn: "03-A", expected: "INHERITED FROM T03" },
    { stamp: "03", pn: "03-A", expected: "T03 NATIVE" },
  ];
  for (const c of cases) {
    const r = await pinAndReadAttribution(page, c.stamp, c.pn);
    results.attribution[c.pn + "@T" + c.stamp] = {
      expected: c.expected,
      actual: r.line2,
      pass: r.line2 === c.expected,
      hasSvgGlyph: r.hasSvgGlyph,
    };
  }

  await page.click('.impact-tier-ladder__stamp[data-tier="01"]');
  await page.waitForTimeout(200);
  await page.locator('.impact-tier-ladder__svg .dot[aria-label^="01-A"]').click();
  await page.waitForTimeout(200);
  await screenshot(page, "desktop-t01-01a-native");

  await page.locator('.impact-tier-ladder__svg .dot[aria-label^="03-A"]').click();
  await page.waitForTimeout(200);
  await screenshot(page, "desktop-t01-03a-inherited");

  // V2 — ring centering on crosshair (all rings cx=0 cy=0)
  results.v2RingCentering = await page.evaluate(() => {
    const rings = Array.from(document.querySelectorAll(".impact-tier-ladder__svg .ring"));
    return {
      pass: rings.every((r) => r.getAttribute("cx") === "0" && r.getAttribute("cy") === "0"),
      rings: rings.map((r) => ({ cx: r.getAttribute("cx"), cy: r.getAttribute("cy"), r: r.getAttribute("r") })),
    };
  });

  // V1 — launch strip at narrow widths
  for (const w of [640, 768, 900]) {
    await page.setViewportSize({ width: w, height: 900 });
    await page.waitForTimeout(150);
    const v1 = await page.evaluate(() => {
      const axis = document.querySelector(".impact-tier-ladder__launch-axis");
      if (!axis) return { pass: false, reason: "no axis" };
      const always = document.querySelector(".impact-tier-ladder__launch-always");
      const t01 = document.querySelector(".impact-tier-ladder__launch-t01range");
      const ar = axis.getBoundingClientRect();
      const al = always?.getBoundingClientRect();
      const t1 = t01?.getBoundingClientRect();
      const linesOverlap =
        al && t1 ? !(al.bottom < t1.top || t1.bottom < al.top) && Math.abs(al.top - t1.top) < 20 : false;
      const labels = Array.from(document.querySelectorAll(".impact-tier-ladder__launch-event .lbl"));
      const labelRects = labels.map((l) => l.getBoundingClientRect());
      let labelCollision = false;
      for (let i = 0; i < labelRects.length; i++) {
        for (let j = i + 1; j < labelRects.length; j++) {
          const a = labelRects[i];
          const b = labelRects[j];
          if (!(a.right < b.left || b.right < a.left || a.bottom < b.top || b.bottom < a.top)) {
            labelCollision = true;
          }
        }
      }
      return {
        pass: !linesOverlap && !labelCollision && ar.width > 0,
        linesOverlap,
        labelCollision,
        axisWidth: ar.width,
      };
    });
    results.v1LaunchStrip[w] = v1;
  }

  // Mobile layout order + screenshot
  const mobile = await browser.newPage({ viewport: { width: 380, height: 900 } });
  await openImpact(mobile, "direct");
  const mobileOrder = await mobile.evaluate(() =>
    Array.from(document.querySelector(".impact-tier-ladder__panel-body")?.children ?? []).map(
      (el) => el.className.split(" ").find((c) => c.startsWith("impact-tier-ladder__")) ?? el.className,
    ),
  );
  results.fixes.mobileOrder = mobileOrder;
  results.fixes.mobileOrderPass =
    mobileOrder?.join(">") === "impact-tier-ladder__stage>impact-tier-ladder__reveal>impact-tier-ladder__stamps";
  await mobile.locator('.impact-tier-ladder__svg .dot[aria-label^="01-A"]').click();
  await mobile.waitForTimeout(200);
  await screenshot(mobile, "mobile-reveal-above-stamps");
  await mobile.close();

  for (const w of [380, 640, 768, 900, 1024, 1200, 1600]) {
    await page.setViewportSize({ width: w, height: 900 });
    await page.waitForTimeout(100);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 2);
    results.viewports[w] = { overflow };
  }

  await page.close();
  await browser.close();

  await writeFile(join(OUT, "results.json"), JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));
  console.log(`\nScreenshots: ${OUT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
