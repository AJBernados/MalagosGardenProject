window.addEventListener('DOMContentLoaded', function () {
    const faqs = [
        {
            question: 'How do we book a stay at Malagos Garden Resort?',
            answer: 'Booking can be done at malagos.com. You may also send us an email at <b>reservations2@malagos.com</b>, message us through our facebook page: <b><u>facebook.com/malagosgardenresort</u></b> or contact us through 0917 624 5727.'
        },
        {
            question: 'What are the check-in and check-out times?',
            answer: 'Check-in is at 2:00 PM and check-out is at 12:00 NN. Early check-in and late check-out are subject to availability.'
        },
        {
            question: 'Are pets allowed at the resort?',
            answer: 'Yes, pets are allowed in designated areas. Please inform us in advance if you are bringing a pet.'
        },
        {
            question: 'Do you offer day tours?',
            answer: 'Yes, we offer day tours with access to our gardens, animal encounters, and chocolate museum. Please check our website for rates.'
        }
    ];

    let currentFAQ = 0;
    const cardsContainer = document.querySelector('.faq-cards-vertical');
    const leftBtn = document.querySelector('.faq-arrow-left');
    const rightBtn = document.querySelector('.faq-arrow-right');
    function createCard(faq, className) {
        const card = document.createElement('div');
        card.className = `faq-card faq-card-vertical ${className}`;
        card.innerHTML = `
            <div class="faq-card-inner">
                <div class="faq-question-col">
                    <div class="faq-question">${faq.question}</div>
                </div>
                <div class="faq-divider"></div>
                <div class="faq-answer-col">
                    <div class="faq-answer">${faq.answer}</div>
                </div>
            </div>
        `;
        return card;
    }

    function renderCards() {
        if (!cardsContainer) return;
        cardsContainer.innerHTML = '';
        const nextIndex = (currentFAQ + 1) % faqs.length;
        const activeCard = createCard(faqs[currentFAQ], 'active');
        const nextCard = createCard(faqs[nextIndex], 'next');
        cardsContainer.appendChild(activeCard);
        cardsContainer.appendChild(nextCard);
    }

    function animateNext() {
        const activeCard = cardsContainer.querySelector('.faq-card-vertical.active');
        const nextCard = cardsContainer.querySelector('.faq-card-vertical.next');
        if (activeCard && nextCard) {
            activeCard.classList.add('slide-up');
            nextCard.classList.add('slide-in');
            setTimeout(() => {
                currentFAQ = (currentFAQ + 1) % faqs.length;
                renderCards();
            }, 500);
        }
    }

    function animatePrev() {
        const prevIndex = (currentFAQ - 1 + faqs.length) % faqs.length;
        const nextIndex = (currentFAQ + 1) % faqs.length;
        cardsContainer.innerHTML = '';
        const prevCard = createCard(faqs[prevIndex], 'prev-in');
        const activeCard = createCard(faqs[currentFAQ], 'active');
        const nextCard = createCard(faqs[nextIndex], 'next');
        cardsContainer.appendChild(prevCard);
        cardsContainer.appendChild(activeCard);
        cardsContainer.appendChild(nextCard);
  
        setTimeout(() => {
            prevCard.classList.add('slide-in-prev');
            activeCard.classList.add('slide-down');
        }, 10);
        setTimeout(() => {
            currentFAQ = prevIndex;
            renderCards();
        }, 500);
    }

    if (leftBtn && rightBtn) {
        leftBtn.addEventListener('click', animatePrev);
        rightBtn.addEventListener('click', animateNext);
    }
    renderCards();

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
