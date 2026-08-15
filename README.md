# New Guide - Web Architecture

A modern, high-performance static website and publishing portal dedicated to **Metric Engineering and Advanced Propulsion**, written by lead researcher **Vijayaramanan**.

---

## 🚀 Key Features

- **Dark Aerospace Aesthetics:** Deep cosmic color palette (`#050811`), neon graviton blue (`#00e5ff`), electric violet (`#8b5cf6`), glassmorphic panels, and subtle grid overlays.
- **Interactive Graviton Canvas:** Live spacetime particle & gravity distortion simulation rendered on HTML5 Canvas in the hero section.
- **The Long-Form Reader Canvas:** Dedicated reading layout with:
  - Sticky interactive Table of Contents with active section tracking (ScrollSpy).
  - Dynamic Markdown parser supporting YAML frontmatter.
  - Math formula rendering (`$$ ... $$` and `$ ... $`).
  - Scientific callouts (`> [!NOTE]`, `> [!HYPOTHESIS]`, `> [!WARNING]`).
  - Code syntax highlighting with one-click copy buttons.
  - Lead author byline (**Vijayaramanan**).
  - Top scroll reading progress indicator.
- **Google AdSense Ready:** Pre-styled, layout-stable ad containers (`.ad-slot-header`, `.ad-slot-sidebar`, `.ad-slot-inline`, `.ad-slot-footer`) preventing Cumulative Layout Shift (CLS).
- **Zero-Build Static Hosting:** Works natively on GitHub Pages, Cloudflare Pages, Vercel, Netlify, or any static HTTP web server without heavy build steps.

---

## 📁 Directory Structure

```
/
├── index.html                    # Homepage (Hero with canvas, Research Pillars, Latest Deep Dives, Dispatches)
├── article.html                  # Article reader (The Reader Canvas, TOC sidebar, Markdown engine, Ads)
├── about.html                    # About page (Mission, Vijayaramanan author bio, Roadmap)
├── WRITING_GUIDE.md              # Authoring guide for Vijayaramanan
├── articles/
│   ├── index.json                # Article metadata registry for dynamic discovery
│   ├── antigravity-basics.md     # Primary template article with frontmatter & math equations
│   └── warp-metric-engineering.md # Second deep dive article
└── assets/
    ├── css/
    │   ├── main.css              # Global design system, typography, navbar, footer, cards
    │   ├── article.css           # Scientific reader styling, callouts, TOC, equations
    │   └── ads.css               # Google AdSense responsive slot containers
    └── js/
        ├── main.js               # Canvas particle gravitational simulation & mobile nav
        ├── article-engine.js     # Frontmatter parser, Markdown renderer, TOC generator, Reading time
        └── articles-index.js     # Homepage article cards loader & dynamic registry
```

---

## 💻 Running Locally

You can serve the static site with any local HTTP server:

### Option 1: Python HTTP Server (Built-in)
```bash
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

### Option 2: Node.js (npx serve)
```bash
npx -y serve .
```

---

## 🌐 Deploying to Production

- **GitHub Pages:** Push this repository to GitHub and enable GitHub Pages on the `main` branch.
- **Vercel / Netlify / Cloudflare Pages:** Connect the repository and set the publish directory to `./`. No build command required!

---

## ✍️ Content Authoring
For complete details on writing, formatting frontmatter, and publishing articles, see [WRITING_GUIDE.md](file:///Users/vijayramanan/New%20guider/WRITING_GUIDE.md).
