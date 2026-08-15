/**
 * ARTICLES INDEX & REGISTRY LOADER (ASTROPAPER THEME)
 * Populates post lists on the homepage and the 3-column card grid on posts.html.
 */

document.addEventListener('DOMContentLoaded', () => {
  initArticlesIndex();
  initPostsGrid();
  initCategoryFilters();
});

/* Home Page Linear Post List */
async function initArticlesIndex() {
  const container = document.getElementById('latestArticlesGrid');
  if (!container) return;

  try {
    const response = await fetch('articles/index.json');
    if (!response.ok) return;

    const data = await response.json();
    const articles = data.articles || [];

    if (articles.length === 0) return;

    container.innerHTML = articles.map(article => `
      <li class="post-item">
        <h3 class="post-title">
          <a href="article?slug=${article.slug}">${article.title}</a>
        </h3>
        <div class="post-meta">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="18" y2="10"></line></svg>
          <span>${article.date} | ${article.readTime || '6 min read'}</span>
        </div>
        <p class="post-description">${article.excerpt || article.description}</p>
        <div class="post-tags">
          ${(article.tags || [article.category || 'research']).map(tag => `<a href="posts#tags" class="tag-pill">#${tag.toLowerCase().replace(/\s+/g, '-')}</a>`).join(' ')}
        </div>
      </li>
    `).join('');

  } catch (err) {
    console.warn('Dynamic index loading fallback:', err);
  }
}

/* All Posts Page 3-Column Card Grid */
async function initPostsGrid() {
  const grid = document.getElementById('allPostsGrid');
  if (!grid) return;

  try {
    const response = await fetch('articles/index.json');
    if (!response.ok) return;

    const data = await response.json();
    const articles = data.articles || [];

    if (articles.length === 0) return;

    grid.innerHTML = articles.map(article => {
      let categoryType = 'applied';
      const catLower = (article.category || '').toLowerCase();
      if (catLower.includes('metric')) categoryType = 'metric';
      else if (catLower.includes('theoretical')) categoryType = 'theoretical';

      return `
        <li class="card-post" data-category="${categoryType}">
          <div class="card-top">
            <span class="card-category">${article.category || 'Research Deep Dive'}</span>
            <div class="card-title-row">
              <a href="article?slug=${article.slug}" class="card-title">
                ${article.title}
              </a>
              <span class="card-arrow">&#8599;</span>
            </div>
            <p class="card-excerpt">
              ${article.excerpt || article.description}
            </p>
          </div>
          <div class="card-author-footer">
            <div class="card-avatar">${(article.author || 'V')[0]}</div>
            <div class="card-author-meta">
              <span class="card-author-name">${article.author || 'Vijayaramanan'}</span>
              <span class="card-post-date">${article.date} &bull; ${article.readTime || '10 min read'}</span>
            </div>
          </div>
        </li>
      `;
    }).join('');

  } catch (err) {
    console.warn('Dynamic posts grid loading error:', err);
  }
}

/* Category Filter Tabs on Posts Page */
function initCategoryFilters() {
  const filterBtns = document.querySelectorAll('.filter-tab-btn');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      const cards = document.querySelectorAll('.card-post');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}
