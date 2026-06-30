/* global React */
const { useState, useEffect, useRef } = React;

const SECTIONS = [
  { id: 'education',       label: { en: 'Education',      es: 'Educación' } },
  { id: 'certifications',  label: { en: 'Certifications', es: 'Certificaciones' } },
  { id: 'skills',          label: { en: 'Skills',         es: 'Habilidades' } },
];

// UI labels for the CV panels, keyed by language.
const CV_LABELS = {
  en: { coursework: 'Coursework', music: 'Music', credential: 'Credential', issuer: 'Issuer', date: 'Date' },
  es: { coursework: 'Cursos',     music: 'Música', credential: 'Credencial', issuer: 'Emisor', date: 'Fecha' },
};

const EDUCATION = {
  school:     'James Madison University',
  degree:     { en: 'B.S. Computer Science', es: 'Lic. en Ciencias de la Computación' },
  minor:      { en: 'Minor in Music',        es: 'Especialización en Música' },
  location:   'Harrisonburg, VA',
  date:       { en: 'Dec 2025', es: 'dic. 2025' },
  coursework: {
    en: ['Distributed Systems', 'Operating Systems', 'Networks & Security', 'Database Systems', 'Algorithms'],
    es: ['Sistemas Distribuidos', 'Sistemas Operativos', 'Redes y Seguridad', 'Sistemas de Bases de Datos', 'Algoritmos'],
  },
  music:      {
    en: ['Guitar', 'Bass', 'Piano', 'Drums'],
    es: ['Guitarra', 'Bajo', 'Piano', 'Batería'],
  },
};

const CERTS = [
  { code: 'SAA-C03', name: 'AWS Certified Solutions Architect – Associate', issuer: 'Amazon Web Services',      date: { en: 'Apr 2026', es: 'abr. 2026' } },
  { code: 'CLF-C02', name: 'AWS Certified Cloud Practitioner',               issuer: 'Amazon Web Services',      date: { en: 'Feb 2026', es: 'feb. 2026' } },
  { code: 'ISC2-CC', name: 'Certified in Cybersecurity',                     issuer: '(ISC)²',                  date: { en: 'Feb 2025', es: 'feb. 2025' } },
  { code: 'ML-SPEC', name: 'Machine Learning Specialization',                issuer: 'Stanford / DeepLearning.AI', date: { en: 'May 2026', es: 'may. 2026' } },
];

const SKILLS = [
  { group: { en: 'Cloud & DevOps',        es: 'Cloud y DevOps' },        items: 'AWS (EC2, S3, IAM, Lambda, CloudWatch), Terraform, Ansible, Docker, k3s, GitHub Actions, ArgoCD' },
  { group: { en: 'Networking & Security', es: 'Redes y Seguridad' },     items: 'Tailscale, Caddy, Pi-hole, Unbound, DNS, TLS, CrowdSec, encryption' },
  { group: { en: 'Languages',             es: 'Lenguajes' },             items: 'Python, JS / TS, Java, C, Rust, Ruby, Bash, SQL, Haskell' },
  { group: { en: 'Frameworks & Web',      es: 'Frameworks y Web' },      items: 'React, Next.js, Node.js, Vercel, Flutter / Dart, Nginx, HTML / CSS' },
  { group: { en: 'Observability',         es: 'Observabilidad' },        items: 'Prometheus, Grafana, Loki, Alertmanager, Uptime Kuma, Beszel' },
  { group: { en: 'Data & Backend',        es: 'Datos y Backend' },       items: 'PostgreSQL, Supabase, REST APIs, NumPy, pandas' },
  { group: { en: 'AI / ML',               es: 'IA / ML' },               items: 'Prompt engineering, AI code validation, ML fundamentals, Ollama' },
  { group: { en: 'Tools & Practices',     es: 'Herramientas y Prácticas' }, items: 'Git, Linux / CLI, pytest, Agile / SCRUM, ROS2, OpenCV, Raspberry Pi' },
];

function EducationPanel({ lang }) {
  const L = CV_LABELS[lang] || CV_LABELS.en;
  return (
    <div className="cv__education">
      <div className="cv__school">{EDUCATION.school}</div>
      <div className="cv__degree">{EDUCATION.degree[lang]} · {EDUCATION.minor[lang]}</div>
      <div className="cv__meta">{EDUCATION.location} · {EDUCATION.date[lang]}</div>

      <div className="cv__label">{L.coursework}</div>
      <div className="cv__list">{EDUCATION.coursework[lang].join(' · ')}</div>

      <div className="cv__label">{L.music}</div>
      <div className="cv__list">{EDUCATION.music[lang].join(' · ')}</div>
    </div>
  );
}

