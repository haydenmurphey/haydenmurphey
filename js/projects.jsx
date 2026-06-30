/* global React */
const { useState, useEffect, useRef } = React;

const PROJECTS = [
  {
    title: "Proxmox Homelab Infrastructure",
    category: {
      en: "Infrastructure / DevOps",
      es: "Infraestructura / DevOps",
    },
    summary: {
      en: "Single-node Proxmox homelab — Tailscale-only zero-inbound access, IaC-defined with SOPS-encrypted secrets, fully monitored and backed up.",
      es: "Homelab Proxmox de un solo nodo — acceso exclusivo por Tailscale sin puertos entrantes, definido como IaC con secretos cifrados con SOPS, totalmente monitoreado y respaldado.",
    },
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
    category: {
      en: "Languages / Compilers",
      es: "Lenguajes / Compiladores",
    },
    summary: {
      en: "Full-stack language interpreter — lexer, recursive-descent parser, AST, and a Curses-based TUI for live debugging of a custom dynamically-typed language.",
      es: "Intérprete de lenguaje completo — lexer, parser de descenso recursivo, AST y una interfaz de texto basada en Curses para depurar en vivo un lenguaje propio de tipado dinámico.",
    },
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
    category: {
      en: "Web App / Accessibility",
      es: "Aplicación Web / Accesibilidad",
    },
    summary: {
      en: "Accessibility-first web app for tracking favorite soccer teams — curated dashboards over information overload. WCAG-compliant, LocalStorage-persisted, no login required.",
      es: "Aplicación web centrada en la accesibilidad para seguir a tus equipos de fútbol favoritos — paneles cuidados en lugar de sobrecarga de información. Conforme a WCAG, con persistencia en LocalStorage y sin necesidad de iniciar sesión.",
    },
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
    category: {
      en: "Robotics / AI / Vision",
      es: "Robótica / IA / Visión",
    },
    summary: {
      en: "TurtleBot 3 navigation system for simulated search and rescue — random-coverage with breadcrumb trail and real-time victim detection via LiDAR + ArUco markers.",
      es: "Sistema de navegación TurtleBot 3 para búsqueda y rescate simulados — cobertura aleatoria con rastro de migas y detección de víctimas en tiempo real mediante LiDAR y marcadores ArUco.",
    },
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
    category: {
      en: "Systems / Operating Systems",
      es: "Sistemas / Sistemas Operativos",
    },
    summary: {
      en: "Group project extending the Stanford PintOS instructional kernel — threading, scheduling, system calls, and virtual memory in C on x86.",
      es: "Proyecto en equipo que amplía el kernel educativo PintOS de Stanford — hilos, planificación, llamadas al sistema y memoria virtual en C sobre x86.",
    },
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

function ProjectsView({ lang = 'en', isMobile, contentPhase }) {
  const t = window.PF.STRINGS[lang] || window.PF.STRINGS.en;
  const [activeProject, setActiveProject] = useState(0);
  const [textStyle, setTextStyle] = useState(VISIBLE_STYLE);
  const [hasNavigated, setHasNavigated] = useState(false);
  const animating = useRef(false);
  const activeRef = useRef(0);
  const touchX = useRef(0);
  const touchY = useRef(0);
  const changeRef = useRef(null);

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
    const onTouchStart = (e) => {
      touchX.current = e.touches[0].clientX;
      touchY.current = e.touches[0].clientY;
    };
    const onTouchEnd = (e) => {
      const dx = touchX.current - e.changedTouches[0].clientX;
      const dy = touchY.current - e.changedTouches[0].clientY;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) changeRef.current(dx > 0 ? 1 : -1);
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
          <h1 className="projects-spa__heading">{lang === 'es' ? 'Proyectos Seleccionados' : 'Selected Projects'}</h1>

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
            <p className="projects-spa__category">{proj.category[lang] || proj.category.en}</p>
            <p className="projects-spa__summary">{proj.summary[lang] || proj.summary.en}</p>
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
