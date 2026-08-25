import './style.css';

// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mx = 0, my = 0, fx = 0, fy = 0;

document.addEventListener('mousemove', (e) => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

(function animateFollower() {
  fx += (mx - fx) * 0.12;
  fy += (my - fy) * 0.12;
  follower.style.left = fx + 'px';
  follower.style.top  = fy + 'px';
  requestAnimationFrame(animateFollower);
})();

document.querySelectorAll('a,button,.glass-card,.tech-badge').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.classList.add('big'); follower.classList.add('big'); });
  el.addEventListener('mouseleave', () => { cursor.classList.remove('big'); follower.classList.remove('big'); });
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.cssText = window.scrollY > 60
    ? 'background:rgba(5,11,24,0.95);backdrop-filter:blur(20px);border-bottom:1px solid rgba(255,255,255,0.06);box-shadow:0 8px 32px rgba(0,0,0,0.4)'
    : '';
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const [s1, s2, s3] = hamburger.querySelectorAll('span');

hamburger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('hidden');
  mobileMenu.classList.toggle('flex', !open);
  s1.style.transform = !open ? 'rotate(45deg) translate(4px,4px)' : '';
  s2.style.opacity   = !open ? '0' : '';
  s3.style.transform = !open ? 'rotate(-45deg) translate(4px,-4px)' : '';
});
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    mobileMenu.classList.remove('flex');
    s1.style.transform = s2.style.opacity = s3.style.transform = '';
  });
});

// ===== TYPING EFFECT =====
const texts = ['Junior Web Developer 💻', 'Flutter Developer 📱', 'Laravel Developer 🌐', 'ນັກສຶກສາປີ 4 | NUOL 🎓'];
let ti = 0, ci = 0, del = false;
const typedEl = document.getElementById('typed-text');

function typeLoop() {
  const cur = texts[ti];
  typedEl.textContent = del ? cur.slice(0, ci - 1) : cur.slice(0, ci + 1);
  del ? ci-- : ci++;
  if (!del && ci === cur.length) setTimeout(() => del = true, 2000);
  if (del && ci === 0) { del = false; ti = (ti + 1) % texts.length; }
  setTimeout(typeLoop, del ? 55 : 85);
}
typeLoop();

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const delay = entry.target.dataset.revealDelay;
    const apply = () => entry.target.classList.add('visible');
    delay ? setTimeout(apply, +delay) : apply();
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.05, rootMargin: '0px 0px 20px 0px' });

document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

// Fallback: show all after 1.5s if observer doesn't fire
setTimeout(() => {
  document.querySelectorAll('[data-reveal]:not(.visible)').forEach(el => el.classList.add('visible'));
}, 1500);

// ===== SKILL BARS =====
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll('.skill-bar-fill').forEach((bar, i) => {
      setTimeout(() => bar.classList.add('animated'), i * 180);
    });
    skillObserver.unobserve(entry.target);
  });
}, { threshold: 0.3 });

document.querySelectorAll('#skill-mobile,#skill-web,#skill-db,#skill-other').forEach(el => skillObserver.observe(el));

// ===== ACTIVE NAV ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 180) cur = s.id; });
  navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${cur}`));
});

// ===== SCROLL INDICATOR FADE =====
const scrollInd = document.getElementById('scroll-indicator');
window.addEventListener('scroll', () => {
  scrollInd.style.opacity = window.scrollY > 200 ? '0' : '1';
});

// ===== CONTACT FORM =====
window.handleFormSubmit = function(e) {
  e.preventDefault();
  const btn = document.getElementById('submit-btn');
  const success = document.getElementById('form-success');
  btn.textContent = 'ກຳລັງສົ່ງ...';
  btn.disabled = true;
  setTimeout(() => {
    success.classList.remove('hidden');
    btn.textContent = '✓ ສົ່ງສຳເລັດ';
    e.target.reset();
    setTimeout(() => {
      success.classList.add('hidden');
      btn.innerHTML = '<span>ສົ່ງຂໍ້ຄວາມ</span><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>';
      btn.disabled = false;
    }, 3000);
  }, 1200);
};

console.log('%c ✨ Portfolio — ວາເລນທາຍ ມະນີ | Vite + Tailwind', 'font-size:14px;color:#00D4FF;font-weight:bold;');
