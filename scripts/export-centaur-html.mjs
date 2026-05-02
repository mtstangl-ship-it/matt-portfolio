/**
 * Static HTML export of Centaur Practice for Claude Design (self-contained CSS).
 *
 * Run: node scripts/export-centaur-html.mjs
 * Output: public/centaur-practice-claude-design.html
 *
 * Image: uses relative path case-studies/centaur-literal.png (same folder layout as public/).
 * Open via file:// only if the HTML file lives in public/; or serve from Next.
 */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.cwd());
const outFile = path.join(root, "public", "centaur-practice-claude-design.html");

const cssPieces = [
  path.join(root, "src/app/tokens-impact.css"),
  path.join(root, "src/styles/case-centaur/tokens-scoped.css"),
  path.join(root, "src/styles/case-centaur/grammar.css"),
  path.join(root, "src/styles/tier-a/fiche-nav.css"),
  path.join(root, "src/styles/case-centaur/density.css"),
  path.join(root, "src/styles/case-centaur/tier-a-case-shell.css"),
  path.join(root, "src/styles/case-centaur/case-ai.css"),
  path.join(root, "src/styles/case-centaur/diff-images.css"),
];

const EXPORT_EXTRA = `
:root {
  --font-inter: "Inter", system-ui, -apple-system, "Segoe UI", sans-serif;
  --font-jetbrains: "JetBrains Mono", ui-monospace, Menlo, monospace;
}
article[data-case="ai"].impact-console {
  --case-accent: var(--teal);
  --case-accent-2: var(--teal-2);
  --case-accent-3: var(--teal-dim);
}
.tier-a-react-case > main {
  width: 100%;
  max-width: none;
  padding-left: 0;
  padding-right: 0;
}
.case-picker-wrap { margin: 0; }
.case-picker-hint-export {
  font-family: var(--mono);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: var(--muted);
  margin: 0 0 0.5rem;
}
.case-picker-export {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-family: var(--mono);
}
.case-picker-export a {
  display: block;
  cursor: pointer;
  border-radius: 2px;
  border: 1px solid var(--line);
  background: var(--bg-2);
  color: var(--muted);
  padding: 0.5rem 0.75rem;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  text-decoration: none;
  transition: border-color 0.15s, background 0.15s, color 0.15s;
}
.case-picker-export a:hover {
  border-color: var(--teal-dim);
  background: rgba(29, 207, 170, 0.07);
  color: var(--ink-2);
}
.case-picker-export a.is-active {
  border-color: var(--teal-dim);
  background: var(--teal-wash);
  color: var(--teal);
}
`;

const FINDINGS = [
  { ref: "F·01", sev: "critical", tag: "cri", body: "Hero scatter dominates the page; impact metrics buried below fold. <b>→ promoted Impact Console above scatter (W4).</b>" },
  { ref: "F·02", sev: "critical reversed", tag: "rev", body: "Wanted to remove fiche grammar as &quot;too dense.&quot; <b>Reversed: density is the differentiator.</b> Doubled down instead." },
  { ref: "F·03", sev: "major", tag: "maj", body: "Case study sections didn&apos;t earn their length; reading dropped at section 03. <b>→ cut three sections, restructured to 6.</b>" },
  { ref: "F·04", sev: "major", tag: "maj", body: "Tone in About slipped to corporate. <b>→ rewrote in first person, motorcycle metaphor stayed.</b>" },
  { ref: "F·05", sev: "critical", tag: "cri", body: "Mobile nav broke at 480px; CTA collided with brand. <b>→ collapsed to icon menu under 880px.</b>" },
  { ref: "F·06", sev: "major", tag: "maj", body: "Color contrast on .ink-3 below WCAG AA on dim callouts. <b>→ darkened var(--ink-3) by 6%.</b>" },
  { ref: "F·07", sev: "minor", tag: "min", body: "FIG stamp positioning drifted between hero and ledger. <b>→ standardized to absolute · top:1rem · right:1rem.</b>" },
  { ref: "F·08", sev: "major reversed", tag: "rev", body: "AI suggested removing the section dimension callouts. <b>Reversed: they&apos;re the page rhythm.</b> Kept all five." },
  { ref: "F·09", sev: "major", tag: "maj", body: "Crosshair fade timing felt mechanical. <b>→ added 400ms transition-delay after IO trigger.</b>" },
  { ref: "F·10", sev: "critical", tag: "cri", body: "Impact Console tabs not keyboard accessible. <b>→ added arrow-key + roving tabindex.</b>" },
  { ref: "F·11", sev: "major reversed", tag: "rev", body: "Weekly build log felt redundant next to Build Telemetry. <b>Reversed: vertical log, different scale from Build Telemetry.</b>" },
  { ref: "F·12", sev: "minor", tag: "min", body: "Sheet footer cells wrapped at 720px on Safari. <b>→ explicit grid-template-columns + media query.</b>" },
  { ref: "F·13", sev: "minor", tag: "min", body: "Inter-Italic loaded 600 weight unused. <b>→ trimmed to 400/500/600 regular only.</b>" },
];

