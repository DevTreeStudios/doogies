const navToggle = document.getElementById('navToggle');
const primaryNav = document.querySelector('.primary-nav');
navToggle.addEventListener('click', () => {
  const open = primaryNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});

window.addEventListener('load', () => {
  const heroTitle = document.querySelector('.hero-title');
  const heroSub = document.querySelector('.hero-sub');
  setTimeout(()=> heroTitle.style.opacity = '1', 120);
  setTimeout(()=> { heroTitle.classList.add('in-view'); heroSub.classList.add('in-view') }, 220);

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const neonEl = document.getElementById('neon-badge');
  let now = new Date().getHours();
  let neonText = 'CLOSED';
  if (now == 19) { neonText = 'CLOSING SOON'; }
  if (now >= 11 & now < 19) { neonText = 'OPEN'; }
  if (neonEl) neonEl.textContent = neonText;
});

const observerOpts = { threshold: 0.12 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      if (entry.target.classList.contains('cards')) {
        Array.from(entry.target.children).forEach((c, i) => {
          setTimeout(()=> c.classList.add('in-view'), i*120 + 40);
        });
      }
      observer.unobserve(entry.target);
    }
  });
}, observerOpts);

document.querySelectorAll('.anim-up, .anim-left, .anim-right, .cards, .test').forEach(el => observer.observe(el));

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.getElementById(link.dataset.link);
    if (target) target.scrollIntoView({behavior:'smooth',block:'start'});
    if(primaryNav.classList.contains('open')) {
      primaryNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded','false');
    }
  });
});
