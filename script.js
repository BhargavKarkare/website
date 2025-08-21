// Year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Smooth scroll for in-page links (except projects which opens modal)
document.querySelectorAll('a[href^="#"]:not([data-open-projects]):not([data-scroll-projects])').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Tilt/3D hover for cards
const clamp=(n,min,max)=>Math.max(min,Math.min(n,max));
document.querySelectorAll('.card.project, .card.soft, .stat-card, .btn-primary, .btn-ghost').forEach(card=>{
  card.addEventListener('mousemove', e=>{
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = clamp((py - 0.5) * -8, -6, 6);
    const ry = clamp((px - 0.5) * 8, -6, 6);
    card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
  });
  card.addEventListener('mouseleave', ()=>{
    card.style.transform = '';
  });
});

// Parallax background layers
const layers = document.querySelectorAll('.layer');
window.addEventListener('mousemove', (e)=>{
  const x = (e.clientX / window.innerWidth - 0.5);
  const y = (e.clientY / window.innerHeight - 0.5);
  layers.forEach(l=>{
    const d = parseFloat(l.dataset.depth || 0.05);
    l.style.transform = `translate3d(${x * -40 * d}px, ${y * -40 * d}px, -200px)`;
  });
});

// Intersection reveal (ensures animations run when in view)
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.style.animationPlayState = 'running';
      observer.unobserve(entry.target);
    }
  });
},{threshold:0.12});
document.querySelectorAll('.appear-up, .appear-top, .float').forEach(el=>observer.observe(el));

// Modal logic
const modal = document.getElementById('projects-modal');
const modalContent = modal.querySelector('.modal-content');
const openModal = (id) => {
  const tmpl = document.getElementById(`tmpl-${id}`);
  if (!tmpl) return;
  modalContent.innerHTML = '';
  modalContent.appendChild(tmpl.content.cloneNode(true));
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
};
const closeModal = () => {
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
};

// Open from project tiles
document.querySelectorAll('.card.project').forEach(card=>{
  card.addEventListener('click', ()=>{
    const id = card.getAttribute('data-project');
    openModal(id);
  });
});

// Open from nav "Projects" and hero button
document.querySelectorAll('[data-open-projects],[data-scroll-projects]').forEach(el=>{
  el.addEventListener('click', (e)=>{
    e.preventDefault();
    openModal('eks-multiregion'); // default project; user can navigate tiles below
  });
});

// Close actions
modal.addEventListener('click', (e)=>{
  if (e.target.hasAttribute('data-close') || e.target.classList.contains('overlay')) {
    closeModal();
  }
});
window.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeModal(); });
