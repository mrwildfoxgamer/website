document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');
        
        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Burger Animation
        burger.classList.toggle('toggle');
    });
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                    navLinks.forEach(link => {
                        link.style.animation = '';
                    });
                }
            }
        });
    });
    
    // Form Submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // For a real implementation, you would send this data to a server
            console.log('Form Submitted:', { name, email, message });
            
            // Show success message (in a real implementation)
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Scroll Animation for Sections
    const fadeInElements = document.querySelectorAll('.projects-grid, .about-content, #contact-form');
    
    const fadeInOptions = {
        threshold: 0.3,
        rootMargin: "0px 0px -100px 0px"
    };
    
    const fadeInObserver = new IntersectionObserver(function(entries, fadeInObserver) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('fade-in');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, fadeInOptions);
    
    fadeInElements.forEach(element => {
        element.classList.add('fade-out');
        fadeInObserver.observe(element);
    });
});

// Add scroll class to navbar for background change on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 0);
});
// dynamic skill bar animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-level');
    
    skillBars.forEach(bar => {
      const width = bar.style.width;
      bar.style.width = '0';
      
      setTimeout(() => {
        bar.style.transition = 'width 1s ease';
        bar.style.width = width;
      }, 200);
    });
  }
  
  // Call this when the about section is visible
  const aboutSection = document.querySelector('#about');
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateSkillBars();
      observer.unobserve(aboutSection);
    }
  }, { threshold: 0.5 });
  
  observer.observe(aboutSection);

  // Scroll progress indicator
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    document.querySelector('.scroll-progress').style.width = `${scrollPercent}%`;
  });

// Project filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    button.classList.add('active');
    
    // Get filter value
    const filterValue = button.getAttribute('data-filter');
    
    // Filter projects
    projectCards.forEach(card => {
      if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
        card.style.display = 'block';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        }, 50);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 500);
      }
    });
  });
});


// Dark mode toggle
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle.querySelector('i');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  
  if (document.body.classList.contains('dark-mode')) {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
    localStorage.setItem('theme', 'dark');
  } else {
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
    localStorage.setItem('theme', 'light');
  }
});

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
  themeIcon.classList.remove('fa-moon');
  themeIcon.classList.add('fa-sun');
}

// Contact Modal
document.addEventListener('DOMContentLoaded', () => {
    // Add contact button to navigation
    const nav = document.querySelector('nav');
    const contactButton = document.createElement('button');
    contactButton.classList.add('contact-btn');
    contactButton.textContent = 'Contact Me';
    nav.appendChild(contactButton);
    
    // Get modal elements
    const modal = document.querySelector('.contact-modal');
    const closeModal = document.querySelector('.close-modal');
    
    // Toggle modal
    contactButton.addEventListener('click', () => {
        modal.classList.add('show-modal');
    });
    
    closeModal.addEventListener('click', () => {
        modal.classList.remove('show-modal');
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show-modal');
        }
    });
    
    // Form handling for modal
    const modalForm = document.getElementById('modal-contact-form');
    if (modalForm) {
        modalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('modal-name').value;
            const email = document.getElementById('modal-email').value;
            const message = document.getElementById('modal-message').value;
            
            // For a real implementation, you would send this data to a server
            console.log('Form Submitted:', { name, email, message });
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form and hide modal
            modalForm.reset();
            modal.classList.remove('show-modal');
        });
    }
});

