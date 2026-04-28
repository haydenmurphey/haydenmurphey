/* global React */
const { useState, useEffect, useRef, useCallback } = React;

// ─── ASCII helpers ──────────────────────────────────────────────────
const rule = (n = 60, ch = "─") => ch.repeat(n);

// banner — block lettering, "HAYDEN MURPHEY"
const NAME_BANNER = String.raw`
 ██╗  ██╗ █████╗ ██╗   ██╗██████╗ ███████╗███╗   ██╗
 ██║  ██║██╔══██╗╚██╗ ██╔╝██╔══██╗██╔════╝████╗  ██║
 ███████║███████║ ╚████╔╝ ██║  ██║█████╗  ██╔██╗ ██║
 ██╔══██║██╔══██║  ╚██╔╝  ██║  ██║██╔══╝  ██║╚██╗██║
 ██║  ██║██║  ██║   ██║   ██████╔╝███████╗██║ ╚████║
 ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═════╝ ╚══════╝╚═╝  ╚═══╝
 ███╗   ███╗██╗   ██╗██████╗ ██████╗ ██╗  ██╗███████╗██╗   ██╗
 ████╗ ████║██║   ██║██╔══██╗██╔══██╗██║  ██║██╔════╝╚██╗ ██╔╝
 ██╔████╔██║██║   ██║██████╔╝██████╔╝███████║█████╗   ╚████╔╝ 
 ██║╚██╔╝██║██║   ██║██╔══██╗██╔═══╝ ██╔══██║██╔══╝    ╚██╔╝  
 ██║ ╚═╝ ██║╚██████╔╝██║  ██║██║     ██║  ██║███████╗   ██║   
 ╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝  ╚═╝╚══════╝   ╚═╝   `;

// ─── Reusable section header ────────────────────────────────────────
const Header = ({ id, num, title, sub, density }) => {
  const dashCount = density === "heavy" ? 80 : density === "moderate" ? 56 : 40;
  return (
    <header className="section-header" id={id}>
      <div className="sh-line">
        <span className="sh-prompt">$</span>
        <span className="sh-cmd">cat </span>
        <span className="sh-arg">~/{title.toLowerCase().replace(/[^a-z0-9]/g, "_")}.md</span>
      </div>
      <h2 className="sh-title">
        <span className="sh-num">[{num}]</span> {title}
      </h2>
      {sub && <p className="sh-sub">{sub}</p>}
      <pre className="sh-rule" aria-hidden="true">{rule(dashCount)}</pre>
    </header>
  );
};

// ─── Hero ───────────────────────────────────────────────────────────
const Hero = ({ density, onNav }) => {
  const tagline = "Cloud / DevOps / Security · Richmond, VA";

  return (
    <section className="hero" id="top">
      {density !== "subtle" && (
        <pre className="banner" aria-hidden="true">{NAME_BANNER}</pre>
      )}
      {density === "subtle" && (
        <h1 className="hero-name-text">hayden murphey</h1>
      )}

      <div className="hero-meta">
        <div className="meta-row">
          <span className="meta-k">role</span>
          <span className="meta-sep">::</span>
          <span className="meta-v">Cloud / DevOps Engineer</span>
        </div>
        <div className="meta-row">
          <span className="meta-k">loc&nbsp;</span>
          <span className="meta-sep">::</span>
          <span className="meta-v">Richmond, VA · 38.0°N, 77.4°W</span>
        </div>
        <div className="meta-row">
          <span className="meta-k">stat</span>
          <span className="meta-sep">::</span>
          <span className="meta-v stat-ok">● open to opportunities</span>
        </div>
      </div>

      <div className="hero-prompt">
        <span className="prompt-user">guest</span>
        <span className="prompt-at">@</span>
        <span className="prompt-host">haydenmurphey.site</span>
        <span className="prompt-colon">:</span>
        <span className="prompt-path">~</span>
        <span className="prompt-tail">$ </span>
        <span className="prompt-typed">whoami --verbose</span>
      </div>

      <p className="hero-tagline">{tagline}</p>

      <div className="hero-quick">
        <button onClick={() => onNav("projects")} className="qbtn">→ projects</button>
        <span className="qsep">│</span>
        <a href="mailto:hsmurphey@gmail.com" className="qbtn">→ email</a>
        <span className="qsep">│</span>
        <a href="https://github.com/haydenmurphey" target="_blank" rel="noreferrer" className="qbtn">→ github</a>
        <span className="qsep">│</span>
        <a href="https://linkedin.com/in/haydenmurphey" target="_blank" rel="noreferrer" className="qbtn">→ linkedin</a>
      </div>
    </section>
  );
};

