/**
 * ASTROPAPER INTERACTIVE ENGINE (NEW GUIDE)
 * Features: Dark/Light Mode Theme Toggle, Search Filter, Responsive Nav, Hash Nav Highlight
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initSearch();
  initNavHighlight();
});

/* Theme Toggle (Dark/Light) */
function initTheme() {
  const themeBtn = document.getElementById('themeToggleBtn');
  const currentTheme = localStorage.getItem('theme') || 'dark';

  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'light' ? 'dark' : 'light';

      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const sunIcon = document.getElementById('themeIconSun');
  const moonIcon = document.getElementById('themeIconMoon');

  if (sunIcon && moonIcon) {
    if (theme === 'light') {
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
    } else {
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
    }
  }
}

/* Search Toggle & Realtime Filter */
function initSearch() {
  const searchBtn = document.getElementById('searchToggleBtn');
  const searchContainer = document.getElementById('searchContainer');
  const searchInput = document.getElementById('searchInput');

  if (searchBtn && searchContainer) {
    searchBtn.addEventListener('click', () => {
      searchContainer.classList.toggle('active');
      if (searchContainer.classList.contains('active') && searchInput) {
        searchInput.focus();
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      const postItems = document.querySelectorAll('.post-item');

      postItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(query)) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }
}

/* Nav Active State — handles hash anchor links like #tutorials */
function initNavHighlight() {
  const navLinks = document.querySelectorAll('.nav-link');

  function setActiveByHash() {
    const hash = window.location.hash;
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      // Only remove active from hash-based links (not page-based ones set statically)
      if (href && href.startsWith('#')) {
        link.classList.remove('active');
      }
      // Highlight the link whose href matches the current hash
      if (hash && href === hash) {
        link.classList.add('active');
      }
    });
  }

  // Set active on click immediately (before scroll completes)
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      link.addEventListener('click', () => {
        navLinks.forEach(l => {
          if (l.getAttribute('href') && l.getAttribute('href').startsWith('#')) {
            l.classList.remove('active');
          }
        });
        link.classList.add('active');
      });
    }
  });

  // Set on page load if URL already has a hash (e.g. direct link to /#tutorials)
  setActiveByHash();
  window.addEventListener('hashchange', setActiveByHash);
}
