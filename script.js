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

// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
if (toggle) {
  toggle.addEventListener('click', () => {
    const show = links.style.display === 'flex';
    links.style.display = show ? 'none' : 'flex';
  });
}

// Subtle 3D tilt on interactive cards/buttons
const clamp = (n,min,max)=>Math.max(min,Math.min(n,max));
document.querySelectorAll('.card, .btn-primary, .btn-ghost').forEach(card=>{
  card.addEventListener('mousemove', e=>{
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = clamp((py - 0.5) * -6, -5, 5);
    const ry = clamp((px - 0.5) * 6, -5, 5);
    card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
  });
  card.addEventListener('mouseleave', ()=> card.style.transform = '');
});

// Reveal animations on scroll
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.style.animationPlayState = 'running';
      observer.unobserve(entry.target);
    }
  });
},{threshold:0.12});
document.querySelectorAll('.appear-up, .appear-top').forEach(el=>observer.observe(el));

// Centered modal (projects/experience)
const modal = document.getElementById('modal');
const modalContent = modal?.querySelector('.modal-content');

function openTemplate(id){
  const tmpl = document.getElementById(`tmpl-${id}`);
  if(!tmpl || !modalContent) return;
  modalContent.innerHTML = '';
  modalContent.appendChild(tmpl.content.cloneNode(true));
  modal.setAttribute('aria-hidden','false');
}
function closeModal(){ modal.setAttribute('aria-hidden','true'); }

document.querySelectorAll('[data-modal]').forEach(el=>{
  el.addEventListener('click', ()=> openTemplate(el.getAttribute('data-modal')));
});
modal?.addEventListener('click', (e)=>{
  if (e.target.hasAttribute('data-close') || e.target.classList.contains('overlay')) closeModal();
});
modal?.querySelector('.close')?.addEventListener('click', closeModal);
window.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeModal(); });

// Skills accordion with smooth height animation
(function(){
  const acc = document.getElementById('skills-accordion');
  if(!acc) return;
  const btn = acc.querySelector('.skill-toggle');
  const wrap = acc.querySelector('.skill-content-wrapper');

  const setHeight = (open) => {
    if (open){
      wrap.style.height = 'auto';
      const h = wrap.clientHeight + 'px';
      wrap.style.height = '0px';
      // force reflow
      // eslint-disable-next-line no-unused-expressions
      wrap.offsetHeight;
      wrap.style.height = h;
    } else {
      wrap.style.height = wrap.clientHeight + 'px';
      // force reflow
      // eslint-disable-next-line no-unused-expressions
      wrap.offsetHeight;
      wrap.style.height = '0px';
    }
  };

  btn.addEventListener('click', ()=>{
    const open = acc.getAttribute('aria-expanded') !== 'true';
    acc.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    setHeight(open);
  });

  // Optional: open by default
  // acc.setAttribute('aria-expanded','true');
  // btn.setAttribute('aria-expanded','true');
  // setHeight(true);

  wrap.addEventListener('transitionend', ()=>{
    if (acc.getAttribute('aria-expanded') === 'true'){
      wrap.style.height = 'auto';
    }
  });
})();
