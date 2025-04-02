// Add this to your main.js file or create a new filter.js file and link it in your HTML

document.addEventListener('DOMContentLoaded', function() {
    // Project filtering
    const projectFilterBtns = document.querySelectorAll('#projects .filter-btn');
    const projectCards = document.querySelectorAll('#projects .project-card');
    
    projectFilterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            projectFilterBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Certificate filtering
    const certFilterBtns = document.querySelectorAll('#certificates .cert-btn');
    const certificateCards = document.querySelectorAll('#certificates .certificate-card');
    
    certFilterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            certFilterBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            certificateCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});