// ─── About ──────────────────────────────────────────────────────────
const About = ({ density }) => (
  <section className="block" data-screen-label="01 About">
    <Header id="about" num="01" title="ABOUT" sub="// who, what, why" density={density} />
    <div className="prose">
      <p>
        My journey into tech began with a fascination for computers and gaming, which quickly evolved into a 
        deep appreciation for systems architecture and development. As a Computer Science graduate from James 
        Madison University (Dec 2025), I built a strong foundation in frontend and backend programming before 
        discovering my passion: cloud computing and cybersecurity. I have a strong bias toward engineering 
        systems that are reproducible, observable, and solid.
      </p>
      <p>
        Today, I am actively seeking a role in cloud engineering where I can design, automate, and protect 
        modern infrastructure. Most of what I build lives at the intersection of cloud architecture, 
        security, and automation. I am constantly working to expand my expertise in cloud architecture 
        and threat detection. Outside the computer world, you can find me playing bass/guitar, soccer, 
        rock-climbing, or snowboarding.
      </p>
    </div>
  </section>
);

// ─── Education ──────────────────────────────────────────────────────
const Education = ({ density }) => (
  <section className="block" data-screen-label="02 Education">
    <Header id="education" num="02" title="EDUCATION" density={density} />
    <article className="card">
      <div className="card-top">
        <div>
          <h3 className="card-title">James Madison University</h3>
          <p className="card-sub">B.S. Computer Science · Minor in Music</p>
        </div>
        <div className="card-meta">
          <span className="badge">Harrisonburg, VA</span>
          <span className="date">Dec 2025</span>
        </div>
      </div>
      <ul className="bullets">
        <li>Coursework: Distributed Systems, Operating Systems, Networks &amp; Security, Database Systems, Algorithms.</li>
        <li>Music Minor — Focus on Guitar, Bass, Piano, and Drums.</li>
      </ul>
    </article>
  </section>
);

