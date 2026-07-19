/* global React, marked, markedHighlight, hljs */
/* ============================================================
   writing.jsx — the "Writing" SPA view.

   Two modes, driven by the ?post= query param:
     • no post  → index list (from posts/manifest.json)
     • post=x   → article    (renders posts/x.md via marked)

   Registers window.PF.WritingView. Loaded before home.jsx.
   ============================================================ */
const { useState, useEffect, useRef } = React;

// Absolute so fetches resolve from any depth (e.g. the /writing/<slug>/ post pages).
const MANIFEST_URL = "/posts/manifest.json";
const POST_DIR = "/posts/";

// Configure marked + highlight.js exactly once (globals come from CDN in index.html).
function ensureMarkedConfigured() {
  if (typeof marked === "undefined" || window.__markedReady) return;
  try {
    if (typeof markedHighlight !== "undefined") {
      const factory = markedHighlight.markedHighlight || markedHighlight;
      marked.use(
        factory({
          langPrefix: "hljs language-",
          highlight(code, lang) {
            if (typeof hljs === "undefined") return code;
            const language = hljs.getLanguage(lang) ? lang : "plaintext";
            return hljs.highlight(code, { language }).value;
          },
        })
      );
    }
    marked.setOptions({ gfm: true, breaks: false });
  } catch (e) {
    /* non-fatal — markdown still renders without highlighting */
  }
  window.__markedReady = true;
}

// Read the current post slug from the URL (null when on the index).
// Canonical form is a path — /writing/<slug>/ — with the legacy
// ?post=<slug> query kept as a fallback for old links.
function currentSlug() {
  const m = window.location.pathname.match(/^\/writing\/([^/]+)\/?$/);
  if (m) return decodeURIComponent(m[1]);
  return new URLSearchParams(window.location.search).get("post");
}

// Remove a leading YAML frontmatter block so post bodies render cleanly.
// Metadata (title/date/etc.) comes from manifest.json, so the block is dropped.
function stripFrontmatter(md) {
  return md.replace(/^﻿?---\r?\n[\s\S]*?\r?\n---\r?\n?/, "");
}

