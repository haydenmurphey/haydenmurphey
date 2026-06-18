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
  const tagline = "Building developer tools at Murphey Labs · Cloud & Security background · Richmond, VA";

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
          <span className="meta-v">Founder, Murphey Labs · Software &amp; Cloud Engineer</span>
        </div>
        <div className="meta-row">
          <span className="meta-k">loc&nbsp;</span>
          <span className="meta-sep">::</span>
          <span className="meta-v">Richmond, VA · 38.0°N, 77.4°W</span>
        </div>
        <div className="meta-row">
          <span className="meta-k">stat</span>
          <span className="meta-sep">::</span>
          <span className="meta-v stat-ok">● open to the right role</span>
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
        <button onClick={() => onNav("labs")} className="qbtn">→ murphey labs</button>
        <span className="qsep">│</span>
        <a href="https://murpheylabs.com" target="_blank" rel="noreferrer" className="qbtn">→ murpheylabs.com</a>
        <span className="qsep">│</span>
        <a href="https://github.com/haydenmurphey" target="_blank" rel="noreferrer" className="qbtn">→ github</a>
        <span className="qsep">│</span>
        <a href="mailto:hsmurphey@gmail.com" className="qbtn">→ email</a>
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
        I run <em>Murphey Labs</em>, a solo software studio building developer tools — currently PinDex, an
        element-anchored visual-feedback tool for web developers. I fund the studio with contract
        AI-engineering work for frontier labs (under NDA): evaluating and red-teaming AI-generated code
        against strict specs, logic, and security requirements.
      </p>
      <p>
        I'm a Computer Science graduate from James Madison University (Dec 2025) with a strong background in
        cloud architecture, security, and automation, and a bias toward systems that are reproducible,
        observable, and solid. I'm open to the right role alongside the studio. Outside of programming, you can
        find me playing bass/guitar, soccer, rock-climbing, or snowboarding.
      </p>
    </div>
  </section>
);

// ─── Education ──────────────────────────────────────────────────────
const Education = ({ density }) => (
  <section className="block" data-screen-label="03 Education">
    <Header id="education" num="03" title="EDUCATION" density={density} />
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
        <li>Music Minor: Focus on Guitar, Bass, Piano, and Drums.</li>
      </ul>
    </article>
  </section>
);

// ─── Certifications ─────────────────────────────────────────────────
const certs = [
  { name: "AWS Certified Solutions Architect – Associate", issuer: "Amazon Web Services", date: "Apr 2026", code: "SAA-C03" },
  { name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", date: "Feb 2026", code: "CLF-C02" },
  { name: "Certified in Cybersecurity (CC)", issuer: "(ISC)²", date: "Feb 2025", code: "ISC2-CC" },
  { name: "Machine Learning Specialization", issuer: "Stanford / DeepLearning.AI", date: "May 2026", code: "ML-SPEC" },
];

const Certifications = ({ density }) => (
  <section className="block" data-screen-label="04 Certifications">
    <Header id="certs" num="04" title="CERTIFICATIONS" density={density} />
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
  <section className="block" data-screen-label="05 Memberships">
    <Header id="memberships" num="05" title="MEMBERSHIPS" density={density} />
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

// ─── Murphey Labs (commercial products) ─────────────────────────────
const products = [
  {
    name: "PinDex",
    tagline:
      "Chrome extension + web app for solo web freelancers to leave element-anchored visual feedback on client staging sites. Clients review a shareable punch-list via link — no install.",
    stack: ["WXT", "React", "TypeScript", "Hono (Cloudflare Workers)", "Next.js", "Zod"],
    status: "coming-soon", // "shipped" | "in-progress" | "coming-soon"
    links: [], // e.g. { label: "live", href: "..." }, { label: "repo", href: "..." }
  },
];

const PROD_STATUS = {
  "shipped":      { dot: "●", label: "shipped",     cls: "ok" },
  "in-progress":  { dot: "◐", label: "in progress", cls: "pending" },
  "coming-soon":  { dot: "○", label: "coming soon", cls: "pending" },
};

const ProductCard = ({ p }) => {
  const s = PROD_STATUS[p.status] ?? PROD_STATUS["coming-soon"];
  return (
    <article className="product card">
      <div className="card-top">
        <div>
          <h3 className="card-title">{p.name}</h3>
          <p className="card-sub">{p.tagline}</p>
        </div>
        <div className="card-meta">
          <span className={"prod-status " + s.cls}>{s.dot} {s.label}</span>
        </div>
      </div>
      <div className="p-stack">
        {p.stack.map((x) => <span className="chip" key={x}>{x}</span>)}
      </div>
      {p.links.length > 0 && (
        <div className="p-links">
          {p.links.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="p-link">→ {l.label}</a>
          ))}
        </div>
      )}
    </article>
  );
};

