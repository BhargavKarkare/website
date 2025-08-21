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
document.querySelectorAll('.card, .btn-primary, .btn-ghost').forEach(card=>{
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

// Intersection reveal
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.style.animationPlayState = 'running';
      observer.unobserve(entry.target);
    }
  });
},{threshold:0.12});
document.querySelectorAll('.appear-up, .appear-top').forEach(el=>observer.observe(el));

// Modal: centered by default; tiny screens keep it centered; page remains scrollable
const modal = document.getElementById('modal');
const modalContent = modal.querySelector('.modal-content');

function openTemplate(id){
  const tmpl = document.getElementById(`tmpl-${id}`);
  if(!tmpl) return;
  modalContent.innerHTML = '';
  modalContent.appendChild(tmpl.content.cloneNode(true));
  modal.setAttribute('aria-hidden','false');
}

function closeModal(){
  modal.setAttribute('aria-hidden','true');
}

// Open from any tile
document.querySelectorAll('[data-modal]').forEach(el=>{
  el.addEventListener('click', ()=> openTemplate(el.getAttribute('data-modal')));
});

// Close controls
modal.addEventListener('click', (e)=>{
  if (e.target.hasAttribute('data-close') || e.target.classList.contains('overlay')) {
    closeModal();
  }
});
modal.querySelector('.close').addEventListener('click', closeModal);
window.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeModal(); });
