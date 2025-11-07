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

// Quiz functionality
const quizInput = document.getElementById('quizInput');
const quizSubmit = document.getElementById('quizSubmit');
const quizResult = document.getElementById('quizResult');
const quizRetry = document.getElementById('quizRetry');
const correctAnswer = '112233';
let quizAnswered = false;

function checkAnswer() {
    if (quizAnswered) return;
    
    const userAnswer = quizInput.value.trim();
    
    if (userAnswer === '') {
        quizResult.textContent = 'Please enter a password!';
        quizResult.classList.add('wrong');
        quizResult.style.display = 'flex';
        return;
    }
    
    quizAnswered = true;
    const isCorrect = userAnswer === correctAnswer;
    
    // Disable input and button
    quizInput.disabled = true;
    quizSubmit.disabled = true;
    
    // Show result
    if (isCorrect) {
        quizResult.textContent = '🎉 Correct! Great job, Mark! 🎉';
        quizResult.classList.add('correct');
        quizInput.classList.add('correct');
        
        // Show link to birthday page
        document.getElementById('birthdayLink').style.display = 'block';
        
        // Add extra confetti for correct answer
        for (let i = 0; i < 50; i++) {
            const piece = new ConfettiPiece();
            piece.y = Math.random() * canvas.height;
            confetti.push(piece);
        }
    } else {
        quizResult.textContent = '❌ Incorrect password. Try again!';
        quizResult.classList.add('wrong');
        quizInput.classList.add('wrong');
        quizRetry.style.display = 'inline-block';
    }
}

// Submit button click
quizSubmit.addEventListener('click', checkAnswer);

// Enter key press
quizInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkAnswer();
    }
});

// Retry button
quizRetry.addEventListener('click', () => {
    quizAnswered = false;
    quizInput.disabled = false;
    quizSubmit.disabled = false;
    quizInput.value = '';
    quizInput.classList.remove('correct', 'wrong');
    quizResult.textContent = '';
    quizResult.classList.remove('correct', 'wrong');
    quizResult.style.display = 'none';
    quizRetry.style.display = 'none';
    document.getElementById('birthdayLink').style.display = 'none';
    quizInput.focus();
});

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
document.querySelectorAll('.quiz-nav-btn, .quiz-submit-btn, .quiz-retry-btn').forEach(button => {
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