const MurpheyLabs = ({ density }) => (
  <section className="block" data-screen-label="02 Murphey Labs">
    <Header id="labs" num="02" title="MURPHEY LABS" sub="// shipped products · solo software studio" density={density} />
    <div className="prose">
      <p>
        Developer tools out of <a href="https://murpheylabs.com" target="_blank" rel="noreferrer">murpheylabs.com</a> — a
        solo studio, funded by contract AI-engineering work for frontier labs.
      </p>
    </div>
    <div className="products">
      {products.map((p) => <ProductCard key={p.name} p={p} />)}
    </div>
  </section>
);

// ─── Projects ───────────────────────────────────────────────────────
const projects = [
  {
    n: "001",
    title: "Proxmox Homelab Infrastructure",
    period: "Nov 2025 → Present",
    stack: ["Proxmox VE", "Tailscale", "Caddy", "Ansible", "SOPS / age", "PBS", "Docker Compose"],
    summary:
      "Single-node Proxmox homelab on a GMKtec M6 Ultra — Tailscale-only access with zero inbound, IaC-defined, SOPS-encrypted secrets, fully monitored and backed up.",
    bullets: [
      "Failure-domain split: critical services (DNS, proxy, Vaultwarden) run as unprivileged LXCs; the app tier and AI workstation are isolated in separate VMs.",
      "Zero-trust network: Tailscale-only with default-deny, tag-based ACLs (tag:admin / tag:server), zero inbound, no port-forwards.",
      "Single Caddy ingress with wildcard TLS via Cloudflare DNS-01 — browser-trusted certs for tailnet-only services; split-horizon DNS via Pi-hole + Unbound.",
      "Secrets encrypted at rest with SOPS + age (plaintext never hits the repo); service credentials in self-hosted Vaultwarden.",
      "Nightly vzdump to Proxmox Backup Server on a dedicated disk, with DB-consistent pre-dump hooks (pg_dump / SQLite) plus weekly verify + GC.",
      "Observability via Beszel (host/container metrics) + Uptime Kuma (service health) + self-hosted ntfy push; SSH hardening + unattended-upgrades via Ansible (WIP).",
    ],
    links: [{ label: "github", href: "https://github.com/haydenmurphey/homelab-infra" }],
    art: `      ╭─[ tailnet · zero inbound ]─╮
      │                            │
  ┌───┴────┐                  ┌────┴─────┐
  │proxmox │ ── caddy :443 ──▶│  *.lab   │
  │   ve   │   DNS-01 TLS     │ services │
  └───┬────┘                  └──────────┘
      │  LXC: dns·proxy·vault   VM: apps·ai·pbs
      ▼
  nightly vzdump ──▶ PBS (SSD #2)`,
  },
  {
    n: "002",
    title: "Black Box: AST Interpreter & TUI",
    period: "Feb 2025 → May 2025",
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
    n: "003",
    title: "Fixture Flow",
    period: "Feb 2025 → May 2025",
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
    n: "004",
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
    n: "005",
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
  <section className="block" data-screen-label="06 Projects">
    <Header id="projects" num="06" title="PROJECTS" sub="// click to expand · sorted newest first" density={density} />
    <div className="projects">
      {projects.map((p) => <ProjectCard key={p.n} p={p} density={density} />)}
    </div>
  </section>
);

// ─── Skills ─────────────────────────────────────────────────────────
const skillGroups = [
  {
    name: "Cloud & DevOps",
    items: ["AWS — EC2 · Lambda · S3 · VPC · IAM · CloudWatch", "Terraform", "Ansible", "Docker", "Kubernetes (k3s)", "GitHub Actions", "ArgoCD"],
  },
  {
    name: "Observability",
    items: ["Prometheus", "Grafana", "Loki", "Alertmanager", "Uptime Kuma", "Beszel"],
  },
  {
    name: "Networking & Security",
    items: ["Tailscale (Zero Trust)", "Caddy", "Pi-hole / Unbound", "Split-horizon DNS", "TLS / DNS-01 (Cloudflare)", "CrowdSec", "Full-disk encryption"],
  },
  {
    name: "Languages",
    items: ["Python", "JavaScript / TypeScript", "Java", "C", "Rust", "Ruby", "Bash", "PowerShell", "SQL", "Haskell"],
  },
  {
    name: "Frameworks & Web",
    items: ["React", "Next.js", "Node.js", "Vercel", "Flutter / Dart", "Nginx", "HTML / CSS"],
  },
  {
    name: "Data & Backend",
    items: ["PostgreSQL", "Supabase", "REST APIs", "JSON / YAML", "NumPy", "pandas"],
  },
  {
    name: "AI / ML",
    items: ["Prompt engineering", "AI code validation", "ML fundamentals (Stanford / DeepLearning.AI)", "Self-hosted LLM (Ollama)"],
  },
  {
    name: "Tools & Practices",
    items: ["Git", "Linux / CLI", "pytest", "Automated testing", "Agile (SCRUM)", "Object-Oriented Design", "ROS2", "OpenCV", "Raspberry Pi"],
  },
];

const Skills = ({ density }) => (
  <section className="block" data-screen-label="07 Skills">
    <Header id="skills" num="07" title="SKILLS" density={density} />
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
    role: "AI Engineering Contractor (frontier labs, NDA)",
    co: "Contract · NDA",
    period: "May 2025 → Present",
    bullets: [
      "Evaluate and red-team AI-generated code from frontier models against strict specs, logic, and security requirements.",
      "Build Python harnesses to test RESTful API integrations; engineer prompts to probe agentic reasoning and tool-use.",
      "Reproduce edge-case vulnerabilities in disposable Docker sandboxes for agentic pentesting.",
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
  <section className="block" data-screen-label="08 Experience">
    <Header id="experience" num="08" title="EXPERIENCE" density={density} />
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
  <section className="block" data-screen-label="09 Contact">
    <Header id="contact" num="09" title="CONTACT" sub="// best way to reach me: email" density={density} />
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

// ─── Theme config ───────────────────────────────────────────────────
const THEMES = [
  { id: "cream",      dot: "○", name: "LIGHT", sub: "light"  },
  { id: "cream-dark", dot: "●", name: "DARK",  sub: "dark"    },
  { id: "neon",       dot: "◉", name: "NEON",  sub: "terminal"   },
];
const THEME_CYCLE = { cream: "cream-dark", "cream-dark": "neon", neon: "cream" };

// ─── Sidebar ────────────────────────────────────────────────────────
const NAV = [
  { id: "top", label: "home", n: "0" },
  { id: "about", label: "about", n: "1" },
  { id: "labs", label: "murphey labs", n: "2" },
  { id: "education", label: "education", n: "3" },
  { id: "certs", label: "certifications", n: "4" },
  { id: "memberships", label: "memberships", n: "5" },
  { id: "projects", label: "projects", n: "6" },
  { id: "skills", label: "skills", n: "7" },
  { id: "experience", label: "experience", n: "8" },
  { id: "contact", label: "contact", n: "9" },
];

const Sidebar = ({ active, onNav, activeTheme, onSetTheme }) => {
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
      <div className="sb-theme">
        <p className="sb-h">// theme</p>
        <div className="theme-opts">
          {THEMES.map((t) => (
            <button
              key={t.id}
              className={"theme-opt" + (activeTheme === t.id ? " selected" : "")}
              data-opt={t.id}
              onClick={() => onSetTheme(t.id)}
              aria-pressed={activeTheme === t.id}
            >
              <span className="topt-dot">{t.dot}</span>
              <span className="topt-name">{t.name}</span>
              <span className="topt-sub">{t.sub}</span>
            </button>
          ))}
        </div>
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

      <div className="sb-links">
        <p className="sb-h">// links</p>
        <div className="sb-lnks">
          <a href="https://murpheylabs.com" target="_blank" rel="noreferrer" className="sb-ext">
            <span className="sb-ext-arr">→</span> murpheylabs.com
          </a>
          <a href="https://github.com/haydenmurphey" target="_blank" rel="noreferrer" className="sb-ext">
            <span className="sb-ext-arr">→</span> github
          </a>
          <a href="https://linkedin.com/in/haydenmurphey" target="_blank" rel="noreferrer" className="sb-ext">
            <span className="sb-ext-arr">→</span> linkedin
          </a>
          <a href="./hayden_murphey_2026.pdf" target="_blank" rel="noreferrer" className="sb-ext">
            <span className="sb-ext-arr">→</span> resume.pdf
          </a>
          <a href="mailto:hsmurphey@gmail.com" className="sb-ext">
            <span className="sb-ext-arr">→</span> email
          </a>
        </div>
      </div>

      <div className="sb-foot">
        <p className="sb-h">// status</p>
        <div className="sb-status">
          <div><span className="sb-st-k">time ·</span> {time}</div>
          <div><span className="sb-st-k">zone ·</span> EST / UTC−5</div>
          <div><span className="sb-st-k">avail ·</span> <span className="stat-ok">● open</span></div>
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
  const [activeTheme, setActiveTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved && ["cream", "cream-dark", "neon"].includes(saved)) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "cream-dark" : "cream";
  });

  const setTheme = useCallback((id) => {
    localStorage.setItem("theme", id);
    setActiveTheme(id);
  }, []);

  // apply theme tokens to <html>
  useEffect(() => {
    document.documentElement.dataset.theme = activeTheme;
    document.documentElement.dataset.density = values.density;
    document.documentElement.dataset.scan = values.scanlines ? "on" : "off";
    document.documentElement.style.setProperty("--fs-base", values.fontSize + "px");
  }, [activeTheme, values]);

  const navLockRef = useRef(null);

  const navTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 24;
    setActive(id);
    clearTimeout(navLockRef.current);
    navLockRef.current = setTimeout(() => { navLockRef.current = null; }, 800);
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
        if (e.isIntersecting && !navLockRef.current) setActive(e.target.id);
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
      else if (/^[0-9]$/.test(e.key)) {
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
          className="tb-theme"
          onClick={() => setTheme(THEME_CYCLE[activeTheme])}
          aria-label="cycle colour theme"
        >
          [{THEMES.find((t) => t.id === activeTheme)?.dot ?? "○"}]
        </button>
        <button
          className="tb-burger"
          aria-expanded={mobileNavOpen}
          onClick={() => setMobileNavOpen((o) => !o)}
        >
          {mobileNavOpen ? "[ × close ]" : "[ ≡ menu ]"}
        </button>
      </header>
      <div className="scrim" onClick={() => setMobileNavOpen(false)} aria-hidden="true" />

      <Sidebar active={active} onNav={navTo} activeTheme={activeTheme} onSetTheme={setTheme} />

      <main className="main">
        <Hero density={values.density} onNav={navTo} />
        <About density={values.density} />
        <MurpheyLabs density={values.density} />
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