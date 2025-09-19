document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const dots = document.querySelectorAll('.snap-dot');
    const cards = document.querySelectorAll('.testimonial-card');
    const cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(document.documentElement).getPropertyValue('--card-gap'));
    
    // Center the first card initially
    track.scrollLeft = (track.scrollWidth - track.clientWidth) / 2;
    
    // Update UI based on scroll position
    const updateUI = () => {
        const scrollPos = track.scrollLeft;
        const maxScroll = track.scrollWidth - track.clientWidth;
        
        // Update buttons
        prevBtn.classList.toggle('hidden', scrollPos <= 1);
        nextBtn.classList.toggle('hidden', scrollPos >= maxScroll - 1);
        
        // Update snap indicators
        const activeIndex = Math.round(scrollPos / cardWidth);
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeIndex);
        });
    };
    
    // Smooth scroll to position
    const smoothScroll = (position) => {
        track.scrollTo({
            left: position,
            behavior: 'smooth'
        });
    };
    
    // Button handlers
    prevBtn.addEventListener('click', () => {
        smoothScroll(track.scrollLeft - cardWidth);
    });
    
    nextBtn.addEventListener('click', () => {
        smoothScroll(track.scrollLeft + cardWidth);
    });
    
    // Snap dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            smoothScroll(index * cardWidth);
        });
    });
    
    // Track scroll events with debounce
    let scrollTimeout;
    track.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateUI, 100);
    });
    
    // Initial UI update
    updateUI();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(document.documentElement).getPropertyValue('--card-gap'));
        updateUI();
    });

    //Auto Scrolling
    let currentPropIndex = 0;
    let isAutoScrolling = true;

    let carouselInterval = setInterval(() => {
        if (isAutoScrolling) {
            scrollToNextProp();
        }
    }, 3000);

    function scrollToNextProp() {
        currentPropIndex = (currentPropIndex + 1) % cards.length;
        updateCarousel();
    }

    function scrollToPrevProp() {
        currentPropIndex = (currentPropIndex - 1 +  cards.length) % PiCardsThreeFill.length;
        updateCarousel();
    }

    function updateCarousel() {
        const scrollPosition = cards[currentPropIndex].offsetLeft - 
            track.offsetLeft - 
            (track.offsetWidth / 2 - cards[currentPropIndex].offsetWidth / 2);
        
        track.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    }

    // Pause auto-scroll on hover
    track.addEventListener('mouseenter', () => {
        isAutoScrolling = false;
        clearInterval(carouselInterval);
    });

    track.addEventListener('mouseleave', () => {
        isAutoScrolling = true;
        carouselInterval = setInterval(() => {
            scrollToNextProp();
        }, 3000);
    });
});