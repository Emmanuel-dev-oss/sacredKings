// Header scroll effect
window.addEventListener('scroll', function () {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

//Menu navigation
const navLinks = document.querySelectorAll('.nav-links');
const sections = document.querySelectorAll('.section');

//Set-up Intersection Observer For menu navigation
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active-menu');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active-menu');
                }
            });
        }
    });
}, { threshold: 0.3 });

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Mobile menu toggle
const menuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('nav ul');

menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    if (anchor.getAttribute('href') !== '#') {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
});

// Poetic content toggle
const poeticContent = document.getElementById('poeticContent');
const readMoreToggle = document.getElementById('readMoreToggle');
const poeticModal = document.getElementById('poeticModal');
const closePoeticModal = document.getElementById('closePoeticModal');

readMoreToggle.addEventListener('click', () => {
    poeticModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    readMoreToggle.setAttribute('aria-expanded', 'true');
});

closePoeticModal.addEventListener('click', () => {
    poeticModal.classList.remove('active');
    document.body.style.overflow = '';
    readMoreToggle.setAttribute('aria-expanded', 'false');
});

// Close modal when clicking outside content
poeticModal.addEventListener('click', (e) => {
    if (e.target === poeticModal) {
        poeticModal.classList.remove('active');
        document.body.style.overflow = '';
        readMoreToggle.setAttribute('aria-expanded', 'false');
    }
});

// Service Modals
const learnMoreBtns = document.querySelectorAll('.learn-more-btn');
const serviceModals = document.querySelectorAll('.service-modal');
const closeServiceModals = document.querySelectorAll('.close-service-modal');

learnMoreBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const serviceNum = btn.getAttribute('data-service');
        const modal = document.getElementById(`serviceModal${serviceNum}`);
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

closeServiceModals.forEach(btn => {
    btn.addEventListener('click', () => {
        const modal = btn.closest('.service-modal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });
});

serviceModals.forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Resource Modals
const resourceBtns = document.querySelectorAll('.resource-btn');
const resourceModals = document.querySelectorAll('.resource-modal');
const closeResourceModals = document.querySelectorAll('.close-resource-modal');

resourceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const resourceNum = btn.getAttribute('data-resource');
        const modal = document.getElementById(`resourceModal${resourceNum}`);
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

closeResourceModals.forEach(btn => {
    btn.addEventListener('click', () => {
        const modal = btn.closest('.resource-modal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });
});

resourceModals.forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});


// Resource filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const resourceItems = document.querySelectorAll('.resource-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter resources
        const filter = btn.dataset.filter;

        resourceItems.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Portal Modal Functionality
const portalBtn = document.getElementById('clientPortalBtn');
const modal = document.getElementById('portalModal');
const closeBtn = document.querySelector('.close-portal-modal');

if (portalBtn && modal && closeBtn) {
    portalBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    });
}

// Form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Thank you for your message. We will contact you soon.');
        this.reset();
    });
}

const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Thank you for subscribing to our newsletter!');
        this.reset();
    });
}

// Animation for elements when they come into view
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .testimonial-card, .resource-item, .milestone, .journal-content, .journal-img, .video-content, .about-video, .service-headline, .how-headline, .video-writeup, .read-more-toggle, .journal-link-container, .service-help, .step, .head, .description, .mission-content-pointer, .img-wrapper, .content-card, .subscribe-header, .subscription-container, .test-header, .test-sub-header, .carousel, .cta-title, .cta-description, .cta-button, .foot');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Set initial state for animated elements
document.querySelectorAll('.service-card, .testimonial-card, .resource-item, .milestone, .journal-content, .journal-img, .video-content, .about-video, .service-headline, .how-headline, .video-writeup, .read-more-toggle, .journal-link-container, .service-help, .step, .head, .description, .mission-content-pointer, .img-wrapper, .content-card, .subscribe-header, .subscription-container, .test-header, .test-sub-header, .carousel, .cta-title, .cta-description, .cta-button, .foot').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(40px)';
    element.style.transition = 'all 0.6s ease-out';
});

// Run on load and scroll
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);



// Add click events to all check-in buttons
checkInBtns.forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Set the video source based on which button was clicked
        modalVideo.innerHTML = `
            <source src="${videoFiles[index]}" type="video/mp4">
            Your browser does not support the video tag.
        `;
        
        // Show the modal
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Load and play the video
        modalVideo.load();
        modalVideo.play().catch(e => {
            // Handle autoplay restrictions
            console.log("Autoplay prevented:", e);
        });
    });
});



// Close modal when clicking close button
closeVideoModal.addEventListener('click', closeVideo);

// Close modal when clicking outside content
videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
        closeVideo();
    }
});

// Close modal when pressing Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.classList.contains('active')) {
        closeVideo();
    }
});

document.querySelectorAll('.privacy-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        showPrivacyPopup();
    });
});

// Privacy Popup Functionality
const privacyPopup = document.getElementById('privacyPopup');
const acceptPrivacyBtn = document.getElementById('acceptPrivacy');
const declinePrivacyBtn = document.getElementById('declinePrivacy');
const privacyAccepted = document.getElementById('privacyAccepted');

// Check if user has already accepted
function checkPrivacyAccepted() {
    return localStorage.getItem('privacyAccepted') === 'true';
}

// Show popup if not already accepted
function showPrivacyPopup() {
    if (!checkPrivacyAccepted()) {
        privacyPopup.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
}

// Hide popup
function hidePrivacyPopup() {
    privacyPopup.classList.remove('active');
    document.body.style.overflow = ''; // Re-enable scrolling
}

// Accept privacy terms
function acceptPrivacy() {
    localStorage.setItem('privacyAccepted', 'true');
    hidePrivacyPopup();
}

// Decline privacy terms
function declinePrivacy() {
    // You can redirect or show a message
    alert('To use this website, you need to accept the terms.');
    // Or redirect: window.location.href = 'https://google.com';
}

// Event listeners
acceptPrivacyBtn.addEventListener('click', acceptPrivacy);
declinePrivacyBtn.addEventListener('click', declinePrivacy);

// Show popup on page load (with slight delay for better UX)
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(showPrivacyPopup, 1000);
});

// Also show when clicking privacy link in footer
document.querySelectorAll('a[href*="privacy"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        showPrivacyPopup();
    });
});

