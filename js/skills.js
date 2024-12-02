// Initialize AOS
AOS.init({
    duration: 800,
    offset: 100,
    once: true
});

// Animate skill bars when they come into view
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-item').forEach(item => {
    observer.observe(item);
});

// Add hover effect to skill categories
document.querySelectorAll('.skill-category').forEach(category => {
    category.addEventListener('mouseenter', () => {
        category.style.transform = 'translateY(-5px)';
        category.style.boxShadow = '0 8px 12px rgba(0, 0, 0, 0.15)';
    });

    category.addEventListener('mouseleave', () => {
        category.style.transform = 'translateY(0)';
        category.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    });
}); 