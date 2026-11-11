/* global React */
/* ============================================================
   shared.jsx — reusable across every page of the portfolio.
   Exposes on `window.PF`: LINKS, STRINGS, useClock, useIsMobile,
   Nav, MobileMenu, CursorDot.
   Loaded before each page's own *.jsx (shared global scope).
   ============================================================ */

const { useState, useEffect } = React;

/* ── Static config (links live in one place) ─────────────── */
const LINKS = {
  home: "/",
  projects: "/projects/",
  cv: "/cv/",
  cvPdf: "/hayden_murphey_2026.pdf",
  design: "/design/",
  contact: "/contact/",
  labs: "https://murpheylabs.com",
  github: "https://github.com/haydenmurphey",
  linkedin: "https://linkedin.com/in/haydenmurphey",
  email: "mailto:hsmurphey@gmail.com",
};

/* ── UI copy ──────────────────────────────────────────────── */
const STRINGS = {
  tagline: "Software Engineer",
  projects: "Projects",
  cv: "CV",
  design: "Design",
  contact: "Contact",
  labs: "murphey [labs]",
  menuOpen: "[ ≡ menu ]",
  menuClose: "[ × close ]",
  scroll: "scroll",
  swipe:  "swipe",
  about_label:      "About",
  about_title_line1: "Software Engineer",
  about_bio:        "I debug and evaluate AI systems. Through contract work for frontier AI labs, I red-team model-generated code, test APIs and agent workflows, and trace failures to their root cause. Outside that, I run a self-hosted, monitored homelab and build developer tools at Murphey Labs.",
  about_skills:     "AI Systems · Debugging · Cloud · Security",
  about_cv:         "View CV",
  about_github:     "GitHub",
  contact_heading:       "Reach out",
  contact_email:         "Email",
  contact_github:        "GitHub",
  contact_linkedin:      "LinkedIn",
  contact_status_label:  "status",
  contact_status:        "open to the right role",
  contact_time_label:    "my time",
};

/* ── Hooks ────────────────────────────────────────────────── */

