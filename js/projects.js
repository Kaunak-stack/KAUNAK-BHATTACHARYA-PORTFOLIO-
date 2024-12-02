// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    offset: 100,
    once: true
});

// Project card hover effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        const details = card.querySelector('.project-details');
        details.style.maxHeight = details.scrollHeight + 'px';
    });

    card.addEventListener('mouseleave', (e) => {
        const details = card.querySelector('.project-details');
        details.style.maxHeight = null;
    });
});

// Project filtering functionality
const filterProjects = (category) => {
    const projects = document.querySelectorAll('.project-card');
    projects.forEach(project => {
        const tags = project.querySelector('.project-tech').innerText.toLowerCase();
        if (category === 'all' || tags.includes(category.toLowerCase())) {
            project.style.display = 'block';
        } else {
            project.style.display = 'none';
        }
    });
};

// Add smooth reveal animation when scrolling
const revealOnScroll = () => {
    const projects = document.querySelectorAll('.project-card');
    projects.forEach(project => {
        const projectTop = project.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (projectTop < windowHeight - 100) {
            project.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', revealOnScroll); 

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });
}); 