/**
 * VIJAYARAMANAN MARKDOWN ARTICLE ENGINE (NEW GUIDE)
 * Parses YAML Frontmatter, renders scientific markdown, builds interactive Table of Contents,
 * tracks reading progress, and formats math equations & technical callouts.
 */

document.addEventListener('DOMContentLoaded', () => {
  initArticleEngine();
});

async function initArticleEngine() {
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('slug') || 'antigravity-basics';

  const contentCanvas = document.getElementById('articleContentCanvas');
  const tocContainer = document.getElementById('tocList');
  const titleEl = document.getElementById('articleTitle');
  const leadEl = document.getElementById('articleLead');
  const categoryEl = document.getElementById('articleCategory');
  const dateEl = document.getElementById('articleDate');
  const readTimeEl = document.getElementById('articleReadTime');
  const authorNameEl = document.getElementById('authorName');

  try {
    let response = await fetch(`articles/${slug}.md`);
    if (!response.ok) {
      response = await fetch(`tutorials/${slug}.md`);
    }
    if (!response.ok) {
      throw new Error(`File "${slug}.md" not found in articles/ or tutorials/.`);
    }

    const rawMarkdown = await response.text();
    const { frontmatter, body } = parseFrontmatter(rawMarkdown);

    // Update Metadata
    document.title = `${frontmatter.title || 'Research Deep Dive'} | New Guide`;
    if (titleEl) titleEl.textContent = frontmatter.title || 'Untitled Deep Dive';
    if (leadEl) leadEl.textContent = frontmatter.description || frontmatter.excerpt || '';
    if (categoryEl) categoryEl.textContent = frontmatter.category || (frontmatter.tags ? frontmatter.tags[0] : 'Theoretical Physics');
    if (dateEl) dateEl.textContent = frontmatter.date || new Date().toISOString().split('T')[0];
    if (readTimeEl) readTimeEl.textContent = frontmatter.readTime || estimateReadTime(body);
    if (authorNameEl) authorNameEl.textContent = frontmatter.author || 'Vijayaramanan';

    // Render Markdown Body
    const { html, headings } = renderScientificMarkdown(body);
    if (contentCanvas) {
      contentCanvas.innerHTML = html;
      initCodeCopyButtons();
    }

    // Build Sticky Table of Contents in Left Sidebar (1/4)
    const tocSidebar = document.getElementById('articleTocSidebar');
    if (tocContainer && headings.length > 0) {
      buildTableOfContents(tocContainer, headings);
      initScrollSpy();
    } else if (tocSidebar) {
      tocSidebar.style.display = 'none';
    }

    // Initialize Reading Progress Bar
    initReadingProgress();
    initShareButtons();

  } catch (error) {
    console.error('Error loading article:', error);
    if (contentCanvas) {
      contentCanvas.innerHTML = `
        <div class="callout callout-warning">
          <div class="callout-title">⚠️ Article Loading Error</div>
          <p>Could not load the markdown file for <code>${slug}.md</code>.</p>
          <p>Please make sure the file exists in the <code>articles/</code> directory with proper frontmatter.</p>
        </div>
      `;
    }
  }
}

/* Parse YAML Frontmatter */
function parseFrontmatter(rawText) {
  const frontmatterRegex = /^---\s*[\r\n]+([\s\S]*?)[\r\n]+---\s*[\r\n]+([\s\S]*)$/;
  const match = rawText.match(frontmatterRegex);

  if (!match) {
    return { frontmatter: {}, body: rawText };
  }

  const yamlBlock = match[1];
  const body = match[2];
  const frontmatter = {};

  const lines = yamlBlock.split('\n');
  lines.forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();

      // Clean quotes
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }

      // Handle arrays like tags: [A, B, C]
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1).split(',').map(item => item.trim().replace(/^["']|["']$/g, ''));
      }

      frontmatter[key] = value;
    }
  });

  return { frontmatter, body };
}

