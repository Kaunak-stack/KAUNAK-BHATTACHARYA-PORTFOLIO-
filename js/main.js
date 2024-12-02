// Initialize AOS
AOS.init({
    duration: 800,
    offset: 100,
    once: true
});

// Typing effect for the hero section
const typeText = async (element, text, speed = 100) => {
    const h1 = document.querySelector(element);
    for (let i = 0; i < text.length; i++) {
        h1.textContent += text[i];
        await new Promise(resolve => setTimeout(resolve, speed));
    }
};

// Initialize typing effect
window.addEventListener('DOMContentLoaded', () => {
    typeText('.typing-effect', 'Software Developer & Computer Science Student');
});

// Animate stats counting
const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

// Animate stats when they come into view
const observerOptions = {
    threshold: 0.5
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const endValue = parseInt(statNumber.textContent);
            animateValue(statNumber, 0, endValue, 2000);
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// Add hover effects to highlight cards
document.querySelectorAll('.highlight-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 8px 12px rgba(0, 0, 0, 0.15)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    });
});

// Smooth scroll functionality
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// Achievement Carousel
const initCarousel = () => {
    const slides = document.querySelectorAll('.achievement-slide');
    const dotsContainer = document.querySelector('.carousel-dots');
    let currentSlide = 0;

    if (!slides.length) return; // Exit if no slides found

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    // Show first slide
    showSlide(0);

    // Auto advance slides
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 5000);

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
            slide.classList.toggle('active', i === index);
        });
        
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function goToSlide(index) {
        currentSlide = index;
        showSlide(currentSlide);
    }
};

// Make sure to call initCarousel after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    // ... other initializations
});

// 3D Tilt Effect for Profile Card
const initTiltEffect = () => {
    const card = document.querySelector('.profile-card');
    
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
};

// Parallax Effect for Highlights
const initParallax = () => {
    window.addEventListener('scroll', () => {
        const cards = document.querySelectorAll('.highlight-card');
        cards.forEach((card, index) => {
            const speed = 1 + (index * 0.1);
            const rect = card.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const yPos = -(rect.top / speed);
                card.style.transform = `translateY(${yPos}px)`;
            }
        });
    });
};

// Initialize all new features
document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    initTiltEffect();
    initParallax();
});

// Scroll Progress Indicator
window.addEventListener('scroll', () => {
    const scrollProgress = document.querySelector('.scroll-progress');
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.pageYOffset / totalHeight) * 100;
    scrollProgress.style.width = `${progress}%`;
});

// Enhanced Typing Effect
const phrases = [
    'Software Developer',
    'Problem Solver',
    'Tech Enthusiast',
    'AI/ML Enthusiast'
];

let currentPhraseIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const element = document.querySelector('.typing-effect');
    const currentPhrase = phrases[currentPhraseIndex];

    if (!isDeleting && currentCharIndex <= currentPhrase.length) {
        element.textContent = currentPhrase.substring(0, currentCharIndex);
        currentCharIndex++;
        typingSpeed = 100;
    }

    if (isDeleting && currentCharIndex >= 0) {
        element.textContent = currentPhrase.substring(0, currentCharIndex);
        currentCharIndex--;
        typingSpeed = 50;
    }

    if (currentCharIndex === currentPhrase.length + 1) {
        isDeleting = true;
        typingSpeed = 1000; // Pause at end
    }

    if (currentCharIndex === 0 && isDeleting) {
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
    }

    setTimeout(typeEffect, typingSpeed);
}

// Start typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    typeEffect();
});

// Add parallax effect to profile photo
document.addEventListener('mousemove', (e) => {
    const profilePhoto = document.querySelector('.profile-photo-container');
    const { left, top, width, height } = profilePhoto.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const moveX = (e.clientX - centerX) / 20;
    const moveY = (e.clientY - centerY) / 20;
    
    profilePhoto.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

// Add smooth reveal for elements on scroll
const revealElements = document.querySelectorAll('.fade-in');
const revealOptions = {
    threshold: 0.15,
    rootMargin: '0px'
};

const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

revealElements.forEach(element => {
    revealOnScroll.observe(element);
});

// Theme Switch
const themeSwitch = document.querySelector('.theme-switch');
themeSwitch.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    themeSwitch.classList.toggle('dark');
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

// Smooth Page Transitions
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
});

// Parallax Effect
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    
    document.querySelectorAll('.parallax').forEach(element => {
        element.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            if (entry.target.classList.contains('count-up')) {
                startCounting(entry.target);
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
});

// Glitch Effect for Headings
const glitchText = (element) => {
    const original = element.textContent;
    const chars = '!<>-_\\/[]{}—=+*^?#________';
    
    let iterations = 0;
    const interval = setInterval(() => {
        element.textContent = original.split('')
            .map((letter, index) => {
                if (index < iterations) {
                    return original[index];
                }
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');
            
        if (iterations >= original.length) {
            clearInterval(interval);
        }
        iterations += 1/3;
    }, 30);
};

document.querySelectorAll('.glitch-text').forEach(element => {
    element.addEventListener('mouseenter', () => glitchText(element));
}); 