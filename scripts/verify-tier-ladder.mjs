#!/usr/bin/env node
/**
 * Tier ladder verification (Polish Pass 4 — focus bug).
 * Usage: node scripts/verify-tier-ladder.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const BASE = process.env.BASE_URL || "http://localhost:3333";
const OUT = join(
  process.cwd(),
  "reference/impact-visual-pass/verification-screenshots/tier-ladder-polish-4",
);

const DOTS = [
  "01-A", "01-B", "01-C", "01-D", "01-E", "01-F",
  "02-A", "02-B", "02-C", "02-D",
  "03-A", "03-B", "03-C", "03-D", "03-E",
];

async function inspectActive(page) {
  return page.evaluate(() => {
    const el = document.activeElement;
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return {
      tag: el.tagName?.toLowerCase(),
      class: el.getAttribute("class"),
      aria: el.getAttribute("aria-label"),
      rect: { w: Math.round(r.width), h: Math.round(r.height) },
      outlineWidth: cs.outlineWidth,
      outlineColor: cs.outlineColor,
      hasFocusRing: !!document.querySelector(".impact-tier-ladder__svg .dot:has(.out:focus-visible) .focus-ring"),
    };
  });
}

async function main() {
  const { chromium } = await import("playwright");
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();
  const results = { gates: {}, focus: { click: {}, tab: {} }, diagnosis: {} };

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

  for (const mode of ["direct", "soft", "hard"]) {
    const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
    await openImpact(page, mode);
    const wedgeTabIndex = await page.evaluate(() =>
      document.querySelector(".impact-tier-ladder__svg .dot-wedge")?.hasAttribute("tabindex"),
    );
    results.gates[mode] = { pass: wedgeTabIndex === false, wedgeTabIndex };
    await page.close();
  }

  const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
  await openImpact(page, "direct");

  // Click all 15 dots via wedge (primary tap path)
  for (const pn of DOTS) {
    await page.evaluate((partNo) => {
      const wedges = Array.from(document.querySelectorAll(".impact-tier-ladder__svg .dot-wedge"));
      const idx = [
        "03-A", "03-B", "03-C", "03-D", "03-E",
        "02-A", "02-B", "02-C", "02-D",
        "01-A", "01-B", "01-C", "01-D", "01-E", "01-F",
      ].indexOf(partNo);
      wedges[idx]?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    }, pn);
    await page.waitForTimeout(80);
    const state = await inspectActive(page);
    results.focus.click[pn] = {
      ...state,
      pass:
        state?.class === "out" &&
        state?.rect.w <= 20 &&
        state?.rect.h <= 20 &&
        state?.hasFocusRing === true &&
        !state?.outlineColor?.includes("153, 200, 255"),
    };
  }

  // Tab through all dot outs
  await page.click(".impact-tier-ladder__stage");
  const tabbed = new Set();
  for (let i = 0; i < 80 && tabbed.size < 15; i++) {
    await page.keyboard.press("Tab");
    await page.waitForTimeout(40);
    const pn = await page.evaluate(() => {
      const el = document.activeElement;
      if (el?.classList?.contains("out")) return el.getAttribute("aria-label")?.slice(0, 4).trim();
      return null;
    });
    if (pn && DOTS.some((d) => pn.startsWith(d))) {
      const key = DOTS.find((d) => pn.startsWith(d));
      if (key && !tabbed.has(key)) {
        tabbed.add(key);
        const state = await inspectActive(page);
        results.focus.tab[key] = {
          ...state,
          pass:
            state?.class === "out" &&
            state?.rect.w <= 20 &&
            state?.hasFocusRing === true &&
            !state?.outlineColor?.includes("153, 200, 255"),
        };
      }
    }
  }

  results.focus.clickPass = Object.values(results.focus.click).every((r) => r.pass);
  results.focus.tabPass = DOTS.every((d) => results.focus.tab[d]?.pass);

  // Screenshots: one dot per ring with focus
  for (const pn of ["01-E", "02-C", "03-B"]) {
    await page.evaluate((partNo) => {
      const out = document.querySelector(
        `.impact-tier-ladder__svg .dot .out[aria-label^="${partNo}"]`,
      );
      out?.focus();
    }, pn);
    await page.waitForTimeout(150);
    await page.screenshot({ path: join(OUT, `focus-${pn}.png`) });
  }

  await page.setViewportSize({ width: 380, height: 900 });
  await page.evaluate(() => {
    document.querySelector('.impact-tier-ladder__svg .dot .out[aria-label^="03-B"]')?.focus();
  });
  await page.waitForTimeout(150);
  await page.screenshot({ path: join(OUT, "focus-03B-mobile.png") });

  results.diagnosis = {
    rootCause: "path.dot-wedge received focus on click (tabIndex=-1 + large annular bbox)",
    fix: "Removed wedge tabindex; mousedown preventDefault on wedge; focus .out circle; outline:none on wedges",
  };

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