// "2026-07-15" → localized long date, pinned to midday to avoid TZ off-by-one.
function formatDate(iso, lang) {
  if (!iso) return "";
  const d = new Date(iso + "T12:00:00");
  if (isNaN(d)) return iso;
  return d.toLocaleDateString(lang === "es" ? "es-ES" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function WritingView({ lang = "en", isMobile, contentPhase }) {
  const t = window.PF.STRINGS[lang] || window.PF.STRINGS.en;

  const [posts, setPosts] = useState(null); // null = loading, [] = loaded empty
  const [manifestError, setManifestError] = useState(false);
  const [slug, setSlug] = useState(currentSlug());
  const [body, setBody] = useState(null); // parsed HTML string
  const [articleError, setArticleError] = useState(false);
  const proseRef = useRef(null);

  ensureMarkedConfigured();

  // Load the manifest once (needed for both the index and article metadata).
  useEffect(() => {
    let alive = true;
    fetch(MANIFEST_URL)
      .then((r) => {
        if (!r.ok) throw new Error("manifest " + r.status);
        return r.json();
      })
      .then((data) => {
        if (!alive) return;
        const list = Array.isArray(data) ? data.slice() : [];
        list.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
        setPosts(list);
      })
      .catch(() => alive && setManifestError(true));
    return () => {
      alive = false;
    };
  }, []);

  // Keep the view in sync when the user navigates with the browser back/forward buttons.
  useEffect(() => {
    const onPop = () => {
      setSlug(currentSlug());
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // Fetch + parse the markdown whenever the active slug changes.
  useEffect(() => {
    if (!slug) {
      setBody(null);
      setArticleError(false);
      return;
    }
    let alive = true;
    setBody(null);
    setArticleError(false);
    fetch(POST_DIR + slug + ".md")
      .then((r) => {
        if (!r.ok) throw new Error("post " + r.status);
        return r.text();
      })
      .then((md) => {
        if (!alive) return;
        const clean = stripFrontmatter(md);
        const html = typeof marked !== "undefined" ? marked.parse(clean) : clean;
        setBody(html);
      })
      .catch(() => alive && setArticleError(true));
    return () => {
      alive = false;
    };
  }, [slug]);

  // After article HTML mounts, ensure any un-highlighted code blocks get highlighted.
  useEffect(() => {
    if (!body || !proseRef.current || typeof hljs === "undefined") return;
    proseRef.current.querySelectorAll("pre code:not(.hljs)").forEach((el) => {
      try {
        hljs.highlightElement(el);
      } catch (e) {
        /* ignore a single failed block */
      }
    });
    // Scroll the article to the top on open.
    if (proseRef.current.scrollIntoView) window.scrollTo(0, 0);
  }, [body]);

  function openPost(nextSlug) {
    window.history.pushState({}, "", "/writing/" + nextSlug + "/");
    setSlug(nextSlug);
  }

  function goIndex(e) {
    if (e) e.preventDefault();
    window.history.pushState({}, "", "/writing/");
    setSlug(null);
  }

  const outerStyle =
    contentPhase === "entering"
      ? { opacity: 0, transition: "none" }
      : contentPhase === "exiting"
      ? { opacity: 0, transition: "opacity 0.3s ease" }
      : { opacity: 1, transition: "opacity 0.4s ease" };

  const activeEntry = slug && posts ? posts.find((p) => p.slug === slug) : null;

  return (
    <div
      className={`writing${isMobile ? " writing--mobile" : ""}`}
      style={outerStyle}
    >
      {slug ? (
        <Article
          t={t}
          lang={lang}
          slug={slug}
          entry={activeEntry}
          body={body}
          error={articleError}
          proseRef={proseRef}
          onBack={goIndex}
        />
      ) : (
        <Index
          t={t}
          lang={lang}
          posts={posts}
          error={manifestError}
          onOpen={openPost}
        />
      )}
    </div>
  );
}

// ── Index: list of posts ──────────────────────────────────────
function Index({ t, lang, posts, error, onOpen }) {
  return (
    <div className="writing__index">
      <header className="writing__head">
        <h1 className="writing__heading">{t.writing_heading}</h1>
        <p className="writing__sub">{t.writing_sub}</p>
      </header>

      {error ? (
        <p className="writing__status">{t.writing_error}</p>
      ) : posts === null ? (
        <p className="writing__status">{t.writing_loading}</p>
      ) : posts.length === 0 ? (
        <p className="writing__status">{t.writing_empty}</p>
      ) : (
        <ul className="writing__list">
          {posts.map((p) => (
            <li key={p.slug} className="writing__item">
              <a
                className="writing__link"
                href={"/writing/" + p.slug + "/"}
                onClick={(e) => {
                  e.preventDefault();
                  onOpen(p.slug);
                }}
              >
                <span className="writing__date">{formatDate(p.date, lang)}</span>
                <span className="writing__title">{p.title}</span>
                {p.description && (
                  <span className="writing__desc">{p.description}</span>
                )}
                {Array.isArray(p.tags) && p.tags.length > 0 && (
                  <span className="writing__tags">
                    {p.tags.map((tag) => (
                      <span key={tag} className="writing__tag">
                        {tag}
                      </span>
                    ))}
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ── Article: a single rendered post ───────────────────────────
function Article({ t, lang, entry, body, error, proseRef, onBack }) {
  return (
    <article className="writing__article">
      <a className="writing__back" href="/writing/" onClick={onBack}>
        ← {t.writing_back}
      </a>

      {entry && (
        <header className="writing__articlehead">
          <p className="writing__date writing__date--article">
            {formatDate(entry.date, lang)}
          </p>
          <h1 className="writing__articletitle">{entry.title}</h1>
        </header>
      )}

      {error ? (
        <p className="writing__status">{t.writing_error}</p>
      ) : body === null ? (
        <p className="writing__status">{t.writing_loading}</p>
      ) : (
        <div
          ref={proseRef}
          className="prose"
          dangerouslySetInnerHTML={{ __html: body }}
        />
      )}
    </article>
  );
}

window.PF.WritingView = WritingView;