const PILLS = [
  ["all", "ALL · ", "13"],
  ["critical", "CRITICAL · ", "4"],
  ["major", "MAJOR · ", "7"],
  ["minor", "MINOR · ", "4"],
  ["reversed", "REVERSED · ", "3"],
];

const SIGNAL_ENTRIES = [
  { date: "MAR 06", wk: "WK 01", node: "W1", title: "IA · No design", quote: "&quot;What pages, what hierarchy, what each section has to say.&quot;", commits: "06", deploys: "0", live: false },
  { date: "MAR 13", wk: "WK 02", node: "W2", title: "Tokens + grid", quote: "Dark theme. Teal accent. Monospace labels.", commits: "14", deploys: "3", live: false },
  { date: "MAR 20", wk: "WK 03", node: "W3", title: "Hero scatter added", quote: "Particle bloom lands on the hero.", commits: "19", deploys: "5", live: false },
  { date: "MAR 27", wk: "WK 04", node: "W4", title: "Impact Console ships", quote: "The strongest page on the site ships.", commits: "23", deploys: "8", live: false },
  { date: "APR 03", wk: "WK 05", node: "W5", title: "Claude Design arrives", quote: "Apr 17. The tool I needed six weeks ago, six weeks later.", commits: "18", deploys: "6", live: false },
  { date: "APR 10", wk: "WK 06 · NOW", node: "W6", title: "Critique + case studies", quote: "Two critique passes. Five case studies. One lesson.", commits: "25", deploys: "7", live: true },
];

function dimBetween(label, compact = false) {
  const cls = compact ? "dim-with-scale dim-with-scale--compact" : "dim-with-scale";
  const ticks = [0, 80, 160, 240, 320, 400, 480, 560, 640, 720, 800]
    .map((x) => `<line x1="${x}" y1="4" x2="${x}" y2="14" />`)
    .join("");
  return `<div class="${cls}"><p class="dim">${label}</p><svg class="dim-scale" viewBox="0 0 800 20" preserveAspectRatio="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="4" x2="800" y2="4" stroke="var(--ink-line)" stroke-width="1" /><g stroke="var(--ink-3)" stroke-width="1">${ticks}</g></svg></div>`;
}

function casePicker() {
  const links = [
    ["01", "Centaur Practice", "case-studies/ai", true],
    ["02", "Synthetic Users", "case-studies/synthetic-users", false],
    ["03", "Autodesk", "case-studies/autodesk", false],
    ["04", "Wipro", "case-studies/wipro", false],
    ["05", "EY", "case-studies/ey", false],
  ];
  const items = links
    .map(
      ([num, name, href, active]) =>
        `<a class="${active ? "is-active" : ""}" href="${href}">${num} · ${name.toUpperCase()}</a>`,
    )
    .join("");
  return `<div class="case-picker-wrap"><p class="case-picker-hint-export">↓ NAVIGATE CASES</p><nav class="case-picker-export" aria-label="Case study picker">${items}</nav></div>`;
}

function findingsRows() {
  return FINDINGS.map(
    (f) =>
      `<div class="finding" data-sev="${f.sev}"><span class="finding__ref">${f.ref}</span><span class="finding__sev" data-sev="${f.tag}">${f.tag.toUpperCase()}</span><span class="finding__body">${f.body}</span></div>`,
  ).join("\n");
}

function navHtml() {
  return `<nav class="nav" aria-label="Primary"><a class="nav__brand" href="/"><span class="nav__brand-mark" aria-hidden>+</span><span class="nav__brand-text">M. STANGL</span></a><ul class="nav__list"><li><a href="/impact">Impact</a></li><li><a href="/case-studies" aria-current="page">Case Studies</a></li><li><a href="/signal-story">Signal → Story</a></li><li><a href="/about">About</a></li></ul><a class="nav__cta" href="mailto:mtstangl@gmail.com">Contact</a><button class="nav__menu" type="button" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button></nav>`;
}

function gaugeStudyRects() {
  return [0, 1, 2, 3, 4]
    .map((i) => {
      const x = 12 + i * 37;
      const label = String(i + 1).padStart(2, "0");
      return `<g><rect x="${x}" y="5" width="24" height="14" rx="1" fill="var(--accent)" opacity="0.92" /><text x="${x + 12}" y="26" text-anchor="middle" fill="var(--ink-3)" font-size="7" font-family="ui-monospace, monospace" letter-spacing="0.08em">${label}</text></g>`;
    })
    .join("");
}

