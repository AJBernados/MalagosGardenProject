document.addEventListener('DOMContentLoaded', function() {
    for (let i = 1; i <= 5; i++) {
        const roomCard = document.querySelector(`.RoomCard${i}`);
        if (!roomCard) continue;

        const track = roomCard.querySelector('.carousel-track');
        const images = track.querySelectorAll('.carousel-img');
        const dots = roomCard.querySelectorAll('.dot');
        const prevBtn = roomCard.querySelector('.carousel-prev');
        const nextBtn = roomCard.querySelector('.carousel-next');
        let currentIndex = 0;

        function showImage(newIndex) {
            newIndex = Math.max(0, Math.min(newIndex, images.length - 1));
            images.forEach((img, idx) => {
                if (idx === newIndex) {
                    img.classList.add('active');
                } else {
                    img.classList.remove('active');
                }
            });
            dots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === newIndex);
            });
            prevBtn.style.visibility = newIndex === 0 ? 'hidden' : 'visible';
            nextBtn.style.visibility = newIndex === images.length - 1 ? 'hidden' : 'visible';
            currentIndex = newIndex;
        }

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) showImage(currentIndex - 1);
        });

        nextBtn.addEventListener('click', () => {
            if (currentIndex < images.length - 1) showImage(currentIndex + 1);
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                if (index !== currentIndex) showImage(index);
            });
        });
        showImage(0);
    }
    document.querySelectorAll('.heart-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            btn.classList.toggle('favorited');
        });
    });

    function initFilters() {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            newsletterForm.reset();
        });
    }

    const filterButtons = document.querySelectorAll('.filter-btn');
    const roomCards = [
        { el: document.querySelector('.RoomCard1'), name: 'Medenilla and Pakpak', type: 'deluxe villa' },
        { el: document.querySelector('.RoomCard2'), name: 'Stunning Honeymoon Suite', type: 'suite villa' },
        { el: document.querySelector('.RoomCard3'), name: 'Palmera', type: 'suite' },
        { el: document.querySelector('.RoomCard4'), name: 'Musaenda and Mariposa', type: 'villa deluxe' },
        { el: document.querySelector('.RoomCard5'), name: 'The Legacy', type: 'villa' },
    ];

    function filterRooms(filter) {
        roomCards.forEach(card => {
            if (filter === 'all') {
                card.el.style.display = '';
            } else if (filter === 'deluxe') {
                card.el.style.display = card.name === 'Medenilla and Pakpak' ? '' : 'none';
            } else if (filter === 'suites') {
                card.el.style.display = (card.name === 'Palmera' || card.name === 'Stunning Honeymoon Suite') ? '' : 'none';
            } else if (filter === 'villas') {
                card.el.style.display = (card.name === 'The Legacy' || card.name === 'Musaenda and Mariposa') ? '' : 'none';
            }
        });
    }

    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const text = btn.textContent.trim();
            if (text === 'All') filterRooms('all');
            else if (text === 'Deluxe Rooms') filterRooms('deluxe');
            else if (text === 'Suites') filterRooms('suites');
            else if (text === 'Villas') filterRooms('villas');
        });
    });

    const filtersBtn = document.getElementById('openFilters');
    const filtersDropdown = document.getElementById('filtersDropdown');
    if (filtersBtn && filtersDropdown) {
        filtersBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            filtersDropdown.classList.toggle('show');
            filtersDropdown.focus();
        });
        document.addEventListener('click', function(e) {
            if (!filtersDropdown.contains(e.target) && e.target !== filtersBtn) {
                filtersDropdown.classList.remove('show');
            }
        });
    }

    //Modal
    const bookingModal = document.getElementById('bookingModal');
    const bookingModalClose = document.querySelector('.booking-modal-close');
    const roomsGrid = document.querySelector('.rooms-grid');

    if (roomsGrid) {
        roomsGrid.addEventListener('click', function(e) {
            const card = e.target.closest('.rooms-grid > div');
            if (!card || e.target.closest('.heart-btn') || e.target.closest('.carousel-prev') || e.target.closest('.carousel-next')) return;
            console.log('Room card clicked:', card.className);
            bookingModal.style.display = 'flex';
        });
    }
    if (bookingModalClose) {
        bookingModalClose.addEventListener('click', function() {
            bookingModal.style.display = 'none';
        });
    }

    if (bookingModal) {
        bookingModal.addEventListener('click', function(e) {
            if (e.target === bookingModal) {
                bookingModal.style.display = 'none';
            }
        });
    }
    initFilters();
});