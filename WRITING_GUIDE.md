# New Guide Content Authoring Guide

Welcome to the **New Guide** research and publishing portal content engine. This guide defines the exact formatting rules, frontmatter schema, mathematical notation, and code injection points for lead author **Vijayaramanan**.

---

## 1. How to Add a New Article / Deep Dive

To publish a new scientific deep dive:

1. Create a new Markdown file in the `articles/` directory (e.g., `articles/quantum-vacuum-thrusters.md`).
2. Include the required YAML frontmatter at the top of the file.
3. Write the article body using standard Markdown with our custom scientific extensions (equations, callouts, code blocks).
4. Add the article's metadata into `articles/index.json` so it appears on the homepage.

---

## 2. Standard YAML Frontmatter Schema

Every `.md` file must begin with:

```yaml
---
title: "Exact Title of the Research Deep Dive"
slug: "quantum-vacuum-thrusters"
author: "Vijayaramanan"
date: "2026-08-15"
category: "Quantum Vacuum Dynamics"
tags: ["Casimir Effect", "QED", "Propulsion", "Superconductivity"]
readTime: "9 min read"
excerpt: "A 1-2 sentence executive summary of the research paper for preview cards and search engines."
---
```

---

## 3. Scientific Markdown Extensions

### 3.1 Mathematical Equations
- **Centered Equation Block:** Wrap LaTeX equations with double dollar signs `$$ ... $$`.
  ```latex
  $$G_{\mu\nu} + \Lambda g_{\mu\nu} = \frac{8\pi G}{c^4} T_{\mu\nu}$$
  ```
- **Inline Math:** Wrap inline symbols with single dollar signs `$ ... $`.
  ```markdown
  The local acceleration vector is $\vec{g} = -\nabla \Phi$.
  ```

### 3.2 Scientific Callout Boxes
Use GitHub-style alert blockquotes to highlight hypotheses, notes, and warnings:

```markdown
> [!NOTE] KEY HYPOTHESIS
> Explaining how the electromagnetic tensor couples to metric curvature.

> [!HYPOTHESIS] RESEARCH TARGET
> Specifying the laboratory frequency target (e.g. 2.45 GHz).

> [!WARNING] EXPERIMENTAL CONSTRAINT
> High-voltage dielectric breakdown limits in ultra-high vacuum.
```

### 3.3 Code & Simulation Blocks
Use triple backticks with the language identifier:

```python
# Numerical Simulation: Compute Metric Tensor
import numpy as np

def compute_force(e_field, b_field):
    return np.cross(e_field, b_field)
```

### 3.4 Table of Contents & Headings
Use `## Section Title` for main sections and `### Subsection Title` for subsections. The reader automatically creates clickable, active-tracked table-of-contents links for all `h2` and `h3` headings.

---

## 4. Injecting Monthly Dispatches & News

On `index.html`, locate the monthly updates wrapper and insert new dispatch entries inside the marked zone:

```html
<!-- AUTHOR: INJECT MONTHLY NEWS CONTENT HERE -->
<div class="dispatch-item">
  <div class="dispatch-dot"></div>
  <div class="dispatch-header">
    <span class="dispatch-date">SEPTEMBER 2026</span>
    <span class="badge badge-cyan">LAB DISPATCH // 09-26</span>
  </div>
  <h3 class="dispatch-title">Title of Monthly Breakthrough</h3>
  <p class="dispatch-body">
    Detailed summary of experimental results or simulation runs...
  </p>
</div>
```

---

## 5. Google AdSense Monetization Points

Pre-configured ad containers are located across all pages:

| Ad Container Class | Location | Recommended Size |
| :--- | :--- | :--- |
| `.ad-slot-header` | Top of Homepage, Articles, About | 728×90 or 970×90 Leaderboard |
| `.ad-slot-sidebar` | Right sidebar on Article page | 300×250 (Medium Rectangle) or 300×600 (Skyscraper) |
| `.ad-slot-inline` | Inside and below article content | 728×90 or Responsive In-Article |
| `.ad-slot-footer` | Bottom banner on all pages | 970×90 or 728×90 Leaderboard |

To activate AdSense, replace the placeholder `<div>` inside any `.ad-slot-container` with your `<ins class="adsbygoogle" ...></ins>` tag and script.
