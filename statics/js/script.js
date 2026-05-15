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

    // --- Intersection Observer for Scroll Reveals ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    if ('IntersectionObserver' in window) {
        document.body.classList.add('js-reveal');
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.glass-card, .section-title, .hero-content').forEach(el => {
            el.classList.add('reveal-on-scroll');
            revealObserver.observe(el);
        });
    }

    // --- Parallax Effect for Africa Map ---
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const map = document.getElementById('africa-map-container');
        if (map && scrolled < 1000) {
            map.style.transform = `translate(-50%, calc(-50% + ${scrolled * 0.15}px))`;
        }
    });

    // --- Map Nodes Generator ---
    function generateMapNodes() {
        const container = document.querySelector('.map-nodes');
        if (!container) return;

        // Random positions over the Africa SVG area
        for (let i = 0; i < 15; i++) {
            const node = document.createElement('div');
            node.className = 'map-node';
            node.style.top = `${Math.random() * 60 + 20}%`;
            node.style.left = `${Math.random() * 40 + 30}%`;
            node.style.animationDelay = `${Math.random() * 2}s`;
            container.appendChild(node);
        }
    }
    generateMapNodes();

    // --- Member Modal Logic ---
    const modal = document.getElementById('member-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.querySelector('.close-modal');
    const clickableMembers = document.querySelectorAll('.clickable-member');

    const memberDetails = {
        suleman: {
            name: "Suleman Bades",
            role: "CEO & Founder | Software Architect",
            bio: "BSc in Information Technology with over 8 years of experience in enterprise infrastructure. Expert in React, Next.js, Django, and global compliance standards for fintech.",
            expertise: ["Software Architecture", "FinTech Compliance", "Cloud Infrastructure", "Strategic Planning"]
        },
        azeez: {
            name: "Ajigboteso Azeez Sesan",
            role: "Technical Lead | IT Support Professional",
            bio: "HND in Computer Engineering. Specialist in high-availability systems, network architecture (LAN/WAN), and hardware reliability in challenging environments.",
            expertise: ["Network Infrastructure", "System Reliability", "Hardware Maintenance", "Technical Support"]
        }
    };

    clickableMembers.forEach(member => {
        member.addEventListener('click', () => {
            const memberId = member.getAttribute('data-member');
            const details = memberDetails[memberId];

            modalBody.innerHTML = `
                <h2 style="color: var(--electric-blue)">${details.name}</h2>
                <p style="font-weight: 600; margin: 1rem 0">${details.role}</p>
                <p style="color: var(--text-dim); margin-bottom: 2rem">${details.bio}</p>
                <h4 style="margin-bottom: 1rem">Core Expertise:</h4>
                <ul style="display: flex; gap: 10px; flex-wrap: wrap">
                    ${details.expertise.map(exp => `<li class="glass-card" style="padding: 5px 15px; font-size: 0.8rem">${exp}</li>`).join('')}
                </ul>
            `;
            modal.style.display = 'block';
        });
    });

    closeModal.onclick = () => modal.style.display = 'none';
    window.onclick = (event) => {
        if (event.target == modal) modal.style.display = 'none';
    };

    // --- AI Lab: Neural Network Background Animation ---
    let canvas, ctx, particles = [], isAnimating = false;

    function initNeuralBackground() {
        const container = document.getElementById('neural-bg');
        if (!container) return;

        if (container.querySelector('canvas')) {
            if (!isAnimating) {
                isAnimating = true;
                animate();
            }
            return;
        }

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
        if (!document.getElementById('ailab').classList.contains('active')) {
            isAnimating = false;
            return;
        }
        isAnimating = true;

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
