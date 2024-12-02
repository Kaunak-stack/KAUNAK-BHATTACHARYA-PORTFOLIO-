// Modern scroll animations
const scrollAnimations = () => {
    const elements = document.querySelectorAll('.scroll-animate');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animate');
        }
    });
};

// Smooth parallax effect
const parallaxEffect = () => {
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        const posX = (clientX - centerX) / centerX;
        const posY = (clientY - centerY) / centerY;
        
        document.querySelectorAll('.parallax').forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.1;
            const x = posX * speed * 100;
            const y = posY * speed * 100;
            element.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
};

// Gradient text animation
const animateGradientText = () => {
    const gradientTexts = document.querySelectorAll('.gradient-text');
    
    gradientTexts.forEach(text => {
        text.style.backgroundSize = '200% auto';
        text.style.animation = 'gradientFlow 5s ease infinite';
    });
};

// 3D Card Effect
const handle3DCardEffect = () => {
    document.querySelectorAll('.card-3d').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale3d(1.05, 1.05, 1.05)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
};

// Parallax Mouse Movement
const handleParallaxEffect = () => {
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        const moveX = (clientX - centerX) / 50;
        const moveY = (clientY - centerY) / 50;
        
        document.querySelectorAll('.parallax-element').forEach(element => {
            const speed = element.getAttribute('data-speed') || 1;
            element.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
        });
    });
};

// Card Hover Light Effect
const handleCardHoverEffect = () => {
    document.querySelectorAll('.card-hover-effect').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
};

// Smooth Section Transitions
const handleSectionTransitions = () => {
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                entry.target.style.transform = 'translateY(0) scale(1)';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.style.transform = 'translateY(50px) scale(0.95)';
        section.style.opacity = '0';
        section.style.transition = 'transform 0.8s ease, opacity 0.8s ease';
        observer.observe(section);
    });
};

// Text Scramble Effect
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    
    update() {
        let output = '';
        let complete = 0;
        
        for (let i = 0; i < this.queue.length; i++) {
            let { from, to, start, end, char } = this.queue[i];
            
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += char;
            } else {
                output += from;
            }
        }
        
        this.el.innerText = output;
        
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    scrollAnimations();
    parallaxEffect();
    animateGradientText();
    handle3DCardEffect();
    handleParallaxEffect();
    handleCardHoverEffect();
    handleSectionTransitions();
    
    // Initialize text scramble effect for headings
    document.querySelectorAll('.scramble-text').forEach(el => {
        const fx = new TextScramble(el);
        fx.setText(el.textContent);
    });
    
    window.addEventListener('scroll', scrollAnimations);
});

// Add smooth transitions between pages
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', e => {
        if (link.href.includes(window.location.origin)) {
            e.preventDefault();
            document.body.style.opacity = 0;
            
            setTimeout(() => {
                window.location = link.href;
            }, 500);
        }
    });
});

// Add this to the new page load
if (document.body.style.opacity === '0') {
    document.body.style.opacity = 1;
} 