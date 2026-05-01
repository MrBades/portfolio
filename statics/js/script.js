document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.spa-section');
    const navLinks = document.querySelectorAll('[data-section]');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    // --- SPA Navigation Engine ---
    function switchSection(targetId) {
        // Find the target section
        const targetSection = document.getElementById(targetId);
        if (!targetSection) return;

        // Update Nav Active State
        navLinks.forEach(link => {
            if (link.getAttribute('data-section') === targetId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Transition Logic
        const activeSection = document.querySelector('.spa-section.active');

        if (activeSection) {
            activeSection.classList.remove('fade-in');
            setTimeout(() => {
                activeSection.classList.remove('active');

                targetSection.classList.add('active');
                // Force reflow
                targetSection.offsetHeight;
                targetSection.classList.add('fade-in');

                // Trigger AI Lab Animation if active
                if (targetId === 'ailab') {
                    initNeuralBackground();
                }
            }, 500); // Matches CSS transition speed
        } else {
            targetSection.classList.add('active', 'fade-in');
        }

        // Close mobile menu if open
        if (navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }

        // Update URL hash without jumping
        history.pushState(null, null, `#${targetId}`);

        // Scroll to top
        window.scrollTo(0, 0);
    }

    // --- Event Listeners ---
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('data-section');
            switchSection(sectionId);
        });
    });

    // Handle Browser Back/Forward
    window.addEventListener('popstate', () => {
        const hash = window.location.hash.substring(1) || 'home';
        switchSection(hash);
    });

    // Initial Load
    const initialHash = window.location.hash.substring(1) || 'home';
    const initialSection = document.getElementById(initialHash);
    if (initialSection) {
        initialSection.classList.add('active', 'fade-in');
        if (initialHash === 'ailab') initNeuralBackground();

        navLinks.forEach(link => {
            if (link.getAttribute('data-section') === initialHash) link.classList.add('active');
        });
    }

    // --- Mobile Menu Toggle ---
    function toggleMobileMenu() {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'initial';
    }

    mobileToggle.addEventListener('click', toggleMobileMenu);

    // --- AI Lab: Neural Network Background Animation ---
    let canvas, ctx, particles = [];

    function initNeuralBackground() {
        const container = document.getElementById('neural-bg');
        if (!container || container.querySelector('canvas')) return;

        canvas = document.createElement('canvas');
        ctx = canvas.getContext('2d');
        container.appendChild(canvas);

        resize();
        window.addEventListener('resize', resize);

        // Create particles
        particles = [];
        for (let i = 0; i < 50; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5
            });
        }

        animate();
    }

    function resize() {
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function animate() {
        if (!document.getElementById('ailab').classList.contains('active')) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#00f2ff';
        ctx.strokeStyle = 'rgba(0, 242, 255, 0.2)';

        particles.forEach((p, i) => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            ctx.fill();

            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
                if (dist < 150) {
                    ctx.lineWidth = 1 - dist / 150;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        });

        requestAnimationFrame(animate);
    }
});