/* Estimate Reading Time */
function estimateReadTime(text) {
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

/* Scientific Markdown Compiler */
function renderScientificMarkdown(markdown) {
  const headings = [];
  let html = markdown;

  const equations = [];
  const inlineMath = [];
  const codeBlocks = [];

  // 1. Stash Code Blocks (```language ... ```)
  html = html.replace(/```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g, (match, lang, code) => {
    const placeholder = `@@CODE_BLOCK_${codeBlocks.length}@@`;
    codeBlocks.push(`
      <div class="code-block-wrapper" style="position: relative;">
        <pre><code class="language-${lang || 'text'}">${escapeHtml(code.trim())}</code></pre>
        <button class="copy-code-btn" style="position: absolute; top: 8px; right: 8px; padding: 4px 8px; font-size: 0.75rem; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; color: #fff; cursor: pointer;">Copy</button>
      </div>
    `);
    return placeholder;
  });

  // 2. Stash Display Equations (\[ ... \] or $$ ... $$)
  html = html.replace(/(\\\[[\s\S]*?\\\]|\$\$[\s\S]*?\$\$)/g, (match) => {
    let formula = match.trim();
    if (formula.startsWith('\\[') && formula.endsWith('\\]')) {
      formula = formula.slice(2, -2).trim();
    } else if (formula.startsWith('$$') && formula.endsWith('$$')) {
      formula = formula.slice(2, -2).trim();
    }
    const placeholder = `@@EQUATION_DISPLAY_${equations.length}@@`;
    equations.push(`\n\n<div class="equation-box"><div class="equation-content">${renderMathFormula(formula, true)}</div></div>\n\n`);
    return placeholder;
  });

  // 3. Stash Inline Math (\( ... \) or $ ... $)
  html = html.replace(/(\\\([\s\S]*?\\\)|\$([^\$\n]+)\$)/g, (match, p1, p2) => {
    let formula = (p1 || p2 || match).trim();
    if (formula.startsWith('\\(') && formula.endsWith('\\)')) {
      formula = formula.slice(2, -2).trim();
    } else if (formula.startsWith('$') && formula.endsWith('$')) {
      formula = formula.slice(1, -1).trim();
    }
    const placeholder = `@@INLINE_MATH_${inlineMath.length}@@`;
    inlineMath.push(`<span class="math-inline">${renderMathFormula(formula, false)}</span>`);
    return placeholder;
  });

  // 4. Strip redundant in-body Table of Contents (since it is rendered in the dedicated left 1/4 sticky sidebar)
  html = html.replace(/^##\s+Table\s+of\s+Contents[\s\S]*?(?=\n##\s+[^#]|\n\n\n|$)/im, '');
  html = html.replace(/^##\s+Contents[\s\S]*?(?=\n##\s+[^#]|\n\n\n|$)/im, '');

  // 5. Scientific Callout Blocks (> [!NOTE], > [!HYPOTHESIS], > [!WARNING])
  html = html.replace(/^>\s*\[!([A-Z]+)\]([^\n]*)\n((?:^>.*\n?)*)/gim, (match, type, title, body) => {
    const cleanBody = body.replace(/^>\s?/gm, '').trim();
    const typeLower = type.toLowerCase();
    const customTitle = title.trim() || `${type} DIRECTIVE`;
    return `
      <div class="callout callout-${typeLower}">
        <div class="callout-title">// ${escapeHtml(customTitle)}</div>
        <p>${parseInlineMarkdown(cleanBody)}</p>
      </div>
    `;
  });

  // 6. Standard Blockquotes (> text)
  html = html.replace(/^>\s*(.+)$/gm, (match, quote) => {
    return `<blockquote>${parseInlineMarkdown(quote)}</blockquote>`;
  });

  // 7. Headings with Slug IDs for TOC (# Heading, ## Heading, ### Heading, #### Heading)
  html = html.replace(/^(#{1,4})\s+(.+)$/gm, (match, level, text) => {
    const depth = level.length; // 1 for h1, 2 for h2, 3 for h3, 4 for h4
    const cleanText = text.trim();
    const slug = cleanText
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    if (depth >= 2 && depth <= 3 && !/^table\s+of\s+contents$/i.test(cleanText)) {
      headings.push({ depth, text: cleanText, id: slug });
    }
    return `<h${depth} id="${slug}">${parseInlineMarkdown(cleanText)}</h${depth}>`;
  });

  // 8. Tables (| Header | Header |)
  html = parseMarkdownTables(html);

  // 9. Unordered Lists
  html = html.replace(/^\s*[\-\*]\s+(.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>(\n<li>.*<\/li>)*)/g, '<ul>$1</ul>');

  // 10. Ordered Lists
  html = html.replace(/^\s*\d+\.\s+(.+)$/gm, '<li class="ol-item">$1</li>');
  html = html.replace(/(<li class="ol-item">.*<\/li>(\n<li class="ol-item">.*<\/li>)*)/g, '<ol>$1</ol>');

  // 11. Paragraphs
  const blocks = html.split(/\n\n+/);
  const parsedBlocks = blocks.map(block => {
    block = block.trim();
    if (!block) return '';
    if (
      block.startsWith('<h') ||
      block.startsWith('<div') ||
      block.startsWith('<table') ||
      block.startsWith('<pre') ||
      block.startsWith('<ul>') ||
      block.startsWith('<ol>') ||
      block.startsWith('<blockquote>') ||
      block.startsWith('@@EQUATION_DISPLAY_') ||
      block.startsWith('@@CODE_BLOCK_')
    ) {
      return block;
    }
    return `<p>${parseInlineMarkdown(block)}</p>`;
  });

  let compiledHtml = parsedBlocks.join('\n');

  // Restore Stashed Placeholders
  equations.forEach((eq, i) => {
    compiledHtml = compiledHtml.replace(`@@EQUATION_DISPLAY_${i}@@`, eq);
  });

  inlineMath.forEach((im, i) => {
    compiledHtml = compiledHtml.replace(`@@INLINE_MATH_${i}@@`, im);
  });

  codeBlocks.forEach((cb, i) => {
    compiledHtml = compiledHtml.replace(`@@CODE_BLOCK_${i}@@`, cb);
  });

  return { html: compiledHtml, headings };
}

/* Parse Markdown Tables (Deterministic Multi-row Parser) */
function parseMarkdownTables(text) {
  const lines = text.split(/\r?\n/);
  let inTable = false;
  let tableLines = [];
  let output = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    const isTableRow = trimmed.startsWith('|') && trimmed.endsWith('|');

    if (isTableRow) {
      inTable = true;
      tableLines.push(trimmed);
    } else {
      if (inTable) {
        output.push(renderTableBlock(tableLines));
        tableLines = [];
        inTable = false;
      }
      output.push(line);
    }
  }

  if (inTable && tableLines.length > 0) {
    output.push(renderTableBlock(tableLines));
  }

  return output.join('\n');
}

function renderTableBlock(lines) {
  if (lines.length < 2) return lines.join('\n');
  const isDelimiter = lines[1].replace(/[\s|:-]/g, '').length === 0 && lines[1].includes('-');
  if (!isDelimiter) return lines.join('\n');

  const headers = lines[0].split('|').slice(1, -1).map(h => h.trim());
  const aligns = lines[1].split('|').slice(1, -1).map(a => {
    a = a.trim();
    if (a.startsWith(':') && a.endsWith(':')) return 'center';
    if (a.endsWith(':')) return 'right';
    return 'left';
  });

  const thead = '<thead><tr>' + headers.map((h, i) => `<th style="text-align: ${aligns[i] || 'left'}">${parseInlineMarkdown(h)}</th>`).join('') + '</tr></thead>';

  const bodyLines = lines.slice(2);
  const tbody = '<tbody>' + bodyLines.map(row => {
    const cells = row.split('|').slice(1, -1).map(c => c.trim());
    return '<tr>' + cells.map((cell, i) => `<td style="text-align: ${aligns[i] || 'left'}">${parseInlineMarkdown(cell)}</td>`).join('') + '</tr>';
  }).join('') + '</tbody>';

  return `\n\n<div class="table-container"><table class="article-table">${thead}${tbody}</table></div>\n\n`;
}

/* Inline Markdown Parser */
function parseInlineMarkdown(text) {
  return text
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* Build Sticky Table of Contents */
function buildTableOfContents(container, headings) {
  container.innerHTML = '';
  headings.forEach(heading => {
    if (heading.depth > 3) return; // Only show h2 & h3
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `#${heading.id}`;
    a.className = `toc-link ${heading.depth === 3 ? 'toc-h3' : 'toc-h2'}`;
    a.textContent = heading.text;
    li.appendChild(a);
    container.appendChild(li);
  });
}