function timelineNodes() {
  const wks = ["W1", "W2", "W3", "W4", "W5", "W6", "NOW"];
  return wks
    .map((wk) => {
      const extra = wk === "NOW" ? " timeline__node--live" : "";
      return `<div class="timeline__node timeline__node--filled${extra}"><span class="timeline__wk"><b>${wk}</b></span><span class="timeline__dot"></span></div>`;
    })
    .join("");
}

function telemetrySection() {
  return `<section class="telemetry is-revealed" aria-label="Build Telemetry" data-screen-label="02 Build Telemetry">
<span class="margin-note">DRAWING 02</span>
<span class="fig-stamp">FIG. 02 · TELEMETRY</span>
<dl class="section-stamp" aria-label="Section metadata">
  <dt>DRAWING NO.</dt><dd>02 / 06</dd>
  <dt>RUNTIME</dt><dd>06 WK</dd>
  <dt>SHIPPED</dt><dd>APR 21, 2026</dd>
  <dt>LAST REV.</dt><dd>04/26</dd>
</dl>
<div class="telemetry__inner">
  <p class="telemetry__eyebrow"><span class="telemetry__eyebrow__meta">BUILD.TELEMETRY · MAR 6 — APR 21, 2026 · 6 WEEKS · COMMIT LOG DISTILLED</span><span class="live">LIVE · NOW</span></p>
  <div class="gauge-cluster" role="list" aria-label="Build telemetry readouts">
    <div class="gauge gauge--hero" role="listitem"><p class="gauge__label">Hero readout</p><p class="gauge__value">6<span class="gauge__value-unit">wks</span></p><p class="gauge__caption">Brief to shipped</p><p class="gauge__tol">Five case studies · three interactive artifacts</p></div>
    <div class="gauge" role="listitem"><p class="gauge__label">Commits</p><p class="gauge__value">130</p><p class="gauge__caption">Cumulative</p>
      <svg class="gauge__sparkline" viewBox="0 0 200 28" preserveAspectRatio="none" aria-hidden="true"><polyline points="0,22 28,18 56,16 84,10 112,8 140,6 168,4 200,3" fill="none" stroke="var(--accent)" stroke-width="1.4" /><g fill="var(--accent)"><circle cx="0" cy="22" r="2" /><circle cx="28" cy="18" r="2" /><circle cx="56" cy="16" r="2" /><circle cx="84" cy="10" r="2" /><circle cx="112" cy="8" r="2" /><circle cx="140" cy="6" r="2" /><circle cx="168" cy="4" r="2" /><circle cx="200" cy="3" r="2.4" /></g></svg>
    </div>
    <div class="gauge" role="listitem"><p class="gauge__label">Deploys</p><p class="gauge__value">34</p><p class="gauge__caption">Instant preview every push</p>
      <svg class="gauge__sparkline" viewBox="0 0 200 28" preserveAspectRatio="none" aria-hidden="true"><g stroke="var(--accent)" stroke-width="1"><line x1="14" y1="28" x2="14" y2="22" /><line x1="42" y1="28" x2="42" y2="14" /><line x1="70" y1="28" x2="70" y2="10" /><line x1="98" y1="28" x2="98" y2="6" /><line x1="126" y1="28" x2="126" y2="12" /><line x1="154" y1="28" x2="154" y2="8" /><line x1="182" y1="28" x2="182" y2="4" /></g></svg>
    </div>
    <div class="gauge" role="listitem"><p class="gauge__label">Case studies</p><p class="gauge__value">5</p><p class="gauge__caption">Each with a hero artifact</p>
      <svg class="gauge__sparkline" viewBox="0 0 200 30" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${gaugeStudyRects()}</svg>
    </div>
  </div>
  <div class="timeline" aria-label="Six-week timeline">
    <div class="timeline__head"><span>W1 — NOW · TICK SCALE</span><span>BAR INTERVAL · 1 WK</span></div>
    <div class="timeline__rail">${timelineNodes()}</div>
    <div class="timeline__captions">
      <span class="timeline__caption"><b>W1</b><br />IA in Cursor<br />no design</span>
      <span class="timeline__caption"><b>W2</b><br />Tokens + grid<br />stand up</span>
      <span class="timeline__caption"><b>W3</b><br />Hero scatter<br />added</span>
      <span class="timeline__caption"><b>W4</b><br />Impact console<br />ships</span>
      <span class="timeline__caption"><b>W5</b><br />Claude Design<br />arrives</span>
      <span class="timeline__caption"><b>W6</b><br />Critique<br />+ case studies</span>
      <span class="timeline__caption"><b>NOW</b><br />Shipped<br />Apr 21</span>
    </div>
    <svg class="timeline__scale" viewBox="0 0 800 18" preserveAspectRatio="none" aria-hidden="true">
      <line x1="0" y1="2" x2="800" y2="2" stroke="var(--ink-line)" stroke-width="1" />
      <g stroke="var(--ink-3)" stroke-width="1"><line x1="0" y1="2" x2="0" y2="12" /><line x1="133" y1="2" x2="133" y2="12" /><line x1="266" y1="2" x2="266" y2="12" /><line x1="400" y1="2" x2="400" y2="12" /><line x1="533" y1="2" x2="533" y2="12" /><line x1="666" y1="2" x2="666" y2="12" /><line x1="800" y1="2" x2="800" y2="12" /></g>
      <g stroke="var(--ink-line)" stroke-width="0.5"><line x1="33" y1="2" x2="33" y2="8" /><line x1="66" y1="2" x2="66" y2="8" /><line x1="100" y1="2" x2="100" y2="8" /><line x1="166" y1="2" x2="166" y2="8" /><line x1="200" y1="2" x2="200" y2="8" /><line x1="233" y1="2" x2="233" y2="8" /><line x1="300" y1="2" x2="300" y2="8" /><line x1="333" y1="2" x2="333" y2="8" /><line x1="366" y1="2" x2="366" y2="8" /><line x1="433" y1="2" x2="433" y2="8" /><line x1="466" y1="2" x2="466" y2="8" /><line x1="500" y1="2" x2="500" y2="8" /><line x1="566" y1="2" x2="566" y2="8" /><line x1="600" y1="2" x2="600" y2="8" /><line x1="633" y1="2" x2="633" y2="8" /><line x1="700" y1="2" x2="700" y2="8" /><line x1="733" y1="2" x2="733" y2="8" /><line x1="766" y1="2" x2="766" y2="8" /></g>
    </svg>
  </div>
  <p class="telemetry__outcome">A <b>production-grade portfolio</b>, two reusable workflows, and one clear boundary between AI generation and human judgment.</p>
</div>
</section>`;
}

