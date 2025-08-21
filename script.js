// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Smooth scroll for in-page links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// 3D tilt on hover
const clamp=(n,min,max)=>Math.max(min,Math.min(n,max));
document.querySelectorAll('.card, .stat-card, .btn-primary, .btn-ghost').forEach(card=>{
  card.addEventListener('mousemove', e=>{
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = clamp((py - 0.5) * -8, -6, 6);
    const ry = clamp((px - 0.5) * 8, -6, 6);
    card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
  });
  card.addEventListener('mouseleave', ()=> card.style.transform = '');
});

// Parallax haze layers
const layers = document.querySelectorAll('.layer');
window.addEventListener('mousemove', (e)=>{
  const x = (e.clientX / window.innerWidth - 0.5);
  const y = (e.clientY / window.innerHeight - 0.5);
  layers.forEach(l=>{
    const d = parseFloat(l.dataset.depth || 0.05);
    l.style.transform = `translate3d(${x * -40 * d}px, ${y * -40 * d}px, 0)`;
  });
});

// Reveal on scroll
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.style.animationPlayState = 'running';
      observer.unobserve(entry.target);
    }
  });
},{threshold:0.12});
document.querySelectorAll('.appear-up, .appear-top, .float').forEach(el=>observer.observe(el));

// Modal handling (projects + experience)
const modal = document.getElementById('modal');
const modalContent = modal.querySelector('.modal-content');

function openModal(templateId){
  const tmpl = document.getElementById(`tmpl-${templateId}`);
  if(!tmpl) return;
  modalContent.innerHTML = '';
  modalContent.appendChild(tmpl.content.cloneNode(true));
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
}

function closeModal(){
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}

// Open from project tiles
document.querySelectorAll('[data-modal]').forEach(el=>{
  el.addEventListener('click', ()=>{
    openModal(el.getAttribute('data-modal'));
  });
});

// Close controls
modal.addEventListener('click', (e)=>{
  if (e.target.hasAttribute('data-close') || e.target.classList.contains('overlay')) {
    closeModal();
  }
});
modal.querySelector('.close').addEventListener('click', closeModal);
window.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeModal(); });