/* ScrollSpy for Active TOC Item */
function initScrollSpy() {
  const links = document.querySelectorAll('.toc-link');
  const headings = Array.from(links).map(link => {
    const id = link.getAttribute('href').slice(1);
    return document.getElementById(id);
  }).filter(Boolean);

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 140;

    headings.forEach(heading => {
      if (heading.offsetTop <= scrollPos) {
        currentId = heading.id;
      }
    });

    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* Reading Progress Bar */
function initReadingProgress() {
  const progressBar = document.getElementById('readingProgressBar');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

/* Copy Code Buttons */
function initCodeCopyButtons() {
  document.querySelectorAll('.copy-code-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const code = btn.previousElementSibling.querySelector('code').textContent;
      navigator.clipboard.writeText(code).then(() => {
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
      });
    });
  });
}

/* Share Buttons */
function initShareButtons() {
  const copyBtn = document.getElementById('shareCopyBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText(window.location.href).then(() => {
        copyBtn.textContent = '✓ Link Copied';
        setTimeout(() => { copyBtn.textContent = 'Copy Link'; }, 2500);
      });
    });
  }

  const shareXBtn = document.getElementById('shareXBtn');
  if (shareXBtn) {
    const currentUrl = window.location.href;
    const tweetText = 'Read this article on New Guide';
    const shareUrl = `https://x.com/intent/post?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(currentUrl)}`;
    
    shareXBtn.href = shareUrl;
    shareXBtn.onclick = function(e) {
      e.preventDefault();
      const liveUrl = window.location.href;
      const liveShareUrl = `https://x.com/intent/post?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(liveUrl)}`;
      window.open(liveShareUrl, '_blank', 'width=600,height=520,menubar=no,toolbar=no,resizable=yes,scrollbars=yes');
      return false;
    };
  }
}

