// Confetti animation
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const confetti = [];
const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#ff6b6b', '#ffa500', '#ff69b4'];

class ConfettiPiece {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.w = Math.random() * 10 + 5;
        this.h = Math.random() * 10 + 5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speed = Math.random() * 3 + 2;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 10 - 5;
    }
    
    update() {
        this.y += this.speed;
        this.x += Math.sin(this.y * 0.01) * 2;
        this.rotation += this.rotationSpeed;
        
        if (this.y > canvas.height) {
            this.y = -10;
            this.x = Math.random() * canvas.width;
        }
    }
    
    draw() {
        ctx.save();
        ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
        ctx.restore();
    }
}

// Initialize confetti
for (let i = 0; i < 50; i++) {
    confetti.push(new ConfettiPiece());
}

function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach(piece => {
        piece.update();
        piece.draw();
    });
    requestAnimationFrame(animateConfetti);
}

animateConfetti();

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Countdown timer
function updateCountdown() {
    // Set target date to November 17th
    const currentYear = new Date().getFullYear();
    const targetDate = new Date(currentYear, 10, 17); // Month is 0-indexed, so 10 = November
    
    // If November 17 has passed this year, set for next year
    if (targetDate < new Date()) {
        targetDate.setFullYear(currentYear + 1);
    }
    
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;
    
    // If the date has already passed
    if (distance < 0) {
        document.getElementById('countdown').innerHTML = '<h2 style="color: #667eea; font-size: 2rem;">🎉 November 17th Has Arrived! 🎉</h2>';
        return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
    
    // If it's November 17th today
    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
        document.getElementById('countdown').innerHTML = '<h2 style="color: #667eea; font-size: 2rem;">🎉 It\'s November 17th Today! 🎉</h2>';
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();

// Celebration button
const celebrateBtn = document.getElementById('celebrateBtn');
celebrateBtn.addEventListener('click', () => {
    // Add more confetti on click
    for (let i = 0; i < 30; i++) {
        const piece = new ConfettiPiece();
        piece.y = Math.random() * canvas.height;
        confetti.push(piece);
    }
    
    // Button animation
    celebrateBtn.style.transform = 'scale(0.9)';
    setTimeout(() => {
        celebrateBtn.style.transform = 'scale(1)';
    }, 100);
    
    // Play celebration sound (optional - uncomment if you want)
    // const audio = new Audio('celebration.mp3');
    // audio.play();
});

// Set name to Mark
document.getElementById('name').textContent = 'Mark';

// Add sparkle effect on click anywhere
document.addEventListener('click', (e) => {
    const sparkles = 10;
    for (let i = 0; i < sparkles; i++) {
        const piece = new ConfettiPiece();
        piece.x = e.clientX + (Math.random() - 0.5) * 100;
        piece.y = e.clientY + (Math.random() - 0.5) * 100;
        piece.speed = Math.random() * 5 + 3;
        confetti.push(piece);
    }
});

// Google-style gradient button effect (follows cursor)
document.querySelectorAll('.celebration-btn, .quiz-nav-btn, .quiz-submit-btn, .quiz-retry-btn').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        button.style.setProperty('--mouse-x', `${x}%`);
        button.style.setProperty('--mouse-y', `${y}%`);
    });
    
    // Animate gradient background
    let gradientPosition = 0;
    setInterval(() => {
        gradientPosition = (gradientPosition + 0.5) % 100;
        button.style.backgroundPosition = `${gradientPosition}% 50%`;
    }, 50);
});

