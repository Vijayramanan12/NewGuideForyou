---
title: "Content Authoring & Publishing Guidelines"
slug: "authoring-guidelines"
author: "Vijayaramanan"
date: "18 Aug 2026"
category: "Editorial & Guidelines"
tags:
  - guidelines
  - publishing
  - writing
  - markdown
readTime: "8 min read"
excerpt: "The complete technical authoring, formatting, and submission guide for publishing research deep dives, engineering breakdowns, and tutorials on New Guide."
---

# Content Authoring & Publishing Guidelines

Welcome to the **New Guide** publishing and authoring guide. New Guide was founded and created by **Vijayaramanan** as an open, accessible publication platform for science, emerging technologies, system engineering, artificial intelligence, and applied physics.

We welcome submissions and contributions from researchers, software engineers, physicists, and technical writers worldwide.

---

## 1. How to Submit an Article or Tutorial

To publish a new article or technical guide:

1. **Prepare your Markdown file:** Create a new Markdown file (e.g. `articles/your-topic-slug.md` or `tutorials/your-topic-slug.md`).
2. **Include YAML frontmatter:** Set your custom author name, title, category, tags, and summary.
3. **Submit for review:** Email your Markdown draft to `mvijayramanan1210@gmail.com` with the subject `Article Submission - [Your Title]` or submit a Pull Request on GitHub.
4. **Publishing & Attribution:** Once reviewed for technical depth and clarity, your article is published with full author byline, links, and attribution.

---

## 2. Standard YAML Frontmatter Schema

Every `.md` file must begin with:

```yaml
---
title: "Exact Title of the Research Deep Dive or Tutorial"
slug: "your-article-slug"
author: "Your Name"  # Your full author name
date: "2026-08-18"
category: "AI & Systems Architecture"  # e.g., Quantum Physics, Systems Architecture, AI
tags: ["Machine Learning", "System Design", "Distributed Systems"]
readTime: "10 min read"
excerpt: "A 1-2 sentence executive summary of the research paper or tutorial for cards and search previews."
---
```

---

## 3. Scientific Markdown & Math Extensions

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

> [!WARNING] EXPERIMENTAL SAFETY
> High-voltage discharge requires isolated Faraday shielding.
```

### 3.3 Tables
Use standard Markdown table formatting with header separators:

```markdown
| Parameter | Notation | Target Value | Units |
| :--- | :--- | :--- | :--- |
| Cavity Quality Factor | $Q_0$ | $2.4 \times 10^9$ | Dimensionless |
| Cryogenic Base Temp | $T$ | $2.0$ | $\text{K}$ |
```

---

## 4. Editorial Standards & Code Formatting

- **Code Blocks:** Specify the syntax language for syntax highlighting (e.g. ````python, ````javascript, ````rust, ````cpp).
- **Attribution & Ownership:** Authors retain 100% ownership of their written content. Every post links to the author's personal website, GitHub, or social profiles.
- **Tone & Rigor:** Articles should prioritize technical precision, mathematical backing, and reproducible examples.
