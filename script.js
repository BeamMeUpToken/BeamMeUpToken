// Warte bis das Dokument geladen ist
document.addEventListener('DOMContentLoaded', function() {
    // Partikel-Animation für den Hintergrund
    initParticleAnimation();
    
    // Counter Animation für Mission Control Stats
    initCounterAnimation();
    
    // Progress Bar Animation für Tokenomics
    initProgressBars();
    
    // Wallet Connection
    initWalletConnection();
});

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
    
    // Partikel erstellen
    const particles = [];
    const particleCount = 100;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.speed = 0.1 + Math.random() * 0.5;
            this.size = 1 + Math.random() * 2;
            this.opacity = 0.1 + Math.random() * 0.5;
        }
        
        update() {
            this.x -= this.speed;
            if (this.x < 0) {
                this.x = canvas.width;
            }
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 240, 255, \${this.opacity})`;
            ctx.fill();
        }
    }
    
    // Partikel initialisieren
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
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

// Counter Animation für Mission Control
function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = Math.floor(Math.random() * 1000); // Beispielwerte
        let current = 0;
        
        const updateCounter = () => {
            const increment = target / 200;
            
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 1);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Progress Bar Animation
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
        const percentage = bar.getAttribute('data-percentage');
        bar.style.setProperty('--width', `\${percentage}%`);
    });
}

// Wallet Connection
function initWalletConnection() {
    const connectBtn = document.querySelector('.connect-btn');
    
    if (!connectBtn) return;
    
    connectBtn.addEventListener('click', async () => {
        try {
            // Prüfen ob Web3 verfügbar ist
            if (typeof window.ethereum !== 'undefined') {
                // MetaMask ist installiert
                const accounts = await window.ethereum.request({
                    method: 'eth_requestAccounts'
                });
                
                // Wallet wurde verbunden
                connectBtn.textContent = `\${accounts[0].substr(0, 6)}...\${accounts[0].substr(-4)}`;
                connectBtn.classList.add('connected');
            } else {
                // MetaMask ist nicht installiert
                alert('Please install MetaMask to connect your wallet!');
            }
        } catch (error) {
            console.error('Error connecting wallet:', error);
            alert('Error connecting wallet. Please try again.');
        }
    });
}

// Smooth Scroll für Navigation
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

// Intersection Observer für Scroll-Animationen
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Elemente für Scroll-Animationen
document.querySelectorAll('.deck-card, .tax-card, .stat-box').forEach(el => {
    observer.observe(el);
});
