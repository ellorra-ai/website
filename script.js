// Scroll reveal animation
function reveal() {
    const reveals = document.querySelectorAll('.reveal');

    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Header hide on scroll down, show on scroll up
let lastScroll = 0;
const header = document.querySelector('.header');

function handleScroll() {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        header.style.transform = 'translateY(0)';
        return;
    }

    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
}

// Add reveal class to elements that should animate on scroll
function initRevealElements() {
    const elementsToReveal = [
        '.mission .section-header',
        '.pillar',
        '.products .section-header',
        '.product-card',
        '.coming-soon'
    ];

    elementsToReveal.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.classList.add('reveal');
        });
    });

    // Add contact section elements
    const contactElements = document.querySelectorAll('.contact .section-header, .contact-form, .contact-info');
    contactElements.forEach(element => {
        element.classList.add('reveal');
    });
}

// Google Forms submission handler
function initContactForm() {
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const submitButton = form.querySelector('.form-submit');
        const originalText = submitButton.innerHTML;

        // Disable submit button and show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="submit-text">Sending...</span>';

        // Hide any previous status messages
        formStatus.className = 'form-status';
        formStatus.textContent = '';

        try {
            // Get the form action URL (this should be set to the Google Forms URL)
            const formAction = form.getAttribute('action');

            if (!formAction || formAction === '') {
                throw new Error('Form not configured. Please add your Google Forms URL.');
            }

            // Create FormData object
            const formData = new FormData(form);

            // Submit to Google Forms
            // Note: We use 'no-cors' mode because Google Forms doesn't support CORS
            // This means we won't get a response, but the form will still submit
            await fetch(formAction, {
                method: 'POST',
                body: formData,
                mode: 'no-cors'
            });

            // Show success message
            formStatus.className = 'form-status success';
            formStatus.textContent = 'Thank you for your message! We\'ll get back to you soon.';

            // Reset form
            form.reset();

        } catch (error) {
            // Show error message
            formStatus.className = 'form-status error';
            formStatus.textContent = error.message || 'Something went wrong. Please try again or email us directly.';
        } finally {
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
        }
    });
}

// Smooth scroll for navigation links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initRevealElements();
    initSmoothScroll();
    initContactForm();
    reveal();
});

// Listen for scroll events
window.addEventListener('scroll', () => {
    reveal();
    handleScroll();
});

// Refresh on resize
window.addEventListener('resize', reveal);
