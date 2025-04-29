document.addEventListener('DOMContentLoaded', function() { 
    const burger = document.getElementById('burger');
    const navMenu = document.getElementById('nav-menu');
    
    // Управление бургер-меню
    burger.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('active');
      this.classList.toggle('active');
      document.body.classList.toggle('no-scroll', !isExpanded);
    });
    
    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.nav a, .footer-menu a').forEach(link => {
      link.addEventListener('click', function(e) {
        if(this.getAttribute('href').startsWith('#')) {
          if(navMenu.classList.contains('active')) {
            burger.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('active');
            burger.classList.remove('active');
            document.body.classList.remove('no-scroll');
          }
          
          // Плавный скролл
          e.preventDefault();
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          if(targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth'
            });
            
            // Обновляем URL без перезагрузки
            if(history.pushState) {
              history.pushState(null, null, targetId);
            } else {
              location.hash = targetId;
            }
          }
        }
      });
    });
    
    // Закрытие меню при клике вне области
    document.addEventListener('click', function(e) {
      if(!navMenu.contains(e.target) && !burger.contains(e.target)) {
        burger.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
        burger.classList.remove('active');
        document.body.classList.remove('no-scroll');
      }
    });
    
    // Закрытие меню при скролле
    window.addEventListener('scroll', function() {
      if(navMenu.classList.contains('active')) {
        burger.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
        burger.classList.remove('active');
        document.body.classList.remove('no-scroll');
      }
    });
});