// ─── Certifications ─────────────────────────────────────────────────
const certs = [
  { name: "AWS Certified Solutions Architect – Associate", issuer: "Amazon Web Services", date: "Apr 2026", code: "SAA-C03" },
  { name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", date: "Feb 2026", code: "CLF-C02" },
  { name: "Certified in Cybersecurity (CC)", issuer: "(ISC)²", date: "Feb 2025", code: "ISC2-CC" },
  { name: "Machine Learning Specialization", issuer: "Stanford / DeepLearning.AI", date: "Expected May 2026", code: "ML-SPEC" },
];

const Certifications = ({ density }) => (
  <section className="block" data-screen-label="03 Certifications">
    <Header id="certs" num="03" title="CERTIFICATIONS" density={density} />
    <div className="cert-table" role="table">
      <div className="ct-head" role="row">
        <span>STATUS</span>
        <span>CREDENTIAL</span>
        <span>ISSUER</span>
        <span>DATE</span>
      </div>
      {certs.map((c) => {
        const expected = c.date.toLowerCase().includes("expected");
        return (
          <div className="ct-row" role="row" key={c.code}>
            <span className={"ct-status " + (expected ? "pending" : "ok")}>
              {expected ? "[ … ]" : "[ ✓ ]"}
            </span>
            <span className="ct-name">
              <span className="ct-code">{c.code}</span>
              <span className="ct-fullname">{c.name}</span>
            </span>
            <span className="ct-issuer">{c.issuer}</span>
            <span className="ct-date">{c.date}</span>
          </div>
        );
      })}
    </div>
  </section>
);

// ─── Memberships ────────────────────────────────────────────────────
const Memberships = ({ density }) => (
  <section className="block" data-screen-label="04 Memberships">
    <Header id="memberships" num="04" title="MEMBERSHIPS" density={density} />
    <div className="memberships">
      <article className="m-card">
        <pre className="m-icon" aria-hidden="true">{`╭───╮
│ACM│
╰───╯`}</pre>
        <div>
          <h3>Association for Computing Machinery</h3>
          <p className="m-sub">Member · Active</p>
          <p className="m-desc">
            Professional society for computing and computing ethics.
          </p>
        </div>
      </article>
    </div>
  </section>
);

// ─── Projects ───────────────────────────────────────────────────────
const projects = [
  {
    n: "001",
    title: "Hybrid Cloud Platform & CI/CD Pipeline",
    period: "Jan 2026 → Present",
    stack: ["AWS", "Terraform", "GitHub Actions", "Docker", "Tailscale"],
    summary:
      "Terraform-provisioned hybrid AWS environment with a zero-downtime CI/CD pipeline bridging a Raspberry Pi 5 homelab and AWS private subnets via Tailscale.",
    bullets: [
      "Architected reproducible VPC + ECS Fargate + ECR infra as code.",
      "Engineered GitHub Actions pipeline: container build → ECR push → Fargate deploy.",
      "Bridged on-prem and cloud over Tailscale with no public ingress.",
    ],
    links: [],
    art: `┌──────────────┐      ╭───────────╮
│ raspberry pi │ ───→ │  tailscale│
└──────────────┘      ╰─────┬─────╯
                            │
                  ┌─────────┴─────────┐
                  │   aws  vpc        │
                  │  ┌──────┐ ┌─────┐ │
                  │  │ ecs  │ │ ecr │ │
                  │  └──────┘ └─────┘ │
                  └───────────────────┘`,
  },
  {
    n: "002",
    title: "Personal Homelab & Network Infrastructure",
    period: "Nov 2025 → Present",
    stack: ["Docker", "Caddy", "Tailscale", "Ollama", "Prometheus", "Grafana"],
    summary:
      "Multi-container homelab: reverse-proxied services on a Zero Trust mesh, self-hosted LLM inference, and full-stack observability.",
    bullets: [
      "Docker Compose + Caddy with automated TLS and localhost-only binding.",
      "Zero Trust mesh via Tailscale, hardened with CrowdSec IPS + BitLocker FDE.",
      "Self-hosted LLM via Ollama, private to the mesh — no external APIs.",
      "Prometheus + Grafana for container health and network observability.",
    ],
    links: [],
    art: `      ╭─[ tailscale mesh ]─╮
      │                    │
   ┌──┴──┐  ┌─────┐  ┌─────┴─┐
   │caddy│──│docker│──│ollama │
   └─────┘  └──┬──┘  └───────┘
              │
        ┌─────┴─────┐
        │ prom+graf │
        └───────────┘`,
  },
  {
    n: "003",
    title: "Black Box: AST Interpreter & TUI",
    period: "2025",
    stack: ["Ruby", "Curses", "BNF", "Visitor Pattern"],
    summary:
      "A full-stack language interpreter for a custom dynamically-typed language — lexer, recursive-descent parser, AST, and a Curses-based TUI for live debugging.",
    bullets: [
      "Custom grammar: arithmetic, bitwise/relational ops, conditionals, while + for-each, function defs.",
      "Recursive-descent parser builds AST with operator precedence + source indexing for error reporting.",
      "Visitor pattern decouples AST from operations — Translater for serialization, Evaluator for runtime.",
      "Scoped runtime with recursion + exception-based return paths; short-circuit logical ops.",
      "Terminal UI (Curses) for testing mystery functions and inspecting evaluator output live.",
    ],
    links: [{ label: "github", href: "https://github.com/haydenmurphey/ruby-ast-interpreter" }],
    art: `  source ─► [lexer] ─► tokens ─► [parser] ─► AST
                                              │
                          ┌───────────────────┤
                       Translater          Evaluator
                          │                   │
                       (text)              (runtime)`,
  },
  {
    n: "004",
    title: "Fixture Flow",
    period: "2025",
    stack: ["JavaScript", "REST APIs", "LocalStorage", "WCAG"],
    summary:
      "An accessibility-first web app for tracking your favorite soccer teams — clean, curated dashboards instead of the information-overload of mainstream sports sites.",
    bullets: [
      "Favorites-first dashboard: pick teams + leagues, get a personal home screen of fixtures and scores.",
      "Real-time integration with third-party fixture APIs; mobile-friendly and fast.",
      "Full CRUD on user-selected teams; preferences persisted via local storage (no login required).",
      "Built WCAG-compliant from the ground up — designed for new fans and students.",
    ],
    links: [{ label: "github", href: "https://github.com/haydenmurphey/fixtureflow" }],
    art: `┌─ favorites ─┐  ┌─ fixtures ──┐
│  ◉ Arsenal  │  │  Sat 15:00  │
│  ◉ Liverpool│→ │  Sun 11:30  │
│  ◯ + add    │  │  Sun 16:00  │
└─────────────┘  └─────────────┘`,
  },
  {
    n: "005",
    title: "Autonomous Search & Rescue Navigation (TurtleBot 3)",
    period: "2024 · CS 354",
    stack: ["Python", "ROS2", "Gazebo", "LiDAR", "OpenCV", "ArUco"],
    summary:
      "Algorithmic movement system for a TurtleBot 3 simulating high-stakes search and rescue. Random-coverage navigation with a breadcrumb trail and real-time victim detection.",
    bullets: [
      "Custom navigation: random target selection in the map frame with a breadcrumb trail to avoid resweeping.",
      "Real-time interrupts on victim detection — pathing yields to identification and localization.",
      "Sensor fusion: LiDAR for obstacle perception + camera + ArUco markers for victim ID.",
      "Validated in Gazebo; benchmarked head-to-head on pathing efficiency and rescue success rate.",
    ],
    links: [{ label: "github", href: "https://github.com/haydenmurphey/ros2-turtlebot3-search-rescue" }],
    art: `      ╭─ map ─────────────────╮
      │   · · ✕ · · · · · ·   │
      │   · ◯─◯─◯ · · ✕ · ·   │   ◯ breadcrumb
      │   · · · ◯─▶ · · · ·   │   ▶ turtlebot
      │   · · · · · · · ✕ ·   │   ✕ victim
      ╰───────────────────────╯`,
  },
  {
    n: "006",
    title: "PintOS",
    period: "2024 · CS 450",
    stack: ["C", "x86", "Operating Systems"],
    summary:
      "Group project for Operating Systems (CS 450) — extending the PintOS instructional kernel: threading, scheduling, syscalls, and virtual memory.",
    bullets: [
      "Worked in a small team inside the Stanford-derived PintOS codebase.",
      "Focused on critical parts: schedulers, kernel threads, traps.",
      "Debugged in QEMU/Bochs.",
    ],
    links: [{ label: "github", href: "https://github.com/haydenmurphey/pintos" }],
    art: `┌─ kernel ────────────────────┐
│  ┌─sched─┐  ┌─threads─┐    │
│  │ ready │→ │ running │    │
│  └───────┘  └─────────┘    │
│  ┌─syscall─┐ ┌──vm──┐      │
│  │  trap   │ │ page │      │
│  └─────────┘ └──────┘      │
└────────────────────────────┘`,
  },
];

const ProjectCard = ({ p, density }) => {
  const [open, setOpen] = useState(p.n === "001");
  return (
    <article className={"project " + (open ? "open" : "")}>
      <button className="p-head" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <span className="p-tog">{open ? "[−]" : "[+]"}</span>
        <span className="p-n">{p.n}</span>
        <span className="p-title">{p.title}</span>
        <span className="p-period">{p.period}</span>
      </button>
      {open && (
        <div className="p-body">
          <p className="p-sum">{p.summary}</p>
          <div className="p-stack">
            {p.stack.map((s) => (
              <span className="chip" key={s}>{s}</span>
            ))}
          </div>
          {density !== "subtle" && (
            <pre className="p-art" aria-hidden="true">{p.art}</pre>
          )}
          <ul className="bullets">
            {p.bullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
          {p.links.length > 0 && (
            <div className="p-links">
              {p.links.map((l) => (
                <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="p-link">
                  → {l.label}
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </article>
  );
};

const Projects = ({ density }) => (
  <section className="block" data-screen-label="05 Projects">
    <Header id="projects" num="05" title="PROJECTS" sub="// click to expand · sorted newest first" density={density} />
    <div className="projects">
      {projects.map((p) => <ProjectCard key={p.n} p={p} density={density} />)}
    </div>
  </section>
);

// ─── Skills ─────────────────────────────────────────────────────────
const skillGroups = [
  {
    name: "Cloud & DevOps",
    items: ["AWS", "Terraform", "Docker", "GitHub Actions", "CI/CD", "Caddy", "Nginx", "API Integration"],
  },
  {
    name: "Languages",
    items: ["Python", "Bash", "C", "PowerShell", "Rust", "Ruby", "Java", "JavaScript", "HTML / CSS", "Haskell"],
  },
  {
    name: "Data",
    items: ["PostgreSQL", "MariaDB", "SQL Server", "Data Warehousing", "NumPy", "pandas"],
  },
  {
    name: "AI & Automation",
    items: ["Ollama (self-hosted LLM)", "Prompt Engineering", "OpenCV", "Automated Testing", "JUnit / pytest"],
  },
  {
    name: "Networking & Security",
    items: ["Tailscale", "Cisco IOS (L2/L3)", "IPS / CrowdSec", "TLS/SSL"],
  },
  {
    name: "Tools & Practices",
    items: ["Git", "JSON / YAML", "Linux / CLI", "Raspberry Pi", "ROS2", "Agile (SCRUM)"],
  },
];

const Skills = ({ density }) => (
  <section className="block" data-screen-label="06 Skills">
    <Header id="skills" num="06" title="SKILLS" density={density} />
    <div className="skills">
      {skillGroups.map((g) => (
        <div className="sk" key={g.name}>
          <h4 className="sk-h">
            <span className="sk-bracket">┌─</span> {g.name} <span className="sk-bracket">─┐</span>
          </h4>
          <ul className="sk-list">
            {g.items.map((it) => (
              <li key={it}><span className="sk-dot">▸</span> {it}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
);

// ─── Experience ─────────────────────────────────────────────────────
const experience = [
  {
    role: "Software Validation – AI Trainer (contract)",
    co: "DataAnnotation",
    period: "May 2025 → Present",
    bullets: [
      "Validated AI-generated code against strict technical specs and logic requirements.",
      "Built Python scripts to test RESTful API integrations; engineered prompts to optimize agentic reasoning + tool-use.",
      "Reproduced edge-case bugs in disposable Docker environments for agentic pentesting.",
    ],
  },
  {
    role: "Geotechnical Technician",
    co: "Townes Site Engineering",
    period: "May 2021 → Aug 2025",
    bullets: [
      "Logged & tracked 10,000+ concrete test specimens across 40+ active projects.",
      "Completed data entry, reporting, and quality standards for concrete, steel, and soil materials.",
      "Coordinated cross-team between field crews, lab staff, and project managers.",
    ],
  },
  {
    role: "Assistant Researcher",
    co: "MusicCPR",
    period: "Oct 2022 → Jul 2023",
    bullets: [
      "Coordinated with professors on solving various bugs within the site.",
      "Conducted independent testing on the site using my background in music.",
      "Balanced being a full-time college student with learning the ins and outs of web development.",
      "Identified key musical instrument redundancies.",
    ],
  },
];

const Experience = ({ density }) => (
  <section className="block" data-screen-label="07 Experience">
    <Header id="experience" num="07" title="EXPERIENCE" density={density} />
    <ol className="timeline">
      {experience.map((e, i) => (
        <li className="tl-item" key={i}>
          <div className="tl-marker" aria-hidden="true">●</div>
          <div className="tl-body">
            <div className="tl-head">
              <h3>{e.role}</h3>
              <span className="tl-co">@ {e.co}</span>
              <span className="tl-period">{e.period}</span>
            </div>
            <ul className="bullets">
              {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  </section>
);

// ─── Contact ────────────────────────────────────────────────────────
const Contact = ({ density }) => (
  <section className="block" data-screen-label="08 Contact">
    <Header id="contact" num="08" title="CONTACT" sub="// best way to reach me: email" density={density} />
    <div className="contact">
      <div className="c-grid">
        <div className="c-row"><span className="c-k">email   </span><a href="mailto:hsmurphey@gmail.com">hsmurphey@gmail.com</a></div>
        <div className="c-row"><span className="c-k">phone   </span><a href="tel:+18046299870">804-629-9870</a></div>
        <div className="c-row"><span className="c-k">github  </span><a href="https://github.com/haydenmurphey" target="_blank" rel="noreferrer">github.com/haydenmurphey</a></div>
        <div className="c-row"><span className="c-k">linkedin</span><a href="https://linkedin.com/in/haydenmurphey" target="_blank" rel="noreferrer">linkedin.com/in/haydenmurphey</a></div>
        <div className="c-row"><span className="c-k">resume  </span><a href="./hayden_murphey_2026.pdf" target="_blank" rel="noreferrer">hayden_murphey_2026.pdf</a></div>
      </div>
    </div>
  </section>
);

// ─── Sidebar ────────────────────────────────────────────────────────
const NAV = [
  { id: "top", label: "home", n: "0" },
  { id: "about", label: "about", n: "1" },
  { id: "education", label: "education", n: "2" },
  { id: "certs", label: "certifications", n: "3" },
  { id: "memberships", label: "memberships", n: "4" },
  { id: "projects", label: "projects", n: "5" },
  { id: "skills", label: "skills", n: "6" },
  { id: "experience", label: "experience", n: "7" },
  { id: "contact", label: "contact", n: "8" },
];

const Sidebar = ({ active, onNav }) => {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const hh = String(d.getHours()).padStart(2, "0");
      const mm = String(d.getMinutes()).padStart(2, "0");
      const ss = String(d.getSeconds()).padStart(2, "0");
      setTime(`${hh}:${mm}:${ss}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <aside className="sidebar">
      <div className="sb-id">
        <pre aria-hidden="true">{`╭─────────────╮
│  hm.site    │
╰─────────────╯`}</pre>
      </div>

      <nav className="sb-nav" aria-label="sections">
        <p className="sb-h">// nav</p>
        {NAV.map((item) => (
          <button
            key={item.id}
            onClick={() => onNav(item.id)}
            className={"sb-link " + (active === item.id ? "active" : "")}
          >
            <span className="sb-num">{item.n}</span>
            <span className="sb-arrow">{active === item.id ? "▸" : " "}</span>
            <span className="sb-lbl">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sb-foot">
        <p className="sb-h">// keys</p>
        <div className="sb-keys">
          <div><kbd>j</kbd> <kbd>k</kbd> next/prev</div>
          <div><kbd>1</kbd>–<kbd>8</kbd> jump</div>
          <div><kbd>g</kbd> top · <kbd>G</kbd> end</div>
        </div>
        <p className="sb-h">// status</p>
        <div className="sb-status">
          <div>local · {time}</div>
        </div>
      </div>
    </aside>
  );
};

// ─── App Configuration ──────────────────────────────────────────────
const STATIC_CONFIG = {
  theme: "cream",        // options: "cream", "paper", "mono", "term", "amber"
  density: "moderate",   // options: "subtle", "moderate", "heavy"
  fontSize: 14,
  scanlines: false       // true or false
};

// ─── App ────────────────────────────────────────────────────────────
const App = () => {
  const values = STATIC_CONFIG;
  const [active, setActive] = useState("top");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  
  // apply theme tokens to <html>
  useEffect(() => {
    document.documentElement.dataset.theme = values.theme;
    document.documentElement.dataset.density = values.density;
    document.documentElement.dataset.scan = values.scanlines ? "on" : "off";
    document.documentElement.style.setProperty("--fs-base", values.fontSize + "px");
  }, [values]);

  const navTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 24;
    window.scrollTo({ top, behavior: "smooth" });
    setMobileNavOpen(false);
  }, []);

  // sync mobile-nav attr on <html> + lock scroll
  useEffect(() => {
    document.documentElement.dataset.mobileNav = mobileNavOpen ? "open" : "closed";
    document.body.style.overflow = mobileNavOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileNavOpen]);

  // active section observer
  useEffect(() => {
    const opts = { rootMargin: "-30% 0px -60% 0px", threshold: 0 };
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setActive(e.target.id);
      });
    }, opts);
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  // keyboard nav
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      const idx = NAV.findIndex((n) => n.id === active);
      if (e.key === "j") { e.preventDefault(); navTo(NAV[Math.min(NAV.length - 1, idx + 1)].id); }
      else if (e.key === "k") { e.preventDefault(); navTo(NAV[Math.max(0, idx - 1)].id); }
      else if (e.key === "g" && !e.shiftKey) { navTo("top"); }
      else if (e.key === "G") { navTo("contact"); }
      else if (/^[0-8]$/.test(e.key)) {
        const found = NAV.find((n) => n.n === e.key);
        if (found) navTo(found.id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, navTo]);

  return (
    <div className="app">
      <header className="topbar" aria-label="mobile nav">
        <div className="tb-id">
          hm<span className="tb-dot">·</span>portfolio
        </div>
        <button
          className="tb-burger"
          aria-expanded={mobileNavOpen}
          onClick={() => setMobileNavOpen((o) => !o)}
        >
          {mobileNavOpen ? "[ × close ]" : "[ ≡ menu ]"}
        </button>
      </header>
      <div className="scrim" onClick={() => setMobileNavOpen(false)} aria-hidden="true" />

      <Sidebar active={active} onNav={navTo} />

      <main className="main">
        <Hero density={values.density} onNav={navTo} />
        <About density={values.density} />
        <Education density={values.density} />
        <Certifications density={values.density} />
        <Memberships density={values.density} />
        <Projects density={values.density} />
        <Skills density={values.density} />
        <Experience density={values.density} />
        <Contact density={values.density} />
        <footer className="foot">
          <pre aria-hidden="true">{rule(60, "═")}</pre>
          <p>© 2026 Hayden Murphey</p>
        </footer>
      </main>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);