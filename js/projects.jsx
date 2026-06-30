/* global React */
const { useState, useEffect, useRef } = React;

const PROJECTS = [
  {
    title: "Proxmox Homelab Infrastructure",
    category: "Infrastructure / DevOps",
    summary: "Single-node Proxmox homelab — Tailscale-only zero-inbound access, IaC-defined with SOPS-encrypted secrets, fully monitored and backed up.",
    stack: ["Proxmox VE", "Tailscale", "Caddy", "Ansible", "SOPS/age", "Docker"],
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
    title: "Fixture Flow",
    category: "Web App / Accessibility",
    summary: "Accessibility-first web app for tracking favorite soccer teams — curated dashboards over information overload. WCAG-compliant, LocalStorage-persisted, no login required.",
    stack: ["JavaScript", "REST APIs", "LocalStorage", "WCAG"],
    github: "https://github.com/haydenmurphey/fixtureflow",
    art: `┌─ favorites ─┐  ┌─ fixtures ──┐
│  ◉ Arsenal  │  │  Sat 15:00  │
│  ◉ Liverpool│→ │  Sun 11:30  │
│  ◯ + add    │  │  Sun 16:00  │
└─────────────┘  └─────────────┘`,
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

function ProjectsView({ isMobile, contentPhase }) {
  const [activeProject, setActiveProject] = useState(0);
  const [textStyle, setTextStyle] = useState(VISIBLE_STYLE);
  const animating = useRef(false);
  const activeRef = useRef(0);
  const touchY = useRef(0);
  const changeRef = useRef(null);

  function changeProject(dir) {
    if (animating.current) return;
    const next = Math.max(0, Math.min(PROJECTS.length - 1, activeRef.current + dir));
    if (next === activeRef.current) return;

    animating.current = true;
    setTextStyle(HIDING_STYLE);

    setTimeout(() => {
      activeRef.current = next;
      setActiveProject(next);
      setTextStyle(INCOMING_STYLE);
      requestAnimationFrame(() => {
        void document.body.offsetHeight;
        setTextStyle(VISIBLE_STYLE);
        setTimeout(() => { animating.current = false; }, 400);
      });
    }, 230);
  }

  changeRef.current = changeProject;

  useEffect(() => {
    const onWheel = (e) => {
      e.preventDefault();
      if (Math.abs(e.deltaY) < 5) return;
      changeRef.current(e.deltaY > 0 ? 1 : -1);
    };
    const onKey = (e) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") changeRef.current(1);
      else if (e.key === "ArrowUp" || e.key === "ArrowLeft") changeRef.current(-1);
    };
    const onTouchStart = (e) => { touchY.current = e.touches[0].clientY; };
    const onTouchEnd = (e) => {
      const dy = touchY.current - e.changedTouches[0].clientY;
      if (Math.abs(dy) > 50) changeRef.current(dy > 0 ? 1 : -1);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  const proj = PROJECTS[activeProject];
  const total = String(PROJECTS.length).padStart(2, "0");
  const num = String(activeProject + 1).padStart(2, "0");

  const outerStyle =
    contentPhase === "entering"
      ? { opacity: 0, transition: "none" }
      : contentPhase === "exiting"
      ? { opacity: 0, transition: "opacity 0.3s ease" }
      : { opacity: 1, transition: "opacity 0.4s ease" };

  return (
    <div className={`projects-spa${isMobile ? " projects-spa--mobile" : ""}`} style={outerStyle}>
      <div className="projects-spa__main">
        {/* LEFT: image carousel + heading */}
        <div className="projects-spa__left">
          <h1 className="projects-spa__heading">Selected Projects</h1>

          <div className="carousel">
            {PROJECTS.map((p, i) => {
              const offset = i === activeProject ? 0 : i < activeProject ? -100 : 100;
              return (
                <div
                  key={i}
                  className="carousel__panel"
                  style={{ transform: `translateY(${offset}%)` }}
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
                  background: i === activeProject ? "rgba(27,24,18,0.55)" : "rgba(27,24,18,0.18)",
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
    </div>
  );
}

window.PF.ProjectsView = ProjectsView;
