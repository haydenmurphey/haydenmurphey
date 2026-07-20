/* global React */
const { LINKS, STRINGS, useClock } = window.PF;

const CONTACT_TZ = "America/New_York";

function channels(t) {
  return [
    { label: t.contact_email,    href: LINKS.email,    display: "hsmurphey@gmail.com",          external: false },
    { label: t.contact_github,   href: LINKS.github,   display: "github.com/haydenmurphey",      external: true  },
    { label: t.contact_linkedin, href: LINKS.linkedin, display: "linkedin.com/in/haydenmurphey", external: true  },
    { label: t.contact_labs,     href: LINKS.labs,     display: "murpheylabs.com",               external: true  },
  ];
}

function ContactPage({ t, contentPhase }) {
  const { time, tz } = useClock(CONTACT_TZ);
  return (
    <section className={`contact-page${contentPhase === "exiting" ? " view-exit" : ""}`}>
      <aside className="contact-rail">
        <h1 className="contact-rail__head reveal reveal--1">{t.contact_heading}</h1>
        <div className="contact-rail__foot reveal reveal--2">
          <span className="contact-rail__status">
            <span className="contact-rail__dot" aria-hidden="true"></span>
            {t.contact_status}
          </span>
          <span className="contact-rail__clock">
            {t.contact_time_label}&nbsp;&nbsp;<b>{time}</b> · {tz}
          </span>
        </div>
      </aside>
      <div className="contact-index">
        {channels(t).map(({ label, href, display, external }, i) => (
          <a
            className={`contact-item reveal reveal--${i + 3}`}
            key={label}
            href={href}
            {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
          >
            <span className="contact-item__lead">{label}</span>
            <span className="contact-item__meta">
              <span className="contact-item__addr">{display}</span>
              <span className="contact-item__arw" aria-hidden="true">→</span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

function ContactView({ lang, contentPhase }) {
  const t = STRINGS[lang] || STRINGS.en;
  return <ContactPage t={t} contentPhase={contentPhase} />;
}

window.PF.ContactView = ContactView;
