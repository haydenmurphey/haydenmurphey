/* global React */
/* ============================================================
   shared.jsx — reusable across every page of the portfolio.
   Exposes on `window`: STRINGS, useClock, useIsMobile, useLang,
   LangToggle, Nav, MobileMenu.
   Loaded before each page's own *.jsx (shared global scope).
   ============================================================ */

const { useState, useEffect } = React;

/* ── Static config (links live in one place) ─────────────── */
const LINKS = {
  home: "index.html",
  projects: "projects.html",
  writing: "writing.html",
  cv: "./cv.html",
  cvPdf: "./hayden_murphey_2026.pdf",
  design: "design.html",
  contact: "contact.html",
  labs: "https://murpheylabs.com",
  github: "https://github.com/haydenmurphey",
  linkedin: "https://linkedin.com/in/haydenmurphey",
  email: "mailto:hsmurphey@gmail.com",
};

/* ── i18n copy ────────────────────────────────────────────── */
const STRINGS = {
  en: {
    tagline: "Software Engineer · Founder, Murphey Labs",
    projects: "Projects",
    writing: "Writing",
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
    about_title_line2: "& Founder",
    about_bio:        "I build various developer tools and other customer focused software. Currently funding product work at Murphey Labs through contract AI engineering — evaluating and red-teaming AI-generated code for frontier AI labs.",
    about_skills:     "Security · Cloud · Full-stack",
    about_cv:         "View CV",
    about_github:     "GitHub",
    contact_heading:       "Get in touch.",
    contact_sub:           "// email is the best place to start",
    contact_email:         "email",
    contact_github:        "github",
    contact_linkedin:      "linkedin",
    contact_labs:          "labs",
    contact_status_label:  "status",
    contact_status:        "● open to the right role",
    contact_time_label:    "time",
    writing_heading:   "Writing",
    writing_sub:       "// notes & technical writeups",
    writing_back:      "back to Writing",
    writing_loading:   "loading…",
    writing_empty:     "No posts yet — check back soon.",
    writing_error:     "Couldn't load this post.",
  },
  es: {
    tagline: "Ingeniero de Software · Fundador, Murphey Labs",
    projects: "Proyectos",
    writing: "Escritos",
    cv: "CV",
    design: "Diseño",
    contact: "Contacto",
    labs: "murphey [labs]",
    menuOpen: "[ ≡ menú ]",
    menuClose: "[ × cerrar ]",
    scroll: "desplaza",
    swipe:  "desliza",
    about_label:      "Sobre mí",
    about_title_line1: "Ingeniero de Software",
    about_title_line2: "y Fundador",
    about_bio:        "Construyo herramientas para desarrolladores y otro software centrado en el cliente. Actualmente financio el trabajo de producto en Murphey Labs mediante ingeniería de IA por contrato — evaluando y haciendo red-teaming de código generado por IA para laboratorios de IA de frontera.",
    about_skills:     "Seguridad · Cloud · Full-stack",
    about_cv:         "Ver CV",
    about_github:     "GitHub",
    contact_heading:       "Hablemos.",
    contact_sub:           "// el correo es el mejor punto de partida",
    contact_email:         "email",
    contact_github:        "github",
    contact_linkedin:      "linkedin",
    contact_labs:          "labs",
    contact_status_label:  "estado",
    contact_status:        "● abierto al puesto adecuado",
    contact_time_label:    "hora",
    writing_heading:   "Escritos",
    writing_sub:       "// notas y artículos técnicos",
    writing_back:      "volver a Escritos",
    writing_loading:   "cargando…",
    writing_empty:     "Aún no hay publicaciones — vuelve pronto.",
    writing_error:     "No se pudo cargar esta publicación.",
  },
};

/* ── Hooks ────────────────────────────────────────────────── */

