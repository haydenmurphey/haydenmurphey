/* global React, ReactDOM */
const { useState, useEffect, useRef } = React;
const { STRINGS, useClock, useIsMobile, Nav, MobileMenu, CursorDot, LINKS } = window.PF;

function HeroBody({ t, showClock }) {
  const { time, tz } = useClock();
  return (
    <div className="hero__bottom">
      <div className="hero__tagrow">
        <p className="tagline">{t.tagline}</p>
        {showClock && (
          <span className="clock">
            {time} · {tz}
          </span>
        )}
      </div>
      <div className="name">
        <div className="name__line">
          H<span className="name__suffix name__suffix--hayden">AYDEN</span>
        </div>
        <div className="name__line">
          M<span className="name__suffix name__suffix--murphey">URPHEY</span>
        </div>
      </div>
    </div>
  );
}

function AboutPanel({ t, onCvClick, visible }) {
  const handleCv = onCvClick ? (e) => { e.preventDefault(); onCvClick(); } : undefined;
  return (
    <div className={`about-panel${visible ? ' about-panel--visible' : ''}`}>
      <div className="about__content">
        <p className="about__label">{t.about_label}</p>
        <h2 className="about__title">
          {t.about_title_line1}
        </h2>
        <p className="about__bio">{t.about_bio}</p>
        <p className="about__skills">{t.about_skills}</p>
        <div className="about__rule" />
        <div className="about__links">
          <a className="about__link" href={LINKS.cv} onClick={handleCv}>
            → {t.about_cv}
          </a>
          <a className="about__link" href={LINKS.github} target="_blank" rel="noreferrer">
            → {t.about_github}
          </a>
        </div>
      </div>
    </div>
  );
}

/* ── The deck ──────────────────────────────────────────────
   The whole site is one vertical deck of full-screen panels:
   name → about → projects → design → cv → contact. Scrolling
   (wheel / swipe / arrow keys) first steps through a panel's own
   items (projects, cv, mobile design carousel) and, at its edge,
   slides to the next panel. The Nav sits above the deck and never
   unmounts, so the header stays put while panels slide under it.
   ────────────────────────────────────────────────────────── */
const SECTIONS = ['home', 'about', 'projects', 'design', 'cv', 'contact'];
// Sections with a canonical clean path; 'about' shares '/' with the hero.
const PATHS = { home: '/', about: '/', projects: '/projects/', design: '/design/', cv: '/cv/', contact: '/contact/' };

const SLIDE_MS = 720;        // matches the CSS transform transition
const STEP_LOCK_MS = 450;    // pause after an in-panel step
const GESTURE_GAP_MS = 150;  // wheel silence that marks a new gesture (tames trackpad momentum)
const SWIPE_MIN = 40;

function initialIndex() {
  const seg = window.location.pathname.replace(/^\/+|\/+$/g, '').split('/')[0];
  const urlParam = new URLSearchParams(window.location.search).get('v');
  const i = SECTIONS.indexOf(seg) > 1 ? SECTIONS.indexOf(seg) : SECTIONS.indexOf(urlParam);
  return i > 1 ? i : 0;
}

// Can this element scroll natively any further in direction dir (+1 down / -1 up)?
function canScroll(el, dir) {
  if (!el || el.scrollHeight <= el.clientHeight + 1) return false;
  return dir > 0
    ? el.scrollTop + el.clientHeight < el.scrollHeight - 1
    : el.scrollTop > 0;
}