function declarationSection() {
  return `<section class="centaur is-revealed" id="centaur" aria-label="Centaur Declaration" data-screen-label="03 Centaur Declaration">
<span class="margin-note">DRAWING 03</span>
<span class="fig-stamp">FIG. 03 · METHOD</span>
<dl class="section-stamp" aria-label="Section metadata">
  <dt>DRAWING NO.</dt><dd>03 / 06</dd>
  <dt>FRAMEWORK</dt><dd>CENTAUR (MOLLICK)</dd>
  <dt>SPLIT</dt><dd>HUMAN ↔ AI</dd>
  <dt>LAST REV.</dt><dd>04/26</dd>
</dl>
<div class="centaur__inner">
  <div class="centaur__head">
    <div>
      <p class="kicker">03 · METHOD · CENTAUR, NOT CYBORG</p>
      <h2 class="centaur__h2">Human in the saddle. <em>Always.</em></h2>
    </div>
    <svg class="case-schematic" viewBox="0 0 320 172" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" stroke="var(--ink-3)" stroke-width="0.8"><line x1="28" y1="128" x2="292" y2="128" /><line x1="28" y1="128" x2="28" y2="134" /><line x1="292" y1="128" x2="292" y2="134" /></g>
      <g transform="translate(96 58)"><circle r="32" fill="none" stroke="var(--accent)" stroke-width="1.2" /><circle r="22" fill="none" stroke="var(--accent)" stroke-width="0.5" stroke-dasharray="2 3" /><circle r="3" fill="var(--accent)" /></g>
      <g transform="translate(224 58)"><rect x="-32" y="-32" width="64" height="64" fill="none" stroke="var(--ink-3)" stroke-width="1" /><g stroke="var(--ink-3)" stroke-width="0.4"><line x1="-32" y1="-16" x2="32" y2="-16" /><line x1="-32" y1="0" x2="32" y2="0" /><line x1="-32" y1="16" x2="32" y2="16" /><line x1="-16" y1="-32" x2="-16" y2="32" /><line x1="0" y1="-32" x2="0" y2="32" /><line x1="16" y1="-32" x2="16" y2="32" /></g></g>
      <g stroke="var(--accent)" stroke-width="1.2" fill="var(--accent)"><line x1="188" y1="52" x2="136" y2="52" /><polygon points="136,52 142,49 142,55" /></g>
      <text x="162" y="46" font-family="ui-monospace, monospace" font-size="8" letter-spacing="1.4" fill="var(--accent)" text-anchor="middle">DRAFTS</text>
      <g stroke="var(--ink-2)" stroke-width="1" fill="var(--ink-2)"><line x1="136" y1="72" x2="188" y2="72" /><polygon points="188,72 182,69 182,75" /></g>
      <text x="162" y="86" font-family="ui-monospace, monospace" font-size="8" letter-spacing="1.4" fill="var(--ink-3)" text-anchor="middle">STEERING</text>
      <text x="96" y="118" font-family="ui-monospace, monospace" font-size="9" letter-spacing="2" fill="var(--ink-2)" text-anchor="middle">HUMAN</text>
      <text x="224" y="118" font-family="ui-monospace, monospace" font-size="9" letter-spacing="2" fill="var(--ink-2)" text-anchor="middle">AI</text>
      <text x="52" y="148" font-family="ui-monospace, monospace" font-size="7.5" letter-spacing="1.4" fill="var(--ink-3)" text-anchor="start">DECISIONS</text>
      <text x="268" y="148" font-family="ui-monospace, monospace" font-size="7.5" letter-spacing="1.4" fill="var(--ink-3)" text-anchor="end">GENERATION</text>
      <text x="160" y="162" font-family="ui-monospace, monospace" font-size="8.5" letter-spacing="2" fill="var(--ink-3)" text-anchor="middle">SADDLE LINE</text>
    </svg>
  </div>
  <div class="centaur__framing">
    <p>Ethan Mollick&apos;s framework distinguishes <b>Centaurs</b> — humans and AI dividing tasks, human steering — from <b>Cyborgs</b>, where the integration is total and inseparable.</p>
    <p>I&apos;m a Centaur. The structure of every page, the positioning decisions, the copy that sounds like me — those were mine. AI produced faster drafts, better variations, sharper critique than I could generate alone. <em>The decisions were mine.</em></p>
  </div>
  <div class="split" role="figure" aria-label="One concrete example of human / AI split">
    <div class="split__cell split__cell--ai">
      <p class="split__eyebrow split__eyebrow--ai"><span>AI GENERATED</span><span class="split__ref">REF · 03-A</span></p>
      <p class="split__quote">&quot;Matt Stangl is a strategic design leader who transforms complex enterprise challenges into measurable business outcomes through human-centered methodologies and systems thinking.&quot;</p>
      <p class="precision-tag" style="margin-top:auto">SOURCE · LLM DRAFT · COMPREHENSIVE PRESET</p>
    </div>
    <div class="split__cell split__cell--human">
      <p class="split__eyebrow split__eyebrow--human"><span>I CHANGED IT TO</span><span class="split__ref">REF · 03-B</span></p>
      <p class="split__quote">&quot;I rebuild fragmented enterprise experience as one operating model that actually ships.&quot;</p>
      <p class="precision-tag" style="margin-top:auto">SOURCE · MATT · POSITIONING PASS · 04/12</p>
    </div>
  </div>
  <div class="split__why"><span class="split__why-eyebrow">WHY · CAPTION</span> The AI version is <b>a job description</b>. Mine is <em>a positioning statement</em>. AI defaults to comprehensiveness; I default to specificity. <b>That pattern repeated across every piece of copy on this site.</b></div>
  <div class="centaur__pivot">
    <p>The hardest version of this lesson came in <b>week four</b>. I let AI write three case study pages end to end. The output was fluent, professional, and completely generic — the same portfolio language I&apos;d seen on a hundred other sites. <b>I tore it down and rebuilt from the real stories, the real pivots, the real metrics.</b> That version is what you&apos;re reading now.</p>
    <span class="centaur__pivot-marg" aria-hidden="true"><b>PIVOT · WK 04</b><span>FAILURE · LOGGED</span><span>FIG. 03 · ANNOT.</span></span>
  </div>
</div>
</section>`;
}