// Language state, persisted to localStorage so the choice survives refreshes
// and carries across pages. Valid values: "en" | "es" (anything else → "en").
function useLang() {
  const [lang, setLangState] = useState(() => {
    try {
      const saved = localStorage.getItem("lang");
      return saved === "es" ? "es" : "en";
    } catch (e) {
      return "en";
    }
  });

  const setLang = (next) => {
    const value = next === "es" ? "es" : "en";
    setLangState(value);
    try {
      localStorage.setItem("lang", value);
    } catch (e) {
      /* storage unavailable (e.g. private mode) — non-fatal */
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = STRINGS[lang] || STRINGS.en;
  return { lang, setLang, t };
}

// Live clock: HH:MM:SS + resolved IANA timezone, ticks each second.
function useClock() {
  const [time, setTime] = useState("00:00:00");
  const [tz, setTz] = useState("Local");

  useEffect(() => {
    const pad = (n) => String(n).padStart(2, "0");
    const tick = () => {
      const d = new Date();
      setTime(pad(d.getHours()) + ":" + pad(d.getMinutes()) + ":" + pad(d.getSeconds()));
      try {
        setTz(Intl.DateTimeFormat().resolvedOptions().timeZone || "Local");
      } catch (e) {
        setTz("Local");
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

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

function LangToggle({ lang, setLang }) {
  return (
    <span className="lang-toggle">
      <button
        type="button"
        className={"lang-toggle__btn" + (lang === "en" ? " is-active" : "")}
        onClick={() => setLang("en")}
      >
        EN
      </button>
      <span className="lang-toggle__sep">/</span>
      <button
        type="button"
        className={"lang-toggle__btn" + (lang === "es" ? " is-active" : "")}
        onClick={() => setLang("es")}
      >
        ES
      </button>
    </span>
  );
}

// Top bar. Desktop renders the full nav row; mobile renders the menu button.
// activePage: 'home' | 'projects' | 'cv' | 'design' | null — underlines the active link.
// onProjectsClick / onHomeClick: intercept SPA navigation instead of href.
function Nav({ lang, setLang, t, isMobile, onMenuToggle, activePage, onProjectsClick, onHomeClick, onCvClick, onContactClick, onDesignClick, onWritingClick }) {
  const projectsActive = activePage === 'projects';
  const writingActive  = activePage === 'writing';
  const cvActive       = activePage === 'cv';
  const contactActive  = activePage === 'contact';
  const designActive   = activePage === 'design';
  const handleProjects = onProjectsClick ? (e) => { e.preventDefault(); onProjectsClick(); } : undefined;
  const handleWriting  = onWritingClick  ? (e) => { e.preventDefault(); onWritingClick();  } : undefined;
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
            className={writingActive ? 'nav__link--active' : 'nav__link--primary'}
            href={LINKS.writing}
            onClick={handleWriting}
          >{t.writing}</a>
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
          <a className="nav__labs" href={LINKS.labs} target="_blank" rel="noreferrer">{t.labs}</a>
          <span className="nav__divider">|</span>
          <LangToggle lang={lang} setLang={setLang} />
        </nav>
      )}
    </div>
  );
}

// Full-screen mobile nav overlay.
// onProjectsClick: if provided, intercepts the Projects link for SPA nav.
function MobileMenu({ lang, setLang, t, onClose, onProjectsClick, onCvClick, onContactClick, onDesignClick, onWritingClick, activePage }) {
  const handleProjects = onProjectsClick
    ? (e) => { e.preventDefault(); onProjectsClick(); }
    : onClose;
  const handleWriting = onWritingClick
    ? (e) => { e.preventDefault(); onWritingClick(); }
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
        <a className={activePage === 'writing' ? 'nav__link--active' : 'nav__link--primary'} href={LINKS.writing} onClick={handleWriting}>{t.writing}</a>
        <a
          className={activePage === 'design' ? 'nav__link--active' : 'nav__link--primary'}
          href={LINKS.design}
          onClick={handleDesign}
        >{t.design}</a>
        <a className={activePage === 'cv' ? 'nav__link--active' : 'nav__link--primary'} href={LINKS.cv} onClick={handleCv}>{t.cv}</a>
        <a className={activePage === 'contact' ? 'nav__link--active' : 'nav__link--primary'} href={LINKS.contact} onClick={handleContact}>{t.contact}</a>
        <a className="overlay__labs" href={LINKS.labs} target="_blank" rel="noreferrer" onClick={onClose}>{t.labs}</a>
      </nav>
      <div className="overlay__footer">
        <LangToggle lang={lang} setLang={setLang} />
        <div className="overlay__social">
          <a href={LINKS.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={LINKS.email}>Email</a>
        </div>
      </div>
    </div>
  );
}

/* ── Export to global scope for page scripts ──────────────── */
window.PF = {
  LINKS,
  STRINGS,
  useLang,
  useClock,
  useIsMobile,
  LangToggle,
  Nav,
  MobileMenu,
};
