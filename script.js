// ===== CURSOR FOLLOWER =====
const cursorFollower = document.getElementById('cursorFollower');
let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    const dx = mouseX - followerX;
    const dy = mouseY - followerY;

    followerX += dx * 0.1;
    followerY += dy * 0.1;

    if (cursorFollower) {
        cursorFollower.style.left = `${followerX}px`;
        cursorFollower.style.top = `${followerY}px`;
    }

    requestAnimationFrame(animateCursor);
}

if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    animateCursor();
}

// Scale cursor on interactive elements
const interactiveElements = document.querySelectorAll('a, button, .btn, .download-btn, .nav-link');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (cursorFollower) {
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.borderWidth = '1px';
        }
    });

    el.addEventListener('mouseleave', () => {
        if (cursorFollower) {
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.borderWidth = '2px';
        }
    });
});

// ===== NAVIGATION SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;
const scrollThreshold = 100;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add scrolled class when scrolled down
    if (currentScroll > scrollThreshold) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== SCROLL REVEAL ANIMATION =====
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);

// Observe all elements with data-scroll-reveal attribute
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('[data-scroll-reveal]');
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
});

// ===== BACK TO TOP BUTTON =====
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== DOWNLOAD BUTTON FEEDBACK =====
const downloadButtons = document.querySelectorAll('.download-btn, .btn-primary');

downloadButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.classList.add('ripple-effect');

        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== PARTICLE SYSTEM FOR HERO =====
const particlesContainer = document.getElementById('particles');

if (particlesContainer && window.innerWidth > 768) {
    const particleCount = 40;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'linear-gradient(135deg, #0084ff, #00d4ff)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        particle.style.pointerEvents = 'none';

        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 5;
        const distance = Math.random() * 100 + 50;

        particle.style.animation = `float-particle ${duration}s ${delay}s infinite ease-in-out`;

        particlesContainer.appendChild(particle);
    }

    // Add particle animation
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes float-particle {
            0%, 100% {
                transform: translate(0, 0);
            }
            25% {
                transform: translate(20px, -30px);
            }
            50% {
                transform: translate(-25px, 20px);
            }
            75% {
                transform: translate(15px, -15px);
            }
        }
    `;
    document.head.appendChild(particleStyle);
}

// ===== PARALLAX EFFECT FOR HERO BACKGROUND =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');

    if (heroBackground && window.innerWidth > 768) {
        heroBackground.style.transform = `translateY(${scrolled * 0.4}px)`;
    }
});

// ===== TILT EFFECT FOR CARDS =====
function addTiltEffect() {
    const cards = document.querySelectorAll('.download-card, .feature-card, .security-card');

    if (window.innerWidth > 768) {
        cards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px)`;
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', addTiltEffect);

// ===== BADGE HOVER EFFECT =====
const badges = document.querySelectorAll('.badge');
badges.forEach((badge, index) => {
    badge.addEventListener('mouseenter', function() {
        badges.forEach((b, i) => {
            if (i !== index) {
                b.style.opacity = '0.6';
                b.style.transform = 'scale(0.95)';
            }
        });
    });

    badge.addEventListener('mouseleave', function() {
        badges.forEach(b => {
            b.style.opacity = '1';
            b.style.transform = 'scale(1)';
        });
    });
});

// ===== MAGNETIC BUTTON EFFECT =====
function addMagneticEffect() {
    const buttons = document.querySelectorAll('.btn-primary, .nav-github');

    if (window.innerWidth > 768) {
        buttons.forEach(button => {
            button.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                this.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) translateY(-4px)`;
            });

            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translate(0, 0)';
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', addMagneticEffect);

// ===== APP ICON INTERACTION =====
const appIcon = document.querySelector('.app-icon');
if (appIcon) {
    appIcon.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        this.style.transform = `
            translateY(-10px)
            scale(1.05)
            rotateX(${y * 0.1}deg)
            rotateY(${x * 0.1}deg)
        `;
    });

    appIcon.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1) rotateX(0) rotateY(0)';
    });
}

// ===== SECTION ENTRY ANIMATIONS =====
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
        sectionObserver.observe(section);
    });
});

// ===== NAVBAR BACKGROUND BLUR ON SCROLL =====
let ticking = false;

function updateNavbar() {
    const scrolled = window.pageYOffset;
    const navBlur = document.querySelector('.nav-blur');

    if (navBlur) {
        const opacity = Math.min(scrolled / 200, 1);
        navBlur.style.opacity = opacity;
    }

    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateNavbar);
        ticking = true;
    }
});

// ===== VIEWPORT HEIGHT FIX FOR MOBILE =====
function setVH() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setVH();
window.addEventListener('resize', setVH);

// ===== REDUCED MOTION SUPPORT =====
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable or reduce animations for users who prefer reduced motion
    document.documentElement.style.setProperty('--transition-fast', '0s');
    document.documentElement.style.setProperty('--transition-base', '0s');
    document.documentElement.style.setProperty('--transition-slow', '0s');

    // Remove cursor follower for reduced motion users
    if (cursorFollower) {
        cursorFollower.style.display = 'none';
    }
}

// ===== INITIALIZATION MESSAGE =====
window.addEventListener('DOMContentLoaded', () => {
    console.log('Everything working! Meow:3');
});
