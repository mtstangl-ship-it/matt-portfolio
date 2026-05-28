#!/usr/bin/env node
/**
 * Tier ladder verification + screenshots (Polish Pass 3).
 * Usage: node scripts/verify-tier-ladder.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const BASE = process.env.BASE_URL || "http://localhost:3333";
const OUT = join(
  process.cwd(),
  "reference/impact-visual-pass/verification-screenshots/tier-ladder-polish-3",
);

async function main() {
  const { chromium } = await import("playwright");
  await mkdir(OUT, { recursive: true });

  const browser = await chromium.launch();
  const results = { gates: {}, fixes: {}, viewports: {} };

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
      const pegs = Array.from(document.querySelectorAll(".impact-tier-ladder__launch-event .lbl")).map(
        (el) => el.textContent?.replace(/\s+/g, " ").trim(),
      );
      const launchText = document.querySelector(".impact-tier-ladder__launch")?.textContent ?? "";
      const bottomStrip = document.querySelector(".impact-tier-ladder .impact-customer-scale");
      const hints = Array.from(document.querySelectorAll(".impact-tier-ladder__hint")).map((el) =>
        el.textContent?.replace(/\s+/g, " ").trim(),
      );
      const footHint = document.querySelector(".impact-tier-ladder__panel-foot .hint");
      const placeholder = document.querySelector(".impact-tier-ladder__reveal-placeholder");
      const bodyOrder = Array.from(document.querySelector(".impact-tier-ladder__panel-body")?.children ?? []).map(
        (el) => el.className.split(" ").find((c) => c.startsWith("impact-tier-ladder__")) ?? "",
      );
      const heroMetric = document.querySelector("#impact-panel-revenue:not([hidden]) .impact-metric-strip")?.textContent ?? "";
      return { pegs, launchText, bottomStrip: !!bottomStrip, hints, footHint: !!footHint, placeholder: !!placeholder, bodyOrder, heroMetric };
    });
  }

  async function screenshot(page, name, fullPage = false) {
    await page.screenshot({ path: join(OUT, `${name}.png`), fullPage });
  }

  for (const mode of ["direct", "soft", "hard"]) {
    const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
    await openImpact(page, mode);
    const state = await readState(page);
    const pass =
      state.pegs?.join("|") === "T03 · INCLUDED|T01 · BUSINESS|T02 · PROFESSIONAL" &&
      !state.bottomStrip &&
      !state.footHint &&
      !state.placeholder &&
      state.hints?.includes("↓ TAP A NODE FOR THE SERVICE") &&
      state.hints?.includes("↓ TAP A TIER FOR ITS SET") &&
      state.heroMetric.includes("BUILD");
    results.gates[mode] = { pass, state };
    await page.close();
  }

  const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
  await openImpact(page, "direct");
  await screenshot(page, "desktop-launch-strip");

  const desktopState = await readState(page);
  results.fixes = { desktop: desktopState };

  await page.locator('.impact-tier-ladder__svg .dot .out[aria-label^="01-A"]').click({ force: true });
  await page.waitForTimeout(200);
  await screenshot(page, "desktop-instructional-lines");

  const mobile = await browser.newPage({ viewport: { width: 380, height: 900 } });
  await openImpact(mobile, "direct");
  const mobileState = await readState(mobile);
  results.fixes.mobile = mobileState;
  const order = mobileState.bodyOrder ?? [];
  results.fixes.mobileOrderPass =
    order[0]?.includes("stage") &&
    order[1]?.includes("hint") &&
    order[2]?.includes("reveal") &&
    order[3]?.includes("hint") &&
    order[4]?.includes("stamps");
  await screenshot(mobile, "mobile-instruction-order");

  await page.setViewportSize({ width: 1200, height: 900 });
  await screenshot(page, "autodesk-tab-full", true);

  for (const w of [380, 640, 768, 900, 1024, 1200, 1600]) {
    await page.setViewportSize({ width: w, height: 900 });
    await page.waitForTimeout(100);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 2);
    results.viewports[w] = { overflow };
  }

  await page.close();
  await mobile.close();
  await browser.close();

  await writeFile(join(OUT, "results.json"), JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));
  console.log(`\nScreenshots: ${OUT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
