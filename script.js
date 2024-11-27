// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Connect Wallet functionality (Basic)
document.querySelector('.connect-wallet').addEventListener('click', function() {
    // Add Web3 wallet connection logic here
    alert('Wallet connection coming soon!');
});

// Add more functionality as needed
