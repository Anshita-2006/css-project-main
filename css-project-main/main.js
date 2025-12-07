// main.js — handle active nav, reload-on-same-section, and small helpers
document.addEventListener('DOMContentLoaded', function () {
  const navLinks = Array.from(document.querySelectorAll('.main-nav a'));
  const sections = navLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

  function setActiveByScroll() {
    const offset = 110; // header height + margin
    let current = sections[0];
    for (let sec of sections) {
      const top = sec.getBoundingClientRect().top;
      if (top - offset <= 0) current = sec;
    }
    navLinks.forEach(a => a.parentElement.classList.toggle('active', document.querySelector(a.getAttribute('href')) === current));
  }

  // initial
  setActiveByScroll();
  window.addEventListener('scroll', setActiveByScroll, { passive: true });

  // click handler
  navLinks.forEach(a => {
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const target = document.querySelector(href);
      if (!target) return;
      
      const targetTop = target.getBoundingClientRect().top;
      if (Math.abs(targetTop) < 8) {
        e.preventDefault();
        location.reload();
        return;
      }
    });
  });

  // CTA buttons
  const downloadBtn = document.getElementById('downloadBtn');
  const moreBtn = document.getElementById('moreBtn');
  [downloadBtn, moreBtn].forEach(btn => {
    if (!btn) return;
    btn.addEventListener('click', (e) => {
      const href = btn.getAttribute('href');
      const target = document.querySelector(href);
      if (!target) return;
      if (Math.abs(target.getBoundingClientRect().top) < 8) {
        e.preventDefault();
        location.reload();
      }
    });
  });
});