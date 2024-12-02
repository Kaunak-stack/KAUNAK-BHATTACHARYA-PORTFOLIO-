// Theme Switch
const themeSwitch = document.querySelector('.theme-switch');
themeSwitch.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    themeSwitch.classList.toggle('dark');
    
    // Save theme preference
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('dark-theme', isDark);
});

// Load saved theme
document.addEventListener('DOMContentLoaded', () => {
    const isDark = localStorage.getItem('dark-theme') === 'true';
    if (isDark) {
        document.body.classList.add('dark-theme');
        themeSwitch.classList.add('dark');
    }
});

// Parallax Effect for Floating Shapes
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX * speed);
        const y = (mouseY * speed);
        shape.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Smooth Section Transitions
const sections = document.querySelectorAll('section');
const observerOptions = {
    threshold: 0.2
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Parallax Mouse Movement Effect
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.futuristic-card');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;

        const angleX = (cardCenterY - e.clientY) / 30;
        const angleY = (e.clientX - cardCenterX) / 30;

        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    });
});

// Smooth Scroll with Cyber Effect
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        // Create cyber effect
        const effect = document.createElement('div');
        effect.classList.add('cyber-click-effect');
        document.body.appendChild(effect);
        effect.style.left = e.clientX + 'px';
        effect.style.top = e.clientY + 'px';
        
        setTimeout(() => effect.remove(), 1000);
        
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Interactive Cursor
const cursor = document.createElement('div');
cursor.classList.add('cyber-cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Add hover effect to interactive elements
document.querySelectorAll('a, button, .interactive').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
    });
}); 