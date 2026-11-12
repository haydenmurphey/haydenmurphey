/* global React */
const { useState, useEffect, useRef } = React;

// ratio = natural width / height, used to show the featured piece uncropped.
const PIECES = [
  { title: "SIGNAL",      year: "2025", src: "/design_page/first.jpg",  ratio: 828 / 1156  },
  { title: "FLY",         year: "2025", src: "/design_page/second.jpg", ratio: 828 / 1051  },
  { title: "COMET FACE",  year: "2026", src: "/design_page/third.JPEG", ratio: 1275 / 1755 },
];

// Below this strip width/height ratio, three even strips crop the art too
// hard (the pieces are ~0.72–0.79), so the gallery switches to an accordion:
// one piece shown whole, the other two folded to narrow slivers.
const ACCORDION_BELOW = 0.62;
const STRIP_GAP = 8;      // matches .design-gallery gap
const SLIVER_MIN = 56;

// Watches the gallery box and returns its content size (or null before mount).
function useBoxSize(ref, active) {
  const [size, setSize] = useState(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize((s) => (s && s.w === width && s.h === height ? s : { w: width, h: height }));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [active]);
  return size;
}

function DesignView({ isMobile, registerStep }) {
  const [hover, setHover] = useState(null);
  const [featured, setFeatured] = useState(0);   // accordion mode: the piece shown whole
  const galleryRef  = useRef(null);
  const box         = useBoxSize(galleryRef, !isMobile);
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

  // Accordion layout: featured strip at its image's true ratio (capped so the
  // slivers keep SLIVER_MIN), the rest share what's left.
  const gaps = STRIP_GAP * (PIECES.length - 1);
  const accordion = !isMobile && box && box.h > 0 &&
    ((box.w - gaps) / PIECES.length) / box.h < ACCORDION_BELOW;
  let featW = 0, sliverW = 0;
  if (accordion) {
    const others = PIECES.length - 1;
    featW = Math.max(0, Math.min(box.h * PIECES[featured].ratio, box.w - gaps - others * SLIVER_MIN));
    sliverW = (box.w - gaps - featW) / others;
  }

  return (
    <div className="design-view">
      <div className="design-label-row">
        <h1 className="design-label-row__heading section-title">Design Work</h1>
        <span className="design-label-row__counter">
          [ {isMobile ? num : accordion ? String(featured + 1).padStart(2, "0") : "01"} — {total} ]
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
        <div
          ref={galleryRef}
          className={`design-gallery${accordion ? " design-gallery--accordion" : ""}`}
        >
          {PIECES.map((piece, i) => {
            if (accordion) {
              const isFeat = i === featured;
              return (
                <div
                  key={i}
                  className={`design-strip ${isFeat ? "design-strip--featured" : "design-strip--sliver"}`}
                  style={{ flex: `0 0 ${isFeat ? featW : sliverW}px` }}
                  onMouseEnter={() => setFeatured(i)}
                  onClick={() => setFeatured(i)}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isFeat}
                  aria-label={`${piece.title}, ${piece.year}`}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setFeatured(i); } }}
                >
                  <img className="design-strip__img" src={piece.src} alt={piece.title} />
                  <div className="design-strip__overlay">
                    <p className="design-strip__title">{piece.title}</p>
                    <p className="design-strip__year">{piece.year}</p>
                  </div>
                  <span className="design-strip__tab" aria-hidden="true">{piece.title}</span>
                </div>
              );
            }
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
