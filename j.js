// --- 3D Illustration System (Canvas Particle & Wireframe Grid Animation) ---
const canvas = document.getElementById('canvas3d');
const ctx = canvas.getContext('2d');

let width, height;
function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Particle setup
const particles = [];
const particleCount = 40;

for (let i = 0; i < particleCount; i++) {
    particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2.5 + 1
    });
}

function animateCanvas() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting lines and particles
    ctx.strokeStyle = document.documentElement.classList.contains('dark') 
        ? 'rgba(6, 182, 212, 0.08)' 
        : 'rgba(14, 116, 144, 0.12)';
    ctx.fillStyle = document.documentElement.classList.contains('dark') 
        ? 'rgba(6, 182, 212, 0.4)' 
        : 'rgba(14, 116, 144, 0.4)';

    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby particles for 3D network look
        for (let j = i + 1; j < particles.length; j++) {
            let p2 = particles[j];
            let dist = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (dist < 120) {
                ctx.lineWidth = 1 - dist / 120;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animateCanvas);
}
animateCanvas();

// --- Dark / Light Mode Toggle ---
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    const htmlEl = document.documentElement;
    htmlEl.classList.toggle('dark');
    htmlEl.classList.toggle('light');
});

// --- Projects Carousel Slider ---
const sliderTrack = document.getElementById('sliderTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;
const getCardWidth = () => {
    const card = sliderTrack.querySelector('div');
    return card ? card.clientWidth + 24 : 300; // card width + gap
};

nextBtn.addEventListener('click', () => {
    const maxIndex = sliderTrack.children.length - (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1);
    if (currentIndex < maxIndex) {
        currentIndex++;
        sliderTrack.style.transform = `translateX(-${currentIndex * getCardWidth()}px)`;
    }
});

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        sliderTrack.style.transform = `translateX(-${currentIndex * getCardWidth()}px)`;
    }
});

// --- Contact Form Submission Handler ---
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Xabaringiz muvaffaqiyatli yuborildi! Tez orada siz bilan bog‘lanamiz.');
    contactForm.reset();
});