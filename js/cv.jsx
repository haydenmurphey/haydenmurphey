/* global React */
const { useState, useEffect, useRef } = React;

const SECTIONS = [
  { id: 'education',       label: 'Education' },
  { id: 'certifications',  label: 'Certifications' },
  { id: 'skills',          label: 'Skills' },
];

const EDUCATION = {
  school:     'James Madison University',
  degree:     'B.S. Computer Science',
  minor:      'Minor in Music',
  location:   'Harrisonburg, VA',
  date:       'Dec 2025',
  coursework: ['Distributed Systems', 'Operating Systems', 'Networks & Security', 'Database Systems', 'Algorithms'],
  music:      ['Guitar', 'Bass', 'Piano', 'Drums'],
};

const CERTS = [
  { code: 'SAA-C03', name: 'AWS Certified Solutions Architect – Associate', issuer: 'Amazon Web Services',      date: 'Apr 2026' },
  { code: 'CLF-C02', name: 'AWS Certified Cloud Practitioner',               issuer: 'Amazon Web Services',      date: 'Feb 2026' },
  { code: 'ISC2-CC', name: 'Certified in Cybersecurity',                     issuer: '(ISC)²',                  date: 'Feb 2025' },
  { code: 'ML-SPEC', name: 'Machine Learning Specialization',                issuer: 'Stanford / DeepLearning.AI', date: 'May 2026' },
];

const SKILLS = [
  { group: 'Cloud & DevOps',        items: 'AWS (EC2, S3, IAM, Lambda, CloudWatch), Terraform, Ansible, Docker, k3s, GitHub Actions, ArgoCD' },
  { group: 'Networking & Security', items: 'Tailscale, Caddy, Pi-hole, Unbound, DNS, TLS, CrowdSec, encryption' },
  { group: 'Languages',             items: 'Python, JS / TS, Java, C, Rust, Ruby, Bash, SQL, Haskell' },
  { group: 'Frameworks & Web',      items: 'React, Next.js, Node.js, Vercel, Flutter / Dart, Nginx, HTML / CSS' },
  { group: 'Observability',         items: 'Prometheus, Grafana, Loki, Alertmanager, Uptime Kuma, Beszel' },
  { group: 'Data & Backend',        items: 'PostgreSQL, Supabase, REST APIs, NumPy, pandas' },
  { group: 'AI / ML',               items: 'Prompt engineering, AI code validation, ML fundamentals, Ollama' },
  { group: 'Tools & Practices',     items: 'Git, Linux / CLI, pytest, Agile / SCRUM, ROS2, OpenCV, Raspberry Pi' },
];

function EducationPanel() {
  return (
    <div className="cv__education">
      <div className="cv__school">{EDUCATION.school}</div>
      <div className="cv__degree">{EDUCATION.degree} · {EDUCATION.minor}</div>
      <div className="cv__meta">{EDUCATION.location} · {EDUCATION.date}</div>

      <div className="cv__label">Coursework</div>
      <div className="cv__list">{EDUCATION.coursework.join(' · ')}</div>

      <div className="cv__label">Music</div>
      <div className="cv__list">{EDUCATION.music.join(' · ')}</div>
    </div>
  );
}

function CertificationsPanel() {
  return (
    <table className="cv__cert-table">
      <thead>
        <tr className="cv__cert-head">
          <th></th>
          <th>Credential</th>
          <th>Issuer</th>
          <th>Date</th>
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
            <td className="cv__cert-date">{c.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function SkillsPanel() {
  return (
    <div className="cv__skills-grid">
      {SKILLS.map((s) => (
        <div key={s.group} className="cv__skill-group">
          <div className="cv__skill-group-name">{s.group}</div>
          <div className="cv__skill-items">{s.items}</div>
        </div>
      ))}
    </div>
  );
}

const PANELS = [<EducationPanel />, <CertificationsPanel />, <SkillsPanel />];

function CvView({ isMobile, contentPhase }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const cooldown                  = useRef(false);
  const activeRef                 = useRef(0);
  const touchStart                = useRef(null);

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
    const onTouchStart = (e) => { touchStart.current = e.touches[0].clientY; };
    const onTouchEnd = (e) => {
      if (touchStart.current === null) return;
      const delta = touchStart.current - e.changedTouches[0].clientY;
      if (Math.abs(delta) < 50) return;
      navigateRef.current(activeRef.current + (delta > 0 ? 1 : -1));
      touchStart.current = null;
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
              {s.label}
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
                transform:     i === activeIdx ? 'translateY(0)' : 'translateY(16px)',
                pointerEvents: i === activeIdx ? 'auto' : 'none',
              }}
              aria-hidden={i !== activeIdx}
            >
              {panel}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

window.PF.CvView = CvView;