function signalRows() {
  return SIGNAL_ENTRIES.map((e, i) => {
    const live = e.live ? " signal-entry--live" : "";
    return `<article class="signal-entry signal-entry--filled${live}" aria-expanded="false" role="button" tabindex="0">
  <div class="signal-entry__date"><span><b>${e.date}</b></span><span>${e.wk}</span></div>
  <div class="signal-entry__node"><span class="signal-entry__dot"></span><span class="signal-entry__wk">${e.node}</span></div>
  <div class="signal-entry__main">
    <h4 class="signal-entry__title">${e.title}</h4>
    <p class="signal-entry__quote">${e.quote}</p>
    <p class="signal-entry__meta"><span><b>${e.commits}</b> commits</span><span><b>${e.deploys}</b> deploys</span><span class="signal-entry__expand">[+]</span></p>
  </div>
</article>`;
  }).join("\n");
}

let css = cssPieces.map((p) => fs.readFileSync(p, "utf8")).join("\n\n/* ---- bundle ---- */\n\n");
css += "\n" + EXPORT_EXTRA;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Centaur Practice · Case 01 — Export for Claude Design</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
<style>${css}</style>
</head>
<body>
<div class="tier-a-case-root">
${navHtml()}
<article class="impact-console relative min-h-screen" data-case="ai">
<main class="w-full max-w-none px-0">
<div class="tier-a-react-case">
<div class="case-centaur-portfolio case-ai-body is-revealed">
<a href="#hero" class="skip">Skip to content</a>

