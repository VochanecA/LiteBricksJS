function Carousel(props) {
    const carouselId = `carousel-${Math.random().toString(36).substr(2, 9)}`;
    return `
        <div class="carousel" id="${carouselId}">
            <div class="carousel-container">
                ${props.images.map((img, index) => `
                    <div class="carousel-slide${index === 0 ? ' active' : ''}">
                        <img src="${img}" alt="Carousel Image ${index + 1}">
                    </div>
                `).join('')}
            </div>
            <button class="carousel-button prev">&lt;</button>
            <button class="carousel-button next">&gt;</button>
        </div>
        <script>
            (function() {
                const carousel = document.getElementById('${carouselId}');
                const slides = carousel.querySelectorAll('.carousel-slide');
                const prevButton = carousel.querySelector('.prev');
                const nextButton = carousel.querySelector('.next');
                let currentSlide = 0;

                function showSlide(n) {
                    slides[currentSlide].classList.remove('active');
                    currentSlide = (n + slides.length) % slides.length;
                    slides[currentSlide].classList.add('active');
                }

                prevButton.addEventListener('click', () => showSlide(currentSlide - 1));
                nextButton.addEventListener('click', () => showSlide(currentSlide + 1));

                const interval = ${props.interval || 5000};

                // Auto-advance at the specified interval
                setInterval(() => showSlide(currentSlide + 1), interval);
            })();
        </script>
    `;
}
