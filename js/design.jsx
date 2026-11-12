/* global React */
const { useState, useEffect, useRef } = React;

const PIECES = [
  { title: "SIGNAL",      year: "2025", src: "/design_page/first.jpg"  },
  { title: "FLY",         year: "2025", src: "/design_page/second.jpg" },
  { title: "COMET FACE",  year: "2026", src: "/design_page/third.JPEG" },
];

function DesignView({ isMobile, registerStep }) {
  const [hover, setHover] = useState(null);
  const [activeIdx, setActiveIdx]       = useState(0);
  const [hasNavigated, setHasNavigated] = useState(false);
  const cooldown    = useRef(false);
  const activeRef   = useRef(0);

  function navigate(nextIdx) {
    if (cooldown.current) return;
    if (nextIdx < 0 || nextIdx >= PIECES.length) return;
    if (nextIdx === activeRef.current) return;
    cooldown.current = true;
    activeRef.current = nextIdx;
    setActiveIdx(nextIdx);
    setHasNavigated(true);
    setTimeout(() => { cooldown.current = false; }, 500);
  }

  // Deck hook: only the mobile carousel has steps — the desktop gallery
  // shows every piece at once, so scrolling there moves straight on.
  if (registerStep) registerStep((dir) => {
    if (!isMobile) return false;
    if (cooldown.current) return true;
    const next = activeRef.current + dir;
    if (next < 0 || next >= PIECES.length) return false;
    navigate(next);
    return true;
  });

  const total = String(PIECES.length).padStart(2, "0");
  const num   = String(activeIdx + 1).padStart(2, "0");

  return (
    <div className="design-view">
      <div className="design-label-row">
        <h1 className="design-label-row__heading section-title">Design Work</h1>
        <span className="design-label-row__counter">
          [ {isMobile ? num : "01"} — {total} ]
        </span>
      </div>

      {isMobile ? (
        <div className="design-gallery design-gallery--carousel">
          <div className="design-carousel">
            {PIECES.map((piece, i) => {
              const offset = i === activeIdx ? 0 : i < activeIdx ? -100 : 100;
              return (
                <div
                  key={i}
                  className="design-carousel__panel"
                  style={{ transform: `translateX(${offset}%)` }}
                  aria-hidden={i !== activeIdx}
                >
                  <img
                    className="design-strip__img"
                    src={piece.src}
                    alt={piece.title}
                  />
                </div>
              );
            })}
          </div>

          <div className="design-carousel__footer">
            <p className="design-carousel__caption">
              {PIECES[activeIdx].title} · {PIECES[activeIdx].year}
            </p>

            <div className="position-dots">
              {PIECES.map((_, i) => (
                <span
                  key={i}
                  className={`position-dot${i === activeIdx ? " position-dot--active" : ""}`}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="design-gallery">
          {PIECES.map((piece, i) => {
            const isActive     = hover === i;
            const stripOpacity = hover === null ? 1 : isActive ? 1 : 0.5;
            const labelOp      = isActive ? 1 : 0;
            const labelY       = isActive ? "translateY(0)" : "translateY(8px)";
            return (
              <div
                key={i}
                className="design-strip"
                style={{ opacity: stripOpacity }}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
              >
                <img
                  className="design-strip__img"
                  src={piece.src}
                  alt={piece.title}
                />
                <div
                  className="design-strip__overlay"
                  style={{ opacity: labelOp }}
                >
                  <p
                    className="design-strip__title"
                    style={{ transform: labelY }}
                  >{piece.title}</p>
                  <p
                    className="design-strip__year"
                    style={{ transform: labelY }}
                  >{piece.year}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

window.PF.DesignView = DesignView;
