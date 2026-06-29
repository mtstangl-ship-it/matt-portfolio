import { forwardRef } from "react";
import type { CSSProperties } from "react";

export const EyCaseTallyFigure = forwardRef<HTMLElement>(function EyCaseTallyFigure(_, ref) {
  return (
    <figure ref={ref} className="tally" aria-label="Trust-currency hours tally">
            <header className="tally__head">
              <span><b>FIG. 03-A</b> · HOURS TALLY · 3 TRUST CATEGORIES · 40 LIVE HOURS</span>
              <span>FIELD-COUNTED · AUG 2021</span>
            </header>
    
            <div className="tally__board">
              <div className="tally__graph" aria-hidden="true"></div>
    
              <div className="tally__col" data-currency="confidence">
                <header className="tally__col-head">
                  <span className="tally__col-num">CUR 01</span>
                  <span className="tally__col-name">CONFIDENCE</span>
                  <span className="tally__col-sub">trust before message</span>
                </header>
    
                <div className="tally__marks">
                  <svg className="tally-set" viewBox="0 0 60 40" preserveAspectRatio="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 6 4 L 6 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" pathLength="100" className="tally-mark" style={{ ["--i"]: 0 } as CSSProperties}/>
                    <path d="M 16 4 L 16 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" pathLength="100" className="tally-mark" style={{ ["--i"]: 1 } as CSSProperties}/>
                    <path d="M 26 4 L 26 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" pathLength="100" className="tally-mark" style={{ ["--i"]: 2 } as CSSProperties}/>
                    <path d="M 36 4 L 36 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" pathLength="100" className="tally-mark" style={{ ["--i"]: 3 } as CSSProperties}/>
                    <path d="M 2 32 L 42 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" pathLength="100" className="tally-mark" style={{ ["--i"]: 4 } as CSSProperties}/>
                  </svg>
                  <svg className="tally-set" viewBox="0 0 60 40" preserveAspectRatio="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 6 4 L 6 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" pathLength="100" className="tally-mark" style={{ ["--i"]: 5 } as CSSProperties}/>
                    <path d="M 16 4 L 16 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" pathLength="100" className="tally-mark" style={{ ["--i"]: 6 } as CSSProperties}/>
                    <path d="M 26 4 L 26 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" pathLength="100" className="tally-mark" style={{ ["--i"]: 7 } as CSSProperties}/>
                    <path d="M 36 4 L 36 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" pathLength="100" className="tally-mark" style={{ ["--i"]: 8 } as CSSProperties}/>
                    <path d="M 2 32 L 42 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" pathLength="100" className="tally-mark" style={{ ["--i"]: 9 } as CSSProperties}/>
                  </svg>
                  <p className="tally__partner"><b>CORE Georgia</b> · Health Districts · Pfizer/J&J choice</p>
                </div>
    
                <div className="tally__marks">
                  <svg className="tally-set" viewBox="0 0 60 40" preserveAspectRatio="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 6 4 L 6 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" pathLength="100" className="tally-mark" style={{ ["--i"]: 10 } as CSSProperties}/>
                    <path d="M 16 4 L 16 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" pathLength="100" className="tally-mark" style={{ ["--i"]: 11 } as CSSProperties}/>
                    <path d="M 26 4 L 26 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" pathLength="100" className="tally-mark" style={{ ["--i"]: 12 } as CSSProperties}/>
                    <path d="M 36 4 L 36 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" pathLength="100" className="tally-mark" style={{ ["--i"]: 13 } as CSSProperties}/>
                    <path d="M 2 32 L 42 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" pathLength="100" className="tally-mark" style={{ ["--i"]: 14 } as CSSProperties}/>
                  </svg>
                  <svg className="tally-set" viewBox="0 0 60 40" preserveAspectRatio="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 6 4 L 6 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" pathLength="100" className="tally-mark" style={{ ["--i"]: 15 } as CSSProperties}/>
                  </svg>
                  <p className="tally__partner"><b>UGA Vaccine Ambassadors</b> · on-site conversation, not pitch</p>
                </div>
    
                <p className="tally__subtotal">Σ <b>16 hrs</b></p>
              </div>
    
              <div className="tally__col" data-currency="awareness">
                <header className="tally__col-head">
                  <span className="tally__col-num">CUR 02</span>
                  <span className="tally__col-name">AWARENESS</span>
                  <span className="tally__col-sub">reasons to stay</span>
                </header>
    
                <div className="tally__marks">
                  <svg className="tally-set" viewBox="0 0 60 40" preserveAspectRatio="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 6 4 L 6 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" pathLength="100" className="tally-mark" style={{ ["--i"]: 16 } as CSSProperties}/>
                    <path d="M 16 4 L 16 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" pathLength="100" className="tally-mark" style={{ ["--i"]: 17 } as CSSProperties}/>
                    <path d="M 26 4 L 26 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" pathLength="100" className="tally-mark" style={{ ["--i"]: 18 } as CSSProperties}/>
                    <path d="M 36 4 L 36 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" pathLength="100" className="tally-mark" style={{ ["--i"]: 19 } as CSSProperties}/>
                    <path d="M 2 32 L 42 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" pathLength="100" className="tally-mark" style={{ ["--i"]: 20 } as CSSProperties}/>
                  </svg>
                  <svg className="tally-set" viewBox="0 0 60 40" preserveAspectRatio="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 6 4 L 6 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" pathLength="100" className="tally-mark" style={{ ["--i"]: 21 } as CSSProperties}/>
                    <path d="M 16 4 L 16 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" pathLength="100" className="tally-mark" style={{ ["--i"]: 22 } as CSSProperties}/>
                    <path d="M 26 4 L 26 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" pathLength="100" className="tally-mark" style={{ ["--i"]: 23 } as CSSProperties}/>
                    <path d="M 36 4 L 36 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" pathLength="100" className="tally-mark" style={{ ["--i"]: 24 } as CSSProperties}/>
                    <path d="M 2 32 L 42 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" pathLength="100" className="tally-mark" style={{ ["--i"]: 25 } as CSSProperties}/>
                  </svg>
                  <p className="tally__partner"><b>Living Walls</b> muralists · bluegrass · Twilight Criterium</p>
                </div>
    
                <div className="tally__marks">
                  <svg className="tally-set" viewBox="0 0 60 40" preserveAspectRatio="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 6 4 L 6 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" pathLength="100" className="tally-mark" style={{ ["--i"]: 26 } as CSSProperties}/>
                    <path d="M 16 4 L 16 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" pathLength="100" className="tally-mark" style={{ ["--i"]: 27 } as CSSProperties}/>
                    <path d="M 26 4 L 26 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" pathLength="100" className="tally-mark" style={{ ["--i"]: 28 } as CSSProperties}/>
                    <path d="M 36 4 L 36 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" pathLength="100" className="tally-mark" style={{ ["--i"]: 29 } as CSSProperties}/>
                  </svg>
                  <p className="tally__partner"><b>Live painters</b> · chalkboards · Savannah Bananas</p>
                </div>
    
                <p className="tally__subtotal">Σ <b>14 hrs</b></p>
              </div>
    
              <div className="tally__col" data-currency="access">
                <header className="tally__col-head">
                  <span className="tally__col-num">CUR 03</span>
                  <span className="tally__col-name">ACCESS</span>
                  <span className="tally__col-sub">on the same block</span>
                </header>
    
                <div className="tally__marks">
                  <svg className="tally-set" viewBox="0 0 60 40" preserveAspectRatio="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 6 4 L 6 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" pathLength="100" className="tally-mark" style={{ ["--i"]: 30 } as CSSProperties}/>
                    <path d="M 16 4 L 16 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" pathLength="100" className="tally-mark" style={{ ["--i"]: 31 } as CSSProperties}/>
                    <path d="M 26 4 L 26 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" pathLength="100" className="tally-mark" style={{ ["--i"]: 32 } as CSSProperties}/>
                    <path d="M 36 4 L 36 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" pathLength="100" className="tally-mark" style={{ ["--i"]: 33 } as CSSProperties}/>
                    <path d="M 2 32 L 42 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" pathLength="100" className="tally-mark" style={{ ["--i"]: 34 } as CSSProperties}/>
                  </svg>
                  <p className="tally__partner"><b>Forsyth Market</b> · UGA campus · Georgia Aquarium</p>
                </div>
    
                <div className="tally__marks">
                  <svg className="tally-set" viewBox="0 0 60 40" preserveAspectRatio="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 6 4 L 6 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" pathLength="100" className="tally-mark" style={{ ["--i"]: 35 } as CSSProperties}/>
                    <path d="M 16 4 L 16 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" pathLength="100" className="tally-mark" style={{ ["--i"]: 36 } as CSSProperties}/>
                    <path d="M 26 4 L 26 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" pathLength="100" className="tally-mark" style={{ ["--i"]: 37 } as CSSProperties}/>
                    <path d="M 36 4 L 36 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" pathLength="100" className="tally-mark" style={{ ["--i"]: 38 } as CSSProperties}/>
                    <path d="M 2 32 L 42 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" pathLength="100" className="tally-mark" style={{ ["--i"]: 39 } as CSSProperties}/>
                  </svg>
                  <p className="tally__partner"><b>Pemberton Place</b> · civil rights district · same-block placement</p>
                </div>
    
                <p className="tally__subtotal">Σ <b>10 hrs</b></p>
              </div>
            </div>
    
            
            <div className="tally__sum" aria-label="Hours summed">
              <svg className="tally__sumline" viewBox="0 0 1000 24" preserveAspectRatio="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                <path d="M 4 12 L 996 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" pathLength="100" className="tally__sumline-path"/>
                <path d="M 4 6 L 4 18" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                <path d="M 996 6 L 996 18" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
              </svg>
              <p className="tally__arrow">Σ LIVE HOURS</p>
            </div>
    
            <div className="tally__total" aria-label="Hours total">
              <span className="tally__total-eq">=</span>
              <span className="tally__total-num">40</span>
              <svg className="tally__total-underline" viewBox="0 0 200 14" preserveAspectRatio="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                <path d="M 2 8 Q 50 2, 100 7 T 198 6" stroke="currentColor" strokeWidth="1.2" fill="none" pathLength="100" className="tally__total-underline-path"/>
              </svg>
              <span className="tally__total-cap"><b>live hours</b> · 3 trust categories · 10 events</span>
            </div>
    
            <p className="tally__yields"><span className="tally__yields-eyebrow">WHICH YIELDED →</span> <b>715 vaccinations</b> · over 40 live hours · across 10 events</p>
          </figure>
  );
});
