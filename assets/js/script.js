// Warte bis das Dokument geladen ist
document.addEventListener('DOMContentLoaded', function() {
    // Initialisiere alle Funktionen
    initParticleAnimation();
    initCounterAnimation();
    initProgressBars();
    initWalletConnection();
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
    const particles = Array.from({ length: 100 }, () => new Particle());
    
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

// Counter Animation
function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    
    const animateCounter = (counter, target) => {
        const count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounter(counter, target), 1);
        } else {
            counter.innerText = target;
        }
    };

    const startCounterAnimation = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        animateCounter(counter, target);
    };

    // Intersection Observer für Counter
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounterAnimation(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

// Progress Bars Animation
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const animateProgress = (bar) => {
        const percentage = bar.getAttribute('data-percentage');
        bar.style.setProperty('--width', `\${percentage}%`);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgress(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => observer.observe(bar));
}

// Wallet Connection
function initWalletConnection() {
    const connectBtn = document.querySelector('.connect-btn');
    
    if (!connectBtn) return;
    
    connectBtn.addEventListener('click', async () => {
        try {
            if (typeof window.ethereum !== 'undefined') {
                const accounts = await window.ethereum.request({
                    method: 'eth_requestAccounts'
                });
                
                const shortAddress = `\${accounts[0].substring(0, 6)}...\${accounts[0].substring(38)}`;
                connectBtn.textContent = shortAddress;
                connectBtn.classList.add('connected');
                
                // Event für Kontoänderungen
                window.ethereum.on('accountsChanged', (accounts) => {
                    if (accounts.length > 0) {
                        const shortAddress = `\${accounts[0].substring(0, 6)}...\${accounts[0].substring(38)}`;
                        connectBtn.textContent = shortAddress;
                    } else {
                        connectBtn.textContent = 'Connect Wallet';
                        connectBtn.classList.remove('connected');
                    }
                });
            } else {
                alert('Please install MetaMask to connect your wallet!');
            }
        } catch (error) {
            console.error('Error connecting wallet:', error);
            alert('Error connecting wallet. Please try again.');
        }
    });
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