// Live clock: HH:MM:SS + timezone label, ticks each second.
// Pass an IANA tzName (e.g. "America/New_York") to lock the clock to a fixed
// zone with a short label (EDT/EST); omit it for the viewer's local zone.
function useClock(tzName) {
  const [time, setTime] = useState("00:00:00");
  const [tz, setTz] = useState("Local");

  useEffect(() => {
    const pad = (n) => String(n).padStart(2, "0");
    const tick = () => {
      const d = new Date();
      if (tzName) {
        setTime(
          d.toLocaleTimeString("en-GB", {
            hour12: false,
            timeZone: tzName,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })
        );
        try {
          const parts = new Intl.DateTimeFormat("en-US", {
            timeZone: tzName,
            timeZoneName: "short",
          }).formatToParts(d);
          const zn = parts.find((p) => p.type === "timeZoneName");
          setTz(zn ? zn.value : tzName);
        } catch (e) {
          setTz(tzName);
        }
      } else {
        setTime(pad(d.getHours()) + ":" + pad(d.getMinutes()) + ":" + pad(d.getSeconds()));
        try {
          setTz(Intl.DateTimeFormat().resolvedOptions().timeZone || "Local");
        } catch (e) {
          setTz("Local");
        }
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [tzName]);

  return { time, tz };
}

// Tracks viewport < 768px; returns [isMobile] and resets via callback hook below.
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth < 768
  );
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return isMobile;
}

/* ── Components ───────────────────────────────────────────── */

// Top bar. Rendered once by the SPA root (home.jsx) and kept mounted across
// view changes, so the header never leaves while content transitions below it.
// Desktop renders the full nav row; mobile renders the menu button.
// activePage: 'home' | 'projects' | 'cv' | 'design' | 'contact' — underlines the active link.
// on*Click: intercept SPA navigation instead of href.
function Nav({ t, isMobile, onMenuToggle, activePage, onProjectsClick, onHomeClick, onCvClick, onContactClick, onDesignClick }) {
  const projectsActive = activePage === 'projects';
  const cvActive       = activePage === 'cv';
  const contactActive  = activePage === 'contact';
  const designActive   = activePage === 'design';
  const handleProjects = onProjectsClick ? (e) => { e.preventDefault(); onProjectsClick(); } : undefined;
  const handleHome     = onHomeClick     ? (e) => { e.preventDefault(); onHomeClick();     } : undefined;
  const handleCv       = onCvClick       ? (e) => { e.preventDefault(); onCvClick();       } : undefined;
  const handleContact  = onContactClick  ? (e) => { e.preventDefault(); onContactClick();  } : undefined;
  const handleDesign   = onDesignClick   ? (e) => { e.preventDefault(); onDesignClick();   } : undefined;
  return (
    <div className="topbar">
      <a className="monogram" href={LINKS.home} onClick={handleHome}>HM</a>
      {isMobile ? (
        <button type="button" className="menu-btn" onClick={onMenuToggle}>
          {t.menuOpen}
        </button>
      ) : (
        <nav className="nav">
          <a
            className={projectsActive ? 'nav__link--active' : 'nav__link--primary'}
            href={LINKS.projects}
            onClick={handleProjects}
          >{t.projects}</a>
          <a
            className={designActive ? 'nav__link--active' : 'nav__link--primary'}
            href={LINKS.design}
            onClick={handleDesign}
          >{t.design}</a>
          <a
            className={cvActive ? 'nav__link--active' : 'nav__link--primary'}
            href={LINKS.cv}
            onClick={handleCv}
          >{t.cv}</a>
          <a className={contactActive ? 'nav__link--active' : 'nav__link--primary'} href={LINKS.contact} onClick={handleContact}>{t.contact}</a>
          {/* Murphey Labs pill — hidden for now; uncomment to restore.
          <a className="nav__labs" href={LINKS.labs} target="_blank" rel="noreferrer">{t.labs}</a>
          */}
        </nav>
      )}
    </div>
  );
}

// Full-screen mobile nav overlay.
// on*Click: if provided, intercepts the link for SPA nav.
function MobileMenu({ t, onClose, onProjectsClick, onCvClick, onContactClick, onDesignClick, activePage }) {
  const handleProjects = onProjectsClick
    ? (e) => { e.preventDefault(); onProjectsClick(); }
    : onClose;
  const handleCv = onCvClick
    ? (e) => { e.preventDefault(); onCvClick(); }
    : onClose;
  const handleContact = onContactClick
    ? (e) => { e.preventDefault(); onContactClick(); }
    : onClose;
  const handleDesign = onDesignClick
    ? (e) => { e.preventDefault(); onDesignClick(); }
    : onClose;
  return (
    <div className="overlay">
      <div className="overlay__top">
        <a className="monogram" href={LINKS.home}>HM</a>
        <button type="button" className="menu-btn" onClick={onClose}>
          {t.menuClose}
        </button>
      </div>
      <nav className="overlay__nav">
        <a className={activePage === 'projects' ? 'nav__link--active' : 'nav__link--primary'} href={LINKS.projects} onClick={handleProjects}>{t.projects}</a>
        <a
          className={activePage === 'design' ? 'nav__link--active' : 'nav__link--primary'}
          href={LINKS.design}
          onClick={handleDesign}
        >{t.design}</a>
        <a className={activePage === 'cv' ? 'nav__link--active' : 'nav__link--primary'} href={LINKS.cv} onClick={handleCv}>{t.cv}</a>
        <a className={activePage === 'contact' ? 'nav__link--active' : 'nav__link--primary'} href={LINKS.contact} onClick={handleContact}>{t.contact}</a>
        {/* Murphey Labs link — hidden for now; uncomment to restore.
        <a className="overlay__labs" href={LINKS.labs} target="_blank" rel="noreferrer" onClick={onClose}>{t.labs}</a>
        */}
      </nav>
      <div className="overlay__footer">
        <div className="overlay__social">
          <a href={LINKS.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={LINKS.email}>Email</a>
        </div>
      </div>
    </div>
  );
}

// Orange dot that trails the pointer (mouse/trackpad only). It eases toward
// the cursor each frame, grows into a ring over links/buttons, and shrinks
// while pressed. Position is written straight to the DOM — no re-renders.
function CursorDot() {
  const ref = React.useRef(null);
  const [enabled] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia &&
    !window.matchMedia("(hover: none), (pointer: coarse)").matches
  );

  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let seen = false;
    let raf;

    const render = () => {
      const k = reduce ? 1 : 0.2;
      pos.x += (target.x - pos.x) * k;
      pos.y += (target.y - pos.y) * k;
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!seen) {               // first move: start at the pointer, not off-screen
        seen = true;
        pos.x = target.x;
        pos.y = target.y;
      }
      el.classList.remove("cursor-dot--hidden");
    };
    const onOver = (e) => {
      const hit = e.target.closest && e.target.closest('a, button, [role="button"]');
      el.classList.toggle("cursor-dot--hover", !!hit);
    };
    const onDown = () => el.classList.add("cursor-dot--down");
    const onUp = () => el.classList.remove("cursor-dot--down");
    const onLeave = () => el.classList.add("cursor-dot--hidden");

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div ref={ref} className="cursor-dot cursor-dot--hidden" aria-hidden="true">
      <span className="cursor-dot__inner" />
    </div>
  );
}

/* ── Export to global scope for page scripts ──────────────── */
window.PF = {
  LINKS,
  STRINGS,
  useClock,
  useIsMobile,
  Nav,
  MobileMenu,
  CursorDot,
};
