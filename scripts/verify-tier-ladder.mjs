#!/usr/bin/env node
/**
 * Tier ladder verification + screenshots for impact-autodesk-build.
 * Usage: node scripts/verify-tier-ladder.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const BASE = process.env.BASE_URL || "http://localhost:3333";
const OUT = join(process.cwd(), "reference/impact-visual-pass/verification-screenshots/tier-ladder-build");

async function main() {
  const { chromium } = await import("playwright");
  await mkdir(OUT, { recursive: true });

  const browser = await chromium.launch();
  const results = { gates: {}, states: {}, viewports: {}, tapTarget: "radial wedge" };

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
      const activeStamp = document.querySelector(".impact-tier-ladder__stamp.active")?.getAttribute("data-tier");
      const revealDefault = !!document.querySelector(".impact-tier-ladder__reveal-placeholder");
      const litDots = document.querySelectorAll(".impact-tier-ladder__svg .dot.lit").length;
      const dimDots = document.querySelectorAll(".impact-tier-ladder__svg .dot.dim").length;
      const pinned = document.querySelector(".impact-tier-ladder__reveal.is-pinned");
      return { math, activeStamp, revealDefault, litDots, dimDots, pinned: !!pinned };
    });
  }

  async function screenshot(page, name) {
    await page.screenshot({ path: join(OUT, `${name}.png`), fullPage: false });
  }

  // Gate checks at desktop
  for (const mode of ["direct", "soft", "hard"]) {
    const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
    await openImpact(page, mode);
    const state = await readState(page);
    const pass =
      state.activeStamp === "01" &&
      state.litDots === 15 &&
      state.dimDots === 0 &&
      state.revealDefault &&
      state.math?.includes("T01 · OWNS 15");
    results.gates[mode] = { pass, state };
    await page.close();
  }

  // Interaction + screenshots (direct load)
  const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
  await openImpact(page, "direct");
  await screenshot(page, "desktop-t01-active");

  // T02
  await page.click('.impact-tier-ladder__stamp[data-tier="02"]');
  await page.waitForTimeout(250);
  let state = await readState(page);
  results.states.t02 = state;
  await screenshot(page, "desktop-t02-active");

  // T03
  await page.click('.impact-tier-ladder__stamp[data-tier="03"]');
  await page.waitForTimeout(250);
  state = await readState(page);
  results.states.t03 = state;
  await screenshot(page, "desktop-t03-active");

  // Back to T01 and pin a service
  await page.click('.impact-tier-ladder__stamp[data-tier="01"]');
  await page.waitForTimeout(250);
  await page.locator('.impact-tier-ladder__svg .dot[aria-label^="01-A"]').click();
  await page.waitForTimeout(250);
  state = await readState(page);
  results.states.pinned = state;
  await screenshot(page, "desktop-service-pinned");

  // T03 tap target test at 380px
  const mobile = await browser.newPage({ viewport: { width: 380, height: 900 } });
  await openImpact(mobile, "direct");
  await screenshot(mobile, "mobile-t01-active");
  await mobile.click('.impact-tier-ladder__stamp[data-tier="03"]');
  await mobile.waitForTimeout(250);
  const t03Dots = ["03-A", "03-B", "03-C", "03-D", "03-E"];
  const tapResults = [];
  for (const pn of t03Dots) {
    await mobile.locator(`.impact-tier-ladder__svg .dot[aria-label^="${pn}"]`).click();
    await mobile.waitForTimeout(150);
    const pinnedPn = await mobile.evaluate(() => {
      const line = document.querySelector(".impact-tier-ladder__reveal-line1 .pn")?.textContent?.trim();
      return line;
    });
    tapResults.push({ pn, pinnedPn, match: pinnedPn === pn });
    await mobile.locator(`.impact-tier-ladder__svg .dot[aria-label^="${pn}"]`).click();
    await mobile.waitForTimeout(100);
  }
  results.tapTargetT03 = tapResults;
  results.tapTargetPass = tapResults.every((r) => r.match);

  await mobile.locator('.impact-tier-ladder__svg .dot[aria-label^="03-E"]').click();
  await mobile.waitForTimeout(200);
  await screenshot(mobile, "mobile-service-pinned");
  await mobile.close();

  // Multi-viewport overflow check
  for (const w of [640, 768, 900, 1024, 1600]) {
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