<section class="hero is-revealed" id="hero" aria-label="Hero" data-screen-label="01 Hero">
<span class="margin-note">DRAWING 01</span>
<span class="fig-stamp">FIG. 01 · HERO</span>
<div class="hero__plate">
  <div class="hero__bgphoto" aria-hidden="true">
    <img class="hero__bgphoto-img" src="case-studies/centaur-literal.png" alt="" decoding="async" />
    <div class="hero__bgphoto-halftone" aria-hidden="true"></div>
    <div class="hero__bgphoto-grain" aria-hidden="true"></div>
    <div class="hero__bgphoto-scrim" aria-hidden="true"></div>
    <div class="hero__bgphoto-fadebottom" aria-hidden="true"></div>
  </div>
  <div class="hero__plate-picker" data-zone="case-picker">${casePicker()}</div>
  <dl class="hero__id-strip" aria-label="Identity">
    <dt>CASE NO.</dt><dd>01 / 05</dd>
    <dt>BASED</dt><dd>DEN · REMOTE</dd>
    <dt>ROLE</dt><dd>DESIGN &amp; BUILD</dd>
    <dt>REV.</dt><dd>v2026.04</dd>
  </dl>
  <div class="hero__inner">
    <p class="hero__tag">CENTAUR PRACTICE · CASE 01 OF 05</p>
    <h1 class="hero__h1">I built this portfolio with AI, and kept the decisions <em>human.</em></h1>
    <p class="hero__sub">Six weeks. Four tools. One lesson I&apos;ll use for the rest of my career.<br /><b>AI raises the floor. Taste raises the ceiling.</b></p>
  </div>
</div>
<dl class="hero__meta">
  <div class="hero__meta-cell"><dt>Role</dt><dd>Design &amp; build lead</dd></div>
  <div class="hero__meta-cell"><dt>Timeline</dt><dd>Mar 6 — Apr 21, 2026</dd></div>
  <div class="hero__meta-cell"><dt>Stack</dt><dd>Cursor <b>·</b> Claude <b>·</b> Claude Design <b>·</b> Vercel</dd></div>
  <div class="hero__meta-cell"><dt>Model</dt><dd>Centaur — <b>human-steered</b></dd></div>
</dl>
</section>

${telemetrySection()}
${dimBetween("↓ METHOD · HOW THE WORK SPLIT")}
${declarationSection()}

<section class="records is-revealed" id="records" aria-label="Service Records" data-screen-label="04 Service Records">
${dimBetween("↓ ARTIFACTS · PROOF FOLLOWS", true)}
<span class="margin-note">DRAWING 04</span>
<span class="fig-stamp">FIG. 04 · ARTIFACTS</span>
<dl class="section-stamp" aria-label="Section metadata">
<dt>DRAWING NO.</dt><dd>04 / 06</dd>
<dt>RECORDS</dt><dd>03 · TAP / DRAG / TAP</dd>
<dt>STATUS</dt><dd>03 LIVE</dd>
<dt>LAST REV.</dt><dd>04/26</dd>
</dl>
<div class="records__inner">
<header class="case-section-head">
<div><p class="kicker">04 · SERVICE RECORDS</p><h2>Three artifacts. <em>Three interactions.</em></h2></div>
<p class="case-section-head__sub">A service record is what a mechanic logs when work is done — what changed, who did it, when, and why. Tap, drag, tap.</p>
</header>

