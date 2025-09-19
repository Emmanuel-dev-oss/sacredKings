document.addEventListener('DOMContentLoaded', function() {
// Animate benefit cards on scroll
const benefitCards = document.querySelectorAll('.benefit-card');

const benefitObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 200);
        }
    });
}, { threshold: 0.1 });

benefitCards.forEach(card => {
    benefitObserver.observe(card);
});

// Process navigation
const processSections = document.querySelectorAll('.process-section');
const navLinks = document.querySelectorAll('.process-nav-link');

// Set up intersection observer for process sections
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
            
            // Update timeline progress
            if (entry.target.querySelector('.timeline-progress')) {
                const steps = entry.target.querySelectorAll('.step');
                const activeSteps = entry.target.querySelectorAll('.step.active');
                const progress = (activeSteps.length / steps.length) * 100;
                entry.target.querySelector('.timeline-progress').style.height = `${progress}%`;
            }
        }
    });
}, { threshold: 0.3 });

processSections.forEach(section => {
    sectionObserver.observe(section);
});

// Smooth scroll for navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Step activation on scroll
const stepObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            // Update timeline progress
            const timelineContainer = entry.target.closest('.timeline-container');
            if (timelineContainer) {
                const steps = timelineContainer.querySelectorAll('.step');
                const activeSteps = timelineContainer.querySelectorAll('.step.active');
                const progress = (activeSteps.length / steps.length) * 100;
                timelineContainer.querySelector('.timeline-progress').style.height = `${progress}%`;
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.step').forEach(step => {
    stepObserver.observe(step);
});

// Toggle step details
document.querySelectorAll('.toggle-details').forEach(button => {
    button.addEventListener('click', () => {
        const details = button.nextElementSibling;
        button.classList.toggle('active');
        details.classList.toggle('active');
    });
});



// Animate process flow
const flowObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.flow-item');
            const connectors = entry.target.querySelectorAll('.flow-connector');
            
            items.forEach((item, i) => {
                setTimeout(() => {
                    item.classList.add('visible');
                }, i * 300);
            });
            
            connectors.forEach((connector, i) => {
                setTimeout(() => {
                    connector.classList.add('visible');
                }, (items.length + i) * 300);
            });
        }
    });
}, { threshold: 0.5 });

const processFlow = document.querySelector('.process-flow');
if (processFlow) {
    flowObserver.observe(processFlow);
}

// Hero animation
const heroContent = document.querySelector('.hero-content');
if (heroContent) {
    heroContent.style.animation = 'fadeInUp 1s ease forwards 0.3s';
}
});