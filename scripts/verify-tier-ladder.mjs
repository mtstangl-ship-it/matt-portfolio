#!/usr/bin/env node
/**
 * Tier ladder verification + screenshots (Polish Pass 2).
 * Usage: node scripts/verify-tier-ladder.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const BASE = process.env.BASE_URL || "http://localhost:3333";
const OUT = join(
  process.cwd(),
  "reference/impact-visual-pass/verification-screenshots/tier-ladder-polish-2",
);

async function main() {
  const { chromium } = await import("playwright");
  await mkdir(OUT, { recursive: true });

  const browser = await chromium.launch();
  const results = { gates: {}, fixes: {}, focus: {}, viewports: {} };

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
      const rings = Array.from(document.querySelectorAll(".impact-tier-ladder__svg .ring")).map((r) =>
        Number(r.getAttribute("r")),
      );
      const dim = document.querySelector(".impact-tier-ladder__svg .dim-label")?.textContent?.trim();
      const intents = Array.from(document.querySelectorAll(".impact-tier-ladder__stamp .intent")).map(
        (el) => el.textContent?.trim(),
      );
      return { rings, dim, intents };
    });
  }

  async function screenshot(page, name) {
    await page.screenshot({ path: join(OUT, `${name}.png`), fullPage: false });
  }

  for (const mode of ["direct", "soft", "hard"]) {
    const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
    await openImpact(page, mode);
    const state = await readState(page);
    const pass =
      state.rings?.join(",") === "240,165,90" &&
      state.dim === "Ø 480 · 15 SERVICES" &&
      state.intents?.length === 3;
    results.gates[mode] = { pass, state };
    await page.close();
  }

  const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
  await openImpact(page, "direct");
  await screenshot(page, "desktop-t01-rings-stamps");

  // Focus bug check on 02-C and 03-D (click via wedge — same tap path as users)
  for (const pn of ["02-C", "03-D"]) {
    await page.evaluate((partNo) => {
      const dots = Array.from(document.querySelectorAll(".impact-tier-ladder__svg .dot .out"));
      const target = dots.find((d) => d.getAttribute("aria-label")?.startsWith(partNo));
      target?.focus();
    }, pn);
    await page.waitForTimeout(150);
    const focusCheck = await page.evaluate((partNo) => {
      const focused = document.activeElement;
      const tag = focused?.tagName?.toLowerCase();
      const cls = focused?.getAttribute("class") ?? "";
      const parentTag = focused?.parentElement?.tagName?.toLowerCase();
      const outline = focused ? getComputedStyle(focused).outlineStyle : null;
      const outlineWidth = focused ? getComputedStyle(focused).outlineWidth : null;
      const gTabIndex = document.querySelector(".impact-tier-ladder__svg g.dot[tabindex]");
      const focusedLabel = focused?.getAttribute("aria-label") ?? "";
      return {
        partNo,
        focusedTag: tag,
        focusedClass: cls,
        parentTag,
        outlineStyle: outline,
        outlineWidth,
        gHasTabIndex: !!gTabIndex,
        isOutCircle: cls === "out",
        focusedLabel,
      };
    }, pn);
    results.focus[pn] = focusCheck;
    await page.evaluate((partNo) => {
      const wedges = document.querySelectorAll(".impact-tier-ladder__svg .dot-wedge");
      const idx = ["01-A", "01-B", "01-C", "01-D", "01-E", "01-F", "02-A", "02-B", "02-C", "02-D", "03-A", "03-B", "03-C", "03-D", "03-E"].indexOf(partNo);
      wedges[idx]?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    }, pn);
    await page.waitForTimeout(200);
  }
  await screenshot(page, "desktop-dot-pinned-no-blue-box");

  // Keyboard focus on dot
  await page.keyboard.press("Tab");
  await page.waitForTimeout(100);
  let tabbedToDot = false;
  for (let i = 0; i < 30; i++) {
    const info = await page.evaluate(() => {
      const el = document.activeElement;
      return {
        isDotOut: el?.classList?.contains("out") ?? false,
        hasFocusRing: !!document.querySelector(".impact-tier-ladder__svg .dot:has(.out:focus-visible) .focus-ring"),
      };
    });
    if (info.isDotOut) {
      tabbedToDot = info.hasFocusRing;
      break;
    }
    await page.keyboard.press("Tab");
    await page.waitForTimeout(50);
  }
  results.focus.keyboardDotFocusRing = tabbedToDot;

  // Mobile intent wrapping
  const mobile = await browser.newPage({ viewport: { width: 380, height: 900 } });
  await openImpact(mobile, "direct");
  const mobileIntent = await mobile.evaluate(() => {
    const stamps = Array.from(document.querySelectorAll(".impact-tier-ladder__stamp .intent"));
    return stamps.map((el) => {
      const r = el.getBoundingClientRect();
      const parent = el.closest(".impact-tier-ladder__stamp")?.getBoundingClientRect();
      return {
        text: el.textContent?.trim().slice(0, 40),
        overflow: parent ? r.width > parent.width + 2 : false,
        width: r.width,
        parentWidth: parent?.width,
      };
    });
  });
  results.fixes.mobileIntent = mobileIntent;
  results.fixes.mobileIntentPass = mobileIntent.every((i) => !i.overflow);
  await screenshot(mobile, "mobile-strategic-intent-wrap");
  await mobile.close();

  // Regression: attribution + reveal order
  await page.click('.impact-tier-ladder__stamp[data-tier="01"]');
  await page.locator('.impact-tier-ladder__svg .dot .out[aria-label^="03-A"]').click({ force: true });
  await page.waitForTimeout(200);
  results.fixes.attribution03A = await page.evaluate(() =>
    document.querySelector(".impact-tier-ladder__reveal-line2")?.textContent?.trim(),
  );
  results.fixes.bodyOrder = await page.evaluate(() =>
    Array.from(document.querySelector(".impact-tier-ladder__panel-body")?.children ?? []).map(
      (el) => el.className.split(" ").find((c) => c.startsWith("impact-tier-ladder__")) ?? "",
    ),
  );

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
