"use client";

import { useState } from "react";

/**
 * Service Assembly · five-phase customer-planning blueprint with tier toggle.
 *
 * Lifted from the legacy `/case-studies/autodesk` route's `.adsk-hero` block
 * (`src/content/cases/autodesk.html`) and ported to React. Visual layout,
 * column structure, frontstage/backstage divider, and per-phase content are
 * preserved verbatim. Imperative DOM tier-toggle is replaced by a `data-tier`
 * attribute on the wrapper, driven by `useState`. Generic class names are
 * `autodesk-` prefixed per BUILD-NOTES "Generic-named class collision risk".
 *
 * Counter strip swap: the legacy `$50M+ AOV` cell is CUT per
 * `COPY-case-autodesk.md` ACCURACY NOTES — those metrics live on Impact/Home,
 * not this page. Replaced with journey-design-focused counters.
 */
export function AutodeskJourneyArtifact() {
  const [tier, setTier] = useState<"growth" | "nurture">("growth");

  return (
    <section
      className="autodesk-blueprint"
      data-tier={tier}
      aria-label="Future journey and backstage blueprint"
    >
      <div className="autodesk-bp-head">
        <span className="autodesk-bp-head-k">FUTURE.JOURNEY + BACKSTAGE</span>
        <span className="autodesk-bp-head-t">
          End-to-end post-purchase experience · one journey, two service tiers
        </span>
        <span className="autodesk-bp-head-spacer" />
        <span className="autodesk-tier-toggle" role="radiogroup" aria-label="Service tier">
          <button
            type="button"
            role="radio"
            aria-checked={tier === "growth"}
            data-tier="growth"
            onClick={() => setTier("growth")}
          >
            ● GROWTH PLUS <small>~700–1000</small>
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={tier === "nurture"}
            data-tier="nurture"
            onClick={() => setTier("nurture")}
          >
            ● NURTURE PLUS <small>~400–600</small>
          </button>
        </span>
      </div>

      <div className="autodesk-bp-stage">
        <div className="autodesk-bp-grid">
          {/* JOURNEY · phase headers */}
          <div className="autodesk-bp-col autodesk-bp-axis">
            <span className="autodesk-bp-rail-k">JOURNEY</span>
          </div>
          <div className="autodesk-bp-col" data-phase="1">
            <div className="autodesk-bp-phase">
              <span className="autodesk-bp-idx">01</span>
              <span className="autodesk-bp-ttl">Identify outcomes</span>
              <span className="autodesk-bp-sub">
                Establish trust. Inform &amp; inspire decision-makers. Align &amp; prioritize outcomes.
              </span>
            </div>
          </div>
          <div className="autodesk-bp-col" data-phase="2">
            <div className="autodesk-bp-phase">
              <span className="autodesk-bp-idx">02</span>
              <span className="autodesk-bp-ttl">Evaluate solutions</span>
              <span className="autodesk-bp-sub">
                Assess current state. Design &amp; validate new solutions. Create &amp; present the business case.
              </span>
            </div>
          </div>
          <div className="autodesk-bp-col" data-phase="3">
            <div className="autodesk-bp-phase">
              <span className="autodesk-bp-idx">03</span>
              <span className="autodesk-bp-ttl">Create a plan</span>
              <span className="autodesk-bp-sub">
                Define milestones, metrics, R&amp;R. Prioritize &amp; schedule. Source &amp; customize content.
              </span>
            </div>
          </div>
          <div className="autodesk-bp-col" data-phase="4">
            <div className="autodesk-bp-phase">
              <span className="autodesk-bp-idx">04</span>
              <span className="autodesk-bp-ttl">Execute the plan</span>
              <span className="autodesk-bp-sub">
                Inspire &amp; upskill users. Support project adoption. Track progress &amp; update plan.
              </span>
            </div>
          </div>
          <div className="autodesk-bp-col" data-phase="5">
            <div className="autodesk-bp-phase">
              <span className="autodesk-bp-idx">05</span>
              <span className="autodesk-bp-ttl">Assess the value</span>
              <span className="autodesk-bp-sub">
                Track &amp; measure value realized. Communicate achievements. Optimize solution value.
              </span>
            </div>
          </div>

          {/* FRONTSTAGE · tier-varying */}
          <div className="autodesk-bp-col autodesk-bp-axis">
            <span className="autodesk-bp-rail-k">FRONTSTAGE</span>
            <span className="autodesk-bp-rail-sub" data-tier-show="growth">
              High-touch · ADSK &amp; Partner-led
            </span>
            <span className="autodesk-bp-rail-sub" data-tier-show="nurture">
              Medium-touch · digital-guided
            </span>
          </div>
          <div className="autodesk-bp-col">
            <ul className="autodesk-bp-acts" data-tier-show="growth">
              <li className="autodesk-bp-acts-star">Executive programs (1:few)</li>
              <li>Innovation &amp; thought-leadership</li>
              <li>Business alignment workshops</li>
              <li>EBRs &amp; outcome reviews</li>
            </ul>
            <ul className="autodesk-bp-acts" data-tier-show="nurture">
              <li className="autodesk-bp-acts-star">Executive engagements (1:many)</li>
              <li>QBR · outcomes &amp; value review</li>
              <li className="autodesk-bp-acts-help">Outcome alignment workshops</li>
            </ul>
          </div>
          <div className="autodesk-bp-col">
            <ul className="autodesk-bp-acts" data-tier-show="growth">
              <li className="autodesk-bp-acts-star">Capability &amp; workflow assessment</li>
              <li>Technical demonstrations</li>
              <li>Custom solution design</li>
              <li>Validate in pilots · build a business case</li>
            </ul>
            <ul className="autodesk-bp-acts" data-tier-show="nurture">
              <li className="autodesk-bp-acts-star">Coordinated solution evaluation</li>
              <li>Test &amp; validate in trial</li>
              <li className="autodesk-bp-acts-help">Capability assessment · Tech demo</li>
            </ul>
          </div>
          <div className="autodesk-bp-col">
            <ul className="autodesk-bp-acts" data-tier-show="growth">
              <li className="autodesk-bp-acts-star">Success planning workshops</li>
              <li>Value planning workshops</li>
              <li>
                Implementation planning<sup>$</sup>
              </li>
              <li>
                Custom training development<sup>$</sup>
              </li>
            </ul>
            <ul className="autodesk-bp-acts" data-tier-show="nurture">
              <li className="autodesk-bp-acts-star">Guided roll-out planning</li>
              <li>Reference plans &amp; learning paths</li>
              <li className="autodesk-bp-acts-help">
                Value planning · Implementation<sup>$</sup>
              </li>
            </ul>
          </div>
          <div className="autodesk-bp-col">
            <ul className="autodesk-bp-acts" data-tier-show="growth">
              <li className="autodesk-bp-acts-star">Frequent initiative check-ins</li>
              <li>
                Deployment assistance<sup>$</sup>
              </li>
              <li>
                Project training &amp; coaching<sup>$</sup>
              </li>
              <li>
                Technical health reviews<sup>$</sup>
              </li>
            </ul>
            <ul className="autodesk-bp-acts" data-tier-show="nurture">
              <li className="autodesk-bp-acts-star">QBR · outcomes &amp; value review</li>
              <li>Monitor health · escalate issues</li>
              <li className="autodesk-bp-acts-help">
                Deployment · Coaching<sup>$</sup>
              </li>
            </ul>
          </div>
          <div className="autodesk-bp-col">
            <ul className="autodesk-bp-acts" data-tier-show="growth">
              <li className="autodesk-bp-acts-star">QBRs · review outcomes &amp; value</li>
              <li>Roadmap &amp; feature request review</li>
              <li>Case studies · product roadmap sessions</li>
            </ul>
            <ul className="autodesk-bp-acts" data-tier-show="nurture">
              <li className="autodesk-bp-acts-star">QBR · outcomes &amp; value review</li>
              <li>Product roadmap reviews</li>
              <li className="autodesk-bp-acts-help">Create &amp; share case studies</li>
            </ul>
          </div>

          {/* BACKSTAGE · tier-agnostic */}
          <div className="autodesk-bp-col autodesk-bp-axis autodesk-bp-col--backstage">
            <span className="autodesk-bp-rail-k">BACKSTAGE</span>
            <span className="autodesk-bp-rail-sub">People · Process · Platform</span>
          </div>
          <div className="autodesk-bp-col autodesk-bp-col--backstage">
            <span className="autodesk-bp-bs">
              <b>People</b> · Sales + CSM enabled on common CBI method
            </span>
            <span className="autodesk-bp-bs">
              <b>Process</b> · Outcome discovery, standard-yet-flexible
            </span>
            <span className="autodesk-bp-bs">
              <b>Platform</b> · Gainsight playbooks · SFDC signal
            </span>
          </div>
          <div className="autodesk-bp-col autodesk-bp-col--backstage">
            <span className="autodesk-bp-bs">
              <b>People</b> · Partners + Tech Sales on ROI &amp; assessment
            </span>
            <span className="autodesk-bp-bs">
              <b>Process</b> · Shared ROI projection templates
            </span>
            <span className="autodesk-bp-bs">
              <b>Platform</b> · Solution &amp; reference architecture library
            </span>
          </div>
          <div className="autodesk-bp-col autodesk-bp-col--backstage">
            <span className="autodesk-bp-bs">
              <b>People</b> · Value consultants on success &amp; value planning
            </span>
            <span className="autodesk-bp-bs">
              <b>Process</b> · Standard method for success planning
            </span>
            <span className="autodesk-bp-bs">
              <b>Platform</b> · Plan telemetry · learning content routing
            </span>
          </div>
          <div className="autodesk-bp-col autodesk-bp-col--backstage">
            <span className="autodesk-bp-bs">
              <b>People</b> · Partners + CSMs on adoption &amp; change mgmt
            </span>
            <span className="autodesk-bp-bs">
              <b>Process</b> · Real-time activity, status, goal tracking
            </span>
            <span className="autodesk-bp-bs">
              <b>Platform</b> · Shared customer health · tier-aware alerts
            </span>
          </div>
          <div className="autodesk-bp-col autodesk-bp-col--backstage">
            <span className="autodesk-bp-bs">
              <b>People</b> · Partners + CSMs on value measurement
            </span>
            <span className="autodesk-bp-bs">
              <b>Process</b> · Standard value-tracking &amp; roadmap review
            </span>
            <span className="autodesk-bp-bs">
              <b>Platform</b> · Value dashboards · case-study authoring
            </span>
          </div>
        </div>
      </div>

      <div className="autodesk-bp-foot" aria-label="Journey summary">
        <div className="autodesk-bp-counter">
          <span className="autodesk-bp-counter-v">
            <em>5</em> phases
          </span>
          <span className="autodesk-bp-counter-k">One end-to-end journey · two delivery tiers</span>
        </div>
        <div className="autodesk-bp-counter">
          <span className="autodesk-bp-counter-v">
            <em>2</em> service tiers
          </span>
          <span className="autodesk-bp-counter-k">Growth Plus + Nurture Plus · same backstage</span>
        </div>
        <div className="autodesk-bp-counter">
          <span className="autodesk-bp-counter-v">
            <em>4</em> CSXD phases
          </span>
          <span className="autodesk-bp-counter-k">Understand → Define → Develop → Deliver</span>
        </div>
      </div>
    </section>
  );
}
