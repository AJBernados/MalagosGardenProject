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
            images[prev].offsetWidth; // force reflow for transition
            setTimeout(() => {
                images[prev].classList.remove('prev');
            }, 700);
        }, 9000);
    });
}); 