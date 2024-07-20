function initCarousel(carouselId, interval) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevButton = carousel.querySelector('.prev');
    const nextButton = carousel.querySelector('.next');
    let currentSlide = 0;

    console.log('Slides:', slides); // Log slides
    console.log('Current Slide:', currentSlide); // Log current slide

    function showSlide(n) {
        console.log('Showing Slide:', n); // Log slide index
        slides[currentSlide].classList.remove('active');
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        updateCarouselPosition();
    }

    function updateCarouselPosition() {
        const offset = -currentSlide * 100;
        console.log('Offset:', offset); // Log offset
        carousel.querySelector('.carousel-container').style.transform = `translateX(${offset}%)`;
    }

    // Initial setup
    updateCarouselPosition();

    prevButton.addEventListener('click', () => showSlide(currentSlide - 1));
    nextButton.addEventListener('click', () => showSlide(currentSlide + 1));

    // Auto-advance at the specified interval
    setInterval(() => showSlide(currentSlide + 1), interval);
}
