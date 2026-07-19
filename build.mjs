/* ============================================================
   build.mjs — assembles the static site into dist/.

   1. Compiles each js/*.jsx to an isolated IIFE bundle (drops the
      in-browser Babel step) — global React / window.PF model kept.
   2. Copies static assets.
   3. Injects per-page social/OG metadata into index.html + the
      view stubs, and generates a static page per Writing post
      (and the /writing/ index) so crawlers get real previews.
   4. Emits sitemap.xml + robots.txt.

   Run: npm run build   (or: node build.mjs)
   ============================================================ */
import esbuild from "esbuild";
import { promises as fs } from "fs";
import { existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(root, "dist");
const SITE = "https://haydenmurphey.site";
const OG_IMAGE = SITE + "/og-image.png";

// ── Per-page metadata (single source of truth) ───────────────
const AUTHOR = "Hayden Murphey";
const DEFAULT_DESC =
  "Hayden Murphey — Software Engineer and Founder of Murphey Labs. Security, cloud, and full-stack engineering.";

const VIEW_META = {
  home:     { title: "Hayden Murphey — Software Engineer", desc: DEFAULT_DESC, url: SITE + "/" },
  projects: { title: "Projects — Hayden Murphey",  desc: "Selected engineering projects — infrastructure, systems, security, and AI/robotics work.", url: SITE + "/projects/" },
  writing:  { title: "Writing — Hayden Murphey",   desc: "Notes and technical writeups on security, Linux, cloud, and homelab engineering.", url: SITE + "/writing/" },
  design:   { title: "Design — Hayden Murphey",    desc: "Selected visual and design work.", url: SITE + "/design/" },
  cv:       { title: "CV — Hayden Murphey",        desc: "Education, certifications (AWS, ISC2), and technical skills.", url: SITE + "/cv/" },
  contact:  { title: "Contact — Hayden Murphey",   desc: "Get in touch with Hayden Murphey — email, GitHub, LinkedIn, Murphey Labs.", url: SITE + "/contact/" },
};

// Views that get a clean static path (/projects/, /writing/, …).
const PATH_VIEWS = ["projects", "cv", "design", "contact", "writing"];

// Build the <head> social/meta block for a page.
function metaBlock({ title, desc, url, type = "website", image = OG_IMAGE }) {
  const e = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  return [
    `<meta name="description" content="${e(desc)}">`,
    `<link rel="canonical" href="${e(url)}">`,
    `<meta property="og:type" content="${type}">`,
    `<meta property="og:site_name" content="${e(AUTHOR)}">`,
    `<meta property="og:title" content="${e(title)}">`,
    `<meta property="og:description" content="${e(desc)}">`,
    `<meta property="og:url" content="${e(url)}">`,
    `<meta property="og:image" content="${e(image)}">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${e(title)}">`,
    `<meta name="twitter:description" content="${e(desc)}">`,
    `<meta name="twitter:image" content="${e(image)}">`,
  ].join("\n  ");
}

// Replace the <!-- META --> … <!-- /META --> block, and the <title>.
function applyMeta(html, meta) {
  const block = metaBlock(meta);
  html = html.replace(/<!-- META -->[\s\S]*?<!-- \/META -->/, `<!-- META -->\n  ${block}\n  <!-- /META -->`);
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${meta.title}</title>`);
  return html;
}

async function copyIfExists(src, destName) {
  const from = path.join(root, src);
  if (!existsSync(from)) {
    console.warn(`  (skip missing: ${src})`);
    return;
  }
  await fs.cp(from, path.join(dist, destName ?? src), { recursive: true });
}

async function main() {
  await fs.rm(dist, { recursive: true, force: true });
  await fs.mkdir(dist, { recursive: true });

  // 1 ── Compile JSX → isolated IIFE bundles ──────────────────
  const jsDir = path.join(root, "js");
  const entryPoints = (await fs.readdir(jsDir))
    .filter((f) => f.endsWith(".jsx"))
    .map((f) => path.join(jsDir, f));

  await esbuild.build({
    entryPoints,
    outdir: path.join(dist, "js"),
    outExtension: { ".js": ".js" },
    bundle: true,        // wraps each entry; there are no imports to resolve
    format: "iife",      // isolated scope per file — preserves the global-script model
    jsx: "transform",    // classic runtime: React.createElement / React.Fragment (global React)
    minify: true,
    target: ["es2018"],
    logLevel: "info",
  });
  // esbuild names outputs after the entry basename: shared.jsx → shared.js, etc.

  // 2 ── Copy static assets ───────────────────────────────────
  await copyIfExists("styles.css");
  await copyIfExists("posts");
  await copyIfExists("images");
  await copyIfExists("design_page");
  await copyIfExists("favicon.ico");
  await copyIfExists("CNAME");
  await copyIfExists(".nojekyll");
  await copyIfExists("assets/og-image.png", "og-image.png");
  for (const f of await fs.readdir(root)) {
    if (f.endsWith(".pdf")) await copyIfExists(f);
  }

  // 3 ── index.html (site/home meta) + view stubs (per-view) ──
  const indexSrc = await fs.readFile(path.join(root, "index.html"), "utf8");
  const indexHtml = applyMeta(indexSrc, { ...VIEW_META.home, type: "website" });
  await fs.writeFile(path.join(dist, "index.html"), indexHtml);

  const STUBS = { "projects.html": "projects", "design.html": "design", "cv.html": "cv", "contact.html": "contact", "writing.html": "writing" };
  for (const [file, view] of Object.entries(STUBS)) {
    const src = await fs.readFile(path.join(root, file), "utf8");
    await fs.writeFile(path.join(dist, file), applyMeta(src, { ...VIEW_META[view], type: "website" }));
  }

  // 4 ── Static per-view pages (clean paths) + per-post pages ──
  // Each page boots the SPA (home.jsx reads the path) and carries per-view OG.
  for (const view of PATH_VIEWS) {
    const outDir = path.join(dist, view);
    await fs.mkdir(outDir, { recursive: true });
    await fs.writeFile(
      path.join(outDir, "index.html"),
      applyMeta(indexSrc, { ...VIEW_META[view], type: "website" })
    );
  }

  const manifest = JSON.parse(await fs.readFile(path.join(root, "posts", "manifest.json"), "utf8"));
  for (const post of manifest) {
    const url = `${SITE}/writing/${post.slug}/`;
    const html = applyMeta(indexSrc, {
      title: `${post.title} — ${AUTHOR}`,
      desc: post.description || DEFAULT_DESC,
      url,
      type: "article",
    });
    const outDir = path.join(dist, "writing", post.slug);
    await fs.mkdir(outDir, { recursive: true });
    await fs.writeFile(path.join(outDir, "index.html"), html);
  }

  // 5 ── sitemap.xml + robots.txt ─────────────────────────────
  const urls = [
    SITE + "/",
    ...Object.values(VIEW_META).filter((m) => m.url !== SITE + "/").map((m) => m.url),
    ...manifest.map((p) => `${SITE}/writing/${p.slug}/`),
  ];
  const sitemap =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map((u) => `  <url><loc>${u}</loc></url>`).join("\n") +
    `\n</urlset>\n`;
  await fs.writeFile(path.join(dist, "sitemap.xml"), sitemap);
  await fs.writeFile(
    path.join(dist, "robots.txt"),
    `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`
  );

  console.log(`\n✓ Built ${manifest.length} post page(s) + ${Object.keys(VIEW_META).length} views → dist/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
