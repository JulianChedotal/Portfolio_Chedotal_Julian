// Portfolio Interactif - Julian Chedotal
document.addEventListener('DOMContentLoaded', function(){
  
  // ===== YEAR IN FOOTER =====
  const yearElement = document.getElementById('year');
  if(yearElement) yearElement.textContent = new Date().getFullYear();

  // ===== MOBILE NAVIGATION TOGGLE =====
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');
  
  if(navToggle && nav){
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      nav.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', nav.classList.contains('active'));
    });
    
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
    
    document.addEventListener('click', (e) => {
      if(nav.classList.contains('active') && !nav.contains(e.target) && !navToggle.contains(e.target)){
        nav.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      const target = document.querySelector(href);
      
      if(target && href !== '#'){
        e.preventDefault();
        const offsetTop = target.offsetTop - 100;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== BACK TO TOP BUTTON =====
  const backToTop = document.getElementById('back-to-top');
  if(backToTop){
    window.addEventListener('scroll', throttle(() => {
      if(window.scrollY > 300) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    }, 100));
    
    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const element = entry.target;
        
        if(element.classList.contains('progress')){
          const bar = element.querySelector('span');
          if(bar) bar.style.animation = 'fadeInUp 0.6s ease forwards';
        }
        
        observer.unobserve(element);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.project, .skill, .highlight-item').forEach(el => {
    observer.observe(el);
  });

  // ===== CONTACT FORM HANDLING =====
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  
  if(contactForm){
    contactForm.addEventListener('submit', function(e){
      e.preventDefault();
      
      const data = new FormData(contactForm);
      const name = data.get('name')?.trim();
      const email = data.get('email')?.trim();
      const subject = data.get('subject')?.trim();
      const message = data.get('message')?.trim();
      
      if(!name || !email || !subject || !message){
        showFormStatus('Veuillez compléter tous les champs.', 'error');
        return;
      }
      
      if(!isValidEmail(email)){
        showFormStatus('Veuillez entrer une adresse email valide.', 'error');
        return;
      }
      
      const mailtoBody = encodeURIComponent(
        `Nom: ${name}\n` +
        `Email: ${email}\n` +
        `Sujet: ${subject}\n\n` +
        `Message:\n${message}`
      );
      
      const mailtoLink = `mailto:contact@example.com?subject=${encodeURIComponent(subject)}&body=${mailtoBody}`;
      
      showFormStatus('Message préparé! Votre client email va s\'ouvrir.', 'success');
      contactForm.reset();
      
      setTimeout(() => {
        window.location.href = mailtoLink;
      }, 500);
    });
  }

  // ===== HEADER SCROLL EFFECT =====
  window.addEventListener('scroll', throttle(() => {
    const header = document.querySelector('.site-header');
    if(header && window.scrollY > 100){
      header.style.boxShadow = '0 4px 12px rgba(0, 212, 255, 0.1)';
    } else if(header){
      header.style.boxShadow = '';
    }
  }, 100));

  // ===== CURSOR EFFECTS =====
  document.querySelectorAll('.btn, .project, .skill, .contact-item').forEach(element => {
    element.addEventListener('mouseenter', function(){
      this.style.willChange = 'transform';
    });
    element.addEventListener('mouseleave', function(){
      this.style.willChange = 'auto';
    });
  });

});

// ===== UTILITY FUNCTIONS =====

function throttle(func, limit){
  let inThrottle;
  return function(){
    const args = arguments;
    const context = this;
    if(!inThrottle){
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

function isValidEmail(email){
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showFormStatus(message, type){
  const formStatus = document.getElementById('form-status');
  if(formStatus){
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
    
    if(type === 'success'){
      setTimeout(() => {
        formStatus.className = 'form-status';
      }, 4000);
    }
  }
}

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);
