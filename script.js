// Year in footer
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

// Stagger reveal on scroll (intersection observer, no libraries)
const reveal = (el, delay = 0) => {
  el.style.animationDelay = delay;
  el.classList.add('appear-up');
};
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('in-view');
      entry.target.style.animationPlayState = 'running';
      observer.unobserve(entry.target);
    }
  });
},{threshold:0.12});

document.querySelectorAll('.appear-up, .appear-top, .float').forEach(el=>{
  // already has CSS animations; observer only ensures it runs when in view
  observer.observe(el);
});
