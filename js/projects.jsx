/* global React */
const { useState, useEffect, useRef } = React;

const PROJECTS = [
  {
    title: "LLM Agent Security Eval Harness",
    category: "AI Evaluation / Security",
    summary: "Docker benchmark testing whether LLM agents can find and exploit an SSRF bug. An agent loop drives an MCP tool, traces every call in Langfuse, and labels each failure by root cause. Across 50 runs, no local model found it unaided.",
    stack: ["Python", "Docker", "MCP", "LiteLLM", "Langfuse", "Ollama"],
    github: "https://github.com/haydenmurphey/ssrf-eval",
    art: `  agent ──▶ [ MCP: http_request ]
  (LiteLLM)        │ allowlist
     │             ▼
     │      vulnerable-app ──SSRF──▶ internal
     │        public-net           dashboard
     ▼                              /admin/secrets
  Langfuse trace ──▶ scorer ──▶ failure label`,
  },
  {
    title: "Proxmox Homelab Infrastructure",
    category: "Infrastructure / DevOps",
    summary: "Proxmox homelab defined as code (4 LXCs, 3 VMs, PBS) with no open inbound ports: Tailscale ACLs, split-horizon DNS, Caddy TLS, and CrowdSec. Alerting via Alertmanager, Uptime Kuma, and ntfy; local LLM inference on Ollama.",
    stack: ["Proxmox VE", "Tailscale", "Caddy", "Docker", "CrowdSec", "Ollama"],
    github: "https://github.com/haydenmurphey/homelab-infra",
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
    title: "Black Box: AST Interpreter",
    category: "Languages / Compilers",
    summary: "Full-stack language interpreter — lexer, recursive-descent parser, AST, and a Curses-based TUI for live debugging of a custom dynamically-typed language.",
    stack: ["Ruby", "Curses", "BNF", "Visitor Pattern"],
    github: "https://github.com/haydenmurphey/ruby-ast-interpreter",
    art: `  source ─► [lexer] ─► tokens ─► [parser] ─► AST
                                              │
                          ┌───────────────────┤
                       Translater          Evaluator
                          │                   │
                       (text)              (runtime)`,
  },
  {
    title: "Autonomous Search & Rescue",
    category: "Robotics / AI / Vision",
    summary: "TurtleBot 3 navigation system for simulated search and rescue — random-coverage with breadcrumb trail and real-time victim detection via LiDAR + ArUco markers.",
    stack: ["Python", "ROS2", "Gazebo", "LiDAR", "OpenCV", "ArUco"],
    github: "https://github.com/haydenmurphey/ros2-turtlebot3-search-rescue",
    art: `      ╭─ map ─────────────────╮
      │   · · ✕ · · · · · ·   │
      │   · ◯─◯─◯ · · ✕ · ·   │   ◯ breadcrumb
      │   · · · ◯─▶ · · · ·   │   ▶ turtlebot
      │   · · · · · · · ✕ ·   │   ✕ victim
      ╰───────────────────────╯`,
  },
  {
    title: "PintOS",
    category: "Systems / Operating Systems",
    summary: "Group project extending the Stanford PintOS instructional kernel — threading, scheduling, system calls, and virtual memory in C on x86.",
    stack: ["C", "x86", "QEMU/Bochs", "PintOS"],
    github: "https://github.com/haydenmurphey/pintos",
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

const VISIBLE_STYLE  = { opacity: 1, transform: "none",                                                               transition: "opacity 0.35s ease, transform 0.35s ease" };
const HIDING_STYLE   = { opacity: 0, transform: "perspective(450px) rotateX(-18deg) translateY(-10px)",               transition: "opacity 0.2s ease, transform 0.2s ease"  };
const INCOMING_STYLE = { opacity: 0, transform: "perspective(450px) rotateX(18deg) translateY(10px)",                 transition: "none"                                     };

// Mobile: slide horizontally to match the carousel's left/right motion
const HIDING_STYLE_M   = { opacity: 0, transform: "translateX(-24px)", transition: "opacity 0.2s ease, transform 0.2s ease" };
const INCOMING_STYLE_M = { opacity: 0, transform: "translateX(24px)",  transition: "none"                                    };

function ProjectsView({ isMobile, registerStep }) {
  const t = window.PF.STRINGS;
  const [activeProject, setActiveProject] = useState(0);
  const [textStyle, setTextStyle] = useState(VISIBLE_STYLE);
  const [hasNavigated, setHasNavigated] = useState(false);
  const animating = useRef(false);
  const activeRef = useRef(0);

  const hideStyle     = isMobile ? HIDING_STYLE_M   : HIDING_STYLE;
  const incomingStyle = isMobile ? INCOMING_STYLE_M : INCOMING_STYLE;

  function changeProject(dir) {
    if (animating.current) return;
    const next = Math.max(0, Math.min(PROJECTS.length - 1, activeRef.current + dir));
    if (next === activeRef.current) return;

    setHasNavigated(true);
    animating.current = true;
    setTextStyle(hideStyle);

    setTimeout(() => {
      activeRef.current = next;
      setActiveProject(next);
      setTextStyle(incomingStyle);
      requestAnimationFrame(() => {
        void document.body.offsetHeight;
        setTextStyle(VISIBLE_STYLE);
        setTimeout(() => { animating.current = false; }, 400);
      });
    }, 230);
  }

  // Deck hook: step through projects; at either end, hand off to the deck.
  if (registerStep) registerStep((dir) => {
    if (animating.current) return true;
    const next = activeRef.current + dir;
    if (next < 0 || next >= PROJECTS.length) return false;
    changeProject(dir);
    return true;
  });

  const proj = PROJECTS[activeProject];
  const total = String(PROJECTS.length).padStart(2, "0");
  const num = String(activeProject + 1).padStart(2, "0");

  return (
    <div className={`projects-spa${isMobile ? " projects-spa--mobile" : ""}`}>
      <h1 className="projects-spa__heading section-title">Selected Projects</h1>
      <div className="projects-spa__main">
        {/* LEFT: image carousel + heading */}
        <div className="projects-spa__left">
          <div className="carousel">
            {PROJECTS.map((p, i) => {
              const offset = i === activeProject ? 0 : i < activeProject ? -100 : 100;
              return (
                <div
                  key={i}
                  className="carousel__panel"
                  style={{ transform: isMobile ? `translateX(${offset}%)` : `translateY(${offset}%)` }}
                >
                  <div className="carousel__placeholder">
                    <pre className="carousel__art">{p.art}</pre>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="progress-dots">
            {PROJECTS.map((_, i) => (
              <span
                key={i}
                className="progress-dot"
                style={{
                  width: i === activeProject ? "22px" : "6px",
                  background: i === activeProject ? "var(--terracotta)" : "rgba(27,24,18,0.18)",
                }}
              />
            ))}
          </div>
        </div>

        {/* RIGHT: animated project details */}
        <div className="projects-spa__right">
          <div style={{ ...textStyle, transformOrigin: "center center", textAlign: "center", width: "100%" }}>
            <p className="projects-spa__counter">[ {num} / {total} ]</p>
            <h2 className="projects-spa__title">{proj.title}</h2>
            <p className="projects-spa__category">{proj.category}</p>
            <p className="projects-spa__summary">{proj.summary}</p>
            <div className="projects-spa__chips">
              {proj.stack.map((chip) => (
                <span key={chip} className="projects-spa__chip">{chip}</span>
              ))}
            </div>
            <a
              className="projects-spa__github"
              href={proj.github}
              target="_blank"
              rel="noreferrer"
            >
              <span>→</span><span>github</span>
            </a>
          </div>
        </div>
      </div>

      {isMobile && !hasNavigated && (
        <div className="swipe-cue swipe-cue--visible">
          <span className="swipe-cue__arrow">→</span>
          <span className="swipe-cue__label">{t.swipe}</span>
        </div>
      )}
    </div>
  );
}

window.PF.ProjectsView = ProjectsView;
