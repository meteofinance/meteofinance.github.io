function readTheme() {
  const queryTheme = new URLSearchParams(window.location.search).get('theme');
  if (queryTheme === 'dark' || queryTheme === 'light') return queryTheme;
  try {
    return localStorage.getItem('theme') || 'light';
  } catch (error) {
    return 'light';
  }
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem('theme', theme);
  } catch (error) {}
  const isDark = theme === 'dark';
  document.querySelectorAll('[data-theme-logo]').forEach(logo => {
    logo.src = isDark ? logo.dataset.darkLogo : logo.dataset.lightLogo;
  });
  document.querySelectorAll('[data-theme-toggle]').forEach(button => {
    button.setAttribute('aria-pressed', String(isDark));
    button.setAttribute('aria-label', isDark ? 'Activer le mode clair' : 'Activer le mode sombre');
    button.querySelector('.theme-button-text').textContent = isDark ? 'Mode clair' : 'Mode sombre';
  });
}

function themeLink(link, theme) {
  const url = new URL(link.href, window.location.href);
  if (url.origin !== window.location.origin || !url.pathname.endsWith('.html')) return;
  url.searchParams.set('theme', theme);
  link.href = url.href;
}

document.addEventListener('DOMContentLoaded', () => {
  applyTheme(readTheme());
  document.querySelectorAll('.legal-logo').forEach(logo => {
    logo.addEventListener('click', event => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
  document.querySelectorAll('[data-theme-toggle]').forEach(button => {
    button.addEventListener('click', () => applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));
  });
  document.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('click', () => themeLink(link, document.documentElement.dataset.theme));
  });
});