function CertificationsPanel({ lang }) {
  const L = CV_LABELS[lang] || CV_LABELS.en;
  return (
    <table className="cv__cert-table">
      <thead>
        <tr className="cv__cert-head">
          <th></th>
          <th>{L.credential}</th>
          <th>{L.issuer}</th>
          <th>{L.date}</th>
        </tr>
      </thead>
      <tbody>
        {CERTS.map((c) => (
          <tr key={c.code} className="cv__cert-row">
            <td><span className="cv__cert-dot">●</span></td>
            <td>
              <span className="cv__cert-name">{c.name}</span>
              <span className="cv__cert-code">{c.code}</span>
            </td>
            <td className="cv__cert-issuer">{c.issuer}</td>
            <td className="cv__cert-date">{c.date[lang]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function SkillsPanel({ lang }) {
  return (
    <div className="cv__skills-grid">
      {SKILLS.map((s) => (
        <div key={s.group.en} className="cv__skill-group">
          <div className="cv__skill-group-name">{s.group[lang]}</div>
          <div className="cv__skill-items">{s.items}</div>
        </div>
      ))}
    </div>
  );
}

function CvView({ lang = 'en', isMobile, contentPhase }) {
  const t = window.PF.STRINGS[lang] || window.PF.STRINGS.en;
  const PANELS = [
    <EducationPanel lang={lang} />,
    <CertificationsPanel lang={lang} />,
    <SkillsPanel lang={lang} />,
  ];
  const [activeIdx, setActiveIdx]     = useState(0);
  const [hasNavigated, setHasNavigated] = useState(false);
  const cooldown                  = useRef(false);
  const activeRef                 = useRef(0);
  const touchStartX               = useRef(null);
  const touchStartY               = useRef(null);

  const outerStyle =
    contentPhase === 'entering' ? { opacity: 0, transition: 'none' } :
    contentPhase === 'exiting'  ? { opacity: 0, transition: 'opacity 0.3s ease' } :
                                   { opacity: 1, transition: 'opacity 0.4s ease' };

  function navigate(nextIdx) {
    if (cooldown.current) return;
    if (nextIdx < 0 || nextIdx >= SECTIONS.length) return;
    if (nextIdx === activeRef.current) return;
    cooldown.current = true;
    activeRef.current = nextIdx;
    setActiveIdx(nextIdx);
    setHasNavigated(true);
    setTimeout(() => { cooldown.current = false; }, 500);
  }

  const navigateRef = useRef(navigate);
  navigateRef.current = navigate;

  useEffect(() => {
    const onWheel = (e) => {
      if (Math.abs(e.deltaY) < 5) return;
      navigateRef.current(activeRef.current + (e.deltaY > 0 ? 1 : -1));
    };
    const onKey = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') navigateRef.current(activeRef.current + 1);
      if (e.key === 'ArrowUp'   || e.key === 'ArrowLeft')  navigateRef.current(activeRef.current - 1);
    };
    const onTouchStart = (e) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    };
    const onTouchEnd = (e) => {
      if (touchStartX.current === null) return;
      const dx = touchStartX.current - e.changedTouches[0].clientX;
      const dy = touchStartY.current - e.changedTouches[0].clientY;
      touchStartX.current = null;
      touchStartY.current = null;
      if (Math.abs(dx) < 50 || Math.abs(dx) <= Math.abs(dy)) return;
      navigateRef.current(activeRef.current + (dx > 0 ? 1 : -1));
    };

    window.addEventListener('wheel',      onWheel,      { passive: true });
    window.addEventListener('keydown',    onKey);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend',   onTouchEnd);
    return () => {
      window.removeEventListener('wheel',      onWheel);
      window.removeEventListener('keydown',    onKey);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend',   onTouchEnd);
    };
  }, []);

  return (
    <div className={`cv-spa${isMobile ? ' cv-spa--mobile' : ''}`} style={outerStyle}>
      <main className="cv-spa__main">
        <nav className="cv-spa__left" aria-label="CV sections">
          {SECTIONS.map((s, i) => (
            <button
              key={s.id}
              type="button"
              className="cv-spa__nav-item"
              style={{ opacity: i === activeIdx ? 1 : 0.5 }}
              onClick={() => navigate(i)}
              aria-current={i === activeIdx ? 'true' : undefined}
            >
              {s.label[lang]}
            </button>
          ))}
        </nav>

        <div className="cv-spa__right">
          {PANELS.map((panel, i) => (
            <div
              key={SECTIONS[i].id}
              className="cv__panel"
              style={{
                opacity:       i === activeIdx ? 1 : 0,
                transform:     i === activeIdx
                                 ? 'translate(0)'
                                 : (isMobile ? 'translateX(24px)' : 'translateY(16px)'),
                pointerEvents: i === activeIdx ? 'auto' : 'none',
              }}
              aria-hidden={i !== activeIdx}
            >
              {panel}
            </div>
          ))}
        </div>
      </main>

      {isMobile && (
        <div className="position-dots">
          {SECTIONS.map((s, i) => (
            <span
              key={s.id}
              className={`position-dot${i === activeIdx ? " position-dot--active" : ""}`}
            />
          ))}
        </div>
      )}

      {isMobile && !hasNavigated && (
        <div className="swipe-cue swipe-cue--visible">
          <span className="swipe-cue__arrow">→</span>
          <span className="swipe-cue__label">{t.swipe}</span>
        </div>
      )}
    </div>
  );
}

window.PF.CvView = CvView;
