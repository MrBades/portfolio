document.addEventListener('DOMContentLoaded', function() {

    // --- Mobile Menu Toggle - Strategic Change: Enhanced with ARIA attributes for accessibility ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.getElementById('primary-menu'); // Strategic Change: Targeted by ID for clarity

    if (menuToggle && navUl) {
        menuToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true' || false;
            this.setAttribute('aria-expanded', !isExpanded); // Toggle aria-expanded
            navUl.classList.toggle('active'); // Toggle 'active' class for styling
        });
    }

    // --- Smooth Scrolling for Navigation Links - Strategic Change: Accounts for fixed header height ---
    const navLinks = document.querySelectorAll('nav ul li a'); // Select all nav links
    const header = document.querySelector('header'); // Get the header element

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor jump
            const targetId = this.getAttribute('href'); // Get the target section ID
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Calculate position of target section, considering fixed header height
                const headerOffset = header.offsetHeight; // Get dynamic header height
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth' // Smooth scroll effect
                });

                // Close mobile menu if open after clicking a link
                if (navUl.classList.contains('active')) {
                    navUl.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false'); // Reset aria-expanded
                }
            }
        });
    });

    // --- Back to Top Button Logic - Strategic Change: Added for improved user experience ---
    const backToTopButton = document.getElementById('back-to-top');

    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            // Show button if scrolled down more than 300px, hide otherwise
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Smooth scroll to top
            });
        });
    }

    // --- Update Footer Year ---
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = "2026";
    }
});