<article class="record record--terminal is-revealed" id="record-review">
<header class="record__head">
<h3 class="record__title">Design Review Terminal</h3>
<p class="record__lede">Two critique passes, thirteen findings — <b>tap a pill</b> to narrow the log.</p>
</header>
<p class="record__eyebrow"><span class="ribbon">CLICK PILLS TO FILTER</span></p>
<div class="review-console" id="review-console">
<header class="review-console__head"><span class="review-console__path"><b>~/critique</b> · v2 · post-desktop</span></header>
<div class="review-console__filters" role="tablist" aria-label="Filter findings by severity">
${PILLS.map(
  ([key, label, count]) =>
    `<button type="button" class="filter-pill" data-filter="${key}" aria-pressed="${key === "all" ? "true" : "false"}">${label}<b>${count}</b></button>`,
).join("")}
</div>
<div class="review-console__body" id="findings-list">${findingsRows()}</div>
<footer class="review-console__foot" id="critique-log"><span>RUNTIME · 6 WEEKS · PASSES · 2 · SELF-AUTHORED</span><a href="#critique-log">OPEN FULL REVIEW LOG →</a></footer>
</div>
<p class="record__note record__note--column">Each finding is a <b>real critique</b> I made of my own work, with the decision and reversal logged. <b>Reversals</b> are when AI was right and I was wrong, or vice versa.</p>
</article>

<article class="record is-revealed" id="record-diff">
<header class="record__head">
<h3 class="record__title">Deployment Diff — Home Hero</h3>
<p class="record__caption">Commit <code style="font-family:var(--mono);color:var(--accent)">4a3f2c</code> → <code style="font-family:var(--mono);color:var(--accent)">9e1ab7</code> · two weeks apart</p>
</header>
<p class="record__eyebrow"><span class="ribbon">DRAG SLIDER</span><span>COMPARE V1 → V2 · TWO WEEKS APART</span></p>
<div class="diff" id="diff-slider" style="--diff-pos:50%">
<header class="diff__head"><span class="commit"><b>4a3f2c</b> · APR 08 · v1</span><span class="commit">v2 · APR 21 · <b>9e1ab7</b></span></header>
<div class="diff__viewport" tabindex="0" role="slider" aria-label="Compare v1 and v2 of home hero" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50">
<div class="diff__pane diff__pane--v1">
<span class="diff__pane-stamp">v1 · PRE-DESIGN</span>
<div class="diff__pane-card"><span class="diff__pane-label">v1 · COMMIT 4a3f2c</span><span class="diff__pane-name">Home hero capture · reference archive</span><span class="diff__pane-caption">desktop-1.png — current-state hero composition.</span><span class="diff__pane-tag">SCREENSHOT · 1280×720 · APR 08, 2026</span></div>
</div>
<div class="diff__pane diff__pane--v2">
<span class="diff__pane-stamp">v2 · POST-DESIGN · CAPTURED</span>
<div class="diff__pane-card"><span class="diff__pane-label">v2 · COMMIT 9e1ab7</span><span class="diff__pane-name">Home hero capture · Tier A v2</span><span class="diff__pane-caption">Tier A Home Page 1.png — Claude Design rebuild composition.</span><span class="diff__pane-tag">SCREENSHOT · CAPTURED · APR 21, 2026</span></div>
</div>
<div class="diff__markers">
<span class="diff__marker diff__marker--finding" data-side="v1" style="left:22%;top:28%"></span>
<span class="diff__marker diff__marker--finding" data-side="v1" style="left:68%;top:62%"></span>
<span class="diff__marker diff__marker--finding" data-side="v1" style="left:38%;top:78%"></span>
<span class="diff__marker diff__marker--decision" data-side="v2" style="left:22%;top:28%"></span>
<span class="diff__marker diff__marker--decision" data-side="v2" style="left:68%;top:62%"></span>
<span class="diff__marker diff__marker--decision" data-side="v2" style="left:38%;top:78%"></span>
</div>
<div class="diff__handle" aria-hidden="true"></div>
</div>
<footer class="diff__foot"><span class="legend"><span><i class="f"></i> v1 findings · <b>3</b></span><span><i class="d"></i> v2 decisions · <b>3</b></span></span><span class="hint">← → arrow keys</span></footer>
</div>
<p class="record__note">v1 was my best work without Claude Design. v2 is what happens when <b>AI extends the design system rather than just executes the spec.</b></p>
</article>

<article class="record record--signal is-revealed" id="record-signal">
<header class="record__head record__head--signal"><h3 class="record__title">Signal Telemetry</h3></header>
<p class="record__eyebrow"><span class="ribbon">TAP A ROW</span></p>
<div class="signal-log" id="signal-log">
<header class="signal-log__head"><span>6 weeks · MAR 06 → APR 21</span><span><b>105</b> commits · <b>29</b> deploys</span></header>
${signalRows()}
</div>
</article>
</div>
</section>

