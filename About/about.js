document.addEventListener('DOMContentLoaded', function () {
    const carousels = document.querySelectorAll('.activity-carousel');
    carousels.forEach(carousel => {
        const images = carousel.querySelectorAll('.carousel-img');
        let current = 0;
        images.forEach((img, i) => {
            img.classList.remove('active', 'prev');
            if (i === 0) img.classList.add('active');
        });
        setInterval(() => {
            const prev = current;
            images[prev].classList.remove('active');
            images[prev].classList.add('prev');
            current = (current + 1) % images.length;
            images[current].classList.add('active');
            images[prev].offsetWidth; 
            setTimeout(() => {
                images[prev].classList.remove('prev');
            }, 700);
        }, 9000);
    });
    const overlay = document.getElementById('site-transition-overlay');
    if (overlay) {
        overlay.classList.remove('fade-out');
        setTimeout(() => {
            overlay.classList.add('fade-out');
            setTimeout(() => {
                overlay.classList.remove('active');
                overlay.style.display = 'none';
            }, 500); 
        }, 1200); 
    }
});
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href && !href.startsWith('#') && !this.classList.contains('active')) {
      e.preventDefault();
      const overlay = document.getElementById('site-transition-overlay');
      overlay.classList.remove('fade-out');
      overlay.classList.add('active');
      overlay.style.display = 'flex';
      window.location.href = href;
    }
  });
});
let lastScrollTop = 0;
const topNav = document.querySelector('.top-nav');
const scrollThreshold = 50; 

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY || document.documentElement.scrollTop;
    
    if (currentScroll > lastScrollTop && currentScroll > scrollThreshold) {
        topNav.classList.add('hidden');
    } else {
        topNav.classList.remove('hidden');
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}); 
