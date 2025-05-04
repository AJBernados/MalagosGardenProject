window.addEventListener('load', function() {
    var malagosLocation = [7.189714, 125.428548];
    var map = L.map('map').setView(malagosLocation, 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    L.marker(malagosLocation).addTo(map)
        .bindPopup('Malagos Garden Resort')
        .openPopup();
});

document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;
    const department = document.getElementById('department').value;
    const newsletter = document.getElementById('newsletter').checked;

    console.log('Form submitted:', { email, name, message, department, newsletter });
    
    this.reset();

    const overlay = document.getElementById('form-success-overlay');
    overlay.classList.add('active');

    function hideOverlay() {
        overlay.classList.remove('active');
        overlay.removeEventListener('click', hideOverlay);
    }
    overlay.addEventListener('click', hideOverlay);
    setTimeout(hideOverlay, 2500);
});
