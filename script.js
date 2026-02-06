// Interactivité minimale pour le portfolio
document.addEventListener('DOMContentLoaded', function(){
  // Year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Nav toggle (mobile)
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');
  navToggle && navToggle.addEventListener('click', ()=>{
    const shown = nav.style.display === 'block';
    nav.style.display = shown ? '' : 'block';
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth',block:'start'});
        // close mobile nav if open
        if(window.innerWidth < 800 && nav){nav.style.display = ''}
      }
    })
  });

  // Back to top
  const btt = document.getElementById('back-to-top');
  window.addEventListener('scroll', ()=>{
    if(window.scrollY > 400) btt.style.display = 'block'; else btt.style.display = 'none';
  });
  btt && btt.addEventListener('click', ()=>window.scrollTo({top:0,behavior:'smooth'}));

  // Project modal open/close
  document.querySelectorAll('[data-modal]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const id = btn.getAttribute('data-modal');
      const modal = document.getElementById(id);
      if(modal){ modal.setAttribute('aria-hidden','false'); }
    })
  });
  document.querySelectorAll('.modal-close').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const modal = btn.closest('.modal');
      modal && modal.setAttribute('aria-hidden','true');
    })
  });
  document.querySelectorAll('.modal').forEach(m=>{
    m.addEventListener('click', (e)=>{ if(e.target===m) m.setAttribute('aria-hidden','true') })
  });

  // Filters
  const filters = document.querySelectorAll('.filter');
  const projects = document.querySelectorAll('.project');
  filters.forEach(f=>{
    f.addEventListener('click', ()=>{
      filters.forEach(x=>x.classList.remove('active'));
      f.classList.add('active');
      const filter = f.getAttribute('data-filter');
      projects.forEach(p=>{
        if(filter==='*' || p.getAttribute('data-category')===filter) p.style.display='flex'; else p.style.display='none';
      })
    })
  });

  // Contact form: simple mailto fallback + validation
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  form && form.addEventListener('submit', function(e){
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get('name').trim();
    const email = data.get('email').trim();
    const message = data.get('message').trim();
    if(!name || !email || !message){ status.textContent = 'Merci de compléter tous les champs.'; return; }
    // Try to open user's mail client as simple fallback
    const subject = encodeURIComponent('Contact depuis portfolio — ' + name);
    const body = encodeURIComponent(`Nom: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:your.email@example.com?subject=${subject}&body=${body}`;
    status.textContent = 'Votre client mail va s’ouvrir. Vous pouvez aussi écrire directement à your.email@example.com';
    form.reset();
  });
});