function App({ showClock = true }) {
  const t = STRINGS;
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState(initialIndex);
  const [prev, setPrev] = useState(null);        // panel sliding out (animates alongside the new one)
  const [hasScrolled, setHasScrolled] = useState(active !== 0);
  const [cueVisible, setCueVisible] = useState(false);
  const [heroReentering, setHeroReentering] = useState(false);

  const activeRef = useRef(active);
  const lockUntil = useRef(0);
  const lastWheel = useRef(0);
  const touchStart = useRef(null);
  const deckRef = useRef(null);
  const panelEls = useRef([]);
  // Each stepping view registers fn(dir) → true if it handled the step internally.
  const steps = useRef({});

  useEffect(() => { if (!isMobile && menuOpen) setMenuOpen(false); }, [isMobile, menuOpen]);

  useEffect(() => {
    const timer = setTimeout(() => setCueVisible(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  function goTo(index) {
    const next = Math.max(0, Math.min(SECTIONS.length - 1, index));
    const cur = activeRef.current;
    setMenuOpen(false);
    if (next === cur) return;
    activeRef.current = next;
    lockUntil.current = performance.now() + SLIDE_MS + 30;
    setPrev(cur);
    setActive(next);
    if (next !== 0) setHasScrolled(true);
    window.history.replaceState({}, '', PATHS[SECTIONS[next]]);
    // Replay the name reveal whenever we land back on the hero.
    setHeroReentering(false);
    if (next === 0) requestAnimationFrame(() => requestAnimationFrame(() => setHeroReentering(true)));
    const content = panelEls.current[next];
    if (content) content.scrollTop = 0;
  }

  // One step in direction dir: in-panel first, then the next/previous panel.
  function step(dir, { advance = true } = {}) {
    const now = performance.now();
    if (now < lockUntil.current) return;
    const inner = steps.current[SECTIONS[activeRef.current]];
    if (inner && inner(dir)) {
      lockUntil.current = now + STEP_LOCK_MS;
      return;
    }
    if (advance) goTo(activeRef.current + dir);
  }

  const stepRef = useRef(step);
  stepRef.current = step;

  // Single input controller for the whole deck.
  useEffect(() => {
    const deck = deckRef.current;
    if (!deck) return;
    const panel = () => panelEls.current[activeRef.current];

    const onWheel = (e) => {
      if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
      const dir = e.deltaY > 0 ? 1 : -1;
      if (canScroll(panel(), dir)) return;        // let a tall panel scroll natively first
      e.preventDefault();
      const now = performance.now();
      const gap = now - lastWheel.current;
      lastWheel.current = now;
      if (Math.abs(e.deltaY) < 4 || gap < GESTURE_GAP_MS) return;
      stepRef.current(dir);
    };

    const onTouchStart = (e) => {
      touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, scrollTop: panel() ? panel().scrollTop : 0 };
    };
    const onTouchEnd = (e) => {
      const s = touchStart.current;
      touchStart.current = null;
      if (!s) return;
      const dx = s.x - e.changedTouches[0].clientX;
      const dy = s.y - e.changedTouches[0].clientY;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
        stepRef.current(dx > 0 ? 1 : -1, { advance: false });   // horizontal: in-panel carousel only
        return;
      }
      if (Math.abs(dy) < SWIPE_MIN) return;
      const dir = dy > 0 ? 1 : -1;
      // A tall panel must be scrolled to its edge (before this swipe began) to hand off.
      const el = panel();
      if (el && el.scrollHeight > el.clientHeight + 1) {
        const atTop = s.scrollTop <= 0;
        const atBottom = s.scrollTop + el.clientHeight >= el.scrollHeight - 1;
        if ((dir < 0 && !atTop) || (dir > 0 && !atBottom)) return;
      }
      stepRef.current(dir);
    };

    const onKey = (e) => {
      if (e.target.closest && e.target.closest('input, textarea, select, [contenteditable]')) return;
      const down = ['ArrowDown', 'PageDown', ' '].includes(e.key);
      const up = ['ArrowUp', 'PageUp'].includes(e.key);
      if (down || up) {
        e.preventDefault();
        stepRef.current(down ? 1 : -1);
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        stepRef.current(e.key === 'ArrowRight' ? 1 : -1, { advance: false });
      }
    };

    deck.addEventListener('wheel', onWheel, { passive: false });
    deck.addEventListener('touchstart', onTouchStart, { passive: true });
    deck.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('keydown', onKey);
    return () => {
      deck.removeEventListener('wheel', onWheel);
      deck.removeEventListener('touchstart', onTouchStart);
      deck.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  const { ProjectsView, CvView, ContactView, DesignView } = window.PF;
  const go = (name) => () => goTo(SECTIONS.indexOf(name));
  const register = (name) => (fn) => { steps.current[name] = fn; };

  const panels = {
    home: (
      <section className={`hero${isMobile ? " hero--mobile" : ""}${heroReentering ? " hero--reentering" : ""}`}>
        <HeroBody t={t} showClock={showClock} />
        {!hasScrolled && (
          <div className={`scroll-cue${cueVisible ? " scroll-cue--visible" : ""}`}>
            <span className="scroll-cue__arrow">▾</span>
            <span className="scroll-cue__label">{t.scroll}</span>
          </div>
        )}
      </section>
    ),
    about:    <AboutPanel t={t} onCvClick={go('cv')} visible={active === 1} />,
    projects: <ProjectsView isMobile={isMobile} registerStep={register('projects')} />,
    design:   <DesignView isMobile={isMobile} registerStep={register('design')} />,
    cv:       <CvView isMobile={isMobile} registerStep={register('cv')} />,
    contact:  <ContactView isMobile={isMobile} />,
  };

  const navTarget = SECTIONS[active];
  const navHandlers = {
    onProjectsClick: go('projects'),
    onDesignClick:   go('design'),
    onCvClick:       go('cv'),
    onContactClick:  go('contact'),
  };

  return (
    <div className="page page--home">
      <Nav
        t={t}
        isMobile={isMobile}
        onMenuToggle={() => setMenuOpen((v) => !v)}
        activePage={navTarget}
        onHomeClick={go('home')}
        {...navHandlers}
      />

      <div ref={deckRef} className="home-panels">
        {SECTIONS.map((name, i) => {
          const state = i === active ? 'current' : i < active ? 'past' : 'future';
          const animating = i === active || i === prev;
          return (
            <div
              key={name}
              ref={(el) => { panelEls.current[i] = el; }}
              className={`deck-panel deck-panel--${name}${animating ? ' deck-panel--animate' : ''}${state === 'current' ? ' deck-panel--current' : ''}`}
              data-state={state}
              aria-hidden={state !== 'current'}
            >
              {panels[name]}
            </div>
          );
        })}
      </div>

      {isMobile && menuOpen && (
        <MobileMenu
          t={t}
          activePage={navTarget}
          onClose={() => setMenuOpen(false)}
          {...navHandlers}
        />
      )}

      <CursorDot />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
