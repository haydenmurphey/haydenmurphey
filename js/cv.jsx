/* global React */
const { useState, useEffect, useRef } = React;

const SECTIONS = [
  { id: 'experience',      label: 'Experience' },
  { id: 'education',       label: 'Education' },
  { id: 'certifications',  label: 'Certifications' },
  { id: 'skills',          label: 'Skills' },
];

// UI labels for the CV panels.
const CV_LABELS = { coursework: 'Coursework', music: 'Music', credential: 'Credential', issuer: 'Issuer', date: 'Date' };

const EDUCATION = {
  school:     'James Madison University',
  degree:     'B.S. Computer Science',
  minor:      'Minor in Music',
  location:   'Harrisonburg, VA',
  date:       'Dec 2025',
  coursework: ['Distributed Systems', 'Operating Systems', 'Networks & Security', 'Database Systems', 'Algorithms'],
  music:      ['Guitar', 'Bass', 'Piano', 'Drums'],
};

const EXPERIENCE = [
  {
    org:   'Mercor',
    role:  'AI Output Evaluator · Frontier AI Labs (contract)',
    meta:  'Remote · May 2026 – Present',
    points: [
      'Evaluate AI-generated outputs for frontier labs against task requirements, identifying errors and tracing them to their root cause.',
      'Review and correct model work, fixing flawed code and responses so they meet spec, and document findings for model training.',
    ],
  },
  {
    org:   'DataAnnotation',
    role:  'Software Validation & AI Trainer (contract)',
    meta:  'Remote · May 2025 – Present',
    points: [
      'Built cybersecurity testing harnesses to evaluate how AI models handle security tasks.',
      'Validated AI-generated code against technical specs across 500+ software-engineering and cybersecurity tasks, surfacing logic and edge-case failures.',
      'Wrote Python scripts and disposable Docker environments to test API integrations, agentic workflows, and regressions across languages.',
    ],
  },
  {
    org:   'Townes Site Engineering',
    role:  'Geotechnical Technician',
    meta:  'Richmond, VA · May 2021 – Aug 2025',
    secondary: true,
    points: [
      'Coordinated daily with field crews, lab staff, and project managers across 40+ projects; logged 10,000+ test specimens with strict accuracy.',
    ],
  },
];

const CERTS = [
  { code: 'SAA-C03', name: 'AWS Certified Solutions Architect – Associate', issuer: 'Amazon Web Services',      date: 'Apr 2026' },
  { code: 'CLF-C02', name: 'AWS Certified Cloud Practitioner',               issuer: 'Amazon Web Services',      date: 'Feb 2026' },
  { code: 'ISC2-CC', name: 'Certified in Cybersecurity',                     issuer: '(ISC)²',                  date: 'Feb 2025' },
  { code: 'ML-SPEC', name: 'Machine Learning Specialization',                issuer: 'Stanford / DeepLearning.AI', date: 'May 2026' },
];

const SKILLS = [
  { group: 'Cloud & DevOps',        items: 'AWS (EC2, S3, IAM, Lambda, CloudWatch), Proxmox, Ansible, Docker, k3s, GitHub Actions' },
  { group: 'Networking & Security', items: 'Tailscale, Caddy, Pi-hole, Unbound, DNS, TLS, CrowdSec, encryption' },
  { group: 'Languages',             items: 'Python, JS / TS, Java, C, Rust, Ruby, Bash, SQL, Haskell' },
  { group: 'Frameworks & Web',      items: 'React, Next.js, Node.js, Vercel, Flutter / Dart, Nginx, HTML / CSS' },
  { group: 'Monitoring & Alerting', items: 'Alertmanager, Uptime Kuma, Beszel, ntfy' },
  { group: 'AI / LLM Systems',      items: 'Prompt engineering, LLM output evaluation & red-teaming, agentic workflow testing, MCP, LiteLLM, Langfuse, Claude Code, Cursor, local models (Ollama, Whisper)' },
  { group: 'Testing & Debugging',   items: 'Postman, REST API testing, pytest, JUnit, root-cause analysis, log analysis (Docker logs), Docker repro environments' },
  { group: 'Data & Backend',        items: 'SQL, PostgreSQL, SQL Server, Supabase, REST APIs, NumPy, pandas' },
  { group: 'Tools & Practices',     items: 'Git, Linux / CLI, pytest, Agile / SCRUM, ROS2, OpenCV, Raspberry Pi' },
];

function EducationPanel() {
  const L = CV_LABELS;
  return (
    <div className="cv__education">
      <div className="cv__school">{EDUCATION.school}</div>
      <div className="cv__degree">{EDUCATION.degree} · {EDUCATION.minor}</div>
      <div className="cv__meta">{EDUCATION.location} · {EDUCATION.date}</div>

      <div className="cv__label">{L.coursework}</div>
      <div className="cv__list">{EDUCATION.coursework.join(' · ')}</div>

      <div className="cv__label">{L.music}</div>
      <div className="cv__list">{EDUCATION.music.join(' · ')}</div>
    </div>
  );
}

function ExperiencePanel() {
  return (
    <div className="cv__experience">
      {EXPERIENCE.map((job) => (
        <div key={job.org} className={`cv__job${job.secondary ? ' cv__job--secondary' : ''}`}>
          <div className="cv__job-org">{job.org}</div>
          <div className="cv__degree">{job.role}</div>
          <div className="cv__meta">{job.meta}</div>
          <ul className="cv__bullets">
            {job.points.map((pt) => <li key={pt}>{pt}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
}

function CertificationsPanel() {
  const L = CV_LABELS;
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

function CvView({ isMobile, registerStep }) {
  const t = window.PF.STRINGS;
  const PANELS = [
    <ExperiencePanel />,
    <EducationPanel />,
    <CertificationsPanel />,
    <SkillsPanel />,
  ];
  const [activeIdx, setActiveIdx]     = useState(0);
  const [hasNavigated, setHasNavigated] = useState(false);
  const cooldown                  = useRef(false);
  const activeRef                 = useRef(0);

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

  // Deck hook: step through the CV sections; at either end, hand off to the deck.
  if (registerStep) registerStep((dir) => {
    if (cooldown.current) return true;
    const next = activeRef.current + dir;
    if (next < 0 || next >= SECTIONS.length) return false;
    navigate(next);
    return true;
  });

  return (
    <div className={`cv-spa${isMobile ? ' cv-spa--mobile' : ''}`}>
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
