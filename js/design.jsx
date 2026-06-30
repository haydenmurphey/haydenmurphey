/* global React */
const { useState } = React;

const PIECES = [
  { title: "SIGNAL",      year: "2025", src: "./design_page/first.jpg"  },
  { title: "FLY",         year: "2025", src: "./design_page/second.jpg" },
  { title: "COMET FACE",  year: "2026", src: "./design_page/third.JPEG" },
];

function DesignView({ contentPhase }) {
  const [hover, setHover] = useState(null);

  const outerStyle =
    contentPhase === "entering"
      ? { opacity: 0, transition: "none" }
      : contentPhase === "exiting"
      ? { opacity: 0, transition: "opacity 0.3s ease" }
      : { opacity: 1, transition: "opacity 0.4s ease" };

  return (
    <div className="design-view" style={outerStyle}>
      <div className="design-label-row">
        <h1 className="design-label-row__heading">Design Work</h1>
        <span className="design-label-row__counter">[ 01 — 03 ]</span>
      </div>

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
    </div>
  );
}

window.PF.DesignView = DesignView;
