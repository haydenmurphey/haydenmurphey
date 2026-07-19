/* global React, ReactDOM */
const { useState, useEffect, useRef } = React;
const { useLang, useClock, useIsMobile, Nav, MobileMenu, LINKS } = window.PF;

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

function AboutPanel({ t, isMobile, onCvClick, panelRef, visible }) {
  const handleCv = onCvClick ? (e) => { e.preventDefault(); onCvClick(); } : undefined;
  return (
    <section ref={panelRef} className={`about-panel${visible ? ' about-panel--visible' : ''}`}>
      <div className="about__content">
        <p className="about__label">{t.about_label}</p>
        <h2 className="about__title">
          {t.about_title_line1}<br />{t.about_title_line2}
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
    </section>
  );
}

function App({ showClock = true }) {
  const { lang, setLang, t } = useLang();
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  const urlParam = new URLSearchParams(window.location.search).get('v');
  const initialView = ['projects', 'cv', 'contact', 'design', 'writing'].includes(urlParam) ? urlParam : 'home';
  const [view, setView] = useState(initialView);
  const [contentPhase, setContentPhase] = useState("visible");
  const [hasScrolled, setHasScrolled] = useState(false);
  const [cueVisible, setCueVisible] = useState(false);
  const [aboutVisible, setAboutVisible] = useState(false);
  const [activePanel, setActivePanel] = useState(0);
  const [heroReentering, setHeroReentering] = useState(false);
  const transitioning = useRef(false);
  const aboutPanelRef = useRef(null);
  const panelsRef = useRef(null);
  const activePanelRef = useRef(0);
  const isTransitioning = useRef(false);
  const touchStartY = useRef(null);

  useEffect(() => { if (!isMobile && menuOpen) setMenuOpen(false); }, [isMobile, menuOpen]);

  useEffect(() => { activePanelRef.current = activePanel; }, [activePanel]);

  useEffect(() => {
    if (view === "home") {
      setHasScrolled(false);
      setCueVisible(false);
      setAboutVisible(false);
      setActivePanel(0);
      setHeroReentering(false);
      activePanelRef.current = 0;
    }
  }, [view]);

  useEffect(() => {
    if (view !== "home") return;
    const timer = setTimeout(() => setCueVisible(true), 1200);
    return () => clearTimeout(timer);
  }, [view]);

  function goToPanel(index) {
    if (isTransitioning.current || index === activePanelRef.current) return;
    isTransitioning.current = true;

    if (index === 1) {
      setActivePanel(1);
      setHasScrolled(true);
      setAboutVisible(true);
      setHeroReentering(false);
    } else {
      setActivePanel(0);
      setAboutVisible(false);
      setHeroReentering(false);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setHeroReentering(true))
      );
    }

    setTimeout(() => { isTransitioning.current = false; }, 820);
  }

  useEffect(() => {
    const el = panelsRef.current;
    if (!el || view !== 'home') return;

    const onWheel = (e) => {
      e.preventDefault();
      const dir = e.deltaY > 0 ? 1 : -1;
      goToPanel(Math.max(0, Math.min(1, activePanelRef.current + dir)));
    };

    const onTouchStart = (e) => { touchStartY.current = e.touches[0].clientY; };
    const onTouchEnd = (e) => {
      if (touchStartY.current === null) return;
      const delta = touchStartY.current - e.changedTouches[0].clientY;
      touchStartY.current = null;
      if (Math.abs(delta) < 40) return;
      const dir = delta > 0 ? 1 : -1;
      goToPanel(Math.max(0, Math.min(1, activePanelRef.current + dir)));
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, [view]);

  function transition(toView) {
    if (transitioning.current) return;
    transitioning.current = true;
    setMenuOpen(false);
    setContentPhase("exiting");
    // Keep the URL in sync so a refresh restores the current view.
    window.history.replaceState({}, '', toView === 'home' ? './' : './?v=' + toView);

    setTimeout(() => {
      setView(toView);
      setContentPhase("entering");
      requestAnimationFrame(() => {
        void document.body.offsetHeight;
        setContentPhase("visible");
        setTimeout(() => { transitioning.current = false; }, 400);
      });
    }, 300);
  }

  const { ProjectsView, CvView, ContactView, DesignView, WritingView } = window.PF;

  return (
    <div className={`page${view === "home" ? " page--home" : ""}${view === "contact" ? " page--contact" : ""}${view === "design" ? " page--design" : ""}`}>
      <Nav
        lang={lang}
        setLang={setLang}
        t={t}
        isMobile={isMobile}
        onMenuToggle={() => setMenuOpen((v) => !v)}
        activePage={view}
        onProjectsClick={view !== "projects" ? () => transition("projects") : null}
        onWritingClick={view !== "writing" ? () => transition("writing") : null}
        onCvClick={view !== "cv" ? () => transition("cv") : null}
        onContactClick={view !== "contact" ? () => transition("contact") : null}
        onDesignClick={view !== "design" ? () => transition("design") : null}
        onHomeClick={() => view !== "home" ? transition("home") : goToPanel(0)}
      />

      {view === "home" && (
        <div
          ref={panelsRef}
          className={`home-panels${activePanel === 1 ? ' home-panels--about' : ''}${contentPhase === "exiting" ? " view-exit" : ""}`}
        >
          <section className={`hero${isMobile ? " hero--mobile" : ""}${heroReentering ? " hero--reentering" : ""}`}>
            <HeroBody t={t} showClock={showClock} />
            {!hasScrolled && (
              <div className={`scroll-cue${cueVisible ? " scroll-cue--visible" : ""}`}>
                <span className="scroll-cue__arrow">▾</span>
                <span className="scroll-cue__label">{t.scroll}</span>
              </div>
            )}
          </section>
          <AboutPanel
            t={t}
            isMobile={isMobile}
            onCvClick={view !== "cv" ? () => transition("cv") : null}
            panelRef={aboutPanelRef}
            visible={aboutVisible}
          />
        </div>
      )}

      {view === "projects" && (
        <ProjectsView
          lang={lang}
          isMobile={isMobile}
          contentPhase={contentPhase}
        />
      )}

      {view === "cv" && (
        <CvView
          lang={lang}
          isMobile={isMobile}
          contentPhase={contentPhase}
        />
      )}

      {view === "contact" && (
        <ContactView lang={lang} isMobile={isMobile} contentPhase={contentPhase} />
      )}

      {view === "design" && (
        <DesignView lang={lang} isMobile={isMobile} contentPhase={contentPhase} />
      )}

      {view === "writing" && (
        <WritingView lang={lang} isMobile={isMobile} contentPhase={contentPhase} />
      )}

      {isMobile && menuOpen && (
        <MobileMenu
          lang={lang}
          setLang={setLang}
          t={t}
          activePage={view}
          onClose={() => setMenuOpen(false)}
          onProjectsClick={view !== "projects" ? () => { setMenuOpen(false); transition("projects"); } : null}
          onWritingClick={view !== "writing" ? () => { setMenuOpen(false); transition("writing"); } : null}
          onCvClick={view !== "cv" ? () => { setMenuOpen(false); transition("cv"); } : null}
          onContactClick={view !== "contact" ? () => { setMenuOpen(false); transition("contact"); } : null}
          onDesignClick={view !== "design" ? () => { setMenuOpen(false); transition("design"); } : null}
        />
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
