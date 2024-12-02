// Initialize AOS
AOS.init({
    duration: 800,
    offset: 100,
    once: true
});

// Form validation and submission
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const formProps = Object.fromEntries(formData);

    // Add animation to button
    const submitBtn = contactForm.querySelector('.submit-btn');
    submitBtn.innerHTML = 'Sending...';
    submitBtn.disabled = true;

    try {
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message
        alert('Message sent successfully!');
        contactForm.reset();
    } catch (error) {
        alert('Error sending message. Please try again.');
    } finally {
        submitBtn.innerHTML = 'Send Message';
        submitBtn.disabled = false;
    }
});

// Add floating animation to social links
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-5px)';
    });

    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0)';
    });
}); 