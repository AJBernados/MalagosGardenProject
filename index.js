const buttons = document.querySelectorAll("[data-carousel-button]");

function moveSlide(button) {
    const isNext = button.dataset.carouselButton.includes("next");
    const offset = isNext ? 1 : -1;
    const slides = button.closest("[data-carousel]").querySelector('[data-slides]');
    const activeSlide = slides.querySelector("[data-active]");
    let newIndex = [...slides.children].indexOf(activeSlide) + offset;

    if (newIndex < 0) newIndex = slides.children.length - 1;
    if (newIndex >= slides.children.length) newIndex = 0;

    slides.children[newIndex].dataset.active = true;
    delete activeSlide.dataset.active;
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        moveSlide(button);
        resetAutoSlide();
    });
});

let autoSlideInterval = 5000;
let slideInterval = setInterval(() => {
    const allCarousels = document.querySelectorAll('[data-carousel]');
    allCarousels.forEach(carousel => {
        const nextButton = carousel.querySelector('[data-carousel-button*="next"]');
        if (nextButton) moveSlide(nextButton);
    });
}, autoSlideInterval);

function resetAutoSlide() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
        const allCarousels = document.querySelectorAll('[data-carousel]');
        allCarousels.forEach(carousel => {
            const nextButton = carousel.querySelector('[data-carousel-button*="next"]');
            if (nextButton) moveSlide(nextButton);
        });
    }, autoSlideInterval);
}
