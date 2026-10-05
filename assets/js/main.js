/* ===================================================
   Bruno Lauer Portfolio — main.js
   Shared behaviour: nav, theme, lightbox, reveal
   =================================================== */

(function () {
  /* ---- Theme Toggle ---- */
  const btn = document.getElementById('theme-toggle');
  if (btn) {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = stored !== null ? stored === 'dark' : prefersDark;
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    btn.textContent = isDark ? '☀️' : '🌙';

    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      btn.textContent = next === 'dark' ? '☀️' : '🌙';
    });
  }

  /* ---- Mobile Nav ---- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburger.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
    });
    // close on link click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.textContent = '☰';
      });
    });
  }

  /* ---- Active nav link ---- */
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ---- Lightbox ---- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  if (lightbox && lightboxImg) {
    document.querySelectorAll('[data-lightbox]').forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('open');
      });
    });
    lightbox.addEventListener('click', () => lightbox.classList.remove('open'));
  }

  /* ---- Scroll Reveal ---- */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length > 0) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach(el => obs.observe(el));
  }

  /* ---- Project filter ---- */
  const tabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.project-card');
  if (tabs.length) {
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const cat = tab.dataset.filter;
        cards.forEach(card => {
          if (cat === 'all' || card.dataset.category === cat) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
})();