${dimBetween("↓ BULLETIN · WHERE I PAID")}
<section class="bulletin is-revealed" id="bulletin" aria-label="Service Bulletin" data-screen-label="05 Service Bulletin">
<span class="margin-note">DRAWING 05</span>
<span class="fig-stamp">FIG. 05 · BULLETIN</span>
<dl class="section-stamp" aria-label="Section metadata"><dt>DRAWING NO.</dt><dd>05 / 06</dd><dt>BULLETIN NO.</dt><dd>SB-2026-04</dd><dt>SEVERITY</dt><dd>FIELD ADVISORY</dd><dt>LAST REV.</dt><dd>04/26</dd></dl>
<div class="bulletin__inner">
<div class="bulletin__head">
<div><p class="kicker" style="color:#e86c54">05 · SERVICE BULLETIN · WHAT I GOT WRONG</p><h2 class="bulletin__h2">I skipped the brief twice. <em>I paid for it twice.</em></h2></div>
<svg class="bulletin__badge" viewBox="0 0 110 110" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
<circle cx="55" cy="55" r="50" fill="none" stroke="#e86c54" stroke-width="1.5" />
<circle cx="55" cy="55" r="42" fill="none" stroke="#e86c54" stroke-width="0.6" stroke-dasharray="3 3" />
<text x="55" y="48" font-family="ui-monospace, monospace" font-size="9" fill="#e86c54" letter-spacing="2" text-anchor="middle">SERVICE</text>
<text x="55" y="62" font-family="Inter, sans-serif" font-weight="500" font-size="14" fill="#e86c54" text-anchor="middle">BULLETIN</text>
<text x="55" y="76" font-family="ui-monospace, monospace" font-size="8" fill="#e86c54" letter-spacing="2" text-anchor="middle">SB-2026-04</text>
</svg></div>
<div class="bulletin__body"><p>I skipped the brief twice. Both times the failure mode was the same: <b>asking for output without specifying what mattered most.</b></p></div>
<div class="bulletin__entries">
<article class="bulletin__entry"><header class="bulletin__entry-head"><span class="bulletin__entry-ref">REF · 05-A</span><span>ONCE · IMPACT DASHBOARD</span></header><h3 class="bulletin__entry-title">Asked Cursor to &quot;design the impact dashboard.&quot;</h3><p class="bulletin__entry-body">No hierarchy, no metric priority, no interaction logic. Output was <b>technically correct and visually incoherent</b>. <b>Two hours fixing what a 15-minute brief would have prevented.</b></p></article>
<article class="bulletin__entry"><header class="bulletin__entry-head"><span class="bulletin__entry-ref">REF · 05-B</span><span>TWICE · CASE STUDIES</span></header><h3 class="bulletin__entry-title">Let AI write three case studies end to end.</h3><p class="bulletin__entry-body">Same root cause as above. <b>The fix was never less AI. It was more specificity.</b></p></article>
</div>
<aside class="tell" role="note"><span class="tell__eyebrow">THE TELL</span><p>The ratio of <em>presentation quality to case study depth</em> is the AI red flag.</p></aside>
</div>
</section>

${dimBetween("↓ HANDOFF · THE LARGER STORY")}
<section class="handoff is-revealed" aria-label="Handoff" data-screen-label="06 Handoff">
<span class="margin-note">DRAWING 06</span>
<span class="fig-stamp">FIG. 06 · HANDOFF</span>
<div class="handoff__inner">
<p class="handoff__eyebrow">06 · HANDOFF</p>
<h2 class="handoff__h">The work that made these decisions <em>possible.</em></h2>
<a class="handoff__cta" href="/case-studies/synthetic-users">Open next case · Synthetic Users</a>
<p class="handoff__alt"><a class="handoff__back-all" href="/case-studies">BACK TO ALL CASE STUDIES</a></p>
</div>
</section>

<footer class="sheet" aria-label="Sheet metadata">
<div class="sheet__cell"><span>SHEET</span><b>04 / 04</b></div>
<div class="sheet__cell"><span>DRAWN</span><b>M. STANGL</b></div>
<div class="sheet__cell"><span>BASED</span><b>DEN · REMOTE</b></div>
<div class="sheet__cell"><span>SCALE</span><b>1:1</b></div>
<div class="sheet__cell"><span>REV.</span><b>v2026.04</b></div>
<div class="sheet__cell"><span>PAGE</span><b>CASE 01 · CENTAUR</b></div>
</footer>

</div>
</div>
</main>
</article>
</div>
</body>
</html>`;

fs.writeFileSync(outFile, html, "utf8");
const kb = Math.round(fs.statSync(outFile).size / 1024);
console.log("Wrote", path.relative(root, outFile), `(${kb} KB)`);
console.log("Regenerate after design/copy changes: node scripts/export-centaur-html.mjs");
