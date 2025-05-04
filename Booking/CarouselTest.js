document.addEventListener('DOMContentLoaded', function() {
    const roomCard = document.querySelector('.RoomCard1');
    const images = roomCard.querySelectorAll('.carousel-img');
    const prevBtn = roomCard.querySelector('.carousel-prev');
    const nextBtn = roomCard.querySelector('.carousel-next');
    const dots = roomCard.querySelectorAll('.dot');
    
    let currentIndex = 0;
    const totalImages = images.length;

     Function to update the carousel
    function updateCarousel() {
         Hide all images
        images.forEach(img => img.classList.remove('active'));
         Show current image
        images[currentIndex].classList.add('active');
        
         Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        
         Update button visibility
        prevBtn.style.display = currentIndex === 0 ? 'none' : 'block';
        nextBtn.style.display = currentIndex === totalImages - 1 ? 'none' : 'block';
    }

     Event listeners for buttons
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < totalImages - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

     Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });

     Initialize carousel
    updateCarousel();
}); 

