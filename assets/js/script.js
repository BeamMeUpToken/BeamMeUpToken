// Warte bis das Dokument geladen ist
document.addEventListener('DOMContentLoaded', function() {
    // Initialisiere alle Funktionen
    initParticleAnimation();
    initProgressBars();
    initSmoothScroll();
    initScrollAnimations();
    initHeaderScroll();
});

// Header Scroll Effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Partikel-Animation
function initParticleAnimation() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const particleContainer = document.querySelector('.particle-animation');
    
    if (!particleContainer) return;
    
    particleContainer.appendChild(canvas);
    
    // Canvas Größe setzen
    function setCanvasSize() {
        canvas.width = particleContainer.offsetWidth;
        canvas.height = particleContainer.offsetHeight;
    }
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Partikel-Klasse
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = canvas.width + Math.random() * 100;
            this.y = Math.random() * canvas.height;
            this.size = 1 + Math.random() * 2;
            this.speed = 1 + Math.random() * 2;
            this.opacity = 0.1 + Math.random() * 0.5;
            this.glowing = Math.random() > 0.5;
        }
        
        update() {
            this.x -= this.speed;
            if (this.x < -10) {
                this.reset();
            }
            if (this.glowing) {
                this.opacity = 0.1 + Math.abs(Math.sin(Date.now() * 0.001) * 0.5);
            }
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 240, 255, \${this.opacity})`;
            ctx.fill();
        }
    }
    
    // Partikel erstellen
    const particles = Array.from({ length: 50 }, () => new Particle());
    
    // Animation Loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Progress Bars Animation
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const percentage = entry.target.getAttribute('data-percentage');
                entry.target.style.setProperty('--width', `\${percentage}%`);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => observer.observe(bar));
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.deck-card, .tax-card, .stat-box, .social-card'
    );
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => observer.observe(el));
}

// Mobile Navigation (falls benötigt)
function initMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', 
                navMenu.classList.contains('active')
            );
        });
    }
}