/* KaTeX & Native LaTeX Formula Renderer */
function renderMathFormula(formula, isDisplay) {
  // If KaTeX library is loaded in window
  if (typeof katex !== 'undefined') {
    try {
      return katex.renderToString(formula, {
        displayMode: isDisplay,
        throwOnError: false
      });
    } catch (e) {
      console.warn('KaTeX render error:', e);
    }
  }

  // Fallback Native Chemical & Math Converter
  return formatFormulaFallback(formula);
}

function formatFormulaFallback(formula) {
  return formula
    .replace(/\\rightarrow/g, ' &rarr; ')
    .replace(/\\leftarrow/g, ' &larr; ')
    .replace(/\\cdot/g, ' &bull; ')
    .replace(/\\approx/g, ' &asymp; ')
    .replace(/\\times/g, ' &times; ')
    .replace(/\\pm/g, ' &plusmn; ')
    .replace(/\\mu/g, '&mu;')
    .replace(/\\pi/g, '&pi;')
    .replace(/\\nabla/g, '&nabla;')
    .replace(/\\text\{([^}]+)\}/g, '$1')
    .replace(/\\mathbf\{([^}]+)\}/g, '<strong>$1</strong>')
    .replace(/\^\{([^}]+)\}/g, '<sup>$1</sup>')
    .replace(/\^([0-9a-zA-Z\+\-]+)/g, '<sup>$1</sup>')
    .replace(/_\{([^}]+)\}/g, '<sub>$1</sub>')
    .replace(/_([0-9])/g, '<sub>$1</sub>');
}
