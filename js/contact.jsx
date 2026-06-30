/* global React */
const { LINKS, STRINGS } = window.PF;

function channels(t) {
  return [
    { key: t.contact_email,    href: LINKS.email,    display: "hsmurphey@gmail.com",           external: false },
    { key: t.contact_github,   href: LINKS.github,   display: "github.com/haydenmurphey",       external: true  },
    { key: t.contact_linkedin, href: LINKS.linkedin, display: "linkedin.com/in/haydenmurphey",  external: true  },
    { key: t.contact_labs,     href: LINKS.labs,     display: "murpheylabs.com",                external: true  },
  ];
}

function ContactPage({ t, contentPhase }) {
  return (
    <section className={`contact-page${contentPhase === "exiting" ? " view-exit" : ""}`}>
      <div className="contact-page__header">
        <h1 className="contact-page__heading">{t.contact_heading}</h1>
        <p className="contact-page__sub">{t.contact_sub}</p>
      </div>

      <pre className="contact-page__rule" aria-hidden="true">{"═".repeat(56)}</pre>

      <div className="contact-page__grid">
        {channels(t).map(({ key, href, display, external }) => (
          <div className="contact-page__row" key={key}>
            <span className="contact-page__key">{key}</span>
            <span className="contact-page__sep">::</span>
            <a
              className="contact-page__val"
              href={href}
              {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
            >{display}</a>
          </div>
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
