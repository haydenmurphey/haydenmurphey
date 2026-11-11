/* global React */
const { LINKS, STRINGS, useClock } = window.PF;

const CONTACT_TZ = "America/New_York";

function channels(t) {
  return [
    { label: t.contact_email,    href: LINKS.email,    display: "hsmurphey@gmail.com",           external: false },
    { label: t.contact_github,   href: LINKS.github,   display: "github.com/haydenmurphey",      external: true  },
    { label: t.contact_linkedin, href: LINKS.linkedin, display: "linkedin.com/in/haydenmurphey", external: true  },
  ];
}

// Big-type contact panel, styled after the hero name: a small label up top,
// each channel as a huge word anchored to the bottom. Hovering (or focusing)
// a word dims the others and slides its address in beside it.
function ContactPage({ t }) {
  const { time, tz } = useClock(CONTACT_TZ);
  return (
    <section className="contact-page">
      <h1 className="contact-page__label section-title c-reveal c-reveal--1">{t.contact_heading}</h1>

      <nav className="contact-index" aria-label="Contact links">
        {channels(t).map(({ label, href, display, external }, i) => (
          <a
            className={`contact-item c-reveal c-reveal--${i + 2}`}
            key={label}
            href={href}
            {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
          >
            <span className="contact-item__lead">{label}</span>
            <span className="contact-item__meta">
              <span className="contact-item__arw" aria-hidden="true">→</span>
              <span className="contact-item__addr">{display}</span>
            </span>
          </a>
        ))}
      </nav>

      <footer className="contact-page__foot c-reveal c-reveal--5">
        <span className="contact-page__status">
          <span className="contact-page__dot" aria-hidden="true"></span>
          {t.contact_status}
        </span>
        <span className="contact-page__clock">
          {t.contact_time_label}&nbsp;&nbsp;<b>{time}</b> · {tz}
        </span>
      </footer>
    </section>
  );
}

function ContactView() {
  return <ContactPage t={STRINGS} />;
}

window.PF.ContactView = ContactView;
